"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import {
  CheckCircle2,
  Clock3,
  FileText,
  Send,
  TimerReset,
  XCircle,
} from "lucide-react"

import {
  cotizacionesEase,
  cotizacionesStatsCardVariants,
  cotizacionesStatsGridVariants,
} from "@/components/dashboard/cotizaciones/animations/cotizaciones.motion"
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
    <motion.div
      className="grid gap-3 sm:grid-cols-2"
      variants={cotizacionesStatsGridVariants}
      initial="hidden"
      animate="show"
    >
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
          <motion.div
            key={key}
            variants={cotizacionesStatsCardVariants}
            whileHover={{ y: -2 }}
            transition={{
              duration: 0.22,
              ease: cotizacionesEase,
            }}
            className={`relative min-h-[136px] overflow-hidden rounded-xl border p-4 shadow-sm ${card}`}
          >
            <span
              className={`absolute right-3 top-3 h-1.5 w-1.5 rounded-full ${dot}`}
            />

            <div className="flex items-center gap-2">
              <div
                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${icon_wrap}`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </div>

              <span
                className={`rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-widest ${badge}`}
              >
                {label}
              </span>
            </div>

            <div className="mt-3">
              <p className="text-[11px] leading-5 text-neutral-400">
                {description}
              </p>

              <p
                className={`mt-1 text-2xl font-semibold tabular-nums tracking-tight ${value}`}
              >
                {summary[key]}
              </p>
            </div>
          </motion.div>
        )
      )}
    </motion.div>
  )
}
