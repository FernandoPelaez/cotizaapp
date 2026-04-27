"use client"

import { useEffect, useMemo, useState } from "react"
import type { Cotizacion } from "@/types/dashboard"
import { ArrowRight, FileClock } from "lucide-react"

type RecentQuoteItem = Cotizacion & {
  tiempoRelativo?: string
  createdAt?: string | Date | null
  created_at?: string | Date | null
  fechaCreacion?: string | Date | null
  fecha_creacion?: string | Date | null
}

type RecentQuotesCardProps = {
  cotizaciones?: RecentQuoteItem[]
}

type StatusStyle = {
  label: string
  background: string
  color: string
}

type QuoteGroup =
  | {
      type: "quotes"
      items: RecentQuoteItem[]
    }
  | {
      type: "empty"
      items: []
    }

const STATUS_STYLES: Record<Cotizacion["estado"], StatusStyle> = {
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
  rechazada: {
    label: "Rechazada",
    background: "#ffe4e6",
    color: "#be123c",
  },
  expirada: {
    label: "Expirada",
    background: "#ffedd5",
    color: "#c2410c",
  },
}

const CARD_BACKGROUND = "var(--card, #ffffff)"
const CARD_BORDER =
  "color-mix(in srgb, var(--border, #d1d5db) 55%, transparent)"
const CARD_FOREGROUND = "var(--foreground, #0f172a)"
const CARD_TEXT_MUTED = "var(--text-muted, #64748b)"
const CARD_EMPTY_BG = "var(--background, #e5e5e5)"
const CARD_ITEM_HOVER_BG = "var(--primary-soft, #eef2fa)"
const CARD_ITEM_HOVER_BORDER = "var(--primary-light, #d1dcf5)"
const CARD_CHEVRON = "var(--primary, #1b3d7a)"
const CARD_SHADOW = "var(--shadow, 0 1px 2px rgba(15, 23, 42, 0.06))"

const CARD_ICON_BG = "var(--primary, #1b3d7a)"
const CARD_ICON_TEXT = "#ffffff"

const CARD_RADIUS = "20px"
const INNER_RADIUS = "14px"
const CHIP_RADIUS = "9999px"
const ROTATION_INTERVAL_MS = 5000
const ITEMS_PER_VIEW = 2

const MONTHS_ES: Record<string, number> = {
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

function formatQuoteNumber(numero: number | string) {
  return `COT-${String(numero).padStart(3, "0")}`
}

function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

function parseQuoteDate(value: string | Date | null | undefined) {
  if (!value) return null

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  const rawValue = String(value).trim()
  if (!rawValue) return null

  const directDate = new Date(rawValue)
  if (!Number.isNaN(directDate.getTime())) {
    return directDate
  }

  const match = rawValue.match(
    /^(\d{1,2})[\s./-]+([a-záéíóúñ]+)(?:[\s./-]+(\d{2,4}))?$/i
  )

  if (!match) return null

  const day = Number(match[1])
  const monthKey = normalizeText(match[2])
  const month = MONTHS_ES[monthKey]

  if (Number.isNaN(day) || month === undefined) return null

  const currentYear = new Date().getFullYear()
  const parsedYear = match[3] ? Number(match[3]) : currentYear
  const year = parsedYear < 100 ? 2000 + parsedYear : parsedYear

  const date = new Date(year, month, day)

  return Number.isNaN(date.getTime()) ? null : date
}

function getQuoteDate(cotizacion: RecentQuoteItem) {
  return parseQuoteDate(
    cotizacion.createdAt ??
      cotizacion.created_at ??
      cotizacion.fechaCreacion ??
      cotizacion.fecha_creacion ??
      cotizacion.fecha
  )
}

function isSameDay(date: Date, reference: Date) {
  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth() &&
    date.getDate() === reference.getDate()
  )
}

function createQuoteGroups(items: RecentQuoteItem[]) {
  const groups: QuoteGroup[] = []

  for (let index = 0; index < items.length; index += ITEMS_PER_VIEW) {
    groups.push({
      type: "quotes",
      items: items.slice(index, index + ITEMS_PER_VIEW),
    })
  }

  if (items.length > 0 && items.length <= ITEMS_PER_VIEW) {
    groups.push({
      type: "empty",
      items: [],
    })
  }

  return groups
}

