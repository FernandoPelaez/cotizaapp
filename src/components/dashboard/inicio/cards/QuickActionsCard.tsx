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
  showDivider?: boolean
  iconBackground: string
  iconColor: string
}

const CARD_BACKGROUND = "var(--card, #FFFFFF)"
const CARD_BORDER = "var(--border, #E6EBF5)"
const CARD_FOREGROUND = "var(--foreground, #0F172A)"
const CARD_TEXT_MUTED = "var(--text-muted, #64748B)"
const CARD_SHADOW = "var(--shadow, 0 1px 2px rgba(15, 23, 42, 0.06))"

const ACTION_DEFAULT_BG = "transparent"
const ACTION_DEFAULT_BG_HOVER = "var(--primary-soft, #EEF2FF)"

const ACTION_ICON_BG = "var(--primary, #1B3D7A)"
const ACTION_ICON_BG_ALT = "rgba(27, 61, 122, 0.10)"
const ACTION_ICON_BG_SUCCESS = "rgba(5, 150, 105, 0.12)"

const ACTION_ICON_TEXT_LIGHT = "#FFFFFF"
const ACTION_BRAND = "var(--primary, #1B3D7A)"
const ACTION_SUCCESS = "var(--success, #059669)"
const ACTION_CHEVRON = "var(--primary, #1B3D7A)"

const CARD_RADIUS = "20px"
const ACTION_RADIUS = "14px"
const ICON_RADIUS = "10px"

function ActionItem({
  icon,
  title,
  subtitle,
  onClick,
  showDivider = false,
  iconBackground,
  iconColor,
}: ActionItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left transition-all duration-200"
      style={{
        borderTop: showDivider ? `1px solid ${CARD_BORDER}` : "none",
        borderRadius: ACTION_RADIUS,
        background: ACTION_DEFAULT_BG,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = ACTION_DEFAULT_BG_HOVER
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = ACTION_DEFAULT_BG
      }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center"
          style={{
            background: iconBackground,
            color: iconColor,
            borderRadius: ICON_RADIUS,
          }}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p
            className="truncate text-[12px] font-semibold"
            style={{ color: CARD_FOREGROUND }}
          >
            {title}
          </p>
          <p
            className="truncate text-[10px]"
            style={{ color: CARD_TEXT_MUTED }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <ChevronRight
        className="h-3.5 w-3.5 shrink-0"
        style={{ color: ACTION_CHEVRON }}
      />
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
    <article
      className="flex h-[216px] w-full flex-col p-4"
      style={{
        background: CARD_BACKGROUND,
        border: `1px solid ${CARD_BORDER}`,
        boxShadow: CARD_SHADOW,
        borderRadius: CARD_RADIUS,
      }}
    >
      <h3
        className="text-[12px] font-bold"
        style={{ color: CARD_FOREGROUND }}
      >
        Acciones rápidas
      </h3>

      <div className="mt-2 flex-1">
        <ActionItem
          icon={<PlusCircle className="h-4 w-4" />}
          title="Nueva cotización"
          subtitle="Crear desde plantilla"
          onClick={onNuevaCotizacion}
          iconBackground={ACTION_ICON_BG}
          iconColor={ACTION_ICON_TEXT_LIGHT}
        />

        <ActionItem
          icon={<FileClock className="h-4 w-4" />}
          title="Ver historial"
          subtitle={`${historialTotal} guardadas`}
          onClick={onVerHistorial}
          showDivider
          iconBackground={ACTION_ICON_BG_SUCCESS}
          iconColor={ACTION_SUCCESS}
        />

        <ActionItem
          icon={<BookOpen className="h-4 w-4" />}
          title="Explorar plantillas"
          subtitle={`${plantillasDisponibles} diseños listos para usar`}
          onClick={onExplorarPlantillas}
          showDivider
          iconBackground={ACTION_ICON_BG_ALT}
          iconColor={ACTION_BRAND}
        />
      </div>
    </article>
  )
}
