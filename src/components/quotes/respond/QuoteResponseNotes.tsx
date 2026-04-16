type QuoteResponseNotesProps = {
  description?: string | null
  notes?: string | null
}

export function QuoteResponseNotes({
  description,
  notes,
}: QuoteResponseNotesProps) {
  if (!description && !notes) {
    return null
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {description && (
        <article className="rounded-3xl border border-[var(--border)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Descripción
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
            {description}
          </p>
        </article>
      )}

      {notes && (
        <article className="rounded-3xl border border-[var(--border)] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Notas
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
            {notes}
          </p>
        </article>
      )}
    </section>
  )
}