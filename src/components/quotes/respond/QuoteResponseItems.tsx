import { Briefcase, Code2, Crosshair } from "lucide-react"
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
  const classes = "h-3.5 w-3.5 text-[#2563eb]"
  if (index % 3 === 0) return <Code2 className={classes} />
  if (index % 3 === 1) return <Briefcase className={classes} />
  return <Crosshair className={classes} />
}

export function QuoteResponseItems({ items }: QuoteResponseItemsProps) {
  return (
    <section>
      <div className="grid grid-cols-[1fr_auto] border-b border-slate-100 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
        <p>Concepto</p>
        <p>Importe</p>
      </div>

      <div className="divide-y divide-slate-50">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eef3ff]">
                {getItemIcon(index)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {item.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {item.quantity} × {formatCurrency(item.price)}
                </p>
              </div>
            </div>
            <div className="pl-3 text-right">
              <p className="text-sm font-bold text-slate-900">
                {formatCurrency(item.total)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
