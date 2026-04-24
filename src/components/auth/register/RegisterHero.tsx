import {
  PLAN_COPY,
  PLAN_LABELS,
  type SelectedPlanSlug,
} from "@/lib/plans/plan-utils"

type RegisterHeroProps = {
  selectedPlan?: SelectedPlanSlug
}

const REGISTER_FEATURES = [
  "Crea y envía cotizaciones en cuestión de minutos",
  "Tus clientes reciben un PDF listo para aprobar",
  "Historial completo de cada cotización enviada",
]

export default function RegisterHero({ selectedPlan = null }: RegisterHeroProps) {
  const hasSelectedPaidPlan = selectedPlan !== null

  return (
    <div
      className="left-enter left-bg hidden md:flex flex-col justify-between"
      style={{
        background: "#1B3D7A",
        padding: "36px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          className="inline-flex items-center gap-2 px-4 py-2"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "999px",
          }}
        >
          <div className="dot-live" />
          <span
            className="sora font-semibold text-sm"
            style={{ color: "white" }}
          >
            CotizaApp
          </span>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          className="sora text-xs font-semibold mb-2"
          style={{
            color: "#60A5FA",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Plantillas · PDF · Cotizaciones
        </p>

        <h1
          className="sora font-bold mb-3"
          style={{
            fontSize: "22px",
            color: "white",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
          }}
        >
          Cotizaciones profesionales,{" "}
          <span style={{ color: "#93C5FD" }}>listas en minutos</span>
        </h1>

        <p
          className="text-sm mb-5"
          style={{
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.65,
          }}
        >
          Selecciona una plantilla, captura tus datos y genera un PDF listo para
          imprimir o enviar.
        </p>

        {REGISTER_FEATURES.map((feature) => (
          <div key={feature} className="check-row">
            <div className="check-circle" />
            <span
              className="text-xs"
              style={{
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.55,
              }}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          className="glass-card"
          style={{
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {hasSelectedPaidPlan ? (
            <>
              <span
                className="sora text-xs font-semibold"
                style={{ color: "white" }}
              >
                Plan {PLAN_LABELS[selectedPlan]}
              </span>

              <span
                className="sora text-xs"
                style={{
                  color: "rgba(255,255,255,0.50)",
                  textAlign: "right",
                }}
              >
                {PLAN_COPY[selectedPlan]}
              </span>
            </>
          ) : (
            <>
              <span
                className="sora text-xs font-semibold"
                style={{ color: "white" }}
              >
                Acceso gratuito
              </span>

              <span
                className="sora text-xs"
                style={{
                  color: "rgba(255,255,255,0.50)",
                  textAlign: "right",
                }}
              >
                Sin tarjeta · 5 cotizaciones de prueba
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
