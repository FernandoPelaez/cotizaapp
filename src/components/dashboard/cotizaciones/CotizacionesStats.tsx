type CotizacionesStatsProps = {
  summary: {
    drafts: number
    pending: number
    accepted: number
    rejected: number
    expired: number
  }
}

export default function CotizacionesStats({
  summary,
}: CotizacionesStatsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          Borradores
        </p>
        <p className="mt-2 text-2xl font-bold text-neutral-900">
          {summary.drafts}
        </p>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-amber-700">
          Pendientes
        </p>
        <p className="mt-2 text-2xl font-bold text-amber-800">
          {summary.pending}
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          Aceptadas
        </p>
        <p className="mt-2 text-2xl font-bold text-emerald-800">
          {summary.accepted}
        </p>
      </div>

      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-red-700">
          Rechazadas
        </p>
        <p className="mt-2 text-2xl font-bold text-red-800">
          {summary.rejected}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
          Expiradas
        </p>
        <p className="mt-2 text-2xl font-bold text-slate-700">
          {summary.expired}
        </p>
      </div>
    </div>
  )
}
