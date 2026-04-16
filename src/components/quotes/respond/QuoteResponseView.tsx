import {
  getResultMessage,
  type QuoteResponseResult,
} from "@/lib/quotes/quote-response.utils"
import { QuoteResponseActions } from "./QuoteResponseActions"
import { QuoteResponseHeader } from "./QuoteResponseHeader"
import { QuoteResponseItems } from "./QuoteResponseItems"
import { QuoteResponseNotes } from "./QuoteResponseNotes"
import { QuoteResponseParties } from "./QuoteResponseParties"
import { QuoteResponseSummary } from "./QuoteResponseSummary"

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
    <main className="min-h-screen bg-[var(--background)] px-4 py-0 sm:px-6">
      <div className="mx-auto max-w-6xl pb-10">
        <QuoteResponseHeader
          title={quote.title}
          status={quote.status}
          createdAt={quote.createdAt}
          responseExpiresAt={quote.responseExpiresAt}
        />

        <div className="space-y-6 px-0 py-6 sm:px-0 sm:py-8">
          {resultMessage && (
            <div
              className={`rounded-2xl border px-4 py-4 text-sm font-medium shadow-sm ${resultMessage.className}`}
            >
              {resultMessage.message}
            </div>
          )}

          <QuoteResponseParties
            clientName={quote.clientName}
            clientPhone={quote.clientPhone}
            clientEmail={quote.clientEmail}
            businessName={businessName}
            businessEmail={quote.user.email}
            createdAt={quote.createdAt}
            responseExpiresAt={quote.responseExpiresAt}
          />

          <QuoteResponseSummary total={quote.total} totalItems={totalItems} />

          <section className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-white shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
            <QuoteResponseItems items={quote.items} />
          </section>

          <QuoteResponseNotes
            description={quote.description}
            notes={quote.notes}
          />

          <QuoteResponseActions
            quoteId={quote.id}
            token={token}
            total={quote.total}
            totalItems={totalItems}
            canRespond={canRespond}
          />
        </div>
      </div>
    </main>
  )
}
