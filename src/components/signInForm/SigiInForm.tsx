"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"

type SignInFormProps = {
  initialEmail?: string
}

// ─── Icons ───
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
)

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const CotizaAppLogo = () => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
    <div style={{ position: "relative", width: "24px", height: "24px", flexShrink: 0 }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: "18px", height: "18px",
        background: "#1E6FC8",
        borderRadius: "4px",
        transform: "translate(-50%, -50%) rotate(45deg)"
      }} />
      <span style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#fff", fontSize: "11px", fontWeight: 800, lineHeight: 1,
        fontFamily: "Sora, sans-serif"
      }}>$</span>
      <div style={{
        position: "absolute", bottom: "-1px", right: "-1px",
        width: "9px", height: "9px",
        background: "#16A34A",
        borderRadius: "50%",
        border: "1.5px solid #1B3D7A",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <svg width="5" height="5" viewBox="0 0 7 7" fill="none">
          <path d="M1 3.5l2 2 3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
    <span style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", fontWeight: 700, color: "white", letterSpacing: "-0.2px" }}>
      Cotiza<span style={{ color: "#4A9EEB" }}>App</span>
    </span>
  </div>
)

const CotizaAppLogoDark = () => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
    <div style={{ position: "relative", width: "24px", height: "24px", flexShrink: 0 }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: "18px", height: "18px",
        background: "#1E6FC8",
        borderRadius: "4px",
        transform: "translate(-50%, -50%) rotate(45deg)"
      }} />
      <span style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#fff", fontSize: "11px", fontWeight: 800, lineHeight: 1,
        fontFamily: "Sora, sans-serif"
      }}>$</span>
      <div style={{
        position: "absolute", bottom: "-1px", right: "-1px",
        width: "9px", height: "9px",
        background: "#16A34A",
        borderRadius: "50%",
        border: "1.5px solid white",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <svg width="5" height="5" viewBox="0 0 7 7" fill="none">
          <path d="M1 3.5l2 2 3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
    <span style={{ fontFamily: "Sora, sans-serif", fontSize: "14px", fontWeight: 700, color: "#1B3D7A", letterSpacing: "-0.2px" }}>
      Cotiza<span style={{ color: "#1E6FC8" }}>App</span>
    </span>
  </div>
)

const features = [
  "Crea y envía cotizaciones en menos de 2 minutos",
  "Tus clientes reciben un PDF listo para aprobar",
  "Historial completo de cada cotización enviada",
]

export default function SignInForm({ initialEmail = "" }: SignInFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialEmail) setEmail(initialEmail)
  }, [initialEmail])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (!email || !password) {
      setErrorMsg("Completa todos los campos")
      return
    }

    setLoading(true)

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setErrorMsg(
        res.error.includes("USER_NOT_FOUND")
          ? "Tu cuenta fue eliminada o no existe"
          : "Correo o contraseña incorrectos"
      )
      setPassword("")
      setTimeout(() => passwordRef.current?.focus(), 0)
      setLoading(false)
      return
    }

    router.push("/onboarding/profile")
  }

  const handleGoogleLogin = () => signIn("google", { callbackUrl: "/" })

  return (
    <div className="min-h-screen w-full flex justify-center" style={{ background: "#E4E4E4", padding: "16px" }}>
      <div className="w-full" style={{ maxWidth: "1500px", background: "#F5F5F5", borderRadius: "16px", border: "1px solid #D1D1D1", padding: "32px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 32px)" }}>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
          .sora { font-family: 'Sora', sans-serif; }
          .page-enter { animation: pageIn 0.6s cubic-bezier(0.22,1,0.36,1) both; }
          @keyframes pageIn { from { opacity:0; transform:translateY(24px) scale(0.985); } to { opacity:1; transform:translateY(0) scale(1); } }
          .left-enter { animation: leftIn 0.65s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
          @keyframes leftIn { from { opacity:0; transform:translateX(-18px); } to { opacity:1; transform:translateX(0); } }
          .right-enter { animation: rightIn 0.65s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
          @keyframes rightIn { from { opacity:0; transform:translateX(18px); } to { opacity:1; transform:translateX(0); } }
          .form-enter { animation: formIn 0.55s cubic-bezier(0.22,1,0.36,1) 0.28s both; }
          @keyframes formIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
          .si-input { transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }
          .si-input:focus { outline:none; border-color:#1B3D7A !important; box-shadow:0 0 0 3px rgba(27,61,122,0.10); background:white !important; }
          .btn-primary { transition: opacity 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease; }
          .btn-primary:hover:not(:disabled) { opacity:0.91; transform:translateY(-1px); box-shadow:0 10px 28px rgba(27,61,122,0.42) !important; }
          .btn-primary:active:not(:disabled) { transform:scale(0.99); }
          .btn-google { transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease; }
          .btn-google:hover:not(:disabled) { background:#F8FAFC !important; transform:translateY(-1px); box-shadow:0 4px 16px rgba(0,0,0,0.08) !important; }
          .btn-secondary { transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease; }
          .btn-secondary:hover { background:#EEF2FF !important; border-color:#1B3D7A !important; transform:translateY(-1px); }
          @keyframes spin { to { transform:rotate(360deg); } }
          .spinner { width:13px; height:13px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.7s linear infinite; flex-shrink:0; }
          .divider-line { flex:1; height:1px; background:#D1D9E6; }
          .left-bg::before { content:''; position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px); background-size:44px 44px; pointer-events:none; }
          .orb { position:absolute; border-radius:50%; filter:blur(55px); pointer-events:none; }
          .orb-1 { width:280px; height:280px; background:rgba(96,165,250,0.16); top:-70px; left:-70px; }
          .orb-2 { width:220px; height:220px; background:rgba(147,197,253,0.11); bottom:-50px; right:-50px; }
          .check-circle { width:18px; height:18px; border-radius:50%; flex-shrink:0; background:rgba(255,255,255,0.13); border:1px solid rgba(255,255,255,0.24); display:flex; align-items:center; justify-content:center; }
          .check-circle::after { content:''; width:5px; height:5px; border-radius:50%; background:#93C5FD; }
          @keyframes errorIn { from{opacity:0;transform:translateY(-6px);} to{opacity:1;transform:translateY(0);} }
          .error-inline { animation: errorIn 0.25s cubic-bezier(0.16,1,0.3,1) both; }
        `}</style>

        <div className="page-enter w-full" style={{ maxWidth:"920px", borderRadius:"20px", border:"1px solid #C8D3E8", boxShadow:"0 20px 60px rgba(27,61,122,0.18), 0 4px 16px rgba(0,0,0,0.06)", overflow:"hidden", display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:"590px", background:"white" }}>

          {/* ── PANEL IZQUIERDO ── */}
          <div className="left-enter left-bg hidden md:flex flex-col justify-between" style={{ background:"#1B3D7A", padding:"36px 32px", position:"relative", overflow:"hidden" }}>
            <div className="orb orb-1" /><div className="orb orb-2" />

            {/* Logo */}
            <div style={{ position:"relative", zIndex:1 }}>
              <div className="inline-flex items-center" style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "999px",
                padding: "6px 12px 6px 8px"
              }}>
                <CotizaAppLogo />
              </div>
            </div>

            {/* Copy central */}
            <div style={{ position:"relative", zIndex:1 }}>
              <p className="sora text-xs font-semibold mb-2" style={{ color:"#60A5FA", letterSpacing:"0.1em", textTransform:"uppercase" }}>Plantillas · PDF · Cotizaciones</p>
              <h1 className="sora font-bold mb-3" style={{ fontSize:"22px", color:"white", lineHeight:1.3, letterSpacing:"-0.02em" }}>
                Bienvenido de vuelta a <span style={{ color:"#93C5FD" }}>tu negocio</span>
              </h1>
              <p className="text-sm mb-5" style={{ color:"rgba(255,255,255,0.55)", lineHeight:1.65 }}>
                Todo lo que necesitas para cotizar, cobrar y crecer — en un solo lugar.
              </p>
              {features.map((t) => (
                <div key={t} style={{ display:"flex", alignItems:"flex-start", gap:"9px", marginBottom:"9px" }}>
                  <div className="check-circle" />
                  <span className="text-xs" style={{ color:"rgba(255,255,255,0.72)", lineHeight:1.55 }}>{t}</span>
                </div>
              ))}
            </div>

            <div style={{ position:"relative", zIndex:1, minHeight:"20px" }} />
          </div>

          {/* ── PANEL DERECHO ── */}
          <div className="right-enter flex flex-col justify-between" style={{ background:"#DCE3EE", padding:"28px" }}>

            {/* Logo móvil */}
            <div className="flex md:hidden justify-center mb-4">
              <div className="inline-flex items-center rounded-full" style={{
                background: "white",
                border: "1px solid #C8D3E8",
                padding: "6px 12px 6px 8px"
              }}>
                <CotizaAppLogoDark />
              </div>
            </div>

            {/* Formulario */}
            <div className="form-enter" style={{ background:"white", borderRadius:"16px", border:"1px solid #C8D3E8", padding:"28px 24px", boxShadow:"0 4px 24px rgba(27,61,122,0.10)" }}>
              <h2 className="sora font-bold mb-1" style={{ fontSize:"20px", color:"#1B3D7A", letterSpacing:"-0.02em" }}>Iniciar sesión</h2>
              <p className="text-sm mb-5" style={{ color:"#64748B" }}>
                Accede a tu cuenta de <span className="sora font-semibold" style={{ color:"#1B3D7A" }}>CotizaApp</span>
              </p>

              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="sora block text-xs font-semibold mb-1.5" style={{ color:"#1B3D7A" }}>Correo electrónico</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:"#94A3B8" }}><MailIcon /></div>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrorMsg("") }}
                      required
                      disabled={loading}
                      className="si-input sora w-full pl-10 pr-4 py-2.5 rounded-xl text-sm disabled:opacity-50"
                      style={{ background:"#F1F4FA", border:"1.5px solid #C8D3E8", color:"#1E293B" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="sora block text-xs font-semibold" style={{ color:"#1B3D7A" }}>Contraseña</label>
                    <Link href="/auth/forgot-password" className="text-xs sora font-semibold hover:underline" style={{ color:"#1B3D7A" }}>
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:"#94A3B8" }}><LockIcon /></div>
                    <input
                      ref={passwordRef}
                      type={showPassword ? "text" : "password"}
                      placeholder="Tu contraseña"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrorMsg("") }}
                      required
                      disabled={loading}
                      className="si-input sora w-full pl-10 pr-20 py-2.5 rounded-xl text-sm disabled:opacity-50"
                      style={{ background:"#F1F4FA", border: errorMsg ? "1.5px solid #DC2626" : "1.5px solid #C8D3E8", color:"#1E293B" }}
                    />
                    <button
                      tabIndex={-1}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 sora text-xs font-semibold"
                      style={{ color:"#94A3B8" }}
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="error-inline flex items-center gap-1.5 mt-2 px-3 py-2 rounded-xl" style={{ background:"#FEF2F2", border:"1px solid #FECACA" }}>
                      <span className="sora text-xs font-medium" style={{ color:"#DC2626" }}>{errorMsg}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  tabIndex={3}
                  className="btn-primary sora w-full py-2.5 rounded-full font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                  style={{ background:"linear-gradient(135deg, #1B3D7A 0%, #2D5FC4 100%)", boxShadow: loading ? "none" : "0 6px 20px rgba(27,61,122,0.32)", border:"none" }}
                >
                  {loading ? <><div className="spinner" />Entrando...</> : "Iniciar sesión"}
                </button>
              </form>

              <div className="flex items-center gap-3 mt-4 mb-3">
                <div className="divider-line" />
                <span className="text-xs sora" style={{ color:"#7A8FA8" }}>o continúa con</span>
                <div className="divider-line" />
              </div>

              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="btn-google sora w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 disabled:opacity-60"
                style={{ background:"white", border:"1.5px solid #C8D3E8", color:"#1E293B", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}
              >
                <GoogleIcon />
                Continuar con Google
              </button>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="divider-line" />
                <span className="text-xs sora" style={{ color:"#7A8FA8" }}>¿Nuevo aquí?</span>
                <div className="divider-line" />
              </div>
              <Link
                href="/auth/register"
                className="btn-secondary sora w-full py-2.5 rounded-full font-semibold text-sm flex items-center justify-center"
                style={{ border:"1.5px solid #C8D3E8", color:"#1B3D7A", background:"white" }}
              >
                Crear cuenta gratis
              </Link>
            </div>

            <p className="text-center text-xs sora mt-4" style={{ color:"#7A8FA8" }}>
              © 2026 CotizaApp · Todos los derechos reservados
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
