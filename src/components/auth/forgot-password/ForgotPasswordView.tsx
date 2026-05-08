"use client"

import { motion } from "framer-motion"
import ForgotPasswordBrand from "./components/ForgotPasswordBrand"
import ForgotPasswordForm from "./components/ForgotPasswordForm"

export default function ForgotPasswordView() {
  return (
    <main
      className="relative flex h-screen items-center justify-center overflow-hidden px-4"
      style={{
        background:
          "linear-gradient(180deg, var(--primary-soft, #eef2fa) 0%, var(--background, #e5e5e5) 46%, var(--background, #e5e5e5) 100%)",
      }}
    >
      <motion.div
        className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.16 }}
        transition={{
          duration: 2.2,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2,
        }}
        style={{
          background: "var(--primary, #1B3D7A)",
        }}
      />

      <motion.section
        className="relative z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 44 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.25,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.35,
        }}
      >
        <ForgotPasswordBrand />
        <ForgotPasswordForm />
      </motion.section>
    </main>
  )
}
