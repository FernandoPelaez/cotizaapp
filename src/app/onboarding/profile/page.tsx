"use client"

import { useState, useEffect } from "react"

const CheckIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
    <polyline points="2,6 5,9 10,3" />
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}>
    <polyline points="3,2 7,5 3,8" />
  </svg>
)

const FreelancerIcon = ({ selected }: { selected: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={selected ? "white" : "#1B3D7A"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 20c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" />
  </svg>
)

const BusinessIcon = ({ selected }: { selected: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={selected ? "white" : "#1B3D7A"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
)

const MiniQuoteIndependiente = () => {
  const H = "#0F5132"
  const HA = "#157347"
  const soft = "#D1FAE5"
  const label = "#064E3B"
  return (
    <div style={{ width: "100%", height: "100%", background: "white", borderRadius: 6, overflow: "hidden", display: "flex", flexDirection: "column", fontSize: 7, fontFamily: "sans-serif", color: "#1e293b" }}>
      <div style={{ background: H, padding: "6px 9px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "white", fontWeight: 700, fontSize: 7.5 }}>Carlos Mendoza</div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 6 }}>Diseño & Consultoría</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 6 }}>COTIZACIÓN</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 5.5 }}>#0042 · Abr 2026</div>
        </div>
      </div>
      <div style={{ padding: "4px 9px", borderBottom: `1px solid ${soft}` }}>
        <div style={{ color: "#6B7280", fontSize: 5.5, marginBottom: 1 }}>CLIENTE</div>
        <div style={{ fontWeight: 600, fontSize: 6.5 }}>Innovatech S.A.</div>
        <div style={{ color: "#6B7280", fontSize: 5.5 }}>contacto@innovatech.mx</div>
      </div>
      <div style={{ flex: 1, padding: "3px 9px" }}>
        <div style={{ display: "flex", background: soft, borderRadius: 3, padding: "2px 4px", marginBottom: 2 }}>
          <div style={{ flex: 3, color: label, fontSize: 5.5, fontWeight: 600 }}>Servicio</div>
          <div style={{ flex: 1, textAlign: "right", color: label, fontSize: 5.5, fontWeight: 600 }}>Precio</div>
        </div>
        {[
          { srv: "Diseño de identidad visual", price: "$4,500" },
          { srv: "Manual de marca", price: "$2,200" },
          { srv: "Redes sociales (pack)", price: "$1,800" },
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", padding: "2px 4px", background: i % 2 === 0 ? "white" : "#F0FDF4", borderRadius: 2 }}>
            <div style={{ flex: 3, fontSize: 5.5, color: "#374151" }}>{row.srv}</div>
            <div style={{ flex: 1, textAlign: "right", fontSize: 5.5, color: "#374151" }}>{row.price}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "3px 9px 5px", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ background: HA, borderRadius: 4, padding: "2px 7px", display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 5.5 }}>TOTAL</div>
          <div style={{ color: "white", fontWeight: 700, fontSize: 7 }}>$8,500</div>
        </div>
      </div>
    </div>
  )
}

const MiniQuoteNegocio = () => {
  const H = "#1E3A5F"
  const gold = "#B45309"
  const soft = "#FEF3C7"
  const HT = "#92400E"
  return (
    <div style={{ width: "100%", height: "100%", background: "white", borderRadius: 6, overflow: "hidden", display: "flex", flexDirection: "column", fontSize: 7, fontFamily: "sans-serif", color: "#1e293b" }}>
      <div style={{ background: H, padding: "6px 9px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: 1, background: "rgba(255,255,255,0.85)" }} />
          </div>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 7 }}>Distribuidora APEX</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 5 }}>RFC: DAP-920315-AB1</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: gold, fontWeight: 700, fontSize: 6.5 }}>COTIZACIÓN</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 5 }}>#B-0189 · Abr 2026</div>
        </div>
      </div>
      <div style={{ display: "flex", padding: "3px 9px", borderBottom: "1px solid #FEF3C7", gap: 6 }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: H, fontSize: 5, fontWeight: 700, marginBottom: 1 }}>CLIENTE</div>
          <div style={{ fontWeight: 600, fontSize: 6 }}>Comercial Ruiz Hnos.</div>
          <div style={{ color: "#6B7280", fontSize: 5 }}>ventas@ruizhnos.com</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: H, fontSize: 5, fontWeight: 700, marginBottom: 1 }}>CONDICIONES</div>
          <div style={{ color: "#6B7280", fontSize: 5 }}>Pago: 50% anticipo</div>
          <div style={{ color: "#6B7280", fontSize: 5 }}>Entrega: 10 días hábiles</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: "3px 9px" }}>
        <div style={{ display: "flex", background: soft, borderRadius: 3, padding: "2px 4px", marginBottom: 2 }}>
          <div style={{ flex: 3, color: HT, fontSize: 5, fontWeight: 700 }}>Producto</div>
          <div style={{ flex: 1, textAlign: "center", color: HT, fontSize: 5, fontWeight: 700 }}>Cant.</div>
          <div style={{ flex: 1.5, textAlign: "right", color: HT, fontSize: 5, fontWeight: 700 }}>Subtotal</div>
        </div>
        {[
          { prod: "Camiseta básica algodón", qty: "150", sub: "$26,250" },
          { prod: "Jeans slim fit premium", qty: "80", sub: "$32,800" },
          { prod: "Bolsa ecológica impresa", qty: "200", sub: "$9,600" },
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", padding: "2px 4px", background: i % 2 === 0 ? "white" : "#FFFBEB", borderRadius: 2 }}>
            <div style={{ flex: 3, fontSize: 5, color: "#374151" }}>{row.prod}</div>
            <div style={{ flex: 1, textAlign: "center", fontSize: 5, color: "#6B7280" }}>{row.qty}</div>
            <div style={{ flex: 1.5, textAlign: "right", fontSize: 5, color: "#374151" }}>{row.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "3px 9px 5px", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ background: H, borderRadius: 4, padding: "2px 7px", display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ color: gold, fontSize: 5.5, fontWeight: 700 }}>TOTAL</div>
          <div style={{ color: "white", fontWeight: 700, fontSize: 7 }}>$79,634</div>
        </div>
      </div>
    </div>
  )
}

