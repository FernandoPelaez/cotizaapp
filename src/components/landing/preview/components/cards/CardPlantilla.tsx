"use client"

import { useState } from "react"
import { templateOptions } from "../../data/preview.data"

export default function CardPlantilla() {
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const template = templateOptions[selectedTemplate]

  return (
    <div className="space-y-4">
      <div className="text-[11px] uppercase tracking-wider text-gray-400">
        Selecciona un diseño
      </div>

      <div className="grid grid-cols-3 gap-3">
        {templateOptions.map((item, index) => {
          const isSelected = selectedTemplate === index

          return (
            <button
              key={item.nombre}
              type="button"
              onClick={() => setSelectedTemplate(index)}
              className={`overflow-hidden rounded-xl text-left transition-all duration-300 ${
                isSelected
                  ? "scale-[1.04] shadow-lg ring-2 ring-[#1B3D7A]"
                  : "ring-1 ring-gray-200 hover:scale-[1.02] hover:ring-gray-400"
              }`}
            >
              <div
                style={{ background: item.color }}
                className="flex h-10 items-center gap-1.5 px-3"
              >
                <div className="h-1.5 w-8 rounded-full bg-white/40" />
                <div className="h-1.5 w-5 rounded-full bg-white/25" />
              </div>

              <div
                style={{ background: item.acento }}
                className="space-y-1.5 px-3 py-2"
              >
                <div className="h-1.5 w-full rounded-full bg-black/10" />
                <div className="h-1.5 w-3/4 rounded-full bg-black/10" />
              </div>

              <div className="truncate bg-gray-50 px-2 py-1.5 text-[10px] font-medium text-gray-600">
                {item.nombre}
              </div>
            </button>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <div
          style={{ background: template.color }}
          className="relative flex items-center justify-between overflow-hidden px-4 py-3"
        >
          <div
            style={{
              position: "absolute",
              top: "-18px",
              right: "60px",
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: template.circulo1,
              opacity: 0.25,
            }}
          />

          <div className="relative z-10">
            <div className="text-sm font-bold text-white">
              MI EMPRESA S.A. DE C.V.
            </div>
            <div className="mt-0.5 text-xs text-white/60">
              RFC: MEP123456ABC
            </div>
          </div>

          <div className="relative z-10 text-right">
            <div className="text-xs text-white/60">Cotización</div>
            <div className="text-sm font-bold text-white">COT-047</div>
          </div>
        </div>

        <div
          style={{ background: template.acento }}
          className="flex justify-between border-b border-gray-100 px-4 py-2"
        >
          <div className="text-xs font-semibold text-gray-800">
            Constructora Norte SA
          </div>
          <div className="text-xs text-gray-400">Vigencia: 15 días</div>
        </div>

        <div className="space-y-2 bg-white px-4 py-3">
          {["Diseño de logotipo · $3,500", "Manual de marca · $2,200"].map(
            (line) => {
              const [desc, price] = line.split("·")

              return (
                <div key={line} className="flex justify-between py-0.5 text-xs">
                  <span className="text-gray-600">{desc.trim()}</span>
                  <span className="font-semibold text-gray-800">
                    {price.trim()}
                  </span>
                </div>
              )
            }
          )}

          <div className="flex items-center justify-between border-t border-gray-100 pt-2">
            <span className="text-xs font-bold text-gray-700">TOTAL</span>
            <span
              className="rounded-lg px-3 py-1 text-xs font-bold text-white"
              style={{ background: template.color }}
            >
              $8,700
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
