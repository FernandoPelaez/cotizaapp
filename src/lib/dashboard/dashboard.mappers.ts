import type { Cotizacion, Plantilla } from "@/types/dashboard"

export type DashboardQuoteStatus =
  | "borrador"
  | "pendiente"
  | "aprobada"
  | "rechazada"
  | "expirada"

export function formatShortDate(value: Date) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
  }).format(value)
}

export function mapQuoteStatusToDashboardStatus(
  status: "DRAFT" | "SENT" | "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED"
): DashboardQuoteStatus {
  switch (status) {
    case "DRAFT":
      return "borrador"
    case "SENT":
    case "PENDING":
      return "pendiente"
    case "ACCEPTED":
      return "aprobada"
    case "REJECTED":
      return "rechazada"
    case "EXPIRED":
      return "expirada"
  }
}

export function mapQuotesToDashboardQuotes(
  quotes: Array<{
    id: string
    title: string
    description: string | null
    total: number
    status: "DRAFT" | "SENT" | "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED"
    createdAt: Date
  }>
): Cotizacion[] {
  return quotes.map((quote, index) => ({
    id: quote.id,
    numero: index + 1,
    nombre: quote.title,
    descripcion: quote.description ?? undefined,
    fecha: formatShortDate(quote.createdAt),
    monto: quote.total,
    estado: mapQuoteStatusToDashboardStatus(quote.status),
  }))
}

export function mapTemplatesToDashboardTemplates(
  templates: Array<{
    id: string
    name: string
    isPremium: boolean
    previewUrl: string | null
  }>,
  defaultTemplateId?: string | null
): Plantilla[] {
  return templates.map((template) => ({
    id: template.id,
    nombre: template.name,
    color: "#1B3D7A",
    accentColor: "#1B3D7A",
    activa: defaultTemplateId === template.id,
    tipo: template.isPremium ? "pro" : "basica",
    preview: template.previewUrl ?? undefined,
  }))
}
