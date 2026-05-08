"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Check, LockKeyhole } from "lucide-react"
import ResetPasswordIcon from "./ResetPasswordIcon"
import ResetPasswordMessage from "./ResetPasswordMessage"
import {
  RESET_PASSWORD_DESCRIPTION,
  RESET_PASSWORD_INPUT_LABEL,
  RESET_PASSWORD_INPUT_PLACEHOLDER,
  RESET_PASSWORD_SUBMIT_LABEL,
  RESET_PASSWORD_SUBMIT_LOADING_LABEL,
  RESET_PASSWORD_TITLE,
} from "../resetPassword.constants"
import { useResetPassword } from "../useResetPassword"

type ResetPasswordFormProps = {
  token: string
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const {
    password,
    setPassword,
    message,
    messageType,
    loading,
    canSubmit,
    handleSubmit,
  } = useResetPassword(token)

  return (
    <motion.div
      className="rounded-3xl border p-8"
      initial={{ opacity: 0, y: 42 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.45,
      }}
      style={{
        background: "var(--card, #ffffff)",
        borderColor:
          "color-mix(in srgb, var(--border, #d1d5db) 70%, transparent)",
        boxShadow: "0 24px 60px rgba(27, 61, 122, 0.14)",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      <div className="mb-8 flex flex-col items-center">
        <ResetPasswordIcon />

        <motion.h1
          className="mb-2 text-center text-2xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.76,
          }}
          style={{ color: "var(--foreground, #0f172a)" }}
        >
          {RESET_PASSWORD_TITLE}
        </motion.h1>

        <motion.p
          className="max-w-xs text-center text-sm leading-relaxed"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.9,
          }}
          style={{ color: "var(--text-muted, #64748b)" }}
        >
          {RESET_PASSWORD_DESCRIPTION}
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1],
            delay: 1.08,
          }}
        >
          <label
            htmlFor="reset-password-input"
            className="mb-1.5 block text-xs font-bold tracking-wide"
            style={{ color: "var(--foreground, #0f172a)" }}
          >
            {RESET_PASSWORD_INPUT_LABEL}
          </label>

          <div className="relative">
            <LockKeyhole
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--text-muted, #64748b)" }}
            />

            <input
              id="reset-password-input"
              type="password"
              placeholder={RESET_PASSWORD_INPUT_PLACEHOLDER}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading}
              className="w-full rounded-xl px-10 py-3 text-sm font-medium outline-none transition disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background: "var(--background, #e5e5e5)",
                border: "1.5px solid var(--border, #d1d5db)",
                color: "var(--foreground, #0f172a)",
              }}
              onFocus={(event) => {
                event.currentTarget.style.borderColor =
                  "var(--primary, #1B3D7A)"
                event.currentTarget.style.boxShadow =
                  "0 0 0 4px rgba(27, 61, 122, 0.12)"
                event.currentTarget.style.background = "var(--card, #ffffff)"
              }}
              onBlur={(event) => {
                event.currentTarget.style.borderColor =
                  "var(--border, #d1d5db)"
                event.currentTarget.style.boxShadow = "none"
                event.currentTarget.style.background =
                  "var(--background, #e5e5e5)"
              }}
            />
          </div>
        </motion.div>

        <motion.button
          type="submit"
          disabled={!canSubmit || loading}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1],
            delay: 1.24,
          }}
          whileHover={!canSubmit || loading ? undefined : { y: -1 }}
          whileTap={!canSubmit || loading ? undefined : { scale: 0.985 }}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-70"
          style={{
            background:
              !canSubmit || loading
                ? "var(--primary-light, #d1dcf5)"
                : "linear-gradient(135deg, var(--primary, #1B3D7A) 0%, var(--primary-hover, #2A5298) 100%)",
            color: !canSubmit || loading ? "var(--primary, #1B3D7A)" : "#ffffff",
            boxShadow:
              !canSubmit || loading
                ? "none"
                : "0 14px 28px rgba(27, 61, 122, 0.28)",
          }}
        >
          {loading ? (
            <>
              <motion.span
                className="h-4 w-4 rounded-full border-2 border-current/30 border-t-current"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {RESET_PASSWORD_SUBMIT_LOADING_LABEL}
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              {RESET_PASSWORD_SUBMIT_LABEL}
            </>
          )}
        </motion.button>
      </form>

      <AnimatePresence mode="wait">
        {message ? (
          <ResetPasswordMessage
            key={message}
            message={message}
            type={messageType}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}
