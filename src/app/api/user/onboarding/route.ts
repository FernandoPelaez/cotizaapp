import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  BillingMode,
  BusinessModel,
  DepositPolicy,
  ProfileType,
  TaxMode,
} from "@prisma/client"

type OnboardingAnswers = {
  area?: string
  cobro?: string
  anticipo?: string
  tipo?: string
  fiscal?: string
  iva?: string
}

function normalizeProfileType(value: unknown): ProfileType | null {
  if (typeof value !== "string") return null

  const normalized = value.trim().toUpperCase()

  if (normalized === "INDEPENDIENTE") return ProfileType.INDEPENDIENTE
  if (normalized === "NEGOCIO") return ProfileType.NEGOCIO

  return null
}

function mapBusinessModel(value?: string): BusinessModel | null {
  if (!value) return null

  const normalized = value.trim().toLowerCase()

  if (normalized.includes("productos físicos")) {
    return BusinessModel.PRODUCTOS
  }

  if (normalized === "servicios") {
    return BusinessModel.SERVICIOS
  }

  if (normalized.includes("productos y servicios")) {
    return BusinessModel.AMBOS
  }

  if (normalized.includes("productos digitales")) {
    return BusinessModel.PRODUCTOS
  }

  return null
}

function mapTaxMode(value?: string): TaxMode | null {
  if (!value) return null

  const normalized = value.trim().toLowerCase()

  if (normalized.includes("iva incluido")) {
    return TaxMode.IVA_INCLUIDO
  }

  if (normalized.includes("iva desglosado")) {
    return TaxMode.IVA_DESGLOSADO
  }

  if (normalized.includes("sin iva")) {
    return TaxMode.SIN_IVA
  }

  return null
}

function mapBillingMode(value?: string): BillingMode | null {
  if (!value) return null

  const normalized = value.trim().toLowerCase()

  if (normalized.includes("proyecto")) {
    return BillingMode.PROYECTO
  }

  if (normalized.includes("hora")) {
    return BillingMode.HORA
  }

  if (normalized.includes("paquete")) {
    return BillingMode.PROYECTO
  }

  return null
}

function mapDepositPolicy(value?: string): DepositPolicy | null {
  if (!value) return null

  const normalized = value.trim().toLowerCase()

  if (normalized.includes("siempre")) {
    return DepositPolicy.SIEMPRE
  }

  if (normalized.includes("a veces")) {
    return DepositPolicy.AVECES
  }

  if (normalized.includes("no")) {
    return DepositPolicy.NUNCA
  }

  return null
}

function mapHasFiscalData(value?: string): boolean | null {
  if (!value) return null

  const normalized = value.trim().toLowerCase()

  if (
    normalized.includes("sí") ||
    normalized.includes("si") ||
    normalized.includes("siempre facturo") ||
    normalized.includes("a veces facturo")
  ) {
    return true
  }

  if (
    normalized.includes("no") ||
    normalized.includes("sin factura")
  ) {
    return false
  }

  return null
}

function getOficioFromArea(value?: string): string | null {
  if (!value) return null
  return value.trim()
}

function validateAnswers(
  profileType: ProfileType,
  answers: OnboardingAnswers
): string | null {
  if (profileType === ProfileType.INDEPENDIENTE) {
    if (!answers.area || !answers.cobro || !answers.anticipo) {
      return "Faltan respuestas del perfil independiente"
    }
  }

  if (profileType === ProfileType.NEGOCIO) {
    if (!answers.tipo || !answers.fiscal || !answers.iva) {
      return "Faltan respuestas del perfil negocio"
    }
  }

  return null
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
    const answers: OnboardingAnswers = body?.answers ?? {}

    if (!profileType) {
      return NextResponse.json(
        { error: "profileType inválido" },
        { status: 400 }
      )
    }

    const validationError = validateAnswers(profileType, answers)

    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
      },
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      )
    }

    if (profileType === ProfileType.INDEPENDIENTE) {
      const updatedUser = await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          profileType,
          profileCompleted: true,
          onboardingStep: 3,
          profile: {
            upsert: {
              update: {
                oficio: getOficioFromArea(answers.area),
                billingMode: mapBillingMode(answers.cobro),
                depositPolicy: mapDepositPolicy(answers.anticipo),
              },
              create: {
                oficio: getOficioFromArea(answers.area),
                billingMode: mapBillingMode(answers.cobro),
                depositPolicy: mapDepositPolicy(answers.anticipo),
              },
            },
          },
        },
        include: {
          profile: true,
          plan: true,
        },
      })

      return NextResponse.json({
        success: true,
        message: "Onboarding completado correctamente",
        nextStep: "/dashboard",
        user: updatedUser,
      })
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        profileType,
        profileCompleted: true,
        onboardingStep: 3,
        profile: {
          upsert: {
            update: {
              businessModel: mapBusinessModel(answers.tipo),
              hasFiscalData: mapHasFiscalData(answers.fiscal),
              taxMode: mapTaxMode(answers.iva),
            },
            create: {
              businessModel: mapBusinessModel(answers.tipo),
              hasFiscalData: mapHasFiscalData(answers.fiscal),
              taxMode: mapTaxMode(answers.iva),
            },
          },
        },
      },
      include: {
        profile: true,
        plan: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Onboarding completado correctamente",
      nextStep: "/dashboard",
      user: updatedUser,
    })
  } catch (error) {
    console.error("ERROR ONBOARDING API:", error)

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
