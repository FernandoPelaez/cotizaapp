export interface Plantilla {
  id: string
  nombre: string
  color: string
  accentColor?: string
  activa?: boolean
  tipo?: "basica" | "pro" | "premium"
  preview?: string
}

export interface Cotizacion {
  id: string
  numero: number
  nombre: string
  descripcion?: string
  fecha: string
  monto: number
  estado: "aprobada" | "pendiente" | "rechazada" | "borrador" | "expirada"
}

export interface UserConfig {
  plan?: "free" | "pro" | "premium"
  cotizacionesUsadas?: number
  cotizacionesMax?: number
  plantillaActivaNombre?: string
  historialTotal?: number
}
