"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

import SignInHero from "./SignInHero"
import SignInStyles from "./SignInStyles"
import {
  CotizaAppLogoDark,
  GoogleIcon,
  LockIcon,
  MailIcon,
} from "./SignInIcons"

import { PLAN_LABELS, type SelectedPlanSlug } from "@/lib/plans/plan-utils"
import {
  getPostSignInUrl,
  getRegisterHrefFromSignin,
} from "@/features/auth/signin/signin-utils"

type SignInFormProps = {
  initialEmail?: string
  selectedPlan?: SelectedPlanSlug
}

export default function SignInForm({
  initialEmail = "",
  selectedPlan = null,
}: SignInFormProps) {
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const passwordRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const registerHref = getRegisterHrefFromSignin(selectedPlan)
  const postLoginUrl = getPostSignInUrl(selectedPlan)

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail)
    }
  }, [initialEmail])

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      })

      tl.from(".page-enter", {
        opacity: 0,
        y: 28,
        scale: 0.98,
        duration: 0.75,
      })
        .from(
          ".left-enter",
          {
            opacity: 0,
            x: -28,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".right-enter",
          {
            opacity: 0,
            x: 28,
            duration: 0.7,
          },
          "-=0.65"
        )
        .from(
          ".logo-enter",
          {
            opacity: 0,
            scale: 0.7,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.45"
        )
        .from(
          ".headline-enter",
          {
            opacity: 0,
            y: 16,
            duration: 0.55,
          },
          "-=0.4"
        )
        .from(
          ".feature-item",
          {
            opacity: 0,
            x: -14,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.3"
        )
        .from(
          ".form-enter",
          {
            opacity: 0,
            y: 18,
            duration: 0.55,
          },
          "-=0.9"
        )
        .from(
          ".field-enter",
          {
            opacity: 0,
            y: 12,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.35"
        )

      gsap.to(".orb-1", {
        x: 30,
        y: 20,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

      gsap.to(".orb-2", {
        x: -25,
        y: -18,
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
    },
    {
      scope: containerRef,
    }
  )

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
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
      callbackUrl: postLoginUrl,
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

    window.location.href = postLoginUrl
  }

  const handleGoogleLogin = () => {
    setLoading(true)

    void signIn("google", {
      callbackUrl: postLoginUrl,
    })
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full flex justify-center"
      style={{
        background: "#E4E4E4",
        padding: "16px",
      }}
    >
      <SignInStyles />

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
          <SignInHero />

          <div
            className="right-enter flex flex-col justify-between"
            style={{
              background: "#DCE3EE",
              padding: "28px",
            }}
          >
            <div className="flex md:hidden justify-center mb-4">
              <div
                className="inline-flex items-center rounded-full"
                style={{
                  background: "white",
                  border: "1px solid #C8D3E8",
                  padding: "6px 12px 6px 8px",
                }}
              >
                <CotizaAppLogoDark />
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
                Iniciar sesión
              </h2>

              <p className="text-sm mb-3" style={{ color: "#64748B" }}>
                Accede a tu cuenta de{" "}
                <span
                  className="sora font-semibold"
                  style={{ color: "#1B3D7A" }}
                >
                  CotizaApp
                </span>
              </p>

              {selectedPlan && (
                <div
                  className="sora mb-5 px-3 py-2 rounded-xl text-xs font-semibold"
                  style={{
                    background: "#EEF2FA",
                    color: "#1B3D7A",
                    border: "1px solid #C8D3E8",
                  }}
                >
                  Plan seleccionado: {PLAN_LABELS[selectedPlan]}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3">
                <div className="field-enter">
                  <label
                    className="sora block text-xs font-semibold mb-1.5"
                    style={{ color: "#1B3D7A" }}
                  >
                    Correo electrónico
                  </label>

                  <div className="relative">
                    <div
                      className="absolute left-3.5 top-1/2 -translate-y-1/2"
                      style={{ color: "#94A3B8" }}
                    >
                      <MailIcon />
                    </div>

                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setErrorMsg("")
                      }}
                      required
                      disabled={loading}
                      className="si-input sora w-full pl-10 pr-4 py-2.5 rounded-xl text-sm disabled:opacity-50"
                      style={{
                        background: "#F1F4FA",
                        border: "1.5px solid #C8D3E8",
                        color: "#1E293B",
                      }}
                    />
                  </div>
                </div>

                <div className="field-enter">
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      className="sora block text-xs font-semibold"
                      style={{ color: "#1B3D7A" }}
                    >
                      Contraseña
                    </label>

                    <Link
                      href="/auth/forgot-password"
                      className="text-xs sora font-semibold hover:underline"
                      style={{ color: "#1B3D7A" }}
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <div className="relative">
                    <div
                      className="absolute left-3.5 top-1/2 -translate-y-1/2"
                      style={{ color: "#94A3B8" }}
                    >
                      <LockIcon />
                    </div>

                    <input
                      ref={passwordRef}
                      type={showPassword ? "text" : "password"}
                      placeholder="Tu contraseña"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setErrorMsg("")
                      }}
                      required
                      disabled={loading}
                      className="si-input sora w-full pl-10 pr-20 py-2.5 rounded-xl text-sm disabled:opacity-50"
                      style={{
                        background: "#F1F4FA",
                        border: errorMsg
                          ? "1.5px solid #DC2626"
                          : "1.5px solid #C8D3E8",
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

                  {errorMsg && (
                    <div
                      className="error-inline flex items-center gap-1.5 mt-2 px-3 py-2 rounded-xl"
                      style={{
                        background: "#FEF2F2",
                        border: "1px solid #FECACA",
                      }}
                    >
                      <span
                        className="sora text-xs font-medium"
                        style={{ color: "#DC2626" }}
                      >
                        {errorMsg}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  tabIndex={3}
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
                      Entrando...
                    </>
                  ) : (
                    "Iniciar sesión"
                  )}
                </button>
              </form>

              <div className="flex items-center gap-3 mt-4 mb-3">
                <div className="divider-line" />
                <span className="text-xs sora" style={{ color: "#7A8FA8" }}>
                  o continúa con
                </span>
                <div className="divider-line" />
              </div>

              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="btn-google sora w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 disabled:opacity-60"
                style={{
                  background: "white",
                  border: "1.5px solid #C8D3E8",
                  color: "#1E293B",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <GoogleIcon />
                Continuar con Google
              </button>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="divider-line" />
                <span className="text-xs sora" style={{ color: "#7A8FA8" }}>
                  ¿Nuevo aquí?
                </span>
                <div className="divider-line" />
              </div>

              <Link
                href={registerHref}
                className="btn-secondary sora w-full py-2.5 rounded-full font-semibold text-sm flex items-center justify-center"
                style={{
                  border: "1.5px solid #C8D3E8",
                  color: "#1B3D7A",
                  background: "white",
                }}
              >
                Crear cuenta
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
