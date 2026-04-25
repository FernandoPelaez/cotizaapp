"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import {
  isPaidPlanSlug,
  PLAN_LABELS,
  type PaidPlanSlug,
} from "@/lib/plans/plan-utils"

type CheckoutResponse = {
  url?: string
  error?: string
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [error, setError] = useState("")
  const [loadingText, setLoadingText] = useState("Preparando tu pago...")

  const planParam = searchParams.get("plan")
  const selectedPlan: PaidPlanSlug | null = isPaidPlanSlug(planParam)
    ? planParam
    : null

  useEffect(() => {
    if (!selectedPlan) {
      setError("El plan seleccionado no es válido.")
      const timeout = window.setTimeout(() => {
        router.replace("/planes")
      }, 1200)

      return () => window.clearTimeout(timeout)
    }

    const createCheckoutSession = async () => {
      try {
        setLoadingText(`Preparando pago del plan ${PLAN_LABELS[selectedPlan]}...`)

        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan: selectedPlan,
          }),
        })

        const data = (await res.json().catch(() => null)) as CheckoutResponse | null

        if (res.status === 401) {
          router.replace(`/auth/signin?plan=${selectedPlan}`)
          return
        }

        if (!res.ok || !data?.url) {
          console.error("CHECKOUT_ERROR:", data?.error)
          setError("No se pudo iniciar el pago. Intenta nuevamente.")
          return
        }

        window.location.href = data.url
      } catch (checkoutError) {
        console.error("CHECKOUT_CLIENT_ERROR:", checkoutError)
        setError("Ocurrió un error al conectar con Stripe.")
      }
    }

    void createCheckoutSession()
  }, [router, selectedPlan])

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "#E4E4E4" }}
    >
      <section
        className="w-full max-w-md text-center"
        style={{
          background: "white",
          border: "1px solid #C8D3E8",
          borderRadius: "20px",
          padding: "36px 28px",
          boxShadow:
            "0 20px 60px rgba(27,61,122,0.18), 0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div
          className="mx-auto mb-5"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "999px",
            border: "4px solid #EEF2FA",
            borderTopColor: "#1B3D7A",
            animation: "checkout-spin 0.8s linear infinite",
          }}
        />

        <style>{`
          @keyframes checkout-spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

        <h1
          className="font-bold mb-2"
          style={{
            color: "#1B3D7A",
            fontSize: "24px",
            letterSpacing: "-0.03em",
          }}
        >
          Redirigiendo a Stripe
        </h1>

        {error ? (
          <p style={{ color: "#DC2626", fontSize: "14px", lineHeight: 1.6 }}>
            {error}
          </p>
        ) : (
          <p style={{ color: "#64748B", fontSize: "14px", lineHeight: 1.6 }}>
            {loadingText}
          </p>
        )}
      </section>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#E4E4E4", color: "#1B3D7A" }}
        >
          Preparando checkout...
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
