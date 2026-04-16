import { QuoteEventType, QuoteStatus } from "./cotizaciones.types"

export function getStatusLabel(status: QuoteStatus) {
  switch (status) {
    case "DRAFT":
      return "Borrador"
    case "SENT":
      return "Enviada"
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

export function getStatusClasses(status: QuoteStatus) {
  switch (status) {
    case "DRAFT":
      return "border-neutral-200 bg-neutral-100 text-neutral-700"
    case "SENT":
      return "border-blue-200 bg-blue-50 text-blue-700"
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

export function getEventTypeLabel(type: QuoteEventType) {
  switch (type) {
    case "QUOTE_SENT":
      return "Enviada"
    case "QUOTE_ACCEPTED":
      return "Aceptada"
    case "QUOTE_REJECTED":
      return "Rechazada"
    case "QUOTE_EXPIRED":
      return "Expirada"
    default:
      return "Actividad"
  }
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
