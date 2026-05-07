"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import type { UserConfig, Cotizacion, Plantilla } from "@/types/dashboard"
import DashboardHero from "./sections/DashboardHero"
import DashboardTopGrid from "./sections/DashboardTopGrid"
import ProUpsellModal from "./modals/ProUpsellModal"

type DashboardInicioProps = {
  userConfig?: UserConfig
  cotizaciones?: Cotizacion[]
  plantillasDisponibles?: Plantilla[]
}

type PlanApiResponse = {
  plan?: "free" | "pro" | "premium" | string
  quotesUsed?: number | null
  maxQuotes?: number | null
  trialQuotesLimit?: number | null
  trialBlocked?: boolean | null
  billingCycle?: "monthly" | null
  planStartedAt?: string | null
  planExpiresAt?: string | null
  renewsAt?: string | null
}

type DashboardUserConfigWithPlan = UserConfig & {
  quotesUsed?: number
  trialQuotesLimit?: number
  trialBlocked?: boolean
  billingCycle?: "monthly" | null
  planStartedAt?: string | null
  planExpiresAt?: string | null
  renewsAt?: string | null
}

const UPSELL_STORAGE_KEY = "dashboard-pro-upsell-free-3-of-5"

function normalizePlan(plan: unknown): UserConfig["plan"] {
  const normalizedPlan = String(plan ?? "free").trim().toLowerCase()

  if (normalizedPlan === "pro") return "pro"

  if (
    normalizedPlan === "premium" ||
    normalizedPlan === "empresa" ||
    normalizedPlan === "business"
  ) {
    return "premium"
  }

  return "free"
}

export default function DashboardInicio({
  userConfig,
  cotizaciones = [],
  plantillasDisponibles = [],
}: DashboardInicioProps) {
  void plantillasDisponibles

  const [showProUpsell, setShowProUpsell] = useState(false)
  const [planData, setPlanData] = useState<PlanApiResponse | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadCurrentPlan() {
      try {
        const response = await fetch("/api/user/plan", {
          method: "GET",
          cache: "no-store",
        })

        if (!response.ok) return

        const data = (await response.json()) as PlanApiResponse

        if (isMounted) {
          setPlanData(data)
        }
      } catch {
        if (isMounted) {
          setPlanData(null)
        }
      }
    }

    loadCurrentPlan()

    return () => {
      isMounted = false
    }
  }, [])

  const resolvedUserConfig = useMemo<DashboardUserConfigWithPlan | undefined>(() => {
    if (!userConfig && !planData) return undefined

    const plan = normalizePlan(planData?.plan ?? userConfig?.plan)
    const quotesUsed =
      planData?.quotesUsed ?? userConfig?.cotizacionesUsadas ?? 0
    const trialQuotesLimit =
      planData?.trialQuotesLimit ?? userConfig?.cotizacionesMax ?? 5
    const maxQuotes =
      planData?.maxQuotes ?? trialQuotesLimit ?? userConfig?.cotizacionesMax ?? 5

    return {
      ...userConfig,
      plan,
      cotizacionesUsadas: quotesUsed,
      cotizacionesMax: maxQuotes,
      quotesUsed,
      trialQuotesLimit,
      trialBlocked: Boolean(planData?.trialBlocked),
      billingCycle: planData?.billingCycle ?? null,
      planStartedAt: planData?.planStartedAt ?? null,
      planExpiresAt: planData?.planExpiresAt ?? null,
      renewsAt: planData?.renewsAt ?? null,
    }
  }, [userConfig, planData])

  const plan = resolvedUserConfig?.plan ?? "free"
  const cotizacionesUsadas = resolvedUserConfig?.cotizacionesUsadas ?? 0
  const cotizacionesMax = resolvedUserConfig?.cotizacionesMax ?? 5
  const cotizacionesRestantes = Math.max(0, cotizacionesMax - cotizacionesUsadas)

  const shouldShowProUpsell = useMemo(
    () =>
      plan === "free" &&
      cotizacionesMax === 5 &&
      cotizacionesUsadas === 3 &&
      cotizacionesRestantes === 2,
    [plan, cotizacionesMax, cotizacionesUsadas, cotizacionesRestantes],
  )

  const markUpsellAsSeen = useCallback(() => {
    if (typeof window === "undefined") return

    window.localStorage.setItem(UPSELL_STORAGE_KEY, "true")
  }, [])

  const handleCloseUpsell = useCallback(() => {
    markUpsellAsSeen()
    setShowProUpsell(false)
  }, [markUpsellAsSeen])

  useEffect(() => {
    if (!shouldShowProUpsell || typeof window === "undefined") return

    const alreadySeen = window.localStorage.getItem(UPSELL_STORAGE_KEY) === "true"
    if (alreadySeen) return

    const timer = window.setTimeout(() => {
      setShowProUpsell(true)
    }, 450)

    return () => window.clearTimeout(timer)
  }, [shouldShowProUpsell])

  useEffect(() => {
    if (!showProUpsell) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseUpsell()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [showProUpsell, handleCloseUpsell])

  return (
    <>
      <ProUpsellModal
        open={showProUpsell}
        onClose={handleCloseUpsell}
        onSeen={markUpsellAsSeen}
      />

      <motion.section
        className="min-h-full"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.6 }}
      >
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
          >
            <DashboardHero userConfig={resolvedUserConfig} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
          >
            <DashboardTopGrid
              userConfig={resolvedUserConfig}
              cotizaciones={cotizaciones}
            />
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}



