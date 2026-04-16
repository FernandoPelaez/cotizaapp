"use server"

import { redirect } from "next/navigation"
import { respondToQuote } from "@/lib/quotes/response"

type QuoteDecision = "ACCEPTED" | "REJECTED"

function getDecision(value: FormDataEntryValue | null): QuoteDecision | null {
  if (value === "ACCEPTED" || value === "REJECTED") {
    return value
  }

  return null
}

export async function handleQuoteResponseAction(formData: FormData) {
  const token = String(formData.get("token") ?? "").trim()
  const decision = getDecision(formData.get("decision"))

  if (!token) {
    redirect("/quotes")
  }

  if (!decision) {
    redirect(`/quotes/respond/${token}?result=invalid`)
  }

  const result = await respondToQuote(token, decision)

  redirect(`/quotes/respond/${token}?result=${result.reason}`)
}
