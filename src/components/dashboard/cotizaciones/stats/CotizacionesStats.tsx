import type { LucideIcon } from "lucide-react"
import {
  CheckCircle2,
  Clock3,
  FileText,
  Send,
  TimerReset,
  XCircle,
} from "lucide-react"

import type { QuotesSummary } from "@/types/cotizacion"

type CotizacionesStatsProps = {
  summary: QuotesSummary
}

type StatKey = keyof QuotesSummary

type StatItem = {
  key: StatKey
  label: string
  description: string
  icon: LucideIcon
  card: string
  icon_wrap: string
  badge: string
  value: string
  dot: string
}

const stats: StatItem[] = [
  {
    key: "drafts",
    label: "Borradores",
    description: "En preparación",
    icon: FileText,
    card: "bg-violet-50 border-violet-200",
    icon_wrap: "bg-violet-100 text-violet-600",
    badge: "bg-violet-100 text-violet-700",
    value: "text-violet-900",
    dot: "bg-violet-400",
  },
  {
    key: "sent",
    label: "Enviadas",
    description: "Compartidas con el cliente",
    icon: Send,
    card: "bg-blue-50 border-blue-200",
    icon_wrap: "bg-blue-100 text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    value: "text-blue-900",
    dot: "bg-blue-400",
  },
  {
    key: "pending",
    label: "Pendientes",
    description: "Esperando respuesta",
    icon: Clock3,
    card: "bg-amber-50 border-amber-200",
    icon_wrap: "bg-amber-100 text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    value: "text-amber-900",
    dot: "bg-amber-400",
  },
  {
    key: "accepted",
    label: "Aceptadas",
    description: "Aprobadas por el cliente",
    icon: CheckCircle2,
    card: "bg-emerald-50 border-emerald-200",
    icon_wrap: "bg-emerald-100 text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    value: "text-emerald-900",
    dot: "bg-emerald-400",
  },
  {
    key: "rejected",
    label: "Rechazadas",
    description: "No aprobadas",
    icon: XCircle,
    card: "bg-red-50 border-red-200",
    icon_wrap: "bg-red-100 text-red-600",
    badge: "bg-red-100 text-red-700",
    value: "text-red-900",
    dot: "bg-red-400",
  },
  {
    key: "expired",
    label: "Expiradas",
    description: "Vencidas sin respuesta",
    icon: TimerReset,
    card: "bg-orange-50 border-orange-200",
    icon_wrap: "bg-orange-100 text-orange-600",
    badge: "bg-orange-100 text-orange-700",
    value: "text-orange-900",
    dot: "bg-orange-400",
  },
]

export default function CotizacionesStats({ summary }: CotizacionesStatsProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {stats.map(
        ({
          key,
          label,
          description,
          icon: Icon,
          card,
          icon_wrap,
          badge,
          value,
          dot,
        }) => (
          <div
            key={key}
            className={`group relative overflow-hidden rounded-lg border p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${card}`}
          >
            <span
              className={`absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full ${dot}`}
            />

            <div className="flex items-center gap-1.5">
              <div
                className={`inline-flex h-7 w-7 items-center justify-center rounded-md ${icon_wrap}`}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              </div>

              <span
                className={`rounded px-1.5 py-px text-[9px] font-semibold uppercase tracking-widest ${badge}`}
              >
                {label}
              </span>
            </div>

            <div className="mt-2">
              <p className="text-[10px] text-neutral-400">{description}</p>

              <p
                className={`mt-0.5 text-xl font-semibold tabular-nums tracking-tight ${value}`}
              >
                {summary[key]}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  )
}
