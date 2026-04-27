"use client"

import { motion } from "framer-motion"
import { quoteItems } from "../../data/preview.data"

export default function CardCrear() {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between bg-[#1B3D7A] px-4 py-3">
          <div className="text-sm font-bold text-white">COT-2026-047</div>
          <span className="rounded-full border border-amber-300 bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
            Borrador
          </span>
        </div>

        <div className="border-b border-gray-100 bg-[#EEF2FA] px-4 py-2">
          <span className="text-xs font-semibold text-[#1B3D7A]">
            Nueva cotización — 26/04/2026
          </span>
        </div>

        {/* Items */}
        <div className="space-y-2 bg-white px-4 py-3">
          {quoteItems.map((item, index) => (
            <motion.div
              key={item.desc}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.28,
                delay: 0.06 + index * 0.06,
                ease: "easeOut",
              }}
              className="flex justify-between py-0.5 text-xs text-gray-600"
            >
              <span>{item.desc}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400">×{item.qty}</span>
                <span className="font-semibold text-gray-800">{item.precio}</span>
              </div>
            </motion.div>
          ))}

          {/* Botón agregar */}
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, delay: 0.28, ease: "easeOut" }}
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg border border-dashed border-gray-300 py-1.5 text-[11px] font-semibold text-gray-500 transition-all hover:border-[#1B3D7A] hover:text-[#1B3D7A]"
          >
            + Agregar línea
          </motion.button>

          {/* Totales */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.36, ease: "easeOut" }}
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
                transition={{ duration: 0.26, delay: 0.44, ease: "easeOut" }}
                className="rounded-lg bg-[#1B3D7A] px-3 py-1 text-xs font-bold text-white"
              >
                $8,700
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}