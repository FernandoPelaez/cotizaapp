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

type ResolvedThemeMode = Exclude<ThemeMode, "system">

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

const COTIZAAPP_PRIMARY_HEX = "#1b3d7a"
const COTIZAAPP_PRIMARY_HOVER_HEX = "#2a5298"
const COTIZAAPP_PRIMARY_LIGHT_HEX = "#d1dcf5"
const COTIZAAPP_PRIMARY_SOFT_HEX = "#eef2fa"

const FALLBACK_BRAND_HEX = COTIZAAPP_PRIMARY_HEX

const LIGHT_SURFACE_TOKENS: Record<
  ThemeSettings["cardStyle"],
  SurfaceTokens
> = {
  soft: {
    background: "#e5e5e5",
    card: "#ffffff",
    foreground: "#0f172a",
    textMuted: "#64748b",
    border: "#d1d5db",
  },
  solid: {
    background: "#f1f5f9",
    card: "#ffffff",
    foreground: "#0f172a",
    textMuted: "#64748b",
    border: "#d1d5db",
  },
  bordered: {
    background: "#e5e5e5",
    card: "#ffffff",
    foreground: "#0f172a",
    textMuted: "#64748b",
    border: "#cbd5e1",
  },
  elevated: {
    background: "#f1f5f9",
    card: "#ffffff",
    foreground: "#0f172a",
    textMuted: "#64748b",
    border: "#d1d5db",
  },
}

const DARK_SURFACE_TOKENS: Record<
  ThemeSettings["cardStyle"],
  SurfaceTokens
> = {
  soft: {
    background: "#0f172a",
    card: "#1e293b",
    foreground: "#f8fafc",
    textMuted: "#94a3b8",
    border: "#334155",
  },
  solid: {
    background: "#0f172a",
    card: "#1e293b",
    foreground: "#f8fafc",
    textMuted: "#94a3b8",
    border: "#334155",
  },
  bordered: {
    background: "#0f172a",
    card: "#1e293b",
    foreground: "#f8fafc",
    textMuted: "#94a3b8",
    border: "#475569",
  },
  elevated: {
    background: "#0f172a",
    card: "#1e293b",
    foreground: "#f8fafc",
    textMuted: "#94a3b8",
    border: "#334155",
  },
}

const LIGHT_SEMANTIC_TOKENS: SemanticTokens = {
  success: "#16a34a",
  warning: "#d97706",
  error: "#dc2626",
}

const DARK_SEMANTIC_TOKENS: SemanticTokens = {
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#f87171",
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function normalizeHex(hex: string): string {
  const clean = hex.replace("#", "").trim().replace(/[^0-9a-fA-F]/g, "")

  if (clean.length === 3) {
    return `#${clean
      .split("")
      .map((char) => char + char)
      .join("")
      .toLowerCase()}`
  }

  if (clean.length === 6) {
    return `#${clean.toLowerCase()}`
  }

  return FALLBACK_BRAND_HEX
}

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex).replace("#", "")

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (value: number) =>
    clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0")

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function mixHex(fromHex: string, toHex: string, amount: number) {
  const from = hexToRgb(fromHex)
  const to = hexToRgb(toHex)
  const ratio = clamp(amount, 0, 1)

  return rgbToHex(
    from.r + (to.r - from.r) * ratio,
    from.g + (to.g - from.g) * ratio,
    from.b + (to.b - from.b) * ratio
  )
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
  return normalizeHex(preset?.hex ?? FALLBACK_BRAND_HEX)
}

function createDefaultCotizaBrandTokens(
  mode: ResolvedThemeMode
): BrandTokens {
  if (mode === "dark") {
    return {
      primary: COTIZAAPP_PRIMARY_HEX,
      primaryHover: COTIZAAPP_PRIMARY_HOVER_HEX,
      primaryLight: "rgba(255, 255, 255, 0.10)",
      primarySoft: "rgba(255, 255, 255, 0.05)",
    }
  }

  return {
    primary: COTIZAAPP_PRIMARY_HEX,
    primaryHover: COTIZAAPP_PRIMARY_HOVER_HEX,
    primaryLight: COTIZAAPP_PRIMARY_LIGHT_HEX,
    primarySoft: COTIZAAPP_PRIMARY_SOFT_HEX,
  }
}

function createPresetBrandTokens(
  brandHex: string,
  mode: ResolvedThemeMode
): BrandTokens {
  const normalized = normalizeHex(brandHex)

  if (mode === "dark") {
    return {
      primary: normalized,
      primaryHover: mixHex(normalized, "#ffffff", 0.16),
      primaryLight: mixHex(normalized, "#000000", 0.35),
      primarySoft: "rgba(255, 255, 255, 0.05)",
    }
  }

  return {
    primary: normalized,
    primaryHover: mixHex(normalized, "#000000", 0.12),
    primaryLight: mixHex(normalized, "#ffffff", 0.72),
    primarySoft: mixHex(normalized, "#ffffff", 0.9),
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
  return mode === "light"
    ? LIGHT_SURFACE_TOKENS[cardStyle]
    : DARK_SURFACE_TOKENS[cardStyle]
}

function createSemanticTokens(mode: ResolvedThemeMode): SemanticTokens {
  return mode === "light" ? LIGHT_SEMANTIC_TOKENS : DARK_SEMANTIC_TOKENS
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
