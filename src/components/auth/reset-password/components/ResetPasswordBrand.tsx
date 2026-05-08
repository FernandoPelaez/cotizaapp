"use client"

import { motion } from "framer-motion"
import { BRAND_NAME } from "../resetPassword.constants"

export default function ResetPasswordBrand() {
  return (
    <motion.div
      className="mb-8 flex justify-center"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.25,
      }}
    >
      <div
        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm"
        style={{
          background: "var(--card, #ffffff)",
          borderColor: "var(--border, #d1d5db)",
        }}
      >
        <motion.span
          className="h-2 w-2 rounded-full"
          animate={{
            scale: [1, 1.22, 1],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "var(--primary, #1B3D7A)",
          }}
        />

        <span
          className="text-sm font-bold tracking-tight"
          style={{
            color: "var(--foreground, #0f172a)",
            fontFamily: "'Sora', sans-serif",
          }}
        >
          {BRAND_NAME}
        </span>
      </div>
    </motion.div>
  )
}
