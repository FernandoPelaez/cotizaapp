"use client"

import { motion } from "framer-motion"

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

export default function Beneficios() {
  const items = [
    {
      title: "Cotizaciones en minutos",
      desc: "Genera documentos listos para enviar sin procesos manuales ni hojas de cálculo.",
      gradient: "from-blue-700 to-blue-900",
      icon: "⚡",
      iconBg: "bg-blue-400/15",
    },
    {
      title: "Cálculos sin errores",
      desc: "Precios, descuentos e IVA calculados automáticamente. Sin equivocaciones.",
      gradient: "from-emerald-600 to-emerald-900",
      icon: "✓",
      iconBg: "bg-emerald-400/15",
    },
    {
      title: "Imagen profesional",
      desc: "Documentos limpios y modernos con tu marca desde el primer vistazo.",
      gradient: "from-violet-700 to-violet-900",
      icon: "★",
      iconBg: "bg-violet-400/15",
    },
    {
      title: "Comparte al instante",
      desc: "Envía por WhatsApp o correo directo. Tu cliente recibe la cotización en segundos.",
      gradient: "from-orange-500 to-orange-900",
      icon: "↗",
      iconBg: "bg-orange-400/15",
    },
    {
      title: "Historial organizado",
      desc: "Filtra por cliente, fecha o monto y retoma cualquier cotización anterior.",
      gradient: "from-rose-600 to-rose-900",
      icon: "📋",
      iconBg: "bg-rose-400/15",
    },
    {
      title: "Plantillas modernas",
      desc: "Diseños adaptados a tu giro que transmiten seriedad y profesionalismo.",
      gradient: "from-sky-600 to-sky-900",
      icon: "◈",
      iconBg: "bg-sky-400/15",
    },
    {
      title: "Clientes guardados",
      desc: "Reutiliza datos de tus clientes en futuras cotizaciones con un solo clic.",
      gradient: "from-amber-600 to-amber-900",
      icon: "👤",
      iconBg: "bg-amber-400/15",
    },
    {
      title: "Desde cualquier lugar",
      desc: "Funciona en celular, tablet o computadora. Sin instalar nada.",
      gradient: "from-teal-600 to-teal-900",
      icon: "☁",
      iconBg: "bg-teal-400/15",
    },
  ]

  return (
    <>
      <style>{`
        .b-section {
          width: 100%;
          box-sizing: border-box;
          position: relative;
          scroll-margin-top: 76px;
          padding-top: clamp(52px, 4vw, 64px);
          padding-bottom: 80px;
        }
        .b-card:hover {
          transform: translateY(-5px) scale(1.015);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14);
        }
        .b-shimmer {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.07);
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
          50% { transform: translateY(-4px); }
        }
        .b-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #1b3d7a;
          border: 1px solid #1b3d7a;
          border-radius: 999px;
          padding: 4px 16px;
          margin-bottom: 14px;
        }
        .b-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .b-section {
            padding-top: 56px;
            padding-bottom: 72px;
          }
          .b-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .b-section {
            padding-top: 52px;
            padding-bottom: 64px;
          }
        }
        @media (max-width: 560px) {
          .b-grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>

      <section
        className="b-section w-full px-8 bg-[var(--background)]"
        id="beneficios"
      >
        <div className="max-w-7xl mx-auto w-full">

          {/* Header animado */}
          <div className="text-center mb-10">
            <motion.span
              className="b-badge"
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Beneficios
            </motion.span>

            <motion.h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "#0f172a" }}
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            >
              Todo lo que ganas al usar{" "}
              <span style={{ color: "#1b3d7a" }}>CotizaApp</span>
            </motion.h2>

            <motion.p
              className="mt-4 max-w-xl mx-auto text-base leading-relaxed"
              style={{ color: "#64748b" }}
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              Más clientes cerrados, menos tiempo perdido y una imagen que habla por tu negocio.
            </motion.p>
          </div>

          {/* Grid con stagger */}
          <motion.div
            className="b-grid"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {items.map((item, i) => (
              <motion.div
                key={i}
                className="b-card group relative rounded-2xl border border-[var(--border)] bg-[var(--card)] text-left overflow-hidden cursor-default"
                style={{ padding: "28px 24px", transition: "box-shadow 0.25s ease" }}
                variants={cardVariants}
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
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  )
}
