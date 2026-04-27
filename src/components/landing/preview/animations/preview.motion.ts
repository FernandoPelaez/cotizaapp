import type { Variants } from "framer-motion"

export const previewHeaderVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const previewTabsVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      delay: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const previewContentVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.45,
      staggerChildren: 0.22,
    },
  },
}

export const previewTextPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.05,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const previewMockupPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 28,
    scale: 0.97,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hover: {
    y: -3,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 28,
    },
  },
}

export const previewStepChangeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.985,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.985,
    transition: {
      duration: 0.38,
      ease: "easeInOut",
    },
  },
}

export const previewButtonVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.025,
    y: -1,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 26,
    },
  },
  tap: {
    scale: 0.97,
  },
}