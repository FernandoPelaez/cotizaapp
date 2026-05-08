import type { ReactNode } from "react"
import { Clock3, FileText, LayoutGrid } from "lucide-react"

export type ProUpsellFeature = {
  icon: ReactNode
  title: string
  description: string
  iconBg: string
  iconGlow: string
}

export const PRO_UPSELL_FEATURES: ProUpsellFeature[] = [
  {
    icon: <LayoutGrid size={15} />,
    title: "Más plantillas disponibles",
    description: "Accede a diseños básicos y Pro para cotizaciones más profesionales.",
    iconBg: "linear-gradient(135deg, #1B3D7A, #2A5298)",
    iconGlow: "0 10px 18px rgba(27, 61, 122, 0.22)",
  },
  {
    icon: <FileText size={15} />,
    title: "PDF profesional e historial completo",
    description: "Mantén tus cotizaciones ordenadas y listas para compartir.",
    iconBg: "linear-gradient(135deg, #244A8F, #3B82F6)",
    iconGlow: "0 10px 18px rgba(42, 82, 152, 0.22)",
  },
  {
    icon: <Clock3 size={15} />,
    title: "Cotizaciones ilimitadas y WhatsApp",
    description: "Trabaja sin límite y envía tus cotizaciones más rápido.",
    iconBg: "linear-gradient(135deg, #1B3D7A, #0F172A)",
    iconGlow: "0 10px 18px rgba(15, 23, 42, 0.18)",
  },
]
