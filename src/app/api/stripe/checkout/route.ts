import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import { isPaidPlanSlug, type PaidPlanSlug } from "@/lib/plans/plan-utils"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function getAppUrl() {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    process.env.APP_URL?.trim() ||
    process.env.NEXTAUTH_URL?.trim() ||
    "http://localhost:3000"

  return appUrl.replace(/\/$/, "")
}

function getStripePriceId(plan: PaidPlanSlug) {
  if (plan === "pro") {
    return process.env.STRIPE_PRICE_PRO?.trim()
  }

  if (plan === "empresa") {
    return process.env.STRIPE_PRICE_EMPRESA?.trim()
  }

  return undefined
}

function jsonError(error: string, status: number, extra?: Record<string, unknown>) {
  console.error("STRIPE_CHECKOUT_ERROR:", {
    error,
    status,
    ...extra,
  })

  return NextResponse.json(
    {
      error,
    },
    {
      status,
    }
  )
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const sessionEmail = session?.user?.email

    if (!sessionEmail) {
      return jsonError("UNAUTHORIZED", 401)
    }

    const body = await req.json().catch(() => null)
    const plan = body?.plan

    if (!isPaidPlanSlug(plan)) {
      return jsonError("INVALID_PLAN", 400, {
        receivedPlan: plan,
      })
    }

    const stripePriceId = getStripePriceId(plan)

    if (!stripePriceId) {
      return jsonError("STRIPE_PRICE_NOT_CONFIGURED", 500, {
        plan,
        hasStripePricePro: Boolean(process.env.STRIPE_PRICE_PRO),
        hasStripePriceEmpresa: Boolean(process.env.STRIPE_PRICE_EMPRESA),
      })
    }

    if (!stripePriceId.startsWith("price_")) {
      return jsonError("INVALID_STRIPE_PRICE_ID", 500, {
        plan,
        stripePriceId,
      })
    }

    const emailNormalized = sessionEmail.toLowerCase().trim()

    const user = await prisma.user.findUnique({
      where: {
        email: emailNormalized,
      },
      select: {
        id: true,
        name: true,
        email: true,
        stripeCustomerId: true,
      },
    })

    if (!user) {
      return jsonError("USER_NOT_FOUND", 404, {
        email: emailNormalized,
      })
    }

    const dbPlan = await prisma.plan.findFirst({
      where: {
        OR: [
          {
            slug: plan,
          },
          {
            stripePriceId,
          },
        ],
      },
      select: {
        id: true,
        slug: true,
        name: true,
        stripePriceId: true,
      },
    })

    if (!dbPlan) {
      return jsonError("PLAN_NOT_FOUND", 404, {
        plan,
        stripePriceId,
      })
    }

    let stripeCustomerId = user.stripeCustomerId

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: {
          userId: user.id,
        },
      })

      stripeCustomerId = customer.id

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          stripeCustomerId,
        },
      })
    }

    const appUrl = getAppUrl()

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeCustomerId,
      client_reference_id: user.id,
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${appUrl}/onboarding/profile?checkout=success&plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/planes?checkout=cancelled&plan=${plan}`,
      metadata: {
        userId: user.id,
        planId: dbPlan.id,
        planSlug: plan,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
          planId: dbPlan.id,
          planSlug: plan,
        },
      },
    })

    if (!checkoutSession.url) {
      return jsonError("CHECKOUT_URL_NOT_CREATED", 500, {
        checkoutSessionId: checkoutSession.id,
      })
    }

    return NextResponse.json({
      url: checkoutSession.url,
    })
  } catch (error: unknown) {
    const err = error as {
      message?: string
      type?: string
      code?: string
    }

    console.error("STRIPE_CHECKOUT_UNEXPECTED_ERROR:", {
      message: err?.message,
      type: err?.type,
      code: err?.code,
    })

    return NextResponse.json(
      {
        error: "INTERNAL_SERVER_ERROR",
      },
      {
        status: 500,
      }
    )
  }
}
