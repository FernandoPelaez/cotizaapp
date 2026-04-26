import { CheckCircle2, Clock3, Send, XCircle } from "lucide-react"

import type { QuoteEvent } from "@/types/cotizacion"
import {
  formatDateTime,
  formatRelativeDateTime,
  getEventTypeClasses,
  getEventTypeLabel,
} from "@/lib/cotizacion"

type RecentActivityCardProps = {
  events: QuoteEvent[]
}

function getEventIcon(type: QuoteEvent["type"]) {
  switch (type) {
    case "QUOTE_SENT":
      return <Send className="h-3.5 w-3.5" />
    case "QUOTE_ACCEPTED":
      return <CheckCircle2 className="h-3.5 w-3.5" />
    case "QUOTE_REJECTED":
      return <XCircle className="h-3.5 w-3.5" />
    case "QUOTE_EXPIRED":
      return <Clock3 className="h-3.5 w-3.5" />
    default:
      return <Clock3 className="h-3.5 w-3.5" />
  }
}

export default function RecentActivityCard({ events }: RecentActivityCardProps) {
  return (
    <section className="flex h-full w-full flex-col rounded-2xl border border-neutral-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3.5">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">
            Actividad reciente
          </h3>
          <p className="mt-0.5 text-xs text-neutral-400">
            Últimos movimientos registrados en tus cotizaciones.
          </p>
        </div>
        <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-500">
          {events.length} evento{events.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3">
        {events.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-center">
            <p className="text-sm text-neutral-400">
              Todavía no hay actividad reciente para mostrar.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 overflow-y-auto pr-1">
            {events.map((event) => {
              const eventClasses = getEventTypeClasses(event.type)
              const eventIcon = getEventIcon(event.type)

              return (
                <div
                  key={event.id}
                  className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/60 px-3 py-2.5 transition hover:bg-neutral-50"
                >
                  {/* Icono */}
                  <div
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${eventClasses}`}
                  >
                    {eventIcon}
                  </div>

                  {/* Contenido */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="truncate text-xs font-semibold text-neutral-900">
                        {event.title}
                      </p>
                      <span className={`rounded-full border px-1.5 py-px text-[10px] font-medium ${eventClasses}`}>
                        {getEventTypeLabel(event.type)}
                      </span>
                    </div>
                    {event.quote?.title && (
                      <p className="truncate text-[11px] text-neutral-400">
                        {event.quote.title}
                      </p>
                    )}
                  </div>

                  {/* Tiempo */}
                  <p
                    className="shrink-0 whitespace-nowrap text-[11px] text-neutral-400"
                    title={formatDateTime(event.createdAt)}
                  >
                    {formatRelativeDateTime(event.createdAt)}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}