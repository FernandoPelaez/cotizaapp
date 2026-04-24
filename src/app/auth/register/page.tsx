import RegisterForm from "@/components/auth/register/RegisterForm"
import { getSelectedPlanFromSearchParams } from "@/lib/plans/plan-utils"

type RegisterPageProps = {
  searchParams: Promise<{
    plan?: string | string[]
  }>
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams
  const selectedPlan = getSelectedPlanFromSearchParams(params)

  return <RegisterForm selectedPlan={selectedPlan} />
}
