"use client"

import { useEffect, useState } from "react"
import { Check, RotateCcw, Save, X } from "lucide-react"
import { useThemeContext } from "@/components/providers/ThemeProvider"
import { createDefaultThemeSettings } from "@/lib/theme/theme-defaults"

export default function ThemeActionBar() {
  const {
    draft,
    settings,
    isLoading,
    isSaving,
    hasChanges,
    setDraft,
    resetDraft,
    saveTheme,
  } = useThemeContext()

  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (hasChanges) {
      setSaved(false)
    }
  }, [hasChanges])

  const handleRestoreDefaults = () => {
    setError("")
    setSaved(false)
    setDraft(createDefaultThemeSettings())
  }

  const handleCancelChanges = () => {
    setError("")
    setSaved(false)
    resetDraft()
  }

  const handleSave = async () => {
    try {
      setError("")
      setSaved(false)
      await saveTheme()
      setSaved(true)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "No se pudieron guardar los cambios."

      setError(message)
    }
  }

  const isSameAsDefaults =
    JSON.stringify(draft) === JSON.stringify(createDefaultThemeSettings())

  const isSameAsSaved =
    JSON.stringify(draft) === JSON.stringify(settings)

  return (
    <div className="space-y-3">
      {error ? (
        <div
          className="rounded-2xl border px-4 py-3 text-sm font-medium"
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            borderColor: "rgba(239, 68, 68, 0.20)",
            color: "rgb(153, 27, 27)",
            boxShadow: "0 10px 24px rgba(239, 68, 68, 0.08)",
          }}
        >
          {error}
        </div>
      ) : null}

      <div className="flex justify-end">
        <div
          className="flex w-full flex-col gap-2 rounded-3xl border p-2.5 sm:w-auto sm:flex-row sm:items-center"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "color-mix(in srgb, var(--border) 45%, transparent)",
            boxShadow: "0 14px 35px rgba(15, 23, 42, 0.06)",
          }}
        >
          <button
            type="button"
            onClick={handleRestoreDefaults}
            disabled={isLoading || isSaving || isSameAsDefaults}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl border px-3.5 py-2 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "color-mix(in srgb, var(--border) 42%, transparent)",
              color: "var(--foreground)",
              boxShadow: "0 8px 20px rgba(15, 23, 42, 0.035)",
            }}
          >
            <RotateCcw size={14} strokeWidth={2.2} />
            Restablecer
          </button>

          <button
            type="button"
            onClick={handleCancelChanges}
            disabled={isLoading || isSaving || isSameAsSaved}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl border px-3.5 py-2 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              borderColor: "rgba(239, 68, 68, 0.18)",
              color: "rgb(185, 28, 28)",
              boxShadow: "0 8px 20px rgba(239, 68, 68, 0.06)",
            }}
          >
            <X size={14} strokeWidth={2.2} />
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading || isSaving || !hasChanges}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              backgroundColor: saved ? "var(--success)" : "var(--primary)",
              color: "white",
              boxShadow: saved
                ? "0 10px 24px rgba(34, 197, 94, 0.20)"
                : "0 10px 24px rgba(37, 99, 235, 0.18)",
            }}
          >
            {saved ? (
              <Check size={14} strokeWidth={2.5} />
            ) : (
              <Save size={14} strokeWidth={2.2} />
            )}

            {isLoading
              ? "Cargando..."
              : isSaving
              ? "Guardando..."
              : saved
              ? "Guardado"
              : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  )
}
