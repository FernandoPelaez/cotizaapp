export type QuoteResponseResult =
  | "accepted"
  | "rejected"
  | "expired"
  | "invalid"
  | "not-found"
  | undefined

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatDate(value: Date | string) {
  return new Date(value).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getStatusLabel(status: string) {
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

export function getStatusClasses(status: string) {
  switch (status) {
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

export function getResultMessage(result?: QuoteResponseResult) {
  switch (result) {
    case "accepted":
      return {
        tone: "success" as const,
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
        message: "La cotización fue aceptada correctamente.",
      }

    case "rejected":
      return {
        tone: "error" as const,
        className: "border-red-200 bg-red-50 text-red-700",
        message: "La cotización fue rechazada correctamente.",
      }

    case "expired":
      return {
        tone: "neutral" as const,
        className: "border-slate-200 bg-slate-100 text-slate-700",
        message: "Esta cotización ya expiró y no puede responderse.",
      }

    case "invalid":
      return {
        tone: "warning" as const,
        className: "border-amber-200 bg-amber-50 text-amber-700",
        message: "La acción solicitada no es válida para esta cotización.",
      }

    case "not-found":
      return {
        tone: "error" as const,
        className: "border-red-200 bg-red-50 text-red-700",
        message: "No se encontró la cotización solicitada.",
      }

    default:
      return null
  }
}

export function getItemsLabel(totalItems: number) {
  return `${totalItems} concepto${totalItems === 1 ? "" : "s"}`
}
