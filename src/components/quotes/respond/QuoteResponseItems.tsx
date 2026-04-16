import {
  Briefcase,
  Code2,
  Crosshair,
} from "lucide-react"
import { formatCurrency } from "@/lib/quotes/quote-response.utils"

type QuoteResponseItem = {
  id: string
  name: string
  quantity: number
  price: number
  total: number
}

type QuoteResponseItemsProps = {
  items: QuoteResponseItem[]
}

function getItemIcon(index: number) {
  const classes = "h-6 w-6 text-[#2563eb]"

  if (index % 3 === 0) return <Code2 className={classes} />
  if (index % 3 === 1) return <Briefcase className={classes} />
  return <Crosshair className={classes} />
}

export function QuoteResponseItems({ items }: QuoteResponseItemsProps) {
  return (
    <section>
      <div className="grid grid-cols-[1fr_auto] border-b border-[var(--border)] px-6 py-5 text-sm font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
        <p>Concepto</p>
        <p>Importe</p>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-5"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eef3ff]">
                {getItemIcon(index)}
              </div>

              <div className="min-w-0">
                <p className="truncate text-2xl font-extrabold text-[var(--foreground)]">
                  {item.name}
                </p>
                <p className="mt-1 text-xl text-[var(--text-muted)]">
                  {item.quantity} × {formatCurrency(item.price)}
                </p>
              </div>
            </div>

            <div className="pl-4 text-right">
              <p className="text-2xl font-extrabold text-[var(--foreground)]">
                {formatCurrency(item.total)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
