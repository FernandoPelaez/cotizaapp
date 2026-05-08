"use client"

import { motion, type Variants } from "framer-motion"
import { useRouter } from "next/navigation"
import type { Cotizacion, UserConfig } from "@/types/dashboard"
import PlanFreeCard from "../cards/PlanFreeCard"
import QuickActionsCard from "../cards/QuickActionsCard"
import RecentQuotesCard from "../cards/RecentQuotesCard"
import DashboardTemplatesSection from "./DashboardTemplatesSection"

type DashboardTopGridProps = {
  userConfig?: UserConfig
  cotizaciones?: Cotizacion[]
  onUpgrade?: () => void
}

type TrialAwareUserConfig = UserConfig & {
  trialBlocked?: boolean
  quotesUsed?: number
  trialQuotesLimit?: number
}

const DASHBOARD_ROW_HEIGHT = 470
const CENTER_CARD_GAP = 16
const CENTER_CARD_HEIGHT = (DASHBOARD_ROW_HEIGHT - CENTER_CARD_GAP) / 2

const DASHBOARD_GRID_EASE: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
]

const dashboardGridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.14,
    },
  },
}

const dashboardGridItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.995,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.52,
      ease: DASHBOARD_GRID_EASE,
    },
  },
}

const dashboardCenterStackVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
    },
  },
}

function isFreePlan(plan: unknown) {
  const normalizedPlan = String(plan ?? "free").trim().toLowerCase()

  return (
    normalizedPlan === "free" ||
    normalizedPlan === "gratis" ||
    normalizedPlan === "gratuito"
  )
}

export default function DashboardTopGrid({
  userConfig,
  cotizaciones = [],
  onUpgrade,
}: DashboardTopGridProps) {
  const router = useRouter()

  const dashboardCotizaciones = cotizaciones
  const trialUserConfig = userConfig as TrialAwareUserConfig | undefined

  const plan = trialUserConfig?.plan ?? "free"
  const cotizacionesUsadas =
    trialUserConfig?.cotizacionesUsadas ?? trialUserConfig?.quotesUsed ?? 0
  const cotizacionesMax =
    trialUserConfig?.cotizacionesMax ?? trialUserConfig?.trialQuotesLimit ?? 5
  const trialBlocked = Boolean(trialUserConfig?.trialBlocked)

  const isQuoteCreationBlocked =
    isFreePlan(plan) &&
    (trialBlocked ||
      (cotizacionesMax > 0 && cotizacionesUsadas >= cotizacionesMax))

  const handleNuevaCotizacion = () => {
    if (isQuoteCreationBlocked) return

    router.push("/cotizaciones/nueva")
  }

  const handleVerHistorial = () => {
    router.push("/cotizaciones")
  }

  const handleExplorarPlantillas = () => {
    router.push("/plantillas")
  }

  return (
    <motion.section
      className="grid items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_360px_290px]"
      style={{ minHeight: `${DASHBOARD_ROW_HEIGHT}px` }}
      variants={dashboardGridVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="min-w-0 [&>section]:h-full [&>section>article]:h-full"
        style={{
          height: `${DASHBOARD_ROW_HEIGHT}px`,
          willChange: "opacity, transform",
        }}
        variants={dashboardGridItemVariants}
      >
        <DashboardTemplatesSection cotizaciones={dashboardCotizaciones} />
      </motion.div>

      <motion.div
        className="grid min-w-0"
        style={{
          gap: `${CENTER_CARD_GAP}px`,
          height: `${DASHBOARD_ROW_HEIGHT}px`,
          willChange: "opacity, transform",
        }}
        variants={dashboardCenterStackVariants}
      >
        <motion.div
          className="[&>article]:!h-full"
          style={{
            height: `${CENTER_CARD_HEIGHT}px`,
            willChange: "opacity, transform",
          }}
          variants={dashboardGridItemVariants}
        >
          <QuickActionsCard
            historialTotal={dashboardCotizaciones.length}
            plantillasDisponibles={0}
            nuevaCotizacionDisabled={isQuoteCreationBlocked}
            onNuevaCotizacion={handleNuevaCotizacion}
            onVerHistorial={handleVerHistorial}
            onExplorarPlantillas={handleExplorarPlantillas}
          />
        </motion.div>

        <motion.div
          className="[&>article]:!h-full"
          style={{
            height: `${CENTER_CARD_HEIGHT}px`,
            willChange: "opacity, transform",
          }}
          variants={dashboardGridItemVariants}
        >
          <RecentQuotesCard cotizaciones={dashboardCotizaciones} />
        </motion.div>
      </motion.div>

      <motion.div
        className="xl:justify-self-end [&>article]:!h-full"
        style={{
          height: `${DASHBOARD_ROW_HEIGHT}px`,
          willChange: "opacity, transform",
        }}
        variants={dashboardGridItemVariants}
      >
        <PlanFreeCard userConfig={userConfig} onUpgrade={onUpgrade} />
      </motion.div>
    </motion.section>
  )
}
