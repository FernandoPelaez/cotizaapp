type QuoteResponsePartiesProps = {
  clientName: string
  clientPhone?: string | null
  clientEmail?: string | null
  businessName: string
  businessEmail?: string | null
}

export function QuoteResponseParties({
  clientName,
  clientPhone,
  clientEmail,
  businessName,
  businessEmail,
}: QuoteResponsePartiesProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="rounded-3xl border border-[var(--border)] bg-[var(--primary-soft)]/70 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Cliente
        </p>

        <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">
          {clientName}
        </p>

        {clientPhone && (
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Teléfono: {clientPhone}
          </p>
        )}

        {clientEmail && (
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Correo: {clientEmail}
          </p>
        )}
      </article>

      <article className="rounded-3xl border border-[var(--border)] bg-[var(--primary-soft)]/70 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Empresa o profesional
        </p>

        <p className="mt-3 text-lg font-semibold text-[var(--foreground)]">
          {businessName}
        </p>

        {businessEmail && (
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Correo: {businessEmail}
          </p>
        )}

        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Documento listo para revisión y respuesta.
        </p>
      </article>
    </div>
  )
}