const features = {
  independiente: [
    "Plantillas visuales listas para usar",
    "Previsualización en tiempo real",
    "Descarga en PDF formato carta",
  ],
  negocio: [
    "Plantillas con estructura empresarial",
    "Catálogo de productos y precios",
    "PDF con fidelidad exacta al diseño",
  ],
}

export default function ProfilePage() {
  const [selected, setSelected] = useState<"independiente" | "negocio" | null>(null)
  const [mounted, setMounted] = useState(false)
  const [tapped, setTapped] = useState<"independiente" | "negocio" | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120)
    return () => clearTimeout(t)
  }, [])

  const handleSelect = (type: "independiente" | "negocio") => {
    setTapped(type)
    setTimeout(() => setTapped(null), 300)
    setSelected(type)
    setError(null)
  }

  const handleContinue = async () => {
    if (!selected || loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileType: selected }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "No se pudo guardar el perfil")

      // ✅ ÚNICO CAMBIO: va a questions, no al dashboard
      window.location.href = "/onboarding/questions"

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Algo salió mal")
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#DCDCDC", padding: "24px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
        .sora { font-family: 'Sora', sans-serif; }
        .fu1 { opacity: 0; transform: translateY(16px); transition: opacity .7s cubic-bezier(.16,1,.3,1) .05s, transform .7s cubic-bezier(.16,1,.3,1) .05s; }
        .fu2 { opacity: 0; transform: translateY(16px); transition: opacity .7s cubic-bezier(.16,1,.3,1) .15s, transform .7s cubic-bezier(.16,1,.3,1) .15s; }
        .fu4 { opacity: 0; transform: translateY(16px); transition: opacity .7s cubic-bezier(.16,1,.3,1) .30s, transform .7s cubic-bezier(.16,1,.3,1) .30s; }
        .fu5 { opacity: 0; transform: translateY(16px); transition: opacity .7s cubic-bezier(.16,1,.3,1) .38s, transform .7s cubic-bezier(.16,1,.3,1) .38s; }
        .mounted .fu1, .mounted .fu2, .mounted .fu4, .mounted .fu5 { opacity: 1; transform: translateY(0); }
        .dp { animation: dpulse 2.5s ease-in-out infinite; }
        @keyframes dpulse { 0%,100%{box-shadow:0 0 0 0 rgba(27,61,122,.4)} 50%{box-shadow:0 0 0 6px rgba(27,61,122,0)} }
        .card-w { transition: transform .35s cubic-bezier(.34,1.56,.64,1), border-color .25s, box-shadow .25s; cursor: pointer; }
        .card-w:hover:not(.sel):not(.tap) { transform: scale(1.01); }
        .card-w.sel { transform: scale(1.015); }
        .card-w.tap { transform: scale(0.97); }
        .card-w.dis { pointer-events: none; }
        .arrow-btn { transition: transform .25s ease; }
        button:not(:disabled):hover .arrow-btn { transform: translateX(3px); }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgba(255,255,255,.3); border-top-color: white; animation: spin .7s linear infinite; flex-shrink: 0; }
      `}</style>

      <div style={{
        width: "100%", maxWidth: "1600px", margin: "0 auto",
        background: "#F1F5F9",
        borderRadius: "16px", border: "1px solid #D1D5DB",
        minHeight: "calc(100vh - 48px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "32px 24px",
      }}>
        <div className={mounted ? "mounted" : ""} style={{ width: "100%", maxWidth: 780 }}>

          <div className="fu1" style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "white", border: "1px solid #D1D5DB", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 16 }}>
              <div className="dp" style={{ width: 8, height: 8, borderRadius: "50%", background: "#1B3D7A" }} />
              <span className="sora" style={{ fontWeight: 600, fontSize: 13, color: "#0F172A" }}>CotizaApp</span>
            </div>
            <h1 className="sora" style={{ fontSize: "clamp(1.4rem,3vw,1.85rem)", fontWeight: 700, color: "#0F172A", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 6 }}>
              ¿Cómo vas a{" "}
              <span style={{ background: "linear-gradient(135deg,#1B3D7A 0%,#2A5298 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                usar CotizaApp?
              </span>
            </h1>
            <p style={{ color: "#64748B", fontSize: 13, lineHeight: 1.6, maxWidth: 360, margin: "0 auto" }}>
              Elige tu perfil y adaptaremos las plantillas, campos y estructura de tus cotizaciones
            </p>
          </div>

          <div className="fu2" style={{ background: "#ffffff", borderRadius: 18, padding: 14, border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {(["independiente", "negocio"] as const).map((type) => {
                const isSel = selected === type
                const isTap = tapped === type
                const label = type === "independiente" ? "Independiente" : "Negocio"
                const desc = type === "independiente"
                  ? "Para freelancers y profesionistas que cotizan servicios de forma individual."
                  : "Para empresas y comercios con catálogo de productos y datos fiscales."

                return (
                  <div
                    key={type}
                    onClick={() => !loading && handleSelect(type)}
                    className={["card-w", isSel ? "sel" : "", isTap ? "tap" : "", loading ? "dis" : ""].join(" ")}
                    style={{
                      borderRadius: 14,
                      border: `1.5px solid ${isSel ? "#1B3D7A" : "#D1D5DB"}`,
                      background: isSel ? "linear-gradient(150deg,#EEF2FA 0%,#ffffff 50%)" : "#ffffff",
                      boxShadow: isSel ? "0 0 0 3px rgba(27,61,122,0.08), 0 8px 24px rgba(27,61,122,0.12)" : "0 1px 6px rgba(0,0,0,0.04)",
                      overflow: "hidden", position: "relative",
                    }}
                  >
                    <div style={{ padding: "14px 14px 12px" }}>
                      <div style={{ position: "absolute", top: 12, right: 12, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: isSel ? "#1B3D7A" : "white", border: `2px solid ${isSel ? "#1B3D7A" : "#D1D5DB"}`, color: "white", opacity: isSel ? 1 : 0.4, transform: isSel ? "scale(1)" : "scale(0.82)", transition: "all .3s ease" }}>
                        {isSel && <CheckIcon />}
                      </div>
                      <div style={{ width: 36, height: 36, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, background: isSel ? "#1B3D7A" : "#EEF2FA", border: `1px solid ${isSel ? "#1B3D7A" : "#D1DCF5"}`, boxShadow: isSel ? "0 4px 10px rgba(27,61,122,0.22)" : "none", transition: "all .3s ease" }}>
                        {type === "independiente" ? <FreelancerIcon selected={isSel} /> : <BusinessIcon selected={isSel} />}
                      </div>
                      <p className="sora" style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 2 }}>{label}</p>
                      <p style={{ fontSize: 11, color: "#64748B", lineHeight: 1.5, marginBottom: 10 }}>{desc}</p>
                      <div style={{ width: "100%", height: 130, borderRadius: 7, border: `1px solid ${isSel ? "#D1DCF5" : "#E2E8F0"}`, background: "#F8FAFF", overflow: "hidden", marginBottom: 10, padding: 5 }}>
                        {type === "independiente" ? <MiniQuoteIndependiente /> : <MiniQuoteNegocio />}
                      </div>
                      <div style={{ height: 1, background: isSel ? "#D1DCF5" : "#E5E7EB", marginBottom: 10, transition: "background .3s" }} />
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {features[type].map((f) => (
                          <div key={f} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                            <div style={{ width: 15, height: 15, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isSel ? "#1B3D7A" : "#EEF2FA", border: `1px solid ${isSel ? "#1B3D7A" : "#D1DCF5"}`, color: isSel ? "white" : "#1B3D7A", transition: "all .3s ease" }}>
                              <CheckIcon />
                            </div>
                            <span style={{ fontSize: 11, color: isSel ? "#0F172A" : "#64748B", transition: "color .3s" }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="fu4" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <button
              onClick={handleContinue}
              disabled={!selected || loading}
              className="sora"
              style={{
                width: 210, padding: "11px 0", borderRadius: 999,
                fontWeight: 600, fontSize: 13, border: "none",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all .3s ease",
                cursor: selected && !loading ? "pointer" : "not-allowed",
                ...(selected ? {
                  background: "linear-gradient(135deg,#1B3D7A 0%,#2A5298 100%)",
                  color: "white",
                  boxShadow: loading ? "none" : "0 6px 18px rgba(27,61,122,0.28)",
                  opacity: loading ? 0.8 : 1,
                } : {
                  background: "#D1D5DB", color: "#64748B",
                }),
              }}
            >
              {loading ? (
                <><div className="spinner" /> Guardando...</>
              ) : (
                <>
                  {selected ? "Continuar" : "Selecciona tu perfil"}
                  {selected && (
                    <div className="arrow-btn" style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,0.2)", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ArrowIcon />
                    </div>
                  )}
                </>
              )}
            </button>
            {error && <p style={{ fontSize: 12, fontWeight: 500, color: "#DC2626" }}>{error}</p>}
          </div>

          <p className="fu5" style={{ textAlign: "center", fontSize: 11, color: "#94A3B8", marginTop: 10 }}>
            Puedes cambiar esto después en Configuración
          </p>

        </div>
      </div>
    </div>
  )
}
