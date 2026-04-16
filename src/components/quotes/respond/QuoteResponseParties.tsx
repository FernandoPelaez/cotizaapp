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
    <section className="grid gap-4 lg:grid-cols-[1fr_1fr_280px]">
      <article className="rounded-[24px] border border-[var(--border)] bg-[#eef3ff] p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#dce8ff] text-[#1e5fd1]">
            <UserRound className="h-7 w-7" />
          </div>

          <div className="min-w-0">
            <p className="inline-flex rounded-md bg-[#dce8ff] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
              Cliente
            </p>

            <h2 className="mt-3 text-2xl font-extrabold text-[var(--foreground)]">
              {clientName}
            </h2>

            {clientPhone && (
              <p className="mt-3 flex items-center gap-2 text-base text-[var(--text-muted)]">
                <Phone className="h-4 w-4 text-[#2563eb]" />
                {clientPhone}
              </p>
            )}

            {clientEmail && (
              <p className="mt-2 flex items-center gap-2 break-all text-base text-[var(--text-muted)]">
                <Mail className="h-4 w-4 text-[#2563eb]" />
                {clientEmail}
              </p>
            )}
          </div>
        </div>
      </article>

      <article className="rounded-[24px] border border-[var(--border)] bg-[#eef3ff] p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#dce8ff] text-[#1e5fd1]">
            <Building2 className="h-7 w-7" />
          </div>

          <div className="min-w-0">
            <p className="inline-flex rounded-md bg-[#dce8ff] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#2563eb]">
              Empresa o profesional
            </p>

            <h2 className="mt-3 text-2xl font-extrabold text-[var(--foreground)]">
              {businessName}
            </h2>
          </div>
        </div>
      </article>

      <article className="rounded-[24px] border border-[var(--border)] bg-[#eef3ff] p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#dce8ff] text-[#1e5fd1]">
            <CalendarDays className="h-7 w-7" />
          </div>

          <div className="min-w-0">
            <p className="text-sm text-[var(--text-muted)]">Fecha de emisión</p>
            <p className="mt-1 text-2xl font-extrabold text-[var(--foreground)]">
              {formatDate(createdAt)}
            </p>

            {responseExpiresAt && (
              <>
                <div className="my-4 h-px bg-[var(--border)]" />
                <p className="text-sm text-[var(--text-muted)]">
                  Disponible hasta
                </p>
                <p className="mt-1 text-2xl font-extrabold text-[var(--foreground)]">
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
