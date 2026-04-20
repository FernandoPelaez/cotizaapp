"use client"

import { Type } from "lucide-react"
import { useThemeContext } from "@/components/providers/ThemeProvider"
import { FONT_FAMILY_OPTIONS, FONT_FAMILY_STACKS } from "@/lib/theme/theme-presets"

export default function TypographySection() {
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
          <Type size={15} style={{ color: "hsl(var(--primary))" }} />
          <h2
            className="text-sm font-semibold"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Tipografía
          </h2>
        </div>

        <p
          className="text-xs"
          style={{ color: "hsl(var(--text-muted))" }}
        >
          Selecciona la fuente principal del dashboard para mantener una identidad
          visual consistente.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        {FONT_FAMILY_OPTIONS.map((option) => {
          const isActive = draft.fontFamily === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setDraft({ fontFamily: option.value })}
              disabled={isLoading || isSaving}
              className="rounded-xl border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: isActive
                  ? "hsl(var(--primary-soft))"
                  : "hsl(var(--background))",
                borderColor: isActive
                  ? "hsl(var(--primary))"
                  : "hsl(var(--border))",
              }}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
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
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: "hsl(var(--primary))",
                        color: "white",
                      }}
                    >
                      Activa
                    </span>
                  ) : null}
                </div>

                <div
                  className="rounded-lg border px-3 py-2"
                  style={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    fontFamily: FONT_FAMILY_STACKS[option.value],
                    color: "hsl(var(--foreground))",
                  }}
                >
                  <p className="text-sm font-semibold">
                    CotizaApp Dashboard
                  </p>
                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: "hsl(var(--text-muted))" }}
                  >
                    Vista previa de títulos, textos y lectura general.
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
