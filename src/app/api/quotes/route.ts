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

type TemplateCandidate = {
  id: string
  name: string
}

const TEMPLATE_CATEGORIES = ["clasica", "moderna", "premium"] as const
const TEMPLATE_LIMIT_PER_CATEGORY = 10

const QUOTE_TEMPLATE_SELECT = {
  id: true,
  name: true,
  description: true,
  category: true,
  isPremium: true,
  previewUrl: true,
  html: true,
  createdAt: true,
  updatedAt: true,
  businessModel: true,
  profileType: true,
} as const

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

function normalizeTemplateValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
}

function getTrailingTemplateNumber(value: string) {
  const match = value.match(/(?:^|-)(\d+)$/)
  return match?.[1] ?? ""
}

function getKnownTemplateKey(value: string) {
  const normalizedValue = normalizeTemplateValue(value)

  if (!normalizedValue) return null

  if (normalizedValue === "clasica") return "clasica-1"
  if (normalizedValue === "moderna") return "moderna-1"
  if (normalizedValue === "premium") return "premium-1"

  const match = normalizedValue.match(/^(clasica|moderna|premium)-(\d+)$/)

  if (!match) return null

  const category = match[1]
  const number = Number(match[2])

  if (number < 1 || number > TEMPLATE_LIMIT_PER_CATEGORY) return null

  return `${category}-${number}`
}

function getTemplateDisplayName(templateKey: string) {
  const normalizedKey = normalizeTemplateValue(templateKey)
  const [category, number = "1"] = normalizedKey.split("-")

  const categoryName =
    category === "clasica"
      ? "Clásica"
      : category === "moderna"
        ? "Moderna"
        : "Premium"

  return `${categoryName} ${number}`
}

function getTemplateCategory(templateKey: string) {
  const normalizedKey = normalizeTemplateValue(templateKey)
  const category = normalizedKey.split("-")[0]

  if (
    TEMPLATE_CATEGORIES.includes(
      category as (typeof TEMPLATE_CATEGORIES)[number]
    )
  ) {
    return category
  }

  return "clasica"
}

function resolveTemplateFromList(
  templates: TemplateCandidate[],
  candidates: string[]
) {
  const cleanCandidates = Array.from(
    new Set(candidates.map((candidate) => candidate.trim()).filter(Boolean))
  )

  if (cleanCandidates.length === 0) return null

  for (const candidate of cleanCandidates) {
    const exactMatch = templates.find((template) => {
      return template.id === candidate || template.name === candidate
    })

    if (exactMatch) return exactMatch
  }

  for (const candidate of cleanCandidates) {
    const normalizedCandidate = normalizeTemplateValue(candidate)

    const normalizedMatch = templates.find((template) => {
      return (
        normalizeTemplateValue(template.id) === normalizedCandidate ||
        normalizeTemplateValue(template.name) === normalizedCandidate
      )
    })

    if (normalizedMatch) return normalizedMatch
  }

  for (const candidate of cleanCandidates) {
    const normalizedCandidate = normalizeTemplateValue(candidate)
    const candidateNumber = getTrailingTemplateNumber(normalizedCandidate)

    if (!candidateNumber) continue

    const candidateCategory = normalizedCandidate.replace(
      new RegExp(`-${candidateNumber}$`),
      ""
    )

    const numberedMatch = templates.find((template) => {
      const values = [template.id, template.name]

      return values.some((value) => {
        const normalizedValue = normalizeTemplateValue(value)
        const valueNumber = getTrailingTemplateNumber(normalizedValue)

        if (valueNumber !== candidateNumber) return false

        const valueCategory = normalizedValue.replace(
          new RegExp(`-${valueNumber}$`),
          ""
        )

        return (
          valueCategory.includes(candidateCategory) ||
          candidateCategory.includes(valueCategory)
        )
      })
    })

    if (numberedMatch) return numberedMatch
  }

  return null
}

async function createFallbackTemplate(templateKey: string) {
  const safeTemplateKey = getKnownTemplateKey(templateKey)

  if (!safeTemplateKey) return null

  const category = getTemplateCategory(safeTemplateKey)
  const displayName = getTemplateDisplayName(safeTemplateKey)

  const template = await prisma.template.upsert({
    where: {
      name: safeTemplateKey,
    },
    update: {
      description: displayName,
      category,
      isPremium: category === "premium",
    },
    create: {
      name: safeTemplateKey,
      description: displayName,
      category,
      isPremium: category === "premium",
      html: `<div data-template="${safeTemplateKey}"></div>`,
    },
    select: {
      id: true,
    },
  })

  return template.id
}

async function resolveTemplateId(templateId: string, templateKey: string) {
  const knownTemplateId = getKnownTemplateKey(templateId)
  const knownTemplateKey = getKnownTemplateKey(templateKey)

  const candidates = Array.from(
    new Set(
      [
        templateId,
        templateKey,
        knownTemplateId,
        knownTemplateKey,
      ].filter(Boolean) as string[]
    )
  )

  if (candidates.length === 0) {
    return null
  }

  const templates = await prisma.template.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  const selectedTemplate = resolveTemplateFromList(templates, candidates)

  if (selectedTemplate?.id) {
    return selectedTemplate.id
  }

  const fallbackKey = knownTemplateKey ?? knownTemplateId

  if (!fallbackKey) {
    return null
  }

  return createFallbackTemplate(fallbackKey)
}

function parseNullableDate(value: unknown) {
  if (!value || typeof value !== "string") return null

  const date = new Date(value)

  return Number.isNaN(date.getTime()) ? null : date
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
          template: {
            select: QUOTE_TEMPLATE_SELECT,
          },
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

    if (!templateId && !templateKey) {
      return NextResponse.json(
        {
          error: "TEMPLATE_REQUIRED",
          message: "Debes seleccionar una plantilla antes de crear la cotización",
        },
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

    const safeTemplateId = await resolveTemplateId(templateId, templateKey)

    if (!safeTemplateId) {
      return NextResponse.json(
        {
          error: "TEMPLATE_NOT_FOUND",
          message: "La plantilla seleccionada no es válida.",
          receivedTemplateId: templateId || null,
          receivedTemplateKey: templateKey || null,
        },
        { status: 400 }
      )
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
        validUntil: parseNullableDate(validUntil),
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
        template: {
          select: QUOTE_TEMPLATE_SELECT,
        },
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
