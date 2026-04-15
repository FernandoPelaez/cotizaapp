"use client"

import { useState, useEffect } from "react"
import {
  Sun,
  Palette,
  RotateCcw,
  Save,
  Check,
} from "lucide-react"

type Theme = "claro" | "oscuro"

const accents = [
  { color: "#2D6BFF", label: "Azul" },
  { color: "#7F77DD", label: "Violeta" },
  { color: "#1D9E75", label: "Verde" },
  { color: "#D85A30", label: "Naranja" },
  { color: "#D4537E", label: "Rosa" },
  { color: "#BA7517", label: "Ámbar" },
]

export default function Personalizar() {
  const [theme, setTheme] = useState<Theme>("claro")
  const [accent, setAccent] = useState("#2D6BFF")
  const [saved, setSaved] = useState(false)

  // 🔥 APLICAR CAMBIOS GLOBALMENTE
  useEffect(() => {
    const root = document.documentElement

    // Tema
    if (theme === "oscuro") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Color principal
    root.style.setProperty("--primary", accent)

  }, [theme, accent])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    setTheme("claro")
    setAccent("#2D6BFF")
  }

  return (
    <div className="p-6 flex flex-col gap-6">

      <h1 className="text-xl font-bold">
        Personalizar
      </h1>

      {/* ─── Tema ───────────────── */}
      <div
        className="p-4 rounded-xl border"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)"
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sun size={16} />
          <span className="font-semibold">Tema</span>
        </div>

        <div className="flex gap-2">
          {["claro", "oscuro"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t as Theme)}
              className="px-4 py-2 rounded-lg border"
              style={{
                background: theme === t ? "var(--primary)" : "transparent",
                color: theme === t ? "white" : "var(--foreground)",
                borderColor: "var(--border)"
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Color ───────────────── */}
      <div
        className="p-4 rounded-xl border"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)"
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Palette size={16} />
          <span className="font-semibold">Color principal</span>
        </div>

        <div className="flex gap-3 flex-wrap">
          {accents.map((a) => (
            <button
              key={a.color}
              onClick={() => setAccent(a.color)}
              className="w-8 h-8 rounded-full"
              style={{
                background: a.color,
                outline: accent === a.color
                  ? `3px solid ${a.color}`
                  : "2px solid transparent"
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── Botones ───────────────── */}
      <div className="flex gap-3 justify-end">

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border"
          style={{
            borderColor: "var(--border)"
          }}
        >
          <RotateCcw size={14} />
          Reset
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg"
          style={{
            background: saved ? "var(--success)" : "var(--primary)",
            color: "white"
          }}
        >
          <Save size={14} />
          {saved ? "Guardado" : "Guardar"}
        </button>

      </div>

    </div>
  )
}
