"use client"

import type { CSSProperties, MouseEvent } from "react"

type QuoteLimitModalProps = {
  open: boolean
  title: string
  message: string
  onClose: () => void
}

const btnBase: CSSProperties = {
  height: "40px",
  borderRadius: "12px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  border: "none",
  transition:
    "transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, opacity 0.15s ease",
}

const benefits = [
  {
    title: "Más cotizaciones",
    desc: "Sigue creando sin pausas en tu trabajo.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="#4A90D9"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    title: "Más plantillas",
    desc: "Diseños premium para tus propuestas.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="#4A90D9"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Flujo completo",
    desc: "Descarga PDFs sin interrupciones.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="#4A90D9"
        strokeWidth="2"
      >
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
]

export default function QuoteLimitModal({
  open,
  title,
  message,
  onClose,
}: QuoteLimitModalProps) {
  if (!open) return null

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      <style>{`
        .modal-btn-red {
          background: #DC2626 !important;
          box-shadow: 0 4px 12px rgba(220,38,38,0.35) !important;
        }
        .modal-btn-red:hover {
          background: #b91c1c !important;
          box-shadow: 0 6px 20px rgba(220,38,38,0.55) !important;
          transform: translateY(-2px) !important;
        }
        .modal-btn-red:active {
          transform: translateY(0px) scale(0.97) !important;
          box-shadow: 0 2px 8px rgba(220,38,38,0.4) !important;
        }

        .modal-btn-blue {
          background: #1B3D7A !important;
          box-shadow: 0 4px 14px rgba(27,61,122,0.5) !important;
          border: 1px solid rgba(74,144,217,0.4) !important;
          text-decoration: none !important;
        }
        .modal-btn-blue:hover {
          background: #254d9a !important;
          box-shadow: 0 6px 22px rgba(27,61,122,0.7) !important;
          transform: translateY(-2px) !important;
        }
        .modal-btn-blue:active {
          transform: translateY(0px) scale(0.97) !important;
          box-shadow: 0 2px 10px rgba(27,61,122,0.5) !important;
        }

        .modal-btn-close:hover {
          background: rgba(255,255,255,0.14) !important;
          color: white !important;
          transform: rotate(90deg) !important;
        }
        .modal-btn-close {
          transition: background 0.2s ease, color 0.2s ease, transform 0.25s ease !important;
        }

        .modal-card:hover {
          background: rgba(27,61,122,0.4) !important;
          border-color: rgba(74,144,217,0.4) !important;
          transform: translateY(-2px) !important;
        }
        .modal-card {
          transition: background 0.18s ease, border-color 0.18s ease, transform 0.18s ease !important;
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          backgroundColor: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
        onClick={handleBackdropClick}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "560px",
            backgroundColor: "#0f1f3d",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(27,61,122,0.4)",
            color: "white",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "120px",
              background:
                "linear-gradient(180deg, rgba(27,61,122,0.5) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          <button
            type="button"
            onClick={onClose}
            className="modal-btn-close"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div style={{ padding: "32px 32px 28px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                backgroundColor: "rgba(217,119,6,0.15)",
                border: "1px solid rgba(217,119,6,0.35)",
                borderRadius: "999px",
                padding: "4px 12px 4px 9px",
                marginBottom: "16px",
              }}
            >
              <svg viewBox="0 0 24 24" width="10" height="10" fill="#D97706">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#D97706",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Límite alcanzado
              </span>
            </div>

            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                lineHeight: 1.25,
                margin: "0 0 10px 0",
                letterSpacing: "-0.02em",
                color: "white",
              }}
            >
              {title}
            </h2>

            <p
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.75,
                margin: "0 0 24px 0",
              }}
            >
              {message}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              {benefits.map((item) => (
                <div
                  key={item.title}
                  className="modal-card"
                  style={{
                    backgroundColor: "rgba(27,61,122,0.25)",
                    border: "1px solid rgba(74,144,217,0.2)",
                    borderRadius: "14px",
                    padding: "14px 12px",
                  }}
                >
                  <div style={{ marginBottom: "8px" }}>{item.icon}</div>

                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      marginBottom: "4px",
                      color: "white",
                    }}
                  >
                    {item.title}
                  </div>

                  <p
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                height: "1px",
                background: "rgba(255,255,255,0.08)",
                marginBottom: "20px",
              }}
            />

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                type="button"
                onClick={onClose}
                className="modal-btn-red"
                style={{
                  ...btnBase,
                  padding: "0 18px",
                  color: "white",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Ahora no
              </button>

              <a
                href="/planes"
                className="modal-btn-blue"
                style={{
                  ...btnBase,
                  padding: "0 22px",
                  color: "white",
                }}
              >
                Ver planes
                <svg
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
