import { NextResponse } from "next/server"
import Stripe from "stripe"
import { SubscriptionStatus } from "@prisma/client"

import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type StripeSubscriptionSafe = Stripe.Subscription & {
  current_period_start?: number | null
  current_period_end?: number | null
  current_period?: {
    start?: number | null
    end?: number | null
  } | null
}

type PlanSlug = "free" | "pro" | "empresa"

function getWebhookSecret() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim()

  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET no está configurada")
  }

  return webhookSecret
}

function toDateFromUnix(seconds?: number | null) {
  if (!seconds) return null
  return new Date(seconds * 1000)
}

function getCurrentPeriodStart(subscription: StripeSubscriptionSafe) {
  return (
    subscription.current_period_start ??
    subscription.current_period?.start ??
    null
  )
}

function getCurrentPeriodEnd(subscription: StripeSubscriptionSafe) {
  return (
    subscription.current_period_end ??
    subscription.current_period?.end ??
    null
  )
}

function mapStripeStatus(status?: string | null): SubscriptionStatus {
  switch (status) {
    case "trialing":
      return SubscriptionStatus.TRIALING
    case "active":
      return SubscriptionStatus.ACTIVE
    case "past_due":
      return SubscriptionStatus.PAST_DUE
    case "canceled":
      return SubscriptionStatus.CANCELED
    case "unpaid":
      return SubscriptionStatus.UNPAID
    case "incomplete":
      return SubscriptionStatus.INCOMPLETE
    case "incomplete_expired":
      return SubscriptionStatus.INCOMPLETE_EXPIRED
    case "paused":
      return SubscriptionStatus.PAUSED
    default:
      return SubscriptionStatus.INACTIVE
  }
}

function getStripeId(value: unknown) {
  if (!value) return null
  if (typeof value === "string") return value

  if (
    typeof value === "object" &&
    "id" in value &&
    typeof value.id === "string"
  ) {
    return value.id
  }

  return null
}

function getPriceIdFromSubscription(subscription: Stripe.Subscription) {
  return subscription.items.data[0]?.price?.id ?? null
}

function getPlanSlugFromPriceId(priceId?: string | null): PlanSlug | null {
  if (!priceId) return null

  const stripePricePro = process.env.STRIPE_PRICE_PRO?.trim()
  const stripePriceEmpresa = process.env.STRIPE_PRICE_EMPRESA?.trim()

  if (priceId === stripePricePro) {
    return "pro"
  }

  if (priceId === stripePriceEmpresa) {
    return "empresa"
  }

  return null
}

async function getPlanForSubscription({
  planId,
  planSlug,
  priceId,
}: {
  planId?: string | null
  planSlug?: string | null
  priceId?: string | null
}) {
  if (planId) {
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
      select: { id: true, slug: true },
    })

    if (plan) return plan
  }

  if (planSlug) {
    const plan = await prisma.plan.findUnique({
      where: { slug: planSlug },
      select: { id: true, slug: true },
    })

    if (plan) return plan
  }

  const slugFromPrice = getPlanSlugFromPriceId(priceId)

  if (slugFromPrice) {
    const plan = await prisma.plan.findUnique({
      where: { slug: slugFromPrice },
      select: { id: true, slug: true },
    })

    if (plan) return plan
  }

  if (priceId) {
    const plan = await prisma.plan.findFirst({
      where: { stripePriceId: priceId },
      select: { id: true, slug: true },
    })

    if (plan) return plan
  }

  return null
}

async function getFreePlanId() {
  const freePlan = await prisma.plan.findUnique({
    where: { slug: "free" },
    select: { id: true },
  })

  return freePlan?.id ?? null
}

