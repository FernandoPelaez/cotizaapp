import { FileText, Pin } from "lucide-react"

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
    <section className="grid gap-0 overflow-hidden rounded-[24px] border border-[var(--border)] bg-[#f7f9fe] shadow-[0_10px_24px_rgba(15,23,42,0.04)] lg:grid-cols-2">
      {description && (
        <article className="flex items-start gap-4 p-6 lg:border-r lg:border-[var(--border)]">
          <div className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e8efff] text-[#2563eb]">
            <FileText className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Descripción
            </p>
            <p className="mt-3 text-lg leading-8 text-[var(--foreground)]">
              {description}
            </p>
          </div>
        </article>
      )}

      {notes && (
        <article className="flex items-start gap-4 p-6">
          <div className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e8efff] text-[#2563eb]">
            <Pin className="h-6 w-6" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Notas
            </p>
            <p className="mt-3 text-lg leading-8 text-[var(--foreground)]">
              {notes}
            </p>
          </div>
        </article>
      )}
    </section>
  )
}
