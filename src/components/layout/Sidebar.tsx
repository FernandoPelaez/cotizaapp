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
          background: isActive ? "#2A5298" : "transparent",
          color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.72)",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)"
            e.currentTarget.style.color = "#FFFFFF"
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.color = "rgba(255,255,255,0.72)"
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
        background: "#1B3D7A",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      {/* Logo  */}
      <div
        className="flex h-[72px] items-center gap-2 px-5 flex-shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="h-2 w-2 rounded-full flex-shrink-0"
          style={{ background: "white" }}
        />
        <span className="text-base font-bold tracking-tight">
          <span style={{ color: "#FFFFFF" }}>Cotiza</span>
          <span style={{ color: "#93C5FD" }}>App</span>
        </span>
      </div>

      {/* Nav principal */}
      <nav className="flex flex-col gap-0.5 px-3 pt-4">
        {primaryLinks.map((link) => (
          <NavLink key={link.href} link={link} />
        ))}
      </nav>

      {/* Divisor entre secciones */}
      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.1)",
          margin: "12px 20px",
        }}
      />

      {/* Nav secundario */}
      <nav className="flex flex-col gap-0.5 px-3">
        {secondaryLinks.map((link) => (
          <NavLink key={link.href} link={link} />
        ))}
      </nav>

      <div className="flex-1" />

      {/* Footer  */}
      <div style={{ padding: "0 0.875rem 1rem" }}>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
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
              style={{ background: "#2A5298", color: "#FFFFFF" }}
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
                style={{ color: "#FFFFFF", margin: 0 }}
              >
                {session?.user?.name || "Usuario"}
              </p>
              <p
                className="truncate text-xs"
                style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}
              >
                {session?.user?.email || ""}
              </p>
            </div>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-150"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                cursor: "pointer",
                color: "#E5E7EB",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(220,38,38,0.2)"
                e.currentTarget.style.border = "1px solid rgba(252,165,165,0.35)"
                e.currentTarget.style.color = "#FCA5A5"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)"
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)"
                e.currentTarget.style.color = "#E5E7EB"
              }}
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <LogOut size={16} strokeWidth={2} />
            </button>
          </div>

          <p
            className="mt-1 px-2 text-xs"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            v1.0
          </p>
        </div>
      </div>
    </aside>
  )
}
