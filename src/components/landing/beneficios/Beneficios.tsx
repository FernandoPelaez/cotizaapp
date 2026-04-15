"use client"

import { useEffect, useRef } from "react"

export default function Beneficios() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".b-card")
    if (!cards) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.delay ?? "0"
            setTimeout(() => {
              el.classList.add("b-card--visible")
            }, Number(delay))
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  const items = [
    {
      title: "Cotizaciones en minutos",
      desc: "Genera documentos listos para enviar sin procesos manuales ni hojas de cálculo.",
      gradient: "from-blue-700 to-blue-900",
      icon: "⚡",
      iconBg: "bg-blue-400/15",
      delay: 0,
    },
    {
      title: "Cálculos sin errores",
      desc: "Precios, descuentos e IVA calculados automáticamente. Sin equivocaciones.",
      gradient: "from-emerald-600 to-emerald-900",
      icon: "✓",
      iconBg: "bg-emerald-400/15",
      delay: 60,
    },
    {
      title: "Imagen profesional",
      desc: "Documentos limpios y modernos con tu marca desde el primer vistazo.",
      gradient: "from-violet-700 to-violet-900",
      icon: "★",
      iconBg: "bg-violet-400/15",
      delay: 120,
    },
    {
      title: "Comparte al instante",
      desc: "Envía por WhatsApp o correo directo. Tu cliente recibe la cotización en segundos.",
      gradient: "from-orange-500 to-orange-900",
      icon: "↗",
      iconBg: "bg-orange-400/15",
      delay: 180,
    },
    {
      title: "Historial organizado",
      desc: "Filtra por cliente, fecha o monto y retoma cualquier cotización anterior.",
      gradient: "from-rose-600 to-rose-900",
      icon: "📋",
      iconBg: "bg-rose-400/15",
      delay: 240,
    },
    {
      title: "Plantillas modernas",
      desc: "Diseños adaptados a tu giro que transmiten seriedad y profesionalismo.",
      gradient: "from-sky-600 to-sky-900",
      icon: "◈",
      iconBg: "bg-sky-400/15",
      delay: 300,
    },
    {
      title: "Clientes guardados",
      desc: "Reutiliza datos de tus clientes en futuras cotizaciones con un solo clic.",
      gradient: "from-amber-600 to-amber-900",
      icon: "👤",
      iconBg: "bg-amber-400/15",
      delay: 360,
    },
    {
      title: "Desde cualquier lugar",
      desc: "Funciona en celular, tablet o computadora. Sin instalar nada.",
      gradient: "from-teal-600 to-teal-900",
      icon: "☁",
      iconBg: "bg-teal-400/15",
      delay: 420,
    },
  ]

  return (
    <>
      <style>{`
        .b-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }
        .b-card {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.45s ease,
            transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.25s ease;
        }
        .b-card--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .b-card:hover {
          transform: translateY(-5px) scale(1.015);
          box-shadow: 0 16px 36px rgba(0,0,0,0.14);
        }
        .b-shimmer {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.07);
          transform: translateX(-120%) skewX(-20deg);
          pointer-events: none;
        }
        .b-card:hover .b-shimmer {
          animation: shimmer 0.6s ease forwards;
        }
        @keyframes shimmer {
          from { transform: translateX(-120%) skewX(-20deg); }
          to   { transform: translateX(220%) skewX(-20deg); }
        }
        .b-card:hover .b-icon {
          animation: float 2s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
        .b-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 4px 16px;
          margin-bottom: 14px;
        }
        .b-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .b-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .b-grid { grid-template-columns: repeat(1, 1fr); }
        }
      `}</style>

      <section
        className="b-section w-full px-8 bg-[var(--background)] overflow-hidden"
        id="beneficios"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="max-w-7xl mx-auto w-full">

          <div className="text-center mb-10">
            <span className="b-badge">Beneficios</span>

            <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)]">
              Todo lo que ganas al usar{" "}
              <span className="text-[var(--text-muted)]">CotizaApp</span>
            </h2>

            <p className="mt-4 text-[var(--text-muted)] max-w-xl mx-auto text-base leading-relaxed">
              Más clientes cerrados, menos tiempo perdido y una imagen que habla por tu negocio.
            </p>
          </div>

          <div ref={cardsRef} className="b-grid">
            {items.map((item, i) => (
              <div
                key={i}
                className="b-card group relative rounded-2xl border border-[var(--border)] bg-[var(--card)] text-left overflow-hidden cursor-default"
                style={{ padding: "28px 24px" }}
                data-delay={item.delay}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                />
                <div className="b-shimmer rounded-2xl" />

                <div className="relative z-10">
                  <div
                    className={`b-icon w-11 h-11 rounded-xl flex items-center justify-center text-lg mb-4 ${item.iconBg} group-hover:bg-white/10 transition-colors duration-300`}
                  >
                    {item.icon}
                  </div>

                  <h3
                    className="text-[var(--foreground)] group-hover:text-white transition-colors duration-300 leading-snug"
                    style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "8px" }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="text-[var(--text-muted)] group-hover:text-white/75 transition-colors duration-300 leading-relaxed"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
