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
  title,
  status,
}: QuoteResponseHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-[linear-gradient(135deg,#0d47b5_0%,#0a3c9a_38%,#082f7a_100%)] px-5 py-6 text-white sm:px-8 sm:py-7">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-60px] top-[-30px] h-44 w-44 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute right-[90px] top-[-10px] h-36 w-36 rounded-full bg-[#2563eb]/25 blur-3xl" />
        <div className="absolute right-[180px] top-[10px] h-28 w-28 rotate-12 rounded-[28px] bg-white/6 blur-2xl" />
      </div>

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d7e4ff] bg-white text-[#0d47b5] shadow-[0_10px_24px_rgba(8,47,122,0.22)]">
            <FileText className="h-7 w-7" strokeWidth={2.2} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <p className="text-[1.9rem] font-extrabold leading-none tracking-tight">
                CotizaApp
              </p>

              <span className="hidden h-7 w-px bg-white/30 sm:block" />

              <p className="text-sm font-medium text-white/90 sm:text-[1.05rem]">
                Respuesta de cotización
              </p>
            </div>
          </div>
        </div>

        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur ${getStatusClasses(
            status
          )}`}
        >
          <Clock3 className="h-4 w-4" />
          {getStatusLabel(status)}
        </span>
      </div>

      <div className="relative mt-7 border-t border-white/10 pt-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#dbe8ff]">
          Cotización
        </p>

        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-[3.1rem]">
          {title}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
          Revisa el resumen y responde si aceptas o rechazas esta cotización.
        </p>
      </div>
    </header>
  )
}

