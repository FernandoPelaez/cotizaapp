import type { Variants } from "framer-motion"

export const beneficiosBadgeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
}

export const beneficiosTitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      delay: 0.08,
    },
  },
}

export const beneficiosTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.16,
    },
  },
}

export const beneficioCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.96,
    filter: "blur(6px)",
  },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: 0.12 + index * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  hover: {
    y: -6,
    scale: 1.018,
    boxShadow: "0 18px 40px rgba(0, 0, 0, 0.16)",
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 22,
    },
  },
}

export const beneficioOverlayVariants: Variants = {
  rest: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
}

export const beneficioShimmerVariants: Variants = {
  rest: {
    x: "-120%",
    skewX: -20,
    opacity: 0,
  },
  hover: {
    x: "220%",
    skewX: -20,
    opacity: [0, 1, 0],
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
}

export const beneficioIconVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -4,
    scale: 1.08,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
}
