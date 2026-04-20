"use client"

import type { ElementType } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { primaryLinks, secondaryLinks } from "../../config/navigation"

type NavItem = {
  name: string
  href: string
  icon: ElementType
}

type SidebarProfileResponse = {
  user?: {
    profile?: {
      logoUrl?: string | null
    } | null
  }
  error?: string
}

const SIDEBAR_BG = "var(--primary, #1B3D7A)"
const SIDEBAR_BG_HOVER = "var(--primary-hover, #2A5298)"
const SIDEBAR_TEXT = "var(--sidebar-text, #FFFFFF)"
const SIDEBAR_TEXT_MUTED = "var(--sidebar-text-muted, rgba(255,255,255,0.72))"
const SIDEBAR_TEXT_SOFT = "var(--sidebar-text-soft, rgba(255,255,255,0.5))"
const SIDEBAR_TEXT_FAINT = "var(--sidebar-text-faint, rgba(255,255,255,0.2))"
const SIDEBAR_BORDER = "var(--sidebar-border, rgba(255,255,255,0.08))"
const SIDEBAR_DIVIDER = "var(--sidebar-divider, rgba(255,255,255,0.1))"
const SIDEBAR_SURFACE = "var(--sidebar-surface, rgba(255,255,255,0.08))"
const SIDEBAR_SURFACE_BORDER =
  "var(--sidebar-surface-border, rgba(255,255,255,0.12))"
const SIDEBAR_HOVER_BG = "var(--sidebar-hover-bg, rgba(255,255,255,0.1))"
const SIDEBAR_BRAND_ACCENT = "var(--sidebar-brand-accent, #93C5FD)"
const SIDEBAR_ICON_SOFT = "var(--sidebar-icon-soft, #E5E7EB)"

const SIDEBAR_DANGER_BG = "var(--sidebar-danger-bg, rgba(220,38,38,0.2))"
const SIDEBAR_DANGER_BORDER =
  "var(--sidebar-danger-border, rgba(252,165,165,0.35))"
const SIDEBAR_DANGER_TEXT = "var(--sidebar-danger-text, #FCA5A5)"

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const [profileLogoUrl, setProfileLogoUrl] = useState("")
  const [logoError, setLogoError] = useState(false)

  const fullName = session?.user?.name || "Usuario"
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  const showProfileLogo = Boolean(profileLogoUrl) && !logoError

  useEffect(() => {
    setLogoError(false)
  }, [profileLogoUrl])

  useEffect(() => {
    const loadProfileLogo = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          method: "GET",
          cache: "no-store",
        })

        const data = (await res.json()) as SidebarProfileResponse

        if (!res.ok) {
          throw new Error(data.error || "No se pudo cargar el logo del perfil")
        }

        setProfileLogoUrl(data.user?.profile?.logoUrl?.trim() || "")
      } catch (error) {
        console.error("Error cargando logo del perfil en sidebar", error)
        setProfileLogoUrl("")
      }
    }

    if (status === "authenticated") {
      void loadProfileLogo()
    } else {
      setProfileLogoUrl("")
    }
  }, [status])

  const NavLink = ({ link }: { link: NavItem }) => {
    const isActive =
      pathname === link.href ||
      (link.href !== "/cotizaciones" &&
        link.href !== "/dashboard" &&
        pathname.startsWith(link.href + "/")) ||
      (link.href === "/dashboard" && pathname === "/dashboard")

    const Icon = link.icon

    return (
      <Link
        href={link.href}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150"
        style={{
          background: isActive ? SIDEBAR_BG_HOVER : "transparent",
          color: isActive ? SIDEBAR_TEXT : SIDEBAR_TEXT_MUTED,
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = SIDEBAR_HOVER_BG
            e.currentTarget.style.color = SIDEBAR_TEXT
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.color = SIDEBAR_TEXT_MUTED
          }
        }}
      >
        <Icon size={18} strokeWidth={isActive ? 2.2 : 1.9} />
        <span>{link.name}</span>
      </Link>
    )
  }

  return (
    <aside
      className="hidden h-screen w-64 md:flex md:flex-col"
      style={{
        background: SIDEBAR_BG,
        borderRight: `1px solid ${SIDEBAR_BORDER}`,
        fontFamily: "'Sora', sans-serif",
      }}
    >
      <div
        className="flex h-[72px] flex-shrink-0 items-center gap-2 px-5"
        style={{
          borderBottom: `1px solid ${SIDEBAR_BORDER}`,
        }}
      >
        <div
          className="h-2 w-2 flex-shrink-0 rounded-full"
          style={{ background: SIDEBAR_TEXT }}
        />
        <span className="text-base font-bold tracking-tight">
          <span style={{ color: SIDEBAR_TEXT }}>Cotiza</span>
          <span style={{ color: SIDEBAR_BRAND_ACCENT }}>App</span>
        </span>
      </div>

      <nav className="flex flex-col gap-0.5 px-3 pt-4">
        {primaryLinks.map((link) => (
          <NavLink key={link.href} link={link} />
        ))}
      </nav>

      <div
        style={{
          height: "1px",
          background: SIDEBAR_DIVIDER,
          margin: "12px 20px",
        }}
      />

      <nav className="flex flex-col gap-0.5 px-3">
        {secondaryLinks.map((link) => (
          <NavLink key={link.href} link={link} />
        ))}
      </nav>

      <div className="flex-1" />

      <div style={{ padding: "0 0.875rem 1rem" }}>
        <div
          style={{
            borderTop: `1px solid ${SIDEBAR_DIVIDER}`,
            paddingTop: "10px",
          }}
        >
          <div
            className="flex items-center gap-3 rounded-xl px-2 py-2"
            style={{
              background: "transparent",
            }}
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-bold"
              style={{ background: SIDEBAR_BG_HOVER, color: SIDEBAR_TEXT }}
            >
              {showProfileLogo ? (
                <img
                  src={profileLogoUrl}
                  alt="Logo del perfil"
                  className="h-full w-full object-cover"
                  onError={() => setLogoError(true)}
                />
              ) : (
                initials
              )}
            </div>

            <div className="flex-1 overflow-hidden text-left">
              <p
                className="truncate text-xs font-semibold"
                style={{ color: SIDEBAR_TEXT, margin: 0 }}
              >
                {session?.user?.name || "Usuario"}
              </p>
              <p
                className="truncate text-xs"
                style={{ color: SIDEBAR_TEXT_SOFT, margin: 0 }}
              >
                {session?.user?.email || ""}
              </p>
            </div>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-150"
              style={{
                background: SIDEBAR_SURFACE,
                border: `1px solid ${SIDEBAR_SURFACE_BORDER}`,
                cursor: "pointer",
                color: SIDEBAR_ICON_SOFT,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = SIDEBAR_DANGER_BG
                e.currentTarget.style.border = `1px solid ${SIDEBAR_DANGER_BORDER}`
                e.currentTarget.style.color = SIDEBAR_DANGER_TEXT
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = SIDEBAR_SURFACE
                e.currentTarget.style.border = `1px solid ${SIDEBAR_SURFACE_BORDER}`
                e.currentTarget.style.color = SIDEBAR_ICON_SOFT
              }}
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <LogOut size={16} strokeWidth={2} />
            </button>
          </div>

          <p
            className="mt-1 px-2 text-xs"
            style={{ color: SIDEBAR_TEXT_FAINT }}
          >
            v1.0
          </p>
        </div>
      </div>
    </aside>
  )
}
