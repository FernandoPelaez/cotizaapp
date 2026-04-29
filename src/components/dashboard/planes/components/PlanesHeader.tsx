"use client"

import { motion, type Variants } from "framer-motion"

const headerEase: [number, number, number, number] = [0.19, 1, 0.22, 1]

const headerContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
    },
  },
}

const headerTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: headerEase,
    },
  },
}

export default function PlanesHeader() {
  return (
    <motion.div
      className="space-y-2"
      variants={headerContainerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        className="text-2xl font-bold tracking-tight md:text-3xl"
        variants={headerTextVariants}
        style={{ color: "var(--foreground)" }}
      >
        Elige tu plan
      </motion.h1>

      <motion.p
        className="max-w-2xl text-sm leading-relaxed md:text-[15px]"
        variants={headerTextVariants}
        style={{ color: "var(--text-muted)" }}
      >
        Comienza gratis y mejora tu plan cuando necesites más plantillas,
        cotizaciones y funciones para tu negocio.
      </motion.p>
    </motion.div>
  )
}
