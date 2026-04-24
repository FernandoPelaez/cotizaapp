"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import RegisterHero from "./RegisterHero"
import RegisterStyles from "./RegisterStyles"

import {
  DEFAULT_PLAN,
  PLAN_BUTTON_TEXT,
  PLAN_COPY,
  PLAN_LABELS,
  getEffectivePlan,
  type SelectedPlanSlug,
  withEmailAndPlan,
  withPlan,
} from "@/lib/plans/plan-utils"

type ApiErrorCode =
  | "USER_ALREADY_EXISTS"
  | "WEAK_PASSWORD"
  | "MISSING_FIELDS"
  | "INVALID_PLAN"
  | "INTERNAL_SERVER_ERROR"

type RegisterFormProps = {
  selectedPlan?: SelectedPlanSlug
}

const ERROR_MESSAGES: Record<ApiErrorCode, string> = {
  USER_ALREADY_EXISTS: "Este correo ya está registrado.",
  WEAK_PASSWORD: "La contraseña es muy débil. Usa al menos 6 caracteres.",
  MISSING_FIELDS: "Todos los campos son obligatorios.",
  INVALID_PLAN: "El plan seleccionado no es válido.",
  INTERNAL_SERVER_ERROR: "Ocurrió un error al registrarse. Intenta nuevamente.",
}

