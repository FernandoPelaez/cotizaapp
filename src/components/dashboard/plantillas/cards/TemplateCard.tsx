"use client"

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

// CAMBIO TEMPORAL:
// mientras diseñamos y editamos las plantillas, dejamos el bloqueo apagado.
// al final lo regresamos a true.
const ENABLE_TEMPLATE_LOCKS = false

function isTemplateLocked(type: TemplateAccess, userPlan: UserPlan) {
  if (!ENABLE_TEMPLATE_LOCKS) return false

  if (type === "basic") return false
  if (type === "pro") return userPlan === "free"
  return userPlan !== "premium"
}

export default function TemplateCard({
  template,
  userPlan = "free",
}: TemplateCardProps) {
  const router = useRouter()
  const PreviewComponent = template.component

  const accessMeta = ACCESS_META[template.type]
  const isLocked = isTemplateLocked(template.type, userPlan)

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
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
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

        <button
          type="button"
          onClick={handleSelect}
          disabled={false}
          className="w-full rounded-xl bg-[#1e3a8a] py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#1e40af]"
        >
          Usar plantilla
        </button>
      </div>
    </div>
  )
}
