"use client"

import { useState } from "react"
import { Check, Sparkles, Zap, Crown } from "lucide-react"

// ─── Datos de los planes ───

const plans = [
  {
    id:          "free",
    name:        "Free",
    description: "Ideal para comenzar y probar la herramienta",
    price:       0,
    period:      null,
    icon:        Zap,
    current:     true,
    highlighted: false,
    features: [
      { label: "3 cotizaciones por mes",     included: true  },
      { label: "PDF profesional",            included: true  },
      { label: "Historial básico",           included: true  },
      { label: "Cotizaciones ilimitadas",    included: false },
      { label: "Envío por WhatsApp",         included: false },
      { label: "Soporte prioritario",        included: false },
    ],
  },
  {
    id:          "pro",
    name:        "Pro",
    description: "Para profesionales que quieren crecer",
    price:       99,
    period:      "mes",
    icon:        Sparkles,
    current:     false,
    highlighted: true,
    features: [
      { label: "Cotizaciones ilimitadas",    included: true },
      { label: "PDF profesional",            included: true },
      { label: "Historial completo",         included: true },
      { label: "Descarga PDF",               included: true },
      { label: "Envío por WhatsApp",         included: false },
      { label: "Soporte prioritario",        included: false },
    ],
  },
  {
    id:          "premium",
    name:        "Premium",
    description: "Máximo rendimiento para tu negocio",
    price:       199,
    period:      "mes",
    icon:        Crown,
    current:     false,
    highlighted: false,
    features: [
      { label: "Todo lo de Pro",             included: true },
      { label: "Cotizaciones ilimitadas",    included: true },
      { label: "PDF profesional",            included: true },
      { label: "Historial completo",         included: true },
      { label: "Envío por WhatsApp",         included: true },
      { label: "Soporte prioritario",        included: true },
    ],
  },
]

// ─── Planes page ───

