"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  applyThemeToDocument,
  getSystemThemePreference,
  type ResolvedThemeMode,
} from "@/lib/theme/theme-apply"
import {
  buildThemeSettings,
  createDefaultThemeSettings,
  mergeThemeSettings,
} from "@/lib/theme/theme-defaults"
import { deriveThemeTokens } from "@/lib/theme/theme-derivation"
import type {
  ThemeContextValue,
  ThemeSettings,
  ThemeSettingsPayload,
} from "@/types/theme"

type ThemeProviderProps = {
  children: ReactNode
}

type ReadThemeSettingsResult = {
  settings: ThemeSettings
  unauthorized: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getApiErrorMessage(data: unknown, fallback: string) {
  if (
    data &&
    typeof data === "object" &&
    "error" in data &&
    typeof data.error === "string"
  ) {
    return data.error
  }

  return fallback
}

function isUnauthorizedStatus(status: number) {
  return status === 401 || status === 403
}

async function readThemeSettings(): Promise<ReadThemeSettingsResult> {
  const res = await fetch("/api/user/settings", {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  })

  const data = await res.json().catch(() => null)

  if (isUnauthorizedStatus(res.status)) {
    return {
      settings: createDefaultThemeSettings(),
      unauthorized: true,
    }
  }

  if (!res.ok) {
    throw new Error(
      getApiErrorMessage(
        data,
        "No se pudo cargar la configuración visual."
      )
    )
  }

  return {
    settings: buildThemeSettings((data ?? {}) as ThemeSettingsPayload),
    unauthorized: false,
  }
}

async function writeThemeSettings(
  payload: ThemeSettings
): Promise<ThemeSettings> {
  const res = await fetch("/api/user/settings", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => null)

  if (isUnauthorizedStatus(res.status)) {
    throw new Error("Debes iniciar sesión para guardar tu personalización.")
  }

  if (!res.ok) {
    throw new Error(
      getApiErrorMessage(
        data,
        "No se pudo guardar la configuración visual."
      )
    )
  }

  return buildThemeSettings((data ?? {}) as ThemeSettingsPayload)
}

function addSystemThemeListener(
  callback: (mode: ResolvedThemeMode) => void
) {
  if (typeof window === "undefined") {
    return () => {}
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

  const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
    callback(event.matches ? "dark" : "light")
  }

  handleChange(mediaQuery)

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }

  mediaQuery.addListener(handleChange)
  return () => mediaQuery.removeListener(handleChange)
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [settings, setSettings] = useState<ThemeSettings>(() =>
    createDefaultThemeSettings()
  )
  const [draft, setDraftState] = useState<ThemeSettings>(() =>
    createDefaultThemeSettings()
  )
  const [systemPreference, setSystemPreference] =
    useState<ResolvedThemeMode>("light")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    setSystemPreference(getSystemThemePreference())

    return addSystemThemeListener(setSystemPreference)
  }, [])

  useEffect(() => {
    let cancelled = false

    const loadTheme = async () => {
      try {
        const result = await readThemeSettings()

        if (cancelled) return

        setSettings(result.settings)
        setDraftState(result.settings)

        if (result.unauthorized) {
          return
        }
      } catch (error) {
        if (cancelled) return

        console.error("ThemeProvider load error:", error)

        const fallback = createDefaultThemeSettings()
        setSettings(fallback)
        setDraftState(fallback)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadTheme()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (isLoading) return

    applyThemeToDocument(settings, {
      systemPreference,
      setColorScheme: true,
    })
  }, [settings, systemPreference, isLoading])

  const appliedTokens = useMemo(() => {
    return deriveThemeTokens(settings, systemPreference)
  }, [settings, systemPreference])

  const hasChanges = useMemo(() => {
    return JSON.stringify(settings) !== JSON.stringify(draft)
  }, [settings, draft])

  const setDraft = useCallback((patch: Partial<ThemeSettings>) => {
    setDraftState((current) => mergeThemeSettings(current, patch))
  }, [])

  const resetDraft = useCallback(() => {
    setDraftState(settings)
  }, [settings])

  const saveTheme = useCallback(async () => {
    try {
      setIsSaving(true)

      const savedSettings = await writeThemeSettings(draft)

      setSettings(savedSettings)
      setDraftState(savedSettings)
    } catch (error) {
      console.error("ThemeProvider save error:", error)
      throw error
    } finally {
      setIsSaving(false)
    }
  }, [draft])

  const value = useMemo<ThemeContextValue>(
    () => ({
      settings,
      draft,
      appliedTokens,
      isLoading,
      isSaving,
      hasChanges,
      setDraft,
      resetDraft,
      saveTheme,
    }),
    [
      settings,
      draft,
      appliedTokens,
      isLoading,
      isSaving,
      hasChanges,
      setDraft,
      resetDraft,
      saveTheme,
    ]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error(
      "useThemeContext debe usarse dentro de <ThemeProvider>."
    )
  }

  return context
}
