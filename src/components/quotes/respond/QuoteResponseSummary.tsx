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
    <section className="overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#0d3b8e_0%,#0a2f82_100%)] text-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
      <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">
              Resumen
            </p>
            <p className="mt-1.5 text-xl font-extrabold sm:text-2xl">
              {getItemsLabel(totalItems)}
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">
            Total
          </p>
          <p className="mt-1.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {formatCurrency(total)}
          </p>
        </div>
      </div>
    </section>
  )
}
