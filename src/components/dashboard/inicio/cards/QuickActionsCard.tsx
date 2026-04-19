import type { ReactNode } from "react"
import { BookOpen, ChevronRight, FileClock, PlusCircle } from "lucide-react"

type QuickActionsCardProps = {
  historialTotal?: number
  plantillasDisponibles?: number
  onNuevaCotizacion?: () => void
  onVerHistorial?: () => void
  onExplorarPlantillas?: () => void
}

type ActionItemProps = {
  icon: ReactNode
  title: string
  subtitle: string
  onClick?: () => void
}

function ActionItem({ icon, title, subtitle, onClick }: ActionItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-2 py-2 text-left transition hover:opacity-90"
    >
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff]">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold text-slate-900">
            {title}
          </p>
          <p className="truncate text-[10px] text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>

      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
    </button>
  )
}

export default function QuickActionsCard({
  historialTotal = 0,
  plantillasDisponibles = 0,
  onNuevaCotizacion,
  onVerHistorial,
  onExplorarPlantillas,
}: QuickActionsCardProps) {
  return (
    <article className="flex h-[216px] w-full flex-col rounded-2xl border border-[#e6ebf5] bg-white p-4 shadow-sm">
      <h3 className="text-[12px] font-bold text-slate-900">
        Acciones rápidas
      </h3>

      <div className="mt-2 flex-1 divide-y divide-slate-100">
        <ActionItem
          icon={<PlusCircle className="h-4 w-4 text-[#2447d5]" />}
          title="Nueva cotización"
          subtitle="Crear desde plantilla"
          onClick={onNuevaCotizacion}
        />

        <ActionItem
          icon={<FileClock className="h-4 w-4 text-emerald-600" />}
          title="Ver historial"
          subtitle={`${historialTotal} guardadas`}
          onClick={onVerHistorial}
        />

        <ActionItem
          icon={<BookOpen className="h-4 w-4 text-[#4f46e5]" />}
          title="Explorar plantillas"
          subtitle={`${plantillasDisponibles} diseños listos para usar`}
          onClick={onExplorarPlantillas}
        />
      </div>
    </article>
  )
}
