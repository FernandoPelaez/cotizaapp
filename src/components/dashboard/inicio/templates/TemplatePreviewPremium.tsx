import TemplatePreviewCard from "./TemplatePreviewCard"

const conceptos = [
  { nombre: "Diseño de interfaz", cantidad: "1", precio: "$8,500" },
  { nombre: "Desarrollo frontend", cantidad: "1", precio: "$14,000" },
]

export default function TemplatePreviewPremium() {
  return (
    <TemplatePreviewCard variant="premium">
      <div className="group h-full cursor-pointer transition-all duration-300 ease-out hover:scale-[1.06] hover:-translate-y-0.5">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#fafafa] ring-1 ring-slate-200 transition-shadow duration-300 group-hover:shadow-2xl group-hover:ring-[#d4af37]/50">

          <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a1025] to-[#0d1f1a] px-3 pb-3 pt-3 text-white">
            <div className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full bg-[#d4af37]/20" />
            <div className="pointer-events-none absolute -bottom-6 right-8 h-14 w-14 rounded-full bg-[#d4af37]/10" />
            <div className="pointer-events-none absolute -left-6 top-2 h-16 w-16 rounded-full bg-[#a855f7]/10" />

            <div className="relative flex items-center justify-between">
              <div>
                <div className="mb-0.5 h-0.5 w-6 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f5d060]" />
                <p className="text-[8px] font-extrabold uppercase tracking-[0.1em] text-[#f5d060]">Cotización</p>
                <p className="text-[5px] tracking-[0.04em] text-white/50">PRM-021 · 18 Abr 2026</p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#d4af37]/15 text-[6px] font-extrabold text-[#f5d060]">
                TU
              </div>
            </div>

            <div className="relative mt-2 rounded-xl border border-white/10 bg-white/5 px-2 py-1.5">
              <div className="absolute left-0 top-0 h-full w-0.5 rounded-l-xl bg-gradient-to-b from-[#d4af37] via-[#f5d060] to-[#d4af37]" />
              <p className="text-[5px] font-bold uppercase tracking-[0.08em] text-[#d4af37]">Cliente</p>
              <p className="mt-0.5 text-[6.5px] font-extrabold text-white">Grupo Altavista Holding</p>
              <div className="mt-0.5 flex items-center justify-between text-[5px] text-white/50">
                <span>contacto@altavista.mx</span>
                <span>Vigencia: 10 días</span>
              </div>
            </div>
          </div>

          <div className="h-0.5 w-full bg-gradient-to-r from-[#d4af37] via-[#f5d060] via-[#a855f7] to-[#0d9488]" />

          <div className="px-2.5 pt-2 pb-3">
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <div className="grid grid-cols-[1.75fr_0.5fr_0.85fr] bg-gradient-to-r from-[#fffbeb] to-[#fdf4ff] px-2 py-1">
                <p className="text-[5px] font-bold uppercase tracking-[0.05em] text-[#92400e]">Concepto</p>
                <p className="text-center text-[5px] font-bold uppercase tracking-[0.05em] text-[#92400e]">Cant.</p>
                <p className="text-right text-[5px] font-bold uppercase tracking-[0.05em] text-[#92400e]">Importe</p>
              </div>
              <div className="divide-y divide-slate-50 bg-white">
                {conceptos.map((concepto, i) => (
                  <div
                    key={concepto.nombre}
                    className={`grid grid-cols-[1.75fr_0.5fr_0.85fr] px-2 py-1.5 ${
                      i % 2 !== 0 ? "bg-amber-50/20" : ""
                    }`}
                  >
                    <p className="truncate pr-1 text-[5.5px] font-medium text-slate-700">{concepto.nombre}</p>
                    <p className="text-center text-[5.5px] text-slate-500">{concepto.cantidad}</p>
                    <p className="text-right text-[5.5px] font-semibold text-slate-800">{concepto.precio}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-b-xl bg-gradient-to-r from-[#d4af37] via-[#f5d060] to-[#fbbf24] px-2 py-1">
                <span className="text-[5.5px] font-extrabold text-[#1a0e00]">Total</span>
                <span className="text-[5.5px] font-extrabold text-[#1a0e00]">$26,100</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </TemplatePreviewCard>
  )
}
