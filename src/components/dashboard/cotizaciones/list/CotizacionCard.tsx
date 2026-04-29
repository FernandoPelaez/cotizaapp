"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MessageCircleMore,
  PencilLine,
  Phone,
  Send,
  Trash2,
  UserRound,
  XCircle,
} from "lucide-react"

import type { Quote } from "@/types/cotizacion"
import {
  formatCurrency,
  formatDate,
  getStatusLabel,
} from "@/lib/cotizacion"

type CotizacionCardProps = {
  quote: Quote
  deletingId: string | null
  sendingWhatsAppId: string | null
  onSendWhatsApp: (quote: Quote) => void
  onDelete: (quote: Quote) => void
}

type StatusUi = {
  icon: LucideIcon
  iconWrap: string
  badge: string
}

const cardEase: [number, number, number, number] = [0.19, 1, 0.22, 1]

const statusUi: Record<string, StatusUi> = {
  DRAFT: {
    icon: FileText,
    iconWrap: "border-violet-100 bg-violet-100 text-violet-600",
    badge: "border-violet-100 bg-violet-50 text-violet-700",
  },
  BORRADOR: {
    icon: FileText,
    iconWrap: "border-violet-100 bg-violet-100 text-violet-600",
    badge: "border-violet-100 bg-violet-50 text-violet-700",
  },
  PENDING: {
    icon: Send,
    iconWrap: "border-blue-100 bg-blue-100 text-blue-600",
    badge: "border-blue-100 bg-blue-50 text-blue-700",
  },
  PENDIENTE: {
    icon: Send,
    iconWrap: "border-blue-100 bg-blue-100 text-blue-600",
    badge: "border-blue-100 bg-blue-50 text-blue-700",
  },
  ACCEPTED: {
    icon: CheckCircle2,
    iconWrap: "border-green-100 bg-green-100 text-green-600",
    badge: "border-green-100 bg-green-50 text-green-700",
  },
  ACEPTADA: {
    icon: CheckCircle2,
    iconWrap: "border-green-100 bg-green-100 text-green-600",
    badge: "border-green-100 bg-green-50 text-green-700",
  },
  REJECTED: {
    icon: XCircle,
    iconWrap: "border-red-100 bg-red-100 text-red-500",
    badge: "border-red-100 bg-red-50 text-red-600",
  },
  RECHAZADA: {
    icon: XCircle,
    iconWrap: "border-red-100 bg-red-100 text-red-500",
    badge: "border-red-100 bg-red-50 text-red-600",
  },
  EXPIRED: {
    icon: Clock3,
    iconWrap: "border-orange-100 bg-orange-100 text-orange-500",
    badge: "border-orange-100 bg-orange-50 text-orange-600",
  },
  EXPIRADA: {
    icon: Clock3,
    iconWrap: "border-orange-100 bg-orange-100 text-orange-500",
    badge: "border-orange-100 bg-orange-50 text-orange-600",
  },
}

function getStatusUi(status: Quote["status"]) {
  const key = String(status).toUpperCase()
  return (
    statusUi[key] ?? {
      icon: FileText,
      iconWrap: "border-neutral-100 bg-neutral-100 text-neutral-500",
      badge: "border-neutral-100 bg-neutral-50 text-neutral-600",
    }
  )
}

export default function CotizacionCard({
  quote,
  deletingId,
  sendingWhatsAppId,
  onSendWhatsApp,
  onDelete,
}: CotizacionCardProps) {
  const isDeleting = deletingId === quote.id
  const isSendingWhatsApp = sendingWhatsAppId === quote.id
  const statusStyle = getStatusUi(quote.status)
  const StatusIcon = statusStyle.icon

  const sendChannelLabel =
    quote.sendChannel === "WHATSAPP"
      ? "WhatsApp"
      : quote.sendChannel === "PDF"
        ? "PDF"
        : "No definido"

  return (
    <motion.article
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2, ease: cardEase }}
      className="relative rounded-xl border border-neutral-100 bg-white px-4 py-3 shadow-sm"
    >
      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">

        {/* ── Información principal ── */}
        <div className="flex min-w-0 items-center gap-4">

          {/* Icono + badge de estado */}
          <div className="flex w-16 shrink-0 flex-col items-center gap-1">
            <div
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border ${statusStyle.iconWrap}`}
            >
              <StatusIcon className="h-3.5 w-3.5" />
            </div>
            <span
              className={`max-w-full truncate rounded-full border px-1.5 py-0.5 text-[9px] font-semibold ${statusStyle.badge}`}
            >
              {getStatusLabel(quote.status)}
            </span>
          </div>

          {/* Datos de la cotización */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-950">
              {quote.title}
            </p>

            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
              <UserRound className="h-3 w-3 shrink-0" />
              <span className="truncate">{quote.clientName}</span>
            </div>

            {/* Chips de metadatos */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">

              {/* Total */}
              <div className="flex items-center gap-1.5 rounded-lg border border-neutral-100 bg-neutral-50 px-2.5 py-1.5">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
                  Total
                </span>
                <span className="text-xs font-bold text-slate-950">
                  {formatCurrency(Number(quote.total))}
                </span>
              </div>

              {/* Fecha */}
              <div className="flex items-center gap-1.5 rounded-lg border border-neutral-100 bg-neutral-50 px-2.5 py-1.5">
                <CalendarDays className="h-3 w-3 shrink-0 text-neutral-400" />
                <span className="text-xs text-neutral-500">
                  {formatDate(quote.createdAt)}
                </span>
              </div>

              {/* Teléfono */}
              <div className="flex items-center gap-1.5 rounded-lg border border-neutral-100 bg-neutral-50 px-2.5 py-1.5">
                <Phone className="h-3 w-3 shrink-0 text-neutral-400" />
                <span className="max-w-[150px] truncate text-xs text-neutral-500">
                  {quote.clientPhone ?? "Sin teléfono"}
                </span>
              </div>

              {/* Canal de envío — solo si hay teléfono */}
              {quote.clientPhone && (
                <div className="flex items-center gap-1.5 rounded-lg border border-neutral-100 bg-neutral-50 px-2.5 py-1.5">
                  <MessageCircleMore className="h-3 w-3 shrink-0 text-neutral-400" />
                  <span className="text-xs text-neutral-500">
                    {sendChannelLabel}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Acciones ── */}
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className="text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
            Acciones
          </span>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <motion.button
              type="button"
              onClick={() => onSendWhatsApp(quote)}
              disabled={isSendingWhatsApp || isDeleting || !quote.clientPhone}
              whileHover={
                isSendingWhatsApp || isDeleting || !quote.clientPhone
                  ? undefined
                  : { y: -1 }
              }
              whileTap={
                isSendingWhatsApp || isDeleting || !quote.clientPhone
                  ? undefined
                  : { scale: 0.98 }
              }
              transition={{ duration: 0.2, ease: cardEase }}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <MessageCircleMore className="h-3.5 w-3.5" />
              {isSendingWhatsApp ? "..." : "WhatsApp"}
            </motion.button>

            <Link
              href={`/cotizaciones/${quote.id}/editar`}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
            >
              <PencilLine className="h-3.5 w-3.5" />
              Editar
            </Link>

            <Link
              href={`/api/quotes/${quote.id}/pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
            >
              <FileText className="h-3.5 w-3.5" />
              PDF
            </Link>

            <button
              type="button"
              onClick={() => onDelete(quote)}
              disabled={isDeleting || isSendingWhatsApp}
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 text-xs font-medium text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>

      </div>
    </motion.article>
  )
}
