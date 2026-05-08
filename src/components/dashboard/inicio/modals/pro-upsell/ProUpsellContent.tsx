"use client"

import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { ArrowRight, Crown, LockKeyhole, Sparkles } from "lucide-react"
import ProUpsellFeatureList from "./ProUpsellFeatureList"

export type ProUpsellContentVariant = "warning" | "blocked"

type ProUpsellContentProps = {
  variant?: ProUpsellContentVariant
  onClose: () => void
  onSeen: () => void
}

type UpsellContentCopy = {
  badge: string
  title: string
  highlight: string
  descriptionPrefix: string
  descriptionStrong: string
  descriptionSuffix: string
  primaryButtonLabel: string
  secondaryButtonLabel: string
  footerNote: string
}

type CheckoutResponse = {
  url?: string
  error?: string
}

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const CONTENT_BY_VARIANT: Record<ProUpsellContentVariant, UpsellContentCopy> = {
  warning: {
    badge: "Plan Gratis",
    title: "Ya usaste 3 de tus",
    highlight: "5 pruebas gratis",
    descriptionPrefix: "Te quedan ",
    descriptionStrong: "2 cotizaciones disponibles",
    descriptionSuffix:
      ". Puedes seguir usando tu plan gratis, pero al mejorar a Pro desbloqueas más plantillas, historial completo, cotizaciones ilimitadas y envío por WhatsApp.",
    primaryButtonLabel: "Mejorar a Pro",
    secondaryButtonLabel: "Seguir con gratis",
    footerNote: "Puedes mejorar cuando lo necesites.",
  },
  blocked: {
    badge: "Pruebas agotadas",
    title: "Ya usaste tus",
    highlight: "5 pruebas gratis",
    descriptionPrefix: "Tu plan gratis llegó al límite. ",
    descriptionStrong: "Mejora a Pro para seguir creando cotizaciones",
    descriptionSuffix:
      ", desbloquear cotizaciones ilimitadas, usar más plantillas y compartir tus propuestas por WhatsApp.",
    primaryButtonLabel: "Mejorar a Pro",
    secondaryButtonLabel: "Ver después",
    footerNote: "Tu historial se conserva aunque hayas llegado al límite.",
  },
}

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: SMOOTH_EASE,
      delay: 0.18,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: SMOOTH_EASE,
    },
  },
}

