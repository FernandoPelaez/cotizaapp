import Link from "next/link"
import { handleQuoteResponseAction } from "@/app/quotes/respond/[token]/actions"
import {
  formatCurrency,
  getItemsLabel,
} from "@/lib/quotes/quote-response.utils"

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
  total,
  totalItems,
  canRespond,
}: QuoteResponseActionsProps) {
  return (
    <section className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        Respuesta
      </p>

      <h2 className="mt-3 text-2xl font-bold text-[var(--foreground)]">
        Decide sobre esta cotización
      </h2>

      <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
        Puedes revisar el PDF, validar los conceptos y responder en este
        momento. Tu decisión quedará registrada al instante.
      </p>

      <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--primary-soft)] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Total final
        </p>
        <p className="mt-2 text-3xl font-bold text-[var(--primary)]">
          {formatCurrency(total)}
        </p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          {getItemsLabel(totalItems)}
        </p>
      </div>

      <div className="mt-6">
        <Link
          href={`/api/quotes/${quoteId}/pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-2xl border border-[var(--primary-light)] bg-white px-4 py-3 text-sm font-semibold text-[var(--primary)] transition hover:bg-[var(--primary-soft)]"
        >
          Ver PDF
        </Link>
      </div>

      {canRespond ? (
        <form action={handleQuoteResponseAction} className="mt-4 space-y-3">
          <input type="hidden" name="token" value={token} />

          <button
            type="submit"
            name="decision"
            value="ACCEPTED"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
          >
            Aceptar cotización
          </button>

          <button
            type="submit"
            name="decision"
            value="REJECTED"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--primary-soft)]"
          >
            Rechazar cotización
          </button>
        </form>
      ) : (
        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--primary-soft)] px-4 py-4">
          <p className="text-sm font-medium text-[var(--foreground)]">
            Esta cotización ya no admite respuesta.
          </p>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-dashed border-[var(--border)] px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Seguridad
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
          Esta respuesta se procesa desde un enlace único asociado a la
          cotización enviada al cliente.
        </p>
      </div>
    </section>
  )
}
