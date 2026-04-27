"use client"

import { AnimatePresence, motion } from "framer-motion"

import { previewSteps, previewTabs } from "../data/preview.data"
import {
  previewButtonVariants,
  previewStepChangeVariants,
  previewTextPanelVariants,
} from "../animations/preview.motion"
import styles from "../Preview.module.css"

type PreviewStepTextProps = {
  active: number
  onPrevious: () => void
  onNext: () => void
}

export default function PreviewStepText({
  active,
  onPrevious,
  onNext,
}: PreviewStepTextProps) {
  const currentStep = previewSteps[active]
  const isFirstStep = active === 0
  const isLastStep = active === previewSteps.length - 1

  return (
    <motion.div
      className={styles.stepTextPanel}
      variants={previewTextPanelVariants}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.title}
          variants={previewStepChangeVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className={styles.stepTextInner}
        >
          <div className={styles.stepMeta}>
            <span className={styles.stepNumber}>{active + 1}</span>

            <span className={styles.stepLabel}>
              Paso {active + 1} de {previewTabs.length}
            </span>
          </div>

          <h3 className={styles.stepTitle}>{currentStep.title}</h3>

          <p className={styles.stepDescription}>{currentStep.desc}</p>

          <div className={styles.stepActions}>
            {!isFirstStep && (
              <motion.button
                type="button"
                className={`${styles.navButton} ${styles.navButtonOutline}`}
                onClick={onPrevious}
                variants={previewButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                ← Anterior
              </motion.button>
            )}

            <motion.button
              type="button"
              className={`${styles.navButton} ${styles.navButtonFilled}`}
              onClick={onNext}
              variants={previewButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {isLastStep ? "Empezar gratis →" : "Siguiente →"}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
