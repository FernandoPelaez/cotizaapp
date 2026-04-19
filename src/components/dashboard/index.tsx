"use client"

import { useState, useEffect, useRef } from "react"

export interface Plantilla {
  id: string
  nombre: string
  color: string
  accentColor?: string
  activa?: boolean
  tipo?: "basica" | "pro"
  preview?: string
}

export interface Cotizacion {
  id: string
  numero: number
  nombre: string
  descripcion?: string
  fecha: string
  monto: number
  estado: "aprobada" | "pendiente" | "rechazada" | "borrador" | "expirada"
}

export interface UserConfig {
  plan?: "free" | "pro"
  cotizacionesUsadas?: number
  cotizacionesMax?: number
  plantillaActivaNombre?: string
  historialTotal?: number
}

interface DashboardProps {
  userConfig?: UserConfig
  cotizaciones?: Cotizacion[]
  plantillasDisponibles?: Plantilla[]
  onCambiarPlantilla?: (plantillaId: string) => void
  onUpgradePro?: () => void
  onVerTodasPlantillas?: () => void
  onVerTodoCotizaciones?: () => void
  onNuevaCotizacion?: () => void
  onVerHistorial?: () => void
  onVerCotizacion?: (id: string) => void
  onDescargarCotizacion?: (id: string) => void
  onDuplicarCotizacion?: (id: string) => void
}

const FONT_LINK = `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap`

const FONT = "'Inter', 'Segoe UI', system-ui, sans-serif"

const fadeUpStyle = (
  delay: number,
  visible: boolean
): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(18px)",
  transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
})

function useHover() {
  const [hovered, setHovered] = useState(false)
  return {
    hovered,
    hoverProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  }
}

function cardHoverStyle(hovered: boolean): React.CSSProperties {
  return {
    transform: hovered
      ? "translateY(-3px) scale(1.012)"
      : "translateY(0) scale(1)",
    boxShadow: hovered
      ? "0 10px 28px rgba(27,61,122,0.12), 0 2px 6px rgba(0,0,0,0.05)"
      : "0 1px 4px rgba(0,0,0,0.06)",
    transition:
      "transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s cubic-bezier(0.16,1,0.3,1)",
  }
}

function PlantillaPreviewSVG({
  p,
  activa,
}: {
  p: {
    id: string
    nombre: string
    tipo: "basica" | "pro"
    bgHeader: string
    bgBody: string
    accentColor: string
    textColor: string
    lineColor: string
  }
  activa: boolean
}) {
  const isLight =
    p.bgHeader === "#fff" ||
    p.bgHeader === "#fce7f3" ||
    p.bgHeader === "#ede9fe" ||
    p.bgHeader === "#f8fafc" ||
    p.bgHeader === "#ffe4e6"

  const headerTextColor = isLight ? p.textColor : "#fff"

  return (
    <svg
      viewBox="0 0 160 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        borderRadius: 10,
      }}
    >
      <rect width="160" height="200" rx="4" fill={p.bgBody} />
      <rect width="160" height="48" fill={p.bgHeader} />
      <rect
        x="10"
        y="12"
        width="22"
        height="14"
        rx="2"
        fill={isLight ? p.accentColor : "rgba(255,255,255,0.25)"}
        opacity="0.7"
      />
      <rect
        x="10"
        y="30"
        width="55"
        height="5"
        rx="1.5"
        fill={headerTextColor}
        opacity="0.85"
      />
      <rect
        x="10"
        y="38"
        width="35"
        height="3.5"
        rx="1"
        fill={headerTextColor}
        opacity="0.45"
      />
      <rect
        x="100"
        y="14"
        width="48"
        height="10"
        rx="2"
        fill={p.accentColor}
        opacity="0.9"
      />
      <rect
        x="108"
        y="16"
        width="32"
        height="6"
        rx="1"
        fill="#fff"
        opacity="0.9"
      />

      <rect x="10" y="58" width="30" height="3.5" rx="1" fill="#94A3B8" />
      <rect x="10" y="64" width="55" height="4" rx="1.2" fill="#334155" />
      <rect x="10" y="71" width="40" height="3" rx="1" fill="#94A3B8" />

      <rect x="10" y="80" width="140" height="0.8" fill={p.lineColor} />

      <rect
        x="10"
        y="86"
        width="140"
        height="12"
        rx="2"
        fill={p.accentColor}
        opacity="0.08"
      />
      <rect
        x="14"
        y="90"
        width="30"
        height="4"
        rx="1"
        fill={p.accentColor}
        opacity="0.7"
      />
      <rect
        x="80"
        y="90"
        width="20"
        height="4"
        rx="1"
        fill={p.accentColor}
        opacity="0.7"
      />
      <rect
        x="115"
        y="90"
        width="30"
        height="4"
        rx="1"
        fill={p.accentColor}
        opacity="0.7"
      />

      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x="10"
            y={104 + i * 13}
            width="140"
            height="0.5"
            fill={p.lineColor}
          />
          <rect
            x="14"
            y={107 + i * 13}
            width={28 + (i % 3) * 8}
            height="3.5"
            rx="1"
            fill="#94A3B8"
            opacity="0.7"
          />
          <rect
            x="80"
            y={107 + i * 13}
            width="16"
            height="3.5"
            rx="1"
            fill="#94A3B8"
            opacity="0.5"
          />
          <rect
            x="118"
            y={107 + i * 13}
            width="25"
            height="3.5"
            rx="1"
            fill="#334155"
            opacity="0.6"
          />
        </g>
      ))}

      <rect
        x="90"
        y="160"
        width="60"
        height="18"
        rx="3"
        fill={p.accentColor}
        opacity="0.12"
      />
      <rect
        x="94"
        y="164"
        width="28"
        height="4"
        rx="1"
        fill={p.accentColor}
        opacity="0.6"
      />
      <rect
        x="94"
        y="171"
        width="40"
        height="5"
        rx="1.5"
        fill={p.accentColor}
        opacity="0.9"
      />

      <rect
        x="10"
        y="186"
        width="60"
        height="3"
        rx="1"
        fill="#CBD5E1"
        opacity="0.5"
      />
      <rect
        x="120"
        y="186"
        width="30"
        height="3"
        rx="1"
        fill={p.accentColor}
        opacity="0.3"
      />

      {activa && (
        <g>
          <circle cx="146" cy="14" r="9" fill="#1B3D7A" />
          <path
            d="M140 14L144.5 18.5L152 10"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      )}
    </svg>
  )
}

