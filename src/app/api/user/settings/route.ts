import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import {
  BRAND_COLOR_KEYS,
  type CardStyle,
  type DensityStyle,
  type FontFamily,
  type RadiusStyle,
  type ShadowStyle,
  type ThemeMode,
} from "@/types/theme"

export const dynamic = "force-dynamic"

const DEFAULT_BRAND_COLOR = "blue"

type SessionUser = {
  id?: string | null
  email?: string | null
  name?: string | null
  image?: string | null
}

type ThemeModeDb = "CLARO" | "OSCURO" | "SISTEMA"
type FontFamilyDb = "GEIST" | "INTER" | "POPPINS" | "OUTFIT" | "MANROPE"
type CardStyleDb = "SUAVE" | "SOLIDO" | "BORDEADO" | "ELEVADO"
type RadiusStyleDb = "PEQUENO" | "MEDIO" | "GRANDE"
type ShadowStyleDb = "SIN_SOMBRA" | "SUAVE" | "MEDIA" | "MARCADA"
type DensityStyleDb = "COMPACTA" | "COMODA" | "AMPLIA"

type SettingsUpdateData = {
  confirmDelete?: boolean
  confirmPDF?: boolean
  autoSave?: boolean
  autoDownloadPDF?: boolean
  openPDFNewTab?: boolean
  notifyLimit?: boolean
  systemConfirmations?: boolean
  notes?: string
  conditions?: string
  validity?: string
  fileName?: string
  themeMode?: ThemeModeDb
  brandColor?: string
  fontFamily?: FontFamilyDb
  cardStyle?: CardStyleDb
  radiusStyle?: RadiusStyleDb
  shadowStyle?: ShadowStyleDb
  densityStyle?: DensityStyleDb
}

type BooleanSettingKey =
  | "confirmDelete"
  | "confirmPDF"
  | "autoSave"
  | "autoDownloadPDF"
  | "openPDFNewTab"
  | "notifyLimit"
  | "systemConfirmations"

type TextSettingKey = "notes" | "conditions" | "validity" | "fileName"

type EnumSettingKey =
  | "themeMode"
  | "fontFamily"
  | "cardStyle"
  | "radiusStyle"
  | "shadowStyle"
  | "densityStyle"

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status })
}

async function getUserId() {
  const session = await getServerSession(authOptions)
  const sessionUser = session?.user as SessionUser | undefined

  const sessionUserId = sessionUser?.id ?? null
  const email = sessionUser?.email?.toLowerCase().trim() ?? null

  if (!sessionUserId && !email) {
    return null
  }

  if (sessionUserId) {
    const dbUserById = await prisma.user.findUnique({
      where: { id: sessionUserId },
      select: { id: true },
    })

    if (dbUserById) {
      return dbUserById.id
    }
  }

  if (!email) {
    return null
  }

  const dbUserByEmail = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  if (dbUserByEmail) {
    return dbUserByEmail.id
  }

  const createdUser = await prisma.user.create({
    data: {
      email,
      name: sessionUser?.name || email,
      image: sessionUser?.image || "",
      password: "",
      profileCompleted: false,
      onboardingStep: 1,
    },
    select: { id: true },
  })

  return createdUser.id
}

async function getOrCreateSettings(userId: string) {
  return prisma.settings.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      brandColor: DEFAULT_BRAND_COLOR,
    },
  })
}

type SettingsRecord = Awaited<ReturnType<typeof getOrCreateSettings>>

async function parseBody(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await req.json()

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return null
    }

    return body as Record<string, unknown>
  } catch {
    return null
  }
}

function normalizeToken(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s-]+/g, "_")
}

const THEME_MODE_TO_DB: Record<string, ThemeModeDb> = {
  light: "CLARO",
  claro: "CLARO",
  dark: "OSCURO",
  oscuro: "OSCURO",
  system: "SISTEMA",
  sistema: "SISTEMA",
}

const FONT_FAMILY_TO_DB: Record<string, FontFamilyDb> = {
  geist: "GEIST",
  inter: "INTER",
  poppins: "POPPINS",
  outfit: "OUTFIT",
  manrope: "MANROPE",
}

