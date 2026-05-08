"use client"

import type { ReactNode } from "react"
import { motion, type Variants } from "framer-motion"
import { BookOpen, ChevronRight, FileClock, PlusCircle } from "lucide-react"

type QuickActionsCardProps = {
  historialTotal?: number
  plantillasDisponibles?: number
  nuevaCotizacionDisabled?: boolean
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
  disabled?: boolean
}

const CARD_BACKGROUND = "var(--card, #ffffff)"
const CARD_BORDER =
  "color-mix(in srgb, var(--border, #d1d5db) 55%, transparent)"
const CARD_FOREGROUND = "var(--foreground, #0f172a)"
const CARD_TEXT_MUTED = "var(--text-muted, #64748b)"
const CARD_SHADOW = "var(--shadow, 0 1px 2px rgba(15, 23, 42, 0.06))"

const ACTION_DEFAULT_BG = "transparent"
const ACTION_DEFAULT_BG_HOVER = "var(--primary-soft, #eef2fa)"
const ACTION_DISABLED_BG =
  "color-mix(in srgb, var(--border, #d1d5db) 18%, transparent)"

const ACTION_ICON_BG = "var(--primary, #1b3d7a)"
const ACTION_ICON_BG_ALT =
  "color-mix(in srgb, var(--primary, #1b3d7a) 10%, transparent)"
const ACTION_ICON_BG_SUCCESS =
  "color-mix(in srgb, var(--success, #16a34a) 12%, transparent)"

const ACTION_ICON_TEXT_LIGHT = "#ffffff"
const ACTION_BRAND = "var(--primary, #1b3d7a)"
const ACTION_SUCCESS = "var(--success, #16a34a)"
const ACTION_CHEVRON = "var(--primary, #1b3d7a)"

const CARD_RADIUS = "20px"
const ACTION_RADIUS = "14px"
const ICON_RADIUS = "10px"

const QUICK_ACTIONS_EASE: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
]

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: QUICK_ACTIONS_EASE,
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: QUICK_ACTIONS_EASE,
    },
  },
}

function ActionItem({
  icon,
  title,
  subtitle,
  onClick,
  showDivider = false,
  iconBackground,
  iconColor,
  disabled = false,
}: ActionItemProps) {
  return (
    <motion.button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      variants={itemVariants}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.995 }}
      transition={{
        duration: 0.28,
        ease: QUICK_ACTIONS_EASE,
      }}
      className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left transition-all duration-200 disabled:cursor-not-allowed"
      style={{
        borderTop: showDivider ? `1px solid ${CARD_BORDER}` : "none",
        borderRadius: ACTION_RADIUS,
        background: disabled ? ACTION_DISABLED_BG : ACTION_DEFAULT_BG,
        opacity: disabled ? 0.58 : 1,
        willChange: "opacity, transform",
      }}
      onMouseEnter={(e) => {
        if (disabled) return
        e.currentTarget.style.background = ACTION_DEFAULT_BG_HOVER
      }}
      onMouseLeave={(e) => {
        if (disabled) return
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
    </motion.button>
  )
}

export default function QuickActionsCard({
  historialTotal = 0,
  plantillasDisponibles = 0,
  nuevaCotizacionDisabled = false,
  onNuevaCotizacion,
  onVerHistorial,
  onExplorarPlantillas,
}: QuickActionsCardProps) {
  return (
    <motion.article
      className="flex h-[184px] w-full flex-col p-4"
      variants={cardVariants}
      initial="hidden"
      animate="show"
      style={{
        background: CARD_BACKGROUND,
        border: `1px solid ${CARD_BORDER}`,
        boxShadow: CARD_SHADOW,
        borderRadius: CARD_RADIUS,
        willChange: "opacity, transform",
      }}
    >
      <motion.h3
        className="text-[12px] font-bold"
        variants={itemVariants}
        style={{ color: CARD_FOREGROUND }}
      >
        Acciones rápidas
      </motion.h3>

      <motion.div className="mt-2 flex-1" variants={itemVariants}>
        <ActionItem
          icon={<PlusCircle className="h-4 w-4" />}
          title="Nueva cotización"
          subtitle={
            nuevaCotizacionDisabled
              ? "Límite de prueba alcanzado"
              : "Crear desde plantilla"
          }
          onClick={onNuevaCotizacion}
          disabled={nuevaCotizacionDisabled}
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
      </motion.div>
    </motion.article>
  )
}
