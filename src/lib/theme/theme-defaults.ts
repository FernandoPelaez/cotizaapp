import {
  BRAND_COLOR_KEYS,
  CARD_STYLES,
  DENSITY_STYLES,
  FONT_FAMILIES,
  RADIUS_STYLES,
  SHADOW_STYLES,
  THEME_MODES,
  type ThemeMode,
  type ThemeSettings,
  type ThemeSettingsPayload,
} from "@/types/theme"

type BrandColorKey = ThemeSettings["brandColor"]
type FontFamily = ThemeSettings["fontFamily"]
type CardStyle = ThemeSettings["cardStyle"]
type RadiusStyle = ThemeSettings["radiusStyle"]
type ShadowStyle = ThemeSettings["shadowStyle"]
type DensityStyle = ThemeSettings["densityStyle"]

export const DEFAULT_RESOLVED_THEME_MODE: Exclude<ThemeMode, "system"> = "light"

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  themeMode: "light",
  brandColor: "blue",
  fontFamily: "inter",
  cardStyle: "soft",
  radiusStyle: "md",
  shadowStyle: "soft",
  densityStyle: "comfortable",
}

function isOneOf<const T extends readonly string[]>(
  value: unknown,
  options: T
): value is T[number] {
  return typeof value === "string" && options.includes(value)
}

function normalizeToken(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s-]+/g, "_")
}

const THEME_MODE_ALIASES: Record<string, ThemeMode> = {
  light: "light",
  claro: "light",
  dark: "dark",
  oscuro: "dark",
  system: "system",
  sistema: "system",
}

const BRAND_COLOR_ALIASES: Record<string, BrandColorKey> = {
  blue: "blue",
  azul: "blue",
  default: "blue",
  original: "blue",
  cotizaapp: "blue",
  brand_blue: "blue",

  pink: "pink",
  rosa: "pink",

  turquoise: "turquoise",
  turquesa: "turquoise",

  "#1b3d7a": "blue",
  "#2a5298": "blue",
}

const FONT_FAMILY_ALIASES: Record<string, FontFamily> = {
  geist: "geist",
  inter: "inter",
  poppins: "poppins",
  outfit: "outfit",
  manrope: "manrope",
}

const CARD_STYLE_ALIASES: Record<string, CardStyle> = {
  soft: "soft",
  suave: "soft",
  solid: "solid",
  solido: "solid",
  bordered: "bordered",
  bordeado: "bordered",
  outlined: "bordered",
  elevated: "elevated",
  elevado: "elevated",
}

const RADIUS_STYLE_ALIASES: Record<string, RadiusStyle> = {
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

const SHADOW_STYLE_ALIASES: Record<string, ShadowStyle> = {
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

const DENSITY_STYLE_ALIASES: Record<string, DensityStyle> = {
  compact: "compact",
  compacta: "compact",
  comfortable: "comfortable",
  comoda: "comfortable",
  spacious: "spacious",
  amplia: "spacious",
}

function resolveValue<T extends readonly string[]>(
  value: unknown,
  options: T,
  aliases: Record<string, T[number]>,
  fallback: T[number]
): T[number] {
  if (typeof value !== "string") {
    return fallback
  }

  if (isOneOf(value, options)) {
    return value
  }

  const normalized = normalizeToken(value)
  return aliases[normalized] ?? fallback
}

function resolveBrandColor(value: unknown): BrandColorKey {
  if (typeof value !== "string") {
    return DEFAULT_THEME_SETTINGS.brandColor
  }

  if (isOneOf(value, BRAND_COLOR_KEYS)) {
    return value
  }

  const normalized = normalizeToken(value)
  return BRAND_COLOR_ALIASES[normalized] ?? DEFAULT_THEME_SETTINGS.brandColor
}

export function createDefaultThemeSettings(): ThemeSettings {
  return {
    themeMode: DEFAULT_THEME_SETTINGS.themeMode,
    brandColor: DEFAULT_THEME_SETTINGS.brandColor,
    fontFamily: DEFAULT_THEME_SETTINGS.fontFamily,
    cardStyle: DEFAULT_THEME_SETTINGS.cardStyle,
    radiusStyle: DEFAULT_THEME_SETTINGS.radiusStyle,
    shadowStyle: DEFAULT_THEME_SETTINGS.shadowStyle,
    densityStyle: DEFAULT_THEME_SETTINGS.densityStyle,
  }
}

export function buildThemeSettings(
  input?: ThemeSettingsPayload | null
): ThemeSettings {
  if (!input) {
    return createDefaultThemeSettings()
  }

  return {
    themeMode: resolveValue(
      input.themeMode,
      THEME_MODES,
      THEME_MODE_ALIASES,
      DEFAULT_THEME_SETTINGS.themeMode
    ),

    brandColor: resolveBrandColor(input.brandColor),

    fontFamily: resolveValue(
      input.fontFamily,
      FONT_FAMILIES,
      FONT_FAMILY_ALIASES,
      DEFAULT_THEME_SETTINGS.fontFamily
    ),

    cardStyle: resolveValue(
      input.cardStyle,
      CARD_STYLES,
      CARD_STYLE_ALIASES,
      DEFAULT_THEME_SETTINGS.cardStyle
    ),

    radiusStyle: resolveValue(
      input.radiusStyle,
      RADIUS_STYLES,
      RADIUS_STYLE_ALIASES,
      DEFAULT_THEME_SETTINGS.radiusStyle
    ),

    shadowStyle: resolveValue(
      input.shadowStyle,
      SHADOW_STYLES,
      SHADOW_STYLE_ALIASES,
      DEFAULT_THEME_SETTINGS.shadowStyle
    ),

    densityStyle: resolveValue(
      input.densityStyle,
      DENSITY_STYLES,
      DENSITY_STYLE_ALIASES,
      DEFAULT_THEME_SETTINGS.densityStyle
    ),
  }
}

export function mergeThemeSettings(
  current: ThemeSettings,
  patch?: ThemeSettingsPayload | null
): ThemeSettings {
  return buildThemeSettings({
    ...current,
    ...(patch ?? {}),
  })
}
