import {
  Building2,
  CalendarDays,
  Mail,
  Phone,
  UserRound,
} from "lucide-react"
import { formatDate } from "@/lib/quotes/quote-response.utils"

type QuoteResponsePartiesProps = {
  clientName: string
  clientPhone?: string | null
  clientEmail?: string | null
  businessName: string
  businessEmail?: string | null
  createdAt: Date | string
  responseExpiresAt?: Date | string | null
  variant?: "full" | "dates-only"
}

export function QuoteResponseParties({
  clientName,
  clientPhone,
  clientEmail,
  businessName,
  createdAt,
  responseExpiresAt,
  variant = "full",
}: QuoteResponsePartiesProps) {

  // Tarjeta de fechas — usada en el bloque de título
  if (variant === "dates-only") {
    return (
      <div className="shrink-0 rounded-xl border border-slate-100 bg-[#f0f4fb] p-3 min-w-[152px]">
        <div className="flex items-start gap-2">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#1a50c8]" />
          <div>
            <p className="text-[10px] text-slate-500">Fecha de emisión</p>
            <p className="text-xs font-bold text-[#1a3a7a]">{formatDate(createdAt)}</p>
            {responseExpiresAt && (
              <>
                <div className="my-1.5 h-px bg-slate-200" />
                <p className="text-[10px] text-slate-500">Disponible hasta</p>
                <p className="text-xs font-bold text-[#1a3a7a]">{formatDate(responseExpiresAt)}</p>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Bloque completo cliente + empresa — usado dentro de QuoteResponseSummary
  return (
    <div className="divide-y divide-slate-100">
      {/* Cliente */}
      <div className="flex items-start gap-2.5 py-3 first:pt-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8f0fe] text-[#1e5fd1]">
          <UserRound className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <span className="inline-block rounded bg-[#e8f0fe] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#2563eb]">
            Cliente
          </span>
          <p className="mt-1 text-sm font-bold text-slate-900">{clientName}</p>
          {clientPhone && (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <Phone className="h-3 w-3 text-[#2563eb]" />
              {clientPhone}
            </p>
          )}
          {clientEmail && (
            <p className="mt-0.5 flex items-center gap-1 break-all text-xs text-slate-500">
              <Mail className="h-3 w-3 shrink-0 text-[#2563eb]" />
              {clientEmail}
            </p>
          )}
        </div>
      </div>

      {/* Empresa */}
      <div className="flex items-start gap-2.5 py-3 last:pb-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8f0fe] text-[#1e5fd1]">
          <Building2 className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <span className="inline-block rounded bg-[#e8f0fe] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#2563eb]">
            Empresa o profesional
          </span>
          <p className="mt-1 text-sm font-bold text-slate-900">{businessName}</p>
        </div>
      </div>
    </div>
  )
}
