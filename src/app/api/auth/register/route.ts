import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"

type PlanSlug = "free" | "pro" | "empresa"

const VALID_PLANS: PlanSlug[] = ["free", "pro", "empresa"]

function parsePlan(plan: unknown): PlanSlug | null {
  if (plan === undefined || plan === null || plan === "") {
    return "free"
  }

  if (typeof plan !== "string") {
    return null
  }

  if (!VALID_PLANS.includes(plan as PlanSlug)) {
    return null
  }

  return plan as PlanSlug
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name, plan } = body

    const selectedPlan = parsePlan(plan)

    if (!selectedPlan) {
      return NextResponse.json({ error: "INVALID_PLAN" }, { status: 400 })
    }

    if (!email || !password || !name) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 })
    }

    const emailNormalized = String(email).toLowerCase().trim()
    const nameNormalized = String(name).trim()

    if (!emailNormalized || !nameNormalized) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 })
    }

    if (String(password).length < 6) {
      return NextResponse.json({ error: "WEAK_PASSWORD" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: emailNormalized },
      select: { id: true },
    })

    if (existingUser) {
      return NextResponse.json({ error: "USER_ALREADY_EXISTS" }, { status: 400 })
    }

    const freePlan = await prisma.plan.findUnique({
      where: { slug: "free" },
      select: { id: true },
    })

    if (!freePlan) {
      console.error("REGISTER ERROR: No existe el plan Free en la base de datos")

      return NextResponse.json(
        { error: "INTERNAL_SERVER_ERROR" },
        { status: 500 }
      )
    }

    const hashedPassword = await bcrypt.hash(String(password), 10)

    const user = await prisma.user.create({
      data: {
        email: emailNormalized,
        name: nameNormalized,
        password: hashedPassword,
        planId: freePlan.id,
        quotesUsed: 0,
        trialBlocked: false,
        trialQuotesLimit: 5,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profileCompleted: true,
        onboardingStep: true,
        planId: true,
        createdAt: true,
      },
    })

    return NextResponse.json(
      {
        message: "USER_CREATED",
        user,
        selectedPlan,
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    const prismaError = error as { message?: string; code?: string }

    console.error("REGISTER ERROR:", {
      message: prismaError?.message,
      code: prismaError?.code,
    })

    if (prismaError.code === "P2002") {
      return NextResponse.json({ error: "USER_ALREADY_EXISTS" }, { status: 400 })
    }

    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    )
  }
}
