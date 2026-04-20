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
          className="rounded-xl border px-4 py-3 text-sm font-medium"
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            borderColor: "rgba(239, 68, 68, 0.22)",
            color: "rgb(153, 27, 27)",
          }}
        >
          {error}
        </div>
      ) : null}

      <div className="flex justify-end">
        <div
          className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5"
          style={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            boxShadow: "var(--shadow)",
          }}
        >
          <button
            type="button"
            onClick={handleRestoreDefaults}
            disabled={isLoading || isSaving || isSameAsDefaults}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--foreground))",
            }}
          >
            <RotateCcw size={14} strokeWidth={2.2} />
            Restablecer
          </button>

          <button
            type="button"
            onClick={handleCancelChanges}
            disabled={isLoading || isSaving || isSameAsSaved}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              borderColor: "rgba(239, 68, 68, 0.18)",
              color: "rgb(185, 28, 28)",
            }}
          >
            <X size={14} strokeWidth={2.2} />
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading || isSaving || !hasChanges}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              backgroundColor: saved
                ? "hsl(var(--success))"
                : "hsl(var(--primary))",
              color: "white",
              boxShadow: saved
                ? "0 8px 20px rgba(34, 197, 94, 0.22)"
                : "0 8px 20px rgba(37, 99, 235, 0.20)",
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
