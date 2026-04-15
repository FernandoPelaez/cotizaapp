"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

// ── Icons ──
const CheckIcon = () => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 12, height: 12 }}
  >
    <polyline points="2,6 5,9 10,3" />
  </svg>
)

const ArrowIcon = () => (
  <svg
    viewBox="0 0 10 10"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 10, height: 10 }}
  >
    <polyline points="3,2 7,5 3,8" />
  </svg>
)

const SparkleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 36, height: 36 }}
  >
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
)

// ── Tipos ──
type ProfileType = "independiente" | "negocio"

interface Question {
  key: string
  label: string
  question: string
  options: string[]
}

// ── Preguntas por perfil ──
const QUESTIONS: Record<ProfileType, Question[]> = {
  independiente: [
    {
      key: "area",
      label: "Pregunta 1 de 3",
      question: "¿En qué área trabajas principalmente?",
      options: [
        "Diseño y creatividad",
        "Desarrollo de software",
        "Consultoría y asesoría",
        "Fotografía / Video",
        "Marketing digital",
      ],
    },
    {
      key: "cobro",
      label: "Pregunta 2 de 3",
      question: "¿Cómo cobras normalmente?",
      options: [
        "Por proyecto completo",
        "Por hora trabajada",
        "Por paquete de servicios",
      ],
    },
    {
      key: "anticipo",
      label: "Pregunta 3 de 3",
      question: "¿Pides anticipo en tus cotizaciones?",
      options: [
        "Sí, siempre incluyo anticipo",
        "A veces, depende del proyecto",
        "No, cobro al entregar",
      ],
    },
  ],
  negocio: [
    {
      key: "tipo",
      label: "Pregunta 1 de 3",
      question: "¿Qué vendes principalmente?",
      options: [
        "Productos físicos",
        "Servicios",
        "Productos y servicios",
        "Productos digitales",
      ],
    },
    {
      key: "fiscal",
      label: "Pregunta 2 de 3",
      question: "¿Manejas datos fiscales (RFC, razón social)?",
      options: [
        "Sí, siempre facturo",
        "A veces facturo, a veces no",
        "No, solo cotizo sin factura",
      ],
    },
    {
      key: "iva",
      label: "Pregunta 3 de 3",
      question: "¿Cómo manejas el IVA en tus precios?",
      options: [
        "Precios con IVA incluido",
        "IVA desglosado aparte",
        "Sin IVA",
      ],
    },
  ],
}

// ── Confetti y estrellas para la pantalla de bienvenida ──
const confettiItems = Array.from({ length: 22 }, (_, i) => ({
  cx: 20 + Math.random() * 60,
  cy: 35 + Math.random() * 30,
  size: 4 + Math.random() * 6,
  delay: Math.random() * 0.8,
  dur: 0.8 + Math.random() * 0.6,
  color: ["#4F9EFF", "#A78BFA", "#34D399", "#FCD34D", "#F87171", "#60A5FA", "#FBBF24"][i % 7],
  rounded: Math.random() > 0.5,
}))

const starPositions = [
  [15, 18],
  [80, 12],
  [92, 55],
  [8, 70],
  [50, 8],
  [70, 82],
  [25, 88],
  [88, 30],
  [40, 75],
  [60, 20],
]

