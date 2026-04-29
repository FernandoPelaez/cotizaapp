"use client"

import { motion } from "framer-motion"

import TemplateCard from "@/components/dashboard/plantillas/cards/TemplateCard"
import type { TemplateComponent } from "@/lib/templates"
import type {
  TemplateCategoryAccess,
  TemplateCategoryId,
} from "@/types/template"

import {
  plantillasCardVariants,
  plantillasGridVariants,
} from "../animations/plantillas.motion"

type UserPlan = "free" | "pro" | "premium"

export type PlantillasTemplatesGridItem = {
  id: string
  name: string
  category: TemplateCategoryId
  type: TemplateCategoryAccess
  description?: string
  preview?: string
  component: TemplateComponent
}

type PlantillasTemplatesGridProps = {
  templates: PlantillasTemplatesGridItem[]
  userPlan?: UserPlan
}

export default function PlantillasTemplatesGrid({
  templates,
  userPlan = "free",
}: PlantillasTemplatesGridProps) {
  if (templates.length === 0) {
    return (
      <motion.div
        className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center"
        variants={plantillasCardVariants}
        initial="hidden"
        animate="show"
      >
        <p className="text-sm text-neutral-500">
          No hay plantillas disponibles en esta categoría.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={plantillasGridVariants}
      initial="hidden"
      animate="show"
    >
      {templates.map((template) => (
        <motion.div key={template.id} variants={plantillasCardVariants}>
          <TemplateCard template={template} userPlan={userPlan} />
        </motion.div>
      ))}
    </motion.div>
  )
}
