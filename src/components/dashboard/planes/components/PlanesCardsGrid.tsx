"use client"

import { AnimatePresence, motion, type Variants } from "framer-motion"
import { useEffect, useState } from "react"

import { DASHBOARD_PLANS, type DashboardPlanId } from "@/lib/dashboard/plans"

import {
  planesCardVariants,
  planesCardsGridVariants,
  planesEase,
} from "../animations/planes.motion"
import PlanCard from "./PlanCard"

type PlanesCardsGridProps = {
  currentPlanId?: DashboardPlanId
}

type CheckoutPlanSlug = "pro" | "empresa"

type CheckoutResponse = {
  url?: string
  error?: string
}

const messageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.36,
      ease: planesEase,
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.22,
      ease: planesEase,
    },
  },
}

function getCheckoutPlanSlug(planId: DashboardPlanId): CheckoutPlanSlug | null {
  if (planId === "pro") {
    return "pro"
  }

  if (planId === "premium") {
    return "empresa"
  }

  return null
}

async function readCheckoutResponse(response: Response) {
  const data = (await response.json().catch(() => null)) as
    | CheckoutResponse
    | null

  if (!data) {
    throw new Error("Respuesta inválida del servidor")
  }

  return data
}

function getCheckoutErrorMessage(error?: string) {
  switch (error) {
    case "UNAUTHORIZED":
      return "Debes iniciar sesión para elegir un plan."

    case "INVALID_PLAN":
      return "El plan seleccionado no es válido."

    case "USER_NOT_FOUND":
      return "No se encontró tu usuario. Vuelve a iniciar sesión e intenta de nuevo."

    case "PLAN_NOT_FOUND":
      return "El plan seleccionado no existe en la base de datos."

    case "STRIPE_PRICE_NOT_CONFIGURED":
      return "Falta configurar el precio de Stripe para este plan."

    case "INVALID_STRIPE_PRICE_ID":
      return "El Price ID de Stripe no es válido. Debe comenzar con price_."

    case "CHECKOUT_URL_NOT_CREATED":
      return "Stripe no pudo generar el enlace de pago."

    case "INTERNAL_SERVER_ERROR":
      return "Ocurrió un error interno al preparar el pago."

    default:
      return "No se pudo iniciar el pago con Stripe."
  }
}

export default function PlanesCardsGrid({
  currentPlanId = "free",
}: PlanesCardsGridProps) {
  const [hoveredPlanId, setHoveredPlanId] = useState<DashboardPlanId | null>(
    null,
  )

  const [selectedPlanId, setSelectedPlanId] =
    useState<DashboardPlanId>(currentPlanId)

  const [submittingPlanId, setSubmittingPlanId] =
    useState<DashboardPlanId | null>(null)

  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setSelectedPlanId(currentPlanId)
  }, [currentPlanId])

  async function handleSelectPlan(planId: DashboardPlanId) {
    if (planId === selectedPlanId || submittingPlanId) return

    const checkoutPlan = getCheckoutPlanSlug(planId)

    if (!checkoutPlan) {
      setSuccessMessage(null)
      setErrorMessage(
        "El plan gratuito es tu plan base. Para cancelar o bajar de plan, debe hacerse desde la gestión de Stripe.",
      )
      return
    }

    try {
      setSubmittingPlanId(planId)
      setSuccessMessage("Preparando pago seguro con Stripe...")
      setErrorMessage(null)

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: checkoutPlan,
        }),
      })

      const data = await readCheckoutResponse(response)

      if (!response.ok) {
        throw new Error(getCheckoutErrorMessage(data.error))
      }

      if (!data.url) {
        throw new Error("Stripe no devolvió una URL de pago válida.")
      }

      window.location.assign(data.url)
    } catch (error) {
      setSuccessMessage(null)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al iniciar el pago",
      )
    } finally {
      setSubmittingPlanId(null)
    }
  }

  return (
    <div className="space-y-4">
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
        variants={planesCardsGridVariants}
        initial="hidden"
        animate="show"
      >
        {DASHBOARD_PLANS.map((plan) => (
          <motion.div key={plan.id} variants={planesCardVariants}>
            <PlanCard
              plan={plan}
              currentPlanId={selectedPlanId}
              isHovered={hoveredPlanId === plan.id}
              isSubmitting={submittingPlanId === plan.id}
              onSelectPlan={() => handleSelectPlan(plan.id)}
              onMouseEnter={() => setHoveredPlanId(plan.id)}
              onMouseLeave={() => setHoveredPlanId(null)}
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence mode="popLayout">
        {successMessage && (
          <motion.div
            key="plan-success-message"
            className="rounded-xl border px-4 py-3 text-sm"
            variants={messageVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{
              borderColor: "var(--success, #22c55e)",
              background: "var(--success-bg, rgba(34,197,94,0.08))",
              color: "var(--foreground)",
            }}
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        {errorMessage && (
          <motion.div
            key="plan-error-message"
            className="rounded-xl border px-4 py-3 text-sm"
            variants={messageVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{
              borderColor: "rgba(239,68,68,0.35)",
              background: "rgba(239,68,68,0.08)",
              color: "var(--foreground)",
            }}
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
