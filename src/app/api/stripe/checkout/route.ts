import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import {
  isPaidPlanSlug,
  type PaidPlanSlug,
} from "@/lib/plans/plan-utils"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const STRIPE_PRICE_BY_PLAN: Record<PaidPlanSlug, string | undefined> = {
  pro: process.env.STRIPE_PRICE_PRO,
  empresa: process.env.STRIPE_PRICE_EMPRESA,
}

function getAppUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    "http://localhost:3000"
  )
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const sessionEmail = session?.user?.email

    if (!sessionEmail) {
      return NextResponse.json(
        { error: "UNAUTHORIZED" },
        { status: 401 }
      )
    }

    const body = await req.json().catch(() => null)
    const plan = body?.plan

    if (!isPaidPlanSlug(plan)) {
      return NextResponse.json(
        { error: "INVALID_PLAN" },
        { status: 400 }
      )
    }

    const stripePriceId = STRIPE_PRICE_BY_PLAN[plan]

    if (!stripePriceId) {
      return NextResponse.json(
        { error: "STRIPE_PRICE_NOT_CONFIGURED" },
        { status: 500 }
      )
    }

    const emailNormalized = sessionEmail.toLowerCase().trim()

    const user = await prisma.user.findUnique({
      where: { email: emailNormalized },
      select: {
        id: true,
        name: true,
        email: true,
        stripeCustomerId: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "USER_NOT_FOUND" },
        { status: 404 }
      )
    }

    const dbPlan = await prisma.plan.findUnique({
      where: { slug: plan },
      select: {
        id: true,
        slug: true,
        name: true,
      },
    })

    if (!dbPlan) {
      return NextResponse.json(
        { error: "PLAN_NOT_FOUND" },
        { status: 404 }
      )
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
        where: { id: user.id },
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
      return NextResponse.json(
        { error: "CHECKOUT_URL_NOT_CREATED" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      url: checkoutSession.url,
    })
  } catch (error: unknown) {
    const err = error as { message?: string }

    console.error("STRIPE_CHECKOUT_ERROR:", {
      message: err?.message,
    })

    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    )
  }
}
