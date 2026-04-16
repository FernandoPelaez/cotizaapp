import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

async function getUserIdFromSession() {
  const session = await getServerSession(authOptions)
  return (session?.user as { id?: string } | undefined)?.id
}

export async function GET(request: Request) {
  try {
    const userId = await getUserIdFromSession()

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limitParam = Number(searchParams.get("limit") || 6)
    const limit = Math.min(Math.max(limitParam, 1), 20)

    const [events, unreadCount] = await Promise.all([
      prisma.quoteEvent.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit,
        include: {
          quote: {
            select: {
              id: true,
              title: true,
              clientName: true,
              status: true,
            },
          },
        },
      }),
      prisma.quoteEvent.count({
        where: {
          userId,
          isRead: false,
        },
      }),
    ])

    return NextResponse.json({
      events,
      unreadCount,
    })
  } catch (error) {
    console.error("ERROR GET QUOTE EVENTS API:", error)

    return NextResponse.json(
      { error: "Error al obtener eventos recientes" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const userId = await getUserIdFromSession()

    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = (await request.json().catch(() => null)) as
      | {
          eventIds?: unknown
          readAll?: unknown
        }
      | null

    const readAll = Boolean(body?.readAll)
    const eventIds = Array.isArray(body?.eventIds)
      ? body.eventIds.filter(
          (value): value is string =>
            typeof value === "string" && value.trim().length > 0
        )
      : []

    if (!readAll && eventIds.length === 0) {
      return NextResponse.json(
        { error: "Debes indicar eventos para marcar como leídos" },
        { status: 400 }
      )
    }

    await prisma.quoteEvent.updateMany({
      where: {
        userId,
        isRead: false,
        ...(readAll ? {} : { id: { in: eventIds } }),
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    })

    const unreadCount = await prisma.quoteEvent.count({
      where: {
        userId,
        isRead: false,
      },
    })

    return NextResponse.json({
      ok: true,
      unreadCount,
    })
  } catch (error) {
    console.error("ERROR PATCH QUOTE EVENTS API:", error)

    return NextResponse.json(
      { error: "Error al actualizar notificaciones" },
      { status: 500 }
    )
  }
}
