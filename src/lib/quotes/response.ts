import { prisma } from "@/lib/prisma"

type QuoteDecision = "ACCEPTED" | "REJECTED"

export async function getQuoteByToken(token: string) {
  return prisma.quote.findFirst({
    where: {
      responseToken: token,
    },
    include: {
      items: true,
      user: {
        include: {
          profile: true,
        },
      },
      template: true,
    },
  })
}

export async function expireQuoteIfNeeded(token: string) {
  const quote = await getQuoteByToken(token)

  if (!quote) return null

  const now = new Date()
  const shouldExpire =
    quote.status === "PENDING" &&
    !!quote.responseExpiresAt &&
    quote.responseExpiresAt <= now &&
    !quote.respondedAt

  if (!shouldExpire) {
    return quote
  }

  const updatedQuote = await prisma.$transaction(async (tx) => {
    const expiredQuote = await tx.quote.update({
      where: {
        id: quote.id,
      },
      data: {
        status: "EXPIRED",
      },
      include: {
        items: true,
        user: {
          include: {
            profile: true,
          },
        },
        template: true,
      },
    })

    await tx.quoteEvent.create({
      data: {
        quoteId: quote.id,
        userId: quote.userId,
        type: "QUOTE_EXPIRED",
        title: "Cotización expirada",
        message: `La cotización "${quote.title}" expiró sin respuesta del cliente.`,
        metadata: {
          clientName: quote.clientName,
          previousStatus: quote.status,
          expiredAt: now.toISOString(),
        },
      },
    })

    return expiredQuote
  })

  return updatedQuote
}

export async function respondToQuote(token: string, decision: QuoteDecision) {
  if (!token || !["ACCEPTED", "REJECTED"].includes(decision)) {
    return { ok: false as const, reason: "invalid" as const }
  }

  const quote = await prisma.quote.findFirst({
    where: {
      responseToken: token,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      clientName: true,
      status: true,
      responseExpiresAt: true,
      respondedAt: true,
    },
  })

  if (!quote) {
    return { ok: false as const, reason: "not-found" as const }
  }

  const now = new Date()

  const isExpired =
    quote.status === "PENDING" &&
    !!quote.responseExpiresAt &&
    quote.responseExpiresAt <= now &&
    !quote.respondedAt

  if (isExpired) {
    await prisma.$transaction(async (tx) => {
      await tx.quote.update({
        where: {
          id: quote.id,
        },
        data: {
          status: "EXPIRED",
        },
      })

      await tx.quoteEvent.create({
        data: {
          quoteId: quote.id,
          userId: quote.userId,
          type: "QUOTE_EXPIRED",
          title: "Cotización expirada",
          message: `La cotización "${quote.title}" expiró sin respuesta del cliente.`,
          metadata: {
            clientName: quote.clientName,
            previousStatus: quote.status,
            expiredAt: now.toISOString(),
          },
        },
      })
    })

    return { ok: false as const, reason: "expired" as const }
  }

  if (quote.status === "ACCEPTED") {
    return { ok: false as const, reason: "accepted" as const }
  }

  if (quote.status === "REJECTED") {
    return { ok: false as const, reason: "rejected" as const }
  }

  if (quote.status === "EXPIRED") {
    return { ok: false as const, reason: "expired" as const }
  }

  if (quote.status !== "PENDING") {
    return { ok: false as const, reason: "invalid" as const }
  }

  await prisma.$transaction(async (tx) => {
    await tx.quote.update({
      where: {
        id: quote.id,
      },
      data: {
        status: decision,
        respondedAt: now,
      },
    })

    await tx.quoteEvent.create({
      data: {
        quoteId: quote.id,
        userId: quote.userId,
        type: decision === "ACCEPTED" ? "QUOTE_ACCEPTED" : "QUOTE_REJECTED",
        title:
          decision === "ACCEPTED"
            ? "Cotización aceptada"
            : "Cotización rechazada",
        message:
          decision === "ACCEPTED"
            ? `El cliente ${quote.clientName} aceptó la cotización "${quote.title}".`
            : `El cliente ${quote.clientName} rechazó la cotización "${quote.title}".`,
        metadata: {
          clientName: quote.clientName,
          decision,
          respondedAt: now.toISOString(),
        },
      },
    })
  })

  return {
    ok: true as const,
    reason: decision === "ACCEPTED" ? "accepted" : "rejected",
  }
}
