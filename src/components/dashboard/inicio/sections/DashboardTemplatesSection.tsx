"use client"

import { useMemo, useState, type ReactNode } from "react"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  PieChart as PieIcon,
  Send,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react"

import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  Tooltip,
} from "recharts"

import type { Cotizacion } from "@/types/dashboard"

type DashboardTemplatesSectionProps = {
  cotizaciones?: DashboardQuoteItem[]
}

type DashboardQuoteItem = Cotizacion & {
  createdAt?: string | Date | null
  created_at?: string | Date | null
  fechaCreacion?: string | Date | null
  fecha_creacion?: string | Date | null
  updatedAt?: string | Date | null
  updated_at?: string | Date | null
}

type QuoteStatusKey =
  | "borrador"
  | "pendiente"
  | "aprobada"
  | "rechazada"
  | "expirada"

type PeriodKey = "general" | "hoy" | "ayer" | "ultimos7" | "mes"

type QuoteStatusItem = {
  key: QuoteStatusKey
  label: string
  value: number
  percent: number
  color: string
  softColor: string
  icon: LucideIcon
}

type ChartItem = {
  name: string
  value: number
  color: string
}

const DASHBOARD_CARD_EASE: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
]

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: DASHBOARD_CARD_EASE,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
}

const softItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: DASHBOARD_CARD_EASE,
    },
  },
}

const statusListVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.07,
    },
  },
}

const statusItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 7,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: DASHBOARD_CARD_EASE,
    },
  },
}

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -4,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: DASHBOARD_CARD_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.16,
      ease: "easeOut",
    },
  },
}

const PERIOD_OPTIONS: Array<{
  key: PeriodKey
  label: string
  description: string
}> = [
  {
    key: "general",
    label: "General",
    description: "Todas las cotizaciones",
  },
  {
    key: "hoy",
    label: "Hoy",
    description: "Cotizaciones de hoy",
  },
  {
    key: "ayer",
    label: "Ayer",
    description: "Cotizaciones de ayer",
  },
  {
    key: "ultimos7",
    label: "Últimos 7 días",
    description: "Actividad reciente",
  },
  {
    key: "mes",
    label: "Este mes",
    description: "Cotizaciones del mes",
  },
]

const STATUS_ORDER: QuoteStatusKey[] = [
  "borrador",
  "pendiente",
  "aprobada",
  "rechazada",
  "expirada",
]

const STATUS_CONFIG: Record<
  QuoteStatusKey,
  {
    label: string
    color: string
    softColor: string
    icon: LucideIcon
  }
> = {
  borrador: {
    label: "Borradores",
    color: "#7c3aed",
    softColor: "rgba(124, 58, 237, 0.12)",
    icon: FileText,
  },
  pendiente: {
    label: "Pendientes",
    color: "#2f80ed",
    softColor: "rgba(47, 128, 237, 0.12)",
    icon: Send,
  },
  aprobada: {
    label: "Aceptadas",
    color: "#5ba83b",
    softColor: "rgba(91, 168, 59, 0.12)",
    icon: CheckCircle2,
  },
  rechazada: {
    label: "Rechazadas",
    color: "#ef4444",
    softColor: "rgba(239, 68, 68, 0.12)",
    icon: XCircle,
  },
  expirada: {
    label: "Expiradas",
    color: "#f59e0b",
    softColor: "rgba(245, 158, 11, 0.14)",
    icon: Clock3,
  },
}

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

function calculatePercent(value: number, total: number) {
  if (total <= 0) return 0
  return Math.round((value / total) * 100)
}

