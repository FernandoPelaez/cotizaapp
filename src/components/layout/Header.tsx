"use client"

import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  Bell,
  CheckCircle2,
  Clock3,
  Send,
  XCircle,
} from "lucide-react"

import type {
  QuoteEvent,
  QuoteEventsResponse,
  QuoteEventType,
} from "@/components/dashboard/cotizaciones/cotizaciones.types"
import {
  formatDateTime,
  formatRelativeDateTime,
} from "@/components/dashboard/cotizaciones/cotizaciones.utils"

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

function getEventStyles(type: QuoteEventType) {
  switch (type) {
    case "QUOTE_SENT":
      return {
        container: "border-blue-200 bg-blue-50 text-blue-700",
        icon: <Send className="h-4 w-4" />,
      }
    case "QUOTE_ACCEPTED":
      return {
        container: "border-emerald-200 bg-emerald-50 text-emerald-700",
        icon: <CheckCircle2 className="h-4 w-4" />,
      }
    case "QUOTE_REJECTED":
      return {
        container: "border-red-200 bg-red-50 text-red-700",
        icon: <XCircle className="h-4 w-4" />,
      }
    case "QUOTE_EXPIRED":
      return {
        container: "border-slate-200 bg-slate-100 text-slate-700",
        icon: <Clock3 className="h-4 w-4" />,
      }
    default:
      return {
        container: "border-neutral-200 bg-neutral-100 text-neutral-700",
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

export default function Header() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

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
        throw new Error("La respuesta de notificaciones no tiene el formato esperado")
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const markNotificationsAsRead = async () => {
    try {
      setMarkingNotifications(true)

      const res = await fetch("/api/quotes/events", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          readAll: true,
        }),
      })

      const data: { error?: string; unreadCount?: number } = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || "No se pudieron actualizar las notificaciones"
        )
      }

      setUnreadCount(typeof data.unreadCount === "number" ? data.unreadCount : 0)

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
    <header
      className="flex flex-shrink-0 items-center justify-between px-6"
      style={{
        height: "72px",
        background: "var(--card)",
        borderBottom: "1px solid var(--border)",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      <div className="flex items-center">
        <div className="flex flex-col leading-tight">
          <h1 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>
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

      <div className="flex items-center gap-3">
        <div className="relative" ref={notificationsRef}>
          <button
            type="button"
            onClick={() => void handleToggleNotifications()}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition hover:bg-neutral-50"
            aria-label="Abrir notificaciones"
            title="Notificaciones"
          >
            <Bell className="h-4 w-4 text-[#2f5fe3]" />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 z-30 w-[360px] rounded-2xl border border-neutral-200 bg-white p-3 shadow-xl">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    Notificaciones
                  </p>
                  <p className="text-xs text-neutral-500">
                    {markingNotifications
                      ? "Marcando como leídas..."
                      : "Eventos recientes de tus cotizaciones"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs font-medium text-neutral-500 transition hover:text-neutral-700"
                >
                  Cerrar
                </button>
              </div>

              {loadingNotifications ? (
                <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-500">
                  Cargando notificaciones...
                </div>
              ) : events.length === 0 ? (
                <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-500">
                  Aún no tienes notificaciones recientes.
                </div>
              ) : (
                <div className="space-y-2">
                  {events.map((event) => {
                    const styles = getEventStyles(event.type)

                    return (
                      <div
                        key={event.id}
                        className="rounded-xl border border-neutral-200 p-3"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${styles.container}`}
                          >
                            {styles.icon}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-semibold text-neutral-900">
                                {event.title}
                              </p>

                              {!event.isRead && (
                                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                                  Nuevo
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-sm text-neutral-600">
                              {event.message || "Se registró actividad reciente."}
                            </p>

                            <p
                              className="mt-1 text-xs text-neutral-400"
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
            background: "var(--primary-light)",
            color: "var(--primary)",
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
    </header>
  )
}
