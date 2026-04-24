import type { UserConfig } from "@/types/dashboard"
import { CheckCircle2, XCircle } from "lucide-react"
import { useEffect, useRef } from "react"

type PlanFreeCardProps = {
  userConfig?: UserConfig
  onUpgrade?: () => void
}

type FeatureItem = {
  ok: boolean
  label: string
}

type DashboardPlanType = "free" | "pro" | "premium"

const CARD_BG_START = "hsl(var(--primary-hover, 214 57% 38%))"
const CARD_BG_END = "hsl(var(--primary, 216 64% 29%))"
const CARD_BORDER = "rgba(255,255,255,0.10)"
const CARD_TEXT = "#FFFFFF"
const CARD_TEXT_SOFT = "rgba(255,255,255,0.82)"
const CARD_TEXT_FAINT = "rgba(255,255,255,0.35)"
const CARD_BADGE_BG = "hsl(var(--warning, 38 92% 50%))"
const CARD_PROGRESS_BG = "rgba(255,255,255,0.18)"
const CARD_PROGRESS_FILL = "hsl(var(--primary-light, 214 91% 75%))"
const CARD_CHECK = "hsl(var(--primary-light, 214 91% 75%))"
const CARD_CTA_BG = "#FFFFFF"
const CARD_CTA_BG_HOVER = "rgba(255,255,255,0.94)"
const CARD_CTA_TEXT = "hsl(var(--primary, 216 64% 29%))"
const CARD_CTA_DISABLED_BG = "rgba(255,255,255,0.12)"
const CARD_CTA_DISABLED_TEXT = "rgba(255,255,255,0.92)"
const CARD_SHADOW = "0 12px 30px rgba(15,23,42,0.22)"
const CARD_SHADOW_HOVER = "0 22px 48px rgba(15,23,42,0.38)"
const CARD_RADIUS = "20px"
const INNER_RADIUS = "9999px"

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

export default function PlanFreeCard({
  userConfig,
  onUpgrade,
}: PlanFreeCardProps) {
  const plan = (userConfig?.plan ?? "free") as DashboardPlanType
  const isFree = plan === "free"
  const isPaidPlan = plan === "pro" || plan === "premium"

  const cotizacionesUsadas = userConfig?.cotizacionesUsadas ?? 0
  const cotizacionesMax = userConfig?.cotizacionesMax ?? 5
  const cotizacionesRestantes = Math.max(0, cotizacionesMax - cotizacionesUsadas)

  const porcentajeUso =
    isFree && cotizacionesMax > 0
      ? Math.min(100, Math.round((cotizacionesUsadas / cotizacionesMax) * 100))
      : 100

  const features = getFeatures(plan)

  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    card.style.opacity = "0"
    card.style.transform = "translateY(16px)"
    card.style.transition = "opacity 0.45s ease, transform 0.45s ease"

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      })
    })

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <article
      ref={cardRef}
      className="w-[270px] min-h-[420px] shrink-0 px-4 pb-4 pt-4 text-white"
      style={{
        background: `linear-gradient(180deg, ${CARD_BG_START} 0%, ${CARD_BG_END} 100%)`,
        border: `1px solid ${CARD_BORDER}`,
        boxShadow: CARD_SHADOW,
        borderRadius: CARD_RADIUS,
        transition:
          "opacity 0.45s ease, transform 0.45s ease, box-shadow 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.03)"
        e.currentTarget.style.boxShadow = CARD_SHADOW_HOVER
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)"
        e.currentTarget.style.boxShadow = CARD_SHADOW
      }}
    >
      <div
        className="inline-flex px-2.5 py-1 text-[10px] font-extrabold text-white"
        style={{
          background: CARD_BADGE_BG,
          borderRadius: "10px",
        }}
      >
        {getPlanBadge(plan)}
      </div>

      <h3
        className="mt-3 text-[20px] font-extrabold leading-tight"
        style={{ color: CARD_TEXT }}
      >
        {getPlanTitle(plan)}
      </h3>

      <p
        className="mt-2 text-[12px] leading-relaxed"
        style={{ color: CARD_TEXT_SOFT }}
      >
        {getPlanDescription(plan, cotizacionesRestantes, cotizacionesMax)}
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px]">
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
          className="mt-2 h-2 overflow-hidden"
          style={{
            background: CARD_PROGRESS_BG,
            borderRadius: INNER_RADIUS,
          }}
        >
          <div
            className="h-full"
            style={{
              width: `${porcentajeUso}%`,
              background: CARD_PROGRESS_FILL,
              borderRadius: INNER_RADIUS,
            }}
          />
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {features.map((feature) => (
          <div key={feature.label} className="flex items-center gap-2">
            {feature.ok ? (
              <CheckCircle2
                className="h-4 w-4 shrink-0"
                style={{ color: CARD_CHECK }}
              />
            ) : (
              <XCircle
                className="h-4 w-4 shrink-0"
                style={{ color: CARD_TEXT_FAINT }}
              />
            )}

            <span
              className="text-[11px] leading-tight"
              style={{
                color: feature.ok ? CARD_TEXT_SOFT : CARD_TEXT_FAINT,
              }}
            >
              {feature.label}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={isFree ? onUpgrade : undefined}
        disabled={isPaidPlan}
        className="mt-5 inline-flex w-full items-center justify-center gap-1 px-2 py-1.5 text-[10px] font-bold transition"
        style={{
          background: isPaidPlan ? CARD_CTA_DISABLED_BG : CARD_CTA_BG,
          color: isPaidPlan ? CARD_CTA_DISABLED_TEXT : CARD_CTA_TEXT,
          borderRadius: "14px",
          cursor: isPaidPlan ? "default" : "pointer",
          opacity: isPaidPlan ? 0.95 : 1,
        }}
        onMouseEnter={(e) => {
          if (isFree) {
            e.currentTarget.style.background = CARD_CTA_BG_HOVER
          }
        }}
        onMouseLeave={(e) => {
          if (isFree) {
            e.currentTarget.style.background = CARD_CTA_BG
          }
        }}
      >
        {getButtonLabel(plan)}
      </button>
    </article>
  )
}
