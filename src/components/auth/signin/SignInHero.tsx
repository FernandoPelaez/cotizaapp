import { CotizaAppLogo } from "./SignInIcons"

const SIGNIN_FEATURES = [
  "Crea cotizaciones profesionales con tu marca",
  "Tus clientes reciben un PDF listo para aprobar",
  "Historial completo de cada cotización enviada",
]

export default function SignInHero() {
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
          className="logo-enter inline-flex items-center"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "999px",
            padding: "6px 12px 6px 8px",
          }}
        >
          <CotizaAppLogo />
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="headline-enter">
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
            Bienvenido de vuelta a{" "}
            <span style={{ color: "#93C5FD" }}>tu negocio</span>
          </h1>

          <p
            className="text-sm mb-5"
            style={{
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65,
            }}
          >
            Todo lo que necesitas para cotizar, cobrar y crecer — en un solo
            lugar.
          </p>
        </div>

        {SIGNIN_FEATURES.map((feature) => (
          <div
            key={feature}
            className="feature-item"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "9px",
              marginBottom: "9px",
            }}
          >
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

      <div style={{ position: "relative", zIndex: 1, minHeight: "20px" }} />
    </div>
  )
}
