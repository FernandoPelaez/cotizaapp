"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { ArrowRight, Building2, Crown, LayoutGrid, Sparkles, X, Zap } from "lucide-react"
import type { UserConfig, Cotizacion, Plantilla } from "@/types/dashboard"
import DashboardHero from "./sections/DashboardHero"
import DashboardTopGrid from "./sections/DashboardTopGrid"

type DashboardInicioProps = {
  userConfig?: UserConfig
  cotizaciones?: Cotizacion[]
  plantillasDisponibles?: Plantilla[]
}

const UPSELL_STORAGE_KEY = "dashboard-premium-upsell-free-3-of-5"

const FEATURES = [
  {
    icon: <LayoutGrid size={15} />,
    title: "Plantillas Pro exclusivas",
    description: "Diseños que transmiten confianza.",
    iconBg: "linear-gradient(135deg, #7c3aed, #a855f7)",
    iconGlow: "0 0 14px rgba(168,85,247,0.7)",
  },
  {
    icon: <Building2 size={15} />,
    title: "Logo y datos de tu empresa",
    description: "Refuerza tu marca en cada propuesta.",
    iconBg: "linear-gradient(135deg, #0ea5e9, #6366f1)",
    iconGlow: "0 0 14px rgba(14,165,233,0.7)",
  },
  {
    icon: <Zap size={15} />,
    title: "Más cotizaciones y exportaciones",
    description: "Sin límites para crecer.",
    iconBg: "linear-gradient(135deg, #f59e0b, #f97316)",
    iconGlow: "0 0 14px rgba(245,158,11,0.7)",
  },
]

