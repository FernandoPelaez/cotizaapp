"use client"

import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { useRouter } from "next/navigation"

import type { TemplateComponent } from "@/lib/templates"

type PreviewData = {
  title: string
  clientName: string
  clientEmail?: string
  clientPhone?: string
  clientAddress?: string
  companyName?: string
  companyEmail?: string
  companyPhone?: string
  companyAddress?: string
  companyWeb?: string
  docNumber?: string
  date?: string
  discount?: number
  tax?: number
  notes?: string
  services: { name: string; description?: string; price: number }[]
  products: { name: string; quantity: number; price: number }[]
  total: number
  subtotal?: number
}

type TemplateAccess = "basic" | "pro" | "premium"
type UserPlan = "free" | "pro" | "premium"

type TemplateCardItem = {
  id: string
  name: string
  category: string
  type: TemplateAccess
  component: TemplateComponent
}

type TemplateCardProps = {
  template: TemplateCardItem
  userPlan?: UserPlan
}

type TrialStatus = {
  plan: UserPlan
  quotesUsed: number
  trialQuotesLimit: number
  trialBlocked: boolean
}

let trialStatusRequest: Promise<TrialStatus> | null = null

const cardEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  hover: {
    y: -3,
    boxShadow: "0 14px 32px rgba(15,23,42,0.12)",
    transition: {
      duration: 0.32,
      ease: cardEase,
    },
  },
}

const buttonHoverVariants: Variants = {
  rest: {
    y: 0,
    backgroundColor: "#1e3a8a",
  },
  hover: {
    y: -1,
    backgroundColor: "#1e40af",
    transition: {
      duration: 0.28,
      ease: cardEase,
    },
  },
}

const ACCESS_META: Record<
  TemplateAccess,
  {
    label: string
    badgeClass: string
    lockedLabel: string
    description: string
  }
> = {
  basic: {
    label: "BÁSICA",
    badgeClass: "bg-white/80 border-neutral-200 text-neutral-500",
    lockedLabel: "Disponible",
    description: "Básica",
  },
  pro: {
    label: "PRO",
    badgeClass: "bg-amber-50 border-amber-200 text-amber-600",
    lockedLabel: "Solo PRO",
    description: "Pro",
  },
  premium: {
    label: "PREMIUM",
    badgeClass: "bg-violet-50 border-violet-200 text-violet-700",
    lockedLabel: "Solo Premium",
    description: "Premium",
  },
}

const ENABLE_TEMPLATE_LOCKS = false

function isTemplateLocked(type: TemplateAccess, userPlan: UserPlan) {
  if (!ENABLE_TEMPLATE_LOCKS) return false

  if (type === "basic") return false
  if (type === "pro") return userPlan === "free"
  return userPlan !== "premium"
}

function resolvePlan(value: unknown): UserPlan {
  const plan = String(value ?? "free")
    .trim()
    .toLowerCase()

  if (
    plan.includes("premium") ||
    plan.includes("empresa") ||
    plan.includes("enterprise")
  ) {
    return "premium"
  }

  if (plan.includes("pro")) {
    return "pro"
  }

  return "free"
}

function toSafeNumber(value: unknown, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

async function getTrialStatus(): Promise<TrialStatus> {
  if (!trialStatusRequest) {
    trialStatusRequest = fetch("/api/quotes", {
      cache: "no-store",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("No se pudo validar el estado de prueba")
        }

        const data = await response.json()
        const user = data?.user

        const plan = resolvePlan(user?.plan?.name)
        const quotesUsed = toSafeNumber(user?.quotesUsed, 0)
        const trialQuotesLimit = toSafeNumber(user?.trialQuotesLimit, 5)

        const trialBlocked =
          Boolean(user?.trialBlocked) ||
          (plan === "free" &&
            trialQuotesLimit > 0 &&
            quotesUsed >= trialQuotesLimit)

        return {
          plan,
          quotesUsed,
          trialQuotesLimit,
          trialBlocked,
        }
      })
      .catch(() => ({
        plan: "free",
        quotesUsed: 0,
        trialQuotesLimit: 5,
        trialBlocked: false,
      }))
  }

  return trialStatusRequest
}

