"use client"

import { useRouter } from "next/navigation"

import type { Cotizacion, UserConfig } from "@/types/dashboard"
import PlanFreeCard from "../cards/PlanFreeCard"
import QuickActionsCard from "../cards/QuickActionsCard"
import QuoteSummaryCard from "../cards/QuoteSummaryCard"
import RecentQuotesCard from "../cards/RecentQuotesCard"
import DashboardTemplatesSection from "./DashboardTemplatesSection"

type DashboardTopGridProps = {
  userConfig?: UserConfig
  cotizaciones?: Cotizacion[]
}

type CotizacionWithOptionalId = Cotizacion & {
  id?: string | number | null
}

export default function DashboardTopGrid({
  userConfig,
  cotizaciones = [],
}: DashboardTopGridProps) {
  const router = useRouter()

  const cotizacionesRecientes = cotizaciones.slice(0, 4)

  const handleVerTodo = () => {
    router.push("/cotizaciones")
  }

  const handleVerDetalle = (cotizacion: Cotizacion) => {
    const quoteId = String(
      (cotizacion as CotizacionWithOptionalId).id ?? ""
    ).trim()

    if (!quoteId) {
      router.push("/cotizaciones")
      return
    }

    router.push(`/quotes/${quoteId}`)
  }

  return (
    <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_290px]">
      <div className="min-w-0 space-y-6">
        <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          <QuoteSummaryCard
            cotizaciones={cotizaciones}
            onVerTodo={handleVerTodo}
            onVerDetalle={handleVerDetalle}
          />

          <QuickActionsCard />

          <RecentQuotesCard cotizaciones={cotizacionesRecientes} />
        </div>

        <DashboardTemplatesSection />
      </div>

      <div className="xl:justify-self-end">
        <PlanFreeCard userConfig={userConfig} />
      </div>
    </section>
  )
}
