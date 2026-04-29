"use client"

import Link from "next/link"
import type { UserConfig } from "@/types/dashboard"
import { Plus } from "lucide-react"

type DashboardHeroProps = {
  userConfig?: UserConfig
  onNuevaCotizacion?: () => void
  onExplorarPlantillas?: () => void
}

type TrialAwareUserConfig = UserConfig & {
  trialBlocked?: boolean
  quotesUsed?: number
  trialQuotesLimit?: number
}

const QUOTE_CREATE_HREF = "/cotizaciones/nueva"

const HERO_BG =
  "linear-gradient(135deg, var(--primary, #1b3d7a) 0%, var(--primary-hover, #2a5298) 100%)"

const HERO_BG_SOLID = "var(--primary, #1b3d7a)"
const HERO_BG_HOVER = "var(--primary-hover, #2a5298)"

const HERO_TEXT_SOFT = "var(--hero-text-soft, rgba(255,255,255,0.92))"
const HERO_GLOW_SOFT = "var(--hero-glow-soft, rgba(255,255,255,0.04))"
const HERO_GLOW_MEDIUM = "var(--hero-glow-medium, rgba(255,255,255,0.05))"

const HERO_CARD_BG = "var(--hero-card-bg, rgba(255,255,255,0.96))"
const HERO_CARD_BORDER = "var(--hero-card-border, rgba(255,255,255,0.22))"
const HERO_CARD_TEXT = "var(--primary, #1b3d7a)"
const HERO_CARD_MUTED = "var(--hero-card-muted, #64748b)"
const HERO_CARD_STRONG = "var(--hero-card-strong, #334155)"
const HERO_CARD_LINE = "var(--hero-card-line, #e2e8f0)"

const HERO_BUTTON_BG = "var(--hero-button-bg, #ffffff)"
const HERO_BUTTON_TEXT = "var(--hero-button-text, var(--primary, #1b3d7a))"

const HERO_BUTTON_SHADOW = "0 10px 24px rgba(15,37,84,0.22)"
const HERO_SHELL_SHADOW = "0 12px 40px rgba(15,37,84,0.28)"
const HERO_DOC_SHADOW = "0 8px 24px rgba(0,0,0,0.28)"
const HERO_DOC_SHADOW_LARGE = "0 16px 40px rgba(1,15,50,0.35)"

function isFreePlan(plan: unknown) {
  const normalizedPlan = String(plan ?? "free")
    .trim()
    .toLowerCase()

  return (
    normalizedPlan === "free" ||
    normalizedPlan === "gratis" ||
    normalizedPlan === "gratuito"
  )
}

