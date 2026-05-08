"use client"

import { motion } from "framer-motion"
import { FileText, Sparkles } from "lucide-react"

const SMOOTH_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export default function ProUpsellQuotePreview() {
  return (
    <motion.div
      className="hidden md:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 1.1,
        ease: SMOOTH_EASE,
        delay: 0.15,
      }}
      style={{
        width: 360,
        flexShrink: 0,
        position: "relative",
        minHeight: 460,
        overflow: "hidden",
        background:
          "linear-gradient(180deg, rgba(238,242,250,0.95) 0%, rgba(255,255,255,0.82) 100%)",
        borderLeft:
          "1px solid color-mix(in srgb, var(--border, #d1d5db) 65%, transparent)",
      }}
    >
      <motion.div
        className="pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.28, scale: 1 }}
        transition={{
          duration: 1.6,
          ease: SMOOTH_EASE,
          delay: 0.2,
        }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-55%, -50%)",
          width: 310,
          height: 330,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(27,61,122,0.28) 0%, rgba(42,82,152,0.14) 42%, transparent 72%)",
          filter: "blur(24px)",
        }}
      />

      {/* Tarjeta de fondo (izquierda, inclinada) */}
      <motion.div
        initial={{ opacity: 0, y: 18, rotate: -12 }}
        animate={{ opacity: 1, y: 0, rotate: -7 }}
        transition={{
          duration: 1.2,
          ease: SMOOTH_EASE,
          delay: 0.3,
        }}
        style={{
          position: "absolute",
          top: 78,
          left: 18,
          zIndex: 5,
          width: 210,
          borderRadius: 18,
          overflow: "hidden",
          background:
            "linear-gradient(150deg, #1B3D7A 0%, #244A8F 45%, #2A5298 78%, #3B82F6 100%)",
          boxShadow:
            "0 26px 60px rgba(15,23,42,0.22), 0 20px 48px rgba(27,61,122,0.24)",
        }}
      >
        <div
          style={{
            padding: "11px 13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(15,23,42,0.2)",
            borderBottom: "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 8,
                background: "rgba(255,255,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileText size={13} color="#ffffff" />
            </div>
            <div>
              <div
                style={{
                  width: 42,
                  height: 6,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.9)",
                  marginBottom: 3,
                }}
              />
              <div
                style={{
                  width: 30,
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.42)",
                }}
              />
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                width: 62,
                height: 7,
                borderRadius: 3,
                background: "rgba(255,255,255,0.82)",
                marginBottom: 3,
                marginLeft: "auto",
              }}
            />
            <div
              style={{
                width: 38,
                height: 5,
                borderRadius: 2,
                background: "rgba(209,220,245,0.72)",
                marginLeft: "auto",
              }}
            />
          </div>
        </div>

        <div style={{ padding: "10px 13px 0", display: "flex", gap: 10 }}>
          {[58, 42, 38].map((width, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ width, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.28)" }} />
              <div style={{ width: width - 8, height: 5, borderRadius: 2, background: "rgba(255,255,255,0.56)" }} />
            </div>
          ))}
        </div>

        <div style={{ margin: "10px 13px 0", height: 18, borderRadius: 7, background: "rgba(255,255,255,0.18)" }} />

        <div style={{ padding: "8px 13px", display: "flex", flexDirection: "column", gap: 7 }}>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 6,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ width: 75 + item * 6, height: 5, borderRadius: 2, background: "rgba(255,255,255,0.42)" }} />
              <div style={{ width: 34, height: 5, borderRadius: 2, background: "rgba(255,255,255,0.64)" }} />
            </div>
          ))}
        </div>

        <div
          style={{
            margin: "4px 13px",
            height: 24,
            borderRadius: 9,
            background: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10px",
          }}
        >
          <div style={{ width: 34, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.72)" }} />
          <div style={{ width: 52, height: 9, borderRadius: 4, background: "rgba(255,255,255,0.92)" }} />
        </div>

        <div style={{ margin: "8px 13px 12px", height: 18, borderRadius: 7, background: "rgba(255,255,255,0.1)" }} />
      </motion.div>

      {/* Tarjeta principal (derecha, frontal) */}
      <motion.div
        initial={{ opacity: 0, y: 22, rotate: 8 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{
          duration: 1.3,
          ease: SMOOTH_EASE,
          delay: 0.45,
        }}
        style={{
          position: "absolute",
          top: 58,
          right: 34,
          zIndex: 15,
          width: 238,
          borderRadius: 20,
          overflow: "hidden",
          background: "#ffffff",
          boxShadow:
            "0 30px 70px rgba(15,23,42,0.22), 0 16px 44px rgba(27,61,122,0.18), 0 0 0 1px rgba(209,220,245,0.9)",
        }}
      >
        <div
          style={{
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #1B3D7A 0%, #2A5298 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 9,
                background: "rgba(255,255,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FileText size={14} color="#ffffff" />
            </div>
            <div>
              <p style={{ fontSize: 9, fontWeight: 900, color: "#fff", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Tu Logo
              </p>
              <p style={{ fontSize: 7, color: "rgba(255,255,255,0.62)", margin: 0, marginTop: 1 }}>
                CotizaApp
              </p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "0.08em" }}>
              COTIZACIÓN
            </p>
            <p style={{ fontSize: 9, color: "#D1DCF5", margin: 0, marginTop: 1 }}>
              COT-015
            </p>
          </div>
        </div>

        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
            {[
              ["Cliente", "Empresa Cliente"],
              ["Fecha", "18 Abr 2026"],
              ["Vigencia", "15 días"],
            ].map(([label, value]) => (
              <div key={label}>
                <p style={{ fontSize: 7, color: "#94a3b8", margin: 0 }}>{label}</p>
                <p style={{ fontSize: 8, fontWeight: 700, color: "#334155", margin: 0, marginTop: 2, lineHeight: 1.2 }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 7, color: "#94a3b8", margin: "-4px 0 0" }}>cliente@correo.com</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 0.6fr 1fr 1fr",
              padding: "6px 8px",
              borderRadius: 9,
              background: "linear-gradient(90deg, #1B3D7A, #2A5298)",
              fontSize: 7,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            <span>Concepto</span>
            <span style={{ textAlign: "center" }}>Cant.</span>
            <span style={{ textAlign: "center" }}>Precio</span>
            <span style={{ textAlign: "right" }}>Total</span>
          </div>

          {[
            ["Diseño de interfaz", "1", "$8,500", "$8,500"],
            ["Desarrollo frontend", "1", "$14,000", "$14,000"],
          ].map(([concept, quantity, price, total]) => (
            <div
              key={concept}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 0.6fr 1fr 1fr",
                fontSize: 7,
                color: "#475569",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: 6,
              }}
            >
              <span style={{ lineHeight: 1.3 }}>{concept}</span>
              <span style={{ textAlign: "center" }}>{quantity}</span>
              <span style={{ textAlign: "center" }}>{price}</span>
              <span style={{ textAlign: "right", fontWeight: 700 }}>{total}</span>
            </div>
          ))}

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              ["Subtotal", "$22,500"],
              ["IVA (16%)", "$3,600"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 7, color: "#64748b" }}>
                <span>{label}</span>
                <span style={{ fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7px 10px",
              borderRadius: 11,
              background: "linear-gradient(90deg, rgba(238,242,250,1), rgba(209,220,245,0.72))",
              border: "1px solid rgba(209,220,245,0.9)",
            }}
          >
            <span style={{ fontSize: 9, fontWeight: 900, color: "#1B3D7A" }}>TOTAL</span>
            <span style={{ fontSize: 14, fontWeight: 900, color: "#1B3D7A" }}>$26,100</span>
          </div>

          <p style={{ fontSize: 8, color: "#94a3b8", margin: "2px 0 0", fontStyle: "italic", fontFamily: "Georgia, serif" }}>
            Gracias por tu confianza.
          </p>
        </div>

        <div
          style={{
            margin: "0 10px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "8px 0",
            borderRadius: 11,
            background: "linear-gradient(135deg, var(--primary, #1B3D7A), var(--primary-hover, #2A5298))",
            fontSize: 9,
            fontWeight: 800,
            color: "#fff",
            boxShadow: "0 12px 20px rgba(27,61,122,0.22)",
          }}
        >
          <Sparkles size={10} />
          Vista previa · Plantilla Pro
        </div>
      </motion.div>
    </motion.div>
  )
}
