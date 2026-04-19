import type { UserConfig } from "@/types/dashboard"
import { Plus } from "lucide-react"

type DashboardHeroProps = {
  userConfig?: UserConfig
  onNuevaCotizacion?: () => void
  onExplorarPlantillas?: () => void
}

export default function DashboardHero({
  userConfig: _userConfig,
  onNuevaCotizacion,
}: DashboardHeroProps) {
  return (
    <>
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroSlideLeft {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .hero-section { animation: heroFadeIn 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .hero-text    { animation: heroFadeIn 0.55s 0.1s cubic-bezier(0.22,1,0.36,1) both; }
        .hero-btns    { animation: heroFadeIn 0.55s 0.22s cubic-bezier(0.22,1,0.36,1) both; }
        .hero-cards   { animation: heroSlideLeft 0.6s 0.18s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <section className="hero-section relative overflow-hidden rounded-2xl bg-[linear-gradient(125deg,#0f2554_0%,#1b3d7a_50%,#1e4fa8_100%)] shadow-[0_12px_40px_rgba(15,37,84,0.35)]">

        <div aria-hidden className="pointer-events-none absolute -left-16 top-1/2 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-[#1040a0]/40 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute right-[20%] top-[-60%] h-[200px] w-[200px] rounded-full bg-[#4f8ef7]/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute right-[10%] bottom-[-40%] h-[180px] w-[180px] rounded-full bg-[#a5c4ff]/10 blur-3xl" />

        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[26%] top-[8%] rotate-[-14deg] opacity-[0.12]">
            <div className="w-[100px] rounded-lg border border-white/60 bg-white/5 p-2">
              <div className="mb-1.5 flex items-center justify-between">
                <div className="h-2 w-14 rounded-full bg-white" />
                <div className="h-1.5 w-6 rounded-full bg-white/60" />
              </div>
              <div className="mb-1 h-px w-full bg-white/40" />
              <div className="space-y-1">
                <div className="flex justify-between gap-1">
                  <div className="h-1 w-12 rounded-full bg-white" />
                  <div className="h-1 w-6 rounded-full bg-white/70" />
                </div>
                <div className="flex justify-between gap-1">
                  <div className="h-1 w-10 rounded-full bg-white" />
                  <div className="h-1 w-6 rounded-full bg-white/70" />
                </div>
                <div className="flex justify-between gap-1">
                  <div className="h-1 w-8 rounded-full bg-white" />
                  <div className="h-1 w-6 rounded-full bg-white/70" />
                </div>
              </div>
              <div className="mt-2 h-3 w-full rounded-md bg-white/80" />
            </div>
          </div>

          <div className="absolute left-[40%] bottom-[6%] rotate-[10deg] opacity-[0.10]">
            <div className="w-[80px] rounded-lg border border-white/60 bg-white/5 p-1.5">
              <div className="mb-1 h-1.5 w-10 rounded-full bg-white" />
              <div className="mb-1 h-px w-full bg-white/40" />
              <div className="space-y-0.5">
                <div className="h-1 w-full rounded-full bg-white" />
                <div className="h-1 w-4/5 rounded-full bg-white/80" />
                <div className="h-1 w-3/5 rounded-full bg-white/60" />
              </div>
              <div className="mt-1.5 h-2.5 w-full rounded-md bg-white/80" />
            </div>
          </div>

          <div className="absolute left-[55%] top-[12%] rotate-[6deg] opacity-[0.09]">
            <div className="w-[72px] rounded-lg border border-white/60 bg-white/5 p-1.5">
              <div className="mb-1 h-1.5 w-9 rounded-full bg-white" />
              <div className="mb-1 h-px w-full bg-white/40" />
              <div className="space-y-0.5">
                <div className="h-1 w-full rounded-full bg-white" />
                <div className="h-1 w-3/4 rounded-full bg-white/70" />
              </div>
              <div className="mt-1.5 h-2 w-full rounded-md bg-white/80" />
            </div>
          </div>

          <div className="absolute left-[67%] bottom-[10%] rotate-[-7deg] opacity-[0.08]">
            <div className="w-[60px] rounded-lg border border-white/60 bg-white/5 p-1.5">
              <div className="mb-1 h-1 w-8 rounded-full bg-white" />
              <div className="space-y-0.5">
                <div className="h-1 w-full rounded-full bg-white" />
                <div className="h-1 w-2/3 rounded-full bg-white/70" />
              </div>
              <div className="mt-1.5 h-2 w-full rounded-md bg-white/80" />
            </div>
          </div>

          <div className="absolute left-[25%] top-0 h-full w-px rotate-[20deg] origin-top bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div className="absolute left-[48%] top-0 h-full w-px rotate-[15deg] origin-top bg-gradient-to-b from-transparent via-white/8 to-transparent" />
          <div className="absolute left-[65%] top-0 h-full w-px rotate-[10deg] origin-top bg-gradient-to-b from-transparent via-white/6 to-transparent" />
        </div>

        <div className="relative flex items-center justify-between gap-4 px-6 py-5 md:px-8 md:py-6">
          <div className="flex-1 max-w-[480px]">
            <p className="hero-text text-[13px] font-medium leading-snug text-white">
              Elige una plantilla, agrega tus datos y obtén
              <br />
              un PDF profesional listo para enviar.
            </p>

            <div className="hero-btns mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onNuevaCotizacion}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[#16346A] shadow-[0_4px_14px_rgba(255,255,255,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(255,255,255,0.35)]"
              >
                <Plus className="h-2.5 w-2.5" strokeWidth={2.5} />
                Nueva cotización
              </button>
            </div>
          </div>

          <div className="hero-cards relative ml-auto hidden h-[148px] w-[135px] shrink-0 lg:block">
            <div className="absolute left-[-20px] top-1/2 h-[118px] w-[80px] -translate-y-1/2 rotate-[-8deg] overflow-hidden rounded-xl border border-white/20 bg-white/95 p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
              <div className="inline-block rounded bg-[#1b3d7a] px-1 py-0.5 text-[5.5px] font-bold text-white">TU LOGO</div>
              <p className="mt-1 text-[6.5px] font-bold leading-none tracking-tight text-[#1b3d7a]">COTIZA…</p>
              <div className="mt-1">
                <p className="text-[4.5px] font-bold text-slate-700">Cliente:</p>
                <p className="text-[4.5px] leading-tight text-slate-500">Nombre cliente<br />Ciudad 00000</p>
              </div>
              <div className="mt-1.5 space-y-0.5">
                <div className="h-0.5 rounded-full bg-slate-200" />
                <div className="h-0.5 w-3/4 rounded-full bg-slate-200" />
                <div className="h-0.5 rounded-full bg-slate-200" />
              </div>
            </div>

            <div className="absolute right-0 top-1/2 h-[138px] w-[100px] -translate-y-1/2 overflow-hidden rounded-xl bg-white p-1.5 shadow-[0_16px_40px_rgba(1,15,50,0.35)]">
              <div className="flex items-start justify-between">
                <div className="rounded bg-[#1b3d7a] px-1 py-0.5 text-[5px] font-bold leading-none text-white">TU LOGO</div>
                <div className="text-right">
                  <p className="text-[5.5px] font-bold leading-none tracking-tight text-[#1b3d7a]">COTIZACIÓN</p>
                  <p className="mt-0.5 text-[4px] font-semibold text-slate-400">COT-001</p>
                </div>
              </div>
              <div className="mt-1.5 text-[4.5px] leading-tight">
                <p className="font-bold text-slate-700">Cliente:</p>
                <p className="text-slate-500">Nombre del cliente</p>
                <p className="text-slate-500">Ciudad, CP 00000</p>
              </div>
              <div className="mt-1 text-[4.5px] leading-tight">
                <p><span className="font-bold text-slate-700">Fecha: </span><span className="text-slate-500">17 Abril 2026</span></p>
                <p><span className="font-bold text-slate-700">Vigencia: </span><span className="text-slate-500">30 días</span></p>
              </div>
              <div className="mt-1.5 overflow-hidden rounded">
                <div className="grid grid-cols-[1.3fr_0.6fr_0.7fr_0.7fr] gap-0.5 bg-[#1b3d7a] px-1 py-0.5 text-[4px] font-bold text-white">
                  <span>Desc.</span><span>Cant.</span><span>Precio</span><span>Total</span>
                </div>
                <div className="space-y-0.5 px-1 py-0.5">
                  {[1, 2].map((row) => (
                    <div key={row} className="grid grid-cols-[1.3fr_0.6fr_0.7fr_0.7fr] items-center gap-0.5">
                      <div className="h-0.5 w-4 rounded-full bg-slate-200" />
                      <div className="h-0.5 w-2 rounded-full bg-slate-200" />
                      <div className="h-0.5 w-2.5 rounded-full bg-slate-200" />
                      <div className="h-0.5 w-2.5 rounded-full bg-slate-200" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-1 ml-auto w-[52px] space-y-0.5">
                <div className="flex items-center justify-between text-[4px]">
                  <span className="font-semibold text-slate-600">Subtotal</span>
                  <span className="font-bold text-slate-800">$0.00</span>
                </div>
                <div className="flex items-center justify-between text-[4px]">
                  <span className="font-semibold text-slate-600">IVA (16%)</span>
                  <span className="font-bold text-slate-800">$0.00</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between rounded-sm bg-[#1b3d7a] px-1 py-0.5 text-[4px] font-bold text-white">
                  <span>TOTAL</span><span>$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
