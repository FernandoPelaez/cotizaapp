"use client"

import { useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { ChevronLeft, ChevronRight, RefreshCw, Search, X } from "lucide-react"

import RecentActivityCard from "@/components/dashboard/cotizaciones/activity/RecentActivityCard"
import CotizacionesList from "@/components/dashboard/cotizaciones/list/CotizacionesList"
import DeleteQuoteModal from "@/components/dashboard/cotizaciones/modales/DeleteQuoteModal"
import CotizacionesStats from "@/components/dashboard/cotizaciones/stats/CotizacionesStats"
import type {
  Notice,
  Quote,
  QuoteEvent,
  QuoteEventsResponse,
  QuotesResponse,
} from "@/types/cotizacion"

const ITEMS_PER_PAGE = 5

function serializeQuotes(quotes: Quote[]) {
  return JSON.stringify(
    quotes.map((quote) => ({
      id: quote.id,
      title: quote.title,
      clientName: quote.clientName,
      clientPhone: quote.clientPhone ?? "",
      total: quote.total,
      status: quote.status,
      sendChannel: quote.sendChannel ?? "",
      sentAt: quote.sentAt ?? "",
      responseExpiresAt: quote.responseExpiresAt ?? "",
      createdAt: quote.createdAt,
    }))
  )
}

function serializeEvents(events: QuoteEvent[]) {
  return JSON.stringify(
    events.map((event) => ({
      id: event.id,
      quoteId: event.quoteId,
      type: event.type,
      title: event.title,
      message: event.message ?? "",
      isRead: event.isRead,
      readAt: event.readAt ?? "",
      createdAt: event.createdAt,
      quoteTitle: event.quote?.title ?? "",
      quoteStatus: event.quote?.status ?? "",
    }))
  )
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
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const showNotice = (type: "success" | "error", message: string) => {
    setNotice({ type, message })
  }

  const loadDashboard = async (options?: {
    showLoader?: boolean
    showRefreshing?: boolean
  }) => {
    const showLoader = Boolean(options?.showLoader)
    const showRefreshing = Boolean(options?.showRefreshing)

    try {
      if (status !== "authenticated") return

      if (showLoader) setLoading(true)
      if (showRefreshing) setRefreshing(true)

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

      const nextQuotes = Array.isArray((quotesData as QuotesResponse).quotes)
        ? (quotesData as QuotesResponse).quotes
        : []

      const nextEvents = Array.isArray((eventsData as QuoteEventsResponse).events)
        ? (eventsData as QuoteEventsResponse).events
        : []

      const hasQuoteChanges =
        serializeQuotes(nextQuotes) !== serializeQuotes(quotes)
      const hasEventChanges =
        serializeEvents(nextEvents) !== serializeEvents(events)

      setQuotes(nextQuotes)
      setEvents(nextEvents)

      if (showRefreshing) {
        showNotice(
          "success",
          hasQuoteChanges || hasEventChanges
            ? "Historial actualizado correctamente."
            : "No hay actualizaciones recientes."
        )
      }
    } catch (err) {
      console.error("Error cargando dashboard de cotizaciones", err)
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al cargar la información"
      )
    } finally {
      if (showLoader) setLoading(false)
      if (showRefreshing) setRefreshing(false)
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
    const timer = window.setTimeout(() => setModalVisible(true), 10)
    return () => window.clearTimeout(timer)
  }, [quoteToDelete])

  useEffect(() => {
    if (!quoteToDelete) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !deletingId) closeDeleteModal()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [quoteToDelete, deletingId])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(null), 3500)
    return () => window.clearTimeout(timer)
  }, [notice])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const summary = useMemo(
    () => ({
      drafts: quotes.filter((q) => q.status === "DRAFT").length,
      sent: quotes.filter((q) => q.status === "SENT").length,
      pending: quotes.filter((q) => q.status === "PENDING").length,
      accepted: quotes.filter((q) => q.status === "ACCEPTED").length,
      rejected: quotes.filter((q) => q.status === "REJECTED").length,
      expired: quotes.filter((q) => q.status === "EXPIRED").length,
    }),
    [quotes]
  )

  const filteredQuotes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return quotes

    return quotes.filter((quote) => {
      const haystack = [quote.title, quote.clientName, quote.clientPhone ?? ""]
        .join(" ")
        .toLowerCase()

      return haystack.includes(query)
    })
  }, [quotes, searchTerm])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredQuotes.length / ITEMS_PER_PAGE)
  )

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages))
  }, [totalPages])

  const paginatedQuotes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredQuotes.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredQuotes, currentPage])

  const openDeleteModal = (quote: Quote) => {
    if (deletingId) return
    setQuoteToDelete(quote)
  }

  const closeDeleteModal = () => {
    if (deletingId) return
    setModalVisible(false)
    window.setTimeout(() => setQuoteToDelete(null), 180)
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
    } catch (err) {
      showNotice(
        "error",
        err instanceof Error
          ? err.message
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
    } catch (err) {
      showNotice(
        "error",
        err instanceof Error
          ? err.message
          : "Ocurrió un error al preparar el envío por WhatsApp"
      )
    } finally {
      setSendingWhatsAppId(null)
    }
  }

  const handleRefresh = () => {
    void loadDashboard({ showRefreshing: true })
  }

  if (loading || status === "loading") {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex items-center gap-3 text-sm text-neutral-400">
          <RefreshCw className="h-4 w-4 animate-spin" />
          Cargando cotizaciones...
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4 p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Consulta tus cotizaciones
            </h2>
            <p className="mt-0.5 text-xs text-neutral-400">
              El estado actual de cada cotización y gestiona tus registros.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto">
            <div className="relative min-w-0 sm:flex-1 xl:w-[280px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar cotización..."
                className="h-9 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-9 text-sm text-neutral-700 outline-none transition placeholder:text-neutral-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-neutral-600"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing || status !== "authenticated"}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
              />
              {refreshing ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </div>

        {notice && (
          <div
            className={`flex items-center gap-2.5 rounded-xl border p-3 text-xs font-medium transition-all duration-300 ${
              notice.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-600"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                notice.type === "success" ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
            {notice.message}
          </div>
        )}

        <CotizacionesStats summary={summary} />

        <div className="grid gap-4 xl:grid-cols-[340px_minmax(0,1fr)] xl:items-start">
          <div className="min-w-0">
            <RecentActivityCard events={events} />
          </div>

          <div className="min-w-0">
            {error ? (
              <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                <p className="text-xs font-medium text-red-600">{error}</p>
              </div>
            ) : filteredQuotes.length === 0 && searchTerm.trim() ? (
              <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50 px-6 py-8 text-center">
                  <p className="text-sm font-semibold text-neutral-900">
                    No encontramos cotizaciones
                  </p>
                  <p className="mt-1.5 text-xs text-neutral-500">
                    No hay resultados para{" "}
                    <span className="font-medium">"{searchTerm}"</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="mt-4 inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50"
                  >
                    Limpiar búsqueda
                  </button>
                </div>
              </section>
            ) : (
              <section className="rounded-2xl border border-neutral-200 bg-white shadow">
                <div className="flex flex-col gap-3 p-5">
                  <CotizacionesList
                    quotes={paginatedQuotes}
                    deletingId={deletingId}
                    sendingWhatsAppId={sendingWhatsAppId}
                    onSendWhatsApp={handleSendWhatsApp}
                    onDelete={openDeleteModal}
                  />
                </div>

                <div className="flex items-center justify-between border-t border-neutral-100 px-5 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Página anterior"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`inline-flex h-8 min-w-[2rem] items-center justify-center rounded-md border px-2 text-xs font-medium transition ${
                              page === currentPage
                                ? "border-blue-200 bg-blue-50 text-blue-700"
                                : "border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Página siguiente"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs text-neutral-400">
                    Mostrando{" "}
                    <span className="font-medium text-neutral-600">
                      {Math.min(
                        (currentPage - 1) * ITEMS_PER_PAGE + 1,
                        filteredQuotes.length
                      )}
                      –
                      {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredQuotes.length
                      )}
                    </span>{" "}
                    de{" "}
                    <span className="font-medium text-neutral-600">
                      {filteredQuotes.length}
                    </span>
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
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