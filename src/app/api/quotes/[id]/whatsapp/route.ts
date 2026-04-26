import { randomBytes } from "crypto"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const RESPONSE_EXPIRATION_HOURS = 24

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "")

  if (!digits) return ""

  if (digits.startsWith("52")) return digits
  if (digits.length === 10) return `52${digits}`

  return digits
}

function isLocalhostUrl(value: string) {
  return (
    value.includes("localhost") ||
    value.includes("127.0.0.1") ||
    value.includes("0.0.0.0")
  )
}

function getBaseUrl(request: Request) {
  const requestUrl = new URL(request.url)
  const requestOrigin = requestUrl.origin

  const envUrl =
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL

  if (envUrl) {
    const normalizedEnvUrl = envUrl.replace(/\/$/, "")

    if (isLocalhostUrl(normalizedEnvUrl) && !isLocalhostUrl(requestOrigin)) {
      return requestOrigin.replace(/\/$/, "")
    }

    return normalizedEnvUrl
  }

  return requestOrigin.replace(/\/$/, "")
}

async function generateUniqueResponseToken() {
  for (let i = 0; i < 5; i++) {
    const token = randomBytes(24).toString("hex")

    const existingQuote = await prisma.quote.findUnique({
      where: { responseToken: token },
      select: { id: true },
    })

    if (!existingQuote) {
      return token
    }
  }

  throw new Error("No se pudo generar un token único de respuesta")
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    const userId = (session?.user as { id?: string } | undefined)?.id

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await context.params

    const quote = await prisma.quote.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
        title: true,
        clientName: true,
        clientPhone: true,
        total: true,
        status: true,
      },
    })

    if (!quote) {
      return NextResponse.json(
        { error: "Cotización no encontrada" },
        { status: 404 }
      )
    }

    if (!quote.clientPhone || !quote.clientPhone.trim()) {
      return NextResponse.json(
        { error: "La cotización no tiene teléfono del cliente" },
        { status: 400 }
      )
    }

    if (quote.status === "ACCEPTED") {
      return NextResponse.json(
        { error: "La cotización ya fue aceptada y no puede reenviarse" },
        { status: 400 }
      )
    }

    const normalizedPhone = normalizePhone(quote.clientPhone)

    if (!normalizedPhone) {
      return NextResponse.json(
        { error: "El teléfono del cliente no es válido" },
        { status: 400 }
      )
    }

    const responseToken = await generateUniqueResponseToken()

    const sentAt = new Date()
    const responseExpiresAt = new Date(
      sentAt.getTime() + RESPONSE_EXPIRATION_HOURS * 60 * 60 * 1000
    )

    await prisma.$transaction([
      prisma.quote.update({
        where: { id: quote.id },
        data: {
          status: "PENDING",
          sendChannel: "WHATSAPP",
          sentAt,
          responseExpiresAt,
          respondedAt: null,
          responseToken,
          responseChannel: "WHATSAPP",
        },
      }),
      prisma.quoteEvent.create({
        data: {
          quoteId: quote.id,
          userId,
          type: "QUOTE_SENT",
          title: "Cotización enviada",
          message: `La cotización "${quote.title}" fue enviada a ${quote.clientName} por WhatsApp.`,
          metadata: {
            clientName: quote.clientName,
            sendChannel: "WHATSAPP",
            responseExpiresAt: responseExpiresAt.toISOString(),
          },
        },
      }),
    ])

    const baseUrl = getBaseUrl(request)
    const pdfUrl = `${baseUrl}/api/quotes/${
      quote.id
    }/pdf?token=${encodeURIComponent(responseToken)}`

    const responseUrl = `${baseUrl}/quotes/respond/${responseToken}`

    const formattedTotal = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 2,
    }).format(Number(quote.total))

    const message = [
      `Hola *${quote.clientName}*,`,
      ``,
      `Te comparto tu cotización *"${quote.title}"* generada especialmente para ti.`,
      ``,
      `*Total:* ${formattedTotal}`,
      ``,
      `*Revisa tu cotización aquí:*`,
      responseUrl,
      ``,
      `Desde ese enlace puedes:`,
      `• Ver el detalle completo`,
      `• Descargar el PDF`,
      `• Aceptar o rechazar la propuesta`,
      ``,
      `Este enlace estará disponible por *${RESPONSE_EXPIRATION_HOURS} horas*.`,
      ``,
      `Cualquier duda, con gusto te ayudamos.`,
    ].join("\n")

    const whatsappUrl = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(
      message
    )}`

    return NextResponse.json({
      ok: true,
      message: "Enlace de WhatsApp generado correctamente",
      whatsappUrl,
      pdfUrl,
      responseUrl,
      responseToken,
      expiresAt: responseExpiresAt.toISOString(),
    })
  } catch (error) {
    console.error("ERROR PREPARING QUOTE WHATSAPP:", error)

    return NextResponse.json(
      { error: "Error al preparar el envío por WhatsApp" },
      { status: 500 }
    )
  }
}
