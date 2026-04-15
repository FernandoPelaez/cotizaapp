"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password) {
      setMessage("Ingresa una contraseña")
      setIsSuccess(false)
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error || "Error al actualizar la contraseña")
        setIsSuccess(false)
      } else {
        setMessage("Contraseña actualizada correctamente")
        setIsSuccess(true)
        setTimeout(() => {
          window.location.href = `/auth/signin?email=${encodeURIComponent(data.email)}`
        }, 1500)
      }
    } catch {
      setMessage("Error del servidor")
      setIsSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
      }}
    >
      {/* Logo / Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "var(--primary)",
          }}
        />
        <span
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--foreground)",
            letterSpacing: "-0.02em",
          }}
        >
          CotizaApp
        </span>
      </div>

      {/* Card */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "2.5rem 2rem",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 4px 24px rgba(15, 23, 42, 0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: "var(--primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.25rem",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--foreground)",
            margin: "0 0 0.5rem",
            letterSpacing: "-0.03em",
            textAlign: "center",
          }}
        >
          Restablecer contraseña
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-muted)",
            textAlign: "center",
            margin: "0 0 2rem",
            lineHeight: 1.6,
          }}
        >
          Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Label + Input */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <label
              htmlFor="password"
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--foreground)",
              }}
            >
              Nueva contraseña
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px 11px 42px",
                  border: "1.5px solid var(--border)",
                  borderRadius: "10px",
                  fontSize: "0.9375rem",
                  color: "var(--foreground)",
                  background: "var(--background)",
                  outline: "none",
                  transition: "border-color 0.15s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: loading ? "var(--primary-light)" : "var(--primary)",
              color: loading ? "var(--primary)" : "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "0.9375rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.15s, transform 0.1s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.currentTarget.style.background = "var(--primary-hover)")
            }}
            onMouseLeave={(e) => {
              if (!loading) (e.currentTarget.style.background = "var(--primary)")
            }}
          >
            {loading ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    animation: "spin 0.8s linear infinite",
                  }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Actualizando...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Actualizar contraseña
              </>
            )}
          </button>

          {/* Message feedback */}
          {message && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                fontSize: "0.875rem",
                fontWeight: 500,
                textAlign: "center",
                background: isSuccess ? "var(--success-bg)" : "var(--error-bg)",
                color: isSuccess ? "var(--success)" : "var(--error)",
                border: `1px solid ${isSuccess ? "#bbf7d0" : "#fecaca"}`,
              }}
            >
              {message}
            </div>
          )}
        </form>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}