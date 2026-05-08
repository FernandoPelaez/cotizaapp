"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import ProUpsellContent from "./pro-upsell/ProUpsellContent"
import ProUpsellDecorations from "./pro-upsell/ProUpsellDecorations"
import ProUpsellQuotePreview from "./pro-upsell/ProUpsellQuotePreview"

export type ProUpsellVariant = "warning" | "blocked"

type ProUpsellModalProps = {
  open: boolean
  variant?: ProUpsellVariant
  onClose: () => void
  onSeen: () => void
}

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function ProUpsellModal({
  open,
  variant = "warning",
  onClose,
  onSeen,
}: ProUpsellModalProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.55,
            ease: SMOOTH_EASE,
          }}
          style={{
            background: "rgba(15, 23, 42, 0.46)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose()
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="upsell-title"
            className="relative w-full"
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 14,
            }}
            transition={{
              duration: 0.62,
              ease: SMOOTH_EASE,
            }}
            style={{
              maxWidth: 900,
              borderRadius: 28,
              background:
                "linear-gradient(145deg, #ffffff 0%, #f8fafc 48%, #eef2fa 100%)",
              border:
                "1px solid color-mix(in srgb, var(--primary-light, #d1dcf5) 78%, white)",
              boxShadow:
                "0 28px 80px rgba(15, 23, 42, 0.22), 0 18px 44px rgba(27, 61, 122, 0.16)",
              overflow: "hidden",
              willChange: "opacity, transform",
            }}
          >
            <ProUpsellDecorations />

            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              whileHover={{
                backgroundColor: "var(--primary-soft, #eef2fa)",
                color: "var(--primary, #1B3D7A)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{
                duration: 0.18,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 50,
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.86)",
                border:
                  "1px solid color-mix(in srgb, var(--border, #d1d5db) 70%, transparent)",
                color: "var(--text-muted, #64748b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
              }}
            >
              <X size={15} />
            </motion.button>

            <div
              style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                alignItems: "stretch",
                borderRadius: 28,
                overflow: "hidden",
              }}
            >
              <ProUpsellContent
                variant={variant}
                onClose={onClose}
                onSeen={onSeen}
              />

              <ProUpsellQuotePreview />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
