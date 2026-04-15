"use client"

import { useRouter } from "next/navigation"
import { Template } from "@/types/template"

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

export default function TemplateCard({ template }: { template: Template }) {
  const router = useRouter()
  const PreviewComponent = template.component

  const isProUser = true
  const isLocked = template.type === "pro" && !isProUser

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
      alert("Esta plantilla es PRO. Actualiza tu plan para usarla.")
      return
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTemplate", template.id)
    }

    router.push(`/cotizaciones/nueva?template=${template.id}`)
  }

  return (
    <div className="group relative bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border backdrop-blur-sm ${
            template.type === "pro"
              ? "bg-amber-50 border-amber-200 text-amber-600"
              : "bg-white/80 border-neutral-200 text-neutral-500"
          }`}
        >
          {template.type === "pro" ? "PRO" : "BÁSICA"}
        </span>
      </div>

      {isLocked && (
        <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <span className="text-xs font-semibold text-amber-600 bg-white px-3 py-1 rounded-full border border-amber-200 shadow-sm">
            🔒 Solo PRO
          </span>
        </div>
      )}

      <div
        className="relative w-full bg-neutral-50 overflow-hidden"
        style={{ height: `${PREVIEW_HEIGHT}px` }}
      >
        {PreviewComponent ? (
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
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-neutral-300 text-sm">Sin preview</span>
          </div>
        )}
      </div>

      <div className="px-4 pb-4 pt-3 border-t border-neutral-100">
        <h3 className="text-sm font-semibold text-neutral-900 mb-0.5">
          {template.name}
        </h3>

        <p className="text-xs text-neutral-400 mb-3">
          Plantilla estándar · {template.type === "pro" ? "Pro" : "Básica"}
        </p>

        <button
          type="button"
          onClick={handleSelect}
          disabled={isLocked}
          className={`w-full py-2 rounded-xl text-sm font-semibold transition-all duration-150 shadow-sm ${
            isLocked
              ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              : "bg-[#1e3a8a] hover:bg-[#1e40af] text-white"
          }`}
        >
          {isLocked ? "Solo PRO" : "Usar plantilla"}
        </button>
      </div>
    </div>
  )
}
