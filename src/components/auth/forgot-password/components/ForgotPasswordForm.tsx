"use client"

import { AnimatePresence, motion, type Variants } from "framer-motion"
import { Mail, Send } from "lucide-react"
import ForgotPasswordIcon from "./ForgotPasswordIcon"
import ForgotPasswordMessage from "./ForgotPasswordMessage"
import {
  FORGOT_PASSWORD_DESCRIPTION,
  FORGOT_PASSWORD_EMAIL_LABEL,
  FORGOT_PASSWORD_EMAIL_PLACEHOLDER,
  FORGOT_PASSWORD_SUBMIT_LABEL,
  FORGOT_PASSWORD_SUBMIT_LOADING_LABEL,
  FORGOT_PASSWORD_TITLE,
} from "../forgotPassword.constants"
import { useForgotPassword } from "../useForgotPassword"

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.18,
      staggerChildren: 0.1,
    },
  },
}

const contentVariants: Variants = {
  hidden: {
    opacity: 0.72,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function ForgotPasswordForm() {
  const { email, setEmail, message, messageType, loading, handleSubmit } =
    useForgotPassword()

  return (
    <motion.div
      className="rounded-3xl border p-8"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{
        background: "var(--card, #ffffff)",
        borderColor:
          "color-mix(in srgb, var(--border, #d1d5db) 70%, transparent)",
        boxShadow: "0 24px 60px rgba(27, 61, 122, 0.14)",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      <motion.div
        className="mb-6 flex flex-col items-center"
        variants={contentVariants}
      >
        <ForgotPasswordIcon />

        <h1
          className="mb-2 text-center text-2xl font-extrabold tracking-tight"
          style={{ color: "var(--foreground, #0f172a)" }}
        >
          {FORGOT_PASSWORD_TITLE}
        </h1>

        <p
          className="max-w-xs text-center text-sm leading-relaxed"
          style={{ color: "var(--text-muted, #64748b)" }}
        >
          {FORGOT_PASSWORD_DESCRIPTION}
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        variants={contentVariants}
      >
        <motion.div variants={contentVariants}>
          <label
            htmlFor="forgot-password-email"
            className="mb-1.5 block text-xs font-bold tracking-wide"
            style={{ color: "var(--foreground, #0f172a)" }}
          >
            {FORGOT_PASSWORD_EMAIL_LABEL}
          </label>

          <div className="relative">
            <Mail
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--text-muted, #64748b)" }}
            />

            <input
              id="forgot-password-email"
              type="email"
              placeholder={FORGOT_PASSWORD_EMAIL_PLACEHOLDER}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
          disabled={loading}
          variants={contentVariants}
          className="flex w-full items-center justify-center gap-2.5 rounded-full px-4 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-70"
          whileHover={loading ? undefined : { y: -1 }}
          whileTap={loading ? undefined : { scale: 0.985 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background:
              "linear-gradient(135deg, var(--primary, #1B3D7A) 0%, var(--primary-hover, #2A5298) 100%)",
            color: "#ffffff",
            boxShadow: loading ? "none" : "0 14px 28px rgba(27, 61, 122, 0.28)",
          }}
        >
          {loading ? (
            <>
              <motion.span
                className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {FORGOT_PASSWORD_SUBMIT_LOADING_LABEL}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {FORGOT_PASSWORD_SUBMIT_LABEL}
            </>
          )}
        </motion.button>
      </motion.form>

      <AnimatePresence mode="wait">
        {message ? (
          <ForgotPasswordMessage
            key={message}
            message={message}
            type={messageType}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}
