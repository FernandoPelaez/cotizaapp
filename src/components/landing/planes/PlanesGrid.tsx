"use client"

import { motion, type TargetAndTransition, type Variants } from "framer-motion"

import PlanCard from "./PlanCard"
import { landingPlans } from "@/features/landing/planes/landing-plans.data"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.25,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOut },
  },
}

const hoverLift: TargetAndTransition = {
  y: -8,
  transition: {
    type: "spring",
    stiffness: 280,
    damping: 20,
  },
}

export default function PlanesGrid() {
  return (
    <motion.div
      className="planes-grid"
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {landingPlans.map((plan) => (
        <motion.div
          key={plan.id}
          className="plan-wrap"
          variants={cardVariants}
          whileHover={hoverLift}
        >
          <PlanCard plan={plan} />
        </motion.div>
      ))}
    </motion.div>
  )
}
