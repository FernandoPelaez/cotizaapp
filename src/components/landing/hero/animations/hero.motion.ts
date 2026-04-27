import type { Variants } from "framer-motion"

export const heroLeftVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
}

export const heroLeftItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
}

export const heroPreviewVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: "easeOut",
      delay: 0.9,
    },
  },
}

export const templateCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
      delay: 1.1 + index * 0.15,
    },
  }),
}
