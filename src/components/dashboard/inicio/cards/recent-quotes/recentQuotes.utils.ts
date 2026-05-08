import type { Cotizacion } from "@/types/dashboard"
import {
  DEFAULT_STATUS_STYLE,
  ITEMS_PER_VIEW,
  MONTHS_ES,
  STATUS_STYLES,
  type StatusStyle,
} from "./recentQuotes.constants"

export type RecentQuoteItem = Cotizacion & {
  tiempoRelativo?: string
  createdAt?: string | Date | null
  created_at?: string | Date | null
  fechaCreacion?: string | Date | null
  fecha_creacion?: string | Date | null
  updatedAt?: string | Date | null
  updated_at?: string | Date | null
}

export type QuoteGroup =
  | {
      type: "quotes"
      items: RecentQuoteItem[]
    }
  | {
      type: "empty"
      items: []
    }

export function formatQuoteNumber(
  numero: number | string | null | undefined,
  fallbackIndex: number,
) {
  const safeNumber = numero ?? fallbackIndex + 1
  const formattedNumber = String(safeNumber)

  if (formattedNumber.toUpperCase().startsWith("COT-")) {
    return formattedNumber
  }

  return `COT-${formattedNumber.padStart(3, "0")}`
}

function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

function normalizeStatus(value: unknown) {
  return normalizeText(String(value ?? ""))
}

export function getStatusStyle(value: unknown): StatusStyle {
  const statusKey = normalizeStatus(value)

  return STATUS_STYLES[statusKey] ?? DEFAULT_STATUS_STYLE
}

function isValidDate(date: Date) {
  return !Number.isNaN(date.getTime())
}

function parseQuoteDate(value: string | Date | null | undefined) {
  if (!value) return null

  if (value instanceof Date) {
    return isValidDate(value) ? value : null
  }

  const rawValue = String(value).trim()
  if (!rawValue) return null

  const isoDateOnlyMatch = rawValue.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)

  if (isoDateOnlyMatch) {
    const [, year, month, day] = isoDateOnlyMatch

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      12,
      0,
      0,
    )

    return isValidDate(date) ? date : null
  }

  const isoSlashDateMatch = rawValue.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/)

  if (isoSlashDateMatch) {
    const [, year, month, day] = isoSlashDateMatch

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      12,
      0,
      0,
    )

    return isValidDate(date) ? date : null
  }

  const latinNumericDateMatch = rawValue.match(
    /^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})(?:[\s,].*)?$/,
  )

  if (latinNumericDateMatch) {
    const [, day, month, yearValue] = latinNumericDateMatch
    const fullYear =
      yearValue.length === 2 ? Number(`20${yearValue}`) : Number(yearValue)

    const date = new Date(
      fullYear,
      Number(month) - 1,
      Number(day),
      12,
      0,
      0,
    )

    return isValidDate(date) ? date : null
  }

  const spanishTextDateMatch = rawValue.match(
    /^(\d{1,2})[\s./-]+([a-záéíóúñ]+)(?:[\s./-]+(\d{2,4}))?$/i,
  )

  if (spanishTextDateMatch) {
    const day = Number(spanishTextDateMatch[1])
    const monthKey = normalizeText(spanishTextDateMatch[2])
    const month = MONTHS_ES[monthKey]

    if (!Number.isNaN(day) && month !== undefined) {
      const currentYear = new Date().getFullYear()
      const parsedYear = spanishTextDateMatch[3]
        ? Number(spanishTextDateMatch[3])
        : currentYear
      const year = parsedYear < 100 ? 2000 + parsedYear : parsedYear

      const date = new Date(year, month, day, 12, 0, 0)

      return isValidDate(date) ? date : null
    }
  }

  const directDate = new Date(rawValue)

  return isValidDate(directDate) ? directDate : null
}

export function getQuoteDate(cotizacion: RecentQuoteItem) {
  return parseQuoteDate(
    cotizacion.createdAt ??
      cotizacion.created_at ??
      cotizacion.fechaCreacion ??
      cotizacion.fecha_creacion ??
      cotizacion.updatedAt ??
      cotizacion.updated_at ??
      cotizacion.fecha,
  )
}

export function isSameDay(date: Date, reference: Date) {
  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth() &&
    date.getDate() === reference.getDate()
  )
}

export function createQuoteGroups(items: RecentQuoteItem[]) {
  const groups: QuoteGroup[] = []

  for (let index = 0; index < items.length; index += ITEMS_PER_VIEW) {
    groups.push({
      type: "quotes",
      items: items.slice(index, index + ITEMS_PER_VIEW),
    })
  }

  if (items.length > ITEMS_PER_VIEW) {
    groups.push({
      type: "empty",
      items: [],
    })
  }

  return groups
}

export function getTodayQuotes(cotizaciones: RecentQuoteItem[]) {
  const today = new Date()

  return cotizaciones
    .filter((cotizacion) => {
      const date = getQuoteDate(cotizacion)

      return date ? isSameDay(date, today) : false
    })
    .sort((firstCotizacion, secondCotizacion) => {
      const firstDate = getQuoteDate(firstCotizacion)
      const secondDate = getQuoteDate(secondCotizacion)

      const firstTime = firstDate?.getTime() ?? 0
      const secondTime = secondDate?.getTime() ?? 0

      return secondTime - firstTime
    })
}
