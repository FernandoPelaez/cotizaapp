"use client"

import { Check, Palette } from "lucide-react"
import { BRAND_COLOR_PRESET_LIST } from "@/lib/theme/theme-presets"
import { useThemeContext } from "@/components/providers/ThemeProvider"

function mixColor(color: string, amount: number, base = "transparent") {
  return `color-mix(in srgb, ${color} ${amount}%, ${base})`
}

export default function BrandSection() {
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
          <Palette size={15} style={{ color: "var(--primary)" }} />

          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Marca
          </h2>
        </div>

        <p
          className="text-xs leading-5"
          style={{ color: "var(--text-muted)" }}
        >
          Elige el color principal que dará identidad visual al dashboard.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {BRAND_COLOR_PRESET_LIST.map((preset) => {
          const isActive = draft.brandColor === preset.key

          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => setDraft({ brandColor: preset.key })}
              disabled={isLoading || isSaving}
              className="rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: isActive
                  ? `linear-gradient(180deg, ${mixColor(
                      preset.hex,
                      12,
                      "var(--card)"
                    )} 0%, var(--card) 100%)`
                  : "var(--background)",

                borderColor: isActive
                  ? mixColor(preset.hex, 48, "var(--border)")
                  : "color-mix(in srgb, var(--border) 45%, transparent)",

                boxShadow: isActive
                  ? `0 10px 24px ${mixColor(preset.hex, 12)}`
                  : "0 8px 20px color-mix(in srgb, var(--foreground) 4%, transparent)",
              }}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="block h-10 w-10 flex-shrink-0 rounded-full border"
                    style={{
                      background: `linear-gradient(135deg, ${
                        preset.hex
                      } 0%, ${mixColor(preset.hex, 82, "var(--card)")} 100%)`,
                      borderColor: isActive
                        ? mixColor(preset.hex, 50, "var(--border)")
                        : "color-mix(in srgb, var(--card) 35%, var(--border))",
                      boxShadow: isActive
                        ? `0 0 0 4px ${mixColor(preset.hex, 12)}`
                        : "0 0 0 1px color-mix(in srgb, var(--foreground) 6%, transparent)",
                    }}
                  />

                  <div className="min-w-0 space-y-0.5">
                    <p
                      className="truncate text-sm font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {preset.label}
                    </p>

                    <p
                      className="text-[11px] uppercase tracking-wide"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {preset.hex}
                    </p>
                  </div>
                </div>

                {isActive ? (
                  <span
                    className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border"
                    style={{
                      backgroundColor: mixColor(preset.hex, 14, "var(--card)"),
                      borderColor: mixColor(preset.hex, 22, "var(--border)"),
                      color: preset.hex,
                    }}
                  >
                    <Check size={13} />
                  </span>
                ) : null}
              </div>

              <div className="space-y-3">
                <div
                  className="h-1.5 w-full overflow-hidden rounded-full"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--border) 35%, transparent)",
                  }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "68%",
                      background: `linear-gradient(90deg, ${mixColor(
                        preset.hex,
                        92,
                        "var(--card)"
                      )} 0%, ${mixColor(preset.hex, 70, "var(--card)")} 100%)`,
                    }}
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: preset.hex }}
                  />

                  <span
                    className="text-[11px] leading-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {isActive
                      ? "Color activo en tu tema actual"
                      : "Disponible para aplicar"}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
