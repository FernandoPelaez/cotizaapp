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
  companyLogo?: string
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

export default function TemplateClasica5({ data }: Props) {
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
      className="bg-white font-sans text-[#2d1f4e] rounded-2xl overflow-hidden border border-[#ede9fe]"
    >
      {/* HEADER */}
      <div className="px-10 pt-8 pb-6 bg-gradient-to-r from-[#faf5ff] via-[#f5f3ff] to-[#ede9fe] border-b border-[#e9d5ff]">
        <div className="flex justify-between items-start gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8b5cf6] font-bold mb-2">
              Bienestar & Belleza
            </p>

            <h1 className="text-3xl font-bold text-[#6d28d9] leading-tight">
              {safeData.title || "Cotización"}
            </h1>

            <p className="text-sm text-[#8b5cf6] mt-2">
              Propuesta personalizada para tus servicios o productos
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="font-bold text-[#6d28d9] text-sm">
              {safeData.companyName || "Tu Empresa"}
            </p>
            <p className="text-xs text-[#a78bfa] mt-1">
              {safeData.docNumber || "#COT-001"}
            </p>
            <p className="text-xs text-[#a78bfa] mt-1">{today}</p>
          </div>
        </div>
      </div>

      {/* CLIENTE */}
      <div className="px-10 pt-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-[#f5f3ff] rounded-2xl px-5 py-4 border border-[#e9d5ff]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8b5cf6] font-bold mb-2">
              Preparado para
            </p>

            <p className="font-semibold text-[#4c1d95] text-base">
              {safeData.clientName || "Cliente ejemplo"}
            </p>

            {safeData.clientEmail ? (
              <p className="text-xs text-[#7c3aed] mt-2">{safeData.clientEmail}</p>
            ) : (
              <p className="text-xs text-[#a78bfa] mt-2">
                Sin correo registrado
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl px-5 py-4 border border-[#ede9fe] shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8b5cf6] font-bold mb-3">
              Resumen
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#6b5b95]">
                <span>Servicios</span>
                <span className="font-medium">{services.length}</span>
              </div>
              <div className="flex justify-between text-[#6b5b95]">
                <span>Productos</span>
                <span className="font-medium">{products.length}</span>
              </div>
              <div className="flex justify-between text-[#6b5b95]">
                <span>Impuesto</span>
                <span className="font-medium">{tax}%</span>
              </div>
              <div className="flex justify-between text-[#6b5b95]">
                <span>Descuento</span>
                <span className="font-medium">{formatCurrency(discount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ITEMS */}
      <div className="px-10 pt-6">
        <div className="overflow-hidden rounded-2xl border border-[#ede9fe]">
          <table className="w-full text-sm border-collapse bg-white">
            <thead>
              <tr className="bg-[#faf5ff] border-b border-[#ede9fe]">
                <th className="text-left px-4 py-3 text-[#7c3aed] font-semibold uppercase text-[11px] tracking-wider">
                  Concepto
                </th>
                <th className="text-left px-4 py-3 text-[#7c3aed] font-semibold uppercase text-[11px] tracking-wider">
                  Detalle
                </th>
                <th className="text-center px-4 py-3 text-[#7c3aed] font-semibold uppercase text-[11px] tracking-wider">
                  Cant.
                </th>
                <th className="text-right px-4 py-3 text-[#7c3aed] font-semibold uppercase text-[11px] tracking-wider">
                  Precio
                </th>
                <th className="text-right px-4 py-3 text-[#7c3aed] font-semibold uppercase text-[11px] tracking-wider">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item, i) => (
                  <tr
                    key={`${item.type}-${i}`}
                    className={`border-b border-[#f3f0ff] ${
                      i % 2 === 0 ? "bg-white" : "bg-[#fcfaff]"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-[#4c1d95]">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-[#7e6aa8]">
                      {item.description || (
                        <span className="text-[#b8a8d8]">Sin descripción</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-[#7e6aa8]">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right text-[#7e6aa8]">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-[#4c1d95]">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[#a78bfa]">
                    No hay conceptos agregados en esta cotización.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TOTALES */}
        <div className="flex justify-end mt-5">
          <div className="w-64 rounded-2xl border border-[#ede9fe] bg-[#faf5ff] p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#6b5b95]">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {tax > 0 && (
                <div className="flex justify-between text-[#6b5b95]">
                  <span>IVA ({tax}%)</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Descuento</span>
                  <span>− {formatCurrency(discount)}</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-white bg-[#7c3aed] px-4 py-3 rounded-xl mt-3 shadow-sm">
                <span>TOTAL</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NOTAS */}
      <div className="px-10 mt-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8b5cf6] font-bold mb-2">
          Notas
        </p>

        <div className="bg-[#faf5ff] border border-[#e9d5ff] rounded-2xl p-4 min-h-[70px]">
          {safeData.notes ? (
            <p className="text-sm text-[#5b417e] whitespace-pre-line leading-6">
              {safeData.notes}
            </p>
          ) : (
            <p className="text-sm text-[#b8a8d8] italic">Sin observaciones</p>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-8 px-10 py-4 border-t border-[#ede9fe] bg-[#faf5ff]">
        <p className="text-[11px] text-center text-[#8b5cf6]">
          {safeData.companyName || "Tu Empresa"} · Documento generado digitalmente
        </p>
      </div>
    </div>
  )
}
