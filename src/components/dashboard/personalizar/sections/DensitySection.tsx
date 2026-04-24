"use client"

import { Rows3 } from "lucide-react"
import { useThemeContext } from "@/components/providers/ThemeProvider"
import { DENSITY_STYLE_OPTIONS } from "@/lib/theme/theme-presets"

const densityPreviewMap = {
  compact: {
    sectionGap: "6px",
    cardPadding: "8px",
    inputHeight: "22px",
    btnWidth: "52px",
    btnHeight: "20px",
  },
  comfortable: {
    sectionGap: "9px",
    cardPadding: "10px",
    inputHeight: "26px",
    btnWidth: "64px",
    btnHeight: "22px",
  },
  spacious: {
    sectionGap: "12px",
    cardPadding: "12px",
    inputHeight: "30px",
    btnWidth: "76px",
    btnHeight: "26px",
  },
} as const

export default function DensitySection() {
  const { draft, setDraft, isLoading, isSaving } = useThemeContext()

  return (
    <section
      className="rounded-3xl border p-5"
      style={{
        backgroundColor: "hsl(var(--card))",
        borderColor: "hsl(var(--border) / 0.45)",
        boxShadow: "0 14px 35px rgba(15, 23, 42, 0.06)",
      }}
    >
      <div className="mb-4 space-y-1">
        <div className="flex items-center gap-2">
          <Rows3 size={15} style={{ color: "hsl(var(--primary))" }} />

          <h2
            className="text-sm font-semibold"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Densidad visual
          </h2>
        </div>

        <p
          className="text-xs leading-5"
          style={{ color: "hsl(var(--text-muted))" }}
        >
          Controla cuánto espacio visual tienen los bloques, tarjetas,
          formularios y listas dentro del dashboard.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {DENSITY_STYLE_OPTIONS.map((option) => {
          const isActive = draft.densityStyle === option.value
          const preview =
            densityPreviewMap[
              option.value as keyof typeof densityPreviewMap
            ]

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setDraft({ densityStyle: option.value })}
              disabled={isLoading || isSaving}
              className="rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: isActive
                  ? "linear-gradient(180deg, hsl(var(--primary-soft)) 0%, hsl(var(--card)) 100%)"
                  : "hsl(var(--background))",
                borderColor: isActive
                  ? "hsl(var(--primary) / 0.65)"
                  : "hsl(var(--border) / 0.42)",

                boxShadow: isActive
                  ? "0 10px 24px rgba(45, 107, 255, 0.11)"
                  : "0 8px 20px rgba(15, 23, 42, 0.035)",
              }}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {option.label}
                  </p>

                  {option.description ? (
                    <p
                      className="mt-1 text-xs leading-5"
                      style={{ color: "hsl(var(--text-muted))" }}
                    >
                      {option.description}
                    </p>
                  ) : null}
                </div>

                {isActive ? (
                  <span
                    className="shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                    style={{
                      backgroundColor: "hsl(var(--primary-soft))",
                      borderColor: "hsl(var(--primary) / 0.45)",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    Activa
                  </span>
                ) : null}
              </div>

              <div
                className="rounded-2xl border"
                style={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border) / 0.38)",

                  padding: preview.cardPadding,
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.42)",
                }}
              >
                <div
                  className="flex flex-col"
                  style={{ gap: preview.sectionGap }}
                >
                  <div className="space-y-1.5">
                    <div
                      className="rounded-full"
                      style={{
                        height: "7px",
                        width: "55%",
                        backgroundColor: "hsl(var(--foreground))",
                        opacity: 0.13,
                      }}
                    />

                    <div
                      className="rounded-full"
                      style={{
                        height: "5px",
                        width: "34%",
                        backgroundColor: "hsl(var(--foreground))",
                        opacity: 0.075,
                      }}
                    />
                  </div>

                  <div
                    className="rounded-xl border"
                    style={{
                      height: preview.inputHeight,
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border) / 0.35)",
                    }}
                  />

                  <div
                    className="rounded-xl border"
                    style={{
                      height: preview.inputHeight,
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border) / 0.35)",
                    }}
                  />

                  <div className="flex justify-start">
                    <div
                      className="rounded-lg"
                      style={{
                        height: preview.btnHeight,
                        width: preview.btnWidth,
                        backgroundColor: "hsl(var(--primary))",
                        boxShadow: "0 8px 18px rgba(45, 107, 255, 0.18)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}