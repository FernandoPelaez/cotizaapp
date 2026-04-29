import type { Variants } from "framer-motion"

export const cotizacionesEase: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
]

export const cotizacionesPageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: cotizacionesEase,
    },
  },
}

export const cotizacionesHeaderVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: cotizacionesEase,
    },
  },
}

export const cotizacionesMainLayoutVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.09,
    },
  },
}

export const cotizacionesPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 7,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: cotizacionesEase,
    },
  },
}

export const cotizacionesStatsGridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.07,
    },
  },
}

export const cotizacionesStatsCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
      ease: cotizacionesEase,
    },
  },
}

export const cotizacionesNoticeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: cotizacionesEase,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.2,
      ease: cotizacionesEase,
    },
  },
}
