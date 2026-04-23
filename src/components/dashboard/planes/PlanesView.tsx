import type { DashboardPlanId } from "@/lib/dashboard/plans"

import PlanesCardsGrid from "./components/PlanesCardsGrid"
import PlanesFooterNote from "./components/PlanesFooterNote"
import PlanesHeader from "./components/PlanesHeader"

type PlanesViewProps = {
  currentPlanId?: DashboardPlanId
}

export default function PlanesView({
  currentPlanId = "free",
}: PlanesViewProps) {
  return (
    <section
      className="space-y-8"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <PlanesHeader />
      <PlanesCardsGrid currentPlanId={currentPlanId} />
      <PlanesFooterNote />
    </section>
  )
}
