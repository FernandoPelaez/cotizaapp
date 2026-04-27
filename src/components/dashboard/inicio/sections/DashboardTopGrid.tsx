"use client"

import type { Cotizacion, UserConfig } from "@/types/dashboard"
import PlanFreeCard from "../cards/PlanFreeCard"
import QuickActionsCard from "../cards/QuickActionsCard"
import RecentQuotesCard from "../cards/RecentQuotesCard"
import DashboardTemplatesSection from "./DashboardTemplatesSection"

type DashboardTopGridProps = {
  userConfig?: UserConfig
  cotizaciones?: Cotizacion[]
}

const DASHBOARD_ROW_HEIGHT = 470
const CENTER_CARD_GAP = 16
const CENTER_CARD_HEIGHT = (DASHBOARD_ROW_HEIGHT - CENTER_CARD_GAP) / 2

export default function DashboardTopGrid({
  userConfig,
  cotizaciones = [],
}: DashboardTopGridProps) {
  return (
    <section
      className="grid items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_360px_290px]"
      style={{ minHeight: `${DASHBOARD_ROW_HEIGHT}px` }}
    >
      <div
        className="min-w-0 [&>section]:h-full [&>section>article]:h-full"
        style={{ height: `${DASHBOARD_ROW_HEIGHT}px` }}
      >
        <DashboardTemplatesSection cotizaciones={cotizaciones} />
      </div>

      <div
        className="grid min-w-0"
        style={{
          gap: `${CENTER_CARD_GAP}px`,
          height: `${DASHBOARD_ROW_HEIGHT}px`,
        }}
      >
        <div
          className="[&>article]:!h-full"
          style={{ height: `${CENTER_CARD_HEIGHT}px` }}
        >
          <QuickActionsCard />
        </div>

        <div
          className="[&>article]:!h-full"
          style={{ height: `${CENTER_CARD_HEIGHT}px` }}
        >
          <RecentQuotesCard cotizaciones={cotizaciones} />
        </div>
      </div>

      <div
        className="xl:justify-self-end [&>article]:!h-full"
        style={{ height: `${DASHBOARD_ROW_HEIGHT}px` }}
      >
        <PlanFreeCard userConfig={userConfig} />
      </div>
    </section>
  )
}