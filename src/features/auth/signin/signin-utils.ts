import {
  isPaidPlanSlug,
  withPlan,
  type PaidPlanSlug,
  type SelectedPlanSlug,
} from "@/lib/plans/plan-utils"

type SearchParamsLike =
  | URLSearchParams
  | Record<string, string | string[] | undefined>

export function getSelectedPlanFromSigninParams(
  searchParams: SearchParamsLike
): SelectedPlanSlug {
  if (searchParams instanceof URLSearchParams) {
    const plan = searchParams.get("plan")
    return isPaidPlanSlug(plan) ? plan : null
  }

  const plan = searchParams.plan

  if (Array.isArray(plan)) {
    return isPaidPlanSlug(plan[0]) ? plan[0] : null
  }

  return isPaidPlanSlug(plan) ? plan : null
}

export function getPostSignInUrl(selectedPlan?: SelectedPlanSlug) {
  if (selectedPlan) {
    return withPlan("/checkout", selectedPlan)
  }

  return "/onboarding/profile"
}

export function getRegisterHrefFromSignin(selectedPlan?: SelectedPlanSlug) {
  return withPlan("/auth/register", selectedPlan)
}

export function getSigninHref(selectedPlan?: SelectedPlanSlug) {
  return withPlan("/auth/signin", selectedPlan)
}

export function shouldShowSelectedPlan(selectedPlan?: SelectedPlanSlug) {
  return selectedPlan !== null && selectedPlan !== undefined
}

export function assertPaidPlan(plan: unknown): PaidPlanSlug | null {
  return isPaidPlanSlug(plan) ? plan : null
}
