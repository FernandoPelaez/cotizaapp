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
    <section className="space-y-4">
      <div className="overflow-hidden rounded-[24px] border border-emerald-200 bg-[#eefcf5] shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#c9f4dc] text-[#16a34a]">
              <Handshake className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-[var(--foreground)]">
                Toma una decisión
              </h2>
              <p className="mt-2 text-lg text-[var(--text-muted)]">
                Por favor indícanos si aceptas o rechazas la cotización.
              </p>

              {canRespond && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#d9fbe8] px-4 py-2 text-sm font-semibold text-[#0f8a43]">
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
                className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-2xl bg-[#16a34a] px-6 py-4 text-lg font-bold text-white shadow-sm transition hover:brightness-110"
              >
                <Check className="h-5 w-5" />
                Aceptar cotización
              </button>

              <button
                type="submit"
                name="decision"
                value="REJECTED"
                className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-2xl bg-[#dc2626] px-6 py-4 text-lg font-bold text-white shadow-sm transition hover:brightness-110"
              >
                <X className="h-5 w-5" />
                Rechazar cotización
              </button>
            </form>
          ) : (
            <div className="rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-base font-semibold text-[var(--foreground)]">
              Esta cotización ya no admite respuesta.
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/api/quotes/${quoteId}/pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-lg font-bold text-[#2563eb] underline-offset-4 hover:underline"
        >
          <Download className="h-5 w-5" />
          Ver y descargar PDF
        </Link>

        <p className="text-center text-sm font-medium text-[var(--text-muted)] sm:text-right">
          Enlace seguro y temporal. Tus datos están protegidos.
        </p>
      </div>
    </section>
  )
}