export default function ProUpsellContent({
  variant = "warning",
  onClose,
  onSeen,
}: ProUpsellContentProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState("")

  const copy = CONTENT_BY_VARIANT[variant]
  const isBlocked = variant === "blocked"

  async function handleCheckout() {
    if (isCheckingOut) return

    try {
      setIsCheckingOut(true)
      setCheckoutError("")
      onSeen()

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: "pro",
        }),
      })

      const data = (await response.json().catch(() => null)) as
        | CheckoutResponse
        | null

      if (!response.ok || !data?.url) {
        throw new Error(data?.error || "CHECKOUT_ERROR")
      }

      window.location.href = data.url
    } catch (error) {
      console.error("PRO_CHECKOUT_ERROR:", error)

      setCheckoutError(
        "No pudimos abrir el pago en este momento. Inténtalo de nuevo."
      )
      setIsCheckingOut(false)
    }
  }

  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      style={{
        flex: 1,
        padding: "36px 32px 36px 46px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        minWidth: 0,
      }}
    >
      <motion.div
        variants={itemVariants}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "6px 14px 6px 10px",
          borderRadius: 999,
          border: "1px solid rgba(209, 220, 245, 0.95)",
          background:
            "linear-gradient(135deg, rgba(238, 242, 250, 0.98), rgba(209, 220, 245, 0.72))",
          color: "#1B3D7A",
          fontSize: 11,
          fontWeight: 900,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          boxShadow: "0 14px 28px rgba(27, 61, 122, 0.12)",
          alignSelf: "flex-start",
        }}
      >
        {isBlocked ? (
          <LockKeyhole size={12} />
        ) : (
          <Crown size={12} fill="#1B3D7A" />
        )}

        {copy.badge}
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2
          id="upsell-title"
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: "#0f172a",
            margin: 0,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
          }}
        >
          {copy.title}
        </h2>

        <p
          style={{
            fontSize: 30,
            fontWeight: 900,
            margin: 0,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            background:
              "linear-gradient(90deg, #1B3D7A 0%, #2A5298 52%, #3B82F6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {copy.highlight}
        </p>
      </motion.div>

      <motion.p
        variants={itemVariants}
        style={{
          fontSize: 13,
          color: "#64748b",
          lineHeight: 1.65,
          margin: 0,
          maxWidth: 430,
        }}
      >
        {copy.descriptionPrefix}
        <span
          style={{
            color: "#1B3D7A",
            fontWeight: 800,
          }}
        >
          {copy.descriptionStrong}
        </span>
        {copy.descriptionSuffix}
      </motion.p>

      <motion.div variants={itemVariants}>
        <ProUpsellFeatureList />
      </motion.div>

      <motion.div
        variants={itemVariants}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          paddingTop: 2,
          flexWrap: "wrap",
        }}
      >
        <motion.button
          type="button"
          onClick={handleCheckout}
          disabled={isCheckingOut}
          whileHover={isCheckingOut ? undefined : { y: -2 }}
          whileTap={isCheckingOut ? undefined : { scale: 0.985 }}
          transition={{
            duration: 0.22,
            ease: SMOOTH_EASE,
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "13px 26px",
            borderRadius: 16,
            border: "none",
            background: isCheckingOut
              ? "linear-gradient(135deg, #64748b 0%, #94a3b8 100%)"
              : "linear-gradient(135deg, #1B3D7A 0%, #2A5298 100%)",
            color: "#ffffff",
            fontWeight: 800,
            fontSize: 14,
            textDecoration: "none",
            boxShadow:
              "0 18px 34px rgba(27, 61, 122, 0.28), 0 6px 16px rgba(42, 82, 152, 0.18)",
            letterSpacing: "-0.01em",
            cursor: isCheckingOut ? "not-allowed" : "pointer",
            opacity: isCheckingOut ? 0.82 : 1,
          }}
        >
          <Sparkles size={15} />
          {isCheckingOut ? "Abriendo Stripe..." : copy.primaryButtonLabel}
          <ArrowRight size={15} />
        </motion.button>

        <motion.button
          type="button"
          onClick={onClose}
          disabled={isCheckingOut}
          whileHover={
            isCheckingOut
              ? undefined
              : {
                  y: -1,
                  backgroundColor: "rgba(238, 242, 250, 0.95)",
                  borderColor: "#1B3D7A",
                  color: "#1B3D7A",
                }
          }
          whileTap={isCheckingOut ? undefined : { scale: 0.98 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 44,
            padding: "0 22px",
            borderRadius: 16,
            background: "#ffffff",
            border: "1px solid rgba(209, 220, 245, 0.95)",
            cursor: isCheckingOut ? "not-allowed" : "pointer",
            fontSize: 13,
            color: "#1B3D7A",
            fontWeight: 800,
            boxShadow: "0 10px 22px rgba(27, 61, 122, 0.08)",
            opacity: isCheckingOut ? 0.7 : 1,
          }}
        >
          {copy.secondaryButtonLabel}
        </motion.button>

        {checkoutError ? (
          <span
            style={{
              width: "100%",
              fontSize: 11,
              color: "#dc2626",
              fontWeight: 700,
              letterSpacing: "0.01em",
            }}
          >
            {checkoutError}
          </span>
        ) : (
          <span
            style={{
              width: "100%",
              fontSize: 11,
              color: "#94a3b8",
              letterSpacing: "0.01em",
            }}
          >
            {copy.footerNote}
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
