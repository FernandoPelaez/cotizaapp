import {
  getResultMessage,
  type QuoteResponseResult,
} from "@/lib/quotes/quote-response.utils"
import { QuoteResponseActions } from "./QuoteResponseActions"
import { QuoteResponseParties } from "./QuoteResponseParties"
import { QuoteResponseSummary } from "./QuoteResponseSummary"
import { QuoteResponseHeader } from "./QuoteResponseHeader"

type QuoteResponseItem = {
  id: string
  name: string
  quantity: number
  price: number
  total: number
}

type QuoteResponseUser = {
  name: string | null
  email: string | null
  profile?: {
    businessName?: string | null
  } | null
}

type QuoteResponseQuote = {
  id: string
  title: string
  status: string
  clientName: string
  clientPhone: string | null
  clientEmail: string | null
  description: string | null
  notes: string | null
  total: number
  createdAt: Date | string
  responseExpiresAt: Date | string | null
  items: QuoteResponseItem[]
  user: QuoteResponseUser
}

type QuoteResponseViewProps = {
  quote: QuoteResponseQuote
  token: string
  result?: QuoteResponseResult
}

export function QuoteResponseView({
  quote,
  token,
  result,
}: QuoteResponseViewProps) {
  const businessName =
    quote.user.profile?.businessName ||
    quote.user.name ||
    quote.user.email ||
    "Negocio"

  const canRespond = quote.status === "PENDING"
  const totalItems = quote.items.length
  const resultMessage = getResultMessage(result)

  return (
    <main className="min-h-screen bg-[#f0f2f5] px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-[560px]">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.08)]">

          {/* Header */}
          <QuoteResponseHeader
            title={quote.title}
            status={quote.status}
            createdAt={quote.createdAt}
            responseExpiresAt={quote.responseExpiresAt}
          />

          <div className="space-y-3.5 px-4 py-5 sm:px-5">

            {/* Result message */}
            {resultMessage && (
              <div
                className={`rounded-xl border px-3 py-3 text-sm font-medium ${resultMessage.className}`}
              >
                {resultMessage.message}
              </div>
            )}

            {/* Title block + dates */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1a50c8]">
                  Cotización
                </p>
                <h1 className="mt-1 text-xl font-extrabold leading-tight text-slate-900">
                  {quote.title}
                </h1>
                <p className="mt-1 text-xs text-slate-500">
                  Revisa el resumen y responde si aceptas o rechazas esta cotización.
                </p>
              </div>
              <QuoteResponseParties
                clientName={quote.clientName}
                clientPhone={quote.clientPhone}
                clientEmail={quote.clientEmail}
                businessName={businessName}
                businessEmail={quote.user.email}
                createdAt={quote.createdAt}
                responseExpiresAt={quote.responseExpiresAt}
                variant="dates-only"
              />
            </div>

            {/* Summary + parties */}
            <QuoteResponseSummary
              total={quote.total}
              totalItems={totalItems}
              clientName={quote.clientName}
              clientPhone={quote.clientPhone}
              clientEmail={quote.clientEmail}
              businessName={businessName}
            />

            {/* Actions */}
            <QuoteResponseActions
              quoteId={quote.id}
              token={token}
              total={quote.total}
              totalItems={totalItems}
              canRespond={canRespond}
            />

          </div>
        </div>
      </div>
    </main>
  )
}
