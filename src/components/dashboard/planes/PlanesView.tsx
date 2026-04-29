
"use client"

import { motion } from "framer-motion"

import type { DashboardPlanId } from "@/lib/dashboard/plans"

import {
  planesCardsGridVariants,
  planesFooterNoteVariants,
  planesHeaderVariants,
  planesPageVariants,
} from "./animations/planes.motion"
import PlanesCardsGrid from "./components/PlanesCardsGrid"
import PlanesFooterNote from "./components/PlanesFooterNote"
import PlanesHeader from "./components/PlanesHeader"

type PlanesViewProps = {
  currentPlanId?: DashboardPlanId
}

export default function PlanesView({
  currentPlanId = "free",
}: PlanesViewProps) {
  return (
    <motion.section
      className="space-y-8"
      style={{ fontFamily: "'Sora', sans-serif" }}
      variants={planesPageVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={planesHeaderVariants}>
        <PlanesHeader />
      </motion.div>

      <motion.div variants={planesCardsGridVariants}>
        <PlanesCardsGrid currentPlanId={currentPlanId} />
      </motion.div>

      <motion.div variants={planesFooterNoteVariants}>
        <PlanesFooterNote />
      </motion.div>
    </motion.section>
  )
}
