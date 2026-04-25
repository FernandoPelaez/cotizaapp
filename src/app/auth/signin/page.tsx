import SignInForm from "@/components/auth/signin/SigiInForm"
import { getSelectedPlanFromSigninParams } from "@/features/auth/signin/signin-utils"

type SignInPageProps = {
  searchParams: Promise<{
    email?: string
    plan?: string | string[]
  }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams

  const initialEmail = params.email ?? ""
  const selectedPlan = getSelectedPlanFromSigninParams(params)

  return (
    <SignInForm
      initialEmail={initialEmail}
      selectedPlan={selectedPlan}
    />
  )
}