/* ── Tarjeta de plantilla ── */
function PlantillaCard({
  p,
  activa,
  userPlan,
  onClick,
}: {
  p: {
    id: string
    nombre: string
    tipo: "basica" | "pro"
    bgHeader: string
    bgBody: string
    accentColor: string
    textColor: string
    lineColor: string
  }
  activa: boolean
  userPlan: "free" | "pro"
  onClick: () => void
}) {
  const [hov, setHov] = useState(false)
  const locked = p.tipo === "pro" && userPlan === "free"

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={!locked ? onClick : undefined}
      style={{
        borderRadius: 14,
        overflow: "hidden",
        border: activa ? "2.5px solid #1B3D7A" : "1.5px solid #E4E7EF",
        background: "#fff",
        cursor: locked ? "default" : "pointer",
        boxShadow: activa
          ? "0 0 0 3px rgba(27,61,122,0.15), 0 6px 20px rgba(0,0,0,0.12)"
          : hov
          ? "0 6px 20px rgba(0,0,0,0.12)"
          : "0 1px 4px rgba(0,0,0,0.06)",
        transform: hov && !locked ? "translateY(-3px) scale(1.02)" : "none",
        transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
        position: "relative",
      }}
    >
      <div style={{ position: "relative", paddingBottom: "130%", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <PlantillaPreviewSVG p={p} activa={activa} />
        </div>

        {locked && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(15,30,61,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(1px)",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#fff",
                background: "#D97706",
                padding: "4px 10px",
                borderRadius: 99,
                letterSpacing: "0.06em",
              }}
            >
              PRO
            </span>
          </div>
        )}

        <div style={{ position: "absolute", top: 8, left: 8 }}>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: 99,
              background: p.tipo === "pro" ? "#D97706" : "#E0E7FF",
              color: p.tipo === "pro" ? "#fff" : "#3730a3",
              letterSpacing: "0.05em",
            }}
          >
            {p.tipo === "pro" ? "PRO" : "BÁSICA"}
          </span>
        </div>
      </div>

      <div style={{ padding: "10px 12px 12px" }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#0F172A",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {p.nombre}
        </p>
        <p style={{ fontSize: 10, color: "#94A3B8", margin: "2px 0 0" }}>
          Plantilla estándar · {p.tipo === "pro" ? "Pro" : "Básica"}
        </p>
      </div>
    </div>
  )
}

