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
        backgroundColor: "hsl(var(--card))",

        // CORRECCIÓN VISUAL:
        // Antes dependía directo de --border y se veía muy oscuro.
        // Lo suavizamos para recuperar el diseño limpio anterior.
        borderColor: "hsl(var(--border) / 0.45)",

        // CORRECCIÓN VISUAL:
        // Shadow más suave para que no se vea pesado.
        boxShadow: "0 14px 35px rgba(15, 23, 42, 0.06)",
      }}
    >
      <div className="mb-4 space-y-1">
        <h2
          className="text-sm font-semibold"
          style={{ color: "hsl(var(--foreground))" }}
        >
          Apariencia
        </h2>

        <p
          className="text-xs leading-5"
          style={{ color: "hsl(var(--text-muted))" }}
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
                // CORRECCIÓN VISUAL:
                // Card activa suave, card inactiva clara.
                backgroundColor: isActive
                  ? "hsl(var(--primary-soft))"
                  : "hsl(var(--background))",

                // CORRECCIÓN VISUAL:
                // Borde activo azul, inactivo más bajito para que no se vea negro.
                borderColor: isActive
                  ? "hsl(var(--primary) / 0.75)"
                  : "hsl(var(--border) / 0.45)",

                boxShadow: isActive
                  ? "0 10px 24px rgba(45, 107, 255, 0.12)"
                  : "0 8px 20px rgba(15, 23, 42, 0.035)",
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: isActive
                      ? "hsl(var(--primary))"
                      : "hsl(var(--primary-soft))",
                    color: isActive ? "white" : "hsl(var(--primary))",
                  }}
                >
                  <Icon size={16} />
                </div>

                {isActive ? (
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                    style={{
                      backgroundColor: "hsl(var(--primary))",
                      color: "white",
                    }}
                  >
                    Activo
                  </span>
                ) : null}
              </div>

              <div className="space-y-1">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {option.label}
                </p>

                {option.description ? (
                  <p
                    className="text-xs leading-5"
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
