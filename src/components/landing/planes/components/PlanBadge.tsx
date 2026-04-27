"use client"

import { motion } from "framer-motion"

import { planBadgeVariants } from "../animations/planes.motion"
import styles from "../Planes.module.css"

type PlanBadgeType = "popular" | "premium"

type PlanBadgeProps = {
  type: PlanBadgeType
}

const badges = {
  popular: {
    className: styles.popularPill,
    icon: "★",
    label: "Más popular",
  },
  premium: {
    className: styles.premiumPill,
    icon: "◈",
    label: "Premium",
  },
}

export default function PlanBadge({ type }: PlanBadgeProps) {
  const badge = badges[type]

  return (
    <motion.div className={badge.className} variants={planBadgeVariants}>
      <span aria-hidden="true">{badge.icon}</span>
      <span>{badge.label}</span>
    </motion.div>
  )
}
