"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

type ApiErrorCode =
  | "USER_ALREADY_EXISTS"
  | "WEAK_PASSWORD"
  | "MISSING_FIELDS"
  | "INTERNAL_SERVER_ERROR"

const ERROR_MESSAGES: Record<ApiErrorCode, string> = {
  USER_ALREADY_EXISTS: "Este correo ya está registrado.",
  WEAK_PASSWORD: "La contraseña es muy débil. Usa al menos 6 caracteres.",
  MISSING_FIELDS: "Todos los campos son obligatorios.",
  INTERNAL_SERVER_ERROR: "Ocurrió un error al registrarse. Intenta nuevamente.",
}

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [emailTaken, setEmailTaken] = useState(false)
  const [loading, setLoading] = useState(false)

  const resetErrors = () => {
    setError("")
    setEmailTaken(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    resetErrors()

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      let data: { error?: ApiErrorCode } | null = null
      try {
        data = await res.json()
      } catch {
        data = null
      }

      if (!res.ok) {
        const code = data?.error as ApiErrorCode | undefined
        if (code === "USER_ALREADY_EXISTS") {
          setEmailTaken(true)
          setLoading(false)
          return
        }
        setError(
          code && ERROR_MESSAGES[code]
            ? ERROR_MESSAGES[code]
            : "Ocurrió un error al registrarse. Intenta nuevamente."
        )
        setLoading(false)
        return
      }

      router.push(`/auth/signin?email=${encodeURIComponent(email)}`)
    } catch {
      setError("Error de conexión con el servidor.")
      setLoading(false)
    }
  }

  return ( 
    <div
      className="min-h-screen w-full flex justify-center"
      style={{ background: "#E4E4E4", padding: "16px" }}
    >
      <div
        className="w-full"
        style={{
          maxWidth: "1500px",
          background: "#F5F5F5",
          borderRadius: "16px",
          border: "1px solid #D1D1D1",
          padding: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 32px)",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
          .sora { font-family: 'Sora', sans-serif; }

          .page-enter {
            animation: pageIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          @keyframes pageIn {
            from { opacity: 0; transform: translateY(24px) scale(0.985); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          .left-enter {
            animation: leftIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
          }
          @keyframes leftIn {
            from { opacity: 0; transform: translateX(-18px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          .right-enter {
            animation: rightIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both;
          }
          @keyframes rightIn {
            from { opacity: 0; transform: translateX(18px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          .form-enter {
            animation: formIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both;
          }
          @keyframes formIn {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .reg-input {
            transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          }
          .reg-input:focus {
            outline: none;
            border-color: #1B3D7A !important;
            box-shadow: 0 0 0 3px rgba(27,61,122,0.10);
            background: white !important;
          }
          .reg-input-error {
            border-color: #DC2626 !important;
            box-shadow: 0 0 0 3px rgba(220,38,38,0.08) !important;
          }
          .btn-primary {
            transition: opacity 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          }
          .btn-primary:hover:not(:disabled) {
            opacity: 0.91;
            transform: translateY(-1px);
            box-shadow: 0 10px 28px rgba(27,61,122,0.42) !important;
          }
          .btn-primary:active:not(:disabled) { transform: scale(0.99); }
          .btn-secondary {
            transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
          }
          .btn-secondary:hover {
            background: #EEF2FF !important;
            border-color: #1B3D7A !important;
            transform: translateY(-1px);
          }
          @keyframes spin { to { transform: rotate(360deg); } }
          .spinner {
            width: 13px; height: 13px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
            flex-shrink: 0;
          }
          .divider-line { flex: 1; height: 1px; background: #D1D9E6; }

          .left-bg::before {
            content: '';
            position: absolute; inset: 0;
            background-image:
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
            background-size: 44px 44px;
            pointer-events: none;
          }
          .orb {
            position: absolute; border-radius: 50%;
            filter: blur(55px); pointer-events: none;
          }
          .orb-1 { width: 280px; height: 280px; background: rgba(96,165,250,0.16); top: -70px; left: -70px; }
          .orb-2 { width: 220px; height: 220px; background: rgba(147,197,253,0.11); bottom: -50px; right: -50px; }

          .glass-card {
            border-radius: 12px;
            background: rgba(255,255,255,0.07);
            border: 1px solid rgba(255,255,255,0.13);
          }
          .dot-live {
            width: 7px; height: 7px; border-radius: 50%; background: #4ADE80;
            animation: pulse-live 2.2s ease-in-out infinite;
            flex-shrink: 0;
          }
          @keyframes pulse-live {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.3; }
          }
          .check-row {
            display: flex; align-items: flex-start; gap: 9px; margin-bottom: 9px;
          }
          .check-circle {
            width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0; margin-top: 1px;
            background: rgba(255,255,255,0.13);
            border: 1px solid rgba(255,255,255,0.24);
            display: flex; align-items: center; justify-content: center;
          }
          .check-circle::after {
            content: '';
            width: 5px; height: 5px; border-radius: 50%;
            background: #93C5FD;
          }
        `}</style>

        {/* ── INNER CARD: dos columnas ── */}
        <div
          className="page-enter w-full"
          style={{
            maxWidth: "920px",
            borderRadius: "20px",
            border: "1px solid #C8D3E8",
            boxShadow: "0 20px 60px rgba(27,61,122,0.18), 0 4px 16px rgba(0,0,0,0.06)",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "590px",
            background: "white",
          }}
        >
          {/* ── LEFT: AZUL ── */}
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
                <span className="sora font-semibold text-sm" style={{ color: "white" }}>CotizaApp</span>
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <p className="sora text-xs font-semibold mb-2" style={{ color: "#60A5FA", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Plantillas · PDF · Cotizaciones
              </p>
              <h1 className="sora font-bold mb-3" style={{ fontSize: "22px", color: "white", lineHeight: 1.3, letterSpacing: "-0.02em" }}>
                Cotizaciones profesionales,{" "}
                <span style={{ color: "#93C5FD" }}>listas en minutos</span>
              </h1>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>
                Selecciona una plantilla, captura tus datos y genera un PDF listo para imprimir o enviar.
              </p>
              {[
                "Crea y envía cotizaciones en menos de 2 minutos",
                "Tus clientes reciben un PDF listo para aprobar",
                "Historial completo de cada cotización enviada",
              ].map((t) => (
                <div key={t} className="check-row">
                  <div className="check-circle" />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.55 }}>{t}</span>
                </div>
              ))}
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                className="glass-card"
                style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span className="sora text-xs font-semibold" style={{ color: "white" }}>Plan gratuito incluido</span>
                <span className="sora text-xs" style={{ color: "rgba(255,255,255,0.50)" }}>Sin tarjeta · 10 pruebas gratis</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: GRIS + caja blanca ── */}
          <div
            className="right-enter flex flex-col justify-between"
            style={{ background: "#DCE3EE", padding: "28px" }}
          >
            <div className="flex md:hidden justify-center mb-4">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: "white", border: "1px solid #C8D3E8" }}
              >
                <div className="dot-live" style={{ background: "#1B3D7A" }} />
                <span className="sora font-semibold text-sm" style={{ color: "#1B3D7A" }}>CotizaApp</span>
              </div>
            </div>

            {/* CAJA BLANCA */}
            <div
              className="form-enter"
              style={{
                background: "white",
                borderRadius: "16px",
                border: "1px solid #C8D3E8",
                padding: "28px 24px",
                boxShadow: "0 4px 24px rgba(27,61,122,0.10)",
              }}
            >
              <h2 className="sora font-bold mb-1" style={{ fontSize: "20px", color: "#1B3D7A", letterSpacing: "-0.02em" }}>
                Crear cuenta
              </h2>
              <p className="text-sm mb-5" style={{ color: "#64748B" }}>
                Empieza gratis,{" "}
                <span className="sora font-semibold" style={{ color: "#1B3D7A" }}>sin tarjeta de crédito</span>
              </p>

              {error && (
                <div
                  className="mb-4 px-4 py-3 rounded-xl text-xs font-medium sora"
                  style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}
                >
                  {error}
                </div>
              )}

              {emailTaken && (
                <div
                  className="mb-4 px-4 py-3 rounded-xl text-xs font-medium sora flex items-center justify-between gap-3"
                  style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }}
                >
                  <span>Este correo ya está registrado.</span>
                  <Link
                    href={`/auth/signin?email=${encodeURIComponent(email)}`}
                    className="underline font-bold whitespace-nowrap"
                    style={{ color: "#DC2626" }}
                  >
                    Iniciar sesión
                  </Link>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="sora block text-xs font-semibold mb-1.5" style={{ color: "#1B3D7A" }}>Nombre</label>
                    <input
                      tabIndex={1} type="text" placeholder="Lorenzo" value={name}
                      onChange={(e) => setName(e.target.value)} required disabled={loading}
                      className="reg-input sora w-full px-3 py-2.5 rounded-xl text-sm disabled:opacity-50"
                      style={{ background: "#F1F4FA", border: "1.5px solid #C8D3E8", color: "#1E293B" }}
                    />
                  </div>
                  <div>
                    <label className="sora block text-xs font-semibold mb-1.5" style={{ color: "#1B3D7A" }}>Apellido</label>
                    <input
                      tabIndex={2} type="text" placeholder="Valle" value={lastName}
                      onChange={(e) => setLastName(e.target.value)} disabled={loading}
                      className="reg-input sora w-full px-3 py-2.5 rounded-xl text-sm disabled:opacity-50"
                      style={{ background: "#F1F4FA", border: "1.5px solid #C8D3E8", color: "#1E293B" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="sora block text-xs font-semibold mb-1.5" style={{ color: "#1B3D7A" }}>Correo electrónico</label>
                  <input
                    tabIndex={3} type="email" placeholder="tu@correo.com" value={email}
                    onChange={(e) => { setEmail(e.target.value); resetErrors() }} required disabled={loading}
                    className={`reg-input sora w-full px-3 py-2.5 rounded-xl text-sm disabled:opacity-50 ${emailTaken ? "reg-input-error" : ""}`}
                    style={{ background: "#F1F4FA", border: "1.5px solid #C8D3E8", color: "#1E293B" }}
                  />
                </div>

                <div>
                  <label className="sora block text-xs font-semibold mb-1.5" style={{ color: "#1B3D7A" }}>Contraseña</label>
                  <div className="relative">
                    <input
                      tabIndex={4} type={showPassword ? "text" : "password"} placeholder="Mínimo 6 caracteres" value={password}
                      onChange={(e) => setPassword(e.target.value)} required disabled={loading}
                      className="reg-input sora w-full px-3 pr-20 py-2.5 rounded-xl text-sm disabled:opacity-50"
                      style={{ background: "#F1F4FA", border: "1.5px solid #C8D3E8", color: "#1E293B" }}
                    />
                    <button
                      tabIndex={-1} type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 sora text-xs font-semibold"
                      style={{ color: "#94A3B8" }}
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                </div>

                <button
                  tabIndex={5} type="submit" disabled={loading}
                  className="btn-primary sora w-full py-2.5 rounded-full font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                  style={{
                    background: "linear-gradient(135deg, #1B3D7A 0%, #2D5FC4 100%)",
                    boxShadow: loading ? "none" : "0 6px 20px rgba(27,61,122,0.32)",
                    border: "none",
                  }}
                >
                  {loading ? <><div className="spinner" />Creando cuenta...</> : "Crear cuenta gratis"}
                </button>
              </form>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="divider-line" />
                <span className="text-xs sora" style={{ color: "#7A8FA8" }}>¿Ya tienes cuenta?</span>
                <div className="divider-line" />
              </div>
              <Link
                href="/auth/signin"
                className="btn-secondary sora w-full py-2.5 rounded-full font-semibold text-sm flex items-center justify-center"
                style={{ border: "1.5px solid #C8D3E8", color: "#1B3D7A", background: "white" }}
              >
                Iniciar sesión
              </Link>
            </div>

            <p className="text-center text-xs sora mt-4" style={{ color: "#7A8FA8" }}>
              © 2026 CotizaApp · Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
