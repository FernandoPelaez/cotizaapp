"use client"

import { motion } from "framer-motion"
import { previewRows } from "../../data/preview.data"

const previewFeatures = [
  "✓ Vista limpia",
  "✓ Lista para enviar",
  "✓ Sin errores",
]

export default function CardPreview() {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.34,
          delay: 0.08,
          ease: "easeOut",
        }}
        className="overflow-hidden rounded-xl border border-gray-200 shadow-sm"
      >
        <div className="relative flex items-center justify-between overflow-hidden bg-[#1B3D7A] px-4 py-3">
          <div
            style={{
              position: "absolute",
              top: "-14px",
              right: "50px",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#c7d7f5",
              opacity: 0.2,
            }}
          />

          <div className="relative z-10">
            <div className="text-sm font-bold text-white">
              MI EMPRESA S.A. DE C.V.
            </div>
            <div className="mt-0.5 text-[11px] text-white/60">
              RFC: MEP123456ABC
            </div>
          </div>

          <div className="relative z-10 text-right">
            <div className="text-sm font-bold text-white">COT-2026-047</div>
            <div className="mt-0.5 text-[11px] text-white/50">13/04/2026</div>
          </div>
        </div>

        <div className="border-b border-gray-100 bg-[#EEF2FA] px-4 py-2">
          <span className="text-xs font-semibold text-[#1B3D7A]">
            Constructora Norte SA — Vigencia: 15 días
          </span>
        </div>

        <div className="space-y-2 bg-white px-4 py-3">
          {previewRows.map((row, index) => (
            <motion.div
              key={row.desc}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.26,
                delay: 0.14 + index * 0.06,
                ease: "easeOut",
              }}
              className="flex justify-between py-0.5 text-xs text-gray-600"
            >
              <span>{row.desc}</span>
              <span className="font-semibold text-gray-800">{row.total}</span>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.28,
              delay: 0.34,
              ease: "easeOut",
            }}
            className="space-y-1 border-t border-gray-100 pt-2 pb-1"
          >
            <div className="flex justify-between text-xs text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-800">$7,500</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>IVA 16%</span>
              <span className="font-semibold text-gray-800">$1,200</span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-2">
              <span className="text-xs font-bold text-gray-800">TOTAL</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.26,
                  delay: 0.42,
                  ease: "easeOut",
                }}
                className="rounded-lg bg-[#1B3D7A] px-3 py-1 text-xs font-bold text-white"
              >
                $8,700
              </motion.span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-2">
        {previewFeatures.map((feature) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.24,
              delay: 0.46,
              ease: "easeOut",
            }}
            className="rounded-xl border border-blue-200 bg-blue-50 py-2 text-center text-xs font-semibold text-[#1B3D7A]"
          >
            {feature}
          </motion.div>
        ))}
      </div>
    </div>
  )
}