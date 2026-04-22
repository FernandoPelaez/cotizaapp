"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  CalendarDays,
  FileText,
  MessageCircleMore,
  MoreHorizontal,
  PencilLine,
  Phone,
  Trash2,
  UserRound,
} from "lucide-react"

import type { Quote } from "@/types/cotizacion"
import {
  formatCurrency,
  formatDate,
  getStatusClasses,
  getStatusLabel,
} from "@/lib/cotizacion"

type CotizacionCardProps = {
  quote: Quote
  deletingId: string | null
  sendingWhatsAppId: string | null
  onSendWhatsApp: (quote: Quote) => void
  onDelete: (quote: Quote) => void
}

export default function CotizacionCard({
  quote,
  deletingId,
  sendingWhatsAppId,
  onSendWhatsApp,
  onDelete,
}: CotizacionCardProps) {
  const [actionsOpen, setActionsOpen] = useState(false)
  const actionsRef = useRef<HTMLDivElement | null>(null)

  const isDeleting = deletingId === quote.id
  const isSendingWhatsApp = sendingWhatsAppId === quote.id

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(event.target as Node)
      ) {
        setActionsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActionsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const handleDeleteClick = () => {
    setActionsOpen(false)
    onDelete(quote)
  }

  return (
    <article className="flex items-center gap-2.5 rounded-xl border border-neutral-100 bg-white px-3 py-2 transition hover:border-neutral-200 hover:shadow-sm">
      <div className="flex shrink-0 flex-col items-center gap-1">
        <div
          className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border ${getStatusClasses(
            quote.status
          )}`}
        >
          <FileText className="h-3 w-3" />
        </div>
        <span
          className={`rounded-full border px-1.5 py-px text-[9px] font-semibold ${getStatusClasses(
            quote.status
          )}`}
        >
          {getStatusLabel(quote.status)}
        </span>
      </div>

      <div className="w-[100px] shrink-0">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
          Total
        </p>
        <p className="text-xs font-bold text-neutral-900">
          {formatCurrency(Number(quote.total))}
        </p>
      </div>

      <div className="hidden w-[140px] shrink-0 xl:block">
        <div className="flex items-center gap-1 text-neutral-400">
          <CalendarDays className="h-2.5 w-2.5" />
          <p className="text-[9px] font-semibold uppercase tracking-widest">
            Fechas
          </p>
        </div>
        <div className="mt-0.5 space-y-0.5 text-[11px] text-neutral-500">
          <p>Creada: {formatDate(quote.createdAt)}</p>
          {quote.sentAt && <p>Enviada: {formatDate(quote.sentAt)}</p>}
          {quote.responseExpiresAt && quote.status === "PENDING" && (
            <p className="font-medium text-amber-600">
              Expira: {formatDate(quote.responseExpiresAt)}
            </p>
          )}
        </div>
      </div>

      <div className="hidden min-w-0 flex-1 xl:block">
        <div className="flex items-center gap-1 text-neutral-400">
          <Phone className="h-2.5 w-2.5" />
          <p className="text-[9px] font-semibold uppercase tracking-widest">
            Envío
          </p>
        </div>
        <div className="mt-0.5 space-y-0.5 text-[11px] text-neutral-500">
          <p>{quote.clientPhone ?? "Sin teléfono"}</p>
          <div className="flex items-center gap-1">
            <MessageCircleMore className="h-2.5 w-2.5 text-neutral-400" />
            <span>
              {quote.sendChannel === "WHATSAPP"
                ? "WhatsApp"
                : quote.sendChannel === "PDF"
                  ? "PDF"
                  : "No definido"}
            </span>
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-neutral-900">
          {quote.title}
        </p>
        <div className="flex items-center gap-1 text-[11px] text-neutral-400">
          <UserRound className="h-2.5 w-2.5" />
          <span className="truncate">{quote.clientName}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          onClick={() => onSendWhatsApp(quote)}
          disabled={isSendingWhatsApp || isDeleting || !quote.clientPhone}
          className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <MessageCircleMore className="h-2.5 w-2.5" />
          {isSendingWhatsApp ? "..." : "WhatsApp"}
        </button>

        <div className="relative" ref={actionsRef}>
          <button
            type="button"
            onClick={() => setActionsOpen((prev) => !prev)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50"
            aria-label="Abrir acciones"
            title="Acciones"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>

          {actionsOpen && (
            <div className="absolute right-0 top-9 z-20 w-44 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg">
              <Link
                href={`/cotizaciones/${quote.id}/editar`}
                onClick={() => setActionsOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium text-neutral-700 transition hover:bg-neutral-50"
              >
                <PencilLine className="h-3.5 w-3.5" />
                Editar
              </Link>

              <Link
                href={`/api/quotes/${quote.id}/pdf`}
                target="_blank"
                onClick={() => setActionsOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium text-blue-700 transition hover:bg-blue-50"
              >
                <FileText className="h-3.5 w-3.5" />
                Descargar PDF
              </Link>

              <button
                type="button"
                onClick={handleDeleteClick}
                disabled={isDeleting || isSendingWhatsApp}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[11px] font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
