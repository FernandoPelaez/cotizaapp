"use client"

import { motion, type Variants } from "framer-motion"
import type { UserConfig } from "@/types/dashboard"
import { CheckCircle2, XCircle } from "lucide-react"

type PlanFreeCardProps = {
  userConfig?: UserConfig
  onUpgrade?: () => void
}

type FeatureItem = {
  ok: boolean
  label: string
}

type DashboardPlanType = "free" | "pro" | "premium"

type PlanAwareUserConfig = UserConfig & {
  billingCycle?: "monthly" | null
  planStartedAt?: string | null
  planExpiresAt?: string | null
  renewsAt?: string | null
}

const CARD_BG_START = "var(--primary-hover, #2a5298)"
const CARD_BG_END = "var(--primary, #1b3d7a)"
const CARD_BORDER = "rgba(255,255,255,0.10)"
const CARD_TEXT = "#ffffff"
const CARD_TEXT_SOFT = "rgba(255,255,255,0.82)"
const CARD_TEXT_FAINT = "rgba(255,255,255,0.35)"

const CARD_BADGE_BG = "var(--warning, #d97706)"
const CARD_PROGRESS_BG = "rgba(255,255,255,0.18)"
const CARD_PROGRESS_FILL = "var(--primary-light, #d1dcf5)"
const CARD_CHECK = "var(--primary-light, #d1dcf5)"

const CARD_CTA_BG = "#ffffff"
const CARD_CTA_BG_HOVER = "rgba(255,255,255,0.94)"
const CARD_CTA_TEXT = "var(--primary, #1b3d7a)"
const CARD_CTA_DISABLED_BG = "rgba(255,255,255,0.12)"
const CARD_CTA_DISABLED_TEXT = "rgba(255,255,255,0.92)"

const CARD_SHADOW = "0 12px 30px rgba(15,23,42,0.22)"
const CARD_SHADOW_HOVER = "0 18px 40px rgba(15,23,42,0.32)"
const CARD_RADIUS = "20px"
const INNER_RADIUS = "9999px"

const PLAN_CARD_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const planCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.995,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: PLAN_CARD_EASE,
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
}

const planItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: PLAN_CARD_EASE,
    },
  },
}

function getFeatures(plan: DashboardPlanType): FeatureItem[] {
  if (plan === "premium") {
    return [
      { ok: true, label: "Todo lo de Pro" },
      { ok: true, label: "Acceso a las 30 plantillas" },
      { ok: true, label: "Incluye Básica, Pro y Premium" },
      { ok: true, label: "Cotizaciones ilimitadas" },
      { ok: true, label: "PDF profesional" },
      { ok: true, label: "Envío por WhatsApp" },
    ]
  }

  if (plan === "pro") {
    return [
      { ok: true, label: "Acceso a 20 plantillas" },
      { ok: true, label: "Cotizaciones ilimitadas" },
      { ok: true, label: "PDF profesional" },
      { ok: true, label: "Historial completo" },
      { ok: true, label: "Envío por WhatsApp" },
      { ok: true, label: "Incluye categorías Básica y Pro" },
    ]
  }

  return [
    { ok: true, label: "Acceso a 10 plantillas básicas" },
    { ok: true, label: "5 cotizaciones de prueba" },
    { ok: true, label: "Vista previa" },
    { ok: true, label: "Descarga en PDF" },
    { ok: false, label: "Cotizaciones ilimitadas" },
    { ok: false, label: "Envío por WhatsApp" },
  ]
}

function getPlanBadge(plan: DashboardPlanType) {
  switch (plan) {
    case "premium":
      return "PLAN EMPRESA"
    case "pro":
      return "PLAN PRO"
    case "free":
    default:
      return "PLAN FREE"
  }
}

function getPlanTitle(plan: DashboardPlanType) {
  switch (plan) {
    case "premium":
      return "Estás en el plan Empresa"
    case "pro":
      return "Estás en el plan Pro"
    case "free":
    default:
      return "Estás en el plan gratuito"
  }
}

