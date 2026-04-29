"use client"

import { AnimatePresence, motion, type Variants } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"

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

type UpdatePlanResponse = {
  success?: boolean
  plan?: DashboardPlanId
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

export default function PlanesCardsGrid({
  currentPlanId = "free",
}: PlanesCardsGridProps) {
  const router = useRouter()

  const [hoveredPlanId, setHoveredPlanId] = useState<DashboardPlanId | null>(
    null
  )
  const [selectedPlanId, setSelectedPlanId] =
    useState<DashboardPlanId>(currentPlanId)
  const [submittingPlanId, setSubmittingPlanId] =
    useState<DashboardPlanId | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSelectPlan(planId: DashboardPlanId) {
    if (planId === selectedPlanId || submittingPlanId) return

    try {
      setSubmittingPlanId(planId)
      setSuccessMessage(null)
      setErrorMessage(null)

      const response = await fetch("/api/user/plan", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: planId,
        }),
      })

      const data = (await response.json()) as UpdatePlanResponse

      if (!response.ok) {
        throw new Error(data.error || "No se pudo actualizar el plan")
      }

      const nextPlanId = data.plan ?? planId

      setSelectedPlanId(nextPlanId)
      setSuccessMessage("Plan actualizado correctamente.")
      router.refresh()
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al actualizar el plan"
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