export default function TemplateCard({
  template,
  userPlan = "free",
}: TemplateCardProps) {
  const router = useRouter()
  const PreviewComponent = template.component

  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null)

  useEffect(() => {
    let isMounted = true

    getTrialStatus().then((status) => {
      if (isMounted) {
        setTrialStatus(status)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  const accessMeta = ACCESS_META[template.type]
  const effectiveUserPlan = trialStatus?.plan ?? userPlan
  const isLocked = isTemplateLocked(template.type, effectiveUserPlan)

  const isTrialBlocked =
    effectiveUserPlan === "free" &&
    Boolean(
      trialStatus?.trialBlocked ||
        ((trialStatus?.trialQuotesLimit ?? 5) > 0 &&
          (trialStatus?.quotesUsed ?? 0) >=
            (trialStatus?.trialQuotesLimit ?? 5))
    )

  const isButtonDisabled = isLocked || isTrialBlocked

  const previewData: PreviewData = {
    title: "Propuesta de Servicios",
    clientName: "Cliente Demo",
    clientEmail: "cliente@email.com",
    clientPhone: "+52 667 123 4567",
    clientAddress: "Los Mochis, Sinaloa",
    companyName: "CotizaApp",
    companyEmail: "hola@cotizaapp.com",
    companyPhone: "+52 667 000 0000",
    companyAddress: "Sinaloa, México",
    companyWeb: "www.cotizaapp.com",
    date: "08/04/2026",
    docNumber: "COT-001",
    discount: 0,
    tax: 16,
    services: [
      { name: "Diseño web", price: 1200 },
      { name: "Desarrollo", price: 2500 },
    ],
    products: [{ name: "Hosting", quantity: 1, price: 300 }],
    total: 4640,
    subtotal: 4000,
    notes: "Tiempo estimado de entrega: 7 a 10 días hábiles.",
  }

  const PREVIEW_HEIGHT = 226
  const TEMPLATE_WIDTH = 595
  const TEMPLATE_HEIGHT = 842
  const SCALE = PREVIEW_HEIGHT / TEMPLATE_HEIGHT

  const handleSelect = () => {
    if (isTrialBlocked) {
      alert(
        "Ya alcanzaste el límite de 5 cotizaciones de prueba. Mejora tu plan para seguir usando plantillas."
      )
      return
    }

    if (isLocked) {
      alert(
        `Esta plantilla es ${accessMeta.description}. Actualiza tu plan para usarla.`
      )
      return
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTemplate", template.id)
    }

    router.push(`/cotizaciones/nueva?template=${template.id}`)
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white"
      variants={cardHoverVariants}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.995 }}
    >
      <div className="absolute right-3 top-3 z-10">
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm ${accessMeta.badgeClass}`}
        >
          {accessMeta.label}
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden bg-neutral-50"
        style={{ height: `${PREVIEW_HEIGHT}px` }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: `${TEMPLATE_WIDTH}px`,
            transformOrigin: "top center",
            transform: `translateX(-50%) scale(${SCALE})`,
            pointerEvents: "none",
          }}
        >
          <PreviewComponent data={previewData} />
        </div>
      </div>

      <div className="border-t border-neutral-100 px-4 pb-4 pt-3">
        <h3 className="mb-0.5 text-sm font-semibold text-neutral-900">
          {template.name}
        </h3>

        <p className="mb-3 text-xs text-neutral-400">
          Plantilla estándar · {accessMeta.description}
        </p>

        <motion.button
          type="button"
          onClick={handleSelect}
          disabled={isButtonDisabled}
          variants={isButtonDisabled ? undefined : buttonHoverVariants}
          initial={isButtonDisabled ? undefined : "rest"}
          animate={isButtonDisabled ? undefined : "rest"}
          whileHover={isButtonDisabled ? undefined : "hover"}
          whileTap={isButtonDisabled ? undefined : { scale: 0.99 }}
          className={`w-full rounded-xl py-2 text-sm font-semibold shadow-sm transition ${
            isButtonDisabled
              ? "cursor-not-allowed bg-[#1e3a8a]/70 text-white shadow-none opacity-80"
              : "bg-[#1e3a8a] text-white"
          }`}
        >
          {isTrialBlocked ? "Pruebas agotadas" : "Usar plantilla"}
        </motion.button>
      </div>
    </motion.div>
  )
}
