"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const plantillas = [
  {
    nombre: "Clásica elegante",
    tipo: "CLÁSICA",
    color: "#1B3D7A",
    acento: "#D1DCF5",
    cliente: "Constructora Norte SA",
    numero: "COT-001",
    items: [
      { desc: "Diseño arquitectónico", qty: 1, precio: "$8,500" },
      { desc: "Planos estructurales", qty: 2, precio: "$3,200" },
      { desc: "Supervisión de obra", qty: 1, precio: "$5,800" },
    ],
    total: "$17,500",
  },
  {
    nombre: "Clásica esmeralda",
    tipo: "ESMERALDA",
    color: "#065f46",
    acento: "#d1fae5",
    cliente: "EcoVerde Consulting",
    numero: "COT-003",
    items: [
      { desc: "Auditoría ambiental", qty: 1, precio: "$4,500" },
      { desc: "Informe de impacto", qty: 1, precio: "$2,800" },
      { desc: "Certificación ISO", qty: 1, precio: "$3,200" },
    ],
    total: "$10,500",
  },
  {
    nombre: "Clásica índigo",
    tipo: "ÍNDIGO",
    color: "#3730a3",
    acento: "#e0e7ff",
    cliente: "Digital Mind Agency",
    numero: "COT-004",
    items: [
      { desc: "Estrategia digital", qty: 1, precio: "$7,000" },
      { desc: "Campaña SEM", qty: 1, precio: "$4,500" },
      { desc: "Analítica mensual", qty: 3, precio: "$3,600" },
    ],
    total: "$15,100",
  },
  {
    nombre: "Clásica gris",
    tipo: "GRIS",
    color: "#374151",
    acento: "#f3f4f6",
    cliente: "Soluciones Grales SA",
    numero: "COT-005",
    items: [
      { desc: "Consultoría general", qty: 1, precio: "$5,000" },
      { desc: "Reporte ejecutivo", qty: 1, precio: "$2,500" },
      { desc: "Seguimiento mensual", qty: 2, precio: "$4,000" },
    ],
    total: "$11,500",
  },
]

const WORDS = ["profesionales", "modernas", "elegantes", "claras", "formales"]