const CARD_STYLE_TO_DB: Record<string, CardStyleDb> = {
  soft: "SUAVE",
  suave: "SUAVE",
  solid: "SOLIDO",
  solido: "SOLIDO",
  bordered: "BORDEADO",
  outlined: "BORDEADO",
  bordeado: "BORDEADO",
  elevated: "ELEVADO",
  elevado: "ELEVADO",
}

const RADIUS_STYLE_TO_DB: Record<string, RadiusStyleDb> = {
  sm: "PEQUENO",
  small: "PEQUENO",
  pequeno: "PEQUENO",
  md: "MEDIO",
  medium: "MEDIO",
  medio: "MEDIO",
  lg: "GRANDE",
  large: "GRANDE",
  grande: "GRANDE",
}

const SHADOW_STYLE_TO_DB: Record<string, ShadowStyleDb> = {
  none: "SIN_SOMBRA",
  sin_sombra: "SIN_SOMBRA",
  no_shadow: "SIN_SOMBRA",
  soft: "SUAVE",
  suave: "SUAVE",
  medium: "MEDIA",
  media: "MEDIA",
  strong: "MARCADA",
  marcada: "MARCADA",
}

const DENSITY_STYLE_TO_DB: Record<string, DensityStyleDb> = {
  compact: "COMPACTA",
  compacta: "COMPACTA",
  comfortable: "COMODA",
  comoda: "COMODA",
  spacious: "AMPLIA",
  amplia: "AMPLIA",
}

const THEME_MODE_FROM_DB: Record<string, ThemeMode> = {
  light: "light",
  claro: "light",
  dark: "dark",
  oscuro: "dark",
  system: "system",
  sistema: "system",
}

const FONT_FAMILY_FROM_DB: Record<string, FontFamily> = {
  geist: "geist",
  inter: "inter",
  poppins: "poppins",
  outfit: "outfit",
  manrope: "manrope",
}

const CARD_STYLE_FROM_DB: Record<string, CardStyle> = {
  soft: "soft",
  suave: "soft",
  solid: "solid",
  solido: "solid",
  bordered: "bordered",
  outlined: "bordered",
  bordeado: "bordered",
  elevated: "elevated",
  elevado: "elevated",
}

const RADIUS_STYLE_FROM_DB: Record<string, RadiusStyle> = {
  sm: "sm",
  small: "sm",
  pequeno: "sm",
  md: "md",
  medium: "md",
  medio: "md",
  lg: "lg",
  large: "lg",
  grande: "lg",
}

const SHADOW_STYLE_FROM_DB: Record<string, ShadowStyle> = {
  none: "none",
  sin_sombra: "none",
  no_shadow: "none",
  soft: "soft",
  suave: "soft",
  medium: "medium",
  media: "medium",
  strong: "strong",
  marcada: "strong",
}

const DENSITY_STYLE_FROM_DB: Record<string, DensityStyle> = {
  compact: "compact",
  compacta: "compact",
  comfortable: "comfortable",
  comoda: "comfortable",
  spacious: "spacious",
  amplia: "spacious",
}

const BRAND_COLOR_ALIASES: Record<string, string> = {
  blue: "blue",
  azul: "blue",
  default: "blue",
  original: "blue",
  cotizaapp: "blue",
  "#1b3d7a": "blue",
  "#2a5298": "blue",

  pink: "pink",
  rosa: "pink",

  turquoise: "turquoise",
  turquesa: "turquoise",
}

function normalizeBrandColor(value: unknown): string | null {
  if (typeof value !== "string") {
    return null
  }

  const raw = value.trim()

  if (!raw) {
    return DEFAULT_BRAND_COLOR
  }

  if ((BRAND_COLOR_KEYS as readonly string[]).includes(raw)) {
    return raw
  }

  const normalized = normalizeToken(raw)

  if ((BRAND_COLOR_KEYS as readonly string[]).includes(normalized)) {
    return normalized
  }

  return BRAND_COLOR_ALIASES[normalized] ?? null
}

function setDataValue<K extends keyof SettingsUpdateData>(
  data: SettingsUpdateData,
  key: K,
  value: SettingsUpdateData[K]
) {
  data[key] = value
}

function mapStringValue<T extends string>(
  value: string,
  map: Record<string, T>,
  fallback: T
) {
  return map[normalizeToken(value)] ?? fallback
}

