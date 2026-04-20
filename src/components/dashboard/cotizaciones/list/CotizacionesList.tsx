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
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-neutral-500">No tienes cotizaciones aún</p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-3 shadow-sm">
      <div className="max-h-[560px] space-y-3 overflow-y-auto pr-1">
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
  )
}
