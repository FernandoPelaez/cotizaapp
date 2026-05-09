import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

type SessionUser = {
  id?: string | null
}

type PlanId = "free" | "pro" | "premium"

type BillingCycle = "monthly" | null

type UserPlanPayload = {
  id: string
  quotesUsed: number | null
  trialQuotesLimit: number | null
  trialBlocked: boolean | null
  planId: string | null
  updatedAt: Date
  plan: {
    id: string
    name: string
    price: number
    maxQuotes: number | null
    whatsappSend: boolean
  } | null
}

const planSelect = {
  id: true,
  name: true,
  price: true,
  maxQuotes: true,
  whatsappSend: true,
} as const

const userPlanSelect = {
  id: true,
  quotesUsed: true,
  trialQuotesLimit: true,
  trialBlocked: true,
  planId: true,
  updatedAt: true,

  plan: {
    select: planSelect,
  },
} as const

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status })
}

async function getUserId() {
  const session = await getServerSession(authOptions)

  return ((session?.user as SessionUser | undefined)?.id ?? null) as
    | string
    | null
}

function normalizePlanInput(value: unknown): PlanId | null {
  if (typeof value !== "string") return null

  const normalized = value.trim().toLowerCase()

  if (normalized === "free" || normalized === "gratis") {
    return "free"
  }

  if (normalized === "pro") {
    return "pro"
  }

  if (
    normalized === "premium" ||
    normalized === "empresa" ||
    normalized === "business"
  ) {
    return "premium"
  }

  return null
}

function getPlanDbNames(planId: PlanId) {
  switch (planId) {
    case "pro":
      return ["Pro", "pro", "PRO"]

    case "premium":
      return ["Empresa", "Premium", "empresa", "premium", "EMPRESA", "PREMIUM"]

    case "free":
    default:
      return ["Free", "Gratis", "free", "gratis", "FREE", "GRATIS"]
  }
}

function mapDbPlanNameToPlanId(planName?: string | null): PlanId {
  const normalized = planName?.trim().toLowerCase() ?? ""

  if (normalized.includes("premium") || normalized.includes("empresa")) {
    return "premium"
  }

  if (normalized.includes("pro")) {
    return "pro"
  }

  return "free"
}

function addMonths(date: Date, months: number) {
  const result = new Date(date)
  const originalDay = result.getDate()

  result.setMonth(result.getMonth() + months)

  if (result.getDate() < originalDay) {
    result.setDate(0)
  }

  return result
}

function getBillingInfo(planId: PlanId, referenceDate: Date) {
  if (planId === "free") {
    return {
      billingCycle: null as BillingCycle,
      planStartedAt: null,
      planExpiresAt: null,
      renewsAt: null,
    }
  }

  const startedAt = new Date(referenceDate)
  const expiresAt = addMonths(startedAt, 1)

  return {
    billingCycle: "monthly" as BillingCycle,
    planStartedAt: startedAt.toISOString(),
    planExpiresAt: expiresAt.toISOString(),
    renewsAt: expiresAt.toISOString(),
  }
}

function buildPlanResponse(
  user: UserPlanPayload,
  extra?: Record<string, unknown>,
) {
  const currentPlanId = mapDbPlanNameToPlanId(user.plan?.name)
  const billing = getBillingInfo(currentPlanId, user.updatedAt)

  return {
    ...extra,
    plan: currentPlanId,
    planId: user.planId,
    planName: user.plan?.name ?? "Free",
    price: user.plan?.price ?? 0,
    maxQuotes: user.plan?.maxQuotes ?? user.trialQuotesLimit ?? 5,
    whatsappSend: user.plan?.whatsappSend ?? false,
    quotesUsed: user.quotesUsed ?? 0,
    trialQuotesLimit: user.trialQuotesLimit ?? 5,
    trialBlocked: user.trialBlocked ?? false,

    ...billing,
  }
}

async function findPlanByPlanId(planId: PlanId) {
  const names = getPlanDbNames(planId)

  return prisma.plan.findFirst({
    where: {
      OR: names.map((name) => ({ name })),
    },
    select: planSelect,
  })
}

export async function GET() {
  try {
    const userId = await getUserId()

    if (!userId) {
      return json({ error: "No autorizado" }, 401)
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: userPlanSelect,
    })

    if (!user) {
      return json({ error: "Usuario no encontrado" }, 404)
    }

    return json(buildPlanResponse(user))
  } catch (error) {
    console.error("GET /api/user/plan error:", error)

    return json({ error: "Error interno del servidor" }, 500)
  }
}

export async function PATCH(req: Request) {
  try {
    const userId = await getUserId()

    if (!userId) {
      return json({ error: "No autorizado" }, 401)
    }

    const body = await req.json().catch(() => null)

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return json({ error: "Payload inválido" }, 400)
    }

    const payload = body as Record<string, unknown>

    const nextPlan = normalizePlanInput(
      payload.plan ?? payload.planId ?? payload.id ?? payload.name,
    )

    if (!nextPlan) {
      return json({ error: "Plan inválido" }, 400)
    }

    /*
      IMPORTANTE:
      Los planes pagados NO se activan desde este endpoint.
      Pro y Empresa/Premium deben activarse únicamente después
      de confirmar el pago con Stripe, idealmente desde un webhook.
    */
    if (nextPlan !== "free") {
      return json(
        {
          error:
            "Para activar Pro o Empresa debes completar el pago con Stripe.",
          checkoutRequired: true,
          requestedPlan: nextPlan,
        },
        402,
      )
    }

    const [targetPlan, user] = await Promise.all([
      findPlanByPlanId("free"),
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          quotesUsed: true,
          trialQuotesLimit: true,
        },
      }),
    ])

    if (!user) {
      return json({ error: "Usuario no encontrado" }, 404)
    }

    if (!targetPlan) {
      return json(
        {
          error: "El plan gratuito no existe en la base de datos",
          requestedPlan: "free",
          searchedNames: getPlanDbNames("free"),
        },
        404,
      )
    }

    const trialQuotesLimit = user.trialQuotesLimit ?? 5
    const quotesUsed = user.quotesUsed ?? 0
    const nextTrialBlocked = quotesUsed >= trialQuotesLimit

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        planId: targetPlan.id,
        trialBlocked: nextTrialBlocked,
      },
      select: userPlanSelect,
    })

    return json(
      buildPlanResponse(updatedUser, {
        success: true,
        message: "Plan gratuito actualizado correctamente",
      }),
    )
  } catch (error) {
    console.error("PATCH /api/user/plan error:", error)

    return json({ error: "Error interno del servidor" }, 500)
  }
}

export async function POST() {
  return json(
    {
      error:
        "Este endpoint no activa planes pagados. Usa Stripe Checkout para Pro o Empresa.",
    },
    405,
  )
}