export default function DashboardInicio({
  userConfig,
  cotizaciones = [],
  plantillasDisponibles = [],
}: DashboardInicioProps) {
  void plantillasDisponibles

  const [showPremiumUpsell, setShowPremiumUpsell] = useState(false)
  const [mounted, setMounted] = useState(false)

  const plan = userConfig?.plan ?? "free"
  const cotizacionesUsadas = userConfig?.cotizacionesUsadas ?? 0
  const cotizacionesMax = userConfig?.cotizacionesMax ?? 5
  const cotizacionesRestantes = Math.max(0, cotizacionesMax - cotizacionesUsadas)

  const shouldShowPremiumUpsell = useMemo(
    () =>
      plan === "free" &&
      cotizacionesMax === 5 &&
      cotizacionesUsadas === 3 &&
      cotizacionesRestantes === 2,
    [plan, cotizacionesMax, cotizacionesUsadas, cotizacionesRestantes],
  )

  const markUpsellAsSeen = () => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(UPSELL_STORAGE_KEY, "true")
  }

  const handleCloseUpsell = () => {
    markUpsellAsSeen()
    setShowPremiumUpsell(false)
  }

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!shouldShowPremiumUpsell || typeof window === "undefined") return
    const alreadySeen = window.localStorage.getItem(UPSELL_STORAGE_KEY) === "true"
    if (alreadySeen) return
    const timer = window.setTimeout(() => setShowPremiumUpsell(true), 450)
    return () => window.clearTimeout(timer)
  }, [shouldShowPremiumUpsell])

  useEffect(() => {
    if (!showPremiumUpsell) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleCloseUpsell() }
    window.addEventListener("keydown", onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey) }
  }, [showPremiumUpsell])

  return (
    <>
      {showPremiumUpsell && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(3,1,18,0.88)", backdropFilter: "blur(10px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseUpsell() }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="upsell-title"
            className="relative w-full"
            style={{
              maxWidth: 900,
              borderRadius: 24,
              background: "linear-gradient(145deg, #0c0a20 0%, #150d38 30%, #1e1250 60%, #271870 100%)",
              boxShadow: "0 0 0 1px rgba(139,92,246,0.35), 0 0 120px rgba(109,40,217,0.45), 0 40px 90px rgba(0,0,0,0.85)",
              animation: mounted ? "upsellIn 0.38s cubic-bezier(0.34,1.56,0.64,1) both" : undefined,
              overflow: "visible",
            }}
          >

            <div
              className="absolute top-0 inset-x-0 z-10"
              style={{
                height: 2,
                borderRadius: "24px 24px 0 0",
                background: "linear-gradient(90deg, transparent 0%, #7c3aed 20%, #e879f9 50%, #7c3aed 80%, transparent 100%)",
              }}
            />

            <div
              className="pointer-events-none absolute"
              style={{
                top: -120, right: -100,
                width: 420, height: 420,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 65%)",
                filter: "blur(14px)",
              }}
            />
            {/* Ambient blob bottom-left */}
            <div
              className="pointer-events-none absolute"
              style={{
                bottom: -80, left: -80,
                width: 320, height: 320,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 65%)",
                filter: "blur(18px)",
              }}
            />

            {/* Close button — top-left */}
            <button
              type="button"
              onClick={handleCloseUpsell}
              aria-label="Cerrar"
              style={{
                position: "absolute",
                top: 14, left: 14,
                zIndex: 50,
                width: 28, height: 28,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.09)",
                border: "1px solid rgba(255,255,255,0.16)",
                color: "rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={13} />
            </button>

            {/* ── BODY: left + right ── */}
            <div style={{ display: "flex", alignItems: "stretch", borderRadius: 24, overflow: "hidden" }}>

              {/* ══ LEFT COLUMN ══ */}
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
                {/* PREMIUM badge */}
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
                    textTransform: "uppercase" as const,
                    boxShadow: "0 0 22px rgba(251,191,36,0.28)",
                    alignSelf: "flex-start",
                  }}
                >
                  <Crown size={12} fill="#fbbf24" />
                  Premium
                </div>

                {/* Heading */}
                <div>
                  <h2
                    id="upsell-title"
                    style={{ fontSize: 30, fontWeight: 900, color: "#ffffff", margin: 0, lineHeight: 1.1 }}
                  >
                    Lleva tus cotizaciones
                  </h2>
                  <p
                    style={{
                      fontSize: 30, fontWeight: 900, margin: 0, lineHeight: 1.1,
                      background: "linear-gradient(90deg, #818cf8 0%, #e879f9 55%, #a78bfa 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    al siguiente nivel
                  </p>
                </div>

                {/* Sub-copy */}
                <p style={{ fontSize: 13, color: "rgba(199,189,255,0.65)", lineHeight: 1.6, margin: 0 }}>
                  Te quedan{" "}
                  <span style={{ color: "#c084fc", fontWeight: 700 }}>2 cotizaciones gratis</span>. Más
                  control, más profesionalismo y PDFs que impresionan a tus clientes.
                </p>

                {/* Features */}
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {FEATURES.map((f) => (
                    <div
                      key={f.title}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 13,
                        padding: "11px 15px",
                        borderRadius: 14,
                        border: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(255,255,255,0.04)",
                      }}
                    >
                      <div
                        style={{
                          width: 36, height: 36,
                          borderRadius: 10,
                          background: f.iconBg,
                          boxShadow: f.iconGlow,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        {f.icon}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.3 }}>
                          {f.title}
                        </p>
                        <p style={{ fontSize: 11, color: "rgba(167,139,250,0.6)", margin: 0, marginTop: 2, lineHeight: 1.3 }}>
                          {f.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA row */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 2 }}>
                  <Link
                    href="/planes"
                    onClick={markUpsellAsSeen}
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
                      boxShadow: "0 0 36px rgba(124,58,237,0.65), 0 6px 24px rgba(99,102,241,0.5)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    <Crown size={15} fill="#fff" />
                    Probar Premium
                    <ArrowRight size={15} />
                  </Link>
                  <button
                    type="button"
                    onClick={handleCloseUpsell}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "rgba(167,139,250,0.5)", padding: 0 }}
                  >
                    Ahora no
                  </button>
                  <span style={{ fontSize: 11, color: "rgba(167,139,250,0.35)", letterSpacing: "0.02em" }}>
                    Pruébalo. Mejora. Crece.
                  </span>
                </div>
              </div>

              {/* ══ RIGHT COLUMN ══ */}
              <div
                className="hidden md:block"
                style={{
                  width: 360,
                  flexShrink: 0,
                  position: "relative",
                  /* exact height so cards don't overflow vertically */
                  minHeight: 460,
                }}
              >
                {/* Neon glow blob */}
                <div
                  className="pointer-events-none"
                  style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    transform: "translate(-55%, -50%)",
                    width: 300, height: 320,
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse, rgba(124,58,237,0.7) 0%, rgba(99,102,241,0.35) 40%, transparent 70%)",
                    filter: "blur(22px)",
                  }}
                />

                {/* ── "SE VE MÁS PRO" badge ── */}
                <div
                  style={{
                    position: "absolute",
                    top: 18, right: 18,
                    zIndex: 40,
                    padding: "9px 14px",
                    borderRadius: 12,
                    border: "1px solid rgba(251,191,36,0.6)",
                    background: "linear-gradient(135deg, rgba(160,105,0,0.65) 0%, rgba(110,70,0,0.6) 100%)",
                    color: "#fcd34d",
                    fontSize: 10,
                    fontWeight: 900,
                    lineHeight: 1.5,
                    textAlign: "center" as const,
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 0 28px rgba(251,191,36,0.35), 0 4px 16px rgba(0,0,0,0.5)",
                    letterSpacing: "0.05em",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                    <Sparkles size={11} />
                    <span>SE VE MÁS PRO.</span>
                  </div>
                  <div>VENDE MÁS.</div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: 52,
                    left: 10,
                    zIndex: 5,
                    width: 215,
                    borderRadius: 16,
                    overflow: "hidden",
                    transform: "rotate(-7deg)",
                    background: "linear-gradient(150deg, #2e1065 0%, #4c1d95 45%, #6d28d9 80%, #7c3aed 100%)",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(109,40,217,0.4)",
                    opacity: 1,
                  }}
                >
                  {/* Back card — header */}
                  <div
                    style={{
                      padding: "11px 13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "rgba(0,0,0,0.3)",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 7, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(255,255,255,0.7)" }} />
                      </div>
                      <div>
                        <div style={{ width: 42, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.85)", marginBottom: 3 }} />
                        <div style={{ width: 30, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.35)" }} />
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ width: 62, height: 7, borderRadius: 3, background: "rgba(255,255,255,0.8)", marginBottom: 3, marginLeft: "auto" }} />
                      <div style={{ width: 38, height: 5, borderRadius: 2, background: "rgba(196,181,253,0.7)", marginLeft: "auto" }} />
                    </div>
                  </div>

                  {/* Back card — meta row */}
                  <div style={{ padding: "10px 13px 0", display: "flex", gap: 10 }}>
                    {[58, 42, 38].map((w, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <div style={{ width: w, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.25)" }} />
                        <div style={{ width: w - 8, height: 5, borderRadius: 2, background: "rgba(255,255,255,0.55)" }} />
                      </div>
                    ))}
                  </div>

                  {/* Back card — table header bar */}
                  <div style={{ margin: "10px 13px 0", height: 18, borderRadius: 6, background: "rgba(255,255,255,0.18)" }} />

                  {/* Back card — rows */}
                  <div style={{ padding: "8px 13px", display: "flex", flexDirection: "column", gap: 7 }}>
                    {[1, 2, 3].map((i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,0.09)" }}>
                        <div style={{ width: 75 + i * 6, height: 5, borderRadius: 2, background: "rgba(255,255,255,0.4)" }} />
                        <div style={{ width: 34, height: 5, borderRadius: 2, background: "rgba(255,255,255,0.6)" }} />
                      </div>
                    ))}
                  </div>

                  {/* Back card — total bar */}
                  <div
                    style={{
                      margin: "4px 13px",
                      height: 24,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 10px",
                    }}
                  >
                    <div style={{ width: 34, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.7)" }} />
                    <div style={{ width: 52, height: 9, borderRadius: 3, background: "rgba(255,255,255,0.9)" }} />
                  </div>

                  {/* Back card — chip */}
                  <div style={{ margin: "8px 13px 12px", height: 18, borderRadius: 7, background: "rgba(255,255,255,0.1)" }} />
                </div>

                <div
                  style={{
                    position: "absolute",            
                    top: 30,
                    right: 14,
                    zIndex: 15,
                    width: 238,
                    borderRadius: 18,
                    overflow: "hidden",
                    background: "#ffffff",
                    transform: "rotate(3deg)",
                    boxShadow: "0 28px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.08), 0 0 52px rgba(124,58,237,0.4)",
                  }}
                >
                  {/* Invoice header */}
                  <div
                    style={{
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        style={{
                          width: 28, height: 28,
                          borderRadius: 8,
                          background: "rgba(196,181,253,0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: 14, height: 14, borderRadius: 3, background: "#c4b5fd" }} />
                      </div>
                      <div>
                        <p style={{ fontSize: 9, fontWeight: 900, color: "#fff", margin: 0, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
                          Tu Logo
                        </p>
                        <p style={{ fontSize: 7, color: "rgba(255,255,255,0.45)", margin: 0, marginTop: 1 }}>
                          Desarrollo web
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 13, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "0.1em" }}>COTIZACIÓN</p>
                      <p style={{ fontSize: 9, color: "#a78bfa", margin: 0, marginTop: 1 }}>COT-015</p>
                    </div>
                  </div>

                  {/* Invoice body */}
                  <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {/* Meta */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
                      {[["Cliente", "Empresa Cliente"], ["Fecha", "18 Abr 2026"], ["Vigencia", "15 días"]].map(([label, value]) => (
                        <div key={label}>
                          <p style={{ fontSize: 7, color: "#94a3b8", margin: 0 }}>{label}</p>
                          <p style={{ fontSize: 8, fontWeight: 700, color: "#334155", margin: 0, marginTop: 2, lineHeight: 1.2 }}>{value}</p>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: 7, color: "#94a3b8", margin: "-4px 0 0" }}>cliente@correo.com</p>

                    {/* Table header */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 0.6fr 1fr 1fr",
                        padding: "6px 8px",
                        borderRadius: 8,
                        background: "linear-gradient(90deg, #7c3aed, #6366f1)",
                        fontSize: 7, fontWeight: 800, color: "#fff",
                      }}
                    >
                      <span>Concepto</span>
                      <span style={{ textAlign: "center" }}>Cant.</span>
                      <span style={{ textAlign: "center" }}>Precio</span>
                      <span style={{ textAlign: "right" }}>Total</span>
                    </div>

                    {/* Rows */}
                    {[
                      ["Diseño de interfaz", "1", "$8,500", "$8,500"],
                      ["Desarrollo frontend", "1", "$14,000", "$14,000"],
                    ].map(([concept, qty, price, total]) => (
                      <div
                        key={concept}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "2fr 0.6fr 1fr 1fr",
                          fontSize: 7, color: "#475569",
                          borderBottom: "1px solid #f1f5f9",
                          paddingBottom: 6,
                        }}
                      >
                        <span style={{ lineHeight: 1.3 }}>{concept}</span>
                        <span style={{ textAlign: "center" }}>{qty}</span>
                        <span style={{ textAlign: "center" }}>{price}</span>
                        <span style={{ textAlign: "right", fontWeight: 700 }}>{total}</span>
                      </div>
                    ))}

                    {/* Subtotals */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {[["Subtotal", "$22,500"], ["IVA (16%)", "$3,600"]].map(([label, value]) => (
                        <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 7, color: "#64748b" }}>
                          <span>{label}</span>
                          <span style={{ fontWeight: 600 }}>{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "7px 10px",
                        borderRadius: 10,
                        background: "linear-gradient(90deg, #ede9fe, #ddd6fe)",
                      }}
                    >
                      <span style={{ fontSize: 9, fontWeight: 900, color: "#5b21b6" }}>TOTAL</span>
                      <span style={{ fontSize: 14, fontWeight: 900, color: "#5b21b6" }}>$26,100</span>
                    </div>

                    {/* Signature */}
                    <p style={{ fontSize: 8, color: "#94a3b8", margin: "2px 0 0", fontStyle: "italic", fontFamily: "Georgia, serif" }}>
                      Gracias por tu confianza.
                    </p>
                  </div>

                  {/* Vista previa chip */}
                  <div
                    style={{
                      margin: "0 10px 10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "8px 0",
                      borderRadius: 10,
                      background: "linear-gradient(135deg, #4c1d95, #6366f1)",
                      fontSize: 9, fontWeight: 800, color: "#fff",
                      boxShadow: "0 0 18px rgba(99,102,241,0.45)",
                    }}
                  >
                    <Sparkles size={10} />
                    Vista previa · Plantilla Pro
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard content */}
      <section className="min-h-full">
        <div className="space-y-6">
          <DashboardHero userConfig={userConfig} />
          <DashboardTopGrid userConfig={userConfig} cotizaciones={cotizaciones} />
        </div>
      </section>

      <style>{`
        @keyframes upsellIn {
          from { opacity: 0; transform: scale(0.88) translateY(24px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </>
  )
}