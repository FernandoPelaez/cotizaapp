"use client"

import type { Toast } from "@/types/cotizacion-form"

type QuoteCenteredToastProps = {
  toasts: Toast[]
}

export default function QuoteCenteredToast({
  toasts,
}: QuoteCenteredToastProps) {
  if (toasts.length === 0) return null

  return (
    <>
      <style>{`
        @keyframes toastPopIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes checkDraw {
          from {
            stroke-dashoffset: 30;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col gap-3 items-center">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="pointer-events-auto"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: toast.type === "success" ? "14px 20px" : "10px 18px",
                borderRadius: "16px",
                fontSize: "13px",
                fontWeight: 600,
                animation: "toastPopIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                ...(toast.type === "success"
                  ? {
                      background: "#0f1f3d",
                      border: "1px solid rgba(74,144,217,0.3)",
                      color: "white",
                      boxShadow:
                        "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(27,61,122,0.5)",
                      minWidth: "320px",
                    }
                  : toast.type === "error"
                    ? {
                        background: "#DC2626",
                        color: "white",
                        boxShadow: "0 8px 24px rgba(220,38,38,0.4)",
                      }
                    : {
                        background: "#D97706",
                        color: "white",
                        boxShadow: "0 8px 24px rgba(217,119,6,0.4)",
                      }),
              }}
            >
              {toast.type === "success" && (
                <>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #1B3D7A, #2563EB)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 0 0 6px rgba(37,99,235,0.15)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        strokeDasharray: 30,
                        animation: "checkDraw 0.4s ease 0.2s both",
                      }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "white",
                        marginBottom: "1px",
                      }}
                    >
                      ¡Cotización creada con éxito!
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.55)",
                        fontWeight: 400,
                      }}
                    >
                      Redirigiendo a tus cotizaciones...
                    </div>
                  </div>
                </>
              )}

              {toast.type === "error" && (
                <>
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                  {toast.message}
                </>
              )}

              {toast.type === "warning" && (
                <>
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    >
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </span>
                  {toast.message}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
