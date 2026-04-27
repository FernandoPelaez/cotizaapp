"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import {
  previewContentVariants,
  previewHeaderVariants,
  previewTabsVariants,
} from "./animations/preview.motion"
import { previewTabs } from "./data/preview.data"
import PreviewMockup from "./components/PreviewMockup"
import PreviewStepText from "./components/PreviewStepText"
import PreviewTabs from "./components/PreviewTabs"
import styles from "./Preview.module.css"

export default function Preview() {
  const [active, setActive] = useState(0)

  const handlePrevious = () => {
    setActive((current) => Math.max(current - 1, 0))
  }

  const handleNext = () => {
    setActive((current) => {
      if (current >= previewTabs.length - 1) {
        window.location.href = "/auth/register"
        return current
      }

      return current + 1
    })
  }

  return (
    <section className={styles.section} id="preview">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={previewHeaderVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className={styles.badge}>Funcionalidades</span>

          <h2 className={styles.title}>
            Así funcionan las{" "}
            <span className={styles.titleAccent}>funcionalidades</span>
          </h2>

          <p className={styles.subtitle}>
            Un proceso claro para crear, personalizar y enviar cotizaciones sin
            complicaciones.
          </p>

          <motion.div
            variants={previewTabsVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <PreviewTabs active={active} onChange={setActive} />
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.contentGrid}
          variants={previewContentVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <PreviewStepText
            active={active}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />

          <PreviewMockup active={active} />
        </motion.div>

        <div className={styles.dots}>
          {previewTabs.map((tab, index) => {
            const isActive = active === index

            return (
              <button
                key={tab.title}
                type="button"
                onClick={() => setActive(index)}
                className={`${styles.dot} ${isActive ? styles.dotActive : ""}`}
                aria-label={`Ir al paso ${index + 1}: ${tab.title}`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
