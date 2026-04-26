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
    title: "Acceso a 20 plantillas",
    description: "Incluye categorías Básica y Pro.",
    iconBg: "linear-gradient(135deg, #7c3aed, #a855f7)",
    iconGlow: "0 0 14px rgba(168,85,247,0.7)",
  },
  {
    icon: <FileText size={15} />,
    title: "PDF profesional e historial completo",
    description: "Más orden y mejor presentación para tus cotizaciones.",
    iconBg: "linear-gradient(135deg, #0ea5e9, #6366f1)",
    iconGlow: "0 0 14px rgba(14,165,233,0.7)",
  },
  {
    icon: <Clock3 size={15} />,
    title: "Cotizaciones ilimitadas y WhatsApp",
    description: "Trabaja sin límite y comparte más rápido.",
    iconBg: "linear-gradient(135deg, #f59e0b, #f97316)",
    iconGlow: "0 0 14px rgba(245,158,11,0.7)",
  },
]
