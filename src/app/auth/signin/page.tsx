import SignInForm from "@/components/auth/signin/SigiInForm"

type PlanSlug = "free" | "pro" | "empresa"

function normalizePlan(plan?: string): PlanSlug {
  if (plan === "pro") return "pro"
  if (plan === "empresa") return "empresa"
  return "free"
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; plan?: string }>
}) {
  const params = await searchParams

  const initialEmail = params.email ?? ""
  const selectedPlan = normalizePlan(params.plan)

  return <SignInForm initialEmail={initialEmail} selectedPlan={selectedPlan} />
}
