"use client"

import { motion } from "framer-motion"

import {
  segmentacionHeaderVariants,
  segmentacionGridVariants,
} from "./animations/segmentacion.motion"
import SegmentacionCard from "./components/SegmentacionCard"
import {
  segmentacionCards,
  segmentacionSectionContent,
} from "./data/segmentacion.data"
import styles from "./Segmentacion.module.css"

export default function Segmentacion() {
  return (
    <section className={styles.segmentacionSection}>
      <div className={styles.segmentacionInner}>
        <motion.div
          className={styles.segmentacionHeader}
          variants={segmentacionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className={styles.segmentacionBadge}>
            {segmentacionSectionContent.badge}
          </div>

          <h2 className={styles.segmentacionTitle}>
            {segmentacionSectionContent.title}
            <br />
            <span>{segmentacionSectionContent.highlight}</span>
          </h2>

          <p className={styles.segmentacionSub}>
            {segmentacionSectionContent.subtitle}
          </p>
        </motion.div>

        <motion.div
          className={styles.segmentacionGrid}
          variants={segmentacionGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {segmentacionCards.map((card) => (
            <SegmentacionCard key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
