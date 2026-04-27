"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const sendStats = ["✓ WhatsApp", "✓ Notificación", "✓ Seguimiento"]

export default function CardEnviar() {
  const [sent, setSent] = useState(false)

  return (
    <div className="space-y-4">
      <motion.button
        type="button"
        onClick={() => setSent(true)}
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -1, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.32, delay: 0.08, ease: "easeOut" }}
        className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 transition-all"
        style={{
          border: sent ? "2px solid #16a34a" : "2px solid #25D366",
          background: sent ? "#f0fdf4" : "#25D366",
          cursor: "pointer",
        }}
      >
        <span className="text-2xl leading-none">💬</span>

        <div className="min-w-0 flex-1 text-left">
          <div
            className="text-sm font-bold"
            style={{ color: sent ? "#15803d" : "#fff" }}
          >
            {sent ? "✓ Enviado por WhatsApp" : "Enviar por WhatsApp"}
          </div>

          <div
            className="mt-0.5 text-xs"
            style={{ color: sent ? "#16a34a" : "rgba(255,255,255,0.78)" }}
          >
            +52 667 234 5678 · Juan Pérez
          </div>
        </div>

        {!sent && <span className="text-lg text-white opacity-80">→</span>}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.32, delay: 0.16, ease: "easeOut" }}
        className="overflow-hidden rounded-xl border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between bg-[#1B3D7A] px-4 py-3">
          <div className="text-sm font-bold text-white">Estado de envío</div>
          <div className="text-sm font-bold text-white">
            {sent ? "Enviada" : "Pendiente"}
          </div>
        </div>

        <div className="border-b border-gray-100 bg-[#EEF2FA] px-4 py-2">
          <span className="text-xs font-semibold text-[#1B3D7A]">
            Cliente: Juan Pérez — WhatsApp conectado
          </span>
        </div>

        <div className="space-y-3 bg-white px-3 py-4">
          {[
            ["Tiempo estimado", "3 min"],
            ["Tasa de apertura", "94%"],
            ["Estado", sent ? "Entregada" : "Lista para enviar"],
          ].map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.24,
                delay: 0.22 + index * 0.05,
                ease: "easeOut",
              }}
              className="flex justify-between py-0.5 text-xs text-gray-600"
            >
              <span>{label}</span>
              <span className="font-semibold text-gray-800">{value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-2">
        {sendStats.map((stat) => (
          <motion.div
            key={stat}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.4, ease: "easeOut" }}
            className="rounded-xl border border-blue-200 bg-blue-50 py-2 text-center text-xs font-semibold text-[#1B3D7A]"
          >
            {stat}
          </motion.div>
        ))}
      </div>
    </div>
  )
}