function buildUpdateData(body: Record<string, unknown>) {
  const data: SettingsUpdateData = {}
  const errors: string[] = []

  const assignBoolean = (key: BooleanSettingKey) => {
    const value = body[key]

    if (typeof value === "boolean") {
      setDataValue(data, key, value)
    }
  }

  const assignText = (key: TextSettingKey) => {
    const value = body[key]

    if (typeof value === "string") {
      setDataValue(data, key, value.trim())
    }
  }

  const assignBrandColor = () => {
    if (!("brandColor" in body)) {
      return
    }

    const normalized = normalizeBrandColor(body.brandColor)

    if (!normalized) {
      errors.push("Valor inválido para brandColor")
      return
    }

    data.brandColor = normalized
  }

  const assignMappedEnum = <K extends EnumSettingKey>(
    key: K,
    map: Record<string, Exclude<SettingsUpdateData[K], undefined>>
  ) => {
    const value = body[key]

    if (typeof value !== "string") {
      return
    }

    const normalized = normalizeToken(value)
    const mapped = map[normalized]

    if (!mapped) {
      errors.push(`Valor inválido para ${key}`)
      return
    }

    setDataValue(data, key, mapped)
  }

  assignBoolean("confirmDelete")
  assignBoolean("confirmPDF")
  assignBoolean("autoSave")
  assignBoolean("autoDownloadPDF")
  assignBoolean("openPDFNewTab")
  assignBoolean("notifyLimit")
  assignBoolean("systemConfirmations")

  assignText("notes")
  assignText("conditions")
  assignText("validity")
  assignText("fileName")

  assignBrandColor()

  assignMappedEnum("themeMode", THEME_MODE_TO_DB)
  assignMappedEnum("fontFamily", FONT_FAMILY_TO_DB)
  assignMappedEnum("cardStyle", CARD_STYLE_TO_DB)
  assignMappedEnum("radiusStyle", RADIUS_STYLE_TO_DB)
  assignMappedEnum("shadowStyle", SHADOW_STYLE_TO_DB)
  assignMappedEnum("densityStyle", DENSITY_STYLE_TO_DB)

  return { data, errors }
}

function serializeSettings(settings: SettingsRecord) {
  return {
    ...settings,
    brandColor: normalizeBrandColor(settings.brandColor) ?? DEFAULT_BRAND_COLOR,
    themeMode: mapStringValue(settings.themeMode, THEME_MODE_FROM_DB, "light"),
    fontFamily: mapStringValue(
      settings.fontFamily,
      FONT_FAMILY_FROM_DB,
      "inter"
    ),
    cardStyle: mapStringValue(settings.cardStyle, CARD_STYLE_FROM_DB, "soft"),
    radiusStyle: mapStringValue(settings.radiusStyle, RADIUS_STYLE_FROM_DB, "md"),
    shadowStyle: mapStringValue(
      settings.shadowStyle,
      SHADOW_STYLE_FROM_DB,
      "soft"
    ),
    densityStyle: mapStringValue(
      settings.densityStyle,
      DENSITY_STYLE_FROM_DB,
      "comfortable"
    ),
  }
}

export async function GET() {
  try {
    const userId = await getUserId()

    if (!userId) {
      return json({ error: "No autorizado" }, 401)
    }

    const settings = await getOrCreateSettings(userId)

    return json(serializeSettings(settings), 200)
  } catch (error) {
    console.error("GET /api/user/settings error:", error)
    return json({ error: "Error interno del servidor" }, 500)
  }
}

export async function PATCH(req: Request) {
  try {
    const userId = await getUserId()

    if (!userId) {
      return json({ error: "No autorizado" }, 401)
    }

    const body = await parseBody(req)

    if (!body) {
      return json({ error: "Payload inválido" }, 400)
    }

    const { data, errors } = buildUpdateData(body)

    if (errors.length > 0) {
      return json({ error: errors[0] }, 400)
    }

    if (Object.keys(data).length === 0) {
      return json(
        { error: "No se enviaron campos válidos para actualizar" },
        400
      )
    }

    const settings = await prisma.settings.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        brandColor: DEFAULT_BRAND_COLOR,
        ...data,
      },
    })

    return json(serializeSettings(settings), 200)
  } catch (error) {
    console.error("PATCH /api/user/settings error:", error)
    return json({ error: "Error interno del servidor" }, 500)
  }
}

export async function POST(req: Request) {
  return PATCH(req)
}
