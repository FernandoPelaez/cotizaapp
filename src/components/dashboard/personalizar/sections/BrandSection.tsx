"use client"

import { Check, Palette } from "lucide-react"
import { BRAND_COLOR_PRESET_LIST } from "@/lib/theme/theme-presets"
import { useThemeContext } from "@/components/providers/ThemeProvider"

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "").trim()

  const normalized =
    clean.length === 3
      ? clean
          .split("")
          .map((char) => char + char)
          .join("")
      : clean

  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function BrandSection() {
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
          <Palette size={15} style={{ color: "hsl(var(--primary))" }} />

          <h2
            className="text-sm font-semibold"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Marca
          </h2>
        </div>

        <p
          className="text-xs leading-5"
          style={{ color: "hsl(var(--text-muted))" }}
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
                  ? `linear-gradient(180deg, ${hexToRgba(
                      preset.hex,
                      0.12
                    )} 0%, hsl(var(--card)) 100%)`
                  : "hsl(var(--background))",

                borderColor: isActive
                  ? hexToRgba(preset.hex, 0.48)
                  : "hsl(var(--border) / 0.45)",
                boxShadow: isActive
                  ? `0 10px 24px ${hexToRgba(preset.hex, 0.12)}`
                  : "0 8px 20px rgba(15, 23, 42, 0.035)",
              }}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="block h-10 w-10 flex-shrink-0 rounded-full border"
                    style={{
                      background: `linear-gradient(135deg, ${hexToRgba(
                        preset.hex,
                        1
                      )} 0%, ${hexToRgba(preset.hex, 0.82)} 100%)`,
                      borderColor: isActive
                        ? hexToRgba(preset.hex, 0.5)
                        : "rgba(255, 255, 255, 0.35)",
                      boxShadow: isActive
                        ? `0 0 0 4px ${hexToRgba(preset.hex, 0.12)}`
                        : "0 0 0 1px rgba(15, 23, 42, 0.06)",
                    }}
                  />

                  <div className="min-w-0 space-y-0.5">
                    <p
                      className="truncate text-sm font-semibold"
                      style={{ color: "hsl(var(--foreground))" }}
                    >
                      {preset.label}
                    </p>

                    <p
                      className="text-[11px] uppercase tracking-wide"
                      style={{ color: "hsl(var(--text-muted))" }}
                    >
                      {preset.hex}
                    </p>
                  </div>
                </div>

                {isActive ? (
                  <span
                    className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border"
                    style={{
                      backgroundColor: hexToRgba(preset.hex, 0.14),
                      borderColor: hexToRgba(preset.hex, 0.22),
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
                 
                    backgroundColor: "hsl(var(--border) / 0.35)",
                  }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "68%",
                      background: `linear-gradient(90deg, ${hexToRgba(
                        preset.hex,
                        0.92
                      )} 0%, ${hexToRgba(preset.hex, 0.7)} 100%)`,
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
                    style={{ color: "hsl(var(--text-muted))" }}
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
