"use client"

import { motion } from "framer-motion"

type RecentQuotesDotsProps = {
  total: number
  activeIndex: number
}

export default function RecentQuotesDots({
  total,
  activeIndex,
}: RecentQuotesDotsProps) {
  if (total <= 1) return null

  return (
    <div className="flex justify-center gap-1 pt-1">
      {Array.from({ length: total }).map((_, index) => (
        <motion.span
          key={index}
          className="h-1.5 rounded-full"
          animate={{
            width: index === activeIndex ? 14 : 6,
          }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          style={{
            background:
              index === activeIndex
                ? "var(--primary, #1b3d7a)"
                : "color-mix(in srgb, var(--border, #d1d5db) 75%, transparent)",
          }}
        />
      ))}
    </div>
  )
}