export default function DashboardHero({
  userConfig,
  onNuevaCotizacion,
}: DashboardHeroProps) {
  const trialUserConfig = userConfig as TrialAwareUserConfig | undefined

  const plan = trialUserConfig?.plan ?? "free"
  const cotizacionesUsadas =
    trialUserConfig?.cotizacionesUsadas ?? trialUserConfig?.quotesUsed ?? 0
  const cotizacionesMax =
    trialUserConfig?.cotizacionesMax ?? trialUserConfig?.trialQuotesLimit ?? 5
  const trialBlocked = Boolean(trialUserConfig?.trialBlocked)

  const isQuoteCreationBlocked =
    isFreePlan(plan) &&
    (trialBlocked ||
      (cotizacionesMax > 0 && cotizacionesUsadas >= cotizacionesMax))

  return (
    <section
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: HERO_BG,
        boxShadow: HERO_SHELL_SHADOW,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.02) 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-1/2 h-[260px] w-[260px] -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: HERO_GLOW_SOFT }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute right-[20%] top-[-60%] h-[200px] w-[200px] rounded-full blur-3xl"
        style={{ background: HERO_GLOW_MEDIUM }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] bottom-[-40%] h-[180px] w-[180px] rounded-full blur-3xl"
        style={{ background: HERO_GLOW_SOFT }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[26%] top-[8%] rotate-[-14deg] opacity-[0.12]">
          <div
            className="w-[100px] rounded-lg p-2"
            style={{
              border: `1px solid ${HERO_CARD_BORDER}`,
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <div className="h-2 w-14 rounded-full bg-white" />
              <div className="h-1.5 w-6 rounded-full bg-white/60" />
            </div>

            <div className="mb-1 h-px w-full bg-white/40" />

            <div className="space-y-1">
              <div className="flex justify-between gap-1">
                <div className="h-1 w-12 rounded-full bg-white" />
                <div className="h-1 w-6 rounded-full bg-white/70" />
              </div>

              <div className="flex justify-between gap-1">
                <div className="h-1 w-10 rounded-full bg-white" />
                <div className="h-1 w-6 rounded-full bg-white/70" />
              </div>

              <div className="flex justify-between gap-1">
                <div className="h-1 w-8 rounded-full bg-white" />
                <div className="h-1 w-6 rounded-full bg-white/70" />
              </div>
            </div>

            <div className="mt-2 h-3 w-full rounded-md bg-white/80" />
          </div>
        </div>

        <div className="absolute left-[40%] bottom-[6%] rotate-[10deg] opacity-[0.10]">
          <div
            className="w-[80px] rounded-lg p-1.5"
            style={{
              border: `1px solid ${HERO_CARD_BORDER}`,
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div className="mb-1 h-1.5 w-10 rounded-full bg-white" />
            <div className="mb-1 h-px w-full bg-white/40" />

            <div className="space-y-0.5">
              <div className="h-1 w-full rounded-full bg-white" />
              <div className="h-1 w-4/5 rounded-full bg-white/80" />
              <div className="h-1 w-3/5 rounded-full bg-white/60" />
            </div>

            <div className="mt-1.5 h-2.5 w-full rounded-md bg-white/80" />
          </div>
        </div>

        <div className="absolute left-[55%] top-[12%] rotate-[6deg] opacity-[0.09]">
          <div
            className="w-[72px] rounded-lg p-1.5"
            style={{
              border: `1px solid ${HERO_CARD_BORDER}`,
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div className="mb-1 h-1.5 w-9 rounded-full bg-white" />
            <div className="mb-1 h-px w-full bg-white/40" />

            <div className="space-y-0.5">
              <div className="h-1 w-full rounded-full bg-white" />
              <div className="h-1 w-3/4 rounded-full bg-white/70" />
            </div>

            <div className="mt-1.5 h-2 w-full rounded-md bg-white/80" />
          </div>
        </div>

        <div className="absolute left-[67%] bottom-[10%] rotate-[-7deg] opacity-[0.08]">
          <div
            className="w-[60px] rounded-lg p-1.5"
            style={{
              border: `1px solid ${HERO_CARD_BORDER}`,
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div className="mb-1 h-1 w-8 rounded-full bg-white" />

            <div className="space-y-0.5">
              <div className="h-1 w-full rounded-full bg-white" />
              <div className="h-1 w-2/3 rounded-full bg-white/70" />
            </div>

            <div className="mt-1.5 h-2 w-full rounded-md bg-white/80" />
          </div>
        </div>

        <div className="absolute left-[25%] top-0 h-full w-px origin-top rotate-[20deg] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute left-[48%] top-0 h-full w-px origin-top rotate-[15deg] bg-gradient-to-b from-transparent via-white/8 to-transparent" />
        <div className="absolute left-[65%] top-0 h-full w-px origin-top rotate-[10deg] bg-gradient-to-b from-transparent via-white/6 to-transparent" />
      </div>

      <div className="relative flex items-center justify-between gap-4 px-6 py-5 md:px-8 md:py-6">
        <div className="max-w-[480px] flex-1">
          <p
            className="text-[13px] font-medium leading-snug"
            style={{ color: HERO_TEXT_SOFT }}
          >
            Elige una plantilla, agrega tus datos y obtén
            <br />
            un PDF profesional listo para enviar.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {isQuoteCreationBlocked ? (
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Ya alcanzaste el límite de cotizaciones de prueba"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full px-5 py-3 text-[15px] font-extrabold tracking-[-0.01em] opacity-65 transition"
                style={{
                  background: HERO_BUTTON_BG,
                  color: HERO_BUTTON_TEXT,
                  boxShadow: HERO_BUTTON_SHADOW,
                  border: "1px solid rgba(255,255,255,0.82)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <Plus className="h-4 w-4" strokeWidth={2.7} />
                Nueva cotización
              </button>
            ) : (
              <Link
                href={QUOTE_CREATE_HREF}
                onClick={() => {
                  onNuevaCotizacion?.()
                }}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-extrabold tracking-[-0.01em] transition hover:-translate-y-0.5 hover:brightness-[0.98]"
                style={{
                  background: HERO_BUTTON_BG,
                  color: HERO_BUTTON_TEXT,
                  boxShadow: HERO_BUTTON_SHADOW,
                  border: "1px solid rgba(255,255,255,0.82)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <Plus className="h-4 w-4" strokeWidth={2.7} />
                Nueva cotización
              </Link>
            )}
          </div>
        </div>

        <div className="relative ml-auto hidden h-[148px] w-[135px] shrink-0 lg:block">
          <div
            className="absolute left-[-20px] top-1/2 h-[118px] w-[80px] -translate-y-1/2 rotate-[-8deg] overflow-hidden rounded-xl p-1.5"
            style={{
              border: `1px solid ${HERO_CARD_BORDER}`,
              background: HERO_CARD_BG,
              boxShadow: HERO_DOC_SHADOW,
            }}
          >
            <div
              className="inline-block rounded px-1 py-0.5 text-[5.5px] font-bold text-white"
              style={{ background: HERO_BG_SOLID }}
            >
              TU LOGO
            </div>

            <p
              className="mt-1 text-[6.5px] font-bold leading-none tracking-tight"
              style={{ color: HERO_CARD_TEXT }}
            >
              COTIZA…
            </p>

            <div className="mt-1">
              <p
                className="text-[4.5px] font-bold"
                style={{ color: HERO_CARD_STRONG }}
              >
                Cliente:
              </p>

              <p
                className="text-[4.5px] leading-tight"
                style={{ color: HERO_CARD_MUTED }}
              >
                Nombre cliente
                <br />
                Ciudad 00000
              </p>
            </div>

            <div className="mt-1.5 space-y-0.5">
              <div
                className="h-0.5 rounded-full"
                style={{ background: HERO_CARD_LINE }}
              />

              <div
                className="h-0.5 w-3/4 rounded-full"
                style={{ background: HERO_CARD_LINE }}
              />

              <div
                className="h-0.5 rounded-full"
                style={{ background: HERO_CARD_LINE }}
              />
            </div>
          </div>

          <div
            className="absolute right-0 top-1/2 h-[138px] w-[100px] -translate-y-1/2 overflow-hidden rounded-xl p-1.5"
            style={{
              background: HERO_CARD_BG,
              boxShadow: HERO_DOC_SHADOW_LARGE,
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="rounded px-1 py-0.5 text-[5px] font-bold leading-none text-white"
                style={{ background: HERO_BG_SOLID }}
              >
                TU LOGO
              </div>

              <div className="text-right">
                <p
                  className="text-[5.5px] font-bold leading-none tracking-tight"
                  style={{ color: HERO_CARD_TEXT }}
                >
                  COTIZACIÓN
                </p>

                <p
                  className="mt-0.5 text-[4px] font-semibold"
                  style={{ color: "#94a3b8" }}
                >
                  COT-001
                </p>
              </div>
            </div>

            <div className="mt-1.5 text-[4.5px] leading-tight">
              <p style={{ color: HERO_CARD_STRONG, fontWeight: 700 }}>
                Cliente:
              </p>
              <p style={{ color: HERO_CARD_MUTED }}>Nombre del cliente</p>
              <p style={{ color: HERO_CARD_MUTED }}>Ciudad, CP 00000</p>
            </div>

            <div className="mt-1 text-[4.5px] leading-tight">
              <p>
                <span style={{ color: HERO_CARD_STRONG, fontWeight: 700 }}>
                  Fecha:{" "}
                </span>
                <span style={{ color: HERO_CARD_MUTED }}>17 Abril 2026</span>
              </p>

              <p>
                <span style={{ color: HERO_CARD_STRONG, fontWeight: 700 }}>
                  Vigencia:{" "}
                </span>
                <span style={{ color: HERO_CARD_MUTED }}>30 días</span>
              </p>
            </div>

            <div className="mt-1.5 overflow-hidden rounded">
              <div
                className="grid grid-cols-[1.3fr_0.6fr_0.7fr_0.7fr] gap-0.5 px-1 py-0.5 text-[4px] font-bold text-white"
                style={{ background: HERO_BG_SOLID }}
              >
                <span>Desc.</span>
                <span>Cant.</span>
                <span>Precio</span>
                <span>Total</span>
              </div>

              <div className="space-y-0.5 px-1 py-0.5">
                {[1, 2].map((row) => (
                  <div
                    key={row}
                    className="grid grid-cols-[1.3fr_0.6fr_0.7fr_0.7fr] items-center gap-0.5"
                  >
                    <div
                      className="h-0.5 w-4 rounded-full"
                      style={{ background: HERO_CARD_LINE }}
                    />
                    <div
                      className="h-0.5 w-2 rounded-full"
                      style={{ background: HERO_CARD_LINE }}
                    />
                    <div
                      className="h-0.5 w-2.5 rounded-full"
                      style={{ background: HERO_CARD_LINE }}
                    />
                    <div
                      className="h-0.5 w-2.5 rounded-full"
                      style={{ background: HERO_CARD_LINE }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-1 ml-auto w-[52px] space-y-0.5">
              <div className="flex items-center justify-between text-[4px]">
                <span style={{ color: "#475569", fontWeight: 600 }}>
                  Subtotal
                </span>
                <span style={{ color: "#0f172a", fontWeight: 700 }}>
                  $0.00
                </span>
              </div>

              <div className="flex items-center justify-between text-[4px]">
                <span style={{ color: "#475569", fontWeight: 600 }}>
                  IVA (16%)
                </span>
                <span style={{ color: "#0f172a", fontWeight: 700 }}>
                  $0.00
                </span>
              </div>

              <div
                className="mt-0.5 flex items-center justify-between rounded-sm px-1 py-0.5 text-[4px] font-bold text-white"
                style={{ background: HERO_BG_HOVER }}
              >
                <span>TOTAL</span>
                <span>$0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}