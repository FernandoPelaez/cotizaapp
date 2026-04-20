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
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: "hsl(var(--card))",
        borderColor: "hsl(var(--border))",
        boxShadow: "var(--shadow)",
      }}
    >
      <div className="mb-3 space-y-0.5">
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
          className="text-xs"
          style={{ color: "hsl(var(--text-muted))" }}
        >
          Controla cuánto espacio visual tienen los bloques, tarjetas,
          formularios y listas dentro del dashboard.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
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
              className="rounded-xl border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: isActive
                  ? "linear-gradient(180deg, hsl(var(--primary-soft)) 0%, hsl(var(--card)) 100%)"
                  : "hsl(var(--background))",
                borderColor: isActive
                  ? "hsl(var(--primary))"
                  : "hsl(var(--border))",
                boxShadow: isActive
                  ? "0 0 0 1px hsl(var(--primary-soft))"
                  : "none",
              }}
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {option.label}
                  </p>
                  {option.description ? (
                    <p
                      className="mt-0.5 text-xs leading-4"
                      style={{ color: "hsl(var(--text-muted))" }}
                    >
                      {option.description}
                    </p>
                  ) : null}
                </div>

                {isActive ? (
                  <span
                    className="rounded-full border px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor: "hsl(var(--primary-soft))",
                      borderColor: "hsl(var(--primary))",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    Activa
                  </span>
                ) : null}
              </div>

              <div
                className="rounded-lg border"
                style={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  padding: preview.cardPadding,
                }}
              >
                <div
                  className="flex flex-col"
                  style={{ gap: preview.sectionGap }}
                >
                  <div className="space-y-1">
                    <div
                      className="rounded-full"
                      style={{
                        height: "7px",
                        width: "55%",
                        backgroundColor: "hsl(var(--foreground))",
                        opacity: 0.14,
                      }}
                    />
                    <div
                      className="rounded-full"
                      style={{
                        height: "5px",
                        width: "34%",
                        backgroundColor: "hsl(var(--foreground))",
                        opacity: 0.08,
                      }}
                    />
                  </div>

                  <div
                    className="rounded-lg border"
                    style={{
                      height: preview.inputHeight,
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                    }}
                  />

                  <div
                    className="rounded-lg border"
                    style={{
                      height: preview.inputHeight,
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                    }}
                  />

                  <div className="flex justify-start">
                    <div
                      className="rounded-md"
                      style={{
                        height: preview.btnHeight,
                        width: preview.btnWidth,
                        backgroundColor: "hsl(var(--primary))",
                        boxShadow:
                          "0 6px 14px color-mix(in srgb, hsl(var(--primary)) 24%, transparent)",
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
