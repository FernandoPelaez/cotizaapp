import { notFound } from "next/navigation"
import { expireQuoteIfNeeded } from "@/lib/quotes/response"
import { type QuoteResponseResult } from "@/lib/quotes/quote-response.utils"
import { QuoteResponseView } from "@/components/quotes/respond/QuoteResponseView"

type PageProps = {
  params: Promise<{
    token: string
  }>
  searchParams?: Promise<{
    result?: QuoteResponseResult
  }>
}

export default async function QuoteResponsePage({
  params,
  searchParams,
}: PageProps) {
  const { token } = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const result = resolvedSearchParams?.result

  const quote = await expireQuoteIfNeeded(token)

  if (!quote) {
    notFound()
  }

  return <QuoteResponseView quote={quote} token={token} result={result} />
}
