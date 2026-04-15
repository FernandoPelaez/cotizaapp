import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ProfileType } from "@prisma/client"

const ALLOWED_PROFILE_TYPES: ProfileType[] = [
  ProfileType.INDEPENDIENTE,
  ProfileType.NEGOCIO,
]

function normalizeProfileType(value: unknown): ProfileType | null {
  if (typeof value !== "string") return null

  const normalized = value.trim().toUpperCase()

  if (normalized === "INDEPENDIENTE") return ProfileType.INDEPENDIENTE
  if (normalized === "NEGOCIO") return ProfileType.NEGOCIO

  return null
}

function serializeProfileType(profileType: ProfileType | null) {
  if (profileType === ProfileType.INDEPENDIENTE) return "independiente"
  if (profileType === ProfileType.NEGOCIO) return "negocio"
  return null
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
        profileType: true,
        profileCompleted: true,
        onboardingStep: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      profileType: serializeProfileType(user.profileType),
      profileCompleted: user.profileCompleted,
      onboardingStep: user.onboardingStep,
    })
  } catch (error) {
    console.error("ERROR GET PROFILE API:", error)

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const profileType = normalizeProfileType(body?.profileType)

    if (!profileType || !ALLOWED_PROFILE_TYPES.includes(profileType)) {
      return NextResponse.json(
        { error: "profileType inválido" },
        { status: 400 }
      )
    }

    const user = await prisma.user.upsert({
      where: {
        email: session.user.email,
      },
      update: {
        profileType,
        onboardingStep: 2,
        profileCompleted: false,
      },
      create: {
        email: session.user.email,
        name: session.user.name ?? "",
        image: session.user.image ?? null,
        profileType,
        onboardingStep: 2,
        profileCompleted: false,
        profile: {
          create: {},
        },
      },
      include: {
        profile: true,
        plan: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Perfil guardado correctamente",
      nextStep: "/onboarding/questions",
      user,
    })
  } catch (error) {
    console.error("ERROR PROFILE API:", error)

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
