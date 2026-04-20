export const THEME_MODES = ["light", "dark", "system"] as const
export type ThemeMode = (typeof THEME_MODES)[number]

export const BRAND_COLOR_KEYS = [
  "blue",
  "violet",
  "green",
  "orange",
  "pink",
  "amber",
  "graphite",
  "turquoise",
] as const
export type BrandColorKey = (typeof BRAND_COLOR_KEYS)[number]

export const FONT_FAMILIES = [
  "geist",
  "inter",
  "poppins",
  "outfit",
  "manrope",
] as const
export type FontFamily = (typeof FONT_FAMILIES)[number]

export const CARD_STYLES = [
  "soft",
  "solid",
  "bordered",
  "elevated",
] as const
export type CardStyle = (typeof CARD_STYLES)[number]

export const RADIUS_STYLES = [
  "sm",
  "md",
  "lg",
] as const
export type RadiusStyle = (typeof RADIUS_STYLES)[number]

export const SHADOW_STYLES = [
  "none",
  "soft",
  "medium",
  "strong",
] as const
export type ShadowStyle = (typeof SHADOW_STYLES)[number]

export const DENSITY_STYLES = [
  "compact",
  "comfortable",
  "spacious",
] as const
export type DensityStyle = (typeof DENSITY_STYLES)[number]

export type ThemeSettings = {
  themeMode: ThemeMode
  brandColor: BrandColorKey
  fontFamily: FontFamily
  cardStyle: CardStyle
  radiusStyle: RadiusStyle
  shadowStyle: ShadowStyle
  densityStyle: DensityStyle
}

export type ThemeSettingsDraft = ThemeSettings

export type ThemeSettingsPayload = Partial<ThemeSettings>

export type ThemeSettingsResponse = ThemeSettings & {
  id?: string
  userId?: string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type ThemeColorPreset = {
  key: BrandColorKey
  label: string
  hex: string
}

export type ThemeOption<T extends string> = {
  value: T
  label: string
  description?: string
}

export type ThemeDerivedTokens = {
  mode: Exclude<ThemeMode, "system">
  brandHex: string

  primary: string
  primaryHover: string
  primaryLight: string
  primarySoft: string

  background: string
  card: string
  foreground: string
  textMuted: string
  border: string

  success: string
  warning: string
  error: string

  radius: string
  shadow: string
  fontFamily: string

  spacingScale: {
    sectionGap: string
    cardGap: string
    cardPadding: string
    inputHeight: string
    buttonHeight: string
  }
}

export type ThemeContextValue = {
  settings: ThemeSettings
  draft: ThemeSettingsDraft
  appliedTokens: ThemeDerivedTokens | null
  isLoading: boolean
  isSaving: boolean
  hasChanges: boolean
  setDraft: (patch: Partial<ThemeSettingsDraft>) => void
  resetDraft: () => void
  saveTheme: () => Promise<void>
}

export type ThemeCssVariableMap = Record<`--${string}`, string>
