import Link from "next/link"
import { Check, Clock3, Download, Handshake, X } from "lucide-react"
import { handleQuoteResponseAction } from "@/app/quotes/respond/[token]/actions"

type QuoteResponseActionsProps = {
  quoteId: string
  token: string
  total: number
  totalItems: number
  canRespond: boolean
}

export function QuoteResponseActions({
  quoteId,
  token,
  canRespond,
}: QuoteResponseActionsProps) {
  return (
    <section className="space-y-3">
      {/* PDF link */}
      <div className="flex items-center gap-3 rounded-xl border border-[#d8e6ff] bg-[#edf4ff] px-4 py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#dbe8ff] text-[#1a50c8]">
          <Download className="h-3.5 w-3.5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs leading-snug text-slate-600">
            Consulta el PDF para ver el detalle completo de productos, cantidades, precios y condiciones.
          </p>
          <Link
            href={`/api/quotes/respond/${token}/pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#2563eb] underline-offset-4 hover:underline"
          >
            <Download className="h-3 w-3" />
            Ver y descargar PDF
          </Link>
        </div>
      </div>

      {/* Decision block */}
      <div className="overflow-hidden rounded-xl border border-emerald-200 bg-[#f8fdf8]">
        <div className="flex items-start gap-3 px-4 py-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d6f0d8] text-[#1e7e34]">
            <Handshake className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Toma una decisión
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Por favor indícanos si aceptas o rechazas la cotización.
            </p>
            {canRespond && (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#d8f0da] px-2.5 py-1 text-[11px] font-semibold text-[#0f8a43]">
                <Clock3 className="h-3 w-3" />
                Este enlace estará disponible por 1 minuto.
              </div>
            )}
          </div>
        </div>

        {canRespond ? (
          <form
            action={handleQuoteResponseAction}
            className="grid grid-cols-2 gap-2 border-t border-emerald-100 px-4 pb-4 pt-3"
          >
            <input type="hidden" name="token" value={token} />
            <button
              type="submit"
              name="decision"
              value="ACCEPTED"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              <Check className="h-4 w-4" />
              Aceptar cotización
            </button>
            <button
              type="submit"
              name="decision"
              value="REJECTED"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#dc2626] px-4 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              <X className="h-4 w-4" />
              Rechazar cotización
            </button>
          </form>
        ) : (
          <div className="border-t border-emerald-100 px-4 pb-4 pt-3">
            <div className="rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600">
              Esta cotización ya no admite respuesta.
            </div>
          </div>
        )}
      </div>

      {/* Footer security message */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        <svg
          className="h-3 w-3 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 018 0v4" />
        </svg>
        <p className="text-center text-[11px] text-slate-400">
          Enlace seguro y temporal. Tus datos están protegidos.
        </p>
      </div>
    </section>
  )
}
