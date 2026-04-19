"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { Cotizacion } from "@/types/dashboard"
import { ArrowRight, FileText } from "lucide-react"

type QuoteSummaryCardProps = {
  cotizaciones?: Cotizacion[]
  onVerDetalle?: (cotizacion: Cotizacion) => void
  onVerTodo?: () => void
}

const STATUS_STYLES: Record<
  Cotizacion["estado"],
  { label: string; className: string }
> = {
  borrador: {
    label: "Borrador",
    className: "bg-violet-100 text-violet-700",
  },
  pendiente: {
    label: "Pendiente",
    className: "bg-amber-100 text-amber-700",
  },
  aprobada: {
    label: "Aceptada",
    className: "bg-emerald-100 text-emerald-700",
  },
  rechazada: {
    label: "Rechazada",
    className: "bg-rose-100 text-rose-700",
  },
  expirada: {
    label: "Expirada",
    className: "bg-orange-100 text-orange-700",
  },
}

const CHANGE_EVERY_MS = 10000
const FADE_DURATION_MS = 220

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export default function QuoteSummaryCard({
  cotizaciones = [],
  onVerDetalle,
  onVerTodo,
}: QuoteSummaryCardProps) {
  const items = useMemo(() => cotizaciones.filter(Boolean), [cotizaciones])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const transitionTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setCurrentIndex(0)
    setIsVisible(true)
  }, [items.length])

  useEffect(() => {
    if (items.length <= 1) return

    const interval = window.setInterval(() => {
      setIsVisible(false)

      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
      }

      transitionTimeoutRef.current = window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length)
        setIsVisible(true)
      }, FADE_DURATION_MS)
    }, CHANGE_EVERY_MS)

    return () => {
      window.clearInterval(interval)

      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [items.length])

  const cotizacion = items[currentIndex]

  if (!cotizacion) {
    return (
      <article className="flex h-[216px] w-full flex-col rounded-2xl border border-[#e6ebf5] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef2ff]">
            <FileText className="h-4 w-4 text-[#1b3d7a]" />
          </div>

          <button
            type="button"
            onClick={onVerTodo}
            className="inline-flex items-center gap-1 rounded-md bg-[#eef2ff] px-2 py-0.5 text-[9px] font-semibold text-[#2447d5] transition hover:bg-[#e4ebff]"
          >
            Ver todo
          </button>
        </div>

        <div className="mt-3 flex flex-1 items-center">
          <div className="w-full rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center">
            <p className="text-[11px] font-semibold text-slate-700">
              No hay cotizaciones aún
            </p>
            <p className="mt-0.5 text-[10px] text-slate-500">
              Cuando crees una, aquí aparecerá la más reciente.
            </p>
          </div>
        </div>
      </article>
    )
  }

  const status = STATUS_STYLES[cotizacion.estado]
  const animationClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-2 opacity-0"

  return (
    <article className="flex h-[216px] w-full flex-col rounded-2xl border border-[#e6ebf5] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef2ff] transition-all duration-300 ease-out [transition-delay:0ms] ${animationClass}`}
        >
          <FileText className="h-4 w-4 text-[#1b3d7a]" />
        </div>

        <button
          type="button"
          onClick={onVerTodo}
          className={`inline-flex items-center gap-1 rounded-md bg-[#eef2ff] px-2 py-0.5 text-[9px] font-semibold text-[#2447d5] transition-all duration-300 ease-out hover:bg-[#e4ebff] [transition-delay:20ms] ${animationClass}`}
        >
          Ver todo
        </button>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <div
          className={`flex items-center justify-between text-[10px] text-slate-400 transition-all duration-300 ease-out [transition-delay:40ms] ${animationClass}`}
        >
          <span className="font-medium uppercase">
            COT-{String(cotizacion.numero).padStart(3, "0")}
          </span>
          <span className="font-medium">{cotizacion.fecha}</span>
        </div>

        <h3
          className={`mt-1 line-clamp-2 text-[12px] font-bold leading-tight text-slate-900 transition-all duration-300 ease-out [transition-delay:80ms] ${animationClass}`}
        >
          {cotizacion.nombre}
        </h3>

        <p
          className={`mt-1 line-clamp-2 text-[10px] leading-relaxed text-slate-500 transition-all duration-300 ease-out [transition-delay:120ms] ${animationClass}`}
        >
          {cotizacion.descripcion ?? "Sin descripción"}
        </p>

        <div
          className={`mt-3 flex items-end justify-between gap-2 transition-all duration-300 ease-out [transition-delay:160ms] ${animationClass}`}
        >
          <p className="text-[12px] font-extrabold tracking-tight text-slate-900">
            {formatCurrency(cotizacion.monto)}
          </p>

          <span
            className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${status.className}`}
          >
            {status.label}
          </span>
        </div>

        <div
          className={`mt-auto flex items-center justify-between pt-3 transition-all duration-300 ease-out [transition-delay:200ms] ${animationClass}`}
        >
          <div className="flex items-center gap-1">
            {items.map((_, index) => (
              <span
                key={index}
                className={
                  index === currentIndex
                    ? "h-1.5 w-4 rounded-full bg-[#1f4ed8] transition-all duration-300"
                    : "h-1.5 w-2.5 rounded-full bg-slate-200 transition-all duration-300"
                }
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => onVerDetalle?.(cotizacion)}
            className="inline-flex items-center gap-1 rounded-md bg-[#eef2ff] px-2 py-0.5 text-[9px] font-semibold text-[#2447d5] transition hover:bg-[#e4ebff]"
          >
            Ver detalle
            <ArrowRight className="h-2.5 w-2.5" />
          </button>
        </div>
      </div>
    </article>
  )
}
