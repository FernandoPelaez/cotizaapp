"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import type { Answers, ProfileType } from "./types"
import { QUESTIONS } from "./data/questions.data"

import { LoadingScreen } from "./components/LoadingScreen"
import { WelcomeScreen } from "./components/WelcomeScreen"
import { ProgressDots } from "./components/ProgressDots"
import { QuestionCard } from "./components/QuestionCard"
import { QuestionActions } from "./components/QuestionActions"

type ProfileResponse = {
  profileType?: ProfileType | null
  user?: {
    profileType?: ProfileType | null
  }
}

export function QuestionsFlow() {
  const router = useRouter()
  const { update } = useSession()

  const [profileType, setProfileType] = useState<ProfileType | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
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
        const data = (await res.json()) as ProfileResponse

        const resolvedProfileType =
          data.profileType ?? data.user?.profileType ?? null

        if (!res.ok || !resolvedProfileType) {
          router.replace("/onboarding/profile")
          return
        }

        if (isMounted) {
          setProfileType(resolvedProfileType)
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
    return <LoadingScreen />
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

    const newAnswers = {
      ...answers,
      [question.key]: selectedOption,
    }

    setAnswers(newAnswers)

    if (!isLastQuestion) {
      setAnimating(true)

      setTimeout(() => {
        const nextIndex = currentQuestion + 1
        const nextKey = questions[nextIndex]?.key

        setCurrentQuestion(nextIndex)
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: newAnswers,
          profileType,
        }),
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

        .sora {
          font-family: 'Sora', sans-serif;
        }

        .fu1 {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity .7s cubic-bezier(.16,1,.3,1) .05s,
            transform .7s cubic-bezier(.16,1,.3,1) .05s;
        }

        .fu2 {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity .7s cubic-bezier(.16,1,.3,1) .15s,
            transform .7s cubic-bezier(.16,1,.3,1) .15s;
        }

        .fu3 {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity .7s cubic-bezier(.16,1,.3,1) .25s,
            transform .7s cubic-bezier(.16,1,.3,1) .25s;
        }

        .fu4 {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity .7s cubic-bezier(.16,1,.3,1) .33s,
            transform .7s cubic-bezier(.16,1,.3,1) .33s;
        }

        .mounted .fu1,
        .mounted .fu2,
        .mounted .fu3,
        .mounted .fu4 {
          opacity: 1;
          transform: translateY(0);
        }

        .dp {
          animation: dpulse 2.5s ease-in-out infinite;
        }

        @keyframes dpulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(27,61,122,.4);
          }

          50% {
            box-shadow: 0 0 0 6px rgba(27,61,122,0);
          }
        }

        @keyframes fillBar {
          from {
            width: 0%;
          }
        }

        .progress-fill {
          animation: fillBar .5s cubic-bezier(.4,0,.2,1) both;
        }
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
        <div
          className={mounted ? "mounted" : ""}
          style={{ width: "100%", maxWidth: 560 }}
        >
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
              <div
                className="dp"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#1B3D7A",
                }}
              />

              <span
                className="sora"
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#0F172A",
                }}
              >
                CotizaApp
              </span>
            </div>

            <ProgressDots
              total={questions.length}
              currentIndex={currentQuestion}
            />

            <p
              style={{
                fontSize: 11,
                color: "#94A3B8",
                fontWeight: 500,
                letterSpacing: "0.06em",
              }}
            >
              {question.label.toUpperCase()} · PERFIL{" "}
              {profileType.toUpperCase()}
            </p>
          </div>

          <div className="fu2">
            <QuestionCard
              question={question}
              selectedOption={selectedOption}
              animating={animating}
              onSelectOption={handleSelectOption}
            />
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

          <QuestionActions
            loading={loading}
            selectedOption={selectedOption}
            isLastQuestion={isLastQuestion}
            onBack={handleBack}
            onNext={handleNext}
          />

          {error && (
            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                fontWeight: 500,
                color: "#DC2626",
                marginTop: 12,
              }}
            >
              {error}
            </p>
          )}

          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "#94A3B8",
              marginTop: 14,
            }}
          >
            Puedes cambiar esto después en Configuración
          </p>
        </div>
      </div>
    </div>
  )
}
