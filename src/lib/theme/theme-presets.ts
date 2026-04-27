import type {
  BrandColorKey,
  CardStyle,
  DensityStyle,
  FontFamily,
  RadiusStyle,
  ShadowStyle,
  ThemeColorPreset,
  ThemeMode,
  ThemeOption,
} from "@/types/theme"

type DensityScale = {
  sectionGap: string
  cardGap: string
  cardPadding: string
  inputHeight: string
  buttonHeight: string
}

type CardStylePreset = {
  backgroundIntensity: "soft" | "solid"
  borderVisibility: "subtle" | "visible"
  recommendedShadow: ShadowStyle
}

export const BRAND_COLOR_PRESETS: Record<BrandColorKey, ThemeColorPreset> = {
  blue: {
    key: "blue",
    label: "Azul CotizaApp",
    hex: "#1b3d7a",
  },
  violet: {
    key: "violet",
    label: "Violeta profesional",
    hex: "#7F77DD",
  },
  green: {
    key: "green",
    label: "Verde corporativo",
    hex: "#1D9E75",
  },
  orange: {
    key: "orange",
    label: "Naranja enérgico",
    hex: "#D85A30",
  },
  pink: {
    key: "pink",
    label: "Rosa moderno",
    hex: "#D4537E",
  },
  amber: {
    key: "amber",
    label: "Ámbar premium",
    hex: "#BA7517",
  },
  graphite: {
    key: "graphite",
    label: "Grafito premium",
    hex: "#495266",
  },
  turquoise: {
    key: "turquoise",
    label: "Turquesa moderno",
    hex: "#1299A8",
  },
}

export const BRAND_COLOR_PRESET_LIST = Object.values(BRAND_COLOR_PRESETS)

export const THEME_MODE_OPTIONS: ThemeOption<ThemeMode>[] = [
  {
    value: "light",
    label: "Claro",
    description: "Interfaz luminosa y limpia para uso diario.",
  },
  {
    value: "dark",
    label: "Oscuro",
    description: "Reduce el brillo y da una apariencia más sobria.",
  },
  {
    value: "system",
    label: "Sistema",
    description: "Sigue automáticamente la preferencia del dispositivo.",
  },
]

export const FONT_FAMILY_OPTIONS: ThemeOption<FontFamily>[] = [
  {
    value: "geist",
    label: "Geist",
    description: "Moderna, precisa y muy limpia.",
  },
  {
    value: "inter",
    label: "Inter",
    description: "Neutra, legible y muy versátil.",
  },
  {
    value: "poppins",
    label: "Poppins",
    description: "Geométrica, amable y moderna.",
  },
  {
    value: "outfit",
    label: "Outfit",
    description: "Tecnológica, limpia y actual.",
  },
  {
    value: "manrope",
    label: "Manrope",
    description: "Minimalista, elegante y profesional.",
  },
]

export const CARD_STYLE_OPTIONS: ThemeOption<CardStyle>[] = [
  {
    value: "soft",
    label: "Suave",
    description: "Paneles ligeros con presencia discreta.",
  },
  {
    value: "solid",
    label: "Sólido",
    description: "Tarjetas con más cuerpo visual.",
  },
  {
    value: "bordered",
    label: "Bordeado",
    description: "Estructura definida por bordes más notorios.",
  },
  {
    value: "elevated",
    label: "Elevado",
    description: "Mayor sensación de profundidad y jerarquía.",
  },
]

export const RADIUS_STYLE_OPTIONS: ThemeOption<RadiusStyle>[] = [
  {
    value: "sm",
    label: "Pequeño",
    description: "Look más sobrio y compacto.",
  },
  {
    value: "md",
    label: "Medio",
    description: "Equilibrio entre suavidad y estructura.",
  },
  {
    value: "lg",
    label: "Grande",
    description: "Más redondeado y amigable visualmente.",
  },
]

export const SHADOW_STYLE_OPTIONS: ThemeOption<ShadowStyle>[] = [
  {
    value: "none",
    label: "Sin sombra",
    description: "Aspecto plano y limpio.",
  },
  {
    value: "soft",
    label: "Suave",
    description: "Profundidad ligera y elegante.",
  },
  {
    value: "medium",
    label: "Media",
    description: "Más jerarquía visual sin exagerar.",
  },
  {
    value: "strong",
    label: "Marcada",
    description: "Presencia fuerte para superficies clave.",
  },
]

export const DENSITY_STYLE_OPTIONS: ThemeOption<DensityStyle>[] = [
  {
    value: "compact",
    label: "Compacta",
    description: "Más información en menos espacio.",
  },
  {
    value: "comfortable",
    label: "Cómoda",
    description: "Balance entre respiración visual y densidad.",
  },
  {
    value: "spacious",
    label: "Amplia",
    description: "Más aire, separación y comodidad visual.",
  },
]

export const FONT_FAMILY_STACKS: Record<FontFamily, string> = {
  geist: `"Geist", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  inter: `"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  poppins: `"Poppins", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  outfit: `"Outfit", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  manrope: `"Manrope", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
}

export const RADIUS_VALUES: Record<RadiusStyle, string> = {
  sm: "10px",
  md: "14px",
  lg: "20px",
}

export const SHADOW_VALUES: Record<ShadowStyle, string> = {
  none: "none",
  soft: "0 8px 24px rgba(15, 23, 42, 0.08)",
  medium: "0 12px 32px rgba(15, 23, 42, 0.12)",
  strong: "0 18px 48px rgba(15, 23, 42, 0.18)",
}

export const DENSITY_SCALES: Record<DensityStyle, DensityScale> = {
  compact: {
    sectionGap: "16px",
    cardGap: "12px",
    cardPadding: "16px",
    inputHeight: "40px",
    buttonHeight: "40px",
  },
  comfortable: {
    sectionGap: "24px",
    cardGap: "16px",
    cardPadding: "20px",
    inputHeight: "44px",
    buttonHeight: "44px",
  },
  spacious: {
    sectionGap: "32px",
    cardGap: "20px",
    cardPadding: "24px",
    inputHeight: "48px",
    buttonHeight: "48px",
  },
}

export const CARD_STYLE_PRESETS: Record<CardStyle, CardStylePreset> = {
  soft: {
    backgroundIntensity: "soft",
    borderVisibility: "subtle",
    recommendedShadow: "soft",
  },
  solid: {
    backgroundIntensity: "solid",
    borderVisibility: "subtle",
    recommendedShadow: "soft",
  },
  bordered: {
    backgroundIntensity: "soft",
    borderVisibility: "visible",
    recommendedShadow: "none",
  },
  elevated: {
    backgroundIntensity: "solid",
    borderVisibility: "subtle",
    recommendedShadow: "medium",
  },
}
