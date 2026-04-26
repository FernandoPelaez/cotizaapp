"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import {
  Bell,
  CheckCircle2,
  Clock3,
  PanelLeftClose,
  PanelLeftOpen,
  Send,
  XCircle,
} from "lucide-react"

import type {
  QuoteEvent,
  QuoteEventsResponse,
  QuoteEventType,
} from "@/types/cotizacion"
import {
  formatDateTime,
  formatRelativeDateTime,
} from "@/lib/cotizacion"

const routeMeta: Record<string, { title: string }> = {
  "/cotizaciones/nueva": { title: "Nueva cotización" },
  "/cotizaciones": { title: "Historial" },
  "/dashboard": { title: "Panel de inicio" },
  "/plantillas": { title: "Plantillas" },
  "/planes": { title: "Planes" },
  "/perfil": { title: "Perfil" },
  "/personalizar": { title: "Personalizar" },
  "/configuracion": { title: "Configuración" },
  "/ayuda": { title: "Ayuda" },
}

const SIDEBAR_COLLAPSIBLE_ROUTES = [
  "/personalizar",
  "/cotizaciones",
  "/plantillas",
]

const HEADER_BG = "hsl(var(--card, 0 0% 100%))"
const HEADER_BORDER = "hsl(var(--border, 214 32% 91%) / 0.55)"
const HEADER_TEXT = "hsl(var(--foreground, 222 47% 11%))"
const HEADER_TEXT_MUTED = "hsl(var(--text-muted, 215 16% 47%))"
const HEADER_TEXT_SOFT = "hsl(var(--text-muted, 215 16% 47%) / 0.78)"

const HEADER_BUTTON_BG = "hsl(var(--card, 0 0% 100%))"
const HEADER_BUTTON_BORDER = "hsl(var(--border, 214 32% 91%) / 0.55)"
const HEADER_BUTTON_ICON = "hsl(var(--primary, 216 64% 29%))"
const HEADER_BUTTON_HOVER_BG = "hsl(var(--primary-soft, 214 100% 94%))"
const HEADER_BUTTON_HOVER_BORDER = "hsl(var(--primary-light, 214 91% 75%))"

const HEADER_DROPDOWN_BG = "hsl(var(--card, 0 0% 100%))"
const HEADER_DROPDOWN_BORDER = "hsl(var(--border, 214 32% 91%) / 0.55)"
const HEADER_DROPDOWN_SURFACE = "hsl(var(--background, 220 23% 98%))"
const HEADER_TAG_BG = "hsl(var(--primary-soft, 214 100% 94%))"
const HEADER_TAG_TEXT = "hsl(var(--primary, 216 64% 29%))"
const HEADER_UNREAD_BADGE_BG = "hsl(var(--error, 0 84% 60%))"
const HEADER_UNREAD_BADGE_TEXT = "#FFFFFF"
const HEADER_PROFILE_BG = "hsl(var(--primary-light, 214 91% 75%))"
const HEADER_PROFILE_TEXT = "hsl(var(--primary, 216 64% 29%))"

type EventVisualStyle = {
  border: string
  background: string
  color: string
  icon: ReactNode
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

function getEventStyles(type: QuoteEventType): EventVisualStyle {
  switch (type) {
    case "QUOTE_SENT":
      return {
        border: "#BFDBFE",
        background: "#EFF6FF",
        color: "#1D4ED8",
        icon: <Send className="h-4 w-4" />,
      }
    case "QUOTE_ACCEPTED":
      return {
        border: "#A7F3D0",
        background: "#ECFDF5",
        color: "#047857",
        icon: <CheckCircle2 className="h-4 w-4" />,
      }
    case "QUOTE_REJECTED":
      return {
        border: "#FECACA",
        background: "#FEF2F2",
        color: "#B91C1C",
        icon: <XCircle className="h-4 w-4" />,
      }
    case "QUOTE_EXPIRED":
      return {
        border: "#E2E8F0",
        background: "#F8FAFC",
        color: "#475569",
        icon: <Clock3 className="h-4 w-4" />,
      }
    default:
      return {
        border: "#E2E8F0",
        background: "#F8FAFC",
        color: "#475569",
        icon: <Bell className="h-4 w-4" />,
      }
  }
}

function isQuoteEventsResponse(
  value: QuoteEventsResponse | { error?: string }
): value is QuoteEventsResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "events" in value &&
    Array.isArray(value.events) &&
    "unreadCount" in value &&
    typeof value.unreadCount === "number"
  )
}

type HeaderProfileResponse = {
  user?: {
    profile?: {
      logoUrl?: string | null
    } | null
  }
  error?: string
}

type HeaderProps = {
  onToggleSidebar?: () => void
  sidebarCollapsed?: boolean
}

