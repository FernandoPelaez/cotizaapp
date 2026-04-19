import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import type { UserConfig } from "@/types/dashboard"
import {
  mapQuotesToDashboardQuotes,
  mapTemplatesToDashboardTemplates,
} from "./dashboard.mappers"

async function expirePendingQuotes(userId: string) {
  const now = new Date()

  await prisma.quote.updateMany({
    where: {
      userId,
      status: "PENDING",
      responseExpiresAt: {
        not: null,
        lte: now,
      },
      respondedAt: null,
    },
    data: {
      status: "EXPIRED",
    },
  })
}

export async function getDashboardData() {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string } | undefined)?.id

  if (!userId) {
    return {
      userConfig: undefined,
      cotizaciones: [],
      plantillasDisponibles: [],
    }
  }

  await expirePendingQuotes(userId)

  const [user, quotes, templates] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        quotesUsed: true,
        trialQuotesLimit: true,
        plan: {
          select: {
            name: true,
            maxQuotes: true,
          },
        },
        profile: {
          select: {
            defaultTemplateId: true,
            defaultTemplate: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    }),

    prisma.quote.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
      select: {
        id: true,
        title: true,
        description: true,
        total: true,
        status: true,
        createdAt: true,
      },
    }),

    prisma.template.findMany({
      orderBy: [{ isPremium: "asc" }, { createdAt: "desc" }],
      take: 12,
      select: {
        id: true,
        name: true,
        isPremium: true,
        previewUrl: true,
      },
    }),
  ])

  const plan: "free" | "pro" =
    user?.plan?.name?.toLowerCase().includes("pro") ? "pro" : "free"

  const userConfig: UserConfig = {
    plan,
    cotizacionesUsadas: user?.quotesUsed ?? 0,
    cotizacionesMax: user?.plan?.maxQuotes ?? user?.trialQuotesLimit ?? 10,
    plantillaActivaNombre:
      user?.profile?.defaultTemplate?.name ?? "Sin plantilla activa",
    historialTotal: quotes.length,
  }

  return {
    userConfig,
    cotizaciones: mapQuotesToDashboardQuotes(quotes),
    plantillasDisponibles: mapTemplatesToDashboardTemplates(
      templates,
      user?.profile?.defaultTemplateId
    ),
  }
}