function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
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
      0
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
      0
    )

    return isValidDate(date) ? date : null
  }

  const latinNumericDateMatch = rawValue.match(
    /^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})(?:[\s,].*)?$/
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
      0
    )

    return isValidDate(date) ? date : null
  }

  const spanishTextDateMatch = rawValue.match(
    /^(\d{1,2})[\s./-]+([a-záéíóúñ]+)(?:[\s./-]+(\d{2,4}))?$/i
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

function getQuoteDate(cotizacion: DashboardQuoteItem) {
  return parseQuoteDate(
    cotizacion.createdAt ??
      cotizacion.created_at ??
      cotizacion.fechaCreacion ??
      cotizacion.fecha_creacion ??
      cotizacion.updatedAt ??
      cotizacion.updated_at ??
      cotizacion.fecha
  )
}

function normalizeQuoteStatus(status: unknown): QuoteStatusKey | null {
  const normalizedStatus = normalizeText(String(status ?? ""))

  if (normalizedStatus === "borrador") return "borrador"
  if (normalizedStatus === "pendiente") return "pendiente"

  if (
    normalizedStatus === "aprobada" ||
    normalizedStatus === "aprobado" ||
    normalizedStatus === "aceptada" ||
    normalizedStatus === "aceptado" ||
    normalizedStatus === "accepted"
  ) {
    return "aprobada"
  }

  if (
    normalizedStatus === "rechazada" ||
    normalizedStatus === "rechazado" ||
    normalizedStatus === "rejected"
  ) {
    return "rechazada"
  }

  if (
    normalizedStatus === "expirada" ||
    normalizedStatus === "expirado" ||
    normalizedStatus === "vencida" ||
    normalizedStatus === "vencido" ||
    normalizedStatus === "expired"
  ) {
    return "expirada"
  }

  return null
}

function startOfDay(date: Date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function endOfDay(date: Date) {
  const copy = new Date(date)
  copy.setHours(23, 59, 59, 999)
  return copy
}

function isSameDay(date: Date, reference: Date) {
  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth() &&
    date.getDate() === reference.getDate()
  )
}

function isInSelectedPeriod(cotizacion: DashboardQuoteItem, period: PeriodKey) {
  if (period === "general") return true

  const date = getQuoteDate(cotizacion)
  if (!date) return false

  const today = new Date()

  if (period === "hoy") {
    return isSameDay(date, today)
  }

  if (period === "ayer") {
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    return isSameDay(date, yesterday)
  }

  if (period === "ultimos7") {
    const start = startOfDay(today)
    start.setDate(today.getDate() - 6)

    const end = endOfDay(today)

    return date >= start && date <= end
  }

  if (period === "mes") {
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth()
    )
  }

  return true
}

