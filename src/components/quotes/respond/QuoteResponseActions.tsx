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
      <div className="overflow-hidden rounded-[20px] border border-emerald-200 bg-[#eefcf5] shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#c9f4dc] text-[#16a34a]">
              <Handshake className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[var(--foreground)] sm:text-2xl">
                Toma una decisión
              </h2>

              <p className="mt-1.5 text-sm text-[var(--text-muted)] sm:text-[15px]">
                Por favor indícanos si aceptas o rechazas la cotización.
              </p>

              {canRespond && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#d9fbe8] px-3 py-1.5 text-xs font-semibold text-[#0f8a43] sm:text-sm">
                  <Clock3 className="h-4 w-4" />
                  Este enlace estará disponible por tiempo limitado.
                </div>
              )}
            </div>
          </div>

          {canRespond ? (
            <form
              action={handleQuoteResponseAction}
              className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row"
            >
              <input type="hidden" name="token" value={token} />

              <button
                type="submit"
                name="decision"
                value="ACCEPTED"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#16a34a] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-110 sm:text-base"
              >
                <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                Aceptar cotización
              </button>

              <button
                type="submit"
                name="decision"
                value="REJECTED"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#dc2626] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-110 sm:text-base"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
                Rechazar cotización
              </button>
            </form>
          ) : (
            <div className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)] sm:text-base">
              Esta cotización ya no admite respuesta.
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/api/quotes/${quoteId}/pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#2563eb] underline-offset-4 hover:underline sm:text-base"
        >
          <Download className="h-4 w-4 sm:h-5 sm:w-5" />
          Ver y descargar PDF
        </Link>

        <p className="text-center text-xs font-medium text-[var(--text-muted)] sm:text-right sm:text-sm">
          Enlace seguro y temporal. Tus datos están protegidos.
        </p>
      </div>
    </section>
  )
}
