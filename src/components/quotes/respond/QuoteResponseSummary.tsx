import { FileText } from "lucide-react"
import {
  formatCurrency,
  getItemsLabel,
} from "@/lib/quotes/quote-response.utils"

type QuoteResponseSummaryProps = {
  total: number
  totalItems: number
}

export function QuoteResponseSummary({
  total,
  totalItems,
}: QuoteResponseSummaryProps) {
  return (
    <section className="overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#0d3b8e_0%,#0a2f82_100%)] text-white shadow-[0_16px_36px_rgba(15,23,42,0.14)]">
      <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
            <FileText className="h-7 w-7" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
              Resumen
            </p>
            <p className="mt-2 text-3xl font-extrabold">
              {getItemsLabel(totalItems)}
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
            Total
          </p>
          <p className="mt-2 text-4xl font-extrabold tracking-tight">
            {formatCurrency(total)}
          </p>
        </div>
      </div>
    </section>
  )
}
