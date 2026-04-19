import {
  CircleUserRound,
  FilePlus2,
  Gem,
  HelpCircle,
  History,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  Palette,
  Settings2,
} from "lucide-react"

export const primaryLinks = [
  { name: "Inicio", href: "/dashboard", icon: LayoutDashboard },
  { name: "Crear cotización", href: "/cotizaciones/nueva", icon: FilePlus2 },
  { name: "Historial", href: "/cotizaciones", icon: History },
  { name: "Plantillas", href: "/plantillas", icon: LayoutTemplate },
  { name: "Planes", href: "/planes", icon: Gem },
]

export const secondaryLinks = [
  { name: "Perfil", href: "/perfil", icon: CircleUserRound },
  { name: "Personalizar", href: "/personalizar", icon: Palette },
  { name: "Configuración", href: "/configuracion", icon: Settings2 },
  { name: "Ayuda", href: "/ayuda", icon: LifeBuoy },
]