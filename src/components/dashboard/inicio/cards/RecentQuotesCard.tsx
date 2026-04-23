import type { Cotizacion } from "@/types/dashboard"
import { ArrowRight, FileClock } from "lucide-react"

type RecentQuoteItem = Cotizacion & {
  tiempoRelativo?: string
}

type RecentQuotesCardProps = {
  cotizaciones?: RecentQuoteItem[]
}

type StatusStyle = {
  label: string
  background: string
  color: string
}

const STATUS_STYLES: Record<Cotizacion["estado"], StatusStyle> = {
  borrador: {
    label: "Borrador",
    background: "#F3E8FF",
    color: "#7E22CE",
  },
  pendiente: {
    label: "Pendiente",
    background: "#FEF3C7",
    color: "#B45309",
  },
  aprobada: {
    label: "Aceptada",
    background: "#DCFCE7",
    color: "#15803D",
  },
  rechazada: {
    label: "Rechazada",
    background: "#FFE4E6",
    color: "#BE123C",
  },
  expirada: {
    label: "Expirada",
    background: "#FFEDD5",
    color: "#C2410C",
  },
}

const CARD_BACKGROUND = "var(--card, #FFFFFF)"
const CARD_BORDER = "var(--border, #E6EBF5)"
const CARD_FOREGROUND = "var(--foreground, #0F172A)"
const CARD_TEXT_MUTED = "var(--text-muted, #64748B)"
const CARD_TEXT_SOFT = "var(--text-muted, #94A3B8)"
const CARD_EMPTY_BG = "var(--background, #F8FAFC)"
const CARD_ITEM_HOVER_BG = "var(--primary-soft, #EEF4FF)"
const CARD_ITEM_HOVER_BORDER = "var(--primary-light, #CFE0FF)"
const CARD_CHEVRON = "var(--primary, #1B3D7A)"
const CARD_SHADOW = "var(--shadow, 0 1px 2px rgba(15, 23, 42, 0.06))"

const CARD_ICON_BG = "var(--primary, #1B3D7A)"
const CARD_ICON_TEXT = "#FFFFFF"

const CARD_RADIUS = "20px"
const INNER_RADIUS = "14px"
const CHIP_RADIUS = "9999px"

function formatQuoteNumber(numero: number | string) {
  return `COT-${String(numero).padStart(3, "0")}`
}

export default function RecentQuotesCard({
  cotizaciones = [],
}: RecentQuotesCardProps) {
  const items = cotizaciones.slice(0, 4)

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
      <div className="flex items-start gap-2">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center"
          style={{
            background: CARD_ICON_BG,
            borderRadius: "12px",
            boxShadow: "0 10px 18px rgba(27,61,122,0.14)",
          }}
        >
          <FileClock
            className="h-4 w-4"
            style={{ color: CARD_ICON_TEXT }}
          />
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
            Últimos movimientos
          </p>
        </div>
      </div>

      {items.length === 0 ? (
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
              Sin movimientos recientes
            </p>
            <p
              className="mt-0.5 text-[10px]"
              style={{ color: CARD_TEXT_MUTED }}
            >
              Aquí verás los últimos cambios.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex-1 space-y-2 overflow-hidden">
          {items.map((cotizacion) => {
            const status = STATUS_STYLES[cotizacion.estado]

            return (
              <div
                key={String(cotizacion.numero)}
                className="flex items-center justify-between px-3 py-2 transition-all duration-200"
                style={{
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: INNER_RADIUS,
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = `1px solid ${CARD_ITEM_HOVER_BORDER}`
                  e.currentTarget.style.background = CARD_ITEM_HOVER_BG
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = `1px solid ${CARD_BORDER}`
                  e.currentTarget.style.background = "transparent"
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
        </div>
      )}
    </article>
  )
}
