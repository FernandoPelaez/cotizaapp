"use client"

import { useEffect, useRef, useState } from "react"

const faqs = [
  {
    q: "¿CotizaApp es gratuito?",
    a: "Sí. Puedes comenzar sin costo alguno. El plan gratuito incluye acceso a plantillas básicas y hasta 10 cotizaciones al mes, ideal para empezar a profesionalizar tu negocio.",
  },
  {
    q: "¿Necesito instalar algo?",
    a: "No. CotizaApp funciona 100% desde tu navegador. Solo necesitas crear una cuenta y listo — sin descargas, sin configuraciones complicadas.",
  },
  {
    q: "¿Puedo descargar mis cotizaciones en PDF?",
    a: "Sí. Con un solo clic generas un PDF profesional, limpio y listo para compartir con tu cliente o imprimir para una reunión.",
  },
  {
    q: "¿Se guardan mis cotizaciones?",
    a: "Sí. Todas tus cotizaciones quedan guardadas en la nube. Puedes consultarlas, editarlas, duplicarlas o reutilizarlas en cualquier momento desde cualquier dispositivo.",
  },
  {
    q: "¿Puedo personalizar mis cotizaciones?",
    a: "Totalmente. Agrega tus productos o servicios, precios, descuentos, impuestos, notas y tu información de empresa. Cada cotización se adapta a tu negocio.",
  },
  {
    q: "¿Qué diferencia hay entre los perfiles?",
    a: "El perfil Independiente está pensado para freelancers y profesionales que trabajan solos. El perfil Negocio incluye funciones para equipos, control de acceso y reportes avanzados.",
  },
  {
    q: "¿Qué pasa cuando llego al límite gratis?",
    a: "Te avisaremos antes de que llegues al límite. Podrás actualizar a un plan Pro o Empresa para seguir creando cotizaciones sin restricciones, sin perder ningún dato.",
  },
  {
    q: "¿Las plantillas son editables?",
    a: "El contenido se llena automáticamente con tus datos. Además puedes elegir entre diferentes estilos y colores para que cada cotización refleje la identidad de tu marca.",
  },
]

const PER_PAGE = 3

export default function FAQ() {
  const ref = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(faqs.length / PER_PAGE)
  const currentFaqs = faqs.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Scroll al FAQ desde navbar
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#faq" && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
    handleHash()
    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [])

  const toggle = (i: number) => setOpen(prev => (prev === i ? null : i))

  const goToPage = (p: number) => {
    setPage(p)
    setOpen(null)
  }

  return (
    <>
      <style>{`
        .faq-section {
          background: #ffffff;
          padding: 90px 24px 100px;
          position: relative;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        .faq-inner {
          max-width: 760px;
          width: 100%;
          margin: 0 auto;
        }
        .faq-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.55s cubic-bezier(0.34,1.4,0.64,1), transform 0.55s cubic-bezier(0.34,1.4,0.64,1);
        }
        .faq-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .faq-header {
          text-align: center;
          margin-bottom: 44px;
        }
        .faq-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1B3D7A;
          border: 1.5px solid rgba(27,61,122,0.2);
          border-radius: 999px;
          padding: 5px 16px;
          margin-bottom: 14px;
          background: rgba(27,61,122,0.05);
        }
        .faq-title {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 12px;
          letter-spacing: -0.4px;
          line-height: 1.15;
        }
        .faq-title span { color: #1B3D7A; }
        .faq-sub {
          font-size: 15px;
          color: #64748b;
          margin: 0 auto;
          max-width: 480px;
          line-height: 1.7;
        }
        .faq-card {
          background: #ffffff;
          border: 1.5px solid rgba(27,61,122,0.1);
          border-radius: 24px;
          padding: 10px;
          box-shadow: 0 4px 32px rgba(27,61,122,0.08);
        }
        .faq-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .faq-item {
          border-radius: 14px;
          border: 1.5px solid transparent;
          background: #ffffff;
          overflow: hidden;
          transition: border-color 0.28s ease, box-shadow 0.28s ease, background 0.28s ease;
        }
        .faq-item:hover {
          background: #f8faff;
          border-color: rgba(27,61,122,0.1);
        }
        .faq-item.active {
          border-color: rgba(27,61,122,0.15);
          background: #f8faff;
        }
        .faq-trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 20px;
          background: none;
          border: none;
          cursor: pointer;
          gap: 14px;
          text-align: left;
          position: relative;
        }
        .faq-item.active .faq-trigger {
          padding-left: 24px;
        }
        .faq-item.active .faq-trigger::before {
          content: '';
          position: absolute;
          left: 0;
          top: 12px;
          bottom: 12px;
          width: 3px;
          background: #1B3D7A;
          border-radius: 0 3px 3px 0;
        }
        .faq-question {
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.45;
          transition: color 0.25s ease;
        }
        .faq-item.active .faq-question {
          color: #1B3D7A;
        }
        .faq-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #EEF2FA;
          color: #1B3D7A;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          transition: background 0.28s ease, color 0.28s ease, transform 0.35s cubic-bezier(0.34,1.4,0.64,1);
        }
        .faq-item.active .faq-icon {
          background: #1B3D7A;
          color: white;
          transform: rotate(45deg);
        }
        .faq-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.36s cubic-bezier(0.22,1,0.36,1);
        }
        .faq-body.open {
          grid-template-rows: 1fr;
        }
        .faq-body-inner {
          overflow: hidden;
        }
        .faq-answer {
          padding: 0 20px 20px 24px;
          font-size: 14px;
          color: #475569;
          line-height: 1.8;
          margin: 0;
        }
        .faq-divider {
          height: 1px;
          background: rgba(27,61,122,0.07);
          margin: 0 20px;
        }
        .faq-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 28px;
        }
        .faq-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #d1daf0;
          border: none;
          cursor: pointer;
          transition: background 0.25s ease, width 0.25s ease;
          padding: 0;
        }
        .faq-dot.active {
          background: #1B3D7A;
          width: 28px;
        }
      `}</style>

      <section className="faq-section" id="faq" ref={sectionRef}>
        <div ref={ref} className="faq-inner">

          <div
            className={`faq-header faq-reveal ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "0ms" }}
          >
            <div className="faq-badge">Preguntas frecuentes</div>
            <h2 className="faq-title">Todo lo que necesitas <span>saber</span></h2>
            <p className="faq-sub">
              Resolvemos tus dudas más comunes para que empieces con confianza.
            </p>
          </div>

          <div className={`faq-reveal ${visible ? "visible" : ""}`} style={{ transitionDelay: "110ms" }}>
            <div className="faq-card">
              <div className="faq-col">
                {currentFaqs.map((item, idx) => {
                  const realIdx = page * PER_PAGE + idx
                  const isOpen = open === realIdx
                  return (
                    <div key={realIdx}>
                      <div className={`faq-item ${isOpen ? "active" : ""}`}>
                        <button className="faq-trigger" onClick={() => toggle(realIdx)}>
                          <span className="faq-question">{item.q}</span>
                          <span className="faq-icon">+</span>
                        </button>
                        <div className={`faq-body ${isOpen ? "open" : ""}`}>
                          <div className="faq-body-inner">
                            <p className="faq-answer">{item.a}</p>
                          </div>
                        </div>
                      </div>
                      {idx < currentFaqs.length - 1 && <div className="faq-divider" />}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="faq-dots">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`faq-dot ${page === i ? "active" : ""}`}
                  onClick={() => goToPage(i)}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
