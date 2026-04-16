import {
  formatDate,
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
  createdAt,
  responseExpiresAt,
}: QuoteResponseHeaderProps) {
  return (
    <div className="border-b border-[var(--border)] bg-gradient-to-br from-[var(--primary)] via-[var(--primary-hover)] to-[var(--primary)] px-6 py-8 text-white sm:px-8 sm:py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
            Responder cotización
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
            Revisa los detalles de esta propuesta y selecciona si deseas
            aceptarla o rechazarla.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <span
            className={`inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur ${getStatusClasses(
              status
            )}`}
          >
            {getStatusLabel(status)}
          </span>

          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur">
            <p className="font-medium">Emitida el {formatDate(createdAt)}</p>

            {responseExpiresAt && (
              <p className="mt-1 text-white/80">
                Disponible hasta el {formatDate(responseExpiresAt)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
