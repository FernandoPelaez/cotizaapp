"use client"

import { useEffect, useState } from "react"
import PlantillasCategoryCard from "@/components/dashboard/plantillas/cards/PlantillasCategoryCard"
import PlantillasHero from "@/components/dashboard/plantillas/sections/PlantillasHero"
import { templateCategories } from "@/lib/templates/template-categories"

export default function PlantillasPageView() {
  const [visible, setVisible] = useState<boolean[]>(
    new Array(templateCategories.length).fill(false)
  )

  useEffect(() => {
    setVisible(new Array(templateCategories.length).fill(false))

    const timers = templateCategories.map((_, index) =>
      window.setTimeout(() => {
        setVisible((prev) => {
          const next =
            prev.length === templateCategories.length
              ? [...prev]
              : new Array(templateCategories.length).fill(false)

          next[index] = true
          return next
        })
      }, 100 + index * 120)
    )

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  const totalTemplates = templateCategories.reduce(
    (acc, category) => acc + category.count,
    0
  )

  const totalCategories = templateCategories.length

  return (
    <div className="h-full overflow-hidden bg-[#DDE2EA]">
      <PlantillasHero
        totalTemplates={totalTemplates}
        totalCategories={totalCategories}
      />

      <section className="px-5 pb-6 pt-4 sm:px-8">
        <div className="mb-3 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#7A8499]">
          <span>Selecciona una categoría</span>
          <div className="h-px flex-1 bg-[#C8CDD8]" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {templateCategories.map((category, index) => (
            <PlantillasCategoryCard
              key={category.id}
              category={category}
              visible={visible[index]}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
