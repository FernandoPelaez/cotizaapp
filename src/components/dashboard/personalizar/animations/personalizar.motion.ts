import type { Variants } from "framer-motion";

export const personalizarEase: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export const personalizarPageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: personalizarEase,
    },
  },
};

export const personalizarHeaderVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: personalizarEase,
      delay: 0.1,
    },
  },
};

export const personalizarLayoutVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.22,
      staggerChildren: 0.14,
    },
  },
};

export const personalizarSectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      delay: 0.14 + index * 0.12,
      ease: personalizarEase,
    },
  }),
};

export const personalizarCardsContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const personalizarCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.68,
      ease: personalizarEase,
    },
  },
};

export const personalizarPreviewVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: personalizarEase,
      delay: 0.28,
    },
  },
};

export const personalizarActionBarVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: personalizarEase,
      delay: 0.48,
    },
  },
};