export default function RecentQuotesCard({
  cotizaciones = [],
}: RecentQuotesCardProps) {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0)

  const todayQuotes = useMemo(() => {
    const today = new Date()

    return cotizaciones.filter((cotizacion) => {
      const date = getQuoteDate(cotizacion)
      return date ? isSameDay(date, today) : false
    })
  }, [cotizaciones])

  const quoteGroups = useMemo(() => {
    return createQuoteGroups(todayQuotes)
  }, [todayQuotes])

  const activeGroup = quoteGroups[activeGroupIndex] ?? quoteGroups[0]

  useEffect(() => {
    setActiveGroupIndex(0)
  }, [quoteGroups.length])

  useEffect(() => {
    if (quoteGroups.length <= 1) return

    const interval = window.setInterval(() => {
      setActiveGroupIndex((currentIndex) => {
        return (currentIndex + 1) % quoteGroups.length
      })
    }, ROTATION_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [quoteGroups.length])

  return (
    <article
      className="flex h-[184px] w-full flex-col p-4"
      style={{
        background: CARD_BACKGROUND,
        border: `1px solid ${CARD_BORDER}`,
        boxShadow: CARD_SHADOW,
        borderRadius: CARD_RADIUS,
      }}
    >
      <div className="flex items-start gap-2">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center"
          style={{
            background: CARD_ICON_BG,
            borderRadius: "12px",
            boxShadow: "0 10px 18px rgba(27,61,122,0.14)",
          }}
        >
          <FileClock className="h-4 w-4" style={{ color: CARD_ICON_TEXT }} />
        </div>

        <div className="min-w-0">
          <h3
            className="text-[12px] font-bold leading-tight"
            style={{ color: CARD_FOREGROUND }}
          >
            Cotizaciones recientes
          </h3>

          <p
            className="mt-0.5 text-[10px]"
            style={{ color: CARD_TEXT_MUTED }}
          >
            Movimientos de hoy
          </p>
        </div>
      </div>

      {todayQuotes.length === 0 ? (
        <div className="mt-3 flex flex-1 items-center">
          <div
            className="w-full px-3 py-3 text-center"
            style={{
              background: CARD_EMPTY_BG,
              border: `1px dashed ${CARD_BORDER}`,
              borderRadius: INNER_RADIUS,
            }}
          >
            <p
              className="text-[11px] font-semibold"
              style={{ color: CARD_FOREGROUND }}
            >
              Sin cotizaciones de hoy
            </p>

            <p
              className="mt-0.5 text-[10px]"
              style={{ color: CARD_TEXT_MUTED }}
            >
              Aquí aparecerán las creadas durante el día.
            </p>
          </div>
        </div>
      ) : activeGroup?.type === "empty" ? (
        <div className="mt-3 flex flex-1 items-center">
          <div
            className="w-full px-3 py-4 text-center"
            style={{
              background: CARD_EMPTY_BG,
              border: `1px dashed ${CARD_BORDER}`,
              borderRadius: INNER_RADIUS,
            }}
          >
            <p
              className="text-[11px] font-semibold"
              style={{ color: CARD_FOREGROUND }}
            >
              No hay más cotizaciones por mostrar
            </p>

            <p
              className="mt-0.5 text-[10px]"
              style={{ color: CARD_TEXT_MUTED }}
            >
              Enseguida vuelven a mostrarse las recientes.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex flex-1 flex-col justify-center space-y-2 overflow-hidden">
          {activeGroup?.items.map((cotizacion) => {
            const status = STATUS_STYLES[cotizacion.estado]

            return (
              <div
                key={String(cotizacion.numero)}
                className="flex items-center justify-between px-3 py-1.5 transition-all duration-200"
                style={{
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: INNER_RADIUS,
                  background: "transparent",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.border = `1px solid ${CARD_ITEM_HOVER_BORDER}`
                  event.currentTarget.style.background = CARD_ITEM_HOVER_BG
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.border = `1px solid ${CARD_BORDER}`
                  event.currentTarget.style.background = "transparent"
                }}
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className="shrink-0 text-[9px] font-extrabold uppercase tracking-wide"
                      style={{ color: CARD_TEXT_MUTED }}
                    >
                      {formatQuoteNumber(cotizacion.numero)}
                    </span>

                    <span
                      className="inline-flex shrink-0 px-1.5 py-0.5 text-[8px] font-semibold"
                      style={{
                        background: status.background,
                        color: status.color,
                        borderRadius: CHIP_RADIUS,
                      }}
                    >
                      {status.label}
                    </span>
                  </div>

                  <p
                    className="mt-0.5 truncate text-[11px] font-semibold leading-tight"
                    style={{ color: CARD_FOREGROUND }}
                  >
                    {cotizacion.nombre}
                  </p>

                  <p
                    className="mt-0.5 truncate text-[9px]"
                    style={{ color: CARD_TEXT_MUTED }}
                  >
                    {cotizacion.tiempoRelativo ?? cotizacion.fecha}
                  </p>
                </div>

                <ArrowRight
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: CARD_CHEVRON }}
                />
              </div>
            )
          })}

          {quoteGroups.length > 1 ? (
            <div className="flex justify-center gap-1 pt-1">
              {quoteGroups.map((_, index) => (
                <span
                  key={index}
                  className="h-1.5 rounded-full transition-all duration-200"
                  style={{
                    width: index === activeGroupIndex ? "14px" : "6px",
                    background:
                      index === activeGroupIndex
                        ? "var(--primary, #1b3d7a)"
                        : "color-mix(in srgb, var(--border, #d1d5db) 75%, transparent)",
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </article>
  )
}