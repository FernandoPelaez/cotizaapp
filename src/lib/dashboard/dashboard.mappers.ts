import type { Cotizacion, Plantilla } from "@/types/dashboard"

export type DashboardQuoteStatus =
  | "borrador"
  | "pendiente"
  | "aprobada"
  | "rechazada"
  | "expirada"

type DashboardQuoteFromDb = {
  id: string
  title: string
  description: string | null
  total: number
  status: "DRAFT" | "SENT" | "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED"
  createdAt: Date
  updatedAt?: Date | null
}

type DashboardQuoteWithDates = Cotizacion & {
  createdAt?: string
  created_at?: string
  fechaCreacion?: string
  fecha_creacion?: string
  updatedAt?: string
  updated_at?: string
  fechaDisplay?: string
}

export function formatShortDate(value: Date) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
  }).format(value)
}

export function formatDisplayDate(value: Date) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(value)
}

export function mapQuoteStatusToDashboardStatus(
  status: DashboardQuoteFromDb["status"],
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
  quotes: DashboardQuoteFromDb[],
): DashboardQuoteWithDates[] {
  return quotes.map((quote, index) => {
    const createdAtIso = quote.createdAt.toISOString()
    const updatedAtIso = quote.updatedAt?.toISOString() ?? createdAtIso

    return {
      id: quote.id,
      numero: index + 1,
      nombre: quote.title,
      descripcion: quote.description ?? undefined,
      fecha: formatShortDate(quote.createdAt),
      fechaDisplay: formatDisplayDate(quote.createdAt),
      monto: quote.total,
      estado: mapQuoteStatusToDashboardStatus(quote.status),

      createdAt: createdAtIso,
      created_at: createdAtIso,
      fechaCreacion: createdAtIso,
      fecha_creacion: createdAtIso,
      updatedAt: updatedAtIso,
      updated_at: updatedAtIso,
    }
  })
}

export function mapTemplatesToDashboardTemplates(
  templates: Array<{
    id: string
    name: string
    isPremium: boolean
    previewUrl: string | null
  }>,
  defaultTemplateId?: string | null,
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
