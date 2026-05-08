import type { Variants } from "framer-motion"

export const plantillasEase: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
]

export const plantillasPageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      ease: plantillasEase,
      when: "beforeChildren",
    },
  },
}

export const plantillasHeaderVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(5px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.58,
      ease: plantillasEase,
      delay: 0.08,
    },
  },
}

export const plantillasGridVariants: Variants = {
  hidden: {
    opacity: 1,
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.16,
      staggerChildren: 0.09,
    },
  },
}

export const plantillasCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.56,
      ease: plantillasEase,
    },
  },
}
