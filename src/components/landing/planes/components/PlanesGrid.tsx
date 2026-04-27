"use client"

import { motion } from "framer-motion"

import {
  planCardHover,
  planCardVariants,
  planesGridVariants,
} from "../animations/planes.motion"
import { landingPlans } from "../data/planes.data"
import styles from "../Planes.module.css"
import PlanCard from "./PlanCard"

export default function PlanesGrid() {
  return (
    <motion.div
      className={styles.planesGrid}
      variants={planesGridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
    >
      {landingPlans.map((plan) => (
        <motion.div
          key={plan.id}
          className={styles.planWrap}
          variants={planCardVariants}
          whileHover={planCardHover}
        >
          <PlanCard plan={plan} />
        </motion.div>
      ))}
    </motion.div>
  )
}
