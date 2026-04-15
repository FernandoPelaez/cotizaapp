"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LogOut,
  ChevronUp,
  Sparkles,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { primaryLinks, secondaryLinks } from "../../config/navigation"

// ─── Sidebar ─────

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const [popoverOpen, setPopoverOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Contador de cotizaciones usadas (simulado por ahora)
  const usedQuotes = 1
  const maxQuotes  = 3
  const progress   = Math.round((usedQuotes / maxQuotes) * 100)

  // Iniciales del usuario para el avatar
  const fullName = session?.user?.name || "Usuario"
  const initials = fullName
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  // Cierra el popover al hacer clic fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setPopoverOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Componente interno reutilizable para cada item del nav
  const NavLink = ({ link }: { link: { name: string; href: string; icon: React.ElementType } }) => {
    const isActive =
      pathname === link.href ||
      (link.href !== "/cotizaciones" && link.href !== "/dashboard" && pathname.startsWith(link.href + "/")) ||
      (link.href === "/dashboard" && pathname === "/dashboard")

    const Icon = link.icon

    return (
      <Link
        href={link.href}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
        style={{
          background: isActive ? "#2A5298" : "transparent",
          color:      isActive ? "#FFFFFF"  : "rgba(255,255,255,0.65)",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)"
            e.currentTarget.style.color      = "#FFFFFF"
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.color      = "rgba(255,255,255,0.65)"
          }
        }}
      >
        <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
        {link.name}
      </Link>
    )
  }

  return (
    <aside
      className="w-64 hidden md:flex flex-col h-screen"
      style={{
        background:  "#1B3D7A",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        fontFamily:  "'Sora', sans-serif",
      }}
    >

      {/* ─── Logo: alineado con el header ────*/}
      <div
        className="flex items-center gap-2 px-5 flex-shrink-0"
        style={{
          height:       "64px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "white" }} />
        <span className="font-bold text-base tracking-tight">
          <span style={{ color: "#FFFFFF" }}>Cotiza</span>
          <span style={{ color: "#93C5FD" }}>App</span>
        </span>
      </div>

      {/* ─── Nav principal ───── */}
      <nav className="flex flex-col gap-0.5 px-3 pt-4">
        {primaryLinks.map((link) => <NavLink key={link.href} link={link} />)}
      </nav>

      {/* ─── Divisor entre secciones del nav ── */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "12px 20px" }} />

      {/* ─── Nav secundario ─── */}
      <nav className="flex flex-col gap-0.5 px-3">
        {secondaryLinks.map((link) => <NavLink key={link.href} link={link} />)}
      </nav>

      {/* ─── Espaciador flexible ─── */}
      <div className="flex-1" />

      {/* ─── Popover del plan y sesion ──*/}
      <div ref={wrapperRef} style={{ position: "relative", padding: "0 0.875rem 1rem" }}>

        {/* Popover: se abre hacia arriba al hacer clic en el trigger */}
        {popoverOpen && (
          <div
            className="absolute left-0 right-0 rounded-2xl overflow-hidden"
            style={{
              bottom:     "calc(100% + 8px)",
              border:     "1px solid rgba(255,255,255,0.12)",
              boxShadow:  "0 -8px 32px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)",
              animation:  "popoverIn 0.2s cubic-bezier(0.16,1,0.3,1) both",
              zIndex:     50,
              background: "#162F5E",
            }}
          >
            <style>{`
              @keyframes popoverIn {
                from { opacity: 0; transform: translateY(10px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* Header azul del plan */}
            <div className="px-4 py-3 relative overflow-hidden" style={{ background: "#2A5298" }}>
              <div style={{ position: "absolute", top: "-16px", right: "-16px", width: "60px", height: "60px", borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
              <div style={{ position: "absolute", bottom: "-20px", right: "20px", width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

              <div className="flex items-center justify-between relative">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Sparkles size={9} color="rgba(255,255,255,0.7)" strokeWidth={2} />
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "9px", fontWeight: 600, letterSpacing: "0.06em" }}>
                      PLAN ACTUAL
                    </span>
                  </div>
                  <p style={{ color: "white", fontSize: "15px", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
                    Free
                  </p>
                </div>
                <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: "8px", padding: "3px 8px" }}>
                  <span style={{ color: "white", fontSize: "11px", fontWeight: 700 }}>
                    {usedQuotes}/{maxQuotes}
                  </span>
                </div>
              </div>
            </div>

            {/* Cuerpo del popover */}
            <div className="px-4 py-3 flex flex-col gap-3" style={{ background: "#162F5E" }}>

              {/* Barra de progreso */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "10px" }}>Cotizaciones usadas</span>
                  <span style={{ color: "#93C5FD", fontSize: "10px", fontWeight: 600 }}>{progress}%</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "999px", height: "5px", overflow: "hidden" }}>
                  <div style={{ background: "#93C5FD", width: `${progress}%`, height: "100%", borderRadius: "999px", transition: "width 0.5s ease" }} />
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px" }}>0</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px" }}>{maxQuotes}</span>
                </div>
              </div>

              {/* Features incluidos y bloqueados */}
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "3 cotizaciones / mes", included: true  },
                  { label: "PDF profesional",      included: true  },
                  { label: "Clientes ilimitados",  included: false },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-2">
                    <div style={{ width: "13px", height: "13px", borderRadius: "50%", flexShrink: 0, background: f.included ? "rgba(22,163,74,0.25)" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {f.included
                        ? <svg width="7" height="7" viewBox="0 0 12 12" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round"><polyline points="2 6 5 9 10 3"/></svg>
                        : <svg width="7" height="7" viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round"><line x1="2" y1="6" x2="10" y2="6"/></svg>
                      }
                    </div>
                    <span style={{ color: f.included ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)", fontSize: "10.5px" }}>
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Boton upgrade */}
              <button
                onClick={() => { setPopoverOpen(false); window.location.href = "/planes" }}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl transition-all duration-150"
                style={{ padding: "8px", background: "#2A5298", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#3563B8"
                  e.currentTarget.style.transform  = "translateY(-1px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#2A5298"
                  e.currentTarget.style.transform  = "translateY(0)"
                }}
              >
                <Sparkles size={11} color="white" strokeWidth={2} />
                <span style={{ color: "white", fontSize: "11px", fontWeight: 700 }}>Mejorar a Pro</span>
              </button>

              {/* Divisor antes de cerrar sesion */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)" }} />

              {/* Cerrar sesion */}
              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-150"
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.55)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(220,38,38,0.2)"
                  e.currentTarget.style.color      = "#FCA5A5"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color      = "rgba(255,255,255,0.55)"
                }}
              >
                <LogOut size={14} strokeWidth={1.8} />
                <span style={{ fontSize: "12px", fontWeight: 500 }}>Cerrar sesión</span>
              </button>

            </div>
          </div>
        )}

        {/* Trigger del usuario: al hacer clic abre el popover */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "10px" }}>
          <button
            onClick={() => setPopoverOpen((v) => !v)}
            className="w-full flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-150"
            style={{
              background: popoverOpen ? "rgba(255,255,255,0.1)" : "transparent",
              border:     "none",
              cursor:     "pointer",
            }}
            onMouseEnter={(e) => {
              if (!popoverOpen) e.currentTarget.style.background = "rgba(255,255,255,0.1)"
            }}
            onMouseLeave={(e) => {
              if (!popoverOpen) e.currentTarget.style.background = "transparent"
            }}
          >
            {/* Avatar con iniciales */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: "#2A5298", color: "#FFFFFF" }}
            >
              {initials}
            </div>

            {/* Nombre y email */}
            <div className="overflow-hidden flex-1 text-left">
              <p className="text-xs font-semibold truncate" style={{ color: "#FFFFFF", margin: 0 }}>
                {session?.user?.name || "Usuario"}
              </p>
              <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>
                {session?.user?.email || ""}
              </p>
            </div>

            {/* Flecha que rota al abrir */}
            <ChevronUp
              size={14}
              strokeWidth={2}
              style={{
                color:      "rgba(255,255,255,0.5)",
                flexShrink: 0,
                transform:  popoverOpen ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </button>

          {/* Version */}
          <p className="text-xs px-2 mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>v1.0</p>
        </div>

      </div>
    </aside>
  )
}
