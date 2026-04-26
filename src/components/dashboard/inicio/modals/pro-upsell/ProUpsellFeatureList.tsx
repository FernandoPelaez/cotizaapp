"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const PRO_FEATURES = [
  "Cotizaciones ilimitadas",
  "Acceso a 20 plantillas",
  "Incluye categorías Básica y Pro",
  "PDF profesional",
  "Historial completo",
  "Envío por WhatsApp",
]

export default function ProUpsellFeatureList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {PRO_FEATURES.map((feature, index) => (
        <motion.div
          key={feature}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.15 + index * 0.06,
            duration: 0.3,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div
            style={{
              width: 25,
              height: 25,
              borderRadius: "50%",
              background: "rgba(196,181,253,0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c4b5fd",
              flexShrink: 0,
              boxShadow: "0 0 14px rgba(124,58,237,0.22)",
            }}
          >
            <Check size={14} strokeWidth={3} />
          </div>

          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              lineHeight: 1.35,
            }}
          >
            {feature}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
