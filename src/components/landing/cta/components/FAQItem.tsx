"use client"

import { AnimatePresence, motion } from "framer-motion"

import type { FAQItemData } from "../data/faq.data"

import {
  faqAnswerVariants,
  faqIconActive,
  faqIconInactive,
  faqItemVariants,
} from "../animations/faq.motion"
import styles from "../FAQ.module.css"

type FAQItemProps = {
  item: FAQItemData
  isOpen: boolean
  showDivider: boolean
  onToggle: () => void
}

export default function FAQItem({
  item,
  isOpen,
  showDivider,
  onToggle,
}: FAQItemProps) {
  return (
    <motion.div
      variants={faqItemVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`${styles.faqItem} ${isOpen ? styles.active : ""}`}>
        <button className={styles.faqTrigger} type="button" onClick={onToggle}>
          <span className={styles.faqQuestion}>{item.q}</span>

          <motion.span
            className={styles.faqIcon}
            animate={isOpen ? faqIconActive : faqIconInactive}
            aria-hidden="true"
          >
            +
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              className={styles.faqBody}
              variants={faqAnswerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.faqBodyInner}>
                <p className={styles.faqAnswer}>{item.a}</p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {showDivider ? <div className={styles.faqDivider} /> : null}
    </motion.div>
  )
}