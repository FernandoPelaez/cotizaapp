"use client"

import type { CSSProperties } from "react"
import { Layers3, Radius, SquareStack } from "lucide-react"
import { useThemeContext } from "@/components/providers/ThemeProvider"
import {
  CARD_STYLE_OPTIONS,
  RADIUS_STYLE_OPTIONS,
  SHADOW_STYLE_OPTIONS,
} from "@/lib/theme/theme-presets"

function getCardPreviewStyles(value: string): CSSProperties {
  const softBorder = "color-mix(in srgb, var(--border) 42%, transparent)"

  switch (value) {
    case "elevated":
      return {
        backgroundColor: "var(--card)",
        borderColor: softBorder,
        boxShadow:
          "0 10px 24px color-mix(in srgb, var(--foreground) 6%, transparent)",
      }

    case "bordered":
      return {
        backgroundColor: "var(--card)",
        borderColor: "color-mix(in srgb, var(--primary) 55%, transparent)",
        boxShadow: "none",
      }

    case "soft":
      return {
        backgroundColor: "var(--background)",
        borderColor: "color-mix(in srgb, var(--border) 32%, transparent)",
        boxShadow:
          "0 8px 20px color-mix(in srgb, var(--foreground) 5%, transparent)",
      }

    case "solid":
    default:
      return {
        backgroundColor: "var(--card)",
        borderColor: softBorder,
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
      return "0 8px 22px color-mix(in srgb, var(--foreground) 7%, transparent)"
    case "medium":
      return "0 12px 30px color-mix(in srgb, var(--foreground) 10%, transparent)"
    case "strong":
    default:
      return "0 16px 42px color-mix(in srgb, var(--foreground) 14%, transparent)"
  }
}

export default function SurfaceSection() {
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
          <Layers3 size={15} style={{ color: "var(--primary)" }} />

          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Tarjetas y contenedores
          </h2>
        </div>

        <p
          className="text-xs leading-5"
          style={{ color: "var(--text-muted)" }}
        >
          Ajusta cómo se sienten las superficies del dashboard: tarjetas,
          bordes y profundidad visual.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <SquareStack size={14} style={{ color: "var(--primary)" }} />

            <p
              className="text-sm font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Estilo de tarjetas
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {CARD_STYLE_OPTIONS.map((option) => {
              const isActive = draft.cardStyle === option.value
              const previewStyles = getCardPreviewStyles(option.value)

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setDraft({ cardStyle: option.value })}
                  disabled={isLoading || isSaving}
                  className="rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    background: isActive
                      ? "linear-gradient(180deg, var(--primary-soft) 0%, var(--card) 100%)"
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
                          className="shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                          style={{
                            backgroundColor: "var(--primary-soft)",
                            borderColor:
                              "color-mix(in srgb, var(--primary) 45%, transparent)",
                            color: "var(--primary)",
                          }}
                        >
                          Activo
                        </span>
                      ) : null}
                    </div>

                    <div
                      className="rounded-2xl border p-3"
                      style={previewStyles}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="space-y-1.5">
                            <div
                              className="h-2 w-16 rounded-full"
                              style={{
                                backgroundColor: "var(--foreground)",
                                opacity: 0.13,
                              }}
                            />

                            <div
                              className="h-1.5 w-24 rounded-full"
                              style={{
                                backgroundColor: "var(--foreground)",
                                opacity: 0.075,
                              }}
                            />
                          </div>

                          <span
                            className="rounded-full px-2.5 py-1 text-[9px] font-medium"
                            style={{
                              backgroundColor: "var(--primary-soft)",
                              color: "var(--primary)",
                            }}
                          >
                            Preview
                          </span>
                        </div>

                        <div
                          className="rounded-xl border px-2.5 py-2"
                          style={{
                            backgroundColor: "var(--background)",
                            borderColor:
                              "color-mix(in srgb, var(--border) 35%, transparent)",
                          }}
                        >
                          <div
                            className="h-1.5 w-20 rounded-full"
                            style={{
                              backgroundColor: "var(--foreground)",
                              opacity: 0.09,
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

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Radius size={14} style={{ color: "var(--primary)" }} />

              <p
                className="text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                Radio de bordes
              </p>
            </div>

            <div className="space-y-3">
              {RADIUS_STYLE_OPTIONS.map((option) => {
                const isActive = draft.radiusStyle === option.value
                const previewRadius = getRadiusPreview(option.value)

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setDraft({ radiusStyle: option.value })}
                    disabled={isLoading || isSaving}
                    className="w-full rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      background: isActive
                        ? "linear-gradient(180deg, var(--primary-soft) 0%, var(--card) 100%)"
                        : "var(--background)",
                      borderColor: isActive
                        ? "color-mix(in srgb, var(--primary) 65%, transparent)"
                        : "color-mix(in srgb, var(--border) 42%, transparent)",
                      boxShadow: isActive
                        ? "0 10px 24px color-mix(in srgb, var(--primary) 11%, transparent)"
                        : "0 8px 20px color-mix(in srgb, var(--foreground) 4%, transparent)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
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

                      <div
                        className="flex shrink-0 items-center justify-center rounded-2xl border p-2"
                        style={{
                          backgroundColor: "var(--card)",
                          borderColor:
                            "color-mix(in srgb, var(--border) 38%, transparent)",
                        }}
                      >
                        <div
                          className="h-9 w-14 border"
                          style={{
                            borderRadius: previewRadius,
                            backgroundColor: "var(--background)",
                            borderColor: isActive
                              ? "color-mix(in srgb, var(--primary) 65%, transparent)"
                              : "color-mix(in srgb, var(--border) 42%, transparent)",
                          }}
                        />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers3 size={14} style={{ color: "var(--primary)" }} />

              <p
                className="text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                Intensidad de sombra
              </p>
            </div>

            <div className="space-y-3">
              {SHADOW_STYLE_OPTIONS.map((option) => {
                const isActive = draft.shadowStyle === option.value
                const previewShadow = getShadowPreview(option.value)

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setDraft({ shadowStyle: option.value })}
                    disabled={isLoading || isSaving}
                    className="w-full rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      background: isActive
                        ? "linear-gradient(180deg, var(--primary-soft) 0%, var(--card) 100%)"
                        : "var(--background)",
                      borderColor: isActive
                        ? "color-mix(in srgb, var(--primary) 65%, transparent)"
                        : "color-mix(in srgb, var(--border) 42%, transparent)",
                      boxShadow: isActive
                        ? "0 10px 24px color-mix(in srgb, var(--primary) 11%, transparent)"
                        : "0 8px 20px color-mix(in srgb, var(--foreground) 4%, transparent)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p
                          className="text-sm font-semibold capitalize"
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

                      <div
                        className="flex shrink-0 items-center justify-center rounded-2xl border p-2"
                        style={{
                          backgroundColor: "var(--card)",
                          borderColor:
                            "color-mix(in srgb, var(--border) 38%, transparent)",
                        }}
                      >
                        <div
                          className="h-9 w-14 rounded-xl border"
                          style={{
                            backgroundColor: "var(--card)",
                            borderColor: isActive
                              ? "color-mix(in srgb, var(--primary) 65%, transparent)"
                              : "color-mix(in srgb, var(--border) 42%, transparent)",
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
