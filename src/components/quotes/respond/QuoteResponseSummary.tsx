import type { ReactNode } from "react"
import { formatCurrency, getItemsLabel } from "@/lib/quotes/quote-response.utils"

type QuoteResponseSummaryProps = {
  total: number
  totalItems: number
  children?: ReactNode
}

export function QuoteResponseSummary({
  total,
  totalItems,
  children,
}: QuoteResponseSummaryProps) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-white">
      <div className="flex flex-col gap-4 border-b border-[var(--border)] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Resumen
          </p>
          <h2 className="mt-2 text-xl font-bold text-[var(--foreground)]">
            Detalle de conceptos
          </h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {getItemsLabel(totalItems)}
          </p>
        </div>

        <div className="rounded-2xl bg-[var(--primary-soft)] px-4 py-3 text-left sm:min-w-[220px] sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Total
          </p>
          <p className="mt-1 text-2xl font-bold text-[var(--primary)]">
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      {children}
    </section>
  )
}
