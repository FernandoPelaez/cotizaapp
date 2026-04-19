import DashboardInicio from "@/components/dashboard/inicio/DashboardInicio"
import { getDashboardData } from "@/lib/dashboard/getDashboardData"

export default async function Page() {
  const data = await getDashboardData()
  return <DashboardInicio {...data} />
}

