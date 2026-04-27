export type SegmentacionCardData = {
  id: string
  icon: string
  title: string
  description: string
  pill: string
}

export const segmentacionSectionContent = {
  badge: "¿Para quién es?",
  title: "Diseñado para ti,",
  highlight: "sin importar tu escala",
  subtitle:
    "Tanto si trabajas solo como si tienes un equipo, CotizaApp se adapta a tus necesidades.",
}

export const segmentacionCards: SegmentacionCardData[] = [
  {
    id: "independiente",
    icon: "🧑‍💼",
    title: "Independiente",
    description:
      "Freelancers, consultores y profesionales que necesitan verse más formales y ahorrar tiempo en cada propuesta.",
    pill: "Plan Gratis disponible",
  },
  {
    id: "negocio",
    icon: "🏢",
    title: "Negocio",
    description:
      "Empresas y equipos de ventas que necesitan control, flujo de aprobación y reportes de seguimiento centralizados.",
    pill: "Multi-usuario · Pro",
  },
]

