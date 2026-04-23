import PlanesView from "@/components/dashboard/planes/PlanesView"
import { getDashboardData } from "@/lib/dashboard/getDashboardData"

export default async function Page() {
  const { userConfig } = await getDashboardData()

  return <PlanesView currentPlanId={userConfig?.plan ?? "free"} />
}
