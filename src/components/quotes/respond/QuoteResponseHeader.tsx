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
    <header className="relative overflow-hidden bg-[linear-gradient(100deg,#1a3a8f_0%,#1e4fc2_60%,#1a4ab5_100%)] px-5 py-3.5 text-white">
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
            <FileText className="h-4 w-4 text-[#1a3a8f]" strokeWidth={2.2} />
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
