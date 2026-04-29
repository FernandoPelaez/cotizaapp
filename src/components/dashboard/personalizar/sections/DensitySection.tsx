"use client"

import { motion } from "framer-motion"
import { Rows3 } from "lucide-react"

import { useThemeContext } from "@/components/providers/ThemeProvider"
import { DENSITY_STYLE_OPTIONS } from "@/lib/theme/theme-presets"

import {
  personalizarCardsContainerVariants,
  personalizarCardVariants,
} from "../animations/personalizar.motion"

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
          <Rows3 size={15} style={{ color: "var(--primary)" }} />

          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Densidad visual
          </h2>
        </div>

        <p
          className="text-xs leading-5"
          style={{ color: "var(--text-muted)" }}
        >
          Controla cuánto espacio visual tienen los bloques, tarjetas,
          formularios y listas dentro del dashboard.
        </p>
      </div>

      <motion.div
        className="grid gap-3 md:grid-cols-3"
        variants={personalizarCardsContainerVariants}
        initial="hidden"
        animate="show"
      >
        {DENSITY_STYLE_OPTIONS.map((option) => {
          const isActive = draft.densityStyle === option.value
          const preview =
            densityPreviewMap[
              option.value as keyof typeof densityPreviewMap
            ]

          return (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => setDraft({ densityStyle: option.value })}
              disabled={isLoading || isSaving}
              variants={personalizarCardVariants}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
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
              <div className="mb-3 flex items-start justify-between gap-3">
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
                    Activa
                  </span>
                ) : null}
              </div>

              <div
                className="rounded-2xl border"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor:
                    "color-mix(in srgb, var(--border) 38%, transparent)",
                  padding: preview.cardPadding,
                  boxShadow:
                    "inset 0 1px 0 color-mix(in srgb, var(--card) 42%, transparent)",
                }}
              >
                <div
                  className="flex flex-col"
                  style={{ gap: preview.sectionGap }}
                >
                  <div className="space-y-1.5">
                    <div
                      className="rounded-full"
                      style={{
                        height: "7px",
                        width: "55%",
                        backgroundColor: "var(--foreground)",
                        opacity: 0.13,
                      }}
                    />

                    <div
                      className="rounded-full"
                      style={{
                        height: "5px",
                        width: "34%",
                        backgroundColor: "var(--foreground)",
                        opacity: 0.075,
                      }}
                    />
                  </div>

                  <div
                    className="rounded-xl border"
                    style={{
                      height: preview.inputHeight,
                      backgroundColor: "var(--background)",
                      borderColor:
                        "color-mix(in srgb, var(--border) 35%, transparent)",
                    }}
                  />

                  <div
                    className="rounded-xl border"
                    style={{
                      height: preview.inputHeight,
                      backgroundColor: "var(--background)",
                      borderColor:
                        "color-mix(in srgb, var(--border) 35%, transparent)",
                    }}
                  />

                  <div className="flex justify-start">
                    <div
                      className="rounded-lg"
                      style={{
                        height: preview.btnHeight,
                        width: preview.btnWidth,
                        backgroundColor: "var(--primary)",
                        boxShadow:
                          "0 8px 18px color-mix(in srgb, var(--primary) 18%, transparent)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </section>
  )
}
