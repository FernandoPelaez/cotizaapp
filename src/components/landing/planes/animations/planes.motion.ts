import type { TargetAndTransition, Variants } from "framer-motion"

export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const planesHeaderVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.78,
      ease: easeOut,
    },
  },
}

export const planesNoteVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      delay: 0.18,
      ease: easeOut,
    },
  },
}

export const planesGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.16,
    },
  },
}

export const planCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.99,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.74,
      ease: easeOut,
    },
  },
}

export const planCardHover: TargetAndTransition = {
  y: -5,
  scale: 1.006,
  transition: {
    type: "spring",
    stiffness: 220,
    damping: 24,
  },
}

export const planBadgeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: -4,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 210,
      damping: 18,
      delay: 0.16,
    },
  },
}

export const planFeaturesContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.18,
    },
  },
}

export const planFeatureItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -5,
    filter: "blur(1.5px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: easeOut,
    },
  },
}

export const planButtonTap: TargetAndTransition = {
  scale: 0.99,
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 24,
  },
}
