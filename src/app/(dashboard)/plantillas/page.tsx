"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const categories = [
  {
    id: "clasica",
    name: "Clásica",
    description:
      "Plantillas tradicionales y formales para cotizaciones profesionales.",
    type: "basic" as const,
    icon: "📄",
    count: 10,
    accent: "#1B3D7A",
  },
  {
    id: "moderna",
    name: "Moderna",
    description:
      "Diseños más visuales y atractivos para destacar tu marca.",
    type: "pro" as const,
    icon: "✦",
    count: 10,
    accent: "#16A34A",
  },
]

export default function PlantillasPage() {
  const [visible, setVisible] = useState<boolean[]>(
    new Array(categories.length).fill(false)
  )

  useEffect(() => {
    categories.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 120 + i * 140)
    })
  }, [])

  return (
    <div className="plantillas-page">
      <div className="page-hero">
        <div className="hero-inner">
          <div className="hero-tag">
            <span className="hero-dot" />
            Biblioteca de diseños
          </div>

          <h1 className="hero-title">Plantillas</h1>

          <p className="hero-subtitle">
            Elige una categoría y personaliza tu cotización con el estilo que
            mejor represente tu negocio.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">20</span>
              <span className="stat-label">Plantillas disponibles</span>
            </div>

            <div className="stat-divider" />

            <div className="stat-item">
              <span className="stat-number">2</span>
              <span className="stat-label">Categorías</span>
            </div>

            <div className="stat-divider" />

            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Personalizables</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-label">
        <span>Selecciona una categoría</span>
        <div className="section-line" />
      </div>

      <div className="cards-grid">
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            href={`/plantillas/${cat.id}`}
            className={`category-card ${visible[i] ? "card-visible" : "card-hidden"}`}
            style={{ "--accent": cat.accent } as React.CSSProperties}
          >
            <span
              className={`type-badge ${
                cat.type === "pro" ? "badge-pro" : "badge-basic"
              }`}
            >
              {cat.type === "pro" ? "PRO" : "BÁSICA"}
            </span>

            <div className="card-icon">{cat.icon}</div>

            <div className="card-body">
              <h2 className="card-title">{cat.name}</h2>
              <p className="card-description">{cat.description}</p>
            </div>

            <div className="card-footer">
              <span className="template-count">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ marginRight: 4, opacity: 0.45 }}
                >
                  <rect
                    x="1"
                    y="1"
                    width="5"
                    height="5"
                    rx="1.2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <rect
                    x="8"
                    y="1"
                    width="5"
                    height="5"
                    rx="1.2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <rect
                    x="1"
                    y="8"
                    width="5"
                    height="5"
                    rx="1.2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <rect
                    x="8"
                    y="8"
                    width="5"
                    height="5"
                    rx="1.2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
                {cat.count} plantillas
              </span>

              <span className="cta-link">
                Explorar
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="cta-arrow"
                >
                  <path
                    d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className="card-accent-line" />
          </Link>
        ))}
      </div>

      <style>{`
        .plantillas-page {
          min-height: 100vh;
          background: #DDE2EA;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        .page-hero {
          background: #132D5E;
          padding: 2.75rem 2.5rem 3rem;
          position: relative;
          overflow: hidden;
        }

        .page-hero::before {
          content: '';
          position: absolute;
          top: -50px;
          right: -50px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: rgba(255,255,255,0.035);
        }

        .page-hero::after {
          content: '';
          position: absolute;
          bottom: -70px;
          left: 35%;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(255,255,255,0.025);
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 680px;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-bottom: 0.85rem;
        }

        .hero-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 7px #4ade80;
        }

        .hero-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 0.7rem;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.65;
          margin: 0 0 1.85rem;
          max-width: 460px;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-number {
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 0.68rem;
          color: rgba(255,255,255,0.45);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .stat-divider {
          width: 1px;
          height: 34px;
          background: rgba(255,255,255,0.12);
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.6rem 2.5rem 0.9rem;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #7A8499;
        }

        .section-line {
          flex: 1;
          height: 1px;
          background: #C8CDD8;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 1.2rem;
          padding: 0 2.5rem 2.5rem;
        }

        .category-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid #D1D5DE;
          border-radius: 16px;
          padding: 1.6rem;
          text-decoration: none;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04);
          transition:
            transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.22s ease,
            border-color 0.22s ease;
        }

        .category-card:hover {
          transform: translateY(-5px) scale(1.01);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12), 0 0 0 2px var(--accent);
          border-color: var(--accent);
        }

        .category-card:hover .card-accent-line {
          transform: scaleX(1);
          opacity: 1;
        }

        .category-card:hover .cta-link {
          color: var(--accent);
          gap: 6px;
        }

        .category-card:hover .cta-arrow {
          transform: translateX(3px);
        }

        .category-card:active {
          transform: translateY(-2px) scale(0.99);
        }

        .card-hidden {
          opacity: 0;
          transform: translateY(28px);
        }

        .card-visible {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .type-badge {
          position: absolute;
          top: 1.1rem;
          right: 1.1rem;
          font-size: 0.63rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 3px 9px;
          border-radius: 20px;
        }

        .badge-pro {
          background: #FEF3C7;
          color: #92400E;
        }

        .badge-basic {
          background: #E8EDF7;
          color: #1B3D7A;
        }

        .card-icon {
          font-size: 1.5rem;
          margin-bottom: 1.1rem;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          transition: background 0.2s;
        }

        .category-card:hover .card-icon {
          background: color-mix(in srgb, var(--accent) 18%, transparent);
        }

        .card-body {
          flex: 1;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.4rem;
          letter-spacing: -0.01em;
        }

        .card-description {
          font-size: 0.865rem;
          color: #6B7280;
          line-height: 1.55;
          margin: 0;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid #EAECF0;
        }

        .template-count {
          display: flex;
          align-items: center;
          font-size: 0.78rem;
          color: #9CA3AF;
          font-weight: 500;
        }

        .cta-link {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #374151;
          transition: color 0.2s, gap 0.2s;
        }

        .cta-arrow {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .card-accent-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent);
          transform: scaleX(0);
          opacity: 0;
          transform-origin: left;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
        }

        @media (max-width: 640px) {
          .page-hero {
            padding: 2rem 1.25rem 2.5rem;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .section-label,
          .cards-grid {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }

          .hero-stats {
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  )
}
