"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"

import { faqCardVariants, faqHeaderVariants } from "./animations/faq.motion"
import FAQDots from "./components/FAQDots"
import FAQItem from "./components/FAQItem"
import {
  FAQ_PER_PAGE,
  faqs,
  faqSectionContent,
} from "./data/faq.data"
import styles from "./FAQ.module.css"

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(faqs.length / FAQ_PER_PAGE)

  const currentFaqs = useMemo(() => {
    const start = page * FAQ_PER_PAGE
    return faqs.slice(start, start + FAQ_PER_PAGE)
  }, [page])

  const toggle = (index: number) => {
    setOpen((current) => (current === index ? null : index))
  }

  const goToPage = (nextPage: number) => {
    setPage(nextPage)
    setOpen(null)
  }

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.faqInner}>
        <motion.div
          className={styles.faqHeader}
          variants={faqHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className={styles.faqBadge}>{faqSectionContent.badge}</div>

          <h2 className={styles.faqTitle}>
            {faqSectionContent.title}{" "}
            <span>{faqSectionContent.highlight}</span>
          </h2>

          <p className={styles.faqSub}>{faqSectionContent.subtitle}</p>
        </motion.div>

        <motion.div
          variants={faqCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.22 }}
        >
          <div className={styles.faqCard}>
            <div className={styles.faqCol}>
              {currentFaqs.map((item, index) => {
                const realIndex = page * FAQ_PER_PAGE + index
                const isOpen = open === realIndex

                return (
                  <FAQItem
                    key={item.q}
                    item={item}
                    isOpen={isOpen}
                    showDivider={index < currentFaqs.length - 1}
                    onToggle={() => toggle(realIndex)}
                  />
                )
              })}
            </div>
          </div>

          <FAQDots
            totalPages={totalPages}
            currentPage={page}
            onChangePage={goToPage}
          />
        </motion.div>
      </div>
    </section>
  )
}
