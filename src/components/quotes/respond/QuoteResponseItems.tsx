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
  const classes = "h-5 w-5 text-[#2563eb]"

  if (index % 3 === 0) return <Code2 className={classes} />
  if (index % 3 === 1) return <Briefcase className={classes} />
  return <Crosshair className={classes} />
}

export function QuoteResponseItems({ items }: QuoteResponseItemsProps) {
  return (
    <section>
      <div className="grid grid-cols-[1fr_auto] border-b border-[var(--border)] px-4 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-muted)] sm:px-5">
        <p>Concepto</p>
        <p>Importe</p>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-4 sm:px-5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef3ff]">
                {getItemIcon(index)}
              </div>

              <div className="min-w-0">
                <p className="truncate text-base font-extrabold text-[var(--foreground)] sm:text-lg">
                  {item.name}
                </p>
                <p className="mt-0.5 text-sm text-[var(--text-muted)] sm:text-[15px]">
                  {item.quantity} × {formatCurrency(item.price)}
                </p>
              </div>
            </div>

            <div className="pl-3 text-right">
              <p className="text-base font-extrabold text-[var(--foreground)] sm:text-lg">
                {formatCurrency(item.total)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
