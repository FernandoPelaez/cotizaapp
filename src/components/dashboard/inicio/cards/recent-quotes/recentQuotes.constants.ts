export type StatusStyle = {
  label: string
  background: string
  color: string
}

export const STATUS_STYLES: Record<string, StatusStyle> = {
  borrador: {
    label: "Borrador",
    background: "#f3e8ff",
    color: "#7e22ce",
  },
  pendiente: {
    label: "Pendiente",
    background: "#fef3c7",
    color: "#b45309",
  },
  aprobada: {
    label: "Aceptada",
    background: "#dcfce7",
    color: "#15803d",
  },
  aprobado: {
    label: "Aceptada",
    background: "#dcfce7",
    color: "#15803d",
  },
  aceptada: {
    label: "Aceptada",
    background: "#dcfce7",
    color: "#15803d",
  },
  aceptado: {
    label: "Aceptada",
    background: "#dcfce7",
    color: "#15803d",
  },
  rechazada: {
    label: "Rechazada",
    background: "#ffe4e6",
    color: "#be123c",
  },
  rechazado: {
    label: "Rechazada",
    background: "#ffe4e6",
    color: "#be123c",
  },
  expirada: {
    label: "Expirada",
    background: "#ffedd5",
    color: "#c2410c",
  },
  expirado: {
    label: "Expirada",
    background: "#ffedd5",
    color: "#c2410c",
  },
}

export const DEFAULT_STATUS_STYLE: StatusStyle = {
  label: "Sin estado",
  background: "#e5e7eb",
  color: "#374151",
}

export const CARD_BACKGROUND = "var(--card, #ffffff)"
export const CARD_BORDER =
  "color-mix(in srgb, var(--border, #d1d5db) 55%, transparent)"
export const CARD_FOREGROUND = "var(--foreground, #0f172a)"
export const CARD_TEXT_MUTED = "var(--text-muted, #64748b)"
export const CARD_EMPTY_BG = "var(--background, #e5e5e5)"
export const CARD_ITEM_HOVER_BG = "var(--primary-soft, #eef2fa)"
export const CARD_ITEM_HOVER_BORDER = "var(--primary-light, #d1dcf5)"
export const CARD_CHEVRON = "var(--primary, #1b3d7a)"
export const CARD_SHADOW = "var(--shadow, 0 1px 2px rgba(15, 23, 42, 0.06))"

export const CARD_ICON_BG = "var(--primary, #1b3d7a)"
export const CARD_ICON_TEXT = "#ffffff"

export const CARD_RADIUS = "20px"
export const INNER_RADIUS = "14px"
export const CHIP_RADIUS = "9999px"

export const ROTATION_INTERVAL_MS = 5000
export const ITEMS_PER_VIEW = 2

export const MONTHS_ES: Record<string, number> = {
  ene: 0,
  enero: 0,
  feb: 1,
  febrero: 1,
  mar: 2,
  marzo: 2,
  abr: 3,
  abril: 3,
  may: 4,
  mayo: 4,
  jun: 5,
  junio: 5,
  jul: 6,
  julio: 6,
  ago: 7,
  agosto: 7,
  sep: 8,
  sept: 8,
  septiembre: 8,
  oct: 9,
  octubre: 9,
  nov: 10,
  noviembre: 10,
  dic: 11,
  diciembre: 11,
}
