"use client"

import { useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { CheckCircle2, Clock3, RefreshCw, Send, XCircle } from "lucide-react"

import CotizacionesList from "@/components/dashboard/cotizaciones/CotizacionesList"
import CotizacionesStats from "@/components/dashboard/cotizaciones/CotizacionesStats"
import DeleteQuoteModal from "@/components/dashboard/cotizaciones/DeleteQuoteModal"
import {
  Notice,
  Quote,
  QuoteEvent,
  QuoteEventsResponse,
  QuoteEventType,
  QuotesResponse,
} from "@/components/dashboard/cotizaciones/cotizaciones.types"
import {
  formatDateTime,
  formatRelativeDateTime,
  getEventTypeLabel,
} from "@/components/dashboard/cotizaciones/cotizaciones.utils"

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
        icon: <Clock3 className="h-4 w-4" />,
      }
  }
}

export default function CotizacionesPageClient() {
  const { status } = useSession()

  const [quotes, setQuotes] = useState<Quote[]>([])
  const [events, setEvents] = useState<QuoteEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [sendingWhatsAppId, setSendingWhatsAppId] = useState<string | null>(
    null
  )
  const [quoteToDelete, setQuoteToDelete] = useState<Quote | null>(null)
  const [notice, setNotice] = useState<Notice>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const loadDashboard = async (options?: {
    showLoader?: boolean
    showRefreshing?: boolean
  }) => {
    const showLoader = Boolean(options?.showLoader)
    const showRefreshing = Boolean(options?.showRefreshing)

    try {
      if (status !== "authenticated") {
        return
      }

      if (showLoader) {
        setLoading(true)
      }

      if (showRefreshing) {
        setRefreshing(true)
      }

      setError(null)

      const [quotesRes, eventsRes] = await Promise.all([
        fetch("/api/quotes", {
          cache: "no-store",
          credentials: "include",
        }),
        fetch("/api/quotes/events?limit=6", {
          cache: "no-store",
          credentials: "include",
        }),
      ])

      const quotesData: QuotesResponse | { error?: string } =
        await quotesRes.json()
      const eventsData: QuoteEventsResponse | { error?: string } =
        await eventsRes.json()

      if (!quotesRes.ok) {
        throw new Error(
          "error" in quotesData && quotesData.error
            ? quotesData.error
            : "No se pudieron cargar las cotizaciones"
        )
      }

      if (!eventsRes.ok) {
        throw new Error(
          "error" in eventsData && eventsData.error
            ? eventsData.error
            : "No se pudieron cargar los eventos recientes"
        )
      }

      setQuotes(
        Array.isArray((quotesData as QuotesResponse).quotes)
          ? (quotesData as QuotesResponse).quotes
          : []
      )

      setEvents(
        Array.isArray((eventsData as QuoteEventsResponse).events)
          ? (eventsData as QuoteEventsResponse).events
          : []
      )
    } catch (error) {
      console.error("Error cargando dashboard de cotizaciones", error)
      setError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al cargar la información"
      )
    } finally {
      if (showLoader) {
        setLoading(false)
      }

      if (showRefreshing) {
        setRefreshing(false)
      }
    }
  }

  useEffect(() => {
    if (status === "loading") {
      setLoading(true)
      return
    }

    if (status === "unauthenticated") {
      setLoading(false)
      setError("No autorizado")
      return
    }

    void loadDashboard({ showLoader: true })
  }, [status])

  useEffect(() => {
    if (!quoteToDelete) {
      setModalVisible(false)
      return
    }

    const timer = window.setTimeout(() => {
      setModalVisible(true)
    }, 10)

    return () => window.clearTimeout(timer)
  }, [quoteToDelete])

  useEffect(() => {
    if (!quoteToDelete) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !deletingId) {
        closeDeleteModal()
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [quoteToDelete, deletingId])

  useEffect(() => {
    if (!notice) return

    const timer = window.setTimeout(() => {
      setNotice(null)
    }, 3500)

    return () => window.clearTimeout(timer)
  }, [notice])

  const summary = useMemo(() => {
    return {
      drafts: quotes.filter((quote) => quote.status === "DRAFT").length,
      sent: quotes.filter((quote) => quote.status === "SENT").length,
      pending: quotes.filter((quote) => quote.status === "PENDING").length,
      accepted: quotes.filter((quote) => quote.status === "ACCEPTED").length,
      rejected: quotes.filter((quote) => quote.status === "REJECTED").length,
      expired: quotes.filter((quote) => quote.status === "EXPIRED").length,
    }
  }, [quotes])

  const showNotice = (type: "success" | "error", message: string) => {
    setNotice({ type, message })
  }

  const openDeleteModal = (quote: Quote) => {
    if (deletingId) return
    setQuoteToDelete(quote)
  }

  const closeDeleteModal = () => {
    if (deletingId) return

    setModalVisible(false)

    window.setTimeout(() => {
      setQuoteToDelete(null)
    }, 180)
  }

  const confirmDelete = async () => {
    if (!quoteToDelete) return

    try {
      setDeletingId(quoteToDelete.id)

      const res = await fetch(`/api/quotes/${quoteToDelete.id}`, {
        method: "DELETE",
        credentials: "include",
      })

      const data: { error?: string; ok?: boolean } = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "No se pudo eliminar la cotización")
      }

      showNotice("success", "Cotización eliminada correctamente")
      closeDeleteModal()
      await loadDashboard()
    } catch (error) {
      console.error("Error eliminando cotización", error)
      showNotice(
        "error",
        error instanceof Error
          ? error.message
          : "Ocurrió un error al eliminar la cotización"
      )
    } finally {
      setDeletingId(null)
    }
  }

  const handleSendWhatsApp = async (quote: Quote) => {
    try {
      if (!quote.clientPhone) {
        throw new Error("Esta cotización no tiene teléfono del cliente")
      }

      setSendingWhatsAppId(quote.id)

      const res = await fetch(`/api/quotes/${quote.id}/whatsapp`, {
        method: "POST",
        credentials: "include",
      })

      const data: {
        ok?: boolean
        error?: string
        whatsappUrl?: string
      } = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || "No se pudo preparar el envío por WhatsApp"
        )
      }

      if (!data.whatsappUrl) {
        throw new Error("No se generó el enlace de WhatsApp")
      }

      window.open(data.whatsappUrl, "_blank", "noopener,noreferrer")

      showNotice("success", "Cotización preparada para enviarse por WhatsApp")
      await loadDashboard()
    } catch (error) {
      console.error("Error preparando WhatsApp", error)
      showNotice(
        "error",
        error instanceof Error
          ? error.message
          : "Ocurrió un error al preparar el envío por WhatsApp"
      )
    } finally {
      setSendingWhatsAppId(null)
    }
  }

  const handleRefresh = async () => {
    await loadDashboard({ showRefreshing: true })
  }

  if (loading || status === "loading") {
    return (
      <div className="p-6">
        <p className="text-sm text-neutral-500">Cargando cotizaciones...</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-5 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              Historial de cotizaciones
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Consulta el estado actual de cada cotización y gestiona tus
              registros.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing || status !== "authenticated"}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
              {refreshing ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </div>

        {notice && (
          <div
            className={`rounded-2xl border p-4 shadow-sm transition-all duration-300 ${
              notice.type === "success"
                ? "border-emerald-200 bg-emerald-50"
                : "border-red-200 bg-red-50"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                notice.type === "success"
                  ? "text-emerald-700"
                  : "text-red-600"
              }`}
            >
              {notice.message}
            </p>
          </div>
        )}

        <CotizacionesStats summary={summary} />

        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-neutral-900">
                Actividad reciente
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Últimos movimientos registrados en tus cotizaciones.
              </p>
            </div>

            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600">
              {events.length} evento{events.length === 1 ? "" : "s"}
            </span>
          </div>

          {events.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6">
              <p className="text-sm text-neutral-500">
                Todavía no hay actividad reciente para mostrar.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((event) => {
                const styles = getEventStyles(event.type)

                return (
                  <div
                    key={event.id}
                    className="flex flex-col gap-3 rounded-2xl border border-neutral-200 p-4 md:flex-row md:items-start md:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div
                        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${styles.container}`}
                      >
                        {styles.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-neutral-900">
                            {event.title}
                          </p>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${styles.container}`}
                          >
                            {getEventTypeLabel(event.type)}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-neutral-600">
                          {event.message || "Se registró actividad reciente."}
                        </p>

                        {event.quote?.title && (
                          <p className="mt-2 text-xs text-neutral-400">
                            Cotización: {event.quote.title}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 text-left md:text-right">
                      <p
                        className="text-xs font-medium text-neutral-500"
                        title={formatDateTime(event.createdAt)}
                      >
                        {formatRelativeDateTime(event.createdAt)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        ) : (
          <CotizacionesList
            quotes={quotes}
            deletingId={deletingId}
            sendingWhatsAppId={sendingWhatsAppId}
            onSendWhatsApp={handleSendWhatsApp}
            onDelete={openDeleteModal}
          />
        )}
      </div>

      <DeleteQuoteModal
        quote={quoteToDelete}
        modalVisible={modalVisible}
        deletingId={deletingId}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  )
}
