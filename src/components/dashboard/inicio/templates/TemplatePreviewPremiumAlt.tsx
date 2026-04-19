import TemplatePreviewCard from "./TemplatePreviewCard"

const conceptos = [
  { nombre: "Diseño de interfaz", cantidad: "1", precio: "$8,500" },
  { nombre: "Desarrollo frontend", cantidad: "1", precio: "$14,000" },
]

export default function TemplatePreviewPremiumAlt() {
  return (
    <TemplatePreviewCard variant="premium">
      <div className="group h-full cursor-pointer transition-all duration-300 ease-out hover:scale-[1.06] hover:-translate-y-0.5">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#f8fffe] ring-1 ring-slate-200 transition-shadow duration-300 group-hover:shadow-2xl group-hover:ring-[#059669]/40">

          <div className="relative overflow-hidden bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#065f46] px-3 pb-3 pt-3 text-white">
            <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[#34d399]/20" />
            <div className="pointer-events-none absolute -bottom-5 right-6 h-12 w-12 rounded-full bg-[#6ee7b7]/15" />
            <div className="pointer-events-none absolute -left-5 top-1 h-14 w-14 rounded-full bg-[#fbbf24]/10" />

            <div className="relative flex items-center justify-between">
              <div>
                <div className="mb-0.5 h-0.5 w-6 rounded-full bg-gradient-to-r from-[#34d399] to-[#6ee7b7]" />
                <p className="text-[8px] font-extrabold uppercase tracking-[0.1em] text-[#6ee7b7]">Cotización</p>
                <p className="text-[5px] tracking-[0.04em] text-white/50">ALT-031 · 18 Abr 2026</p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#34d399]/40 bg-[#34d399]/15 text-[6px] font-extrabold text-[#6ee7b7]">
                TU
              </div>
            </div>

            <div className="relative mt-2 rounded-xl border border-white/10 bg-white/5 px-2 py-1.5">
              <div className="absolute left-0 top-0 h-full w-0.5 rounded-l-xl bg-gradient-to-b from-[#fbbf24] via-[#fcd34d] to-[#fbbf24]" />
              <p className="text-[5px] font-bold uppercase tracking-[0.08em] text-[#fcd34d]">Cliente</p>
              <p className="mt-0.5 text-[6.5px] font-extrabold text-white">Soluciones Nexus SA</p>
              <div className="mt-0.5 flex items-center justify-between text-[5px] text-white/50">
                <span>nexus@solutions.mx</span>
                <span>Vigencia: 15 días</span>
              </div>
            </div>
          </div>

          <div className="h-0.5 w-full bg-gradient-to-r from-[#34d399] via-[#fbbf24] to-[#059669]" />

          <div className="px-2.5 pt-2 pb-3">
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <div className="grid grid-cols-[1.75fr_0.5fr_0.85fr] bg-gradient-to-r from-[#ecfdf5] to-[#fffbeb] px-2 py-1">
                <p className="text-[5px] font-bold uppercase tracking-[0.05em] text-[#065f46]">Concepto</p>
                <p className="text-center text-[5px] font-bold uppercase tracking-[0.05em] text-[#065f46]">Cant.</p>
                <p className="text-right text-[5px] font-bold uppercase tracking-[0.05em] text-[#065f46]">Importe</p>
              </div>
              <div className="divide-y divide-slate-50 bg-white">
                {conceptos.map((concepto, i) => (
                  <div
                    key={concepto.nombre}
                    className={"grid grid-cols-[1.75fr_0.5fr_0.85fr] px-2 py-1.5 " + (i % 2 !== 0 ? "bg-emerald-50/20" : "")}
                  >
                    <p className="truncate pr-1 text-[5.5px] font-medium text-slate-700">{concepto.nombre}</p>
                    <p className="text-center text-[5.5px] text-slate-500">{concepto.cantidad}</p>
                    <p className="text-right text-[5.5px] font-semibold text-slate-800">{concepto.precio}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-b-xl bg-gradient-to-r from-[#34d399] via-[#6ee7b7] to-[#fbbf24] px-2 py-1">
                <span className="text-[5.5px] font-extrabold text-[#022c22]">Total</span>
                <span className="text-[5.5px] font-extrabold text-[#022c22]">$26,100</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </TemplatePreviewCard>
  )
}
