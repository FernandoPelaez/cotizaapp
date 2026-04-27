import type { TargetAndTransition, Variants } from "framer-motion"

export const footerEaseOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const footerHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: footerEaseOut },
  },
}

export const footerLeftVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: footerEaseOut },
  },
}

export const footerCardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, delay: 0.75, ease: footerEaseOut },
  },
}

export const footerBottomVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 1.4, ease: footerEaseOut },
  },
}

export const footerButtonHover: TargetAndTransition = {}
export const footerButtonTap: TargetAndTransition = {}
export const footerHighlightContainerVariants: Variants = { hidden: {}, visible: {} }
export const footerHighlightVariants: Variants = { hidden: {}, visible: {} }
