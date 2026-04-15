"use client"

import { useState, useEffect, useRef } from "react"

const tabs = [
  { title: "Crear cotización" },
  { title: "Elegir plantilla" },
  { title: "Vista previa" },
  { title: "Descargar PDF" },
  { title: "Enviar" },
]

const tabContent = [
  { title: "Crear cotización", desc: "Agrega tus productos o servicios en segundos. El sistema calcula subtotales, impuestos y el total automáticamente sin errores." },
  { title: "Elegir plantilla", desc: "Selecciona entre diseños modernos y profesionales. Cada plantilla se adapta a tu giro de negocio con colores y estilos únicos." },
  { title: "Vista previa", desc: "Revisa exactamente cómo verá tu cliente la cotización antes de enviarla. Corrige cualquier detalle en tiempo real." },
  { title: "Descargar PDF", desc: "Genera un PDF listo para compartir o imprimir con un solo clic. Formato profesional, limpio y con tu información de empresa." },
  { title: "Enviar", desc: "Comparte por WhatsApp directamente desde la app. Recibe notificación cuando tu cliente abre la cotización." },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function CardCrear() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Nueva cotización</div>
          <div className="font-bold text-gray-900 text-lg">COT-2026-047</div>
        </div>
        <span className="text-xs bg-amber-100 text-amber-700 border border-amber-300 px-3 py-1.5 rounded-full font-semibold">Borrador</span>
      </div>
      <div className="space-y-2">
        {[
          { desc: "Diseño de logotipo", qty: 1, precio: "$3,500" },
          { desc: "Manual de marca", qty: 1, precio: "$2,200" },
          { desc: "Tarjetas de presentación", qty: 200, precio: "$1,800" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-gray-50 border border-gray-200 text-sm">
            <span className="text-gray-700 font-medium">{item.desc}</span>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="text-xs">×{item.qty}</span>
              <span className="font-semibold text-gray-900 w-16 text-right">{item.precio}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-2.5 rounded-xl border border-dashed border-gray-300 text-xs text-gray-400 hover:border-[#1B3D7A] hover:text-[#1B3D7A] transition-all">
        + Agregar línea
      </button>
      <div className="space-y-2 pt-2 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Subtotal</span>
          <span className="text-sm font-semibold text-gray-800">$7,500</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">IVA 16%</span>
          <span className="text-sm font-semibold text-gray-800">$1,200</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-base font-bold text-white bg-[#1B3D7A] px-5 py-2 rounded-xl">$8,700</span>
        </div>
      </div>
    </div>
  )
}

function CardPlantilla() {
  const [sel, setSel] = useState(0)
  const plantillas = [
    { nombre: "Clásica elegante", color: "#1B3D7A", acento: "#EEF2FA", circulo1: "#c7d7f5", circulo2: "#a3bce8" },
    { nombre: "Esmeralda", color: "#065f46", acento: "#ecfdf5", circulo1: "#6ee7b7", circulo2: "#34d399" },
    { nombre: "Índigo moderno", color: "#3730a3", acento: "#eef2ff", circulo1: "#a5b4fc", circulo2: "#818cf8" },
  ]
  const p = plantillas[sel]
  return (
    <div className="space-y-4">
      <div className="text-[11px] text-gray-400 uppercase tracking-wider">Selecciona un diseño</div>
      <div className="grid grid-cols-3 gap-3">
        {plantillas.map((pl, i) => (
          <div key={i} onClick={() => setSel(i)}
            className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${sel === i ? "ring-2 ring-[#1B3D7A] shadow-lg scale-[1.04]" : "ring-1 ring-gray-200 hover:ring-gray-400 hover:scale-[1.02]"}`}>
            <div style={{ background: pl.color }} className="h-10 flex items-center px-3 gap-1.5">
              <div className="w-8 h-1.5 bg-white/40 rounded-full" />
              <div className="w-5 h-1.5 bg-white/25 rounded-full" />
            </div>
            <div style={{ background: pl.acento }} className="px-3 py-2 space-y-1.5">
              <div className="h-1.5 bg-black/10 rounded-full w-full" />
              <div className="h-1.5 bg-black/10 rounded-full w-3/4" />
            </div>
            <div className="bg-gray-50 px-2 py-1.5 text-[10px] font-medium text-gray-600 truncate">{pl.nombre}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <div style={{ background: p.color }} className="px-4 py-3 flex justify-between items-center relative overflow-hidden">
          <div style={{ position: "absolute", top: "-18px", right: "60px", width: "64px", height: "64px", borderRadius: "50%", background: p.circulo1, opacity: 0.25 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="text-white font-bold text-sm">MI EMPRESA S.A. DE C.V.</div>
            <div className="text-white/60 text-xs mt-0.5">RFC: MEP123456ABC</div>
          </div>
          <div style={{ position: "relative", zIndex: 1 }} className="text-right">
            <div className="text-white/60 text-xs">Cotización</div>
            <div className="text-white font-bold text-sm">COT-047</div>
          </div>
        </div>
        <div style={{ background: p.acento }} className="px-4 py-2 flex justify-between border-b border-gray-100">
          <div className="font-semibold text-gray-800 text-xs">Constructora Norte SA</div>
          <div className="text-xs text-gray-400">Vigencia: 15 días</div>
        </div>
        <div className="bg-white px-4 py-3 space-y-2">
          {["Diseño de logotipo · $3,500", "Manual de marca · $2,200"].map((l, i) => (
            <div key={i} className="flex justify-between text-xs py-0.5">
              <span className="text-gray-600">{l.split("·")[0].trim()}</span>
              <span className="font-semibold text-gray-800">{l.split("·")[1].trim()}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-700">TOTAL</span>
            <span className="text-xs font-bold text-white px-3 py-1 rounded-lg" style={{ background: p.color }}>$8,700</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CardPreview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-[11px] text-gray-400 uppercase tracking-wider">Vista previa — COT-2026-047</div>
        <span className="text-xs bg-green-100 text-green-700 border border-green-300 px-3 py-1 rounded-full font-semibold">✓ Lista</span>
      </div>
      <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-[#1B3D7A] px-4 py-3 flex justify-between items-start relative overflow-hidden">
          <div style={{ position: "absolute", top: "-14px", right: "50px", width: "60px", height: "60px", borderRadius: "50%", background: "#c7d7f5", opacity: 0.2 }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="text-white font-bold text-sm">MI EMPRESA S.A. DE C.V.</div>
            <div className="text-white/60 text-xs mt-0.5">RFC: MEP123456ABC · Tel: (667) 123-4567</div>
          </div>
          <div style={{ position: "relative", zIndex: 1 }} className="text-right">
            <div className="text-white font-bold text-sm">COT-2026-047</div>
            <div className="text-white/50 text-xs mt-0.5">13/04/2026</div>
          </div>
        </div>
        <div className="bg-[#EEF2FA] px-4 py-2 flex justify-between border-b border-gray-200">
          <div className="font-semibold text-[#1B3D7A] text-xs">Constructora Norte SA</div>
          <div className="text-xs text-gray-400">Vigencia: 15 días</div>
        </div>
        <div className="bg-white px-4 py-3 space-y-2">
          {[
            { desc: "Diseño de logotipo", total: "$3,500" },
            { desc: "Manual de marca", total: "$2,200" },
            { desc: "Tarjetas (200 pzs)", total: "$1,800" },
          ].map((r, i) => (
            <div key={i} className={`flex justify-between text-xs py-1.5 px-2 rounded-lg ${i % 2 === 0 ? "bg-gray-50" : ""}`}>
              <span className="text-gray-600">{r.desc}</span>
              <span className="font-semibold text-gray-800">{r.total}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-700">TOTAL</span>
            <span className="text-xs font-bold text-white bg-[#1B3D7A] px-3 py-1 rounded-lg">$8,700</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CardPDF() {
  const [downloaded, setDownloaded] = useState(false)
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-xl">
        <div className="w-10 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="text-white text-xs font-bold">PDF</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 text-sm">COT-2026-047.pdf</div>
          <div className="text-xs text-gray-500 mt-0.5">Constructora Norte SA · $8,700 MXN</div>
        </div>
        <button
          onClick={() => setDownloaded(true)}
          className={`text-sm px-4 py-2 rounded-xl font-semibold transition-all active:scale-95 whitespace-nowrap ${downloaded ? "bg-green-100 text-green-700 border border-green-300" : "bg-red-500 text-white hover:bg-red-600 shadow-sm"}`}>
          {downloaded ? "✓ Listo" : "Descargar"}
        </button>
      </div>
      <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-[#1B3D7A] px-4 py-3 flex justify-between items-center">
          <div className="text-white font-bold text-sm">MI EMPRESA S.A. DE C.V.</div>
          <div className="text-white font-bold text-sm">COT-2026-047</div>
        </div>
        <div className="bg-[#EEF2FA] px-4 py-2 border-b border-gray-100">
          <span className="text-xs text-[#1B3D7A] font-semibold">Constructora Norte SA — 13/04/2026</span>
        </div>
        <div className="bg-white px-4 py-3 space-y-2">
          {[
            { desc: "Diseño de logotipo", precio: "$3,500" },
            { desc: "Manual de marca", precio: "$2,200" },
            { desc: "Tarjetas (200 pzs)", precio: "$1,800" },
          ].map((l, i) => (
            <div key={i} className="flex justify-between text-xs text-gray-600 py-0.5">
              <span>{l.desc}</span>
              <span className="font-semibold text-gray-800">{l.precio}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-800">TOTAL</span>
            <span className="text-xs font-bold text-white bg-[#1B3D7A] px-3 py-1 rounded-lg">$8,700</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["✓ Firma incluida", "✓ Sin marca de agua", "✓ Alta calidad"].map((f, i) => (
          <div key={i} className="text-xs text-[#1B3D7A] bg-blue-50 border border-blue-200 rounded-xl py-2 text-center font-semibold">{f}</div>
        ))}
      </div>
    </div>
  )
}

function CardEnviar() {
  const [sent, setSent] = useState(false)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div>
          <div className="font-bold text-gray-900 text-base">COT-2026-047</div>
          <div className="text-xs text-gray-400 mt-0.5">Constructora Norte SA · $8,700 MXN</div>
        </div>
        <span className={`text-xs px-3 py-1.5 rounded-full font-semibold border ${sent ? "bg-green-100 text-green-700 border-green-300" : "bg-amber-100 text-amber-700 border-amber-300"}`}>
          {sent ? "✓ Enviada" : "Lista para enviar"}
        </span>
      </div>
      <button
        onClick={() => setSent(true)}
        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all active:scale-[0.98]"
        style={{
          border: sent ? "2px solid #16a34a" : "2px solid #25D366",
          background: sent ? "#f0fdf4" : "#25D366",
          cursor: "pointer",
        }}>
        <span className="text-3xl leading-none">💬</span>
        <div className="text-left flex-1">
          <div className="font-bold text-sm" style={{ color: sent ? "#15803d" : "#fff" }}>
            {sent ? "✓ Enviado por WhatsApp" : "Enviar por WhatsApp"}
          </div>
          <div className="text-xs mt-0.5" style={{ color: sent ? "#16a34a" : "rgba(255,255,255,0.75)" }}>
            +52 667 234 5678 · Juan Pérez
          </div>
        </div>
        {!sent && <span className="text-white text-lg opacity-80">→</span>}
      </button>
      {sent && (
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-800">
          <span className="font-bold mt-0.5">✓</span>
          <span>Cotización enviada. Tu cliente recibirá una notificación en WhatsApp.</span>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center bg-gray-50 border border-gray-200 rounded-xl py-4">
          <div className="font-bold text-gray-900 text-2xl">3 min</div>
          <div className="text-xs text-gray-400 mt-1">Tiempo de respuesta</div>
        </div>
        <div className="text-center bg-gray-50 border border-gray-200 rounded-xl py-4">
          <div className="font-bold text-gray-900 text-2xl">94%</div>
          <div className="text-xs text-gray-400 mt-1">Tasa de apertura</div>
        </div>
      </div>
    </div>
  )
}

const CARDS = [CardCrear, CardPlantilla, CardPreview, CardPDF, CardEnviar]

export default function ComoFunciona() {
  const [active, setActive] = useState(0)
  const CardComponent = CARDS[active]
  const { ref: sectionRef, inView } = useInView(0.1)

  return (
    <>
      <style>{`
        .cf-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: #ffffff;
          box-sizing: border-box;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal-text {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .reveal-text.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .anim-text {
          animation: fadeUp 0.45s ease both;
          animation-delay: 0.05s;
        }
        .anim-card {
          animation: fadeUp 0.5s ease both;
          animation-delay: 0.15s;
        }
        .cf-tab {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          color: #94a3b8;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .cf-tab:hover {
          color: #1B3D7A;
          border-color: #1B3D7A;
          background: #EEF2FA;
        }
        .cf-tab.active {
          background: #1B3D7A;
          color: #fff;
          border-color: #1B3D7A;
          box-shadow: 0 4px 14px rgba(27,61,122,0.25);
        }
        .cf-connector {
          width: 24px;
          height: 1px;
          background: #e2e8f0;
          flex-shrink: 0;
        }
        .cf-nav-outline {
          padding: 9px 20px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          border: 1.5px solid #e2e8f0;
          background: white;
          color: #374151;
          transition: all 0.2s ease;
        }
        .cf-nav-outline:hover {
          border-color: #1B3D7A;
          color: #1B3D7A;
        }
        .cf-nav-filled {
          padding: 9px 20px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          border: 1.5px solid #1B3D7A;
          background: #1B3D7A;
          color: white;
          transition: all 0.2s ease;
        }
        .cf-nav-filled:hover {
          background: #162f5e;
        }
      `}</style>

      <section
        className="cf-section w-full px-6 md:px-10 overflow-hidden"
        id="como-funciona"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div ref={sectionRef} className="max-w-5xl mx-auto w-full">

          {/* Header */}
          <div className={`text-center reveal-text ${inView ? "visible" : ""}`} style={{ marginBottom: "48px" }}>
            <span style={{
              display: "inline-block",
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#1B3D7A",
              border: "1.5px solid #1B3D7A",
              background: "#EEF2FA",
              borderRadius: "999px",
              padding: "4px 14px",
              marginBottom: "14px",
            }}>
              Cómo funciona
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px 0", lineHeight: 1.2 }}>
              Así funciona <span style={{ color: "#1B3D7A" }}>CotizaApp</span>
            </h2>
            <p style={{ fontSize: "1rem", color: "#64748b", margin: "0 auto 32px auto", maxWidth: "440px", lineHeight: 1.65 }}>
              Un proceso claro para crear, personalizar y enviar cotizaciones sin complicaciones.
            </p>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center items-center gap-1">
              {tabs.map((tab, i) => (
                <div key={i} className="flex items-center">
                  <button
                    className={`cf-tab ${active === i ? "active" : ""}`}
                    onClick={() => setActive(i)}
                  >
                    <span style={{ fontSize: "9px", opacity: 0.55 }}>{String(i + 1).padStart(2, "0")}</span>
                    {tab.title}
                  </button>
                  {i < tabs.length - 1 && <div className="cf-connector mx-1" />}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div key={active} className="grid md:grid-cols-[1fr_1.3fr] gap-12 items-center">

            {/* Left: text */}
            <div className="anim-text space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[#1B3D7A] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {active + 1}
                </span>
                <span style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                  Paso {active + 1} de {tabs.length}
                </span>
              </div>
              <h3 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, margin: 0 }}>
                {tabContent[active].title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.7, maxWidth: "320px", margin: 0 }}>
                {tabContent[active].desc}
              </p>
              <div className="flex gap-3 pt-2">
                {active > 0 && (
                  <button className="cf-nav-outline" onClick={() => setActive(active - 1)}>← Anterior</button>
                )}
                {active < tabs.length - 1 ? (
                  <button className="cf-nav-filled" onClick={() => setActive(active + 1)}>Siguiente →</button>
                ) : (
                  <button className="cf-nav-filled">Empezar gratis →</button>
                )}
              </div>
            </div>

            {/* Right: card */}
            <div
              className="anim-card rounded-2xl hover:-translate-y-1 transition-all duration-300"
              style={{
                padding: "28px",
                background: "#f8fafc",
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <CardComponent />
            </div>
          </div>

          {/* Dots */}
          <div
            className={`flex justify-center gap-2 reveal-text ${inView ? "visible" : ""}`}
            style={{ marginTop: "40px", transitionDelay: "0.25s" }}
          >
            {tabs.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: active === i ? "28px" : "8px",
                  height: "8px",
                  background: active === i ? "#1B3D7A" : "#cbd5e1",
                }}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
