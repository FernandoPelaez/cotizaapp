"use client"

import ThemeActionBar from "@/components/dashboard/personalizar/actions/ThemeActionBar"
import ThemePreview from "@/components/dashboard/personalizar/preview/ThemePreview"
import AppearanceSection from "@/components/dashboard/personalizar/sections/AppearanceSection"
import BrandSection from "@/components/dashboard/personalizar/sections/BrandSection"
import DensitySection from "@/components/dashboard/personalizar/sections/DensitySection"
import SurfaceSection from "@/components/dashboard/personalizar/sections/SurfaceSection"
import TypographySection from "@/components/dashboard/personalizar/sections/TypographySection"
import { useThemeContext } from "@/components/providers/ThemeProvider"

export default function Personalizar() {
  const { isLoading, hasChanges } = useThemeContext()

  return (
    <div
      className="flex flex-col px-4 py-4 md:px-5 md:py-5 xl:px-6 xl:py-5"
      style={{ gap: "16px" }}
    >
      <header className="space-y-2">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1">
            
            <p
              className="max-w-2xl text-sm leading-6"
              style={{ color: "hsl(var(--text-muted))" }}
            >
              Ajusta la apariencia global del dashboard con un sistema de tema
              controlado, consistente y persistente.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <span
              className="rounded-full px-3 py-1.5 text-xs font-medium"
              style={{
                backgroundColor: "hsl(var(--primary-soft))",
                color: "hsl(var(--primary))",
              }}
            >
              Tema global
            </span>

            <span
              className="rounded-full px-3 py-1.5 text-xs font-medium"
              style={{
                backgroundColor: isLoading
                  ? "hsl(var(--background))"
                  : hasChanges
                  ? "hsl(var(--warning))"
                  : "hsl(var(--success))",
                color: isLoading ? "hsl(var(--foreground))" : "white",
                border: isLoading
                  ? "1px solid hsl(var(--border))"
                  : "none",
              }}
            >
              {isLoading
                ? "Cargando configuración"
                : hasChanges
                ? "Cambios sin guardar"
                : "Configuración al día"}
            </span>
          </div>
        </div>
      </header>

      <div className="grid items-start gap-4 2xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="min-w-0 space-y-4">
          <AppearanceSection />
          <BrandSection />
          <TypographySection />
          <SurfaceSection />
          <DensitySection />
        </div>

        <div className="min-w-0 2xl:sticky 2xl:top-4">
          <ThemePreview />
        </div>
      </div>

      <ThemeActionBar />
    </div>
  )
}