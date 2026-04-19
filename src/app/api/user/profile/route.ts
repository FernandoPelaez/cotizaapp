import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ProfileType } from "@prisma/client"

const ALLOWED_PROFILE_TYPES: ProfileType[] = [
  ProfileType.INDEPENDIENTE,
  ProfileType.NEGOCIO,
]

type ProfileUpdatePayload = {
  phone?: unknown
  city?: unknown
  state?: unknown
  businessName?: unknown
  description?: unknown
  logoUrl?: unknown
}

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

function normalizeOptionalString(value: unknown): string | null | undefined {
  if (value === undefined) return undefined
  if (value === null) return null
  if (typeof value !== "string") return null

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : null
}

function normalizeOptionalUrl(value: unknown): string | null | undefined {
  const normalized = normalizeOptionalString(value)

  if (normalized === undefined || normalized === null) {
    return normalized
  }

  return normalized
}

function buildProfileResponse(
  profile:
    | {
        phone: string | null
        city: string | null
        state: string | null
        businessName: string | null
        description: string | null
        logoUrl: string | null
      }
    | null
    | undefined
) {
  return {
    phone: profile?.phone ?? null,
    city: profile?.city ?? null,
    state: profile?.state ?? null,
    businessName: profile?.businessName ?? null,
    description: profile?.description ?? null,
    logoUrl: profile?.logoUrl ?? null,
  }
}

function buildUserResponse(
  user: {
    id: string
    email: string
    name: string | null
    image: string | null
    profileType: ProfileType | null
    profileCompleted: boolean
    onboardingStep: number
    profile:
      | {
          phone: string | null
          city: string | null
          state: string | null
          businessName: string | null
          description: string | null
          logoUrl: string | null
        }
      | null
    plan:
      | {
          id: string
          name: string
          price: number
          maxQuotes: number
          whatsappSend: boolean
        }
      | null
  }
) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    profileType: serializeProfileType(user.profileType),
    profileCompleted: user.profileCompleted,
    onboardingStep: user.onboardingStep,
    profile: buildProfileResponse(user.profile),
    plan: user.plan,
  }
}

async function getAuthenticatedUserEmail() {
  const session = await getServerSession(authOptions)
  return session?.user?.email ?? null
}

export async function GET() {
  try {
    const email = await getAuthenticatedUserEmail()

    if (!email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        profileType: true,
        profileCompleted: true,
        onboardingStep: true,
        plan: {
          select: {
            id: true,
            name: true,
            price: true,
            maxQuotes: true,
            whatsappSend: true,
          },
        },
        profile: {
          select: {
            phone: true,
            city: true,
            state: true,
            businessName: true,
            description: true,
            logoUrl: true,
          },
        },
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
      user: buildUserResponse(user),
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
    const email = await getAuthenticatedUserEmail()

    if (!email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const session = await getServerSession(authOptions)
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
        email,
      },
      update: {
        profileType,
        onboardingStep: 2,
        profileCompleted: false,
        profile: {
          upsert: {
            update: {},
            create: {},
          },
        },
      },
      create: {
        email,
        name: session?.user?.name ?? "",
        image: session?.user?.image ?? null,
        profileType,
        onboardingStep: 2,
        profileCompleted: false,
        profile: {
          create: {},
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        profileType: true,
        profileCompleted: true,
        onboardingStep: true,
        plan: {
          select: {
            id: true,
            name: true,
            price: true,
            maxQuotes: true,
            whatsappSend: true,
          },
        },
        profile: {
          select: {
            phone: true,
            city: true,
            state: true,
            businessName: true,
            description: true,
            logoUrl: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Perfil guardado correctamente",
      nextStep: "/onboarding/questions",
      user: buildUserResponse(user),
    })
  } catch (error) {
    console.error("ERROR PROFILE API:", error)

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const email = await getAuthenticatedUserEmail()

    if (!email) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const body = (await req.json()) as ProfileUpdatePayload

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Payload inválido" },
        { status: 400 }
      )
    }

    const phone = normalizeOptionalString(body.phone)
    const city = normalizeOptionalString(body.city)
    const state = normalizeOptionalString(body.state)
    const businessName = normalizeOptionalString(body.businessName)
    const description = normalizeOptionalString(body.description)
    const logoUrl = normalizeOptionalUrl(body.logoUrl)

    const invalidField =
      (body.phone !== undefined && phone === null && body.phone !== null && typeof body.phone !== "string") ||
      (body.city !== undefined && city === null && body.city !== null && typeof body.city !== "string") ||
      (body.state !== undefined && state === null && body.state !== null && typeof body.state !== "string") ||
      (body.businessName !== undefined &&
        businessName === null &&
        body.businessName !== null &&
        typeof body.businessName !== "string") ||
      (body.description !== undefined &&
        description === null &&
        body.description !== null &&
        typeof body.description !== "string") ||
      (body.logoUrl !== undefined &&
        logoUrl === null &&
        body.logoUrl !== null &&
        typeof body.logoUrl !== "string")

    if (invalidField) {
      return NextResponse.json(
        { error: "Uno o más campos del perfil tienen un formato inválido" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    const updateData: {
      phone?: string | null
      city?: string | null
      state?: string | null
      businessName?: string | null
      description?: string | null
      logoUrl?: string | null
    } = {}

    if (phone !== undefined) updateData.phone = phone
    if (city !== undefined) updateData.city = city
    if (state !== undefined) updateData.state = state
    if (businessName !== undefined) updateData.businessName = businessName
    if (description !== undefined) updateData.description = description
    if (logoUrl !== undefined) updateData.logoUrl = logoUrl

    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        profile: {
          upsert: {
            update: updateData,
            create: updateData,
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        profileType: true,
        profileCompleted: true,
        onboardingStep: true,
        plan: {
          select: {
            id: true,
            name: true,
            price: true,
            maxQuotes: true,
            whatsappSend: true,
          },
        },
        profile: {
          select: {
            phone: true,
            city: true,
            state: true,
            businessName: true,
            description: true,
            logoUrl: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: "Perfil actualizado correctamente",
      user: buildUserResponse(updatedUser),
    })
  } catch (error) {
    console.error("ERROR PATCH PROFILE API:", error)

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
