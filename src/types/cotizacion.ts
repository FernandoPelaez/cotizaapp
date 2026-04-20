export type QuoteStatus =
  | "DRAFT"
  | "SENT"
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"

export type SendChannel = "PDF" | "WHATSAPP"

export type QuoteEventType =
  | "QUOTE_SENT"
  | "QUOTE_ACCEPTED"
  | "QUOTE_REJECTED"
  | "QUOTE_EXPIRED"

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

export type QuoteEventMetadata = {
  clientName?: string
  sendChannel?: SendChannel
  responseExpiresAt?: string
  previousStatus?: QuoteStatus
  expiredAt?: string
  decision?: "ACCEPTED" | "REJECTED"
  respondedAt?: string
  [key: string]: unknown
}

export type QuoteEvent = {
  id: string
  quoteId: string
  type: QuoteEventType
  title: string
  message?: string | null
  isRead: boolean
  readAt?: string | null
  metadata?: QuoteEventMetadata | null
  createdAt: string
  quote?: {
    id: string
    title: string
    clientName: string
    status?: QuoteStatus
  } | null
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

export type QuoteEventsResponse = {
  events: QuoteEvent[]
  unreadCount: number
}

export type Notice = {
  type: "success" | "error"
  message: string
} | null

export type QuotesSummary = {
  drafts: number
  sent: number
  pending: number
  accepted: number
  rejected: number
  expired: number
}

