"use client"

import { useState, useEffect } from "react"

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#2D6BFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1" fill="#2D6BFF" />
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
)

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage("Ingresa tu correo")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || "Error")
      } else {
        setMessage("Si el correo existe, revisa la terminal para el enlace")
      }
    } catch {
      setMessage("Error del servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-[var(--background)] flex items-center justify-center px-4">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
        .sora { font-family: 'Sora', sans-serif; }

        .fade-up-1 {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s;
        }
        .fade-up-2 {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.18s;
        }
        .mounted .fade-up-1, .mounted .fade-up-2 { opacity: 1; transform: translateY(0); }

        .dot-pulse { animation: dot-pulse 2.5s ease-in-out infinite; }
        @keyframes dot-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(45,107,255,0.45); }
          50% { box-shadow: 0 0 0 6px rgba(45,107,255,0); }
        }

        .fp-input {
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .fp-input:focus {
          outline: none;
          border-color: var(--primary) !important;
          box-shadow: 0 0 0 3px rgba(45,107,255,0.1);
          background: white !important;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
      `}</style>

      <div className={`w-full max-w-sm ${mounted ? "mounted" : ""}`}>

        <div className="text-center fade-up-1 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--border)] rounded-full shadow-sm">
            <div className="w-2 h-2 bg-[var(--primary)] rounded-full dot-pulse" />
            <span className="sora font-semibold text-[var(--foreground)] text-sm tracking-tight">CotizaApp</span>
          </div>
        </div>

        <div
          className="bg-[var(--card)] rounded-3xl p-8 fade-up-2"
          style={{ border: "0.5px solid var(--border)", boxShadow: "0 4px 32px rgba(45,107,255,0.07)" }}
        >
          <div className="flex flex-col items-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: "var(--primary-soft)", border: "1px solid var(--primary-light)" }}
            >
              <LockIcon />
            </div>
            <h2 className="sora text-2xl font-bold text-[var(--foreground)] tracking-tight mb-2">
              Recuperar contraseña
            </h2>
            <p className="text-sm text-[var(--text-muted)] text-center leading-relaxed max-w-xs">
              Ingresa tu correo y te enviaremos un enlace para restablecer tu acceso.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="sora block text-xs font-semibold text-[var(--foreground)] mb-1.5 tracking-wide">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                  <MailIcon />
                </div>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="fp-input sora w-full pl-10 pr-4 py-3 rounded-xl text-sm text-[var(--foreground)] disabled:opacity-50"
                  style={{
                    background: "var(--background)",
                    border: "1.5px solid var(--border)",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="sora w-full py-3 rounded-full font-semibold text-sm text-white flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-0.5 active:scale-98"
              style={{
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
                boxShadow: loading ? "none" : "0 6px 20px rgba(45,107,255,0.32)",
              }}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Enviando...
                </>
              ) : (
                <>
                  <SendIcon />
                  Enviar enlace
                </>
              )}
            </button>
          </form>

          {message && (
            <div
              className="mt-4 px-4 py-2.5 rounded-xl text-xs text-center sora font-medium"
              style={{ background: "#F0F9FF", color: "#0369A1", border: "1px solid #BAE6FD" }}
            >
              {message}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}