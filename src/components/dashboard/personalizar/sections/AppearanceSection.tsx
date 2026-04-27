"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { THEME_MODE_OPTIONS } from "@/lib/theme/theme-presets"
import { useThemeContext } from "@/components/providers/ThemeProvider"
import type { ThemeMode } from "@/types/theme"

const modeIcons: Record<ThemeMode, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
}

export default function AppearanceSection() {
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
        <h2
          className="text-sm font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          Apariencia
        </h2>

        <p
          className="text-xs leading-5"
          style={{ color: "var(--text-muted)" }}
        >
          Elige cómo se verá el dashboard de forma global.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {THEME_MODE_OPTIONS.map((option) => {
          const Icon = modeIcons[option.value]
          const isActive = draft.themeMode === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setDraft({ themeMode: option.value })}
              disabled={isLoading || isSaving}
              className="min-h-[116px] rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: isActive
                  ? "var(--primary-soft)"
                  : "var(--background)",
                borderColor: isActive
                  ? "color-mix(in srgb, var(--primary) 75%, transparent)"
                  : "color-mix(in srgb, var(--border) 45%, transparent)",
                boxShadow: isActive
                  ? "0 10px 24px color-mix(in srgb, var(--primary) 12%, transparent)"
                  : "0 8px 20px color-mix(in srgb, var(--foreground) 4%, transparent)",
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: isActive
                      ? "var(--primary)"
                      : "var(--primary-soft)",
                    color: isActive ? "var(--card)" : "var(--primary)",
                  }}
                >
                  <Icon size={16} />
                </div>

                {isActive ? (
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--card)",
                    }}
                  >
                    Activo
                  </span>
                ) : null}
              </div>

              <div className="space-y-1">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {option.label}
                </p>

                {option.description ? (
                  <p
                    className="text-xs leading-5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {option.description}
                  </p>
                ) : null}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}