"use client"

import { Type } from "lucide-react"
import { useThemeContext } from "@/components/providers/ThemeProvider"
import {
  FONT_FAMILY_OPTIONS,
  FONT_FAMILY_STACKS,
} from "@/lib/theme/theme-presets"

export default function TypographySection() {
  const { draft, setDraft, isLoading, isSaving } = useThemeContext()

  return (
    <section
      className="rounded-3xl border p-5"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "color-mix(in srgb, var(--border) 45%, transparent)",
        boxShadow:
          "0 14px 35px color-mix(in srgb, var(--foreground) 6%, transparent)",
      }}
    >
      <div className="mb-4 space-y-1">
        <div className="flex items-center gap-2">
          <Type size={15} style={{ color: "var(--primary)" }} />

          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Tipografía
          </h2>
        </div>

        <p
          className="text-xs leading-5"
          style={{ color: "var(--text-muted)" }}
        >
          Selecciona la fuente principal del dashboard para mantener una
          identidad visual consistente.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {FONT_FAMILY_OPTIONS.map((option) => {
          const isActive = draft.fontFamily === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setDraft({ fontFamily: option.value })}
              disabled={isLoading || isSaving}
              className="rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: isActive
                  ? "var(--primary-soft)"
                  : "var(--background)",
                borderColor: isActive
                  ? "color-mix(in srgb, var(--primary) 65%, transparent)"
                  : "color-mix(in srgb, var(--border) 42%, transparent)",
                boxShadow: isActive
                  ? "0 10px 24px color-mix(in srgb, var(--primary) 11%, transparent)"
                  : "0 8px 20px color-mix(in srgb, var(--foreground) 4%, transparent)",
              }}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {option.label}
                    </p>

                    {option.description ? (
                      <p
                        className="mt-1 text-xs leading-5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {option.description}
                      </p>
                    ) : null}
                  </div>

                  {isActive ? (
                    <span
                      className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "var(--card)",
                      }}
                    >
                      Activa
                    </span>
                  ) : null}
                </div>

                <div
                  className="rounded-2xl border px-3.5 py-3"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor:
                      "color-mix(in srgb, var(--border) 38%, transparent)",
                    fontFamily: FONT_FAMILY_STACKS[option.value],
                    color: "var(--foreground)",
                    boxShadow:
                      "inset 0 1px 0 color-mix(in srgb, var(--card) 45%, transparent)",
                  }}
                >
                  <p className="text-sm font-semibold">
                    CotizaApp Dashboard
                  </p>

                  <p
                    className="mt-1 text-xs leading-5"
                    style={{ color: "var(--text-muted)" }}
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
