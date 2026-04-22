"use client"

import { useEffect, useState } from "react"

type PlantillasHeroProps = {
  totalTemplates: number
  totalCategories: number
}

export default function PlantillasHero({
  totalTemplates,
  totalCategories,
}: PlantillasHeroProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#132D5E] px-6 py-6 sm:px-8 sm:py-7">
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/[0.03]" />
      <div className="absolute -bottom-10 left-[40%] h-28 w-28 rounded-full bg-white/[0.02]" />

      <div
        className={`relative z-10 flex flex-col gap-3 transition-all duration-500 ease-out sm:flex-row sm:items-center sm:justify-between ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {/* Texto izquierdo */}
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
            Biblioteca de diseños
          </div>
          <p className="max-w-sm text-[0.8rem] leading-5 text-white/50">
            Elige una categoría y personaliza tu cotización con el estilo que
            mejor represente tu negocio.
          </p>
        </div>

        {/* Stats derecha */}
        <div className="flex items-center gap-5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3">
          <div className="flex flex-col items-center">
            <span className="text-lg font-extrabold leading-none text-white">
              {totalTemplates}
            </span>
            <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-wide text-white/40">
              Plantillas
            </span>
          </div>

          <div className="h-7 w-px bg-white/10" />

          <div className="flex flex-col items-center">
            <span className="text-lg font-extrabold leading-none text-white">
              {totalCategories}
            </span>
            <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-wide text-white/40">
              Categorías
            </span>
          </div>

          <div className="h-7 w-px bg-white/10" />

          <div className="flex flex-col items-center">
            <span className="text-lg font-extrabold leading-none text-white">
              100%
            </span>
            <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-wide text-white/40">
              Personalizables
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