export default function Header({
  onToggleSidebar,
  sidebarCollapsed,
}: HeaderProps) {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const canCollapseSidebar = SIDEBAR_COLLAPSIBLE_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  const [displayText, setDisplayText] = useState("")
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [markingNotifications, setMarkingNotifications] = useState(false)
  const [loadingNotifications, setLoadingNotifications] = useState(false)
  const [events, setEvents] = useState<QuoteEvent[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [profileLogoUrl, setProfileLogoUrl] = useState("")
  const [logoError, setLogoError] = useState(false)

  const notificationsRef = useRef<HTMLDivElement | null>(null)

  const currentRoute =
    Object.keys(routeMeta).find((route) => pathname.startsWith(route)) ||
    "/dashboard"

  const { title } = routeMeta[currentRoute]

  const fullName = session?.user?.name || "Usuario"

  const initials = useMemo(() => {
    return fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
  }, [fullName])

  const saludo = getSaludo()
  const fecha = getFecha()
  const fullText = `${saludo} — ${fecha}`
  const showProfileLogo = Boolean(profileLogoUrl) && !logoError

  useEffect(() => {
    let i = 0
    setDisplayText("")

    const interval = setInterval(() => {
      i++
      setDisplayText(fullText.slice(0, i))
      if (i >= fullText.length) clearInterval(interval)
    }, i < saludo.length ? 35 : 65)

    return () => clearInterval(interval)
  }, [pathname, fullText, saludo])

  useEffect(() => {
    setLogoError(false)
  }, [profileLogoUrl])

  const loadNotifications = async () => {
    try {
      setLoadingNotifications(true)

      const res = await fetch("/api/quotes/events?limit=5", {
        cache: "no-store",
      })

      const data: QuoteEventsResponse | { error?: string } = await res.json()

      if (!res.ok) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : "No se pudieron cargar las notificaciones"
        )
      }

      if (!isQuoteEventsResponse(data)) {
        throw new Error(
          "La respuesta de notificaciones no tiene el formato esperado"
        )
      }

      setEvents(data.events)
      setUnreadCount(data.unreadCount)
    } catch (error) {
      console.error("Error cargando notificaciones del header", error)
      setEvents([])
      setUnreadCount(0)
    } finally {
      setLoadingNotifications(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      void loadNotifications()
    }
  }, [status, pathname])

  useEffect(() => {
    const loadProfileLogo = async () => {
      try {
        const res = await fetch("/api/user/profile", {
          method: "GET",
          cache: "no-store",
        })

        const data = (await res.json()) as HeaderProfileResponse

        if (!res.ok) {
          throw new Error(data.error || "No se pudo cargar el logo del perfil")
        }

        setProfileLogoUrl(data.user?.profile?.logoUrl?.trim() || "")
      } catch (error) {
        console.error("Error cargando logo del perfil en header", error)
        setProfileLogoUrl("")
      }
    }

    if (status === "authenticated") {
      void loadProfileLogo()
    } else {
      setProfileLogoUrl("")
    }
  }, [status])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const markNotificationsAsRead = async () => {
    try {
      setMarkingNotifications(true)

      const res = await fetch("/api/quotes/events", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ readAll: true }),
      })

      const data: { error?: string; unreadCount?: number } = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || "No se pudieron actualizar las notificaciones"
        )
      }

      setUnreadCount(
        typeof data.unreadCount === "number" ? data.unreadCount : 0
      )

      setEvents((prev) =>
        prev.map((event) => ({
          ...event,
          isRead: true,
          readAt: event.readAt ?? new Date().toISOString(),
        }))
      )
    } catch (error) {
      console.error("Error marcando notificaciones del header", error)
    } finally {
      setMarkingNotifications(false)
    }
  }

  const handleToggleNotifications = async () => {
    const nextValue = !notificationsOpen
    setNotificationsOpen(nextValue)

    if (nextValue) {
      await loadNotifications()

      if (unreadCount > 0) {
        await markNotificationsAsRead()
      }
    }
  }

  return (
    <motion.header
      className="relative z-[80] flex flex-shrink-0 items-center justify-between px-6"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1], delay: 0 }}
      style={{
        height: "72px",
        background: HEADER_BG,
        borderBottom: `1px solid ${HEADER_BORDER}`,
        fontFamily: "'Sora', sans-serif",
      }}
    >
      <div className="flex items-center gap-3">
        {canCollapseSidebar && onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition"
            style={{
              background: HEADER_BUTTON_BG,
              border: `1px solid ${HEADER_BUTTON_BORDER}`,
              color: HEADER_TEXT_MUTED,
              boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
            }}
            title={sidebarCollapsed ? "Mostrar sidebar" : "Ocultar sidebar"}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = HEADER_BUTTON_HOVER_BG
              e.currentTarget.style.border = `1px solid ${HEADER_BUTTON_HOVER_BORDER}`
              e.currentTarget.style.color = HEADER_BUTTON_ICON
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = HEADER_BUTTON_BG
              e.currentTarget.style.border = `1px solid ${HEADER_BUTTON_BORDER}`
              e.currentTarget.style.color = HEADER_TEXT_MUTED
            }}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        )}

        <div className="flex flex-col leading-tight">
          <h1 className="text-sm font-bold" style={{ color: HEADER_TEXT }}>
            {title}
          </h1>

          <span
            className="text-xs"
            style={{
              color: HEADER_TEXT_MUTED,
              whiteSpace: "nowrap",
              overflow: "hidden",
              borderRight: `2px solid ${HEADER_BUTTON_ICON}`,
              paddingRight: "4px",
            }}
          >
            {displayText}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative z-[90]" ref={notificationsRef}>
          <button
            type="button"
            onClick={() => void handleToggleNotifications()}
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition"
            style={{
              background: HEADER_BUTTON_BG,
              border: `1px solid ${HEADER_BUTTON_BORDER}`,
              boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
            }}
            aria-label="Abrir notificaciones"
            title="Notificaciones"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = HEADER_BUTTON_HOVER_BG
              e.currentTarget.style.border = `1px solid ${HEADER_BUTTON_HOVER_BORDER}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = HEADER_BUTTON_BG
              e.currentTarget.style.border = `1px solid ${HEADER_BUTTON_BORDER}`
            }}
          >
            <Bell className="h-4 w-4" style={{ color: HEADER_BUTTON_ICON }} />

            {unreadCount > 0 && (
              <span
                className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold"
                style={{
                  background: HEADER_UNREAD_BADGE_BG,
                  color: HEADER_UNREAD_BADGE_TEXT,
                }}
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div
              className="absolute right-0 top-12 z-[100] w-[360px] rounded-2xl p-3"
              style={{
                background: HEADER_DROPDOWN_BG,
                border: `1px solid ${HEADER_DROPDOWN_BORDER}`,
                boxShadow: "0 24px 60px rgba(15,23,42,0.22)",
                maxHeight: "min(520px, calc(100vh - 96px))",
                overflowY: "auto",
              }}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: HEADER_TEXT }}
                  >
                    Notificaciones
                  </p>

                  <p className="text-xs" style={{ color: HEADER_TEXT_MUTED }}>
                    {markingNotifications
                      ? "Marcando como leídas..."
                      : "Eventos recientes de tus cotizaciones"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs font-medium transition"
                  style={{ color: HEADER_TEXT_MUTED }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = HEADER_BUTTON_ICON
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = HEADER_TEXT_MUTED
                  }}
                >
                  Cerrar
                </button>
              </div>

              {loadingNotifications ? (
                <div
                  className="rounded-xl p-4 text-sm"
                  style={{
                    background: HEADER_DROPDOWN_SURFACE,
                    border: `1px dashed ${HEADER_DROPDOWN_BORDER}`,
                    color: HEADER_TEXT_MUTED,
                  }}
                >
                  Cargando notificaciones...
                </div>
              ) : events.length === 0 ? (
                <div
                  className="rounded-xl p-4 text-sm"
                  style={{
                    background: HEADER_DROPDOWN_SURFACE,
                    border: `1px dashed ${HEADER_DROPDOWN_BORDER}`,
                    color: HEADER_TEXT_MUTED,
                  }}
                >
                  Aún no tienes notificaciones recientes.
                </div>
              ) : (
                <div className="space-y-2">
                  {events.map((event) => {
                    const styles = getEventStyles(event.type)

                    return (
                      <div
                        key={event.id}
                        className="rounded-xl p-3"
                        style={{
                          background: HEADER_DROPDOWN_BG,
                          border: `1px solid ${HEADER_DROPDOWN_BORDER}`,
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                            style={{
                              borderColor: styles.border,
                              background: styles.background,
                              color: styles.color,
                            }}
                          >
                            {styles.icon}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p
                                className="text-sm font-semibold"
                                style={{ color: HEADER_TEXT }}
                              >
                                {event.title}
                              </p>

                              {!event.isRead && (
                                <span
                                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                                  style={{
                                    background: HEADER_TAG_BG,
                                    color: HEADER_TAG_TEXT,
                                  }}
                                >
                                  Nuevo
                                </span>
                              )}
                            </div>

                            <p
                              className="mt-1 text-sm"
                              style={{ color: HEADER_TEXT_MUTED }}
                            >
                              {event.message ||
                                "Se registró actividad reciente."}
                            </p>

                            <p
                              className="mt-1 text-xs"
                              style={{ color: HEADER_TEXT_SOFT }}
                              title={formatDateTime(event.createdAt)}
                            >
                              {formatRelativeDateTime(event.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-bold"
          style={{
            background: HEADER_PROFILE_BG,
            color: HEADER_PROFILE_TEXT,
          }}
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
      </div>
    </motion.header>
  )
}
