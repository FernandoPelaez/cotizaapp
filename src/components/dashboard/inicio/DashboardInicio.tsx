"use client"

import { useEffect, useMemo, useState } from "react"
import type { UserConfig, Cotizacion, Plantilla } from "@/types/dashboard"
import DashboardHero from "./sections/DashboardHero"
import DashboardTopGrid from "./sections/DashboardTopGrid"

type DashboardInicioProps = {
  userConfig?: UserConfig
  cotizaciones?: Cotizacion[]
  plantillasDisponibles?: Plantilla[]
}

type PlanApiResponse = {
  plan?: "free" | "pro" | "premium" | string
  quotesUsed?: number | null
  maxQuotes?: number | null
  trialQuotesLimit?: number | null
  trialBlocked?: boolean | null
  billingCycle?: "monthly" | null
  planStartedAt?: string | null
  planExpiresAt?: string | null
  renewsAt?: string | null
}

type DashboardUserConfigWithPlan = UserConfig & {
  quotesUsed?: number
  trialQuotesLimit?: number
  trialBlocked?: boolean
  billingCycle?: "monthly" | null
  planStartedAt?: string | null
  planExpiresAt?: string | null
  renewsAt?: string | null
}

type CotizacionRecord = Cotizacion & Record<string, unknown>

const COTIZACION_DATE_FIELDS = [
  "createdAt",
  "created_at",
  "fecha",
  "date",
  "updatedAt",
  "updated_at",
] as const

function normalizePlan(plan: unknown): UserConfig["plan"] {
  const normalizedPlan = String(plan ?? "free").trim().toLowerCase()

  if (normalizedPlan === "pro") return "pro"

  if (
    normalizedPlan === "premium" ||
    normalizedPlan === "empresa" ||
    normalizedPlan === "business"
  ) {
    return "premium"
  }

  return "free"
}

function padDatePart(value: number) {
  return String(value).padStart(2, "0")
}

function formatSafeLocalDate(date: Date) {
  const year = date.getFullYear()
  const month = padDatePart(date.getMonth() + 1)
  const day = padDatePart(date.getDate())

  return `${year}/${month}/${day}`
}

function formatSafeLocalDateTime(date: Date) {
  const year = date.getFullYear()
  const month = padDatePart(date.getMonth() + 1)
  const day = padDatePart(date.getDate())

  return `${year}-${month}-${day}T12:00:00`
}

function formatDisplayDate(date: Date) {
  const day = padDatePart(date.getDate())
  const month = padDatePart(date.getMonth() + 1)
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

function isValidDate(date: Date) {
  return !Number.isNaN(date.getTime())
}

function parseDateValue(value: unknown): Date | null {
  if (!value) return null

  if (value instanceof Date) {
    return isValidDate(value) ? value : null
  }

  if (typeof value === "number") {
    const date = new Date(value)
    return isValidDate(date) ? date : null
  }

  if (typeof value !== "string") return null

  const rawValue = value.trim()
  if (!rawValue) return null

  const isoDateOnlyMatch = rawValue.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)

  if (isoDateOnlyMatch) {
    const [, year, month, day] = isoDateOnlyMatch
    const date = new Date(Number(year), Number(month) - 1, Number(day), 12, 0, 0)

    return isValidDate(date) ? date : null
  }

  const latinDateMatch = rawValue.match(
    /^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})(?:\s+.*)?$/
  )

  if (latinDateMatch) {
    const [, day, month, yearValue] = latinDateMatch
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

  const fallbackDate = new Date(rawValue)
  return isValidDate(fallbackDate) ? fallbackDate : null
}

function getCotizacionDate(cotizacion: CotizacionRecord): Date | null {
  for (const field of COTIZACION_DATE_FIELDS) {
    const date = parseDateValue(cotizacion[field])

    if (date) return date
  }

  return null
}

function normalizeCotizacionesForDashboard(cotizaciones: Cotizacion[]) {
  return cotizaciones
    .map((cotizacion) => {
      const cotizacionRecord = cotizacion as CotizacionRecord
      const parsedDate = getCotizacionDate(cotizacionRecord)

      if (!parsedDate) return cotizacion

      const safeLocalDate = formatSafeLocalDate(parsedDate)
      const safeLocalDateTime = formatSafeLocalDateTime(parsedDate)
      const displayDate = formatDisplayDate(parsedDate)

      return {
        ...cotizacionRecord,
        fecha: safeLocalDate,
        date: safeLocalDate,
        createdAt: safeLocalDateTime,
        updatedAt: cotizacionRecord.updatedAt ?? safeLocalDateTime,
        fechaDisplay: cotizacionRecord.fechaDisplay ?? displayDate,
      } as Cotizacion
    })
    .sort((firstCotizacion, secondCotizacion) => {
      const firstDate = getCotizacionDate(firstCotizacion as CotizacionRecord)
      const secondDate = getCotizacionDate(secondCotizacion as CotizacionRecord)

      const firstTime = firstDate?.getTime() ?? 0
      const secondTime = secondDate?.getTime() ?? 0

      return secondTime - firstTime
    })
}

export default function DashboardInicio({
  userConfig,
  cotizaciones = [],
  plantillasDisponibles = [],
}: DashboardInicioProps) {
  void plantillasDisponibles

  const [planData, setPlanData] = useState<PlanApiResponse | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadCurrentPlan() {
      try {
        const response = await fetch("/api/user/plan", {
          method: "GET",
          cache: "no-store",
        })

        if (!response.ok) return

        const data = (await response.json()) as PlanApiResponse

        if (isMounted) {
          setPlanData(data)
        }
      } catch {
        if (isMounted) {
          setPlanData(null)
        }
      }
    }

    loadCurrentPlan()

    return () => {
      isMounted = false
    }
  }, [])

  const dashboardCotizaciones = useMemo(
    () => normalizeCotizacionesForDashboard(cotizaciones),
    [cotizaciones]
  )

  const resolvedUserConfig = useMemo<
    DashboardUserConfigWithPlan | undefined
  >(() => {
    if (!userConfig && !planData) return undefined

    const plan = normalizePlan(planData?.plan ?? userConfig?.plan)
    const quotesUsed =
      planData?.quotesUsed ?? userConfig?.cotizacionesUsadas ?? 0
    const trialQuotesLimit =
      planData?.trialQuotesLimit ?? userConfig?.cotizacionesMax ?? 5
    const maxQuotes =
      planData?.maxQuotes ?? trialQuotesLimit ?? userConfig?.cotizacionesMax ?? 5

    return {
      ...userConfig,
      plan,
      cotizacionesUsadas: quotesUsed,
      cotizacionesMax: maxQuotes,
      quotesUsed,
      trialQuotesLimit,
      trialBlocked: Boolean(planData?.trialBlocked),
      billingCycle: planData?.billingCycle ?? null,
      planStartedAt: planData?.planStartedAt ?? null,
      planExpiresAt: planData?.planExpiresAt ?? null,
      renewsAt: planData?.renewsAt ?? null,
    }
  }, [userConfig, planData])

  return (
    <section className="min-h-full">
      <div className="space-y-6">
        <DashboardHero userConfig={resolvedUserConfig} />

        <DashboardTopGrid
          userConfig={resolvedUserConfig}
          cotizaciones={dashboardCotizaciones}
        />
      </div>
    </section>
  )
}
