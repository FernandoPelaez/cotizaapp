"use client"

import { motion } from "framer-motion"

export default function ProUpsellDecorations() {
  return (
    <>
      <motion.div
        className="absolute inset-x-0 top-0 z-10"
        initial={{ opacity: 0, scaleX: 0.65 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.18,
        }}
        style={{
          height: 3,
          transformOrigin: "center",
          borderRadius: "28px 28px 0 0",
          background:
            "linear-gradient(90deg, transparent 0%, #D1DCF5 18%, #1B3D7A 50%, #D1DCF5 82%, transparent 100%)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.32 }}
        transition={{
          duration: 1.3,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.25,
        }}
        style={{
          top: -130,
          right: -110,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(27, 61, 122, 0.34) 0%, rgba(42, 82, 152, 0.18) 38%, transparent 68%)",
          filter: "blur(18px)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.24 }}
        transition={{
          duration: 1.45,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.38,
        }}
        style={{
          bottom: -110,
          left: -90,
          width: 340,
          height: 340,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.24) 0%, rgba(209, 220, 245, 0.22) 42%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.16, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.45,
        }}
        style={{
          top: 34,
          left: 42,
          width: 86,
          height: 86,
          borderRadius: 24,
          border: "1px solid rgba(27, 61, 122, 0.12)",
          background:
            "linear-gradient(135deg, rgba(238, 242, 250, 0.82), rgba(255, 255, 255, 0.18))",
          transform: "rotate(-10deg)",
        }}
      />
    </>
  )
}
