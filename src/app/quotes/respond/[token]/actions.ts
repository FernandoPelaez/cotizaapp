"use server"

import { redirect } from "next/navigation"
import { respondToQuote } from "@/lib/quotes/response"

export async function handleQuoteResponseAction(formData: FormData) {
  const token = String(formData.get("token") || "")
  const decision = String(formData.get("decision") || "")

  const result = await respondToQuote(
    token,
    decision as "ACCEPTED" | "REJECTED"
  )

  redirect(`/quotes/respond/${token}?result=${result.reason}`)
}
