export type DashboardPlanId = "free" | "pro" | "premium"

export type DashboardPlanIcon = "zap" | "sparkles" | "crown"

export type DashboardPlan = {
  id: DashboardPlanId
  name: string
  description: string
  price: number
  period: "mes" | null
  icon: DashboardPlanIcon
  highlighted?: boolean
  badge?: string
  features: string[]
}

export const DASHBOARD_PLANS: DashboardPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Ideal para comenzar y probar la herramienta",
    price: 0,
    period: null,
    icon: "zap",
    features: [
      "5 cotizaciones de prueba",
      "Acceso a 10 plantillas básicas",
      "Vista previa",
      "Descarga en PDF",
      "Al llegar al límite, se bloquea seguir creando y se invita a mejorar el plan",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para profesionales que quieren crecer",
    price: 99,
    period: "mes",
    icon: "sparkles",
    highlighted: true,
    badge: "MÁS POPULAR",
    features: [
      "Cotizaciones ilimitadas",
      "Acceso a 20 plantillas",
      "Incluye categorías Básica y Pro",
      "PDF profesional",
      "Historial completo",
      "Envío por WhatsApp",
    ],
  },
  {
    id: "premium",
    name: "Empresa",
    description: "Ideal para negocios que buscan toda la biblioteca disponible",
    price: 199,
    period: "mes",
    icon: "crown",
    features: [
      "Todo lo de Pro",
      "Acceso a las 30 plantillas",
      "Incluye Básica, Pro y Premium",
      "Ideal para negocios que buscan toda la biblioteca disponible",
    ],
  },
]

export function getDashboardPlanById(planId: DashboardPlanId) {
  return DASHBOARD_PLANS.find((plan) => plan.id === planId)
}
