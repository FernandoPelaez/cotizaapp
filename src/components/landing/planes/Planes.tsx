"use client"

import { motion, type Variants, type TargetAndTransition } from "framer-motion"

export default function Planes() {
  const planes = [
    {
      nombre: "Free",
      desc: "Ideal para comenzar y probar la herramienta",
      precio: "$0",
      periodo: "para siempre",
      features: [
        "5 cotizaciones de prueba",
        "Acceso a 10 plantillas básicas",
        "Vista previa",
        "Descarga en PDF",
        "Al llegar al límite, se bloquea seguir creando y se invita a mejorar el plan",
      ],
      cta: "Elegir plan",
      popular: false,
      premium: false,
    },
    {
      nombre: "Pro",
      desc: "Para profesionales que quieren crecer",
      precio: "$99",
      periodo: "/ mes",
      features: [
        "Cotizaciones ilimitadas",
        "Acceso a 20 plantillas",
        "Incluye categorías Básica y Pro",
        "PDF profesional",
        "Historial completo",
        "Envío por WhatsApp",
      ],
      cta: "Elegir plan",
      popular: true,
      premium: false,
    },
    {
      nombre: "Empresa",
      desc: "Ideal para negocios que buscan toda la biblioteca disponible",
      precio: "$199",
      periodo: "/ mes",
      features: [
        "Todo lo de Pro",
        "Acceso a las 30 plantillas",
        "Incluye Básica, Pro y Premium",
        "Ideal para negocios que buscan toda la biblioteca disponible",
      ],
      cta: "Plan actual",
      popular: false,
      premium: true,
    },
  ]
  
  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  }

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.25,
      },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeOut },
    },
  }

  const featuresContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.45,
      },
    },
  }

  const featureItemVariants: Variants = {
    hidden: { opacity: 0, x: -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55, ease: easeOut },
    },
  }

  const pillVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 220,
        damping: 14,
        delay: 0.5,
      },
    },
  }

  const noteVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 1.4, ease: easeOut },
    },
  }

  const hoverLift: TargetAndTransition = {
    y: -8,
    transition: { type: "spring", stiffness: 280, damping: 20 },
  }

  return (
    <>
      <style>{`
        .planes-section {
          width: 100%;
          padding: 80px 24px;
          background: #1B3D7A;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }
        .deco-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          pointer-events: none;
        }
        .planes-inner {
          max-width: 1060px;
          margin: 0 auto;
          text-align: center;
        }
        .planes-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          padding: 5px 16px;
          margin-bottom: 16px;
        }
        .planes-title {
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 800;
          color: white;
          margin: 0 0 12px;
          line-height: 1.15;
        }
        .planes-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          max-width: 440px;
          margin: 0 auto 44px;
          line-height: 1.7;
        }
        .planes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }
        @media (max-width: 900px) {
          .planes-grid {
            grid-template-columns: 1fr;
            max-width: 380px;
            margin: 0 auto;
          }
        }

        .plan-wrap {
          display: flex;
          flex-direction: column;
        }

        /* ── TARJETA FREE ── */
        .plan-card {
          background: white;
          border-radius: 20px;
          padding: 28px 24px;
          text-align: left;
          display: flex;
          flex-direction: column;
          flex: 1;
          box-sizing: border-box;
          box-shadow: 0 4px 20px rgba(0,0,0,0.13);
          transition: box-shadow 0.3s ease;
        }
        .plan-wrap:hover .plan-card {
          box-shadow: 0 24px 52px rgba(0,0,0,0.22);
        }

        /* ── TARJETA PRO – borde cónico animado ── */
        .pro-shell {
          position: relative;
          border-radius: 22px;
          padding: 2.5px;
          flex: 1;
          box-sizing: border-box;
          overflow: hidden;
          box-shadow: 0 8px 36px rgba(27,61,122,0.5);
          transition: box-shadow 0.3s ease;
        }
        .plan-wrap:hover .pro-shell {
          box-shadow: 0 24px 56px rgba(27,61,122,0.7);
        }
        .pro-shell-bg {
          position: absolute;
          inset: -50%;
          background: conic-gradient(from 0deg, #60a5fa, #1B3D7A 25%, #818cf8 50%, #60a5fa 75%, #1B3D7A);
          animation: spinBorder 3s linear infinite;
          z-index: 0;
        }
        @keyframes spinBorder {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .pro-inner {
          position: relative;
          z-index: 1;
          background: white;
          border-radius: 20px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-sizing: border-box;
        }

        /* ── TARJETA PREMIUM ── */
        .premium-card {
          background: white;
          border-radius: 20px;
          padding: 28px 24px;
          text-align: left;
          display: flex;
          flex-direction: column;
          flex: 1;
          box-sizing: border-box;
          box-shadow: 0 4px 20px rgba(0,0,0,0.13);
          transition: box-shadow 0.3s ease;
        }
        .plan-wrap:hover .premium-card {
          box-shadow: 0 24px 52px rgba(0,0,0,0.22);
        }

        /* ── CONTENIDO ── */
        .plan-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 3px;
        }
        .plan-name {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 16px;
        }
        .plan-price-row {
          display: flex;
          align-items: baseline;
          gap: 3px;
          margin-bottom: 20px;
        }
        .plan-price-num {
          font-size: 42px;
          font-weight: 800;
          color: #1B3D7A;
          line-height: 1;
          letter-spacing: -2px;
        }
        .plan-price-per {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
        }
        .plan-divider {
          height: 1px;
          background: #f1f5f9;
          margin-bottom: 16px;
        }
        .plan-features {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-bottom: 24px;
        }
        .plan-feat-item {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          color: #374151;
        }
        .feat-check {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #EEF2FA;
          color: #1B3D7A;
          font-size: 8px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .popular-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #1B3D7A;
          color: white;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 14px;
          width: fit-content;
          transform-origin: left center;
        }
        .premium-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #EEF2FA;
          color: #1B3D7A;
          border: 1px solid #dbe4f3;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 14px;
          width: fit-content;
          transform-origin: left center;
        }
        .btn-outline-plan, .btn-empresa-plan {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: white;
          color: #1B3D7A;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.22s ease;
          margin-top: auto;
        }
        .btn-outline-plan:hover, .btn-empresa-plan:hover {
          background: #EEF2FA;
          border-color: #1B3D7A;
        }
        .btn-filled-plan {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: none;
          background: #1B3D7A;
          color: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.22s ease;
          margin-top: auto;
        }
        .btn-filled-plan:hover {
          background: #162f5e;
        }
        .planes-note {
          margin-top: 36px;
          font-size: 11px;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.03em;
        }
      `}</style>

      <section className="planes-section" id="planes">
        <div className="deco-circle" style={{ width: 400, height: 400, top: -110, right: -90 }} />
        <div className="deco-circle" style={{ width: 240, height: 240, bottom: -60, left: -50 }} />
        <div className="deco-circle" style={{ width: 160, height: 160, top: "38%", left: "43%" }} />

        <div className="planes-inner">
          {/* Header */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="planes-badge">Precios</div>
            <h2 className="planes-title">Planes para cada necesidad</h2>
            <p className="planes-sub">
              Empieza gratis y escala conforme tu negocio crece. Sin contratos,
              cancela cuando quieras.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="planes-grid"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {planes.map((plan, i) => (
              <motion.div
                key={i}
                className="plan-wrap"
                variants={cardVariants}
                whileHover={hoverLift}
              >
                {/* PRO */}
                {plan.popular && (
                  <div className="pro-shell">
                    <div className="pro-shell-bg" />
                    <div className="pro-inner">
                      <motion.div className="popular-pill" variants={pillVariants}>
                        ★ Más popular
                      </motion.div>
                      <div className="plan-tag">{plan.desc}</div>
                      <div className="plan-name">{plan.nombre}</div>

                      <div className="plan-price-row">
                        <span className="plan-price-num">{plan.precio}</span>
                        {plan.periodo && (
                          <span className="plan-price-per">{plan.periodo}</span>
                        )}
                      </div>

                      <div className="plan-divider" />

                      <motion.div
                        className="plan-features"
                        variants={featuresContainerVariants}
                      >
                        {plan.features.map((f, j) => (
                          <motion.div
                            key={j}
                            className="plan-feat-item"
                            variants={featureItemVariants}
                          >
                            <div className="feat-check">✓</div>
                            <span>{f}</span>
                          </motion.div>
                        ))}
                      </motion.div>

                      <button className="btn-filled-plan">{plan.cta}</button>
                    </div>
                  </div>
                )}

                {/* PREMIUM / EMPRESA */}
                {plan.premium && (
                  <div className="premium-card">
                    <motion.div className="premium-pill" variants={pillVariants}>
                      ◈ Premium
                    </motion.div>
                    <div className="plan-tag">{plan.desc}</div>
                    <div className="plan-name">{plan.nombre}</div>

                    <div className="plan-price-row">
                      <span className="plan-price-num">{plan.precio}</span>
                      {plan.periodo && (
                        <span className="plan-price-per">{plan.periodo}</span>
                      )}
                    </div>

                    <div className="plan-divider" />

                    <motion.div
                      className="plan-features"
                      variants={featuresContainerVariants}
                    >
                      {plan.features.map((f, j) => (
                        <motion.div
                          key={j}
                          className="plan-feat-item"
                          variants={featureItemVariants}
                        >
                          <div className="feat-check">✓</div>
                          <span>{f}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    <button className="btn-empresa-plan">{plan.cta}</button>
                  </div>
                )}

                {/* FREE */}
                {!plan.popular && !plan.premium && (
                  <div className="plan-card">
                    <div style={{ height: 26, marginBottom: 14 }} />
                    <div className="plan-tag">{plan.desc}</div>
                    <div className="plan-name">{plan.nombre}</div>

                    <div className="plan-price-row">
                      <span className="plan-price-num">{plan.precio}</span>
                      {plan.periodo && (
                        <span className="plan-price-per">{plan.periodo}</span>
                      )}
                    </div>

                    <div className="plan-divider" />

                    <motion.div
                      className="plan-features"
                      variants={featuresContainerVariants}
                    >
                      {plan.features.map((f, j) => (
                        <motion.div
                          key={j}
                          className="plan-feat-item"
                          variants={featureItemVariants}
                        >
                          <div className="feat-check">✓</div>
                          <span>{f}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    <button className="btn-outline-plan">{plan.cta}</button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="planes-note"
            variants={noteVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Precios en MXN · IVA no incluido · Cancela en cualquier momento
          </motion.p>
        </div>
      </section>
    </>
  )
}
