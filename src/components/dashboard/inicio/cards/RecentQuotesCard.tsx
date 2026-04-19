import type { Cotizacion } from "@/types/dashboard"
import { ArrowRight, FileClock } from "lucide-react"

type RecentQuoteItem = Cotizacion & {
  tiempoRelativo?: string
}

type RecentQuotesCardProps = {
  cotizaciones?: RecentQuoteItem[]
}

const STATUS_STYLES: Record<
  Cotizacion["estado"],
  { label: string; className: string }
> = {
  borrador: {
    label: "Borrador",
    className: "bg-violet-100 text-violet-700",
  },
  pendiente: {
    label: "Pendiente",
    className: "bg-amber-100 text-amber-700",
  },
  aprobada: {
    label: "Aceptada",
    className: "bg-emerald-100 text-emerald-700",
  },
  rechazada: {
    label: "Rechazada",
    className: "bg-rose-100 text-rose-700",
  },
  expirada: {
    label: "Expirada",
    className: "bg-orange-100 text-orange-700",
  },
}

function formatQuoteNumber(numero: number | string) {
  return `COT-${String(numero).padStart(3, "0")}`
}

export default function RecentQuotesCard({
  cotizaciones = [],
}: RecentQuotesCardProps) {
  const items = cotizaciones.slice(0, 4)

  return (
    <article className="flex h-[216px] w-full flex-col rounded-2xl border border-[#e6ebf5] bg-white p-4 shadow-sm">
      <div className="flex items-start gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff]">
          <FileClock className="h-4 w-4 text-[#1b3d7a]" />
        </div>

        <div className="min-w-0">
          <h3 className="text-[12px] font-bold leading-tight text-slate-900">
            Cotizaciones recientes
          </h3>
          <p className="mt-0.5 text-[10px] text-slate-500">
            Últimos movimientos
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="mt-3 flex flex-1 items-center">
          <div className="w-full rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center">
            <p className="text-[11px] font-semibold text-slate-700">
              Sin movimientos recientes
            </p>
            <p className="mt-0.5 text-[10px] text-slate-500">
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
                className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 transition hover:border-[#dbe4ff] hover:bg-[#f8faff]"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-wide text-slate-500">
                      {formatQuoteNumber(cotizacion.numero)}
                    </span>

                    <span
                      className={`inline-flex shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <p className="mt-0.5 truncate text-[11px] font-semibold leading-tight text-slate-900">
                    {cotizacion.nombre}
                  </p>

                  <p className="mt-0.5 truncate text-[9px] text-slate-500">
                    {cotizacion.tiempoRelativo ?? cotizacion.fecha}
                  </p>
                </div>

                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              </div>
            )
          })}
        </div>
      )}
    </article>
  )
}
