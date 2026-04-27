"use client"

import { motion } from "framer-motion"

import type { SegmentacionCardData } from "../data/segmentacion.data"

import {
  segmentacionCardHover,
  segmentacionCardVariants,
} from "../animations/segmentacion.motion"
import styles from "../Segmentacion.module.css"

type SegmentacionCardProps = {
  card: SegmentacionCardData
}

export default function SegmentacionCard({ card }: SegmentacionCardProps) {
  return (
    <motion.article
      className={styles.segmentacionCard}
      variants={segmentacionCardVariants}
      whileHover={segmentacionCardHover}
    >
      <div className={styles.segmentacionCardContent}>
        <div className={styles.segmentacionIconWrap} aria-hidden="true">
          {card.icon}
        </div>

        <h3 className={styles.segmentacionCardTitle}>{card.title}</h3>

        <p className={styles.segmentacionCardDesc}>{card.description}</p>

        <span className={styles.segmentacionPill}>{card.pill}</span>
      </div>
    </motion.article>
  )
}
