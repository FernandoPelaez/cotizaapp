"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const PRO_FEATURES = [
  "Cotizaciones ilimitadas",
  "Acceso a más plantillas",
  "Plantillas Básicas y Pro",
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
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.35 + index * 0.08,
            duration: 0.58,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{
            x: 3,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 14px",
            borderRadius: 16,
            border:
              "1px solid color-mix(in srgb, var(--primary-light, #d1dcf5) 72%, white)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.86), rgba(238,242,250,0.72))",
            boxShadow: "0 10px 22px rgba(27, 61, 122, 0.06)",
          }}
        >
          <div
            style={{
              width: 25,
              height: 25,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, var(--primary, #1B3D7A), var(--primary-hover, #2A5298))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              flexShrink: 0,
              boxShadow: "0 10px 18px rgba(27, 61, 122, 0.18)",
            }}
          >
            <Check size={14} strokeWidth={3} />
          </div>

          <p
            style={{
              fontSize: 13,
              fontWeight: 750,
              color: "var(--foreground, #0f172a)",
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
