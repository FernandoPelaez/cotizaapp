"use client"

import styles from "../FAQ.module.css"

type FAQDotsProps = {
  totalPages: number
  currentPage: number
  onChangePage: (page: number) => void
}

export default function FAQDots({
  totalPages,
  currentPage,
  onChangePage,
}: FAQDotsProps) {
  return (
    <div className={styles.faqDots}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={`${styles.faqDot} ${
            currentPage === index ? styles.activeDot : ""
          }`}
          onClick={() => onChangePage(index)}
          aria-label={`Ver página ${index + 1} de preguntas frecuentes`}
        />
      ))}
    </div>
  )
}
