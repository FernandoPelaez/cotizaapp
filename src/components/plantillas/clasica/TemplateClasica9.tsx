type ServiceItem = {
  name: string
  description?: string
  price: number
}

type ProductItem = {
  name: string
  quantity: number
  price: number
}

type TemplateData = {
  title?: string
  clientName?: string
  clientEmail?: string
  companyName?: string
  date?: string
  docNumber?: string
  discount?: number
  tax?: number
  notes?: string
  services?: ServiceItem[]
  products?: ProductItem[]
  total?: number
  subtotal?: number
}

type Props = {
  data?: TemplateData
}

const defaultData: Required<
  Pick<
    TemplateData,
    "title" | "clientName" | "companyName" | "services" | "products" | "total" | "subtotal"
  >
> = {
  title: "Cotización demo",
  clientName: "Cliente ejemplo",
  companyName: "Tu Empresa",
  services: [
    { name: "Servicio 1", description: "Descripción breve del servicio", price: 500 },
    { name: "Servicio 2", description: "Descripción breve del servicio", price: 800 },
  ],
  products: [{ name: "Producto 1", quantity: 2, price: 150 }],
  total: 1600,
  subtotal: 1600,
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value)
}

export default function TemplateClasica9({ data }: Props) {
  const safeData: TemplateData = {
    ...defaultData,
    ...data,
    services: data?.services ?? defaultData.services,
    products: data?.products ?? defaultData.products,
  }

  const today =
    safeData.date ||
    new Date().toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })

  const services = safeData.services ?? []
  const products = safeData.products ?? []

  const items = [
    ...services.map((service) => ({
      type: "service" as const,
      name: service.name,
      description: service.description,
      quantity: 1,
      price: Number(service.price || 0),
    })),
    ...products.map((product) => ({
      type: "product" as const,
      name: product.name,
      description: "",
      quantity: Number(product.quantity || 0),
      price: Number(product.price || 0),
    })),
  ]

  const calculatedSubtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const subtotal = Number(safeData.subtotal ?? calculatedSubtotal)
  const tax = Number(safeData.tax ?? 0)
  const discount = Number(safeData.discount ?? 0)
  const taxAmount = subtotal * (tax / 100)
  const finalTotal = Number(safeData.total ?? subtotal + taxAmount - discount)

  return (
    <div
      style={{ width: "595px", minHeight: "842px" }}
      className="bg-[#faf8f5] font-sans text-[#3d3028] overflow-hidden rounded-2xl border border-[#eadfce]"
    >
      {/* HEADER centrado */}
      <div className="px-10 pt-10 pb-7 text-center border-b border-[#e8e0d5] bg-[#fcfbf9]">
        <p className="text-[9px] tracking-[0.45em] uppercase text-[#b99872] font-semibold mb-3">
          — Boutique —
        </p>

        <h1 className="text-4xl font-light tracking-[0.18em] text-[#3d3028] uppercase leading-tight">
          {safeData.title || "Cotización"}
        </h1>

        <p className="text-[10px] text-[#c4a882] mt-3 tracking-[0.2em] uppercase">
          {today} · {safeData.docNumber || "#COT-001"}
        </p>

        <p className="text-xs font-semibold text-[#3d3028] mt-2">
          {safeData.companyName || "Tu Empresa"}
        </p>
      </div>

      {/* CLIENTE */}
      <div className="px-10 py-6 text-center border-b border-[#e8e0d5] bg-[#faf8f5]">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c4a882] mb-2">
          Preparado con cariño para
        </p>

        <p className="text-2xl font-light text-[#3d3028] italic">
          {safeData.clientName || "Cliente ejemplo"}
        </p>

        {safeData.clientEmail ? (
          <p className="text-xs text-[#c4a882] mt-1">{safeData.clientEmail}</p>
        ) : (
          <p className="text-xs text-[#d2bca1] mt-1">Sin correo registrado</p>
        )}
      </div>

      {/* RESUMEN */}
      <div className="px-10 pt-5">
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="rounded-xl border border-[#e8e0d5] bg-white px-3 py-3">
            <p className="text-[10px] uppercase tracking-wider text-[#c4a882]">Servicios</p>
            <p className="mt-1 text-base font-medium">{services.length}</p>
          </div>
          <div className="rounded-xl border border-[#e8e0d5] bg-white px-3 py-3">
            <p className="text-[10px] uppercase tracking-wider text-[#c4a882]">Productos</p>
            <p className="mt-1 text-base font-medium">{products.length}</p>
          </div>
          <div className="rounded-xl border border-[#e8e0d5] bg-white px-3 py-3">
            <p className="text-[10px] uppercase tracking-wider text-[#c4a882]">IVA</p>
            <p className="mt-1 text-base font-medium">{tax}%</p>
          </div>
          <div className="rounded-xl border border-[#e8e0d5] bg-white px-3 py-3">
            <p className="text-[10px] uppercase tracking-wider text-[#c4a882]">Descuento</p>
            <p className="mt-1 text-sm font-medium">{formatCurrency(discount)}</p>
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div className="px-10 pt-6">
        <div className="overflow-hidden rounded-2xl border border-[#eadfce] bg-white">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#c4a882] bg-[#fcfbf9]">
                <th className="text-left px-4 py-3 text-[#c4a882] font-normal text-[11px] uppercase tracking-[0.22em]">
                  Concepto
                </th>
                <th className="text-left px-4 py-3 text-[#c4a882] font-normal text-[11px] uppercase tracking-[0.22em]">
                  Detalle
                </th>
                <th className="text-center px-4 py-3 text-[#c4a882] font-normal text-[11px] uppercase tracking-[0.22em]">
                  Cant.
                </th>
                <th className="text-right px-4 py-3 text-[#c4a882] font-normal text-[11px] uppercase tracking-[0.22em]">
                  Precio
                </th>
                <th className="text-right px-4 py-3 text-[#c4a882] font-normal text-[11px] uppercase tracking-[0.22em]">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item, i) => (
                  <tr
                    key={`${item.type}-${i}`}
                    className={`border-b border-[#efe8df] ${
                      i % 2 === 0 ? "bg-white" : "bg-[#fdfbf9]"
                    }`}
                  >
                    <td className="py-3 px-4 font-light text-[#3d3028]">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-[#8a7060]">
                      {item.description || (
                        <span className="text-[#ccb7a1]">Sin descripción</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-[#c4a882]">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-right text-[#c4a882]">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[#3d3028]">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[#c4a882]">
                    No hay conceptos agregados en esta cotización.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TOTALES */}
        <div className="flex justify-end mt-6">
          <div className="w-56 rounded-2xl border border-[#eadfce] bg-white p-5">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#c4a882] font-light">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {tax > 0 && (
                <div className="flex justify-between text-[#c4a882] font-light">
                  <span>IVA ({tax}%)</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-light">
                  <span>Descuento</span>
                  <span>− {formatCurrency(discount)}</span>
                </div>
              )}

              <div className="border-t border-[#c4a882] pt-3 mt-3 flex justify-between font-semibold text-[#3d3028] text-base">
                <span>Total</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-10 mt-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[#c4a882] mb-2">
          — Notas —
        </p>

        <div className="min-h-[72px] rounded-2xl border border-[#eadfce] bg-white px-5 py-4">
          {safeData.notes ? (
            <p className="text-sm text-[#8a7060] font-light italic whitespace-pre-line leading-6">
              {safeData.notes}
            </p>
          ) : (
            <p className="text-sm text-[#ccb7a1] font-light italic">Sin observaciones</p>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-8 px-10 pb-8 text-center">
        <p className="text-[10px] tracking-[0.32em] uppercase text-[#c4a882]">
          ✦ Gracias por elegirnos ✦
        </p>
      </div>
    </div>
  )
}
