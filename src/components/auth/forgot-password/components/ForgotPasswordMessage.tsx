"use client"

import { AlertCircle, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import type { ForgotPasswordMessageType } from "../useForgotPassword"

type ForgotPasswordMessageProps = {
  message: string
  type: ForgotPasswordMessageType
}

export default function ForgotPasswordMessage({
  message,
  type,
}: ForgotPasswordMessageProps) {
  if (!message) return null

  const isSuccess = type === "success"

  return (
    <motion.div
      className="mt-4 flex items-start gap-2 rounded-xl border px-4 py-3 text-xs font-medium"
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      style={{
        background: isSuccess ? "#ecfdf5" : "#fef2f2",
        borderColor: isSuccess ? "#bbf7d0" : "#fecaca",
        color: isSuccess ? "#047857" : "#b91c1c",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      )}

      <span>{message}</span>
    </motion.div>
  )
}
