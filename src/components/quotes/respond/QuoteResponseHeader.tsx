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

export function QuoteResponseHeader({
  status,
}: QuoteResponseHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-[linear-gradient(135deg,#0b3ea9_0%,#0a3598_45%,#082d82_100%)] px-6 py-5 text-white sm:px-8 sm:py-5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-30px] top-[-20px] h-40 w-40 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[90px] top-[-10px] h-32 w-32 rounded-full bg-[#2563eb]/15 blur-3xl" />
        <div className="absolute right-[170px] top-0 h-28 w-28 rotate-12 rounded-[24px] bg-white/5 blur-2xl" />
      </div>

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0b3ea9] shadow-[0_8px_20px_rgba(8,45,130,0.22)]">
            <FileText className="h-6 w-6" strokeWidth={2.2} />
          </div>

          <div className="flex min-w-0 items-center gap-3">
            <p className="truncate text-[1rem] font-extrabold tracking-tight sm:text-[1.15rem]">
              CotizaApp
            </p>

            <span className="hidden h-5 w-px bg-white/30 sm:block" />

            <p className="truncate text-xs font-medium text-white/90 sm:text-[0.95rem]">
              Respuesta de cotización
            </p>
          </div>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-sm backdrop-blur sm:text-sm ${getStatusClasses(
            status
          )}`}
        >
          <Clock3 className="h-4 w-4" />
          {getStatusLabel(status)}
        </span>
      </div>
    </header>
  )
}
