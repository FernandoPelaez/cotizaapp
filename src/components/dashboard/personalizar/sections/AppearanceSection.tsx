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
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: "hsl(var(--card))",
        borderColor: "hsl(var(--border))",
        boxShadow: "var(--shadow)",
      }}
    >
      <div className="mb-3 space-y-0.5">
        <h2
          className="text-sm font-semibold"
          style={{ color: "hsl(var(--foreground))" }}
        >
          Apariencia
        </h2>
        <p
          className="text-xs"
          style={{ color: "hsl(var(--text-muted))" }}
        >
          Elige cómo se verá el dashboard de forma global.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        {THEME_MODE_OPTIONS.map((option) => {
          const Icon = modeIcons[option.value]
          const isActive = draft.themeMode === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setDraft({ themeMode: option.value })}
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
              <div className="mb-2 flex items-center justify-between">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: isActive
                      ? "hsl(var(--primary))"
                      : "hsl(var(--primary-soft))",
                    color: isActive ? "white" : "hsl(var(--primary))",
                  }}
                >
                  <Icon size={15} />
                </div>

                {isActive ? (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      backgroundColor: "hsl(var(--primary))",
                      color: "white",
                    }}
                  >
                    Activo
                  </span>
                ) : null}
              </div>

              <div className="space-y-0.5">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {option.label}
                </p>
                {option.description ? (
                  <p
                    className="text-xs leading-4"
                    style={{ color: "hsl(var(--text-muted))" }}
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
