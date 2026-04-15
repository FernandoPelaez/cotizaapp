"use client"

import { useEffect, useRef, useState } from "react"

export default function Segmentacion() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .seg-section {
          width: 100%;
          padding: 90px 24px;
          background: #E5E5E5;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }
        .seg-inner {
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
          text-align: center;
          box-sizing: border-box;
        }
        .seg-reveal {
          opacity: 0;
          transform: translateY(50px) scale(0.97);
          transition:
            opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
            transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .seg-reveal.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .seg-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1B3D7A;
          border: 1.5px solid rgba(27,61,122,0.25);
          border-radius: 999px;
          padding: 6px 18px;
          margin-bottom: 18px;
          background: rgba(27,61,122,0.06);
        }
        .seg-title {
          font-size: clamp(30px, 4.5vw, 44px);
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 14px;
          line-height: 1.15;
          letter-spacing: -0.5px;
        }
        .seg-title span {
          color: #1B3D7A;
        }
        .seg-sub {
          font-size: 16px;
          color: #64748b;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.75;
        }
        .seg-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
          margin-top: 52px;
          box-sizing: border-box;
        }
        @media (max-width: 600px) {
          .seg-grid { grid-template-columns: 1fr; }
        }
        .seg-card {
          position: relative;
          background: #ffffff;
          border-radius: 24px;
          padding: 44px 40px 40px;
          text-align: left;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          box-shadow: 0 4px 24px rgba(27,61,122,0.09);
          border: 1.5px solid rgba(27,61,122,0.08);
          box-sizing: border-box;
          transition:
            background 0.45s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.45s ease,
            transform 0.45s ease;
          cursor: default;
        }
        .seg-card:hover {
          background: #1B3D7A;
          box-shadow: 0 24px 64px rgba(27,61,122,0.35);
          transform: translateY(-8px);
        }
        .seg-card::before {
          position: absolute;
          content: "";
          width: 24%;
          height: 24%;
          top: 0;
          right: 0;
          background: #EEF2FA;
          border-radius: 0 24px 0 100%;
          transition:
            width 0.45s cubic-bezier(0.22,1,0.36,1),
            height 0.45s cubic-bezier(0.22,1,0.36,1),
            border-radius 0.45s ease,
            opacity 0.45s ease;
          opacity: 1;
          z-index: 0;
        }
        .seg-card::after {
          position: absolute;
          content: "";
          width: 24%;
          height: 24%;
          bottom: 0;
          left: 0;
          background: #EEF2FA;
          border-radius: 0 100% 0 24px;
          transition:
            width 0.45s cubic-bezier(0.22,1,0.36,1),
            height 0.45s cubic-bezier(0.22,1,0.36,1),
            border-radius 0.45s ease,
            opacity 0.45s ease;
          opacity: 1;
          z-index: 0;
        }
        .seg-card:hover::before,
        .seg-card:hover::after {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          opacity: 0;
        }
        .seg-card-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .seg-icon-wrap {
          width: 62px;
          height: 62px;
          border-radius: 16px;
          background: #EEF2FA;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 22px;
          transition: background 0.4s ease, transform 0.3s ease;
          flex-shrink: 0;
        }
        .seg-card:hover .seg-icon-wrap {
          background: rgba(255,255,255,0.18);
          transform: scale(1.08);
        }
        .seg-card-title {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 12px;
          transition: color 0.4s ease;
          letter-spacing: -0.3px;
        }
        .seg-card:hover .seg-card-title {
          color: #ffffff;
        }
        .seg-card-desc {
          font-size: 15px;
          color: #64748b;
          line-height: 1.75;
          margin: 0 0 28px;
          flex: 1;
          transition: color 0.4s ease;
        }
        .seg-card:hover .seg-card-desc {
          color: rgba(255,255,255,0.80);
        }
        .seg-pill {
          display: inline-flex;
          align-items: center;
          font-size: 12px;
          font-weight: 700;
          background: #EEF2FA;
          color: #1B3D7A;
          padding: 7px 18px;
          border-radius: 999px;
          border: 1.5px solid rgba(27,61,122,0.15);
          letter-spacing: 0.04em;
          transition:
            background 0.4s ease,
            color 0.4s ease,
            border-color 0.4s ease;
          width: fit-content;
        }
        .seg-card:hover .seg-pill {
          background: rgba(255,255,255,0.18);
          color: #ffffff;
          border-color: rgba(255,255,255,0.35);
        }
      `}</style>

      <section className="seg-section">
        <div ref={ref} className="seg-inner">

          <div
            className={`seg-reveal ${visible ? "visible" : ""}`}
            style={{ transitionDelay: "0ms" }}
          >
            <div className="seg-badge">¿Para quién es?</div>
            <h2 className="seg-title">
              Diseñado para ti,<br />
              <span>sin importar tu escala</span>
            </h2>
            <p className="seg-sub">
              Tanto si trabajas solo como si tienes un equipo, CotizaApp se adapta a tus necesidades.
            </p>
          </div>

          <div className="seg-grid">
            <div
              className={`seg-reveal ${visible ? "visible" : ""}`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="seg-card">
                <div className="seg-card-content">
                  <div className="seg-icon-wrap">🧑‍💼</div>
                  <h3 className="seg-card-title">Independiente</h3>
                  <p className="seg-card-desc">
                    Freelancers, consultores y profesionales que necesitan verse más formales y ahorrar tiempo en cada propuesta.
                  </p>
                  <span className="seg-pill">Plan Gratis disponible</span>
                </div>
              </div>
            </div>

            <div
              className={`seg-reveal ${visible ? "visible" : ""}`}
              style={{ transitionDelay: "220ms" }}
            >
              <div className="seg-card">
                <div className="seg-card-content">
                  <div className="seg-icon-wrap">🏢</div>
                  <h3 className="seg-card-title">Negocio</h3>
                  <p className="seg-card-desc">
                    Empresas y equipos de ventas que necesitan control, flujo de aprobación y reportes de seguimiento centralizados.
                  </p>
                  <span className="seg-pill">Multi-usuario · Pro</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