/* ── Skeleton ── */
function DashboardSkeleton() {
  return (
    <>
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -800px 0; }
          100% { background-position: 800px 0; }
        }
        .sk {
          background: linear-gradient(90deg, #ECEEF2 25%, #F5F6F8 50%, #ECEEF2 75%);
          background-size: 800px 100%;
          animation: shimmer 1.5s infinite linear;
          border-radius: 8px;
        }
      `}</style>
      <div
        style={{
          padding: 24,
          fontFamily: FONT,
          background: "#F4F6FA",
          minHeight: "100vh",
        }}
      >
        <div
          className="sk"
          style={{ width: 180, height: 20, marginBottom: 24, borderRadius: 6 }}
        />
        <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
          <div
            style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 14,
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    border: "1.5px solid #E4E7EF",
                    borderRadius: 14,
                    padding: 18,
                    minHeight: 150,
                  }}
                >
                  <div
                    className="sk"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9,
                      marginBottom: 14,
                    }}
                  />
                  <div
                    className="sk"
                    style={{ width: 120, height: 16, marginBottom: 8, borderRadius: 5 }}
                  />
                  <div
                    className="sk"
                    style={{ width: 90, height: 11, borderRadius: 5 }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#fff",
                border: "1.5px solid #E4E7EF",
                borderRadius: 14,
                padding: 20,
              }}
            >
              <div
                className="sk"
                style={{
                  width: 160,
                  height: 16,
                  marginBottom: 18,
                  borderRadius: 5,
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6,1fr)",
                  gap: 12,
                }}
              >
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="sk"
                    style={{ borderRadius: 10, paddingBottom: "130%" }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ width: 268, flexShrink: 0 }}>
            <div
              style={{
                background: "#1B3D7A",
                borderRadius: 14,
                padding: 20,
                height: 360,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

/* ── Historial carrusel ── */
function HistorialCarruselCard({
  cotizaciones,
  onVerCotizacion,
  onVerTodo,
}: {
  cotizaciones: Cotizacion[]
  onVerCotizacion?: (id: string) => void
  onVerTodo?: () => void
}) {
  const { hovered, hoverProps } = useHover()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [idx, setIdx] = useState(0)
  const [animando, setAnimando] = useState(false)

  useEffect(() => {
    if (cotizaciones.length <= 1) return

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setIdx((prev) => {
        const next = (prev + 1) % cotizaciones.length
        setAnimando(true)
        setTimeout(() => setAnimando(false), 260)
        return next
      })
    }, 9000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [cotizaciones.length])

  if (cotizaciones.length === 0) {
    return (
      <div
        {...hoverProps}
        style={{
          background: "#fff",
          border: "1.5px solid #E4E7EF",
          borderRadius: 14,
          padding: "18px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 180,
          ...cardHoverStyle(hovered),
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "#F8FAFC",
              border: "1.5px solid #E4E7EF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <rect
                x="3"
                y="2"
                width="14"
                height="16"
                rx="2.5"
                stroke="#1B3D7A"
                strokeWidth="1.6"
              />
              <path
                d="M7 7h6M7 10h6M7 13h4"
                stroke="#1B3D7A"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <button
            onClick={onVerTodo}
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#1B3D7A",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: FONT,
            }}
          >
            Ver todo
          </button>
        </div>

        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#0F172A",
              margin: "0 0 6px",
            }}
          >
            Aún no hay cotizaciones recientes
          </p>
          <p style={{ fontSize: 11, color: "#94A3B8", margin: 0, lineHeight: 1.5 }}>
            Cuando crees o envíes cotizaciones, aquí aparecerá un resumen real.
          </p>
        </div>
      </div>
    )
  }

  const c = cotizaciones[idx]
  const estadoColor: Record<
      Cotizacion["estado"],
      { bg: string; text: string; dot: string; label: string }
    > = {
      aprobada: {
        bg: "#F0FDF4",
        text: "#15803D",
        dot: "#16A34A",
        label: "Aprobada",
      },
      pendiente: {
        bg: "#FFFBEB",
        text: "#B45309",
        dot: "#D97706",
        label: "Pendiente",
      },
      rechazada: {
        bg: "#FEF2F2",
        text: "#B91C1C",
        dot: "#DC2626",
        label: "Rechazada",
      },
      borrador: {
        bg: "#F1F5F9",
        text: "#64748B",
        dot: "#94A3B8",
        label: "Borrador",
      },
      expirada: {
        bg: "#F8FAFC",
        text: "#475569",
        dot: "#94A3B8",
        label: "Expirada",
      },
    }

  const es = estadoColor[c.estado]

  const irA = (siguiente: number) => {
    setAnimando(true)
    setTimeout(() => {
      setIdx(siguiente)
      setAnimando(false)
    }, 260)
  }

  return (
    <div
      {...hoverProps}
      style={{
        background: "#fff",
        border: "1.5px solid #E4E7EF",
        borderRadius: 14,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        position: "relative",
        overflow: "hidden",
        ...cardHoverStyle(hovered),
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "#F8FAFC",
            border: "1.5px solid #E4E7EF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <rect
              x="3"
              y="2"
              width="14"
              height="16"
              rx="2.5"
              stroke="#1B3D7A"
              strokeWidth="1.6"
            />
            <path
              d="M7 7h6M7 10h6M7 13h4"
              stroke="#1B3D7A"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <button
          onClick={onVerTodo}
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#1B3D7A",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 3,
            fontFamily: FONT,
          }}
        >
          Ver todo
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 3L9 7L5 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        style={{
          flex: 1,
          opacity: animando ? 0 : 1,
          transform: animando ? "translateY(5px)" : "translateY(0)",
          transition: "opacity 0.26s ease, transform 0.26s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <span
            style={{
              fontSize: 9.5,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "#94A3B8",
            }}
          >
            COT-{String(c.numero).padStart(3, "0")}
          </span>
          <span style={{ fontSize: 9.5, color: "#94A3B8" }}>{c.fecha}</span>
        </div>

        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#0F172A",
            margin: "0 0 2px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {c.nombre}
        </p>

        {c.descripcion && (
          <p
            style={{
              fontSize: 11,
              color: "#94A3B8",
              margin: "0 0 8px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {c.descripcion}
          </p>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: 0, lineHeight: 1 }}>
            ${c.monto.toLocaleString("es-MX")}
            <span
              style={{
                fontSize: 10,
                fontWeight: 400,
                color: "#94A3B8",
                marginLeft: 3,
              }}
            >
              MXN
            </span>
          </p>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 10,
              fontWeight: 600,
              padding: "3px 9px",
              borderRadius: 99,
              background: es.bg,
              color: es.text,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: es.dot,
                display: "inline-block",
              }}
            />
            {es.label}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 4 }}>
          {cotizaciones.map((_, i) => (
            <button
              key={i}
              onClick={() => irA(i)}
              style={{
                width: i === idx ? 16 : 5,
                height: 5,
                borderRadius: 99,
                background: i === idx ? "#1B3D7A" : "#E2E8F0",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.28s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => onVerCotizacion?.(c.id)}
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            color: "#1B3D7A",
            background: "#EEF2FB",
            border: "none",
            borderRadius: 7,
            padding: "4px 10px",
            cursor: "pointer",
            fontFamily: FONT,
          }}
        >
          Ver detalle →
        </button>
      </div>

      {cotizaciones.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2.5,
            background: "#F1F5F9",
          }}
        >
          <div
            key={idx}
            style={{
              height: "100%",
              borderRadius: 99,
              background: "#1B3D7A",
              animation: "timerBar 9s linear forwards",
            }}
          />
        </div>
      )}
    </div>
  )
}

/* ── Plantilla activa (mini) ── */
function PlantillaActivaMini({
  nombre,
  plan,
  onCambiar,
}: {
  nombre: string
  plan: "free" | "pro"
  onCambiar?: () => void
}) {
  const { hovered, hoverProps } = useHover()
  return (
    <div
      {...hoverProps}
      style={{
        background: "#1B3D7A",
        borderRadius: 14,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: hovered ? "translateY(-3px) scale(1.012)" : "none",
        boxShadow: hovered
          ? "0 14px 36px rgba(27,61,122,0.32)"
          : "0 4px 18px rgba(27,61,122,0.20)",
        transition:
          "transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <rect
              x="2"
              y="2"
              width="16"
              height="16"
              rx="3"
              stroke="white"
              strokeWidth="1.6"
            />
            <path d="M2 8h16M8 8v10" stroke="white" strokeWidth="1.6" />
          </svg>
        </div>

        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 99,
            background: "rgba(255,255,255,0.13)",
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "0.04em",
          }}
        >
          {plan === "pro" ? "PRO" : "FREE"}
        </span>
      </div>

      <div style={{ marginTop: 12 }}>
        <p
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 2px",
            lineHeight: 1.2,
          }}
        >
          {nombre}
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.48)", margin: 0 }}>
          Plantilla predeterminada
        </p>
      </div>

      <button
        onClick={onCambiar}
        style={{
          marginTop: 12,
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontSize: 11,
          fontWeight: 600,
          color: "rgba(255,255,255,0.65)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          fontFamily: FONT,
        }}
      >
        Cambiar plantilla
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path
            d="M5 3L9 7L5 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

function AccionesRapidasMini({
  onNuevaCotizacion,
  onVerHistorial,
  historialTotal,
}: {
  onNuevaCotizacion?: () => void
  onVerHistorial?: () => void
  historialTotal?: number
}) {
  const { hovered, hoverProps } = useHover()
  const acciones = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="#1B3D7A" strokeWidth="1.5" />
          <path
            d="M9 6v6M6 9h6"
            stroke="#1B3D7A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      iconBg: "#EEF2FB",
      label: "Nueva cotización",
      sub: "Crear desde plantilla",
      onClick: onNuevaCotizacion,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <rect
            x="3"
            y="2"
            width="12"
            height="14"
            rx="2"
            stroke="#16A34A"
            strokeWidth="1.5"
          />
          <path
            d="M6 6h6M6 9h6M6 12h4"
            stroke="#16A34A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      iconBg: "#F0FDF4",
      label: "Ver historial",
      sub: historialTotal !== undefined ? `${historialTotal} guardadas` : "Tus cotizaciones",
      onClick: onVerHistorial,
    },
  ]

  return (
    <div
      {...hoverProps}
      style={{
        background: "#fff",
        border: "1.5px solid #E4E7EF",
        borderRadius: 14,
        overflow: "hidden",
        ...cardHoverStyle(hovered),
      }}
    >
      <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid #F1F5F9" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#0F172A", margin: 0 }}>
          Acciones rápidas
        </p>
      </div>

      {acciones.map((a, i, arr) => (
        <button
          key={a.label}
          onClick={a.onClick}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 16px",
            background: "none",
            border: "none",
            borderBottomWidth: i < arr.length - 1 ? 1 : 0,
            borderBottomStyle: "solid",
            borderBottomColor: "#F1F5F9",
            cursor: "pointer",
            textAlign: "left",
            fontFamily: FONT,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: a.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {a.icon}
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", margin: 0 }}>
              {a.label}
            </p>
            <p style={{ fontSize: 10, color: "#94A3B8", margin: "1px 0 0" }}>
              {a.sub}
            </p>
          </div>

          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: "#CBD5E1" }}>
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ))}
    </div>
  )
}

/* ── Plan card (sidebar) ── */
function PlanCard({
  plan,
  usadas,
  max,
  onUpgrade,
}: {
  plan: "free" | "pro"
  usadas: number
  max: number
  onUpgrade?: () => void
}) {
  const porcentaje = max > 0 ? Math.round((usadas / max) * 100) : 0
  const { hovered, hoverProps } = useHover()

  const features =
    plan === "pro"
      ? ["Cotizaciones ilimitadas", "Logo y datos de empresa", "10+ plantillas Pro", "Exportación a PDF"].map((l) => ({
          label: l,
          ok: true,
        }))
      : [
          { label: "5 plantillas (2 disponibles)", ok: true },
          { label: "10 cotizaciones / mes", ok: true },
          { label: "Exportación a PDF", ok: true },
          { label: "Cotizaciones ilimitadas", ok: false },
          { label: "Logo y datos de empresa", ok: false },
          { label: "10+ plantillas Pro", ok: false },
        ]

  return (
    <div
      {...hoverProps}
      style={{
        borderRadius: 14,
        padding: 20,
        background:
          "linear-gradient(145deg,#0f1e3d 0%,#1a3260 55%,#0d2347 100%)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transform: hovered ? "translateY(-3px) scale(1.012)" : "none",
        boxShadow: hovered
          ? "0 18px 44px rgba(15,30,61,0.42)"
          : "0 4px 22px rgba(15,30,61,0.28)",
        transition:
          "transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <span
        style={{
          fontSize: 10.5,
          fontWeight: 800,
          padding: "4px 11px",
          borderRadius: 99,
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: plan === "pro" ? "rgba(255,255,255,0.14)" : "#D97706",
          color: plan === "pro" ? "#93c5fd" : "#fff",
          width: "fit-content",
          letterSpacing: "0.06em",
        }}
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z"
            fill="currentColor"
          />
        </svg>
        {plan === "pro" ? "PLAN PRO" : "PLAN FREE"}
      </span>

      <div>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", margin: 0 }}>
          {plan === "pro" ? "Estás en el plan Pro" : "Estás en el plan gratuito"}
        </p>
        <p
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.48)",
            margin: "5px 0 0",
            lineHeight: 1.5,
          }}
        >
          {plan === "pro"
            ? "Disfruta de cotizaciones ilimitadas y funciones premium."
            : "Desbloquea plantillas, cotizaciones ilimitadas y más."}
        </p>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10.5,
            marginBottom: 5,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.42)" }}>
            Cotizaciones usadas
          </span>
          <span style={{ fontWeight: 700, color: "#fff" }}>
            {usadas} / {plan === "pro" ? "∞" : max}
          </span>
        </div>

        <div
          style={{
            height: 4,
            background: "rgba(255,255,255,0.09)",
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 99,
              width: plan === "pro" ? "100%" : `${porcentaje}%`,
              background: "linear-gradient(90deg,#3b82f6,#60a5fa)",
              transition: "width 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 7,
        }}
      >
        {features.map((f) => (
          <li
            key={f.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 11.5,
              color: f.ok
                ? "rgba(255,255,255,0.75)"
                : "rgba(255,255,255,0.2)",
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: f.ok
                  ? "rgba(59,130,246,0.2)"
                  : "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {f.ok ? (
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 5L4 7L8 3"
                    stroke="#60a5fa"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M2 2L6 6M6 2L2 6"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </span>
            {f.label}
          </li>
        ))}
      </ul>

      {plan === "free" && (
        <button
          onClick={onUpgrade}
          style={{
            width: "100%",
            padding: "10px 0",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
            boxShadow: "0 4px 14px rgba(59,130,246,0.32)",
            color: "#fff",
            fontSize: 12.5,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontFamily: FONT,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1L8.5 4.5L12 5L9.5 7.5L10 11L7 9.5L4 11L4.5 7.5L2 5L5.5 4.5L7 1Z"
              fill="currentColor"
            />
          </svg>
          Mejorar a Pro — $199 MXN/mes
        </button>
      )}
    </div>
  )
}

function PlantillasDisponiblesFullWidth({
  plantillas,
  plantillaActivaId,
  onSeleccionar,
  onVerTodas,
  userPlan,
}: {
  plantillas: Array<{
    id: string
    nombre: string
    tipo: "basica" | "pro"
    bgHeader: string
    bgBody: string
    accentColor: string
    textColor: string
    lineColor: string
  }>
  plantillaActivaId: string
  onSeleccionar: (id: string) => void
  onVerTodas?: () => void
  userPlan: "free" | "pro"
}) {
  const { hovered, hoverProps } = useHover()
  const [filtro, setFiltro] = useState<"todas" | "basica" | "pro">("todas")
  const lista =
    filtro === "todas" ? plantillas : plantillas.filter((p) => p.tipo === filtro)

  return (
    <div
      {...hoverProps}
      style={{
        background: "#fff",
        border: "1.5px solid #E4E7EF",
        borderRadius: 14,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        ...cardHoverStyle(hovered),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: 0 }}>
            Plantillas disponibles
          </h2>
          <p style={{ fontSize: 11, color: "#94A3B8", margin: "3px 0 0" }}>
            Tus plantillas reales disponibles.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              display: "flex",
              gap: 4,
              background: "#F4F6FA",
              borderRadius: 8,
              padding: 3,
            }}
          >
            {(["todas", "basica", "pro"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  padding: "4px 10px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: FONT,
                  background: filtro === f ? "#fff" : "transparent",
                  color: filtro === f ? "#1B3D7A" : "#94A3B8",
                  boxShadow:
                    filtro === f ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {f === "todas" ? "Todas" : f === "basica" ? "Básicas" : "Pro"}
              </button>
            ))}
          </div>

          <button
            onClick={onVerTodas}
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              color: "#1B3D7A",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontFamily: FONT,
            }}
          >
            Ver todas
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path
                d="M5 3L9 7L5 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div style={{ height: 14 }} />

      {lista.length === 0 ? (
        <div
          style={{
            border: "1.5px dashed #D6DCE8",
            borderRadius: 14,
            padding: "32px 20px",
            textAlign: "center",
            background: "#F8FAFC",
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#0F172A",
              margin: "0 0 6px",
            }}
          >
            No hay plantillas disponibles
          </p>
          <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>
            Cuando tengas plantillas registradas, aparecerán aquí sin ejemplos de relleno.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6,1fr)",
            gap: 12,
          }}
        >
          {lista.map((p) => (
            <PlantillaCard
              key={p.id}
              p={p}
              activa={plantillaActivaId === p.id}
              userPlan={userPlan}
              onClick={() => onSeleccionar(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Dashboard principal ── */
export default function Dashboard({
  userConfig,
  cotizaciones = [],
  plantillasDisponibles = [],
  onCambiarPlantilla,
  onUpgradePro,
  onVerTodasPlantillas,
  onVerTodoCotizaciones,
  onNuevaCotizacion,
  onVerHistorial,
  onVerCotizacion,
}: DashboardProps) {
  const [visible, setVisible] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setPageLoading(false), 750)
    const t2 = setTimeout(() => setVisible(true), 810)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const plan = userConfig?.plan ?? "free"
  const usadas = userConfig?.cotizacionesUsadas ?? 0
  const max = userConfig?.cotizacionesMax ?? 10
  const plantillaActivaNombre =
    userConfig?.plantillaActivaNombre ?? "Sin plantilla activa"
  const historialTotal = userConfig?.historialTotal

  const plantillasParaMostrar =
    plantillasDisponibles.length > 0
      ? plantillasDisponibles.map((p) => ({
          id: p.id,
          nombre: p.nombre,
          tipo: (p.tipo ?? "basica") as "basica" | "pro",
          bgHeader: p.color || "#1B3D7A",
          bgBody: "#fff",
          accentColor: p.accentColor ?? p.color ?? "#1B3D7A",
          textColor: "#fff",
          lineColor: "#E4E7EF",
        }))
      : []

  const [plantillaActivaId, setPlantillaActivaId] = useState<string>(
    plantillasParaMostrar.find((p) => p.id)?.id ?? ""
  )

  const handleSeleccionarPlantilla = (id: string) => {
    setPlantillaActivaId(id)
    onCambiarPlantilla?.(id)
  }

  if (pageLoading) return <DashboardSkeleton />

  return (
    <>
      <link href={FONT_LINK} rel="stylesheet" />
      <style>{`
        @keyframes timerBar { from { width: 0%; } to { width: 100%; } }
        * { box-sizing: border-box; }
      `}</style>

      <div
        style={{
          padding: 24,
          fontFamily: FONT,
          background: "#F4F6FA",
          minHeight: "100vh",
        }}
      >
        <div style={{ marginBottom: 20, ...fadeUpStyle(0, visible) }}>
          <h1
            style={{
              fontSize: 19,
              fontWeight: 800,
              color: "#0F172A",
              margin: 0,
              letterSpacing: "-0.3px",
            }}
          >
            Resumen de tus cotizaciones
          </h1>
        </div>

        <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 14,
                ...fadeUpStyle(60, visible),
              }}
            >
              <HistorialCarruselCard
                cotizaciones={cotizaciones}
                onVerCotizacion={onVerCotizacion}
                onVerTodo={onVerTodoCotizaciones}
              />

              <PlantillaActivaMini
                nombre={plantillaActivaNombre}
                plan={plan}
                onCambiar={onVerTodasPlantillas}
              />

              <AccionesRapidasMini
                onNuevaCotizacion={onNuevaCotizacion}
                onVerHistorial={onVerHistorial}
                historialTotal={historialTotal}
              />
            </div>

            <div style={{ ...fadeUpStyle(140, visible) }}>
              <PlantillasDisponiblesFullWidth
                plantillas={plantillasParaMostrar}
                plantillaActivaId={plantillaActivaId}
                onSeleccionar={handleSeleccionarPlantilla}
                onVerTodas={onVerTodasPlantillas}
                userPlan={plan}
              />
            </div>
          </div>

          <div
            style={{
              width: 268,
              flexShrink: 0,
              ...fadeUpStyle(220, visible),
            }}
          >
            <PlanCard plan={plan} usadas={usadas} max={max} onUpgrade={onUpgradePro} />
          </div>
        </div>
      </div>
    </>
  )
}
