import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

type QuoteItemInput = {
  name?: string
  quantity?: number | string
  price?: number | string
}

type UserPlanLike = {
  name?: string | null
  maxQuotes?: number | null
} | null

function toNumber(value: unknown) {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

function toTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : ""
}

function isTrialPlan(plan: UserPlanLike) {
  const planName = plan?.name?.toLowerCase?.().trim() ?? ""

  return (
    !plan ||
    planName === "free" ||
    planName === "gratis" ||
    planName === "gratuito" ||
    planName.includes("free") ||
    planName.includes("gratis")
  )
}

async function getUserIdFromSession() {
  const session = await getServerSession(authOptions)
  return (session?.user as { id?: string } | undefined)?.id
}

async function expirePendingQuotes(userId: string) {
  const now = new Date()

  const quotesToExpire = await prisma.quote.findMany({
    where: {
      userId,
      status: "PENDING",
      responseExpiresAt: {
        not: null,
        lte: now,
      },
      respondedAt: null,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      clientName: true,
      status: true,
    },
  })

  if (quotesToExpire.length === 0) {
    return
  }

  for (const quote of quotesToExpire) {
    await prisma.$transaction([
      prisma.quote.update({
        where: {
          id: quote.id,
        },
        data: {
          status: "EXPIRED",
        },
      }),
      prisma.quoteEvent.create({
        data: {
          quoteId: quote.id,
          userId: quote.userId,
          type: "QUOTE_EXPIRED",
          title: "Cotización expirada",
          message: `La cotización "${quote.title}" expiró sin respuesta del cliente.`,
          metadata: {
            clientName: quote.clientName,
            previousStatus: quote.status,
            expiredAt: now.toISOString(),
          },
        },
      }),
    ])
  }
}

export async function GET() {
  try {
    const userId = await getUserIdFromSession()

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    await expirePendingQuotes(userId)

    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const [quotes, totalThisMonth, user] = await Promise.all([
      prisma.quote.findMany({
        where: { userId },
        include: {
          items: true,
          template: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.quote.count({
        where: {
          userId,
          createdAt: { gte: startOfMonth },
        },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          profileType: true,
          profileCompleted: true,
          quotesUsed: true,
          trialQuotesLimit: true,
          trialBlocked: true,
          plan: {
            select: {
              id: true,
              name: true,
              maxQuotes: true,
            },
          },
        },
      }),
    ])

    return NextResponse.json({
      quotes,
      totalThisMonth,
      user,
    })
  } catch (error) {
    console.error("ERROR GET QUOTES API:", error)

    return NextResponse.json(
      { error: "Error al obtener cotizaciones" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession()

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        plan: true,
        profile: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    if (!user.profileCompleted || !user.profileType) {
      return NextResponse.json(
        {
          error: "PROFILE_INCOMPLETE",
          message: "Debes completar tu perfil antes de crear cotizaciones",
        },
        { status: 403 }
      )
    }

    const userIsTrial = isTrialPlan(user.plan)
    const trialQuotesLimit = user.trialQuotesLimit ?? 5
    const quotesUsed = user.quotesUsed ?? 0

    if (userIsTrial && (user.trialBlocked || quotesUsed >= trialQuotesLimit)) {
      if (!user.trialBlocked) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            trialBlocked: true,
          },
        })
      }

      return NextResponse.json(
        {
          error: "TRIAL_BLOCKED",
          message: "Ya alcanzaste el límite de cotizaciones de prueba",
          trialQuotesLimit,
          quotesUsed,
          trialBlocked: true,
        },
        { status: 403 }
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

    const maxQuotes = user.plan?.maxQuotes ?? null

    if (!userIsTrial && maxQuotes && maxQuotes > 0) {
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const totalQuotesThisMonth = await prisma.quote.count({
        where: {
          userId,
          createdAt: { gte: startOfMonth },
        },
      })

      if (totalQuotesThisMonth >= maxQuotes) {
        return NextResponse.json(
          {
            error: "LIMIT_REACHED",
            message: `Has alcanzado el límite de ${maxQuotes} cotizaciones en tu plan`,
            maxQuotes,
            totalQuotes: totalQuotesThisMonth,
          },
          { status: 403 }
        )
      }
    }

    let safeTemplateId: string | null = null

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

      safeTemplateId = existingTemplate?.id ?? null
    }

    const quote = await prisma.quote.create({
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
        status: "DRAFT",
        sendChannel: "PDF",
        userId,
        templateId: safeTemplateId,
        items: {
          create: normalizedItems,
        },
      },
      include: {
        items: true,
        template: true,
      },
    })

    let nextQuotesUsed = quotesUsed
    let nextTrialBlocked = user.trialBlocked ?? false

    if (userIsTrial) {
      nextQuotesUsed = quotesUsed + 1
      nextTrialBlocked = nextQuotesUsed >= trialQuotesLimit

      await prisma.user.update({
        where: { id: userId },
        data: {
          quotesUsed: nextQuotesUsed,
          trialBlocked: nextTrialBlocked,
        },
      })
    }

    return NextResponse.json({
      ...quote,
      quotesUsed: nextQuotesUsed,
      trialBlocked: nextTrialBlocked,
      trialQuotesLimit,
    })
  } catch (error) {
    console.error("ERROR POST QUOTES API:", error)

    return NextResponse.json(
      { error: "Error al crear cotización" },
      { status: 500 }
    )
  }
}
