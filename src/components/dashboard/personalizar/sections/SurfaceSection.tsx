"use client"

import { Layers3, Radius, SquareStack } from "lucide-react"
import { useThemeContext } from "@/components/providers/ThemeProvider"
import {
  CARD_STYLE_OPTIONS,
  RADIUS_STYLE_OPTIONS,
  SHADOW_STYLE_OPTIONS,
} from "@/lib/theme/theme-presets"

function getCardPreviewStyles(value: string) {
  switch (value) {
    case "elevated":
      return {
        backgroundColor: "hsl(var(--card))",
        borderColor: "hsl(var(--border))",
        boxShadow: "var(--shadow)",
      }

    case "bordered":
      return {
        backgroundColor: "hsl(var(--card))",
        borderColor: "hsl(var(--primary))",
        boxShadow: "none",
      }

    case "soft":
      return {
        backgroundColor: "hsl(var(--background))",
        borderColor: "hsl(var(--border))",
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
      }

    case "solid":
    default:
      return {
        backgroundColor: "hsl(var(--card))",
        borderColor: "hsl(var(--border))",
        boxShadow: "none",
      }
  }
}

function getRadiusPreview(value: string) {
  switch (value) {
    case "sm":
      return "10px"
    case "lg":
      return "20px"
    case "md":
    default:
      return "14px"
  }
}

function getShadowPreview(value: string) {
  switch (value) {
    case "none":
      return "none"
    case "soft":
      return "0 8px 24px rgba(15, 23, 42, 0.08)"
    case "medium":
      return "0 12px 32px rgba(15, 23, 42, 0.12)"
    case "strong":
    default:
      return "0 18px 48px rgba(15, 23, 42, 0.18)"
  }
}

export default function SurfaceSection() {
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
          <Layers3 size={15} style={{ color: "hsl(var(--primary))" }} />
          <h2
            className="text-sm font-semibold"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Tarjetas y contenedores
          </h2>
        </div>
        <p
          className="text-xs"
          style={{ color: "hsl(var(--text-muted))" }}
        >
          Ajusta cómo se sienten las superficies del dashboard: tarjetas,
          bordes y profundidad visual.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <SquareStack size={14} style={{ color: "hsl(var(--primary))" }} />
            <p
              className="text-sm font-semibold"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Estilo de tarjetas
            </p>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            {CARD_STYLE_OPTIONS.map((option) => {
              const isActive = draft.cardStyle === option.value
              const previewStyles = getCardPreviewStyles(option.value)

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setDraft({ cardStyle: option.value })}
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
                          className="rounded-full border px-2 py-0.5 text-[10px] font-medium"
                          style={{
                            backgroundColor: "hsl(var(--primary-soft))",
                            borderColor: "hsl(var(--primary))",
                            color: "hsl(var(--primary))",
                          }}
                        >
                          Activo
                        </span>
                      ) : null}
                    </div>

                    <div
                      className="rounded-[var(--radius)] border p-2.5"
                      style={previewStyles}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="space-y-1">
                            <div
                              className="h-2 w-16 rounded-full"
                              style={{
                                backgroundColor: "hsl(var(--foreground))",
                                opacity: 0.14,
                              }}
                            />
                            <div
                              className="h-1.5 w-24 rounded-full"
                              style={{
                                backgroundColor: "hsl(var(--foreground))",
                                opacity: 0.08,
                              }}
                            />
                          </div>

                          <span
                            className="rounded-full px-2 py-0.5 text-[9px] font-medium"
                            style={{
                              backgroundColor: "hsl(var(--primary-soft))",
                              color: "hsl(var(--primary))",
                            }}
                          >
                            Preview
                          </span>
                        </div>

                        <div
                          className="rounded-lg border px-2 py-1.5"
                          style={{
                            backgroundColor: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                          }}
                        >
                          <div
                            className="h-1.5 w-20 rounded-full"
                            style={{
                              backgroundColor: "hsl(var(--foreground))",
                              opacity: 0.1,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Radius size={14} style={{ color: "hsl(var(--primary))" }} />
              <p
                className="text-sm font-semibold"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Radio de bordes
              </p>
            </div>

            <div className="space-y-2">
              {RADIUS_STYLE_OPTIONS.map((option) => {
                const isActive = draft.radiusStyle === option.value
                const previewRadius = getRadiusPreview(option.value)

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setDraft({ radiusStyle: option.value })}
                    disabled={isLoading || isSaving}
                    className="w-full rounded-xl border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-60"
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
                    <div className="flex items-center justify-between gap-3">
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

                      <div
                        className="flex items-center justify-center rounded-xl border p-1.5"
                        style={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                        }}
                      >
                        <div
                          className="h-9 w-14 border"
                          style={{
                            borderRadius: previewRadius,
                            backgroundColor: "hsl(var(--background))",
                            borderColor: isActive
                              ? "hsl(var(--primary))"
                              : "hsl(var(--border))",
                          }}
                        />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layers3 size={14} style={{ color: "hsl(var(--primary))" }} />
              <p
                className="text-sm font-semibold"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Intensidad de sombra
              </p>
            </div>

            <div className="space-y-2">
              {SHADOW_STYLE_OPTIONS.map((option) => {
                const isActive = draft.shadowStyle === option.value
                const previewShadow = getShadowPreview(option.value)

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setDraft({ shadowStyle: option.value })}
                    disabled={isLoading || isSaving}
                    className="w-full rounded-xl border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-60"
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
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p
                          className="text-sm font-semibold capitalize"
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

                      <div
                        className="flex items-center justify-center rounded-xl border p-1.5"
                        style={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                        }}
                      >
                        <div
                          className="h-9 w-14 rounded-xl border"
                          style={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: isActive
                              ? "hsl(var(--primary))"
                              : "hsl(var(--border))",
                            boxShadow: previewShadow,
                          }}
                        />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
