import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

type SessionUser = {
  id?: string | null
}

type PlanId = "free" | "pro" | "premium"

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status })
}

async function getUserId() {
  const session = await getServerSession(authOptions)
  return ((session?.user as SessionUser | undefined)?.id ?? null) as string | null
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

  if (normalized === "premium" || normalized === "empresa") {
    return "premium"
  }

  return null
}

function mapPlanIdToDbName(planId: PlanId) {
  switch (planId) {
    case "pro":
      return "Pro"
    case "premium":
      return "Premium"
    case "free":
    default:
      return "Free"
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

export async function GET() {
  try {
    const userId = await getUserId()

    if (!userId) {
      return json({ error: "No autorizado" }, 401)
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        quotesUsed: true,
        trialQuotesLimit: true,
        trialBlocked: true,
        planId: true,
        plan: {
          select: {
            id: true,
            name: true,
            price: true,
            maxQuotes: true,
            whatsappSend: true,
          },
        },
      },
    })

    if (!user) {
      return json({ error: "Usuario no encontrado" }, 404)
    }

    const currentPlanId = mapDbPlanNameToPlanId(user.plan?.name)

    return json({
      plan: currentPlanId,
      planId: user.planId,
      planName: user.plan?.name ?? "Free",
      price: user.plan?.price ?? 0,
      maxQuotes: user.plan?.maxQuotes ?? user.trialQuotesLimit ?? 5,
      whatsappSend: user.plan?.whatsappSend ?? false,
      quotesUsed: user.quotesUsed ?? 0,
      trialQuotesLimit: user.trialQuotesLimit ?? 5,
      trialBlocked: user.trialBlocked ?? false,
    })
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

    const nextPlan = normalizePlanInput((body as Record<string, unknown>).plan)

    if (!nextPlan) {
      return json({ error: "Plan inválido" }, 400)
    }

    const dbPlanName = mapPlanIdToDbName(nextPlan)

    const [targetPlan, user] = await Promise.all([
      prisma.plan.findFirst({
        where: {
          name: dbPlanName,
        },
        select: {
          id: true,
          name: true,
          price: true,
          maxQuotes: true,
          whatsappSend: true,
        },
      }),
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
      return json({ error: "El plan solicitado no existe en la base de datos" }, 404)
    }

    const trialQuotesLimit = user.trialQuotesLimit ?? 5
    const quotesUsed = user.quotesUsed ?? 0

    const nextTrialBlocked =
      nextPlan === "free" ? quotesUsed >= trialQuotesLimit : false

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        planId: targetPlan.id,
        trialBlocked: nextTrialBlocked,
      },
      select: {
        id: true,
        planId: true,
        quotesUsed: true,
        trialQuotesLimit: true,
        trialBlocked: true,
        plan: {
          select: {
            id: true,
            name: true,
            price: true,
            maxQuotes: true,
            whatsappSend: true,
          },
        },
      },
    })

    return json({
      success: true,
      message: "Plan actualizado correctamente",
      plan: mapDbPlanNameToPlanId(updatedUser.plan?.name),
      planId: updatedUser.planId,
      planName: updatedUser.plan?.name ?? "Free",
      price: updatedUser.plan?.price ?? 0,
      maxQuotes: updatedUser.plan?.maxQuotes ?? updatedUser.trialQuotesLimit ?? 5,
      whatsappSend: updatedUser.plan?.whatsappSend ?? false,
      quotesUsed: updatedUser.quotesUsed ?? 0,
      trialQuotesLimit: updatedUser.trialQuotesLimit ?? 5,
      trialBlocked: updatedUser.trialBlocked ?? false,
    })
  } catch (error) {
    console.error("PATCH /api/user/plan error:", error)
    return json({ error: "Error interno del servidor" }, 500)
  }
}

export async function POST(req: Request) {
  return PATCH(req)
}
