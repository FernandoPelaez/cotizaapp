"use client"

import { motion } from "framer-motion"
import { LockKeyhole } from "lucide-react"

export default function ResetPasswordIcon() {
  return (
    <motion.div
      className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.62,
      }}
      style={{
        background: "var(--primary-soft, #eef2fa)",
        borderColor: "var(--primary-light, #d1dcf5)",
        color: "var(--primary, #1B3D7A)",
      }}
    >
      <LockKeyhole className="h-6 w-6" strokeWidth={2.1} />
    </motion.div>
  )
}
