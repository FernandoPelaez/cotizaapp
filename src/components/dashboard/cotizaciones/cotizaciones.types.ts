export type QuoteStatus =
  | "DRAFT"
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"

export type SendChannel = "PDF" | "WHATSAPP"

export type Quote = {
  id: string
  title: string
  clientName: string
  clientPhone?: string | null
  total: number
  status: QuoteStatus
  sendChannel?: SendChannel
  sentAt?: string | null
  responseExpiresAt?: string | null
  createdAt: string
}

export type QuotesResponse = {
  quotes: Quote[]
  totalThisMonth?: number
  user?: {
    quotesUsed?: number
    trialQuotesLimit?: number
    trialBlocked?: boolean
    plan?: {
      name?: string
      maxQuotes?: number
    }
  }
}

export type Notice = {
  type: "success" | "error"
  message: string
} | null

export type QuotesSummary = {
  drafts: number
  pending: number
  accepted: number
  rejected: number
  expired: number
}