function getPlanDescription(
  plan: DashboardPlanType,
  cotizacionesRestantes: number,
  cotizacionesMax: number
) {
  switch (plan) {
    case "premium":
      return "Tienes acceso completo a toda la biblioteca y a las funciones más amplias del sistema."
    case "pro":
      return "Tienes más plantillas, historial completo y cotizaciones ilimitadas."
    case "free":
    default:
      return `Te quedan ${cotizacionesRestantes} de ${cotizacionesMax} cotizaciones de prueba disponibles.`
  }
}

function getButtonLabel(plan: DashboardPlanType) {
  switch (plan) {
    case "premium":
      return "Plan Empresa activo"
    case "pro":
      return "Plan Pro activo"
    case "free":
    default:
      return "Mejorar a Pro — $99 MXN/mes"
  }
}

function formatPlanDate(value?: string | null) {
  if (!value) return null

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

function getDaysRemaining(value?: string | null) {
  if (!value) return null

  const endDate = new Date(value)

  if (Number.isNaN(endDate.getTime())) return null

  const today = new Date()
  const diff = endDate.getTime() - today.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

  return Math.max(0, days)
}

export default function PlanFreeCard({
  userConfig,
  onUpgrade,
}: PlanFreeCardProps) {
  const planConfig = userConfig as PlanAwareUserConfig | undefined

  const plan = (planConfig?.plan ?? "free") as DashboardPlanType
  const isFree = plan === "free"
  const isPaidPlan = plan === "pro" || plan === "premium"

  const cotizacionesUsadas = planConfig?.cotizacionesUsadas ?? 0
  const cotizacionesMax = planConfig?.cotizacionesMax ?? 5
  const cotizacionesRestantes = Math.max(
    0,
    cotizacionesMax - cotizacionesUsadas
  )

  const planEndDate = planConfig?.renewsAt ?? planConfig?.planExpiresAt ?? null
  const formattedPlanEndDate = formatPlanDate(planEndDate)
  const daysRemaining = getDaysRemaining(planEndDate)

  const porcentajeUso =
    isFree && cotizacionesMax > 0
      ? Math.min(100, Math.round((cotizacionesUsadas / cotizacionesMax) * 100))
      : 100

  const features = getFeatures(plan)

  return (
    <motion.article
      className="flex h-full w-[270px] min-h-0 shrink-0 flex-col overflow-hidden px-4 pb-3.5 pt-4 text-white"
      variants={planCardVariants}
      initial="hidden"
      animate="show"
      whileHover={{
        y: -3,
        scale: 1.01,
        boxShadow: CARD_SHADOW_HOVER,
      }}
      transition={{
        duration: 0.34,
        ease: PLAN_CARD_EASE,
      }}
      style={{
        background: `linear-gradient(180deg, ${CARD_BG_START} 0%, ${CARD_BG_END} 100%)`,
        border: `1px solid ${CARD_BORDER}`,
        boxShadow: CARD_SHADOW,
        borderRadius: CARD_RADIUS,
        cursor: "default",
        willChange: "opacity, transform",
      }}
    >
      <motion.div
        className="inline-flex w-fit px-2.5 py-1 text-[9px] font-extrabold text-white"
        variants={planItemVariants}
        style={{
          background: CARD_BADGE_BG,
          borderRadius: "10px",
        }}
      >
        {getPlanBadge(plan)}
      </motion.div>

      <motion.h3
        className="mt-3 text-[20px] font-extrabold leading-tight"
        variants={planItemVariants}
        style={{ color: CARD_TEXT }}
      >
        {getPlanTitle(plan)}
      </motion.h3>

      <motion.p
        className="mt-1.5 text-[11px] leading-relaxed"
        variants={planItemVariants}
        style={{ color: CARD_TEXT_SOFT }}
      >
        {getPlanDescription(plan, cotizacionesRestantes, cotizacionesMax)}
      </motion.p>

      <motion.div className="mt-4" variants={planItemVariants}>
        <div className="flex items-center justify-between text-[10px]">
          <span style={{ color: CARD_TEXT_SOFT }}>
            {isFree ? "Cotizaciones usadas" : "Estado del plan"}
          </span>

          <span className="font-bold" style={{ color: CARD_TEXT }}>
            {isFree
              ? `${cotizacionesUsadas} / ${cotizacionesMax}`
              : plan === "premium"
                ? "Empresa"
                : "Pro"}
          </span>
        </div>

        <div
          className="mt-1.5 h-1.5 overflow-hidden"
          style={{
            background: CARD_PROGRESS_BG,
            borderRadius: INNER_RADIUS,
          }}
        >
          <motion.div
            className="h-full"
            initial={{ width: 0 }}
            animate={{ width: `${porcentajeUso}%` }}
            transition={{
              duration: 0.75,
              ease: PLAN_CARD_EASE,
              delay: 0.25,
            }}
            style={{
              background: CARD_PROGRESS_FILL,
              borderRadius: INNER_RADIUS,
            }}
          />
        </div>

        {isPaidPlan && formattedPlanEndDate && (
          <motion.div
            className="mt-2.5 rounded-xl px-2.5 py-2"
            variants={planItemVariants}
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <p
              className="text-[9px] font-bold uppercase tracking-wide"
              style={{ color: CARD_TEXT_SOFT }}
            >
              Renovación mensual
            </p>

            <p
              className="mt-0.5 text-[10.5px] font-extrabold leading-tight"
              style={{ color: CARD_TEXT }}
            >
              Termina el {formattedPlanEndDate}
            </p>

            {daysRemaining !== null && (
              <p
                className="mt-0.5 text-[9.5px]"
                style={{ color: CARD_TEXT_SOFT }}
              >
                {daysRemaining === 0
                  ? "Tu plan vence hoy."
                  : `Quedan ${daysRemaining} días de este periodo.`}
              </p>
            )}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="mt-4 flex-1 space-y-2 overflow-hidden"
        variants={planItemVariants}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.label}
            className="flex items-center gap-2"
            initial={{
              opacity: 0,
              x: -6,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.32,
              ease: PLAN_CARD_EASE,
              delay: 0.22 + index * 0.035,
            }}
          >
            {feature.ok ? (
              <CheckCircle2
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: CARD_CHECK }}
              />
            ) : (
              <XCircle
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: CARD_TEXT_FAINT }}
              />
            )}

            <span
              className="text-[10.5px] leading-tight"
              style={{
                color: feature.ok ? CARD_TEXT_SOFT : CARD_TEXT_FAINT,
              }}
            >
              {feature.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        type="button"
        onClick={isFree ? onUpgrade : undefined}
        disabled={isPaidPlan}
        className="mt-3 inline-flex w-full items-center justify-center gap-1 px-3 py-2 text-[13px] font-bold"
        variants={planItemVariants}
        whileHover={
          isFree
            ? {
                y: -1,
                backgroundColor: CARD_CTA_BG_HOVER,
              }
            : undefined
        }
        whileTap={isFree ? { scale: 0.985 } : undefined}
        transition={{
          duration: 0.22,
          ease: PLAN_CARD_EASE,
        }}
        style={{
          background: isPaidPlan ? CARD_CTA_DISABLED_BG : CARD_CTA_BG,
          color: isPaidPlan ? CARD_CTA_DISABLED_TEXT : CARD_CTA_TEXT,
          borderRadius: "11px",
          cursor: isPaidPlan ? "default" : "pointer",
          opacity: isPaidPlan ? 0.95 : 1,
        }}
      >
        {getButtonLabel(plan)}
      </motion.button>
    </motion.article>
  )
}
