import type { TargetAndTransition, Variants } from "framer-motion"

export const faqEaseOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const faqHeaderVariants: Variants = {
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
      duration: 0.62,
      ease: faqEaseOut,
    },
  },
}

export const faqCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.66,
      delay: 0.1,
      ease: faqEaseOut,
    },
  },
}

export const faqItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.99,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.38,
      ease: faqEaseOut,
    },
  },
}

export const faqAnswerVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    y: -2,
  },
  visible: {
    height: "auto",
    opacity: 1,
    y: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: faqEaseOut,
      },
      opacity: {
        duration: 0.2,
        delay: 0.04,
      },
      y: {
        duration: 0.2,
        ease: faqEaseOut,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    y: -2,
    transition: {
      height: {
        duration: 0.24,
        ease: faqEaseOut,
      },
      opacity: {
        duration: 0.14,
      },
      y: {
        duration: 0.14,
        ease: faqEaseOut,
      },
    },
  },
}

export const faqIconActive: TargetAndTransition = {
  rotate: 45,
  scale: 1.03,
  transition: {
    type: "spring",
    stiffness: 240,
    damping: 22,
  },
}

export const faqIconInactive: TargetAndTransition = {
  rotate: 0,
  scale: 1,
  transition: {
    type: "spring",
    stiffness: 240,
    damping: 24,
  },
}
