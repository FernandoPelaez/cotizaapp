import Link from "next/link"
import { FileText, Plus } from "lucide-react"

import type { Quote } from "@/types/cotizacion"
import CotizacionCard from "./CotizacionCard"

type CotizacionesListProps = {
  quotes: Quote[]
  deletingId: string | null
  sendingWhatsAppId: string | null
  onSendWhatsApp: (quote: Quote) => void
  onDelete: (quote: Quote) => void
}

export default function CotizacionesList({
  quotes,
  deletingId,
  sendingWhatsAppId,
  onSendWhatsApp,
  onDelete,
}: CotizacionesListProps) {
  if (quotes.length === 0) {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-6 py-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-700">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-neutral-900">Aún no tienes cotizaciones</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
            Cuando empieces a crear cotizaciones, aquí podrás ver su historial, estado y acciones disponibles.
          </p>
          <Link
            href="/cotizaciones/nueva"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Crear cotización
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-3.5">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">Cotizaciones registradas</h3>
          <p className="text-xs text-neutral-400">
            Administra tus cotizaciones, revisa su estado y ejecuta acciones rápidas.
          </p>
        </div>
        <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-500">
          {quotes.length} cotización{quotes.length === 1 ? "" : "es"}
        </span>
      </div>

      {/* Lista con scroll */}
      <div className="p-3">
        <div className="max-h-[520px] space-y-1.5 overflow-y-auto pr-0.5">
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
      </div>
    </section>
  )
}
