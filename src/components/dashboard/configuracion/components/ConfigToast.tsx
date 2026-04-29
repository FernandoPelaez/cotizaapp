import { motion } from "framer-motion";

import type { ConfigToastProps, ToastType } from "@/types/configuracion";

import { toastVariants } from "../animations/configuracion.motion";

const toastColors: Record<ToastType, { bg: string; shadow: string }> = {
  success: {
    bg: "var(--success)",
    shadow: "color-mix(in srgb, var(--success) 35%, transparent)",
  },
  error: {
    bg: "var(--error)",
    shadow: "color-mix(in srgb, var(--error) 35%, transparent)",
  },
  warning: {
    bg: "var(--warning)",
    shadow: "color-mix(in srgb, var(--warning) 35%, transparent)",
  },
};

export default function ConfigToast({ msg, type }: ConfigToastProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <motion.div
        variants={toastVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{
          background: toastColors[type].bg,
          color: "var(--card)",
          padding: "13px 22px",
          borderRadius: 14,
          fontSize: 13,
          fontWeight: 600,
          boxShadow: `0 8px 32px ${toastColors[type].shadow}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "color-mix(in srgb, var(--card) 20%, transparent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {type === "success" && (
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}

          {type === "error" && (
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}

          {type === "warning" && (
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
        </span>

        {msg}
      </motion.div>
    </div>
  );
}