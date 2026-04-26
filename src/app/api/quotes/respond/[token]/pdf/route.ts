import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { Browser, Page } from "puppeteer-core"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

function getBaseUrl(req: Request) {
  const forwardedProto = req.headers.get("x-forwarded-proto")
  const forwardedHost =
    req.headers.get("x-forwarded-host") ?? req.headers.get("host")

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`
  }

  const url = new URL(req.url)
  return `${url.protocol}//${url.host}`
}

function sanitizeFileName(value: string) {
  const sanitized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s.-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^\.+|\.+$/g, "")
    .trim()

  return sanitized || "Cotizacion"
}

async function launchBrowser(): Promise<Browser> {
  const isProduction = process.env.NODE_ENV === "production"

  if (isProduction) {
    const chromium = (await import("@sparticuz/chromium")).default
    const puppeteerCore = await import("puppeteer-core")

    const executablePath = await chromium.executablePath()

    return puppeteerCore.launch({
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
      executablePath,
      headless: true,
    })
  }

  const puppeteer = await import("puppeteer")

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  })

  return browser as unknown as Browser
}

async function waitForPrintablePage(page: Page) {
  await page.waitForSelector("body", { timeout: 15000 })

  await page
    .waitForFunction(() => document.readyState === "complete", {
      timeout: 15000,
    })
    .catch(() => {})

  await page.evaluate(async () => {
    const doc = document as Document & {
      fonts?: {
        ready?: Promise<unknown>
      }
    }

    if (doc.fonts?.ready) {
      await doc.fonts.ready
    }

    const images = Array.from(document.images)

    await Promise.all(
      images.map((image) => {
        if (image.complete) {
          return Promise.resolve()
        }

        return new Promise<void>((resolve) => {
          const done = () => resolve()

          image.addEventListener("load", done, { once: true })
          image.addEventListener("error", done, { once: true })
        })
      })
    )
  })
}

async function openPrintPage(page: Page, printUrl: string) {
  const response = await page.goto(printUrl, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  })

  if (!response) {
    throw new Error("No se recibió respuesta al abrir la vista imprimible")
  }

  if (!response.ok()) {
    throw new Error(
      `La vista imprimible respondió con ${response.status()} ${response.statusText()}`
    )
  }

  const finalUrl = page.url()

  if (/\/auth\/|\/signin\b|\/login\b/i.test(finalUrl)) {
    throw new Error(`La vista imprimible redirigió a autenticación: ${finalUrl}`)
  }

  await waitForPrintablePage(page)
}

export async function GET(
  req: Request,
  context: { params: Promise<{ token: string }> }
) {
  let browser: Browser | null = null

  try {
    
    const { token } = await context.params

    if (!token) {
      return NextResponse.json(
        { error: "Token de respuesta requerido" },
        { status: 400 }
      )
    }

    const quote = await prisma.quote.findFirst({
      where: {
        responseToken: token,
        OR: [
          { responseExpiresAt: null },
          { responseExpiresAt: { gt: new Date() } },
        ],
      },
      select: {
        id: true,
        title: true,
        user: {
          select: {
            settings: {
              select: {
                fileName: true,
              },
            },
          },
        },
      },
    })

    if (!quote) {
      return NextResponse.json(
        { error: "Cotización no encontrada, token inválido o enlace vencido" },
        { status: 404 }
      )
    }

    const fileNameBase =
      quote.user?.settings?.fileName?.trim() ||
      quote.title?.trim() ||
      "Cotizacion"

    const safeFileName = `${sanitizeFileName(
      `${fileNameBase}-${quote.id.slice(0, 8)}`
    )}.pdf`

    const baseUrl = getBaseUrl(req)
    const printUrl = `${baseUrl}/quotes/${quote.id}/print?token=${encodeURIComponent(
      token
    )}`

    browser = await launchBrowser()

    const page = await browser.newPage()

    page.on("pageerror", (error) => {
      console.error("RESPOND PDF PAGE ERROR:", error)
    })

    page.on("requestfailed", (request) => {
      console.error("RESPOND PDF REQUEST FAILED:", {
        url: request.url(),
        error: request.failure()?.errorText || "Unknown error",
      })
    })

    page.on("console", (message) => {
      if (message.type() === "error") {
        console.error("RESPOND PDF BROWSER CONSOLE:", message.text())
      }
    })

    await page.setViewport({
      width: 1280,
      height: 1810,
      deviceScaleFactor: 1,
    })

    await page.emulateMediaType("screen")
    await page.setCacheEnabled(false)

    await openPrintPage(page, printUrl)

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    })

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFileName}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("RESPOND PDF ERROR:", error)

    const message = error instanceof Error ? error.message : "Error desconocido"

    return NextResponse.json(
      {
        error: "Error al generar PDF",
        detail: message,
      },
      { status: 500 }
    )
  } finally {
    if (browser) {
      await browser.close().catch(() => {})
    }
  }
}
