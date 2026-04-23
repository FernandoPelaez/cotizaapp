"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { DASHBOARD_PLANS, type DashboardPlanId } from "@/lib/dashboard/plans"
import PlanCard from "./PlanCard"

type PlanesCardsGridProps = {
  currentPlanId?: DashboardPlanId
}

type UpdatePlanResponse = {
  success?: boolean
  plan?: DashboardPlanId
  error?: string
}

export default function PlanesCardsGrid({
  currentPlanId = "free",
}: PlanesCardsGridProps) {
  const router = useRouter()

  const [hoveredPlanId, setHoveredPlanId] = useState<DashboardPlanId | null>(null)
  const [selectedPlanId, setSelectedPlanId] = useState<DashboardPlanId>(currentPlanId)
  const [submittingPlanId, setSubmittingPlanId] = useState<DashboardPlanId | null>(null)
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {DASHBOARD_PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            currentPlanId={selectedPlanId}
            isHovered={hoveredPlanId === plan.id}
            isSubmitting={submittingPlanId === plan.id}
            onSelectPlan={() => handleSelectPlan(plan.id)}
            onMouseEnter={() => setHoveredPlanId(plan.id)}
            onMouseLeave={() => setHoveredPlanId(null)}
          />
        ))}
      </div>

      {successMessage && (
        <div
          className="rounded-xl border px-4 py-3 text-sm"
          style={{
            borderColor: "var(--success, #22c55e)",
            background: "var(--success-bg, rgba(34,197,94,0.08))",
            color: "var(--foreground)",
          }}
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          className="rounded-xl border px-4 py-3 text-sm"
          style={{
            borderColor: "rgba(239,68,68,0.35)",
            background: "rgba(239,68,68,0.08)",
            color: "var(--foreground)",
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
}
