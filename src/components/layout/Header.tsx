"use client"

import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  User,
  Sparkles,
  Palette,
  Settings,
  HelpCircle,
} from "lucide-react"

const routeMeta: Record<string, { title: string; icon: React.ElementType }> = {
  "/dashboard":          { title: "Panel de inicio", icon: LayoutDashboard },
  "/cotizaciones/nueva": { title: "Nueva cotización", icon: PlusCircle },
  "/cotizaciones":       { title: "Historial", icon: FileText },
  "/perfil":             { title: "Perfil", icon: User },
  "/planes":             { title: "Planes", icon: Sparkles },
  "/personalizar":       { title: "Personalizar", icon: Palette },
  "/configuracion":      { title: "Configuración", icon: Settings },
  "/ayuda":              { title: "Ayuda", icon: HelpCircle },
}

function getSaludo() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return "Buenos días"
  if (h >= 12 && h < 19) return "Buenas tardes"
  return "Buenas noches"
}

function getFecha() {
  return new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const currentRoute =
    Object.keys(routeMeta).find((route) => pathname.startsWith(route)) || "/dashboard"

  const { title } = routeMeta[currentRoute]

  const fullName = session?.user?.name || "Usuario"

  const initials = fullName
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  const userLogo = session?.user?.image || null

  const saludo = getSaludo()
  const fecha = getFecha()
  const fullText = `${saludo} — ${fecha}`

  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    let i = 0
    setDisplayText("")

    const interval = setInterval(() => {
      i++
      setDisplayText(fullText.slice(0, i))

      if (i >= fullText.length) clearInterval(interval)
    }, i < saludo.length ? 35 : 65)

    return () => clearInterval(interval)
  }, [pathname])

  return (
    <header
      className="flex items-center justify-between px-6 flex-shrink-0"
      style={{
        height: "72px",
        background: "var(--card)",
        borderBottom: "1px solid var(--border)",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
          style={{ background: "var(--primary-light)" }}
        >
          {userLogo ? (
            <img
              src={userLogo}
              alt="logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <LayoutDashboard size={16} color="var(--primary)" />
          )}
        </div>

        <div className="flex flex-col leading-tight">
          <h1
            className="text-sm font-bold"
            style={{ color: "var(--foreground)" }}
          >
            {title}
          </h1>

          <span
            className="text-xs"
            style={{
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              borderRight: "2px solid var(--primary)",
              paddingRight: "4px",
            }}
          >
            {displayText}
          </span>
        </div>
      </div>

      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{
          background: "var(--primary-light)",
          color: "var(--primary)",
        }}
      >
        {initials}
      </div>
    </header>
  )
}
