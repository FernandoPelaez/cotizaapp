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
}

export function QuoteResponseParties({
  clientName,
  clientPhone,
  clientEmail,
  businessName,
  createdAt,
  responseExpiresAt,
}: QuoteResponsePartiesProps) {
  return (
    <section className="grid gap-3 lg:grid-cols-[1fr_1fr_250px]">
      <article className="rounded-[20px] border border-[var(--border)] bg-[#eef3ff] p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dce8ff] text-[#1e5fd1]">
            <UserRound className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="inline-flex rounded-md bg-[#dce8ff] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
              Cliente
            </p>

            <h2 className="mt-2.5 text-xl font-extrabold text-[var(--foreground)] sm:text-[1.75rem]">
              {clientName}
            </h2>

            {clientPhone && (
              <p className="mt-2.5 flex items-center gap-2 text-sm text-[var(--text-muted)] sm:text-[15px]">
                <Phone className="h-4 w-4 text-[#2563eb]" />
                {clientPhone}
              </p>
            )}

            {clientEmail && (
              <p className="mt-1.5 flex items-center gap-2 break-all text-sm text-[var(--text-muted)] sm:text-[15px]">
                <Mail className="h-4 w-4 text-[#2563eb]" />
                {clientEmail}
              </p>
            )}
          </div>
        </div>
      </article>

      <article className="rounded-[20px] border border-[var(--border)] bg-[#eef3ff] p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dce8ff] text-[#1e5fd1]">
            <Building2 className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="inline-flex rounded-md bg-[#dce8ff] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
              Empresa o profesional
            </p>

            <h2 className="mt-2.5 text-xl font-extrabold text-[var(--foreground)] sm:text-[1.75rem]">
              {businessName}
            </h2>
          </div>
        </div>
      </article>

      <article className="rounded-[20px] border border-[var(--border)] bg-[#eef3ff] p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dce8ff] text-[#1e5fd1]">
            <CalendarDays className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-[var(--text-muted)] sm:text-sm">
              Fecha de emisión
            </p>
            <p className="mt-1 text-xl font-extrabold leading-tight text-[var(--foreground)] sm:text-[1.9rem]">
              {formatDate(createdAt)}
            </p>

            {responseExpiresAt && (
              <>
                <div className="my-3 h-px bg-[var(--border)]" />
                <p className="text-xs text-[var(--text-muted)] sm:text-sm">
                  Disponible hasta
                </p>
                <p className="mt-1 text-xl font-extrabold leading-tight text-[var(--foreground)] sm:text-[1.9rem]">
                  {formatDate(responseExpiresAt)}
                </p>
              </>
            )}
          </div>
        </div>
      </article>
    </section>
  )
}
