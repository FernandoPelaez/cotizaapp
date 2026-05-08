"use client"

import { motion } from "framer-motion"
import {
  CARD_BORDER,
  CARD_EMPTY_BG,
  CARD_FOREGROUND,
  CARD_TEXT_MUTED,
  INNER_RADIUS,
} from "./recentQuotes.constants"

type RecentQuotesEmptyStateProps = {
  type: "today" | "end"
}

const EMPTY_STATE_CONTENT = {
  today: {
    title: "Sin cotizaciones de hoy",
    description: "Aquí aparecerán las creadas durante el día.",
    padding: "py-3",
  },
  end: {
    title: "No hay más cotizaciones por mostrar",
    description: "Enseguida vuelven a mostrarse las recientes.",
    padding: "py-4",
  },
} as const

export default function RecentQuotesEmptyState({
  type,
}: RecentQuotesEmptyStateProps) {
  const content = EMPTY_STATE_CONTENT[type]

  return (
    <motion.div
      className="mt-3 flex flex-1 items-center"
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.34, ease: "easeOut" }}
    >
      <div
        className={`w-full px-3 text-center ${content.padding}`}
        style={{
          background: CARD_EMPTY_BG,
          border: `1px dashed ${CARD_BORDER}`,
          borderRadius: INNER_RADIUS,
        }}
      >
        <p
          className="text-[11px] font-semibold"
          style={{ color: CARD_FOREGROUND }}
        >
          {content.title}
        </p>

        <p className="mt-0.5 text-[10px]" style={{ color: CARD_TEXT_MUTED }}>
          {content.description}
        </p>
      </div>
    </motion.div>
  )
}
