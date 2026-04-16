import Link from "next/link"

import { Quote } from "./cotizaciones.types"
import {
  formatCurrency,
  formatDate,
  getStatusClasses,
  getStatusLabel,
} from "./cotizaciones.utils"

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
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-semibold text-neutral-900">{quote.title}</p>

          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
              quote.status
            )}`}
          >
            {getStatusLabel(quote.status)}
          </span>
        </div>

        <p className="mt-1 text-sm text-neutral-500">{quote.clientName}</p>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <p className="font-medium text-neutral-700">
            {formatCurrency(Number(quote.total))}
          </p>

          <p className="text-neutral-400">Creada: {formatDate(quote.createdAt)}</p>

          {quote.sentAt && (
            <p className="text-neutral-400">Enviada: {formatDate(quote.sentAt)}</p>
          )}

          {quote.responseExpiresAt && quote.status === "PENDING" && (
            <p className="text-amber-700">
              Expira: {formatDate(quote.responseExpiresAt)}
            </p>
          )}

          {quote.clientPhone && (
            <p className="text-neutral-400">Tel: {quote.clientPhone}</p>
          )}

          {quote.sendChannel && quote.sendChannel !== "PDF" && (
            <p className="text-neutral-400">
              Canal: {quote.sendChannel === "WHATSAPP" ? "WhatsApp" : "PDF"}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/cotizaciones/${quote.id}/editar`}
          className="inline-flex items-center rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
        >
          Editar
        </Link>

        <Link
          href={`/api/quotes/${quote.id}/pdf`}
          target="_blank"
          className="inline-flex items-center rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
        >
          PDF
        </Link>

        <button
          type="button"
          onClick={() => onSendWhatsApp(quote)}
          disabled={
            sendingWhatsAppId === quote.id ||
            deletingId === quote.id ||
            !quote.clientPhone
          }
          className="inline-flex items-center rounded-lg border border-emerald-200 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sendingWhatsAppId === quote.id ? "Preparando..." : "WhatsApp"}
        </button>

        <button
          type="button"
          onClick={() => onDelete(quote)}
          disabled={deletingId === quote.id || sendingWhatsAppId === quote.id}
          className="inline-flex items-center rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {deletingId === quote.id ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  )
}
