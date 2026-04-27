"use client"

import type { CSSProperties } from "react"
import { motion } from "framer-motion"

import {
  planesHeaderVariants,
  planesNoteVariants,
} from "./animations/planes.motion"
import PlanesGrid from "./components/PlanesGrid"
import { planesSectionContent } from "./data/planes.data"
import styles from "./Planes.module.css"

const decorativeCircles: CSSProperties[] = [
  {
    width: 400,
    height: 400,
    top: -110,
    right: -90,
  },
  {
    width: 240,
    height: 240,
    bottom: -60,
    left: -50,
  },
  {
    width: 160,
    height: 160,
    top: "38%",
    left: "43%",
  },
]

export default function Planes() {
  return (
    <section className={styles.planesSection} id="planes">
      {decorativeCircles.map((circle, index) => (
        <div
          key={`planes-deco-${index}`}
          className={styles.decoCircle}
          style={circle}
          aria-hidden="true"
        />
      ))}

      <div className={styles.planesInner}>
        <motion.div
          className={styles.planesHeader}
          variants={planesHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className={styles.planesBadge}>
            {planesSectionContent.badge}
          </div>

          <h2 className={styles.planesTitle}>
            {planesSectionContent.title}
          </h2>

          <p className={styles.planesSub}>
            {planesSectionContent.subtitle}
          </p>
        </motion.div>

        <PlanesGrid />

        <motion.p
          className={styles.planesNote}
          variants={planesNoteVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {planesSectionContent.note}
        </motion.p>
      </div>
    </section>
  )
}
