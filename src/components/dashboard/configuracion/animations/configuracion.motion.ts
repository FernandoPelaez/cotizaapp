import type { Variants } from "framer-motion";

export const configuracionEase: [number, number, number, number] = [
  0.19, 1, 0.22, 1,
];

export const pageContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: configuracionEase,
    },
  },
};

export const cardsContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.3,
    },
  },
};

export const cardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    scale: 0.985,
    filter: "blur(5px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: configuracionEase,
    },
  },
};

export const emailPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -6,
    filter: "blur(3px)",
  },
  show: {
    opacity: 1,
    height: "auto",
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.44,
      ease: configuracionEase,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -4,
    filter: "blur(3px)",
    transition: {
      duration: 0.28,
      ease: configuracionEase,
    },
  },
};

export const modalOverlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: configuracionEase,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.24,
      ease: configuracionEase,
    },
  },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.97,
    filter: "blur(5px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.46,
      ease: configuracionEase,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    filter: "blur(4px)",
    transition: {
      duration: 0.26,
      ease: configuracionEase,
    },
  },
};

export const toastVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.97,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.36,
      ease: configuracionEase,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    filter: "blur(3px)",
    transition: {
      duration: 0.22,
      ease: configuracionEase,
    },
  },
};
