"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Plus } from "lucide-react"

import { cotizacionesEase } from "@/components/dashboard/cotizaciones/animations/cotizaciones.motion"
import type { Quote } from "@/types/cotizacion"
import CotizacionCard from "./CotizacionCard"

type CotizacionesListProps = {
  quotes: Quote[]
  deletingId: string | null
  sendingWhatsAppId: string | null
  onSendWhatsApp: (quote: Quote) => void
  onDelete: (quote: Quote) => void
}

const MotionLink = motion(Link)

export default function CotizacionesList({
  quotes,
  deletingId,
  sendingWhatsAppId,
  onSendWhatsApp,
  onDelete,
}: CotizacionesListProps) {
  if (quotes.length === 0) {
    return (
      <div className="flex min-h-[420px] flex-1 items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-6 py-10 text-center">
        <div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-700">
            <FileText className="h-6 w-6" />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-neutral-900">
            Aún no tienes cotizaciones
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
            Cuando empieces a crear cotizaciones, aquí podrás ver su historial,
            estado y acciones disponibles.
          </p>

          <MotionLink
            href="/cotizaciones/nueva"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            transition={{
              duration: 0.22,
              ease: cotizacionesEase,
            }}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white"
          >
            <Plus className="h-4 w-4" />
            Crear cotización
          </MotionLink>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {quotes.map((quote) => (
        <CotizacionCard
          key={quote.id}
          quote={quote}
          deletingId={deletingId}
          sendingWhatsAppId={sendingWhatsAppId}
          onSendWhatsApp={onSendWhatsApp}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
