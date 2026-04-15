import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    const userId = (session?.user as { id?: string })?.id;

    if (!session || !userId) {
      return NextResponse.json(
        { error: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const now = new Date();

    const [user, quotesUsed, activeSessionsCount] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          updatedAt: true,

          plan: {
            select: {
              id: true,
              name: true,
              price: true,
              maxQuotes: true,
            },
          },
        },
      }),

      prisma.quote.count({
        where: { userId },
      }),

      prisma.session.count({
        where: {
          userId,
          expires: {
            gt: now,
          },
        },
      }),
    ]);

    if (!user) {
      return NextResponse.json(
        { error: "USER_NOT_FOUND" },
        { status: 401 }
      );
    }

    const maxQuotes = user.plan?.maxQuotes ?? 10;
    const remaining = Math.max(maxQuotes - quotesUsed, 0);

    return NextResponse.json({
      user,
      plan: user.plan ?? null,
      usage: {
        quotesUsed,
        maxQuotes,
        remaining,
      },
      activeSessions: activeSessionsCount, 
    });

  } catch (error: any) {
    console.error("GET /api/user/me error:", {
      message: error?.message,
      stack: error?.stack,
    });

    return NextResponse.json(
      { error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}
