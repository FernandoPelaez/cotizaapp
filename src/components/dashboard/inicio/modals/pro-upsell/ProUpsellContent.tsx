"use client"

import Link from "next/link"
import { ArrowRight, Crown } from "lucide-react"
import ProUpsellFeatureList from "./ProUpsellFeatureList"

type ProUpsellContentProps = {
  onClose: () => void
  onSeen: () => void
}

export default function ProUpsellContent({
  onClose,
  onSeen,
}: ProUpsellContentProps) {
  return (
    <div
      style={{
        flex: 1,
        padding: "36px 32px 36px 46px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "5px 14px 5px 10px",
          borderRadius: 999,
          border: "1px solid rgba(251,191,36,0.55)",
          background: "rgba(251,191,36,0.1)",
          color: "#fbbf24",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          boxShadow: "0 0 22px rgba(251,191,36,0.28)",
          alignSelf: "flex-start",
        }}
      >
        <Crown size={12} fill="#fbbf24" />
        Pro
      </div>

      <div>
        <h2
          id="upsell-title"
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Lleva tus cotizaciones
        </h2>

        <p
          style={{
            fontSize: 30,
            fontWeight: 900,
            margin: 0,
            lineHeight: 1.1,
            background:
              "linear-gradient(90deg, #818cf8 0%, #e879f9 55%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          al siguiente nivel
        </p>
      </div>

      <p
        style={{
          fontSize: 13,
          color: "rgba(199,189,255,0.65)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Te quedan{" "}
        <span style={{ color: "#c084fc", fontWeight: 700 }}>
          2 cotizaciones de prueba
        </span>
        . Mejora a Pro para desbloquear cotizaciones ilimitadas, más plantillas,
        historial completo y envío por WhatsApp.
      </p>

      <ProUpsellFeatureList />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingTop: 2,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/planes"
          onClick={onSeen}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "13px 26px",
            borderRadius: 14,
            background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
            color: "#fff",
            fontWeight: 800,
            fontSize: 14,
            textDecoration: "none",
            boxShadow:
              "0 0 36px rgba(124,58,237,0.65), 0 6px 24px rgba(99,102,241,0.5)",
            letterSpacing: "0.01em",
          }}
        >
          <Crown size={15} fill="#fff" />
          Ver plan Pro
          <ArrowRight size={15} />
        </Link>

        <button
          type="button"
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            color: "rgba(167,139,250,0.5)",
            padding: 0,
          }}
        >
          Ahora no
        </button>

        <span
          style={{
            fontSize: 11,
            color: "rgba(167,139,250,0.35)",
            letterSpacing: "0.02em",
          }}
        >
          Más plantillas. Más control. Más Pro.
        </span>
      </div>
    </div>
  )
}
