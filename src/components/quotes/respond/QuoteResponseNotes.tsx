import { FileText, Pin } from "lucide-react"

type QuoteResponseNotesProps = {
  description?: string | null
  notes?: string | null
}

export function QuoteResponseNotes({ description, notes }: QuoteResponseNotesProps) {
  if (!description && !notes) return null

  return (
    <section className="grid gap-0 overflow-hidden rounded-xl border border-slate-100 bg-[#f8f9fb] lg:grid-cols-2">
      {description && (
        <article className="flex items-start gap-2.5 p-3.5 lg:border-r lg:border-slate-100">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8efff] text-[#2563eb]">
            <FileText className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Descripción
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-700">
              {description}
            </p>
          </div>
        </article>
      )}

      {notes && (
        <article className="flex items-start gap-2.5 p-3.5">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8efff] text-[#2563eb]">
            <Pin className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Notas
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-700">
              {notes}
            </p>
          </div>
        </article>
      )}
    </section>
  )
}