export default function DashboardTemplatesSection({
  cotizaciones = [],
}: DashboardTemplatesSectionProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>("general")
  const [isPeriodMenuOpen, setIsPeriodMenuOpen] = useState(false)

  const activePeriod =
    PERIOD_OPTIONS.find((period) => period.key === selectedPeriod) ??
    PERIOD_OPTIONS[0]

  const filteredQuotes = useMemo(() => {
    return cotizaciones.filter((cotizacion) => {
      return isInSelectedPeriod(cotizacion, selectedPeriod)
    })
  }, [cotizaciones, selectedPeriod])

  const { totalQuotes, quoteStatusItems, chartData } = useMemo(() => {
    const counts: Record<QuoteStatusKey, number> = {
      borrador: 0,
      pendiente: 0,
      aprobada: 0,
      rechazada: 0,
      expirada: 0,
    }

    filteredQuotes.forEach((cotizacion) => {
      const status = normalizeQuoteStatus(cotizacion.estado)

      if (!status) return

      counts[status] += 1
    })

    const total = filteredQuotes.length

    const items: QuoteStatusItem[] = STATUS_ORDER.map((key) => {
      const config = STATUS_CONFIG[key]
      const value = counts[key]

      return {
        key,
        label: config.label,
        value,
        percent: calculatePercent(value, total),
        color: config.color,
        softColor: config.softColor,
        icon: config.icon,
      }
    })

    const chartItems: ChartItem[] =
      total > 0
        ? items
            .filter((item) => item.value > 0)
            .map((item) => ({
              name: item.label,
              value: item.value,
              color: item.color,
            }))
        : [
            {
              name: "Sin datos",
              value: 1,
              color: "#e5e7eb",
            },
          ]

    return {
      totalQuotes: total,
      quoteStatusItems: items,
      chartData: chartItems,
    }
  }, [filteredQuotes])

  const acceptedPercent =
    quoteStatusItems.find((item) => item.key === "aprobada")?.percent ?? 0

  const rejectedPercent =
    quoteStatusItems.find((item) => item.key === "rechazada")?.percent ?? 0

  const expiredPercent =
    quoteStatusItems.find((item) => item.key === "expirada")?.percent ?? 0

  return (
    <motion.section
      className="h-full w-full"
      variants={cardVariants}
      initial="hidden"
      animate="show"
      style={{
        willChange: "opacity, transform",
      }}
    >
      <motion.article
        className="flex h-full flex-col overflow-hidden rounded-3xl border"
        variants={softItemVariants}
        style={{
          backgroundColor: "var(--card, #ffffff)",
          borderColor:
            "color-mix(in srgb, var(--border, #d1d5db) 55%, transparent)",
          boxShadow: "0 12px 28px rgba(15, 23, 42, 0.065)",
        }}
      >
        <motion.div
          className="flex flex-col gap-3 border-b px-4 py-3 md:flex-row md:items-center md:justify-between"
          variants={softItemVariants}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: "var(--primary, #1b3d7a)",
                boxShadow: "0 10px 18px rgba(27, 61, 122, 0.16)",
              }}
            >
              <PieIcon className="h-5 w-5 text-white" strokeWidth={2.4} />
            </div>

            <div>
              <h2
                className="text-[17px] font-extrabold tracking-[-0.02em]"
                style={{ color: "var(--foreground, #0f172a)" }}
              >
                Estado de cotizaciones
              </h2>

              <p
                className="mt-0.5 text-[11px]"
                style={{ color: "var(--text-muted, #64748b)" }}
              >
                Resumen por estado de tus cotizaciones.
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsPeriodMenuOpen((value) => !value)}
              className="inline-flex w-fit items-center gap-2 rounded-2xl border px-3 py-1.5 text-[11px] font-semibold transition"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                borderColor:
                  "color-mix(in srgb, var(--border, #d1d5db) 60%, transparent)",
                color: "var(--foreground, #0f172a)",
                boxShadow: "0 6px 14px rgba(15, 23, 42, 0.04)",
              }}
            >
              <CalendarDays
                className="h-3.5 w-3.5"
                style={{ color: "var(--primary, #1b3d7a)" }}
              />
              {activePeriod.label}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            <AnimatePresence>
              {isPeriodMenuOpen ? (
                <motion.div
                  className="absolute right-0 z-30 mt-2 w-[180px] overflow-hidden rounded-2xl border p-1"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  style={{
                    backgroundColor: "var(--card, #ffffff)",
                    borderColor:
                      "color-mix(in srgb, var(--border, #d1d5db) 65%, transparent)",
                    boxShadow: "0 18px 38px rgba(15, 23, 42, 0.16)",
                  }}
                >
                  {PERIOD_OPTIONS.map((period) => {
                    const isActive = period.key === selectedPeriod

                    return (
                      <button
                        key={period.key}
                        type="button"
                        onClick={() => {
                          setSelectedPeriod(period.key)
                          setIsPeriodMenuOpen(false)
                        }}
                        className="w-full rounded-xl px-3 py-2 text-left transition"
                        style={{
                          backgroundColor: isActive
                            ? "var(--primary-soft, #eef2fa)"
                            : "transparent",
                        }}
                      >
                        <span
                          className="block text-[11px] font-bold"
                          style={{
                            color: isActive
                              ? "var(--primary, #1b3d7a)"
                              : "var(--foreground, #0f172a)",
                          }}
                        >
                          {period.label}
                        </span>

                        <span
                          className="block text-[9px]"
                          style={{ color: "var(--text-muted, #64748b)" }}
                        >
                          {period.description}
                        </span>
                      </button>
                    )
                  })}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="grid flex-1 gap-4 px-4 py-4 xl:grid-cols-[260px_minmax(0,1fr)]"
          variants={softItemVariants}
        >
          <motion.div
            className="grid gap-3 sm:grid-cols-[170px_minmax(0,1fr)] xl:block"
            variants={softItemVariants}
          >
            <div className="flex justify-center">
              <div className="relative h-[168px] w-[168px] min-h-[168px] min-w-[168px]">
                <RechartsPieChart width={168} height={168}>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={84}
                    paddingAngle={totalQuotes > 0 ? 2 : 0}
                    cornerRadius={totalQuotes > 0 ? 8 : 0}
                    stroke="var(--card, #ffffff)"
                    strokeWidth={2}
                    isAnimationActive
                    animationBegin={220}
                    animationDuration={950}
                  >
                    {chartData.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>

                  {totalQuotes > 0 ? <Tooltip cursor={false} /> : null}
                </RechartsPieChart>

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p
                      className="text-[9px] font-medium"
                      style={{ color: "var(--text-muted, #64748b)" }}
                    >
                      Total
                    </p>

                    <p
                      className="mt-0.5 text-[36px] font-extrabold leading-none tracking-[-0.04em]"
                      style={{ color: "var(--foreground, #0f172a)" }}
                    >
                      {totalQuotes}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="mt-0 flex items-center gap-3 rounded-2xl border px-3 py-2.5 xl:mt-3"
              variants={softItemVariants}
              style={{
                borderColor:
                  "color-mix(in srgb, var(--border, #d1d5db) 55%, transparent)",
              }}
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "var(--primary, #1b3d7a)" }}
              >
                <TrendingUp className="h-4 w-4 text-white" strokeWidth={2.4} />
              </div>

              <div className="min-w-0">
                <p
                  className="truncate text-[11px] font-bold"
                  style={{ color: "var(--foreground, #0f172a)" }}
                >
                  Actividad actual
                </p>

                <p
                  className="truncate text-[9px]"
                  style={{ color: "var(--text-muted, #64748b)" }}
                >
                  {activePeriod.description}.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid min-w-0 gap-2 md:grid-cols-2 xl:grid-cols-1"
            variants={statusListVariants}
          >
            {quoteStatusItems.map((item) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.key}
                  className="grid items-center gap-3 rounded-2xl border px-3 py-2 md:grid-cols-[38px_minmax(0,1fr)_68px]"
                  variants={statusItemVariants}
                  style={{
                    backgroundColor: "var(--card, #ffffff)",
                    borderColor:
                      "color-mix(in srgb, var(--border, #d1d5db) 55%, transparent)",
                  }}
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: item.softColor,
                      color: item.color,
                    }}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2.4} />
                  </div>

                  <div className="min-w-0">
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <p
                        className="text-[12px] font-bold"
                        style={{ color: "var(--foreground, #0f172a)" }}
                      >
                        {item.label}
                      </p>

                      <div className="flex items-center gap-2 md:hidden">
                        <span
                          className="text-[13px] font-extrabold"
                          style={{ color: item.color }}
                        >
                          {item.value}
                        </span>

                        <span
                          className="text-[11px] font-medium"
                          style={{ color: "var(--text-muted, #64748b)" }}
                        >
                          {item.percent}%
                        </span>
                      </div>
                    </div>

                    <div
                      className="h-1.5 overflow-hidden rounded-full"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--border, #d1d5db) 52%, transparent)",
                      }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percent}%` }}
                        transition={{
                          duration: 0.85,
                          ease: DASHBOARD_CARD_EASE,
                          delay: 0.2,
                        }}
                        style={{
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>

                  <div className="hidden items-center justify-end gap-3 md:flex">
                    <span
                      className="text-[16px] font-extrabold"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </span>

                    <span
                      className="w-8 text-right text-[12px] font-medium"
                      style={{ color: "var(--text-muted, #64748b)" }}
                    >
                      {item.percent}%
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-2 border-t px-4 py-3 md:grid-cols-4"
          variants={softItemVariants}
          style={{
            borderColor:
              "color-mix(in srgb, var(--border, #d1d5db) 55%, transparent)",
            backgroundColor:
              "color-mix(in srgb, var(--background, #e5e5e5) 36%, white)",
          }}
        >
          <CompactMetric
            icon={<BarChart3 className="h-3.5 w-3.5" />}
            label="Total"
            value={String(totalQuotes)}
          />

          <CompactMetric
            icon={<TrendingUp className="h-3.5 w-3.5" />}
            label="Aceptación"
            value={`${acceptedPercent}%`}
            tone="success"
          />

          <CompactMetric
            icon={<TrendingDown className="h-3.5 w-3.5" />}
            label="Rechazo"
            value={`${rejectedPercent}%`}
            tone="danger"
          />

          <CompactMetric
            icon={<Clock3 className="h-3.5 w-3.5" />}
            label="Expiración"
            value={`${expiredPercent}%`}
            tone="warning"
          />
        </motion.div>
      </motion.article>
    </motion.section>
  )
}

function CompactMetric({
  icon,
  label,
  value,
  tone = "primary",
}: {
  icon: ReactNode
  label: string
  value: string
  tone?: "primary" | "success" | "danger" | "warning"
}) {
  return (
    <div className="flex items-center gap-2.5">
      <MetricIcon tone={tone}>{icon}</MetricIcon>

      <div className="min-w-0">
        <p
          className="truncate text-[9px]"
          style={{ color: "var(--text-muted, #64748b)" }}
        >
          {label}
        </p>

        <p
          className="text-[17px] font-extrabold leading-none"
          style={{ color: "var(--foreground, #0f172a)" }}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

function MetricIcon({
  children,
  tone = "primary",
}: {
  children: ReactNode
  tone?: "primary" | "success" | "danger" | "warning"
}) {
  const styles = {
    primary: {
      background: "var(--primary-soft, #eef2fa)",
      color: "var(--primary, #1b3d7a)",
    },
    success: {
      background: "rgba(91, 168, 59, 0.12)",
      color: "#5ba83b",
    },
    danger: {
      background: "rgba(239, 68, 68, 0.12)",
      color: "#ef4444",
    },
    warning: {
      background: "rgba(245, 158, 11, 0.14)",
      color: "#f59e0b",
    },
  }[tone]

  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
      style={styles}
    >
      {children}
    </div>
  )
}
