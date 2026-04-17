import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import puppeteer, { type Browser } from "puppeteer"

export const runtime = "nodejs"

function getBaseUrl(req: Request) {
  const url = new URL(req.url)
  return `${url.protocol}//${url.host}`
}

function sanitizeFileName(value: string) {
  return value
    .replace(/[^\w\s.-]/g, "")
    .replace(/\s+/g, "-")
    .trim()
}

export async function GET(
  req: Request,
  context: { params: Promise<{ token: string }> }
) {
  let browser: Browser | null = null

  try {
    const { token } = await context.params

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
        { error: "Cotización no encontrada" },
        { status: 404 }
      )
    }

    const fileNameBase =
      quote.user?.settings?.fileName?.trim() || quote.title?.trim() || "Cotizacion"

    const safeFileName = sanitizeFileName(
      `${fileNameBase}-${quote.id.slice(0, 8)}.pdf`
    )

    const baseUrl = getBaseUrl(req)
    const printUrl = `${baseUrl}/quotes/${quote.id}/print`

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    })

    const page = await browser.newPage()

    await page.setViewport({
      width: 595,
      height: 842,
      deviceScaleFactor: 2,
    })

    await page.goto(printUrl, {
      waitUntil: "networkidle0",
      timeout: 60000,
    })

    const pdfBuffer = await page.pdf({
      width: "595px",
      height: "842px",
      printBackground: true,
      preferCSSPageSize: true,
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
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("PUBLIC PDF ERROR:", error)

    return NextResponse.json(
      { error: "Error al generar PDF" },
      { status: 500 }
    )
  } finally {
    if (browser) {
      await browser.close().catch(() => {})
    }
  }
}
