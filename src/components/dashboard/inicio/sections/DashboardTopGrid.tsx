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

export default function DashboardTopGrid({
  userConfig,
  cotizaciones = [],
}: DashboardTopGridProps) {
  const cotizacionesRecientes = cotizaciones.slice(0, 4)

  return (
    <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_290px]">
      <div className="min-w-0 space-y-6">
        <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          <QuoteSummaryCard cotizaciones={cotizaciones} />
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
