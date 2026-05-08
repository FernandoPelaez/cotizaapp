"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import { FileClock } from "lucide-react"
import RecentQuoteItem from "./recent-quotes/RecentQuoteItem"
import RecentQuotesDots from "./recent-quotes/RecentQuotesDots"
import RecentQuotesEmptyState from "./recent-quotes/RecentQuotesEmptyState"
import {
  CARD_BACKGROUND,
  CARD_BORDER,
  CARD_FOREGROUND,
  CARD_ICON_BG,
  CARD_ICON_TEXT,
  CARD_RADIUS,
  CARD_SHADOW,
  CARD_TEXT_MUTED,
  ROTATION_INTERVAL_MS,
} from "./recent-quotes/recentQuotes.constants"
import {
  createQuoteGroups,
  getTodayQuotes,
  type RecentQuoteItem as RecentQuote,
} from "./recent-quotes/recentQuotes.utils"

type RecentQuotesCardProps = {
  cotizaciones?: RecentQuote[]
}

const RECENT_QUOTES_EASE: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
]

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: RECENT_QUOTES_EASE,
      when: "beforeChildren",
      staggerChildren: 0.07,
    },
  },
}

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 4,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: RECENT_QUOTES_EASE,
    },
  },
}

const quotesGroupVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: RECENT_QUOTES_EASE,
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -3,
    transition: {
      duration: 0.24,
      ease: "easeOut",
    },
  },
}

const quoteItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 4,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.46,
      ease: RECENT_QUOTES_EASE,
    },
  },
}

const dotsVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 3,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: RECENT_QUOTES_EASE,
      delay: 0.08,
    },
  },
}

export default function RecentQuotesCard({
  cotizaciones = [],
}: RecentQuotesCardProps) {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0)

  const todayQuotes = useMemo(() => {
    return getTodayQuotes(cotizaciones)
  }, [cotizaciones])

  const quoteGroups = useMemo(() => {
    return createQuoteGroups(todayQuotes)
  }, [todayQuotes])

  const quoteGroupsLength = quoteGroups.length
  const todayQuotesLength = todayQuotes.length
  const resetKey = `${quoteGroupsLength}-${todayQuotesLength}`
  const activeGroup = quoteGroups[activeGroupIndex] ?? quoteGroups[0]

  useEffect(() => {
    setActiveGroupIndex((currentIndex) => {
      return currentIndex === 0 ? currentIndex : 0
    })
  }, [resetKey])

  useEffect(() => {
    if (quoteGroupsLength <= 1) return

    const interval = window.setInterval(() => {
      setActiveGroupIndex((currentIndex) => {
        return (currentIndex + 1) % quoteGroupsLength
      })
    }, ROTATION_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [quoteGroupsLength])

  return (
    <motion.article
      className="flex h-[184px] w-full flex-col p-4"
      variants={cardVariants}
      initial="hidden"
      animate="show"
      style={{
        background: CARD_BACKGROUND,
        border: `1px solid ${CARD_BORDER}`,
        boxShadow: CARD_SHADOW,
        borderRadius: CARD_RADIUS,
        willChange: "opacity, transform",
      }}
    >
      <motion.div className="flex items-start gap-2" variants={headerVariants}>
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center"
          style={{
            background: CARD_ICON_BG,
            borderRadius: "12px",
            boxShadow: "0 10px 18px rgba(27,61,122,0.14)",
          }}
        >
          <FileClock className="h-4 w-4" style={{ color: CARD_ICON_TEXT }} />
        </div>

        <div className="min-w-0">
          <h3
            className="text-[12px] font-bold leading-tight"
            style={{ color: CARD_FOREGROUND }}
          >
            Cotizaciones recientes
          </h3>

          <p className="mt-0.5 text-[10px]" style={{ color: CARD_TEXT_MUTED }}>
            Movimientos de hoy
          </p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {todayQuotesLength === 0 ? (
          <motion.div
            key="empty-today"
            variants={quotesGroupVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-1"
          >
            <RecentQuotesEmptyState type="today" />
          </motion.div>
        ) : activeGroup?.type === "empty" ? (
          <motion.div
            key={`empty-group-${activeGroupIndex}`}
            variants={quotesGroupVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-1"
          >
            <RecentQuotesEmptyState type="end" />
          </motion.div>
        ) : (
          <motion.div
            key={`quotes-group-${activeGroupIndex}`}
            className="mt-3 flex flex-1 flex-col justify-center space-y-2 overflow-hidden"
            variants={quotesGroupVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {activeGroup?.items.map((cotizacion, index) => (
              <motion.div
                key={`${String(
                  cotizacion.id ?? cotizacion.numero ?? "cotizacion"
                )}-${activeGroupIndex}-${index}`}
                variants={quoteItemVariants}
              >
                <RecentQuoteItem cotizacion={cotizacion} index={index} />
              </motion.div>
            ))}

            <motion.div variants={dotsVariants}>
              <RecentQuotesDots
                total={quoteGroupsLength}
                activeIndex={activeGroupIndex}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
