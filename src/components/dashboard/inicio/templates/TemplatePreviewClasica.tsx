import TemplatePreviewCard from "./TemplatePreviewCard"

const conceptos = [
  { nombre: "Diseño de interfaz", cantidad: "1", precio: "$8,500" },
  { nombre: "Desarrollo frontend", cantidad: "1", precio: "$14,000" },
]

export default function TemplatePreviewClasica() {
  return (
    <TemplatePreviewCard variant="clasica">
      <div className="group h-full cursor-pointer transition-all duration-300 ease-out hover:scale-[1.06] hover:-translate-y-0.5">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition-shadow duration-300 group-hover:shadow-2xl group-hover:ring-[#0d9488]/40">

          <div className="relative overflow-hidden bg-gradient-to-br from-[#0f2035] via-[#0f3347] to-[#0f4a4a] px-3 pb-3 pt-3 text-white">
            <div className="pointer-events-none absolute -left-5 -top-5 h-16 w-16 rounded-full bg-[#14b8a6]/30" />
            <div className="pointer-events-none absolute -bottom-6 -left-3 h-14 w-14 rounded-full bg-[#14b8a6]/20" />
            <div className="pointer-events-none absolute -right-4 -top-4 h-12 w-12 rounded-full bg-[#f472b6]/20" />

            <div className="relative flex items-center justify-between">
              <div>
                <div className="mb-0.5 h-0.5 w-6 rounded-full bg-gradient-to-r from-[#14b8a6] to-[#2dd4bf]" />
                <p className="text-[8px] font-extrabold uppercase tracking-[0.1em] text-[#2dd4bf]">Cotización</p>
                <p className="text-[5px] tracking-[0.04em] text-white/50">COT-001 · 18 Abr 2026</p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#14b8a6]/40 bg-[#14b8a6]/20 text-[6px] font-extrabold text-[#2dd4bf]">
                TU
              </div>
            </div>

            <div className="relative mt-2 rounded-xl border border-white/10 bg-white/5 px-2 py-1.5">
              <div className="absolute left-0 top-0 h-full w-0.5 rounded-l-xl bg-gradient-to-b from-[#14b8a6] via-[#2dd4bf] to-[#14b8a6]" />
              <p className="text-[5px] font-bold uppercase tracking-[0.08em] text-[#2dd4bf]">Cliente</p>
              <p className="mt-0.5 text-[6.5px] font-extrabold text-white">Studio Nova Digital</p>
              <div className="mt-0.5 flex items-center justify-between text-[5px] text-white/50">
                <span>contacto@studionova.mx</span>
                <span>Vigencia: 7 días</span>
              </div>
            </div>
          </div>

          <div className="h-0.5 w-full bg-gradient-to-r from-[#14b8a6] via-[#f472b6] to-[#818cf8]" />

          <div className="px-2.5 pt-2 pb-3">
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <div className="grid grid-cols-[1.8fr_0.5fr_0.8fr] bg-gradient-to-r from-[#f0fdfa] to-[#fdf4ff] px-2 py-1">
                <p className="text-[5px] font-bold uppercase tracking-[0.05em] text-[#0d9488]">Concepto</p>
                <p className="text-center text-[5px] font-bold uppercase tracking-[0.05em] text-[#0d9488]">Cant.</p>
                <p className="text-right text-[5px] font-bold uppercase tracking-[0.05em] text-[#0d9488]">Precio</p>
              </div>
              <div className="divide-y divide-slate-50">
                {conceptos.map((concepto, i) => (
                  <div
                    key={concepto.nombre}
                    className={"grid grid-cols-[1.8fr_0.5fr_0.8fr] px-2 py-1.5 " + (i % 2 === 0 ? "bg-white" : "bg-teal-50/20")}
                  >
                    <p className="truncate pr-2 text-[5.5px] font-medium text-slate-700">{concepto.nombre}</p>
                    <p className="text-center text-[5.5px] text-slate-500">{concepto.cantidad}</p>
                    <p className="text-right text-[5.5px] font-semibold text-slate-800">{concepto.precio}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-b-xl bg-gradient-to-r from-[#14b8a6] via-[#06b6d4] to-[#818cf8] px-2 py-1">
                <span className="text-[5.5px] font-extrabold text-white">Total</span>
                <span className="text-[5.5px] font-extrabold text-white">$26,100</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </TemplatePreviewCard>
  )
}