// ── Pantalla de bienvenida ──
function WelcomeScreen({ profileType }: { profileType: ProfileType }) {
  return (
    <div style={{ minHeight: "100vh", background: "#DCDCDC", padding: "24px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          background: "#1B3D7A",
          borderRadius: "16px",
          border: "1px solid #152E5E",
          minHeight: "calc(100vh - 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
          .sora { font-family: 'Sora', sans-serif; }
          @keyframes floatP {
            0%   { transform: translateY(0) scale(1); opacity: 0; }
            10%  { opacity: 0.8; }
            85%  { opacity: 0.2; }
            100% { transform: translateY(-110vh) scale(0.3); opacity: 0; }
          }
          .wc-particle { position: absolute; border-radius: 50%; pointer-events: none; animation: floatP linear infinite; }
          @keyframes twinkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
          .wc-star { position: absolute; pointer-events: none; }
          @keyframes ringP {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.2); opacity: 0.05; }
          }
          .wc-r1 { animation: ringP 2.6s ease-in-out infinite; }
          .wc-r2 { animation: ringP 2.6s ease-in-out 0.6s infinite; }
          .wc-r3 { animation: ringP 2.6s ease-in-out 1.2s infinite; }
          @keyframes iconPop {
            0% { transform: scale(0) rotate(-30deg); opacity: 0; }
            70% { transform: scale(1.12) rotate(4deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          .wc-icon { animation: iconPop 0.8s cubic-bezier(.34,1.56,.64,1) 0.2s both; }
          @keyframes orbitGlow {
            from { transform: rotate(0deg) translateX(54px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(54px) rotate(-360deg); }
          }
          .orbit-dot  { position: absolute; width: 8px; height: 8px; border-radius: 50%; top: 50%; left: 50%; margin: -4px 0 0 -4px; animation: orbitGlow 3s linear infinite; }
          .orbit-dot2 { position: absolute; width: 5px; height: 5px; border-radius: 50%; top: 50%; left: 50%; margin: -2.5px 0 0 -2.5px; animation: orbitGlow 4s linear 1.5s infinite; opacity: 0.6; }
          @keyframes iconShine {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
            50% { box-shadow: 0 0 50px 10px rgba(120,160,255,0.18); }
          }
          .wc-icon-inner { animation: iconShine 3s ease-in-out 0.9s infinite; }
          @keyframes sUp {
            from { transform: translateY(24px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .wc-t1 { animation: sUp 0.8s cubic-bezier(.16,1,.3,1) 0.50s both; }
          .wc-t2 { animation: sUp 0.8s cubic-bezier(.16,1,.3,1) 0.65s both; }
          .wc-t3 { animation: sUp 0.8s cubic-bezier(.16,1,.3,1) 0.78s both; }
          .wc-t4 { animation: sUp 0.8s cubic-bezier(.16,1,.3,1) 0.90s both; }
          .wc-t5 { animation: sUp 0.8s cubic-bezier(.16,1,.3,1) 1.02s both; }
          .wc-t6 { animation: sUp 0.8s cubic-bezier(.16,1,.3,1) 1.14s both; }
          @keyframes bgIn { from { opacity: 0; } to { opacity: 1; } }
          .wc-wrap { animation: bgIn 0.5s ease both; }
          .dot-loader span { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.45); animation: dotB 1.3s ease-in-out infinite; }
          .dot-loader span:nth-child(2) { animation-delay: 0.2s; }
          .dot-loader span:nth-child(3) { animation-delay: 0.4s; }
          @keyframes dotB {
            0%,80%,100% { transform: scale(0.65); opacity: 0.35; }
            40% { transform: scale(1.2); opacity: 1; }
          }
          @keyframes shimmer {
            0% { background-position: -300% center; }
            100% { background-position: 300% center; }
          }
          .wc-badge {
            background: linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.04) 100%);
            background-size: 300% auto;
            animation: shimmer 3s linear infinite;
          }
          @keyframes confettiFloat {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-80px) rotate(360deg); opacity: 0; }
          }
          .wc-confetti { position: absolute; pointer-events: none; }
          @keyframes checkPop {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.3); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .check-pill { animation: sUp 0.6s cubic-bezier(.16,1,.3,1) both; }
          .check-pill-icon { animation: checkPop 0.5s cubic-bezier(.34,1.56,.64,1) both; }
          @keyframes progressFill {
            from { width: 0; }
            to { width: 100%; }
          }
          .wc-progress { animation: progressFill 2.8s cubic-bezier(.4,0,.2,1) 0.4s both; }
        `}</style>

        {[...Array(12)].map((_, i) => {
          const colors = [
            "rgba(99,160,255,0.12)",
            "rgba(167,139,250,0.1)",
            "rgba(52,211,153,0.08)",
            "rgba(251,191,36,0.09)",
          ]

          return (
            <div
              key={i}
              className="wc-particle"
              style={{
                width: 14 + i * 9,
                height: 14 + i * 9,
                left: `${3 + i * 8}%`,
                bottom: -(8 + i * 9),
                background: colors[i % 4],
                animationDuration: `${5 + i}s`,
                animationDelay: `${i * 0.28}s`,
              }}
            />
          )
        })}

        {starPositions.map(([x, y], i) => (
          <div
            key={i}
            className="wc-star"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animation: `twinkle ${1.5 + (i % 3) * 0.7}s ease-in-out ${i * 0.3}s infinite`,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.35)">
              <path d="M12 2l1.8 5.5H20l-4.8 3.5 1.8 5.5L12 13l-5 3.5 1.8-5.5L4 7.5h6.2z" />
            </svg>
          </div>
        ))}

        {confettiItems.map((c, i) => (
          <div
            key={i}
            className="wc-confetti"
            style={{
              left: `${c.cx}%`,
              top: `${c.cy}%`,
              width: c.size,
              height: c.size,
              background: c.color,
              borderRadius: c.rounded ? "50%" : "3px",
              animation: `confettiFloat ${c.dur}s ease-out ${c.delay}s both`,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "20%",
            right: "20%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />

        <div
          className="wc-wrap"
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <div
            className="wc-icon"
            style={{
              position: "relative",
              marginBottom: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="wc-r3"
              style={{
                position: "absolute",
                width: 190,
                height: 190,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
            <div
              className="wc-r2"
              style={{
                position: "absolute",
                width: 146,
                height: 146,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.12)",
              }}
            />
            <div
              className="wc-r1"
              style={{
                position: "absolute",
                width: 108,
                height: 108,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.20)",
              }}
            />
            <div style={{ position: "absolute", width: 108, height: 108, borderRadius: "50%" }}>
              <div className="orbit-dot" style={{ background: "rgba(255,255,255,0.9)" }} />
              <div className="orbit-dot2" style={{ background: "rgba(167,139,250,0.9)" }} />
            </div>
            <div
              className="wc-icon-inner"
              style={{
                width: 76,
                height: 76,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(99,139,255,0.15) 100%)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SparkleIcon />
            </div>
          </div>

          <h1
            className="wc-t1 sora"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
              fontWeight: 800,
              color: "white",
              marginBottom: 12,
              letterSpacing: "-0.03em",
              textShadow: "0 2px 24px rgba(0,0,0,0.2)",
            }}
          >
            ¡Todo listo!
          </h1>

          <p
            className="wc-t2 sora"
            style={{
              color: "rgba(255,255,255,0.78)",
              fontSize: 16,
              marginBottom: 8,
              maxWidth: 300,
              lineHeight: 1.65,
            }}
          >
            Tu perfil de{" "}
            <strong
              style={{
                color: "white",
                background: "rgba(255,255,255,0.13)",
                padding: "1px 9px",
                borderRadius: 6,
                fontWeight: 700,
              }}
            >
              {profileType === "independiente" ? "independiente" : "negocio"}
            </strong>{" "}
            está configurado.
          </p>

          <p
            className="wc-t3 sora"
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 13.5,
              marginBottom: 32,
              maxWidth: 300,
              lineHeight: 1.6,
            }}
          >
            Preparando tus plantillas — entrarás al dashboard en un momento.
          </p>

          <div className="wc-t4" style={{ display: "flex", gap: 10, marginBottom: 36 }}>
            {["Plantillas", "PDF profesional", "Vista previa"].map((f, fi) => (
              <div
                key={f}
                className="check-pill"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 999,
                  padding: "5px 12px",
                  animationDelay: `${0.9 + fi * 0.18}s`,
                }}
              >
                <div
                  className="check-pill-icon"
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "rgba(52,211,153,0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animationDelay: `${1.1 + fi * 0.18}s`,
                  }}
                >
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                </div>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontFamily: "Sora, sans-serif" }}>
                  {f}
                </span>
              </div>
            ))}
          </div>

          <div
            className="wc-t5 wc-badge sora"
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 32,
              color: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            ✦ Empieza explorando las plantillas
          </div>

          <div
            className="wc-t5"
            style={{
              width: 200,
              height: 3,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 999,
              overflow: "hidden",
              marginBottom: 24,
            }}
          >
            <div
              className="wc-progress"
              style={{
                height: "100%",
                background: "linear-gradient(90deg, rgba(99,160,255,0.8), rgba(167,139,250,0.9))",
                borderRadius: 999,
              }}
            />
          </div>

          <div className="wc-t6 dot-loader" style={{ display: "flex", gap: 10 }}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Componente principal ──
export default function QuestionsPage() {
  const router = useRouter()
  const { update } = useSession()

  const [profileType, setProfileType] = useState<ProfileType | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showWelcome, setShowWelcome] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile", { cache: "no-store" })
        const data = await res.json()

        if (!res.ok || !data.profileType) {
          router.replace("/onboarding/profile")
          return
        }

        if (isMounted) {
          setProfileType(data.profileType as ProfileType)
        }
      } catch {
        router.replace("/onboarding/profile")
      } finally {
        if (isMounted) {
          setLoadingProfile(false)
          setTimeout(() => setMounted(true), 120)
        }
      }
    }

    fetchProfile()

    return () => {
      isMounted = false
    }
  }, [router])

  useEffect(() => {
    if (!showWelcome) return

    const timer = setTimeout(async () => {
      try {
        await update()
        router.replace("/dashboard")
        router.refresh()
      } catch {
        window.location.href = "/dashboard"
      }
    }, 3200)

    return () => clearTimeout(timer)
  }, [showWelcome, router, update])

  if (loadingProfile || !profileType) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#DCDCDC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "3px solid #D1D5DB",
            borderTopColor: "#1B3D7A",
            animation: "spin .7s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (showWelcome) {
    return <WelcomeScreen profileType={profileType} />
  }

  const questions = QUESTIONS[profileType]
  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleSelectOption = (option: string) => {
    setSelectedOption(option)
    setError(null)
  }

  const handleNext = async () => {
    if (!selectedOption || animating || loading) return

    const newAnswers = { ...answers, [question.key]: selectedOption }
    setAnswers(newAnswers)

    if (!isLastQuestion) {
      setAnimating(true)

      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1)
        const nextKey = questions[currentQuestion + 1]?.key
        setSelectedOption(nextKey ? newAnswers[nextKey] ?? null : null)
        setAnimating(false)
      }, 280)

      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: newAnswers, profileType }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "No se pudieron guardar las respuestas")
      }

      await update()
      setShowWelcome(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Algo salió mal")
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (loading || animating) return

    if (currentQuestion === 0) {
      router.push("/onboarding/profile")
      return
    }

    setAnimating(true)

    setTimeout(() => {
      const previousIndex = currentQuestion - 1
      const previousKey = questions[previousIndex]?.key

      setCurrentQuestion(previousIndex)
      setSelectedOption(previousKey ? answers[previousKey] ?? null : null)
      setAnimating(false)
    }, 280)
  }

  return (
    <div style={{ minHeight: "100vh", background: "#DCDCDC", padding: "24px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
        .sora { font-family: 'Sora', sans-serif; }

        .fu1 { opacity: 0; transform: translateY(16px); transition: opacity .7s cubic-bezier(.16,1,.3,1) .05s, transform .7s cubic-bezier(.16,1,.3,1) .05s; }
        .fu2 { opacity: 0; transform: translateY(16px); transition: opacity .7s cubic-bezier(.16,1,.3,1) .15s, transform .7s cubic-bezier(.16,1,.3,1) .15s; }
        .fu3 { opacity: 0; transform: translateY(16px); transition: opacity .7s cubic-bezier(.16,1,.3,1) .25s, transform .7s cubic-bezier(.16,1,.3,1) .25s; }
        .fu4 { opacity: 0; transform: translateY(16px); transition: opacity .7s cubic-bezier(.16,1,.3,1) .33s, transform .7s cubic-bezier(.16,1,.3,1) .33s; }
        .mounted .fu1, .mounted .fu2, .mounted .fu3, .mounted .fu4 { opacity: 1; transform: translateY(0); }

        .q-fade { transition: opacity .28s ease, transform .28s ease; }
        .q-fade.out { opacity: 0; transform: translateY(-10px); }

        .opt-btn {
          width: 100%;
          padding: 14px 18px;
          background: white;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          text-align: left;
          font-size: 14px;
          color: #0F172A;
          cursor: pointer;
          transition: all .2s ease;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: inherit;
        }
        .opt-btn:hover:not(.opt-sel) {
          border-color: #A8BFDF;
          background: #F8FAFF;
          transform: translateX(3px);
        }
        .opt-btn.opt-sel {
          border-color: #1B3D7A;
          background: linear-gradient(135deg, #EEF2FA 0%, #ffffff 100%);
          box-shadow: 0 0 0 3px rgba(27,61,122,0.08);
        }

        .dp { animation: dpulse 2.5s ease-in-out infinite; }
        @keyframes dpulse { 0%,100%{box-shadow:0 0 0 0 rgba(27,61,122,.4)} 50%{box-shadow:0 0 0 6px rgba(27,61,122,0)} }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 14px; height: 14px; border-radius: 50%; border: 2px solid rgba(255,255,255,.3); border-top-color: white; animation: spin .7s linear infinite; flex-shrink: 0; }
        .arrow-btn { transition: transform .25s ease; }
        button:not(:disabled):hover .arrow-btn { transform: translateX(3px); }

        @keyframes fillBar {
          from { width: 0%; }
        }
        .progress-fill { animation: fillBar .5s cubic-bezier(.4,0,.2,1) both; }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          background: "#F1F5F9",
          borderRadius: "16px",
          border: "1px solid #D1D5DB",
          minHeight: "calc(100vh - 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
        }}
      >
        <div className={mounted ? "mounted" : ""} style={{ width: "100%", maxWidth: 560 }}>
          <div className="fu1" style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 999,
                background: "white",
                border: "1px solid #D1D5DB",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                marginBottom: 20,
              }}
            >
              <div className="dp" style={{ width: 8, height: 8, borderRadius: "50%", background: "#1B3D7A" }} />
              <span className="sora" style={{ fontWeight: 600, fontSize: 13, color: "#0F172A" }}>
                CotizaApp
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
              {questions.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 4,
                    borderRadius: 999,
                    background: i <= currentQuestion ? "#1B3D7A" : "#D1D5DB",
                    width: i === currentQuestion ? 32 : 16,
                    transition: "all .4s cubic-bezier(.4,0,.2,1)",
                  }}
                />
              ))}
            </div>

            <p style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500, letterSpacing: "0.06em" }}>
              {question.label.toUpperCase()} · PERFIL {profileType.toUpperCase()}
            </p>
          </div>

          <div
            className={`fu2 q-fade${animating ? " out" : ""}`}
            style={{
              background: "white",
              borderRadius: 18,
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              padding: "28px 24px",
              marginBottom: 16,
            }}
          >
            <h2
              className="sora"
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
                fontWeight: 700,
                color: "#0F172A",
                lineHeight: 1.3,
                marginBottom: 24,
                letterSpacing: "-0.02em",
              }}
            >
              {question.question}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {question.options.map((option) => {
                const isSelected = selectedOption === option

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectOption(option)}
                    className={`opt-btn${isSelected ? " opt-sel" : ""}`}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        flexShrink: 0,
                        border: `2px solid ${isSelected ? "#1B3D7A" : "#D1D5DB"}`,
                        background: isSelected ? "#1B3D7A" : "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all .2s ease",
                      }}
                    >
                      {isSelected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />}
                    </div>
                    <span style={{ fontWeight: isSelected ? 600 : 400 }}>{option}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div
            className="fu3"
            style={{
              background: "white",
              borderRadius: 999,
              height: 4,
              marginBottom: 16,
              overflow: "hidden",
              border: "1px solid #E2E8F0",
            }}
          >
            <div
              className="progress-fill"
              style={{
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(90deg, #1B3D7A, #2A5298)",
                width: `${progress}%`,
                transition: "width .5s cubic-bezier(.4,0,.2,1)",
              }}
            />
          </div>

          <div className="fu4" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              type="button"
              onClick={handleBack}
              disabled={loading}
              style={{
                padding: "11px 20px",
                borderRadius: 999,
                border: "1.5px solid #D1D5DB",
                background: "white",
                fontSize: 13,
                fontWeight: 500,
                color: "#64748B",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                transition: "all .2s ease",
                opacity: loading ? 0.7 : 1,
              }}
            >
              ← Atrás
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedOption || loading}
              className="sora"
              style={{
                flex: 1,
                padding: "11px 0",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 13,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all .3s ease",
                cursor: selectedOption && !loading ? "pointer" : "not-allowed",
                ...(selectedOption
                  ? {
                      background: "linear-gradient(135deg, #1B3D7A 0%, #2A5298 100%)",
                      color: "white",
                      boxShadow: loading ? "none" : "0 6px 18px rgba(27,61,122,0.28)",
                      opacity: loading ? 0.8 : 1,
                    }
                  : {
                      background: "#D1D5DB",
                      color: "#94A3B8",
                    }),
              }}
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  Configurando tu perfil...
                </>
              ) : (
                <>
                  {isLastQuestion ? "Finalizar" : "Siguiente"}
                  {!loading && selectedOption && (
                    <div
                      className="arrow-btn"
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.2)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArrowIcon />
                    </div>
                  )}
                </>
              )}
            </button>
          </div>

          {error && (
            <p style={{ textAlign: "center", fontSize: 12, fontWeight: 500, color: "#DC2626", marginTop: 12 }}>
              {error}
            </p>
          )}

          <p style={{ textAlign: "center", fontSize: 11, color: "#94A3B8", marginTop: 14 }}>
            Puedes cambiar esto después en Configuración
          </p>
        </div>
      </div>
    </div>
  )
}
