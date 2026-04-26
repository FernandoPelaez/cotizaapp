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

const UPSELL_STORAGE_KEY = "dashboard-pro-upsell-free-3-of-5"

export default function DashboardInicio({
  userConfig,
  cotizaciones = [],
  plantillasDisponibles = [],
}: DashboardInicioProps) {
  void plantillasDisponibles

  const [showProUpsell, setShowProUpsell] = useState(false)

  const plan = userConfig?.plan ?? "free"
  const cotizacionesUsadas = userConfig?.cotizacionesUsadas ?? 0
  const cotizacionesMax = userConfig?.cotizacionesMax ?? 5
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

      {/* Animación del dashboard */}
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
            <DashboardHero userConfig={userConfig} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
          >
            <DashboardTopGrid
              userConfig={userConfig}
              cotizaciones={cotizaciones}
            />
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}