function TemplateMiniPreview({
  color,
  acento,
  cliente,
  numero,
  items,
  total,
}: {
  color: string
  acento: string
  cliente: string
  numero: string
  items: { desc: string; qty: number; precio: string }[]
  total: string
}) {
  return (
    <div
      style={{
        background: "#f8fafc",
        borderRadius: "10px 10px 0 0",
        overflow: "hidden",
        height: 200,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          background: color,
          padding: "9px 11px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 6.5, color: "rgba(255,255,255,0.95)", fontWeight: 700, letterSpacing: 0.4 }}>
            MI EMPRESA S.A. DE C.V.
          </div>
          <div style={{ fontSize: 5.5, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
            RFC: MEP123456ABC · Tel: (667) 123-4567
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 5, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: 0.5 }}>
            Cotización
          </div>
          <div style={{ fontSize: 6.5, color: "rgba(255,255,255,0.95)", fontWeight: 700, marginTop: 1 }}>
            {numero}
          </div>
          <div style={{ fontSize: 5, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>
            12/04/2026
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "6px 11px",
          background: acento,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${color}22`,
        }}
      >
        <div>
          <div style={{ fontSize: 5, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 2 }}>
            Cliente:
          </div>
          <div style={{ fontSize: 6.5, color: color, fontWeight: 700 }}>{cliente}</div>
          <div style={{ fontSize: 5, color: "#64748b", marginTop: 1 }}>RFC: CLI987654XYZ</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 5, color: "#64748b" }}>Vigencia:</div>
          <div style={{ fontSize: 6, color: "#374151", fontWeight: 600, marginTop: 1 }}>15 días</div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 20px 48px",
          padding: "4px 11px 3px",
          background: color,
          gap: 3,
        }}
      >
        {["Descripción", "Qty", "Precio"].map((h) => (
          <div key={h} style={{ fontSize: 5, color: "rgba(255,255,255,0.75)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>
            {h}
          </div>
        ))}
      </div>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 20px 48px",
            padding: "4px 11px",
            gap: 3,
            background: i % 2 === 0 ? "#fff" : "#f8fafc",
            borderBottom: `1px solid ${acento}`,
          }}
        >
          <div style={{ fontSize: 5.5, color: "#374151", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {item.desc}
          </div>
          <div style={{ fontSize: 5.5, color: "#64748b", textAlign: "center" }}>{item.qty}</div>
          <div style={{ fontSize: 5.5, color: "#374151", fontWeight: 600, textAlign: "right" }}>{item.precio}</div>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "6px 11px",
          gap: 6,
          borderTop: `2px solid ${acento}`,
          background: "#fff",
        }}
      >
        <div style={{ fontSize: 5.5, color: "#64748b", fontWeight: 600, letterSpacing: 0.3 }}>TOTAL:</div>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#fff", background: color, padding: "2px 8px", borderRadius: 4 }}>
          {total}
        </div>
      </div>
    </div>
  )
}

function Typewriter({ canStart }: { canStart: boolean }) {
  const [displayed, setDisplayed] = useState("")
  const wordIndexRef = useRef(0)
  const isDeletingRef = useRef(false)
  const charIndexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!canStart || startedRef.current) return
    startedRef.current = true
    const tick = () => {
      const currentWord = WORDS[wordIndexRef.current]
      if (!isDeletingRef.current) {
        charIndexRef.current += 1
        setDisplayed(currentWord.slice(0, charIndexRef.current))
        if (charIndexRef.current === currentWord.length) {
          timerRef.current = setTimeout(() => { isDeletingRef.current = true; tick() }, 2500)
          return
        }
        timerRef.current = setTimeout(tick, 80)
      } else {
        charIndexRef.current -= 1
        setDisplayed(currentWord.slice(0, charIndexRef.current))
        if (charIndexRef.current === 0) {
          isDeletingRef.current = false
          wordIndexRef.current = (wordIndexRef.current + 1) % WORDS.length
          timerRef.current = setTimeout(tick, 400)
          return
        }
        timerRef.current = setTimeout(tick, 45)
      }
    }
    timerRef.current = setTimeout(tick, 80)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [canStart])

  return (
    <span className="typewriter-word">
      {displayed}
      <span className="typewriter-cursor" style={{ opacity: canStart ? undefined : 0 }} />
    </span>
  )
}

const leftVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
}

const leftItemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
}

export default function Hero() {
  const [typewriterActive, setTypewriterActive] = useState(false)

  useEffect(() => {
    const t3 = setTimeout(() => setTypewriterActive(true), 1750)
    return () => clearTimeout(t3)
  }, [])

  return (
    <>
      <style>{`
        .hero-section {
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 68px 32px 0px;
          background: linear-gradient(160deg, #1B3D7A 0%, #0f2654 55%, #0a1a3a 100%);
          position: relative;
          overflow: clip;
          box-sizing: border-box;
        }

        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }

        .hero-glow-1 {
          position: absolute;
          width: 560px;
          height: 560px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(42,82,152,0.4) 0%, transparent 70%);
          top: -120px;
          right: -80px;
          pointer-events: none;
        }

        .hero-glow-2 {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(55,48,163,0.18) 0%, transparent 70%);
          bottom: -80px;
          left: 20%;
          pointer-events: none;
        }

        .hero-inner {
          max-width: 1200px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .hero-right {
          justify-self: end;
          width: 100%;
        }

        .hero-title {
          font-size: clamp(2rem, 3vw, 2.9rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.18;
          letter-spacing: -1px;
        }

        .hero-title-accent {
          color: #93c5fd;
        }

        .typewriter-placeholder {
          display: inline-block;
          min-width: 220px;
          vertical-align: bottom;
        }

        .typewriter-word {
          color: #93c5fd;
          display: inline-block;
          min-width: 2px;
        }

        .typewriter-cursor {
          display: inline-block;
          width: 2px;
          height: 0.85em;
          background: #93c5fd;
          margin-left: 2px;
          vertical-align: middle;
          border-radius: 1px;
          animation: blink 0.75s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-sub {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
          max-width: 380px;
          font-weight: 400;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          padding-top: 6px;
        }

        .btn-hero {
          cursor: pointer;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 2rem;
          height: 52px;
          background: #ffffff;
          border: none;
          border-radius: 9999px;
          text-decoration: none;
          box-shadow:
            0 0 0 0 rgba(99,179,255,0),
            0 4px 24px rgba(0,0,0,0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          animation: btn-shimmer-idle 3s ease-in-out infinite;
          overflow: hidden;
        }

        .btn-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: linear-gradient(
            120deg,
            transparent 0%,
            transparent 30%,
            rgba(147,197,253,0.55) 50%,
            transparent 70%,
            transparent 100%
          );
          background-size: 250% 100%;
          animation: btn-sweep 2.4s ease-in-out infinite;
        }

        .btn-hero::after {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #93c5fd, #3b82f6, #60a5fa, #93c5fd);
          background-size: 300% 100%;
          animation: btn-border-flow 2s linear infinite;
          z-index: -1;
          opacity: 0.9;
        }

        .btn-hero:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow:
            0 0 0 4px rgba(99,179,255,0.25),
            0 8px 32px rgba(59,130,246,0.4);
        }

        .btn-hero:active {
          transform: scale(0.97);
        }

        @keyframes btn-sweep {
          0%   { background-position: 200% center; }
          100% { background-position: -50% center; }
        }

        @keyframes btn-border-flow {
          0%   { background-position: 0% center; }
          100% { background-position: 300% center; }
        }

        @keyframes btn-shimmer-idle {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,179,255,0), 0 4px 24px rgba(0,0,0,0.25); }
          50%       { box-shadow: 0 0 0 5px rgba(99,179,255,0.18), 0 4px 28px rgba(59,130,246,0.3); }
        }

        .btn-hero .sparkle {
          position: relative;
          z-index: 10;
          width: 1.35rem;
          height: 1.35rem;
          flex-shrink: 0;
        }

        .btn-hero .sparkle .path {
          fill: currentColor;
          stroke: currentColor;
          transform-origin: center;
          color: #1B3D7A;
        }

        .btn-hero:is(:hover, :focus-visible) .sparkle .path {
          animation: hero-path 1.5s linear 0.5s infinite;
        }

        .btn-hero .sparkle .path:nth-child(1) { --scale_path_1: 1.2; }
        .btn-hero .sparkle .path:nth-child(2) { --scale_path_2: 1.2; }
        .btn-hero .sparkle .path:nth-child(3) { --scale_path_3: 1.2; }

        @keyframes hero-path {
          0%, 34%, 71%, 100% { transform: scale(1); }
          17% { transform: scale(var(--scale_path_1, 1)); }
          49% { transform: scale(var(--scale_path_2, 1)); }
          83% { transform: scale(var(--scale_path_3, 1)); }
        }

        .btn-hero .text-button {
          position: relative;
          z-index: 10;
          font-size: 1rem;
          font-weight: 700;
          color: #1B3D7A;
          white-space: nowrap;
        }

        .plantillas-wrapper {
          background: linear-gradient(135deg, rgba(12,20,48,0.82) 0%, rgba(8,12,32,0.9) 100%);
          border: 1px solid rgba(147,197,253,0.18);
          border-radius: 22px;
          padding: 18px 18px 16px;
          backdrop-filter: blur(16px);
          box-shadow:
            0 28px 64px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.07),
            inset 0 0 0 1px rgba(147,197,253,0.04);
        }

        .plantillas-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .plantillas-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.2px;
        }

        .plantillas-sub {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.35);
          margin-top: 3px;
        }

        .plantillas-count {
          font-size: 0.68rem;
          color: rgba(147,197,253,0.75);
          background: rgba(147,197,253,0.1);
          border: 1px solid rgba(147,197,253,0.22);
          border-radius: 20px;
          padding: 3px 12px;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        .plantillas-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .plantilla-card {
          background: #fff;
          border-radius: 13px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          transition: border-color 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
          position: relative;
        }

        .plantilla-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 13px;
          background: linear-gradient(135deg, rgba(147,197,253,0.12) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.25s;
          pointer-events: none;
        }

        .plantilla-card:hover {
          border-color: #93c5fd;
          transform: translateY(-6px) scale(1.025);
          box-shadow: 0 18px 44px rgba(0,0,0,0.5), 0 0 0 1px rgba(147,197,253,0.3);
        }

        .plantilla-card:hover::after {
          opacity: 1;
        }

        .plantilla-card-body {
          padding: 8px 10px 10px;
          background: #fff;
        }

        .plantilla-badge {
          display: inline-block;
          font-size: 0.58rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 20px;
          background: #EEF2FA;
          color: #1B3D7A;
          margin-bottom: 4px;
          letter-spacing: 0.06em;
        }

        .plantilla-type {
          font-size: 0.58rem;
          color: #94a3b8;
          margin-top: 2px;
        }

        @media (max-width: 960px) {
          .plantillas-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 860px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .hero-right {
            width: 100%;
          }
        }

        @media (max-width: 560px) {
          .plantillas-grid {
            grid-template-columns: 1fr;
          }
          .btn-hero {
            padding: 0 1.35rem;
            height: 48px;
          }
          .btn-hero .text-button {
            font-size: 0.95rem;
          }
          .btn-hero .sparkle {
            width: 1.15rem;
            height: 1.15rem;
          }
        }
      `}</style>

      <section className="hero-section" id="hero">
        <div className="hero-grid-bg" />
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        <div className="hero-inner">

          <motion.div
            className="hero-left"
            variants={leftVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h1 className="hero-title" variants={leftItemVariants}>
              Genera cotizaciones{" "}
              <span className="hero-title-accent">listas para enviar</span>{" "}
              en plantillas{" "}
              <span className="typewriter-placeholder">
                <Typewriter canStart={typewriterActive} />
              </span>
            </motion.h1>

            <motion.p className="hero-sub" variants={leftItemVariants}>
              Crea cotizaciones sin esfuerzo. Ahorra tiempo, evita errores y
              mejora la presentación de tus propuestas ante cada cliente.
            </motion.p>

            <motion.div className="hero-actions" variants={leftItemVariants}>
              <Link href="/auth/register" className="btn-hero">
                <svg className="sparkle" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path className="path" d="M12 3l1.6 4.6L18 9.2l-4.4 1.6L12 15.4l-1.6-4.6L6 9.2l4.4-1.6L12 3z" />
                  <path className="path" d="M19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" />
                  <path className="path" d="M5 15l.9 2.6 2.6.9-2.6.9L5 22l-.9-2.6-2.6-.9 2.6-.9L5 15z" />
                </svg>
                <span className="text-button">Empezar gratis</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.9 }}
          >
            <div className="plantillas-wrapper">
              <div className="plantillas-header">
                <div>
                  <div className="plantillas-title">Plantillas</div>
                  <div className="plantillas-sub">Las más modernas y premium</div>
                </div>
                <div className="plantillas-count">4 plantillas</div>
              </div>

              <div className="plantillas-grid">
                {plantillas.map((p, i) => (
                  <motion.div
                    key={p.nombre}
                    className="plantilla-card"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 1.1 + i * 0.15 }}
                  >
                    <TemplateMiniPreview
                      color={p.color}
                      acento={p.acento}
                      cliente={p.cliente}
                      numero={p.numero}
                      items={p.items}
                      total={p.total}
                    />
                    <div className="plantilla-card-body">
                      <div className="plantilla-badge">{p.tipo}</div>
                      <div className="plantilla-type">Plantilla estándar · {p.nombre}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  )
}
