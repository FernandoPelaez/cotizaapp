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
    <section className="grid gap-0 overflow-hidden rounded-[20px] border border-[var(--border)] bg-[#f7f9fe] shadow-[0_8px_20px_rgba(15,23,42,0.04)] lg:grid-cols-2">
      {description && (
        <article className="flex items-start gap-3 p-4 sm:p-5 lg:border-r lg:border-[var(--border)]">
          <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8efff] text-[#2563eb]">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Descripción
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground)] sm:text-[15px]">
              {description}
            </p>
          </div>
        </article>
      )}

      {notes && (
        <article className="flex items-start gap-3 p-4 sm:p-5">
          <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8efff] text-[#2563eb]">
            <Pin className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Notas
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground)] sm:text-[15px]">
              {notes}
            </p>
          </div>
        </article>
      )}
    </section>
  )
}