function getSubscriptionPayload({
  userId,
  planId,
  stripeCustomerId,
  stripeSubscriptionId,
  stripePriceId,
  status,
  stripeSubscription,
}: {
  userId: string
  planId: string | null
  stripeCustomerId: string
  stripeSubscriptionId: string
  stripePriceId: string | null
  status: SubscriptionStatus
  stripeSubscription: StripeSubscriptionSafe
}) {
  return {
    userId,
    planId,
    stripeCustomerId,
    stripeSubscriptionId,
    stripePriceId,
    status,
    cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
    currentPeriodStart: toDateFromUnix(
      getCurrentPeriodStart(stripeSubscription)
    ),
    currentPeriodEnd: toDateFromUnix(getCurrentPeriodEnd(stripeSubscription)),
    canceledAt: toDateFromUnix(stripeSubscription.canceled_at),
    endedAt: toDateFromUnix(stripeSubscription.ended_at),
  }
}

async function activateSubscriptionFromCheckoutSession(
  checkoutSession: Stripe.Checkout.Session
) {
  const userId =
    checkoutSession.metadata?.userId ?? checkoutSession.client_reference_id

  const planId = checkoutSession.metadata?.planId ?? null
  const planSlug = checkoutSession.metadata?.planSlug ?? null

  const stripeCustomerId = getStripeId(checkoutSession.customer)
  const stripeSubscriptionId = getStripeId(checkoutSession.subscription)

  if (!userId || !stripeCustomerId || !stripeSubscriptionId) {
    console.error("STRIPE_WEBHOOK_CHECKOUT_MISSING_DATA:", {
      userId,
      stripeCustomerId,
      stripeSubscriptionId,
    })

    return
  }

  const stripeSubscription = (await stripe.subscriptions.retrieve(
    stripeSubscriptionId
  )) as StripeSubscriptionSafe

  const stripePriceId = getPriceIdFromSubscription(stripeSubscription)

  const plan = await getPlanForSubscription({
    planId,
    planSlug,
    priceId: stripePriceId,
  })

  if (!plan) {
    console.error("STRIPE_WEBHOOK_PLAN_NOT_FOUND:", {
      planId,
      planSlug,
      stripePriceId,
    })

    return
  }

  const status = mapStripeStatus(stripeSubscription.status)

  const subscriptionPayload = getSubscriptionPayload({
    userId,
    planId: plan.id,
    stripeCustomerId,
    stripeSubscriptionId,
    stripePriceId,
    status,
    stripeSubscription,
  })

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        planId: plan.id,
        stripeCustomerId,
        trialBlocked: false,
      },
    }),

    prisma.subscription.upsert({
      where: {
        stripeSubscriptionId,
      },
      create: subscriptionPayload,
      update: {
        planId: plan.id,
        stripeCustomerId,
        stripePriceId,
        status,
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
        currentPeriodStart: subscriptionPayload.currentPeriodStart,
        currentPeriodEnd: subscriptionPayload.currentPeriodEnd,
        canceledAt: subscriptionPayload.canceledAt,
        endedAt: subscriptionPayload.endedAt,
      },
    }),
  ])

  console.log("STRIPE_WEBHOOK_CHECKOUT_ACTIVATED:", {
    userId,
    planSlug: plan.slug,
    stripeCustomerId,
    stripeSubscriptionId,
    stripePriceId,
    status,
  })
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const stripeSubscription = subscription as StripeSubscriptionSafe
  const stripeSubscriptionId = stripeSubscription.id
  const stripeCustomerId = getStripeId(stripeSubscription.customer)
  const stripePriceId = getPriceIdFromSubscription(stripeSubscription)

  if (!stripeCustomerId) {
    console.error("STRIPE_WEBHOOK_SUBSCRIPTION_WITHOUT_CUSTOMER")
    return
  }

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId },
    select: { id: true },
  })

  if (!user) {
    console.error("STRIPE_WEBHOOK_USER_NOT_FOUND_BY_CUSTOMER:", {
      stripeCustomerId,
      stripeSubscriptionId,
    })

    return
  }

  const plan = await getPlanForSubscription({
    planId: stripeSubscription.metadata?.planId ?? null,
    planSlug: stripeSubscription.metadata?.planSlug ?? null,
    priceId: stripePriceId,
  })

  const status = mapStripeStatus(stripeSubscription.status)

  const shouldActivatePlan =
    status === SubscriptionStatus.ACTIVE ||
    status === SubscriptionStatus.TRIALING

  const subscriptionPayload = getSubscriptionPayload({
    userId: user.id,
    planId: plan?.id ?? null,
    stripeCustomerId,
    stripeSubscriptionId,
    stripePriceId,
    status,
    stripeSubscription,
  })

  await prisma.subscription.upsert({
    where: {
      stripeSubscriptionId,
    },
    create: subscriptionPayload,
    update: {
      planId: plan?.id ?? null,
      stripeCustomerId,
      stripePriceId,
      status,
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      currentPeriodStart: subscriptionPayload.currentPeriodStart,
      currentPeriodEnd: subscriptionPayload.currentPeriodEnd,
      canceledAt: subscriptionPayload.canceledAt,
      endedAt: subscriptionPayload.endedAt,
    },
  })

  if (shouldActivatePlan && plan) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        planId: plan.id,
        stripeCustomerId,
      },
    })
  }

  console.log("STRIPE_WEBHOOK_SUBSCRIPTION_SYNCED:", {
    userId: user.id,
    planSlug: plan?.slug ?? null,
    stripeCustomerId,
    stripeSubscriptionId,
    stripePriceId,
    status,
  })
}

