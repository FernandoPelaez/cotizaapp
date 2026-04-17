import { Clock3, FileText } from "lucide-react"
import {
  getStatusClasses,
  getStatusLabel,
} from "@/lib/quotes/quote-response.utils"

type QuoteResponseHeaderProps = {
  title: string
  status: string
  createdAt: Date | string
  responseExpiresAt?: Date | string | null
}

export function QuoteResponseHeader({ status }: QuoteResponseHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-[linear-gradient(105deg,#0c2d8e_0%,#0f3aaa_40%,#1347c8_100%)] px-5 py-3.5 text-white">

      {/* Figuras decorativas esquina derecha */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-18px] top-[-22px] h-24 w-24 rounded-full bg-white/[0.07]" />
        <div className="absolute right-[38px] top-[-30px] h-20 w-20 rounded-full bg-white/[0.05]" />
        <div className="absolute right-[10px] top-[10px] h-12 w-12 rounded-full bg-white/[0.06]" />
        <div className="absolute right-[-8px] top-[18px] h-16 w-16 rounded-full bg-[#1a55d4]/40" />
      </div>

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <FileText className="h-4 w-4 text-[#0c2d8e]" strokeWidth={2.2} />
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <p className="text-sm font-bold tracking-tight text-white">
              CotizaApp
            </p>
            <span className="h-4 w-px bg-white/30" />
            <p className="truncate text-xs font-medium text-white/80">
              Respuesta de cotización
            </p>
          </div>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(status)}`}
        >
          <Clock3 className="h-3 w-3" />
          {getStatusLabel(status)}
        </span>
      </div>
    </header>
  )
}
