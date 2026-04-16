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

export function QuoteResponseItems({ items }: QuoteResponseItemsProps) {
  return (
    <div className="divide-y divide-[var(--border)]">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div className="min-w-0">
            <p className="text-base font-semibold text-[var(--foreground)]">
              {item.name}
            </p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {item.quantity} × {formatCurrency(item.price)}
            </p>
          </div>

          <div className="shrink-0">
            <p className="text-base font-bold text-[var(--foreground)]">
              {formatCurrency(item.total)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
