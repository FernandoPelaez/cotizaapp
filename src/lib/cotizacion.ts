import { QuoteEventType, QuoteStatus } from "@/types/cotizacion"

const STATUS_LABELS: Record<QuoteStatus, string> = {
  DRAFT: "Borrador",
  SENT: "Enviada",
  PENDING: "Pendiente",
  ACCEPTED: "Aceptada",
  REJECTED: "Rechazada",
  EXPIRED: "Expirada",
}

const STATUS_CLASSES: Record<QuoteStatus, string> = {
  DRAFT: "border-neutral-200 bg-neutral-100 text-neutral-700",
  SENT: "border-blue-200 bg-blue-50 text-blue-700",
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  ACCEPTED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  REJECTED: "border-red-200 bg-red-50 text-red-700",
  EXPIRED: "border-slate-200 bg-slate-100 text-slate-600",
}

const EVENT_TYPE_LABELS: Record<QuoteEventType, string> = {
  QUOTE_SENT: "Enviada",
  QUOTE_ACCEPTED: "Aceptada",
  QUOTE_REJECTED: "Rechazada",
  QUOTE_EXPIRED: "Expirada",
}

const EVENT_TYPE_CLASSES: Record<QuoteEventType, string> = {
  QUOTE_SENT: "border-blue-200 bg-blue-50 text-blue-700",
  QUOTE_ACCEPTED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  QUOTE_REJECTED: "border-red-200 bg-red-50 text-red-700",
  QUOTE_EXPIRED: "border-slate-200 bg-slate-100 text-slate-700",
}

export function getStatusLabel(status: QuoteStatus) {
  return STATUS_LABELS[status] ?? status
}

export function getStatusClasses(status: QuoteStatus) {
  return STATUS_CLASSES[status] ?? STATUS_CLASSES.DRAFT
}

export function getEventTypeLabel(type: QuoteEventType) {
  return EVENT_TYPE_LABELS[type] ?? "Actividad"
}

export function getEventTypeClasses(type: QuoteEventType) {
  return EVENT_TYPE_CLASSES[type] ?? "border-neutral-200 bg-neutral-100 text-neutral-700"
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-MX")
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

export function formatRelativeDateTime(value: string) {
  const date = new Date(value)
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()

  const minutes = Math.round(diffMs / (1000 * 60))
  const hours = Math.round(diffMs / (1000 * 60 * 60))
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24))

  const rtf = new Intl.RelativeTimeFormat("es", {
    numeric: "auto",
  })

  if (Math.abs(minutes) < 60) {
    return rtf.format(minutes, "minute")
  }

  if (Math.abs(hours) < 24) {
    return rtf.format(hours, "hour")
  }

  if (Math.abs(days) < 7) {
    return rtf.format(days, "day")
  }

  return formatDateTime(value)
}
