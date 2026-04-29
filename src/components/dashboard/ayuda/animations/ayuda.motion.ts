import type { Variants } from "framer-motion";

export const ayudaEase: [number, number, number, number] = [0.19, 1, 0.22, 1];

export const chatShellVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.68, ease: ayudaEase },
  },
};

export const chatBodyVariants: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.22, staggerChildren: 0.08 },
  },
};

export const fadeUpItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.46, ease: ayudaEase },
  },
};

export const chipVariants: Variants = {
  hidden: { opacity: 0, y: 7, scale: 0.96 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.42, ease: ayudaEase },
  },
};

export const messageVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.34, ease: ayudaEase },
  },
  exit: {
    opacity: 0, y: 4, scale: 0.98,
    transition: { duration: 0.2, ease: ayudaEase },
  },
};

export const typingDotVariants: Variants = {
  animate: {
    y: [0, -4, 0],
    opacity: [0.45, 1, 0.45],
    transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
  },
};
