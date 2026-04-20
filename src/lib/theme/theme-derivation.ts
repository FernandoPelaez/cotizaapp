import {
  DEFAULT_RESOLVED_THEME_MODE,
  DEFAULT_THEME_SETTINGS,
} from "@/lib/theme/theme-defaults"
import {
  BRAND_COLOR_PRESETS,
  DENSITY_SCALES,
  FONT_FAMILY_STACKS,
  RADIUS_VALUES,
  SHADOW_VALUES,
} from "@/lib/theme/theme-presets"
import type {
  ThemeCssVariableMap,
  ThemeDerivedTokens,
  ThemeMode,
  ThemeSettings,
} from "@/types/theme"

type HslColor = {
  h: number
  s: number
  l: number
}

type ResolvedThemeMode = Exclude<ThemeMode, "system">

type SurfaceHslTokens = {
  background: string
  card: string
  foreground: string
  textMuted: string
  border: string
}

type SemanticHslTokens = {
  success: string
  warning: string
  error: string
}

type SurfaceTokens = Pick<
  ThemeDerivedTokens,
  "background" | "card" | "foreground" | "textMuted" | "border"
>

type SemanticTokens = Pick<
  ThemeDerivedTokens,
  "success" | "warning" | "error"
>

type BrandTokens = Pick<
  ThemeDerivedTokens,
  "primary" | "primaryHover" | "primaryLight" | "primarySoft"
>

const COTIZAAPP_PRIMARY_HEX = "#1B3D7A"
const COTIZAAPP_PRIMARY_HOVER_HEX = "#2A5298"

const FALLBACK_BRAND_HEX = COTIZAAPP_PRIMARY_HEX

const LIGHT_SURFACE_TOKENS: Record<
  ThemeSettings["cardStyle"],
  SurfaceHslTokens
> = {
  soft: {
    background: "220 23% 98%",
    card: "0 0% 100%",
    foreground: "222 47% 11%",
    textMuted: "215 16% 47%",
    border: "214 32% 91%",
  },
  solid: {
    background: "220 23% 97%",
    card: "220 20% 99%",
    foreground: "222 47% 11%",
    textMuted: "215 16% 47%",
    border: "214 28% 89%",
  },
  bordered: {
    background: "220 23% 98%",
    card: "0 0% 100%",
    foreground: "222 47% 11%",
    textMuted: "215 16% 47%",
    border: "214 24% 82%",
  },
  elevated: {
    background: "220 23% 98%",
    card: "0 0% 100%",
    foreground: "222 47% 11%",
    textMuted: "215 16% 47%",
    border: "214 28% 91%",
  },
}

const DARK_SURFACE_TOKENS: Record<
  ThemeSettings["cardStyle"],
  SurfaceHslTokens
> = {
  soft: {
    background: "222 47% 8%",
    card: "222 38% 12%",
    foreground: "210 40% 98%",
    textMuted: "215 20% 70%",
    border: "217 19% 24%",
  },
  solid: {
    background: "222 47% 8%",
    card: "222 32% 14%",
    foreground: "210 40% 98%",
    textMuted: "215 20% 70%",
    border: "217 19% 24%",
  },
  bordered: {
    background: "222 47% 8%",
    card: "222 34% 11%",
    foreground: "210 40% 98%",
    textMuted: "215 20% 70%",
    border: "217 18% 30%",
  },
  elevated: {
    background: "222 47% 8%",
    card: "222 30% 14%",
    foreground: "210 40% 98%",
    textMuted: "215 20% 70%",
    border: "217 19% 24%",
  },
}

const LIGHT_SEMANTIC_TOKENS: SemanticHslTokens = {
  success: "142 76% 36%",
  warning: "38 92% 50%",
  error: "0 84% 60%",
}

const DARK_SEMANTIC_TOKENS: SemanticHslTokens = {
  success: "142 70% 45%",
  warning: "38 96% 62%",
  error: "0 80% 64%",
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function normalizeHex(hex: string): string {
  const clean = hex.replace("#", "").trim().replace(/[^0-9a-fA-F]/g, "")

  if (clean.length === 3) {
    return clean
      .split("")
      .map((char) => char + char)
      .join("")
      .toLowerCase()
  }

  if (clean.length === 6) {
    return clean.toLowerCase()
  }

  return FALLBACK_BRAND_HEX.replace("#", "").toLowerCase()
}

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex)

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

