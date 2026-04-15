"use client";

import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px 100px 0px" }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .footer-root {
          position: relative;
          background: #1b3d7a;
          overflow: hidden;
          color: white;
        }

        /* Burbujas decorativas */
        .footer-bubble {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .footer-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 32px 0;
        }

        /* CTA */
        .footer-cta {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 24px;
          padding: 44px 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 72px;
          backdrop-filter: blur(8px);
          transition: background 0.3s ease, border-color 0.3s ease;
          flex-wrap: wrap;
        }

        .footer-cta:hover {
          background: rgba(255, 255, 255, 0.10);
          border-color: rgba(255, 255, 255, 0.22);
        }

        .footer-cta-title {
          font-size: clamp(20px, 2.5vw, 26px);
          font-weight: 800;
          color: white;
          margin: 0 0 6px;
          letter-spacing: -0.3px;
        }

        .footer-cta-sub {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.55);
          margin: 0;
        }

        /* Botón estilo pill oscuro como el de la imagen */
        .footer-cta-btn {
          padding: 14px 32px;
          border-radius: 999px;
          background: #0f2a5e;
          color: white;
          font-size: 14px;
          font-weight: 700;
          border: 1.5px solid rgba(255,255,255,0.12);
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          flex-shrink: 0;
          letter-spacing: 0.01em;
        }

        .footer-cta-btn:hover {
          background: #0a1f47;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
        }

        /* Grid principal - solo 2 columnas: marca + producto */
        .footer-cols {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 48px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 640px) {
          .footer-cols {
            grid-template-columns: 1fr;
          }
          .footer-cta {
            padding: 28px 24px;
          }
          .footer-inner {
            padding: 60px 20px 0;
          }
        }

        /* Marca */
        .footer-brand-logo {
          font-size: 22px;
          font-weight: 800;
          color: white;
          letter-spacing: -0.5px;
          margin: 0 0 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-brand-logo-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #4f8ef7;
          display: inline-block;
          box-shadow: 0 0 10px rgba(79,142,247,0.7);
        }

        .footer-brand-desc {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.8;
          margin: 0 0 28px;
          max-width: 300px;
        }

        /* Redes sociales - solo in */
        .footer-socials {
          display: flex;
          gap: 10px;
        }

        .footer-social-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }

        .footer-social-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.28);
          transform: translateY(-3px);
          color: white;
        }

        /* Columna Producto */
        .footer-col-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.38);
          margin: 0 0 20px;
        }

        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.62);
          cursor: pointer;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: fit-content;
          text-decoration: none;
        }

        .footer-link::before {
          content: "";
          width: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.7);
          transition: width 0.25s ease;
          display: inline-block;
        }

        .footer-link:hover {
          color: white;
          transform: translateX(4px);
        }

        .footer-link:hover::before {
          width: 8px;
        }

        /* Barra inferior */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px 0 36px;
        }

        .footer-copy {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.3);
          text-align: center;
        }

        .footer-copy span {
          color: rgba(255, 255, 255, 0.5);
        }

        /* Animaciones */
        .foot-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .foot-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
        }
      `}</style>

      <footer className="footer-root" aria-label="Pie de página">

        {/* Burbujas decorativas */}
        <div className="footer-bubble" aria-hidden="true" style={{ width: 400, height: 400, top: -120, left: -100, background: "radial-gradient(circle, rgba(79,142,247,0.18) 0%, transparent 70%)" }} />
        <div className="footer-bubble" aria-hidden="true" style={{ width: 300, height: 300, top: 60, right: -80, background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)" }} />
        <div className="footer-bubble" aria-hidden="true" style={{ width: 220, height: 220, bottom: 80, left: "40%", background: "radial-gradient(circle, rgba(79,142,247,0.10) 0%, transparent 70%)" }} />

        <div ref={ref} className="footer-inner">

          {/* CTA */}
          <div className={`foot-reveal footer-cta ${visible ? "visible" : ""}`} style={{ transitionDelay: "0ms" }}>
            <div>
              <h2 className="footer-cta-title">¿Listo para cotizar mejor?</h2>
              <p className="footer-cta-sub">Empieza gratis hoy. Sin tarjeta de crédito.</p>
            </div>
            <button className="footer-cta-btn" aria-label="Crear cuenta gratis">
              Crear cuenta gratis →
            </button>
          </div>

          {/* Columnas */}
          <div className={`foot-reveal footer-cols ${visible ? "visible" : ""}`} style={{ transitionDelay: "80ms" }}>
            {/* Marca */}
            <div>
              <div className="footer-brand-logo">
                <span className="footer-brand-logo-dot" aria-hidden="true" />
                <span>CotizaApp</span>
              </div>
              <p className="footer-brand-desc">
                La forma más rápida y profesional de crear, personalizar y enviar cotizaciones a tus clientes.
              </p>
              <div className="footer-socials">
                <a href="#" className="footer-social-btn" title="LinkedIn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  in
                </a>
              </div>
            </div>

            {/* Producto */}
            <div>
              <h3 className="footer-col-title">Producto</h3>
              <ul className="footer-link-list">
                {["Características", "Plantillas", "Precios"].map((item) => (
                  <li key={item}>
                    <a href="#" className="footer-link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-divider" aria-hidden="true" />

          {/* Bottom */}
          <div className={`foot-reveal footer-bottom ${visible ? "visible" : ""}`} style={{ transitionDelay: "160ms" }}>
            <p className="footer-copy">
              © {new Date().getFullYear()} <span>CotizaApp</span>. Todos los derechos reservados.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
