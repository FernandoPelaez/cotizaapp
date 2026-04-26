"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import ProUpsellContent from "./pro-upsell/ProUpsellContent"
import ProUpsellDecorations from "./pro-upsell/ProUpsellDecorations"
import ProUpsellQuotePreview from "./pro-upsell/ProUpsellQuotePreview"

type ProUpsellModalProps = {
  open: boolean
  onClose: () => void
  onSeen: () => void
}

export default function ProUpsellModal({
  open,
  onClose,
  onSeen,
}: ProUpsellModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{
            background: "rgba(3,1,18,0.88)",
            backdropFilter: "blur(10px)",
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose()
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="upsell-title"
            className="relative w-full"
            style={{
              maxWidth: 900,
              borderRadius: 24,
              background:
                "linear-gradient(145deg, #0c0a20 0%, #150d38 30%, #1e1250 60%, #271870 100%)",
              boxShadow:
                "0 0 0 1px rgba(139,92,246,0.35), 0 0 120px rgba(109,40,217,0.45), 0 40px 90px rgba(0,0,0,0.85)",
              overflow: "visible",
            }}
          >
            <ProUpsellDecorations />

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                zIndex: 50,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.09)",
                border: "1px solid rgba(255,255,255,0.16)",
                color: "rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={13} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                borderRadius: 24,
                overflow: "hidden",
              }}
            >
              <ProUpsellContent onClose={onClose} onSeen={onSeen} />
              <ProUpsellQuotePreview />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
