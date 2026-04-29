import type { Variants } from "framer-motion"

export const plantillasEase: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
]

export const plantillasPageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: plantillasEase,
    },
  },
}

export const plantillasHeaderVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: plantillasEase,
      delay: 0.1,
    },
  },
}

export const plantillasGridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.22,
      staggerChildren: 0.14,
    },
  },
}

export const plantillasCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.68,
      ease: plantillasEase,
    },
  },
}
