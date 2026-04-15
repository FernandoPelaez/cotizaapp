import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Dashboard, {
  type UserConfig,
  type Cotizacion,
  type Plantilla,
} from "@/components/dashboard"

type DashboardQuoteStatus =
  | "borrador"
  | "pendiente"
  | "aprobada"
  | "rechazada"
  | "expirada"

function formatShortDate(value: Date) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
  }).format(value)
}

function mapQuoteStatusToDashboardStatus(
  status: "DRAFT" | "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED"
): DashboardQuoteStatus {
  switch (status) {
    case "DRAFT":
      return "borrador"
    case "PENDING":
      return "pendiente"
    case "ACCEPTED":
      return "aprobada"
    case "REJECTED":
      return "rechazada"
    case "EXPIRED":
      return "expirada"
    default:
      return "borrador"
  }
}

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

export default async function Page() {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string } | undefined)?.id

  if (!userId) {
    return <Dashboard />
  }

  await expirePendingQuotes(userId)

  const [user, quotes, templates] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      include: {
        plan: true,
        profile: {
          include: {
            defaultTemplate: true,
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

  const cotizaciones: Cotizacion[] = quotes.map((quote, index) => ({
    id: quote.id,
    numero: index + 1,
    nombre: quote.title,
    descripcion: quote.description ?? undefined,
    fecha: formatShortDate(quote.createdAt),
    monto: quote.total,
    estado: mapQuoteStatusToDashboardStatus(quote.status),
  }))

  const plantillasDisponibles: Plantilla[] = templates.map((template) => ({
    id: template.id,
    nombre: template.name,
    color: "#1B3D7A",
    accentColor: "#1B3D7A",
    activa: user?.profile?.defaultTemplateId === template.id,
    tipo: template.isPremium ? "pro" : "basica",
    preview: template.previewUrl ?? undefined,
  }))

  return (
    <Dashboard
      userConfig={userConfig}
      cotizaciones={cotizaciones}
      plantillasDisponibles={plantillasDisponibles}
    />
  )
}
