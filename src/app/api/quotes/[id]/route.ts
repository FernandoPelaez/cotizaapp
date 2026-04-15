import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

type QuoteItemInput = {
  name?: string
  quantity?: number | string
  price?: number | string
}

function toNumber(value: unknown) {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

function toTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

async function getUserIdFromSession() {
  const session = await getServerSession(authOptions)
  return (session?.user as { id?: string } | undefined)?.id
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromSession()

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await context.params

    const quote = await prisma.quote.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        items: true,
        template: true,
        user: {
          include: {
            profile: true,
            settings: true,
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

    return NextResponse.json(quote)
  } catch (error) {
    console.error("ERROR GET QUOTE BY ID API:", error)

    return NextResponse.json(
      { error: "Error al obtener la cotización" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromSession()

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await context.params

    const existingQuote = await prisma.quote.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        items: true,
        template: true,
      },
    })

    if (!existingQuote) {
      return NextResponse.json(
        { error: "Cotización no encontrada" },
        { status: 404 }
      )
    }

    const body = await req.json()

    const title = toTrimmedString(body.title)
    const description = toTrimmedString(body.description)
    const clientName = toTrimmedString(body.clientName)
    const clientEmail = toTrimmedString(body.clientEmail)
    const clientPhone = toTrimmedString(body.clientPhone)
    const clientAddress = toTrimmedString(body.clientAddress)
    const clientRFC = toTrimmedString(body.clientRFC)
    const notes = toTrimmedString(body.notes)

    const items = Array.isArray(body.items) ? body.items : []
    const discount = body.discount ?? 0
    const tax = body.tax ?? 0
    const validUntil = body.validUntil

    const templateId = toTrimmedString(body.templateId)
    const templateKey = toTrimmedString(body.templateKey)

    if (!title || !clientName || items.length === 0) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      )
    }

    const normalizedItems = (items as QuoteItemInput[])
      .map((item) => {
        const name = toTrimmedString(item.name)
        const quantity = Math.max(0, Math.trunc(toNumber(item.quantity)))
        const price = Math.max(0, toNumber(item.price))

        return {
          name,
          quantity,
          price,
          total: quantity * price,
        }
      })
      .filter((item) => item.name && item.quantity > 0)

    if (normalizedItems.length === 0) {
      return NextResponse.json(
        { error: "Debes agregar al menos un concepto válido" },
        { status: 400 }
      )
    }

    const subtotal = normalizedItems.reduce((acc, item) => acc + item.total, 0)
    const discountAmount = Math.max(0, toNumber(discount))
    const taxPercent = Math.max(0, toNumber(tax))
    const taxableBase = Math.max(0, subtotal - discountAmount)
    const taxAmount = taxableBase * (taxPercent / 100)
    const total = taxableBase + taxAmount

    let safeTemplateId: string | null = existingQuote.templateId ?? null

    if (templateId || templateKey) {
      const existingTemplate = await prisma.template.findFirst({
        where: {
          OR: [
            ...(templateId ? [{ id: templateId }] : []),
            ...(templateKey ? [{ name: templateKey }] : []),
          ],
        },
        select: {
          id: true,
          name: true,
        },
      })

      if (!existingTemplate) {
        return NextResponse.json(
          { error: "La plantilla seleccionada no existe" },
          { status: 400 }
        )
      }

      safeTemplateId = existingTemplate.id
    }

    const updatedQuote = await prisma.quote.update({
      where: { id },
      data: {
        title,
        description: description || null,
        clientName,
        clientEmail: clientEmail || null,
        clientPhone: clientPhone || null,
        clientAddress: clientAddress || null,
        clientRFC: clientRFC || null,
        subtotal,
        discount: discountAmount,
        tax: taxPercent,
        total,
        validUntil: validUntil ? new Date(validUntil) : null,
        notes: notes || null,
        templateId: safeTemplateId,
        items: {
          deleteMany: {},
          create: normalizedItems,
        },
      },
      include: {
        items: true,
        template: true,
      },
    })

    return NextResponse.json(updatedQuote)
  } catch (error) {
    console.error("ERROR PATCH QUOTE BY ID API:", error)

    return NextResponse.json(
      { error: "Error al actualizar la cotización" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserIdFromSession()

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { id } = await context.params

    const existingQuote = await prisma.quote.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
      },
    })

    if (!existingQuote) {
      return NextResponse.json(
        { error: "Cotización no encontrada" },
        { status: 404 }
      )
    }

    await prisma.quote.delete({
      where: { id },
    })

    return NextResponse.json({
      ok: true,
      message: "Cotización eliminada correctamente",
    })
  } catch (error) {
    console.error("ERROR DELETE QUOTE BY ID API:", error)

    return NextResponse.json(
      { error: "Error al eliminar la cotización" },
      { status: 500 }
    )
  }
}
