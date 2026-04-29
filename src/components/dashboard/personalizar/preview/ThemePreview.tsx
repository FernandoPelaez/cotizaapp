"use client"

import { motion, type Variants } from "framer-motion"
import {
  Bell,
  CircleUserRound,
  LayoutDashboard,
  Plus,
  Sparkles,
} from "lucide-react"
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react"

import { useThemeContext } from "@/components/providers/ThemeProvider"
import {
  createThemeCssVariables,
  deriveThemeTokens,
} from "@/lib/theme/theme-derivation"

type ResolvedThemeMode = "light" | "dark"

function getSystemPreference(): ResolvedThemeMode {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function themeMix(color: string, amount: number, base = "transparent") {
  return `color-mix(in srgb, ${color} ${amount}%, ${base})`
}

const previewEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const previewSectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.82,
      ease: previewEase,
    },
  },
}

const previewFrameVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      delay: 0.14,
      ease: previewEase,
    },
  },
}

export default function ThemePreview() {
  const { draft } = useThemeContext()
  const [systemPreference, setSystemPreference] =
    useState<ResolvedThemeMode>(() => getSystemPreference())

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setSystemPreference(event.matches ? "dark" : "light")
    }

    handleChange(mediaQuery)

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }

    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  const preview = useMemo(() => {
    const tokens = deriveThemeTokens(draft, systemPreference)
    const variables = createThemeCssVariables(tokens)
    return { tokens, variables }
  }, [draft, systemPreference])

  const previewStyle = useMemo<CSSProperties>(
    () => ({
      ...(preview.variables as CSSProperties),
      fontFamily: "var(--font-family)",
      backgroundColor: "var(--background)",
      color: "var(--foreground)",
      borderColor: "color-mix(in srgb, var(--border) 42%, transparent)",
    }),
    [preview.variables]
  )

  const isDark = preview.tokens.mode === "dark"

  const softBorderColor = isDark
    ? "color-mix(in srgb, var(--border) 52%, transparent)"
    : "color-mix(in srgb, var(--border) 42%, transparent)"

  const subtleBorderColor = isDark
    ? "color-mix(in srgb, var(--border) 38%, transparent)"
    : "color-mix(in srgb, var(--border) 32%, transparent)"

  const cardShadow =
    draft.shadowStyle !== "none"
      ? isDark
        ? `0 12px 28px ${themeMix("var(--background)", 55)}`
        : `0 10px 24px ${themeMix("var(--foreground)", 6)}`
      : "none"

  const sectionShadow =
    draft.shadowStyle !== "none"
      ? isDark
        ? `0 18px 42px ${themeMix("var(--background)", 58)}`
        : `0 14px 35px ${themeMix("var(--foreground)", 6)}`
      : "none"

  const sidebarBg = isDark
    ? `linear-gradient(180deg, ${themeMix("var(--primary)", 20, "var(--card)")} 0%, var(--card) 100%)`
    : "linear-gradient(180deg, var(--primary) 0%, var(--primary-hover) 100%)"

  const heroBg =
    "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)"

  const planBg = isDark
    ? `linear-gradient(135deg, ${themeMix("var(--primary)", 20, "var(--card)")} 0%, var(--card) 100%)`
    : `linear-gradient(135deg, ${themeMix("var(--primary)", 12, "var(--card)")} 0%, ${themeMix("var(--primary)", 4, "var(--card)")} 100%)`

  const mainAreaBg = isDark
    ? `linear-gradient(180deg, ${themeMix("var(--card)", 12, "var(--background)")} 0%, var(--background) 100%)`
    : `linear-gradient(180deg, ${themeMix("var(--card)", 82, "var(--background)")} 0%, var(--background) 100%)`

  const sidebarDivider = isDark
    ? "color-mix(in srgb, var(--border) 42%, transparent)"
    : "color-mix(in srgb, var(--card) 18%, transparent)"

  const sidebarText = isDark ? "var(--foreground)" : "var(--card)"

  const sidebarMutedText = isDark
    ? "var(--text-muted)"
    : "color-mix(in srgb, var(--card) 72%, transparent)"

  const expiredBadgeStyle = {
    backgroundColor: isDark
      ? "color-mix(in srgb, var(--foreground) 10%, var(--card))"
      : "color-mix(in srgb, var(--foreground) 6%, var(--card))",
    color: "var(--foreground)",
  }

  const approvedBadgeStyle = {
    backgroundColor: "var(--primary-soft)",
    color: "var(--primary)",
  }

  const freeBadgeStyle = {
    backgroundColor: "var(--primary-soft)",
    color: "var(--primary)",
  }

  return (

    <motion.section
      className="rounded-3xl border p-5"
      variants={previewSectionVariants}
      style={{
        backgroundColor: "var(--card)",
        borderColor: "color-mix(in srgb, var(--border) 45%, transparent)",
        boxShadow: sectionShadow,
      }}
    >
      <div className="mb-4 space-y-1">
        <h2
          className="text-sm font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          Vista previa en vivo
        </h2>

        <p
          className="text-xs leading-5"
          style={{ color: "var(--text-muted)" }}
        >
          Aquí solo se muestran las zonas donde realmente se notará el tema.
        </p>
      </div>

      <motion.div
        className="overflow-hidden rounded-2xl border"
        variants={previewFrameVariants}
        style={{
          ...previewStyle,
          borderColor: softBorderColor,
          boxShadow: isDark
            ? `inset 0 1px 0 ${themeMix("var(--card)", 8)}`
            : `inset 0 1px 0 ${themeMix("var(--card)", 75)}`,
        }}
      >
        <div className="grid h-[420px] grid-cols-[72px_minmax(0,1fr)]">
          <aside
            className="flex flex-col border-r"
            style={{
              background: sidebarBg,
              borderColor: sidebarDivider,
            }}
          >
            <div
              className="border-b px-2 py-2.5"
              style={{ borderColor: sidebarDivider }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: isDark ? "var(--primary)" : "var(--card)",
                  }}
                />
                <span
                  className="truncate text-[10px] font-semibold"
                  style={{ color: sidebarText }}
                >
                  CotizaApp
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-1 px-1.5 py-2">
              {[
                { label: "Inicio", icon: LayoutDashboard, active: true },
                { label: "Perfil", icon: CircleUserRound, active: false },
                { label: "Tema", icon: Sparkles, active: false },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-1 rounded-lg px-1.5 py-1.5"
                    style={{
                      backgroundColor: item.active
                        ? isDark
                          ? "color-mix(in srgb, var(--primary) 20%, var(--card))"
                          : "color-mix(in srgb, var(--card) 18%, transparent)"
                        : "transparent",
                      border: item.active
                        ? `1px solid ${
                            isDark
                              ? "color-mix(in srgb, var(--primary) 34%, var(--border))"
                              : "color-mix(in srgb, var(--card) 22%, transparent)"
                          }`
                        : "1px solid transparent",
                      color: item.active ? sidebarText : sidebarMutedText,
                    }}
                  >
                    <Icon size={10} />
                    <span className="text-[8px]">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </aside>

          <div className="flex min-w-0 flex-col">
            <header
              className="flex items-center justify-between border-b px-2.5 py-2"
              style={{
                backgroundColor: "var(--background)",
                borderColor: softBorderColor,
              }}
            >
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold">
                  Panel de inicio
                </p>
                <p
                  className="truncate text-[9px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Vista previa enfocada
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <div
                  className="flex h-7 min-w-[82px] items-center gap-1 rounded-lg border px-2"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: subtleBorderColor,
                    color: "var(--text-muted)",
                  }}
                >
                  <Bell size={9} />
                  <span className="text-[8px]">Buscar...</span>
                </div>

                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full border"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: subtleBorderColor,
                    color: "var(--primary)",
                  }}
                >
                  <CircleUserRound size={10} />
                </div>
              </div>
            </header>

            <main
              className="flex min-h-0 flex-1 flex-col gap-2 p-2.5"
              style={{ background: mainAreaBg }}
            >
              <div
                className="relative overflow-hidden rounded-[var(--radius)] border p-2.5"
                style={{
                  background: heroBg,
                  borderColor: "color-mix(in srgb, var(--primary) 22%, var(--border))",
                  boxShadow: cardShadow,
                }}
              >
                <div className="max-w-[155px] space-y-1.5">
                  <p
                    className="text-[10px] font-semibold"
                    style={{
                      color: isDark ? "var(--foreground)" : "var(--card)",
                    }}
                  >
                    Elige una plantilla y obtén un PDF profesional.
                  </p>

                  <div
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-medium"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--card) 94%, transparent)",
                      color: "var(--primary)",
                    }}
                  >
                    <Plus size={9} />
                    Nueva cotización
                  </div>
                </div>

                <div
                  className="absolute right-2.5 top-2 h-12 w-8 rounded-md"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--card) 90%, var(--foreground))",
                    boxShadow: "0 8px 18px color-mix(in srgb, var(--background) 14%, transparent)",
                  }}
                />

                <div
                  className="absolute right-8 top-3.5 h-10 w-7 rotate-[-8deg] rounded-md"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--card) 72%, var(--foreground))",
                    boxShadow: "0 8px 18px color-mix(in srgb, var(--background) 12%, transparent)",
                  }}
                />
              </div>

              <div className="grid flex-1 grid-cols-2 gap-2">
                <div
                  className="rounded-[var(--radius)] border p-2.5"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: softBorderColor,
                    boxShadow: cardShadow,
                  }}
                >
                  <div className="mb-1.5 flex items-start justify-between gap-1">
                    <div>
                      <p
                        className="text-[9px] font-medium uppercase tracking-wide"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Cot-001
                      </p>
                      <p className="text-[11px] font-semibold">PRUEBAS</p>
                    </div>

                    <span
                      className="rounded-full px-1.5 py-0.5 text-[8px] font-medium"
                      style={expiredBadgeStyle}
                    >
                      Expirada
                    </span>
                  </div>

                  <p className="mb-2 text-[13px] font-semibold">$66,811.36</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <span
                        className="h-1.5 w-4 rounded-full"
                        style={{ backgroundColor: "var(--primary)" }}
                      />
                      <span
                        className="h-1.5 w-2 rounded-full"
                        style={{ backgroundColor: subtleBorderColor }}
                      />
                      <span
                        className="h-1.5 w-2 rounded-full"
                        style={{ backgroundColor: subtleBorderColor }}
                      />
                    </div>

                    <span
                      className="rounded-full px-2 py-0.5 text-[9px] font-medium"
                      style={{
                        backgroundColor: "var(--primary-soft)",
                        color: "var(--primary)",
                      }}
                    >
                      Ver detalle
                    </span>
                  </div>
                </div>

                <div
                  className="rounded-[var(--radius)] border p-2.5"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: softBorderColor,
                    boxShadow: cardShadow,
                  }}
                >
                  <p className="mb-1.5 text-[11px] font-semibold">
                    Acciones rápidas
                  </p>

                  <div className="space-y-1.5">
                    {["Nueva cotización", "Ver historial", "Explorar plantillas"].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-lg border px-2 py-1.5"
                        style={{
                          backgroundColor: "var(--background)",
                          borderColor: subtleBorderColor,
                        }}
                      >
                        <span className="text-[9px]">{item}</span>
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: "var(--primary)" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-[var(--radius)] border p-2.5"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: softBorderColor,
                    boxShadow: cardShadow,
                  }}
                >
                  <p className="mb-0.5 text-[11px] font-semibold">
                    Cotizaciones recientes
                  </p>
                  <p
                    className="mb-1.5 text-[9px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Últimos movimientos
                  </p>

                  <div className="space-y-1.5">
                    {[
                      { title: "COT-001", status: "Expirada", tone: "expired" },
                      { title: "COT-002", status: "Aprobada", tone: "approved" },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center justify-between rounded-lg border px-2 py-1.5"
                        style={{
                          backgroundColor: "var(--background)",
                          borderColor: subtleBorderColor,
                        }}
                      >
                        <p className="text-[9px] font-semibold">{item.title}</p>
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[8px] font-medium"
                          style={item.tone === "expired" ? expiredBadgeStyle : approvedBadgeStyle}
                        >
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-[var(--radius)] border p-2.5"
                  style={{
                    background: planBg,
                    borderColor: isDark
                      ? "color-mix(in srgb, var(--primary) 22%, var(--border))"
                      : "color-mix(in srgb, var(--primary) 16%, var(--border))",
                    boxShadow: cardShadow,
                  }}
                >
                  <span
                    className="inline-flex rounded-full px-1.5 py-0.5 text-[8px] font-semibold"
                    style={freeBadgeStyle}
                  >
                    PLAN FREE
                  </span>

                  <div className="mt-2 space-y-1" style={{ color: "var(--foreground)" }}>
                    <p className="text-[11px] font-semibold">
                      Estás en el plan gratuito
                    </p>
                    <p className="text-[9px]" style={{ color: "var(--text-muted)" }}>
                      Desbloquea plantillas y más.
                    </p>

                    <div className="pt-1">
                      <div
                        className="mb-1 flex items-center justify-between text-[8px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <span>Cotizaciones usadas</span>
                        <span>3 / 5</span>
                      </div>

                      <div
                        className="h-1.5 rounded-full"
                        style={{ backgroundColor: "var(--primary-soft)" }}
                      >
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: "60%", backgroundColor: "var(--primary)" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center justify-between rounded-[var(--radius)] border px-2.5 py-2"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: softBorderColor,
                  boxShadow: cardShadow,
                }}
              >
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold">Configuración actual</p>
                  <p
                    className="truncate text-[9px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {preview.tokens.mode === "dark" ? "Modo oscuro" : "Modo claro"}{" "}
                    • {draft.fontFamily} • {draft.densityStyle}
                  </p>
                </div>

                <span
                  className="rounded-full px-2 py-0.5 text-[9px] font-medium"
                  style={{
                    backgroundColor: "var(--primary-soft)",
                    color: "var(--primary)",
                  }}
                >
                  Preview
                </span>
              </div>
            </main>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
