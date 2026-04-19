import TemplatePreviewCard from "./TemplatePreviewCard"

const conceptos = [
  { nombre: "Diseño de interfaz", cantidad: "1", precio: "$8,500" },
  { nombre: "Desarrollo frontend", cantidad: "1", precio: "$14,000" },
]

export default function TemplatePreviewPro() {
  return (
    <TemplatePreviewCard variant="pro">
      <div className="group h-full cursor-pointer transition-all duration-300 ease-out hover:scale-[1.06] hover:-translate-y-0.5">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition-shadow duration-300 group-hover:shadow-2xl group-hover:ring-[#7c3aed]/40">

          <div className="relative overflow-hidden bg-gradient-to-br from-[#1e0a3c] via-[#3b0764] to-[#1d4ed8] px-3 pb-3 pt-3 text-white">
            <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#a78bfa]/20" />
            <div className="pointer-events-none absolute -bottom-5 -right-2 h-14 w-14 rounded-full bg-[#60a5fa]/20" />
            <div className="pointer-events-none absolute -left-4 bottom-0 h-12 w-12 rounded-full bg-[#fbbf24]/15" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-[8px] font-extrabold uppercase tracking-[0.08em] text-white">Cotización</p>
                <p className="text-[5.5px] text-white/60">PRO-014 · 18 Abr 2026</p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#a78bfa]/50 bg-[#a78bfa]/20 text-[6px] font-extrabold text-[#c4b5fd]">
                TU
              </div>
            </div>

            <div className="relative mt-2 rounded-xl border border-white/10 bg-white/10 px-2.5 py-2">
              <div className="absolute left-0 top-0 h-full w-0.5 rounded-l-xl bg-gradient-to-b from-[#fbbf24] to-[#f59e0b]" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[5px] font-bold uppercase tracking-[0.07em] text-[#fbbf24]">Cliente</p>
                  <p className="mt-0.5 text-[7px] font-extrabold text-white">Nova Growth Agency</p>
                  <p className="text-[5px] text-white/60">contacto@novagrowth.mx</p>
                </div>
                <div className="text-right">
                  <p className="text-[5px] font-bold uppercase tracking-[0.07em] text-[#fbbf24]">Vigencia</p>
                  <p className="mt-0.5 text-[6px] font-semibold text-white">10 días</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-0.5 w-full bg-gradient-to-r from-[#fbbf24] via-[#a78bfa] to-[#60a5fa]" />

          <div className="px-2.5 pt-2 pb-3">
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <div className="grid grid-cols-[1.8fr_0.5fr_0.8fr] bg-gradient-to-r from-[#faf5ff] to-[#eff6ff] px-2 py-1">
                <p className="text-[5px] font-bold uppercase tracking-[0.05em] text-[#7c3aed]">Servicio</p>
                <p className="text-center text-[5px] font-bold uppercase tracking-[0.05em] text-[#7c3aed]">Cant.</p>
                <p className="text-right text-[5px] font-bold uppercase tracking-[0.05em] text-[#7c3aed]">Precio</p>
              </div>
              <div className="divide-y divide-slate-50 bg-white">
                {conceptos.map((concepto, i) => (
                  <div
                    key={concepto.nombre}
                    className={`grid grid-cols-[1.8fr_0.5fr_0.8fr] px-2 py-1.5 ${
                      i % 2 !== 0 ? "bg-violet-50/30" : ""
                    }`}
                  >
                    <p className="truncate pr-1 text-[5.5px] font-medium text-slate-700">{concepto.nombre}</p>
                    <p className="text-center text-[5.5px] text-slate-500">{concepto.cantidad}</p>
                    <p className="text-right text-[5.5px] font-semibold text-slate-800">{concepto.precio}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-b-xl bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#fcd34d] px-2 py-1">
                <span className="text-[5.5px] font-extrabold text-[#1c1400]">Total</span>
                <span className="text-[5.5px] font-extrabold text-[#1c1400]">$26,100</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </TemplatePreviewCard>
  )
}
