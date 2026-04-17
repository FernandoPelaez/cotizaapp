import { FileText } from "lucide-react"
import {
  formatCurrency,
  getItemsLabel,
} from "@/lib/quotes/quote-response.utils"
import { QuoteResponseParties } from "./QuoteResponseParties"

type QuoteResponseSummaryProps = {
  total: number
  totalItems: number
  clientName: string
  clientPhone?: string | null
  clientEmail?: string | null
  businessName: string
}

export function QuoteResponseSummary({
  total,
  totalItems,
  clientName,
  clientPhone,
  clientEmail,
  businessName,
}: QuoteResponseSummaryProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-100">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[#c7d9f8] bg-[#dce8ff] px-4 py-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1a50c8] text-white">
          <FileText className="h-3.5 w-3.5" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#1a50c8]">
          Resumen de cotización
        </p>
      </div>

      {/* Body */}
      <div className="flex gap-0 divide-x divide-slate-100 bg-white">
        {/* Total */}
        <div className="flex flex-col justify-center gap-2 px-4 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
            Total
          </p>
          <p className="text-3xl font-extrabold tracking-tight text-slate-900">
            {formatCurrency(total)}
          </p>
          <span className="inline-block rounded-full bg-[#e8f0fe] px-3 py-1 text-[11px] font-semibold text-[#1a50c8]">
            {getItemsLabel(totalItems)}
          </span>
        </div>

        {/* Parties */}
        <div className="flex-1 px-4 py-4">
          <QuoteResponseParties
            clientName={clientName}
            clientPhone={clientPhone}
            clientEmail={clientEmail}
            businessName={businessName}
            createdAt={new Date()}
            variant="full"
          />
        </div>
      </div>
    </section>
  )
}
