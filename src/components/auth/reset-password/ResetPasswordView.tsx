"use client"

import { motion } from "framer-motion"
import ResetPasswordBrand from "./components/ResetPasswordBrand"
import ResetPasswordForm from "./components/ResetPasswordForm"

type ResetPasswordViewProps = {
  token: string
}

export default function ResetPasswordView({ token }: ResetPasswordViewProps) {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
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

      <motion.div
        className="absolute bottom-[-140px] right-[-100px] h-80 w-80 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{
          duration: 2.4,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.4,
        }}
        style={{
          background: "var(--primary-hover, #2A5298)",
        }}
      />

      <motion.section
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 46 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.25,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.35,
        }}
      >
        <ResetPasswordBrand />
        <ResetPasswordForm token={token} />
      </motion.section>
    </main>
  )
}
