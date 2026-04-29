"use client"

import { motion } from "framer-motion"

import PlantillasCategoryCard from "@/components/dashboard/plantillas/cards/PlantillasCategoryCard"
import PlantillasHero from "@/components/dashboard/plantillas/sections/PlantillasHero"
import { templateCategories } from "@/lib/templates/template-categories"

import {
  plantillasCardVariants,
  plantillasGridVariants,
  plantillasHeaderVariants,
  plantillasPageVariants,
} from "../animations/plantillas.motion"

export default function PlantillasPageView() {
  const totalTemplates = templateCategories.reduce(
    (acc, category) => acc + category.count,
    0
  )

  const totalCategories = templateCategories.length

  return (
    <motion.div
      className="h-full overflow-hidden bg-[#DDE2EA]"
      variants={plantillasPageVariants}
      initial="hidden"
      animate="show"
    >
      <PlantillasHero
        totalTemplates={totalTemplates}
        totalCategories={totalCategories}
      />

      <section className="px-5 pb-6 pt-4 sm:px-8">
        <motion.div
          className="mb-3 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#7A8499]"
          variants={plantillasHeaderVariants}
        >
          <span>Selecciona una categoría</span>
          <div className="h-px flex-1 bg-[#C8CDD8]" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
          variants={plantillasGridVariants}
        >
          {templateCategories.map((category) => (
            <motion.div key={category.id} variants={plantillasCardVariants}>
              <PlantillasCategoryCard category={category} visible />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  )
}
