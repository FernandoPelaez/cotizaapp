import type { TargetAndTransition, Variants } from "framer-motion"

export const segmentacionEaseOut: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
]

export const segmentacionHeaderVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: segmentacionEaseOut,
    },
  },
}

export const segmentacionGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
}

export const segmentacionCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: segmentacionEaseOut,
    },
  },
}

export const segmentacionCardHover: TargetAndTransition = {
  y: -8,
  transition: {
    type: "spring",
    stiffness: 280,
    damping: 22,
  },
}
