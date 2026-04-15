"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

type QuoteStatus = "DRAFT" | "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED"
type SendChannel = "PDF" | "WHATSAPP"

type Quote = {
  id: string
  title: string
  clientName: string
  clientPhone?: string | null
  total: number
  status: QuoteStatus
  sendChannel?: SendChannel
  sentAt?: string | null
  responseExpiresAt?: string | null
  createdAt: string
}

type QuotesResponse = {
  quotes: Quote[]
  totalThisMonth?: number
  user?: {
    quotesUsed?: number
    trialQuotesLimit?: number
    trialBlocked?: boolean
    plan?: {
      name?: string
      maxQuotes?: number
    }
  }
}

type Notice = {
  type: "success" | "error"
  message: string
} | null

function getStatusLabel(status: QuoteStatus) {
  switch (status) {
    case "DRAFT":
      return "Borrador"
    case "PENDING":
      return "Pendiente"
    case "ACCEPTED":
      return "Aceptada"
    case "REJECTED":
      return "Rechazada"
    case "EXPIRED":
      return "Expirada"
    default:
      return status
  }
}

function getStatusClasses(status: QuoteStatus) {
  switch (status) {
    case "DRAFT":
      return "border-neutral-200 bg-neutral-100 text-neutral-700"
    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700"
    case "ACCEPTED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700"
    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-700"
    case "EXPIRED":
      return "border-slate-200 bg-slate-100 text-slate-600"
    default:
      return "border-neutral-200 bg-neutral-100 text-neutral-700"
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-MX")
}

export default function CotizacionesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [sendingWhatsAppId, setSendingWhatsAppId] = useState<string | null>(null)
  const [quoteToDelete, setQuoteToDelete] = useState<Quote | null>(null)
  const [notice, setNotice] = useState<Notice>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const fetchQuotes = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch("/api/quotes", {
        cache: "no-store",
      })

      const data: QuotesResponse | { error?: string } = await res.json()

      if (!res.ok) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : "No se pudieron cargar las cotizaciones"
        )
      }

      setQuotes(
        Array.isArray((data as QuotesResponse).quotes)
          ? (data as QuotesResponse).quotes
          : []
      )
    } catch (error) {
      console.error("Error cargando cotizaciones", error)
      setError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al cargar las cotizaciones"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

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
      })

      const data: { error?: string; ok?: boolean } = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "No se pudo eliminar la cotización")
      }

      setQuotes((prev) =>
        prev.filter((quote) => quote.id !== quoteToDelete.id)
      )

      showNotice("success", "Cotización eliminada correctamente")
      closeDeleteModal()
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
      })

      const data: {
        ok?: boolean
        error?: string
        whatsappUrl?: string
      } = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "No se pudo preparar el envío por WhatsApp")
      }

      if (!data.whatsappUrl) {
        throw new Error("No se generó el enlace de WhatsApp")
      }

      window.open(data.whatsappUrl, "_blank", "noopener,noreferrer")

      showNotice("success", "Cotización preparada para enviarse por WhatsApp")
      await fetchQuotes()
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

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-neutral-500">Cargando cotizaciones...</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-5 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              Historial de cotizaciones
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Consulta el estado actual de cada cotización y gestiona tus
              registros.
            </p>
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

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Borradores
            </p>
            <p className="mt-2 text-2xl font-bold text-neutral-900">
              {summary.drafts}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-amber-700">
              Pendientes
            </p>
            <p className="mt-2 text-2xl font-bold text-amber-800">
              {summary.pending}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              Aceptadas
            </p>
            <p className="mt-2 text-2xl font-bold text-emerald-800">
              {summary.accepted}
            </p>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-red-700">
              Rechazadas
            </p>
            <p className="mt-2 text-2xl font-bold text-red-800">
              {summary.rejected}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
              Expiradas
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-700">
              {summary.expired}
            </p>
          </div>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        ) : quotes.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-neutral-500">No tienes cotizaciones aún</p>
          </div>
        ) : (
          <div className="space-y-3">
            {quotes.map((q) => (
              <div
                key={q.id}
                className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-semibold text-neutral-900">
                      {q.title}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                        q.status
                      )}`}
                    >
                      {getStatusLabel(q.status)}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-neutral-500">{q.clientName}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <p className="font-medium text-neutral-700">
                      {formatCurrency(Number(q.total))}
                    </p>

                    <p className="text-neutral-400">
                      Creada: {formatDate(q.createdAt)}
                    </p>

                    {q.sentAt && (
                      <p className="text-neutral-400">
                        Enviada: {formatDate(q.sentAt)}
                      </p>
                    )}

                    {q.responseExpiresAt && q.status === "PENDING" && (
                      <p className="text-amber-700">
                        Expira: {formatDate(q.responseExpiresAt)}
                      </p>
                    )}

                    {q.clientPhone && (
                      <p className="text-neutral-400">Tel: {q.clientPhone}</p>
                    )}

                    {q.sendChannel && q.sendChannel !== "PDF" && (
                      <p className="text-neutral-400">
                        Canal: {q.sendChannel === "WHATSAPP" ? "WhatsApp" : "PDF"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/cotizaciones/${q.id}/editar`}
                    className="inline-flex items-center rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
                  >
                    Editar
                  </Link>

                  <Link
                    href={`/api/quotes/${q.id}/pdf`}
                    target="_blank"
                    className="inline-flex items-center rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                  >
                    PDF
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleSendWhatsApp(q)}
                    disabled={
                      sendingWhatsAppId === q.id ||
                      deletingId === q.id ||
                      !q.clientPhone
                    }
                    className="inline-flex items-center rounded-lg border border-emerald-200 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sendingWhatsAppId === q.id ? "Preparando..." : "WhatsApp"}
                  </button>

                  <button
                    type="button"
                    onClick={() => openDeleteModal(q)}
                    disabled={deletingId === q.id || sendingWhatsAppId === q.id}
                    className="inline-flex items-center rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === q.id ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {quoteToDelete && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-200 ${
            modalVisible ? "bg-black/60 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={closeDeleteModal}
        >
          <div
            className={`w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl transition-all duration-200 ${
              modalVisible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-2 scale-95 opacity-0"
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  Eliminar cotización
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  ¿Seguro que deseas eliminar esta cotización? Esta acción no se
                  puede deshacer.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Cotización seleccionada
                </p>
                <p className="mt-1 text-sm font-semibold text-neutral-900">
                  {quoteToDelete.title}
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  {quoteToDelete.clientName}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={!!deletingId}
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={!!deletingId}
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId === quoteToDelete.id ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
