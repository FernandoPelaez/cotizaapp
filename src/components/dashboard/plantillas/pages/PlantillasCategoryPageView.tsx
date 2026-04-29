"use client"

import { motion } from "framer-motion"

import PlantillasTemplatesGrid, {
  type PlantillasTemplatesGridItem,
} from "@/components/dashboard/plantillas/sections/PlantillasTemplatesGrid"
import { templateMap, type TemplateComponent } from "@/lib/templates"
import { getTemplatesByCategory } from "@/lib/templates/template-catalog"
import type { TemplateCategoryId } from "@/types/template"

import {
  plantillasHeaderVariants,
  plantillasPageVariants,
} from "../animations/plantillas.motion"

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
  return value === "clasica" || value === "moderna" || value === "premium"
}

export default function PlantillasCategoryPageView({
  categoria,
  userPlan = "free",
}: PlantillasCategoryPageViewProps) {
  const normalizedCategory = (categoria ?? "").toLowerCase()

  if (!isValidCategoria(normalizedCategory)) {
    return (
      <motion.div
        className="space-y-4 p-6"
        variants={plantillasPageVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={plantillasHeaderVariants}>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Categoría no válida
          </h1>

          <p className="text-neutral-500">
            La categoría que intentas abrir no existe.
          </p>
        </motion.div>
      </motion.div>
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
    <motion.div
      className="space-y-6 p-6"
      variants={plantillasPageVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div className="space-y-1" variants={plantillasHeaderVariants}>
        <h1 className="text-2xl font-semibold text-neutral-900">
          Plantillas {categoryLabels[normalizedCategory]}
        </h1>

        <p className="text-neutral-500">
          Selecciona una plantilla para comenzar tu cotización
        </p>
      </motion.div>

      <PlantillasTemplatesGrid templates={templates} userPlan={userPlan} />
    </motion.div>
  )
}
