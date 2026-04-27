"use client"

import { motion } from "framer-motion"

import { previewTabs } from "../data/preview.data"
import { previewButtonVariants } from "../animations/preview.motion"
import styles from "../Preview.module.css"

type PreviewTabsProps = {
  active: number
  onChange: (index: number) => void
}

export default function PreviewTabs({ active, onChange }: PreviewTabsProps) {
  return (
    <div className={styles.tabs}>
      {previewTabs.map((tab, index) => {
        const isActive = active === index

        return (
          <div key={tab.title} className={styles.tabGroup}>
            <motion.button
              type="button"
              className={`${styles.tabButton} ${
                isActive ? styles.tabButtonActive : ""
              }`}
              onClick={() => onChange(index)}
              variants={previewButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              aria-current={isActive ? "step" : undefined}
            >
              <span className={styles.tabNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>{tab.title}</span>
            </motion.button>

            {index < previewTabs.length - 1 && (
              <span className={styles.tabConnector} aria-hidden="true" />
            )}
          </div>
        )
      })}
    </div>
  )
}
