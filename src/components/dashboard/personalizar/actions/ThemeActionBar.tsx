"use client"

import { AnimatePresence, motion, type Variants } from "framer-motion"
import { useEffect, useState } from "react"
import { Check, RotateCcw, Save, X } from "lucide-react"

import { useThemeContext } from "@/components/providers/ThemeProvider"
import { createDefaultThemeSettings } from "@/lib/theme/theme-defaults"

const actionEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const actionBarWrapperVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: actionEase },
  },
}

const actionBarVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: actionEase, delay: 0.12 },
  },
}

const actionErrorVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: actionEase },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.32, ease: actionEase },
  },
}

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
    if (hasChanges) setSaved(false)
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
  const isSameAsSaved = JSON.stringify(draft) === JSON.stringify(settings)

  const restoreDisabled = isLoading || isSaving || isSameAsDefaults
  const cancelDisabled = isLoading || isSaving || isSameAsSaved
  const saveDisabled = isLoading || isSaving || !hasChanges

  return (
    
    <motion.div className="space-y-3" variants={actionBarWrapperVariants}>
      <AnimatePresence mode="popLayout">
        {error ? (
          <motion.div
            key="theme-action-error"
            variants={actionErrorVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="rounded-2xl border px-4 py-3 text-sm font-medium"
            style={{
              backgroundColor: "var(--error-bg)",
              borderColor: "color-mix(in srgb, var(--error) 35%, var(--border))",
              color: "var(--error)",
              boxShadow: "0 10px 24px color-mix(in srgb, var(--error) 12%, transparent)",
            }}
          >
            {error}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex justify-end">
        <motion.div
          className="flex w-full flex-col gap-2 rounded-3xl border p-2.5 sm:w-auto sm:flex-row sm:items-center"
          variants={actionBarVariants}
          style={{
            backgroundColor: "var(--card)",
            borderColor: "color-mix(in srgb, var(--border) 45%, transparent)",
            boxShadow: "0 14px 35px color-mix(in srgb, var(--foreground) 6%, transparent)",
          }}
        >
          <motion.button
            type="button"
            onClick={handleRestoreDefaults}
            disabled={restoreDisabled}
            whileHover={restoreDisabled ? undefined : { y: -1 }}
            whileTap={restoreDisabled ? undefined : { scale: 0.99 }}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl border px-3.5 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              backgroundColor: "var(--warning-bg)",
              borderColor: "color-mix(in srgb, var(--warning) 35%, var(--border))",
              color: "var(--warning)",
              boxShadow: "0 8px 20px color-mix(in srgb, var(--warning) 10%, transparent)",
            }}
          >
            <RotateCcw size={14} strokeWidth={2.2} />
            Restablecer
          </motion.button>

          <motion.button
            type="button"
            onClick={handleCancelChanges}
            disabled={cancelDisabled}
            whileHover={cancelDisabled ? undefined : { y: -1 }}
            whileTap={cancelDisabled ? undefined : { scale: 0.99 }}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl border px-3.5 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              backgroundColor: "var(--error-bg)",
              borderColor: "color-mix(in srgb, var(--error) 35%, var(--border))",
              color: "var(--error)",
              boxShadow: "0 8px 20px color-mix(in srgb, var(--error) 10%, transparent)",
            }}
          >
            <X size={14} strokeWidth={2.2} />
            Cancelar
          </motion.button>

          <motion.button
            type="button"
            onClick={handleSave}
            disabled={saveDisabled}
            whileHover={saveDisabled ? undefined : { y: -1 }}
            whileTap={saveDisabled ? undefined : { scale: 0.99 }}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              backgroundColor: saved ? "var(--success)" : "var(--primary)",
              color: "var(--card)",
              boxShadow: saved
                ? "0 10px 24px color-mix(in srgb, var(--success) 22%, transparent)"
                : "0 10px 24px color-mix(in srgb, var(--primary) 22%, transparent)",
            }}
          >
            {saved ? <Check size={14} strokeWidth={2.5} /> : <Save size={14} strokeWidth={2.2} />}
            {isLoading ? "Cargando..." : isSaving ? "Guardando..." : saved ? "Guardado" : "Guardar"}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
