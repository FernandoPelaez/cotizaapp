import type { UserConfig } from "@/types/dashboard"
import { CheckCircle2, Star, XCircle } from "lucide-react"

type PlanFreeCardProps = {
  userConfig?: UserConfig
  onUpgrade?: () => void
}

export default function PlanFreeCard({
  userConfig,
  onUpgrade,
}: PlanFreeCardProps) {
  const plan = userConfig?.plan ?? "free"
  const cotizacionesUsadas = userConfig?.cotizacionesUsadas ?? 0
  const cotizacionesMax = userConfig?.cotizacionesMax ?? 5

  const porcentajeUso =
    cotizacionesMax > 0
      ? Math.min(100, Math.round((cotizacionesUsadas / cotizacionesMax) * 100))
      : 0

  return (
    <article className="w-[270px] min-h-[420px] shrink-0 rounded-2xl bg-[linear-gradient(180deg,#062a7a_0%,#03256c_100%)] px-4 pt-4 pb-4 text-white shadow-[0_12px_30px_rgba(3,37,108,0.30)]">
      <div className="inline-flex rounded-lg bg-[#ff9800] px-2.5 py-1 text-[10px] font-extrabold text-white">
        {plan === "pro" ? "PLAN PRO" : "PLAN FREE"}
      </div>

      <h3 className="mt-3 text-[20px] font-extrabold leading-tight">
        {plan === "pro" ? "Estás en el plan Pro" : "Estás en el plan gratuito"}
      </h3>

      <p className="mt-2 text-[12px] leading-relaxed text-white/80">
        Desbloquea plantillas, cotizaciones ilimitadas y más.
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-white/80">Cotizaciones usadas</span>
          <span className="font-bold">
            {cotizacionesUsadas} / {cotizacionesMax}
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-[#1e90ff]"
            style={{ width: `${porcentajeUso}%` }}
          />
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {[
          { ok: true, label: "5 plantillas (2 disponibles)" },
          { ok: true, label: "10 cotizaciones / mes" },
          { ok: true, label: "Exportación a PDF" },
          { ok: false, label: "Cotizaciones ilimitadas" },
          { ok: false, label: "Logo y datos de empresa" },
          { ok: false, label: "10+ plantillas Pro" },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-2">
            {f.ok ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2ea8ff]" />
            ) : (
              <XCircle className="h-4 w-4 shrink-0 text-white/25" />
            )}

            <span
              className={`text-[11px] leading-tight ${
                f.ok ? "text-white/90" : "text-white/35"
              }`}
            >
              {f.label}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onUpgrade}
        className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#1447ff] px-3 py-2 text-[11px] font-bold text-white transition hover:brightness-110"
      >
        <Star className="h-3.5 w-3.5 shrink-0" />
        Mejorar a Pro — $199 MXN/mes
      </button>
    </article>
  )
}