export default function RegisterForm({ selectedPlan = null }: RegisterFormProps) {
  const router = useRouter()
  const effectivePlan = getEffectivePlan(selectedPlan)

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [emailTaken, setEmailTaken] = useState(false)
  const [loading, setLoading] = useState(false)

  const hasSelectedPaidPlan = selectedPlan !== null

  const resetErrors = () => {
    setError("")
    setEmailTaken(false)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    resetErrors()

    const fullName = lastName.trim()
      ? `${name.trim()} ${lastName.trim()}`
      : name.trim()

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          plan: effectivePlan,
        }),
      })

      let data: { error?: ApiErrorCode } | null = null

      try {
        data = await res.json()
      } catch {
        data = null
      }

      if (!res.ok) {
        const code = data?.error

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

      router.push(withEmailAndPlan(email, selectedPlan))
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
      <RegisterStyles />

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
        <div
          className="page-enter w-full"
          style={{
            maxWidth: "920px",
            borderRadius: "20px",
            border: "1px solid #C8D3E8",
            boxShadow:
              "0 20px 60px rgba(27,61,122,0.18), 0 4px 16px rgba(0,0,0,0.06)",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "590px",
            background: "white",
          }}
        >
          <RegisterHero selectedPlan={selectedPlan} />

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
                <span
                  className="sora font-semibold text-sm"
                  style={{ color: "#1B3D7A" }}
                >
                  CotizaApp
                </span>
              </div>
            </div>

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
              <h2
                className="sora font-bold mb-1"
                style={{
                  fontSize: "20px",
                  color: "#1B3D7A",
                  letterSpacing: "-0.02em",
                }}
              >
                Crear cuenta
              </h2>

              <p className="text-sm mb-5" style={{ color: "#64748B" }}>
                {hasSelectedPaidPlan ? (
                  <>
                    Crea tu cuenta para continuar con el plan{" "}
                    <span
                      className="sora font-semibold"
                      style={{ color: "#1B3D7A" }}
                    >
                      {PLAN_LABELS[selectedPlan]}
                    </span>
                  </>
                ) : (
                  <>
                    Empieza gratis,{" "}
                    <span
                      className="sora font-semibold"
                      style={{ color: "#1B3D7A" }}
                    >
                      sin tarjeta de crédito
                    </span>
                  </>
                )}
              </p>

              {hasSelectedPaidPlan && (
                <div
                  className="sora mb-5 px-3 py-2 rounded-xl text-xs font-semibold"
                  style={{
                    background: "#EEF2FA",
                    color: "#1B3D7A",
                    border: "1px solid #C8D3E8",
                  }}
                >
                  Plan seleccionado: {PLAN_LABELS[selectedPlan]} ·{" "}
                  {PLAN_COPY[selectedPlan]}
                </div>
              )}

              {error && (
                <div
                  className="mb-4 px-4 py-3 rounded-xl text-xs font-medium sora"
                  style={{
                    background: "#FEF2F2",
                    color: "#DC2626",
                    border: "1px solid #FECACA",
                  }}
                >
                  {error}
                </div>
              )}

              {emailTaken && (
                <div
                  className="mb-4 px-4 py-3 rounded-xl text-xs font-medium sora flex items-center justify-between gap-3"
                  style={{
                    background: "#FEF2F2",
                    color: "#DC2626",
                    border: "1px solid #FECACA",
                  }}
                >
                  <span>Este correo ya está registrado.</span>

                  <Link
                    href={withEmailAndPlan(email, selectedPlan)}
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
                    <label
                      className="sora block text-xs font-semibold mb-1.5"
                      style={{ color: "#1B3D7A" }}
                    >
                      Nombre
                    </label>

                    <input
                      tabIndex={1}
                      type="text"
                      placeholder="Lorenzo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={loading}
                      className="reg-input sora w-full px-3 py-2.5 rounded-xl text-sm disabled:opacity-50"
                      style={{
                        background: "#F1F4FA",
                        border: "1.5px solid #C8D3E8",
                        color: "#1E293B",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="sora block text-xs font-semibold mb-1.5"
                      style={{ color: "#1B3D7A" }}
                    >
                      Apellido
                    </label>

                    <input
                      tabIndex={2}
                      type="text"
                      placeholder="Valle"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={loading}
                      className="reg-input sora w-full px-3 py-2.5 rounded-xl text-sm disabled:opacity-50"
                      style={{
                        background: "#F1F4FA",
                        border: "1.5px solid #C8D3E8",
                        color: "#1E293B",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="sora block text-xs font-semibold mb-1.5"
                    style={{ color: "#1B3D7A" }}
                  >
                    Correo electrónico
                  </label>

                  <input
                    tabIndex={3}
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      resetErrors()
                    }}
                    required
                    disabled={loading}
                    className={`reg-input sora w-full px-3 py-2.5 rounded-xl text-sm disabled:opacity-50 ${
                      emailTaken ? "reg-input-error" : ""
                    }`}
                    style={{
                      background: "#F1F4FA",
                      border: "1.5px solid #C8D3E8",
                      color: "#1E293B",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="sora block text-xs font-semibold mb-1.5"
                    style={{ color: "#1B3D7A" }}
                  >
                    Contraseña
                  </label>

                  <div className="relative">
                    <input
                      tabIndex={4}
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      className="reg-input sora w-full px-3 pr-20 py-2.5 rounded-xl text-sm disabled:opacity-50"
                      style={{
                        background: "#F1F4FA",
                        border: "1.5px solid #C8D3E8",
                        color: "#1E293B",
                      }}
                    />

                    <button
                      tabIndex={-1}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 sora text-xs font-semibold"
                      style={{ color: "#94A3B8" }}
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                </div>

                <button
                  tabIndex={5}
                  type="submit"
                  disabled={loading}
                  className="btn-primary sora w-full py-2.5 rounded-full font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                  style={{
                    background:
                      "linear-gradient(135deg, #1B3D7A 0%, #2D5FC4 100%)",
                    boxShadow: loading
                      ? "none"
                      : "0 6px 20px rgba(27,61,122,0.32)",
                    border: "none",
                  }}
                >
                  {loading ? (
                    <>
                      <div className="spinner" />
                      Creando cuenta...
                    </>
                  ) : (
                    PLAN_BUTTON_TEXT[effectivePlan]
                  )}
                </button>
              </form>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="divider-line" />
                <span className="text-xs sora" style={{ color: "#7A8FA8" }}>
                  ¿Ya tienes cuenta?
                </span>
                <div className="divider-line" />
              </div>

              <Link
                href={withPlan("/auth/signin", selectedPlan)}
                className="btn-secondary sora w-full py-2.5 rounded-full font-semibold text-sm flex items-center justify-center"
                style={{
                  border: "1.5px solid #C8D3E8",
                  color: "#1B3D7A",
                  background: "white",
                }}
              >
                Iniciar sesión
              </Link>
            </div>

            <p
              className="text-center text-xs sora mt-4"
              style={{ color: "#7A8FA8" }}
            >
              © 2026 CotizaApp · Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
