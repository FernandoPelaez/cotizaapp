import {
  createThemeCssVariables,
  deriveThemeTokens,
} from "@/lib/theme/theme-derivation"
import type {
  ThemeCssVariableMap,
  ThemeDerivedTokens,
  ThemeSettings,
} from "@/types/theme"

export type ResolvedThemeMode = "light" | "dark"

export type ApplyThemeOptions = {
  root?: HTMLElement | null
  systemPreference?: ResolvedThemeMode
  setColorScheme?: boolean
}

function canUseDOM() {
  return typeof window !== "undefined" && typeof document !== "undefined"
}

export function getSystemThemePreference(): ResolvedThemeMode {
  if (!canUseDOM()) {
    return "light"
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function resolveAppliedThemeMode(
  settings: ThemeSettings,
  systemPreference?: ResolvedThemeMode
): ResolvedThemeMode {
  if (settings.themeMode === "system") {
    return systemPreference ?? getSystemThemePreference()
  }

  return settings.themeMode
}

export function applyCssVariables(
  root: HTMLElement,
  variables: ThemeCssVariableMap
) {
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

export function applyResolvedThemeClass(
  root: HTMLElement,
  mode: ResolvedThemeMode
) {
  root.classList.remove("light", "dark")
  root.classList.add(mode)
  root.dataset.theme = mode
}

export function applyColorScheme(
  root: HTMLElement,
  mode: ResolvedThemeMode
) {
  root.style.colorScheme = mode
}

export function buildAppliedTheme(
  settings: ThemeSettings,
  systemPreference?: ResolvedThemeMode
): {
  mode: ResolvedThemeMode
  tokens: ThemeDerivedTokens
  variables: ThemeCssVariableMap
} {
  const mode = resolveAppliedThemeMode(settings, systemPreference)
  const tokens = deriveThemeTokens(settings, mode)
  const variables = createThemeCssVariables(tokens)

  return {
    mode,
    tokens,
    variables,
  }
}

export function applyThemeToElement(
  settings: ThemeSettings,
  options?: ApplyThemeOptions
) {
  const root = options?.root ?? null

  if (!root) {
    return null
  }

  const { mode, tokens, variables } = buildAppliedTheme(
    settings,
    options?.systemPreference
  )

  applyCssVariables(root, variables)
  applyResolvedThemeClass(root, mode)

  if (options?.setColorScheme !== false) {
    applyColorScheme(root, mode)
  }

  return {
    mode,
    tokens,
    variables,
  }
}

export function applyThemeToDocument(
  settings: ThemeSettings,
  options?: Omit<ApplyThemeOptions, "root">
) {
  if (!canUseDOM()) {
    return null
  }

  return applyThemeToElement(settings, {
    ...options,
    root: document.documentElement,
  })
}

export function clearThemeFromElement(root: HTMLElement) {
  const keys = [
    "--background",
    "--card",
    "--foreground",
    "--text-muted",
    "--border",
    "--primary",
    "--primary-hover",
    "--primary-light",
    "--primary-soft",
    "--success",
    "--warning",
    "--error",
    "--radius",
    "--shadow",
    "--font-family",
    "--brand-color",
    "--section-gap",
    "--card-gap",
    "--card-padding",
    "--input-height",
    "--button-height",
  ] as const

  keys.forEach((key) => {
    root.style.removeProperty(key)
  })

  root.classList.remove("light", "dark")
  delete root.dataset.theme
  root.style.removeProperty("color-scheme")
}

export function clearThemeFromDocument() {
  if (!canUseDOM()) {
    return
  }

  clearThemeFromElement(document.documentElement)
}
