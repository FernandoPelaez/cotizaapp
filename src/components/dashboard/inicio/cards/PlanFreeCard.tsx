import type { UserConfig } from "@/types/dashboard"
import { CheckCircle2, Star, XCircle } from "lucide-react"
import { useEffect, useRef } from "react"

type PlanFreeCardProps = {
  userConfig?: UserConfig
  onUpgrade?: () => void
}

type FeatureItem = {
  ok: boolean
  label: string
}

const CARD_BG_START = "var(--primary-hover, #062A7A)"
const CARD_BG_END = "var(--primary, #03256C)"
const CARD_BORDER = "rgba(255,255,255,0.10)"
const CARD_TEXT = "#FFFFFF"
const CARD_TEXT_SOFT = "rgba(255,255,255,0.82)"
const CARD_TEXT_FAINT = "rgba(255,255,255,0.35)"
const CARD_BADGE_BG = "var(--warning, #FF9800)"
const CARD_PROGRESS_BG = "rgba(255,255,255,0.18)"
const CARD_PROGRESS_FILL = "var(--primary-light, #60A5FA)"
const CARD_CHECK = "var(--primary-light, #7DD3FC)"
const CARD_CTA_BG = "#FFFFFF"
const CARD_CTA_BG_HOVER = "rgba(255,255,255,0.94)"
const CARD_CTA_TEXT = "var(--primary, #1447FF)"
const CARD_CTA_DISABLED_BG = "rgba(255,255,255,0.12)"
const CARD_CTA_DISABLED_TEXT = "rgba(255,255,255,0.92)"
const CARD_SHADOW = "0 12px 30px rgba(15,23,42,0.22)"
const CARD_RADIUS = "20px"
const INNER_RADIUS = "9999px"

function getFeatures(isPro: boolean): FeatureItem[] {
  if (isPro) {
    return [
      { ok: true, label: "Todas las plantillas disponibles" },
      { ok: true, label: "Cotizaciones ilimitadas" },
      { ok: true, label: "Exportación a PDF" },
      { ok: true, label: "Logo y datos de empresa" },
      { ok: true, label: "10+ plantillas Pro" },
      { ok: true, label: "Prioridad en nuevas funciones" },
    ]
  }

  return [
    { ok: true, label: "5 plantillas (2 disponibles)" },
    { ok: true, label: "10 cotizaciones / mes" },
    { ok: true, label: "Exportación a PDF" },
    { ok: false, label: "Cotizaciones ilimitadas" },
    { ok: false, label: "Logo y datos de empresa" },
    { ok: false, label: "10+ plantillas Pro" },
  ]
}

export default function PlanFreeCard({
  userConfig,
  onUpgrade,
}: PlanFreeCardProps) {
  const plan = userConfig?.plan ?? "free"
  const isPro = plan === "pro"

  const cotizacionesUsadas = userConfig?.cotizacionesUsadas ?? 0
  const cotizacionesMax = userConfig?.cotizacionesMax ?? 5

  const porcentajeUso =
    cotizacionesMax > 0
      ? Math.min(100, Math.round((cotizacionesUsadas / cotizacionesMax) * 100))
      : 0

  const features = getFeatures(isPro)

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
      }}
    >
      <div
        className="inline-flex px-2.5 py-1 text-[10px] font-extrabold text-white"
        style={{
          background: CARD_BADGE_BG,
          borderRadius: "10px",
        }}
      >
        {isPro ? "PLAN PRO" : "PLAN FREE"}
      </div>

      <h3
        className="mt-3 text-[20px] font-extrabold leading-tight"
        style={{ color: CARD_TEXT }}
      >
        {isPro ? "Estás en el plan Pro" : "Estás en el plan gratuito"}
      </h3>

      <p
        className="mt-2 text-[12px] leading-relaxed"
        style={{ color: CARD_TEXT_SOFT }}
      >
        {isPro
          ? "Tienes acceso completo a funciones, plantillas y mejores límites."
          : "Desbloquea plantillas, cotizaciones ilimitadas y más."}
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px]">
          <span style={{ color: CARD_TEXT_SOFT }}>Cotizaciones usadas</span>
          <span className="font-bold" style={{ color: CARD_TEXT }}>
            {cotizacionesUsadas} / {cotizacionesMax}
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
        onClick={isPro ? undefined : onUpgrade}
        disabled={isPro}
        className="mt-5 inline-flex w-full items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-bold transition"
        style={{
          background: isPro ? CARD_CTA_DISABLED_BG : CARD_CTA_BG,
          color: isPro ? CARD_CTA_DISABLED_TEXT : CARD_CTA_TEXT,
          borderRadius: "14px",
          cursor: isPro ? "default" : "pointer",
          opacity: isPro ? 0.95 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isPro) {
            e.currentTarget.style.background = CARD_CTA_BG_HOVER
          }
        }}
        onMouseLeave={(e) => {
          if (!isPro) {
            e.currentTarget.style.background = CARD_CTA_BG
          }
        }}
      >
        <Star className="h-3.5 w-3.5 shrink-0" />
        {isPro ? "Plan Pro activo" : "Mejorar a Pro — $199 MXN/mes"}
      </button>
    </article>
  )
}
