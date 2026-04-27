"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { Cotizacion } from "@/types/dashboard"
import { ArrowRight, FileText } from "lucide-react"

type QuoteSummaryCardProps = {
  cotizaciones?: Cotizacion[]
  onVerDetalle?: (cotizacion: Cotizacion) => void
  onVerTodo?: () => void
}

type StatusStyle = {
  label: string
  background: string
  color: string
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

const CHANGE_EVERY_MS = 10000
const FADE_DURATION_MS = 220
const CARD_BACKGROUND = "var(--card, #ffffff)"
const CARD_BORDER = "color-mix(in srgb, var(--border, #d1d5db) 55%, transparent)"
const CARD_FOREGROUND = "var(--foreground, #0f172a)"
const CARD_TEXT_MUTED = "var(--text-muted, #64748b)"
const CARD_TEXT_SOFT =
  "color-mix(in srgb, var(--text-muted, #64748b) 78%, transparent)"
const CARD_EMPTY_BG = "var(--background, #e5e5e5)"
const CARD_ACTIVE_DOT = "var(--primary, #1b3d7a)"
const CARD_INACTIVE_DOT = "var(--border, #d1d5db)"
const CARD_SHADOW = "var(--shadow, 0 1px 2px rgba(15, 23, 42, 0.06))"

const CARD_ICON_BG = "var(--primary, #1b3d7a)"
const CARD_ICON_TEXT = "#ffffff"

const CARD_ACTION_BG = "var(--primary, #1b3d7a)"
const CARD_ACTION_BG_HOVER = "var(--primary-hover, #2a5298)"
const CARD_ACTION_TEXT = "#ffffff"
const CARD_ACTION_BORDER =
  "color-mix(in srgb, var(--primary, #1b3d7a) 18%, transparent)"

const CARD_RADIUS = "20px"
const INNER_RADIUS = "14px"
const CHIP_RADIUS = "9999px"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export default function QuoteSummaryCard({
  cotizaciones = [],
  onVerDetalle,
  onVerTodo,
}: QuoteSummaryCardProps) {
  const items = useMemo(() => cotizaciones.filter(Boolean), [cotizaciones])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const transitionTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setCurrentIndex(0)
    setIsVisible(true)
  }, [items.length])

  useEffect(() => {
    if (items.length <= 1) return

    const interval = window.setInterval(() => {
      setIsVisible(false)

      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
      }

      transitionTimeoutRef.current = window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length)
        setIsVisible(true)
      }, FADE_DURATION_MS)
    }, CHANGE_EVERY_MS)

    return () => {
      window.clearInterval(interval)

      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [items.length])

  const cotizacion = items[currentIndex]

  if (!cotizacion) {
    return (
      <article
        className="flex h-[216px] w-full flex-col p-4"
        style={{
          background: CARD_BACKGROUND,
          border: `1px solid ${CARD_BORDER}`,
          boxShadow: CARD_SHADOW,
          borderRadius: CARD_RADIUS,
        }}
      >
        <div className="flex items-center justify-between">
          <div
            className="flex h-9 w-9 items-center justify-center"
            style={{
              background: CARD_ICON_BG,
              borderRadius: "12px",
              boxShadow: "0 10px 18px rgba(27,61,122,0.14)",
            }}
          >
            <FileText className="h-4 w-4" style={{ color: CARD_ICON_TEXT }} />
          </div>

          <button
            type="button"
            onClick={onVerTodo}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-semibold transition"
            style={{
              background: CARD_ACTION_BG,
              color: CARD_ACTION_TEXT,
              borderRadius: "11px",
              border: `1px solid ${CARD_ACTION_BORDER}`,
              boxShadow: "0 6px 14px rgba(27,61,122,0.16)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = CARD_ACTION_BG_HOVER
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = CARD_ACTION_BG
            }}
          >
            Ver todo
          </button>
        </div>

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
              No hay cotizaciones aún
            </p>

            <p
              className="mt-0.5 text-[10px]"
              style={{ color: CARD_TEXT_MUTED }}
            >
              Cuando crees una, aquí aparecerá la más reciente.
            </p>
          </div>
        </div>
      </article>
    )
  }

  const status = STATUS_STYLES[cotizacion.estado]
  const animationClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-2 opacity-0"

  return (
    <article
      className="flex h-[216px] w-full flex-col p-4"
      style={{
        background: CARD_BACKGROUND,
        border: `1px solid ${CARD_BORDER}`,
        boxShadow: CARD_SHADOW,
        borderRadius: CARD_RADIUS,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className={`flex h-9 w-9 items-center justify-center transition-all duration-300 ease-out [transition-delay:0ms] ${animationClass}`}
          style={{
            background: CARD_ICON_BG,
            borderRadius: "12px",
            boxShadow: "0 10px 18px rgba(27,61,122,0.14)",
          }}
        >
          <FileText className="h-4 w-4" style={{ color: CARD_ICON_TEXT }} />
        </div>

        <button
          type="button"
          onClick={onVerTodo}
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-semibold transition-all duration-300 ease-out [transition-delay:20ms] ${animationClass}`}
          style={{
            background: CARD_ACTION_BG,
            color: CARD_ACTION_TEXT,
            borderRadius: "11px",
            border: `1px solid ${CARD_ACTION_BORDER}`,
            boxShadow: "0 6px 14px rgba(27,61,122,0.16)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = CARD_ACTION_BG_HOVER
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = CARD_ACTION_BG
          }}
        >
          Ver todo
        </button>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <div
          className={`flex items-center justify-between text-[10px] transition-all duration-300 ease-out [transition-delay:40ms] ${animationClass}`}
          style={{ color: CARD_TEXT_SOFT }}
        >
          <span className="font-medium uppercase">
            COT-{String(cotizacion.numero).padStart(3, "0")}
          </span>
          <span className="font-medium">{cotizacion.fecha}</span>
        </div>

        <h3
          className={`mt-1 line-clamp-2 text-[12px] font-bold leading-tight transition-all duration-300 ease-out [transition-delay:80ms] ${animationClass}`}
          style={{ color: CARD_FOREGROUND }}
        >
          {cotizacion.nombre}
        </h3>

        <p
          className={`mt-1 line-clamp-2 text-[10px] leading-relaxed transition-all duration-300 ease-out [transition-delay:120ms] ${animationClass}`}
          style={{ color: CARD_TEXT_MUTED }}
        >
          {cotizacion.descripcion ?? "Sin descripción"}
        </p>

        <div
          className={`mt-3 flex items-end justify-between gap-2 transition-all duration-300 ease-out [transition-delay:160ms] ${animationClass}`}
        >
          <p
            className="text-[12px] font-extrabold tracking-tight"
            style={{ color: CARD_FOREGROUND }}
          >
            {formatCurrency(cotizacion.monto)}
          </p>

          <span
            className="inline-flex shrink-0 px-2 py-0.5 text-[9px] font-semibold"
            style={{
              background: status.background,
              color: status.color,
              borderRadius: CHIP_RADIUS,
            }}
          >
            {status.label}
          </span>
        </div>

        <div
          className={`mt-auto flex items-center justify-between pt-3 transition-all duration-300 ease-out [transition-delay:200ms] ${animationClass}`}
        >
          <div className="flex items-center gap-1">
            {items.map((_, index) => (
              <span
                key={index}
                className="transition-all duration-300"
                style={{
                  height: "6px",
                  width: index === currentIndex ? "16px" : "10px",
                  borderRadius: CHIP_RADIUS,
                  background:
                    index === currentIndex
                      ? CARD_ACTIVE_DOT
                      : CARD_INACTIVE_DOT,
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => onVerDetalle?.(cotizacion)}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-semibold transition"
            style={{
              background: CARD_ACTION_BG,
              color: CARD_ACTION_TEXT,
              borderRadius: "11px",
              border: `1px solid ${CARD_ACTION_BORDER}`,
              boxShadow: "0 6px 14px rgba(27,61,122,0.16)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = CARD_ACTION_BG_HOVER
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = CARD_ACTION_BG
            }}
          >
            Ver detalle
            <ArrowRight className="h-2.5 w-2.5" />
          </button>
        </div>
      </div>
    </article>
  )
}