async function cancelSubscription(subscription: Stripe.Subscription) {
  const stripeSubscription = subscription as StripeSubscriptionSafe
  const stripeSubscriptionId = stripeSubscription.id
  const stripeCustomerId = getStripeId(stripeSubscription.customer)

  if (!stripeCustomerId) {
    console.error("STRIPE_WEBHOOK_CANCEL_WITHOUT_CUSTOMER")
    return
  }

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId },
    select: { id: true },
  })

  if (!user) {
    console.error("STRIPE_WEBHOOK_CANCEL_USER_NOT_FOUND:", {
      stripeCustomerId,
      stripeSubscriptionId,
    })

    return
  }

  const freePlanId = await getFreePlanId()

  await prisma.$transaction([
    prisma.subscription.updateMany({
      where: { stripeSubscriptionId },
      data: {
        status: SubscriptionStatus.CANCELED,
        canceledAt: toDateFromUnix(stripeSubscription.canceled_at) ?? new Date(),
        endedAt: toDateFromUnix(stripeSubscription.ended_at) ?? new Date(),
        cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
      },
    }),

    prisma.user.update({
      where: { id: user.id },
      data: {
        planId: freePlanId,
      },
    }),
  ])

  console.log("STRIPE_WEBHOOK_SUBSCRIPTION_CANCELED:", {
    userId: user.id,
    stripeCustomerId,
    stripeSubscriptionId,
    freePlanId,
  })
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "MISSING_STRIPE_SIGNATURE" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, getWebhookSecret())
  } catch (error) {
    const err = error as { message?: string }

    console.error("STRIPE_WEBHOOK_SIGNATURE_ERROR:", err.message)

    return NextResponse.json(
      { error: "INVALID_STRIPE_SIGNATURE" },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const checkoutSession = event.data.object as Stripe.Checkout.Session
        await activateSubscriptionFromCheckoutSession(checkoutSession)
        break
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const stripeSubscription = event.data.object as Stripe.Subscription
        await syncSubscription(stripeSubscription)
        break
      }

      case "customer.subscription.deleted": {
        const stripeSubscription = event.data.object as Stripe.Subscription
        await cancelSubscription(stripeSubscription)
        break
      }

      default: {
        console.log("STRIPE_WEBHOOK_EVENT_IGNORED:", event.type)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    const err = error as { message?: string }

    console.error("STRIPE_WEBHOOK_ERROR:", {
      type: event.type,
      message: err.message,
    })

    return NextResponse.json(
      { error: "WEBHOOK_HANDLER_FAILED" },
      { status: 500 }
    )
  }
}
