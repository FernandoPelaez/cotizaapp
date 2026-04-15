import {
  Home,
  PlusCircle,
  FileText,
  Sparkles,
  User,
  Palette,
  Settings,
  HelpCircle,
} from "lucide-react"

export const primaryLinks = [
  { name: "Inicio", href: "/dashboard", icon: Home },
  { name: "Crear cotización", href: "/cotizaciones/nueva", icon: PlusCircle },
  { name: "Historial", href: "/cotizaciones", icon: FileText },
  { name: "Plantillas", href: "/plantillas", icon: Sparkles },
  { name: "Planes", href: "/planes", icon: Sparkles },
]

export const secondaryLinks = [
  { name: "Perfil", href: "/perfil", icon: User },
  { name: "Personalizar", href: "/personalizar", icon: Palette },
  { name: "Configuración", href: "/configuracion", icon: Settings },
  { name: "Ayuda", href: "/ayuda", icon: HelpCircle },
]
