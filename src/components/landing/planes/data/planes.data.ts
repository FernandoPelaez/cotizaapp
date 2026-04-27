export type LandingPlan = {
  id: string
  nombre: string
  desc: string
  precio: string
  periodo: string
  features: string[]
  cta: string
  href: string
  popular?: boolean
  premium?: boolean
}

export const planesSectionContent = {
  badge: "Precios",
  title: "Planes para cada necesidad",
  subtitle: "",
  note: "Precios en MXN · IVA no incluido · Cancela en cualquier momento",
}

export const landingPlans: LandingPlan[] = [
  {
    id: "free",
    nombre: "Free",
    desc: "Ideal para comenzar y probar la herramienta",
    precio: "$0",
    periodo: "para siempre",
    cta: "Elegir plan",
    href: "/auth/signup?plan=free",
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
    nombre: "Pro",
    desc: "Para profesionales que quieren crecer",
    precio: "$99",
    periodo: "/ mes",
    cta: "Elegir plan",
    href: "/auth/signup?plan=pro",
    popular: true,
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
    id: "empresa",
    nombre: "Empresa",
    desc: "Ideal para negocios que buscan toda la biblioteca disponible",
    precio: "$199",
    periodo: "/ mes",
    cta: "Elegir plan",
    href: "/auth/signup?plan=empresa",
    premium: true,
    features: [
      "Todo lo de Pro",
      "Acceso a las 30 plantillas",
      "Incluye Básica, Pro y Premium",
      "Ideal para negocios que buscan toda la biblioteca disponible",
    ],
  },
]
