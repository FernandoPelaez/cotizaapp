"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import {
  CARD_BORDER,
  CARD_CHEVRON,
  CARD_FOREGROUND,
  CARD_ITEM_HOVER_BG,
  CARD_ITEM_HOVER_BORDER,
  CARD_TEXT_MUTED,
  CHIP_RADIUS,
  INNER_RADIUS,
} from "./recentQuotes.constants"
import {
  formatQuoteNumber,
  getStatusStyle,
  type RecentQuoteItem as RecentQuote,
} from "./recentQuotes.utils"

type RecentQuoteItemProps = {
  cotizacion: RecentQuote
  index: number
}

export default function RecentQuoteItem({
  cotizacion,
  index,
}: RecentQuoteItemProps) {
  const status = getStatusStyle(cotizacion.estado)

  return (
    <motion.div
      className="flex items-center justify-between px-3 py-1.5 transition-colors duration-200"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      whileHover={{ y: -1, scale: 1.01 }}
      transition={{
        duration: 0.28,
        ease: "easeOut",
        delay: index * 0.06,
      }}
      style={{
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: INNER_RADIUS,
        background: "transparent",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.border = `1px solid ${CARD_ITEM_HOVER_BORDER}`
        event.currentTarget.style.background = CARD_ITEM_HOVER_BG
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.border = `1px solid ${CARD_BORDER}`
        event.currentTarget.style.background = "transparent"
      }}
    >
      <div className="min-w-0 flex-1 pr-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className="shrink-0 text-[9px] font-extrabold uppercase tracking-wide"
            style={{ color: CARD_TEXT_MUTED }}
          >
            {formatQuoteNumber(cotizacion.numero, index)}
          </span>

          <span
            className="inline-flex shrink-0 px-1.5 py-0.5 text-[8px] font-semibold"
            style={{
              background: status.background,
              color: status.color,
              borderRadius: CHIP_RADIUS,
            }}
          >
            {status.label}
          </span>
        </div>

        <p
          className="mt-0.5 truncate text-[11px] font-semibold leading-tight"
          style={{ color: CARD_FOREGROUND }}
        >
          {cotizacion.nombre}
        </p>

        <p
          className="mt-0.5 truncate text-[9px]"
          style={{ color: CARD_TEXT_MUTED }}
        >
          {cotizacion.tiempoRelativo ?? cotizacion.fecha}
        </p>
      </div>

      <motion.div
        animate={{ x: [0, 2, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="shrink-0"
      >
        <ArrowRight className="h-3.5 w-3.5" style={{ color: CARD_CHEVRON }} />
      </motion.div>
    </motion.div>
  )
}
