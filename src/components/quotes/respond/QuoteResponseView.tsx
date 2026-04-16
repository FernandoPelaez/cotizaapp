import { getResultMessage, type QuoteResponseResult } from "@/lib/quotes/quote-response.utils"
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
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--card)] shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <QuoteResponseHeader
            title={quote.title}
            status={quote.status}
            createdAt={quote.createdAt}
            responseExpiresAt={quote.responseExpiresAt}
          />

          <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.35fr_0.9fr] lg:px-8 lg:py-8">
            <section className="space-y-6">
              {resultMessage && (
                <div
                  className={`rounded-2xl border px-4 py-4 text-sm font-medium ${resultMessage.className}`}
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
              />

              <QuoteResponseSummary total={quote.total} totalItems={totalItems}>
                <QuoteResponseItems items={quote.items} />
              </QuoteResponseSummary>

              <QuoteResponseNotes
                description={quote.description}
                notes={quote.notes}
              />
            </section>

            <aside className="space-y-6">
              <QuoteResponseActions
                quoteId={quote.id}
                token={token}
                total={quote.total}
                totalItems={totalItems}
                canRespond={canRespond}
              />
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}
