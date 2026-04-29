import type { Variants } from "framer-motion"

export const planesEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const planesPageVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0,
    },
  },
}

export const planesHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: planesEase },
  },
}


export const planesCardsGridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.55,   
      staggerChildren: 0.12,
    },
  },
}

export const planesCardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: planesEase },
  },
}

export const planesFooterNoteVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 1.45, ease: planesEase },
  },
}
