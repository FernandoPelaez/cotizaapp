"use client"

import PlantillasTemplatesGrid, {
  type PlantillasTemplatesGridItem,
} from "@/components/dashboard/plantillas/sections/PlantillasTemplatesGrid"
import { getTemplatesByCategory } from "@/lib/templates/template-catalog"
import { templateMap, type TemplateComponent } from "@/lib/templates"
import type { TemplateCategoryId } from "@/types/template"

type SupportedCategoria = Extract<
  TemplateCategoryId,
  "clasica" | "moderna" | "premium"
>

type UserPlan = "free" | "pro" | "premium"

type PlantillasCategoryPageViewProps = {
  categoria: string
  userPlan?: UserPlan
}

const categoryLabels: Record<SupportedCategoria, string> = {
  clasica: "Clásicas",
  moderna: "Modernas",
  premium: "Premium",
}

function isValidCategoria(value: string): value is SupportedCategoria {
  return (
    value === "clasica" || value === "moderna" || value === "premium"
  )
}

export default function PlantillasCategoryPageView({
  categoria,
  userPlan = "free",
}: PlantillasCategoryPageViewProps) {
  const normalizedCategory = (categoria ?? "").toLowerCase()

  if (!isValidCategoria(normalizedCategory)) {
    return (
      <div className="space-y-4 p-6">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Categoría no válida
        </h1>
        <p className="text-neutral-500">
          La categoría que intentas abrir no existe.
        </p>
      </div>
    )
  }

  const templates: PlantillasTemplatesGridItem[] = getTemplatesByCategory(
    normalizedCategory
  )
    .map((template) => {
      const component = templateMap[
        template.id as keyof typeof templateMap
      ] as TemplateComponent | undefined

      if (!component) return null

      return {
        ...template,
        component,
      }
    })
    .filter(
      (template): template is PlantillasTemplatesGridItem => template !== null
    )

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Plantillas {categoryLabels[normalizedCategory]}
        </h1>
        <p className="text-neutral-500">
          Selecciona una plantilla para comenzar tu cotización
        </p>
      </div>

      <PlantillasTemplatesGrid templates={templates} userPlan={userPlan} />
    </div>
  )
}
