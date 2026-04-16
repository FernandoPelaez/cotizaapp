import { QuoteStatus } from "./cotizaciones.types"

export function getStatusLabel(status: QuoteStatus) {
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

export function getStatusClasses(status: QuoteStatus) {
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