export default function PlanesPage() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  return (
    <div
      className="space-y-8"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >

      <div>
        <h1
          className="text-2xl font-bold tracking-tight mb-1"
          style={{ color: "var(--foreground)" }}
        >
          Elige tu plan
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Comienza gratis y escala cuando lo necesites. Sin compromisos.
        </p>
      </div>

      {/* ─── Grid de planes ───── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon      = plan.icon
          const isHovered = hoveredPlan === plan.id

          return (
            <div
              key={plan.id}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{
                background:    plan.highlighted ? "var(--primary)" : "var(--card)",
                border:        plan.highlighted
                  ? "2px solid var(--primary)"
                  : `1px solid ${isHovered ? "var(--primary-light)" : "var(--border)"}`,
                borderRadius:  "20px",
                padding:       "2rem",
                display:       "flex",
                flexDirection: "column",
                gap:           "1.5rem",
                position:      "relative",
                cursor:        "default",
                transition:    "transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease, border-color 0.2s ease",
                transform:     isHovered ? "translateY(-4px)" : "translateY(0)",
                boxShadow:     isHovered
                  ? plan.highlighted
                    ? "0 20px 48px rgba(45,107,255,0.35)"
                    : "0 12px 32px rgba(45,107,255,0.10)"
                  : plan.highlighted
                    ? "0 8px 32px rgba(45,107,255,0.25)"
                    : "none",
              }}
            >

              {/* Badge popular */}
              {plan.highlighted && (
                <div
                  style={{
                    position:     "absolute",
                    top:          "-12px",
                    left:         "50%",
                    transform:    "translateX(-50%)",
                    background:   "var(--foreground)",
                    color:        "white",
                    fontSize:     "10px",
                    fontWeight:   700,
                    letterSpacing: "0.06em",
                    padding:      "4px 12px",
                    borderRadius: "999px",
                    whiteSpace:   "nowrap",
                  }}
                >
                  MÁS POPULAR
                </div>
              )}

              {/* Icono y nombre */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width:          "44px",
                    height:         "44px",
                    borderRadius:   "14px",
                    background:     plan.highlighted ? "rgba(255,255,255,0.2)" : "var(--primary-light)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    flexShrink:     0,
                  }}
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    color={plan.highlighted ? "white" : "var(--primary)"}
                  />
                </div>
                <div>
                  <h2
                    style={{
                      fontSize:      "18px",
                      fontWeight:    700,
                      margin:        0,
                      letterSpacing: "-0.02em",
                      color:         plan.highlighted ? "white" : "var(--foreground)",
                    }}
                  >
                    {plan.name}
                  </h2>
                  <p
                    style={{
                      fontSize: "12px",
                      margin:   0,
                      color:    plan.highlighted ? "rgba(255,255,255,0.7)" : "var(--text-muted)",
                    }}
                  >
                    {plan.description}
                  </p>
                </div>
              </div>

              {/* Precio */}
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span
                  style={{
                    fontSize:      "36px",
                    fontWeight:    800,
                    letterSpacing: "-0.04em",
                    color:         plan.highlighted ? "white" : "var(--foreground)",
                  }}
                >
                  ${plan.price}
                </span>
                {plan.period && (
                  <span
                    style={{
                      fontSize: "13px",
                      color:    plan.highlighted ? "rgba(255,255,255,0.65)" : "var(--text-muted)",
                    }}
                  >
                    / {plan.period}
                  </span>
                )}
                {!plan.period && (
                  <span
                    style={{
                      fontSize: "13px",
                      color:    plan.highlighted ? "rgba(255,255,255,0.65)" : "var(--text-muted)",
                    }}
                  >
                    para siempre
                  </span>
                )}
              </div>

              {/* Divisor */}
              <div
                style={{
                  height:     "1px",
                  background: plan.highlighted ? "rgba(255,255,255,0.15)" : "var(--border)",
                }}
              />

              {/* Features */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                {plan.features.map((f) => (
                  <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width:          "18px",
                        height:         "18px",
                        borderRadius:   "50%",
                        flexShrink:     0,
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                        background:     f.included
                          ? plan.highlighted ? "rgba(255,255,255,0.2)" : "var(--success-bg)"
                          : plan.highlighted ? "rgba(255,255,255,0.08)" : "#F1F5F9",
                      }}
                    >
                      <Check
                        size={10}
                        strokeWidth={3}
                        color={
                          f.included
                            ? plan.highlighted ? "white" : "var(--success)"
                            : plan.highlighted ? "rgba(255,255,255,0.3)" : "#CBD5E1"
                        }
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        color:    f.included
                          ? plan.highlighted ? "white" : "var(--foreground)"
                          : plan.highlighted ? "rgba(255,255,255,0.35)" : "#CBD5E1",
                        textDecoration: f.included ? "none" : "none",
                      }}
                    >
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Boton */}
              <button
                disabled={plan.current}
                style={{
                  width:          "100%",
                  padding:        "12px",
                  borderRadius:   "12px",
                  fontSize:       "14px",
                  fontWeight:     600,
                  cursor:         plan.current ? "default" : "pointer",
                  border:         "none",
                  transition:     "background 0.15s ease, transform 0.1s ease",
                  background:     plan.current
                    ? "var(--primary-soft)"
                    : plan.highlighted
                      ? "white"
                      : "var(--primary)",
                  color:          plan.current
                    ? "var(--text-muted)"
                    : plan.highlighted
                      ? "var(--primary)"
                      : "white",
                  fontFamily:     "'Sora', sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (!plan.current) {
                    e.currentTarget.style.transform = "scale(0.98)"
                    e.currentTarget.style.opacity   = "0.92"
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.opacity   = "1"
                }}
              >
                {plan.current ? "Plan actual" : "Elegir plan"}
              </button>

            </div>
          )
        })}
      </div>

      {/* ─── Nota inferior ────── */}
      <p className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
        Todos los planes incluyen acceso al historial y descarga de PDFs. Cancela cuando quieras.
      </p>

    </div>
  )
}