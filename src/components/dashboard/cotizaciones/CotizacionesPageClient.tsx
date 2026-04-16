"use client"

import { useEffect, useMemo, useState } from "react"

import CotizacionesList from "@/components/dashboard/cotizaciones/CotizacionesList"
import CotizacionesStats from "@/components/dashboard/cotizaciones/CotizacionesStats"
import DeleteQuoteModal from "@/components/dashboard/cotizaciones/DeleteQuoteModal"
import {
  Notice,
  Quote,
  QuotesResponse,
} from "@/components/dashboard/cotizaciones/cotizaciones.types"

export default function CotizacionesPageClient() {
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

        <CotizacionesStats summary={summary} />

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
