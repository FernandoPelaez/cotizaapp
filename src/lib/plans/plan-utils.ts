export type PlanSlug = "free" | "pro" | "empresa"
export type PaidPlanSlug = "pro" | "empresa"
export type SelectedPlanSlug = PaidPlanSlug | null

export const PLAN_SLUGS: PlanSlug[] = ["free", "pro", "empresa"]
export const PAID_PLAN_SLUGS: PaidPlanSlug[] = ["pro", "empresa"]

export const DEFAULT_PLAN: PlanSlug = "free"

export const PLAN_LABELS: Record<PlanSlug, string> = {
  free: "Free",
  pro: "Pro",
  empresa: "Empresa",
}

export const PLAN_DESCRIPTIONS: Record<PlanSlug, string> = {
  free: "Ideal para comenzar y probar la herramienta",
  pro: "Para profesionales que quieren crecer",
  empresa: "Ideal para negocios que buscan toda la biblioteca disponible",
}

export const PLAN_COPY: Record<PlanSlug, string> = {
  free: "5 cotizaciones de prueba · 10 plantillas básicas",
  pro: "Cotizaciones ilimitadas · 20 plantillas",
  empresa: "Toda la biblioteca disponible · 30 plantillas",
}

export const PLAN_BUTTON_TEXT: Record<PlanSlug, string> = {
  free: "Crear cuenta gratis",
  pro: "Crear cuenta Pro",
  empresa: "Crear cuenta Empresa",
}

export const PLAN_PRICES: Record<PlanSlug, string> = {
  free: "$0",
  pro: "$99 / mes",
  empresa: "$199 / mes",
}

export function isValidPlanSlug(plan: unknown): plan is PlanSlug {
  return typeof plan === "string" && PLAN_SLUGS.includes(plan as PlanSlug)
}

export function isPaidPlanSlug(plan: unknown): plan is PaidPlanSlug {
  return typeof plan === "string" && PAID_PLAN_SLUGS.includes(plan as PaidPlanSlug)
}

export function normalizePlan(plan: unknown): PlanSlug {
  if (isValidPlanSlug(plan)) return plan
  return DEFAULT_PLAN
}

export function normalizeSelectedPlan(plan: unknown): SelectedPlanSlug {
  if (isPaidPlanSlug(plan)) return plan
  return null
}

export function getPlanFromSearchParams(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>
): PlanSlug {
  if (searchParams instanceof URLSearchParams) {
    return normalizePlan(searchParams.get("plan"))
  }

  const plan = searchParams.plan

  if (Array.isArray(plan)) {
    return normalizePlan(plan[0])
  }

  return normalizePlan(plan)
}

export function getSelectedPlanFromSearchParams(
  searchParams: URLSearchParams | Record<string, string | string[] | undefined>
): SelectedPlanSlug {
  if (searchParams instanceof URLSearchParams) {
    return normalizeSelectedPlan(searchParams.get("plan"))
  }

  const plan = searchParams.plan

  if (Array.isArray(plan)) {
    return normalizeSelectedPlan(plan[0])
  }

  return normalizeSelectedPlan(plan)
}

export function getEffectivePlan(selectedPlan?: SelectedPlanSlug): PlanSlug {
  return selectedPlan ?? DEFAULT_PLAN
}

export function withPlan(
  path: string,
  plan?: PlanSlug | SelectedPlanSlug
) {
  if (!plan || plan === "free") return path

  const separator = path.includes("?") ? "&" : "?"

  return `${path}${separator}plan=${encodeURIComponent(plan)}`
}

export function withEmailAndPlan(
  email: string,
  plan?: PlanSlug | SelectedPlanSlug
) {
  const basePath = `/auth/signin?email=${encodeURIComponent(email)}`

  if (!plan || plan === "free") return basePath

  return `${basePath}&plan=${encodeURIComponent(plan)}`
}

export function getPostLoginUrl(plan?: PlanSlug | SelectedPlanSlug) {
  return withPlan("/onboarding/profile", plan)
}

export function shouldGoToStripe(plan?: PlanSlug | SelectedPlanSlug) {
  return plan === "pro" || plan === "empresa"
}

export function isFreePlan(plan?: PlanSlug | SelectedPlanSlug) {
  return !plan || plan === "free"
}