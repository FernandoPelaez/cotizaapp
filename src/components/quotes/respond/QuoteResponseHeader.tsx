import {
  BriefcaseBusiness,
  Clock3,
  FileText,
} from "lucide-react"
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
    <header className="relative overflow-hidden rounded-b-[32px] bg-[linear-gradient(135deg,#0d3b8e_0%,#0b3180_35%,#0a2a73_100%)] px-6 py-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] sm:px-8 sm:py-7">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute right-24 top-6 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-44 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--primary)] shadow-md">
            <FileText className="h-8 w-8" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-3xl font-extrabold tracking-tight">
                CotizaApp
              </p>
              <span className="hidden text-white/40 sm:inline">|</span>
              <p className="text-base font-medium text-white/85 sm:text-xl">
                Respuesta de cotización
              </p>
            </div>
          </div>
        </div>

        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur ${getStatusClasses(
            status
          )}`}
        >
          <Clock3 className="h-4 w-4" />
          {getStatusLabel(status)}
        </span>
      </div>

      <div className="relative mt-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
          Cotización
        </p>

        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/85 sm:text-lg">
          Revisa los detalles y responde si aceptas o rechazas esta cotización.
        </p>
      </div>
    </header>
  )
}