function rgbToHsl(r: number, g: number, b: number): HslColor {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255

  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const delta = max - min

  let h = 0
  const l = (max + min) / 2
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  if (delta !== 0) {
    switch (max) {
      case rn:
        h = 60 * (((gn - bn) / delta) % 6)
        break
      case gn:
        h = 60 * ((bn - rn) / delta + 2)
        break
      case bn:
        h = 60 * ((rn - gn) / delta + 4)
        break
      default:
        h = 0
    }
  }

  if (h < 0) h += 360

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

function hexToHsl(hex: string): HslColor {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHsl(r, g, b)
}

function toHslToken(color: HslColor): string {
  return `${Math.round(color.h)} ${Math.round(color.s)}% ${Math.round(color.l)}%`
}

function toCssHsl(value: string): string {
  return `hsl(${value})`
}

function shiftLightness(color: HslColor, amount: number): HslColor {
  return {
    ...color,
    l: clamp(color.l + amount, 0, 100),
  }
}

function shiftSaturation(color: HslColor, amount: number): HslColor {
  return {
    ...color,
    s: clamp(color.s + amount, 0, 100),
  }
}

function resolveThemeMode(
  themeMode: ThemeSettings["themeMode"],
  systemPreference?: ResolvedThemeMode
): ResolvedThemeMode {
  if (themeMode === "system") {
    return systemPreference ?? DEFAULT_RESOLVED_THEME_MODE
  }

  return themeMode
}

function isDefaultCotizaBrand(brandColor: ThemeSettings["brandColor"]) {
  return brandColor === DEFAULT_THEME_SETTINGS.brandColor
}

function resolveBrandHex(brandColor: ThemeSettings["brandColor"]) {
  if (isDefaultCotizaBrand(brandColor)) {
    return COTIZAAPP_PRIMARY_HEX
  }

  const preset = BRAND_COLOR_PRESETS[brandColor]
  return preset?.hex ?? FALLBACK_BRAND_HEX
}

function createDefaultCotizaBrandTokens(
  mode: ResolvedThemeMode
): BrandTokens {
  const base = hexToHsl(COTIZAAPP_PRIMARY_HEX)

  const primaryLight =
    mode === "light"
      ? toCssHsl(
          toHslToken(shiftSaturation(shiftLightness(base, 24), -14))
        )
      : toCssHsl(
          toHslToken(shiftSaturation(shiftLightness(base, 14), -10))
        )

  const primarySoft =
    mode === "light"
      ? toCssHsl(
          toHslToken(shiftSaturation(shiftLightness(base, 34), -24))
        )
      : toCssHsl(
          toHslToken(shiftSaturation(shiftLightness(base, 20), -22))
        )

  return {
    primary: COTIZAAPP_PRIMARY_HEX,
    primaryHover: COTIZAAPP_PRIMARY_HOVER_HEX,
    primaryLight,
    primarySoft,
  }
}

function createPresetBrandTokens(
  brandHex: string,
  mode: ResolvedThemeMode
): BrandTokens {
  const base = hexToHsl(brandHex)

  const primaryHover =
    mode === "light"
      ? toCssHsl(toHslToken(shiftLightness(base, -8)))
      : toCssHsl(toHslToken(shiftLightness(base, 6)))

  const primaryLight =
    mode === "light"
      ? toCssHsl(
          toHslToken(shiftSaturation(shiftLightness(base, 24), -14))
        )
      : toCssHsl(
          toHslToken(shiftSaturation(shiftLightness(base, 14), -10))
        )

  const primarySoft =
    mode === "light"
      ? toCssHsl(
          toHslToken(shiftSaturation(shiftLightness(base, 34), -24))
        )
      : toCssHsl(
          toHslToken(shiftSaturation(shiftLightness(base, 20), -22))
        )

  return {
    primary: brandHex,
    primaryHover,
    primaryLight,
    primarySoft,
  }
}

function createBrandTokens(
  brandColor: ThemeSettings["brandColor"],
  brandHex: string,
  mode: ResolvedThemeMode
): BrandTokens {
  if (isDefaultCotizaBrand(brandColor)) {
    return createDefaultCotizaBrandTokens(mode)
  }

  return createPresetBrandTokens(brandHex, mode)
}

function createSurfaceTokens(
  mode: ResolvedThemeMode,
  cardStyle: ThemeSettings["cardStyle"]
): SurfaceTokens {
  const source =
    mode === "light"
      ? LIGHT_SURFACE_TOKENS[cardStyle]
      : DARK_SURFACE_TOKENS[cardStyle]

  return {
    background: toCssHsl(source.background),
    card: toCssHsl(source.card),
    foreground: toCssHsl(source.foreground),
    textMuted: toCssHsl(source.textMuted),
    border: toCssHsl(source.border),
  }
}

function createSemanticTokens(mode: ResolvedThemeMode): SemanticTokens {
  const source =
    mode === "light"
      ? LIGHT_SEMANTIC_TOKENS
      : DARK_SEMANTIC_TOKENS

  return {
    success: toCssHsl(source.success),
    warning: toCssHsl(source.warning),
    error: toCssHsl(source.error),
  }
}

export function deriveThemeTokens(
  settings: ThemeSettings,
  systemPreference?: ResolvedThemeMode
): ThemeDerivedTokens {
  const mode = resolveThemeMode(settings.themeMode, systemPreference)
  const brandHex = resolveBrandHex(settings.brandColor)

  const brandTokens = createBrandTokens(settings.brandColor, brandHex, mode)
  const surfaceTokens = createSurfaceTokens(mode, settings.cardStyle)
  const semanticTokens = createSemanticTokens(mode)

  return {
    mode,
    brandHex,

    primary: brandTokens.primary,
    primaryHover: brandTokens.primaryHover,
    primaryLight: brandTokens.primaryLight,
    primarySoft: brandTokens.primarySoft,

    background: surfaceTokens.background,
    card: surfaceTokens.card,
    foreground: surfaceTokens.foreground,
    textMuted: surfaceTokens.textMuted,
    border: surfaceTokens.border,

    success: semanticTokens.success,
    warning: semanticTokens.warning,
    error: semanticTokens.error,

    radius:
      RADIUS_VALUES[settings.radiusStyle] ??
      RADIUS_VALUES[DEFAULT_THEME_SETTINGS.radiusStyle],

    shadow:
      SHADOW_VALUES[settings.shadowStyle] ??
      SHADOW_VALUES[DEFAULT_THEME_SETTINGS.shadowStyle],

    fontFamily:
      FONT_FAMILY_STACKS[settings.fontFamily] ??
      FONT_FAMILY_STACKS[DEFAULT_THEME_SETTINGS.fontFamily],

    spacingScale:
      DENSITY_SCALES[settings.densityStyle] ??
      DENSITY_SCALES[DEFAULT_THEME_SETTINGS.densityStyle],
  }
}

export function createThemeCssVariables(
  tokens: ThemeDerivedTokens
): ThemeCssVariableMap {
  return {
    "--background": tokens.background,
    "--card": tokens.card,
    "--foreground": tokens.foreground,
    "--text-muted": tokens.textMuted,
    "--border": tokens.border,

    "--primary": tokens.primary,
    "--primary-hover": tokens.primaryHover,
    "--primary-light": tokens.primaryLight,
    "--primary-soft": tokens.primarySoft,

    "--success": tokens.success,
    "--warning": tokens.warning,
    "--error": tokens.error,

    "--radius": tokens.radius,
    "--shadow": tokens.shadow,
    "--font-family": tokens.fontFamily,
    "--brand-color": tokens.brandHex,

    "--section-gap": tokens.spacingScale.sectionGap,
    "--card-gap": tokens.spacingScale.cardGap,
    "--card-padding": tokens.spacingScale.cardPadding,
    "--input-height": tokens.spacingScale.inputHeight,
    "--button-height": tokens.spacingScale.buttonHeight,
  }
}

export function deriveThemeCssVariables(
  settings: ThemeSettings,
  systemPreference?: ResolvedThemeMode
): ThemeCssVariableMap {
  const tokens = deriveThemeTokens(settings, systemPreference)
  return createThemeCssVariables(tokens)
}

export function getResolvedThemeClass(
  settings: ThemeSettings,
  systemPreference?: ResolvedThemeMode
) {
  const mode = resolveThemeMode(settings.themeMode, systemPreference)
  return mode === "dark" ? "dark" : "light"
}
