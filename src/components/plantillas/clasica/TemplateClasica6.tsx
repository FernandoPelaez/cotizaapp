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

export default function TemplateClasica6({ data }: Props) {
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
      className="bg-white text-[#111827] rounded-2xl border border-gray-200 overflow-hidden font-sans"
    >
      {/* Header */}
      <div className="px-10 pt-10 pb-8 border-b border-gray-200">
        <div className="flex justify-between items-start gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 font-semibold mb-3">
              Cotización profesional
            </p>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {safeData.title || "Cotización"}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Documento claro, elegante y listo para compartir
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-sm font-semibold text-gray-900">
              {safeData.companyName || "Tu Empresa"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {safeData.docNumber || "#COT-001"}
            </p>
            <p className="text-xs text-gray-500 mt-1">{today}</p>
          </div>
        </div>
      </div>

      {/* Cliente */}
      <div className="px-10 py-6">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-2">
              Cliente
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {safeData.clientName || "Cliente ejemplo"}
            </p>
            {safeData.clientEmail ? (
              <p className="text-sm text-gray-500 mt-1">{safeData.clientEmail}</p>
            ) : (
              <p className="text-sm text-gray-400 mt-1">
                Sin correo registrado
              </p>
            )}
          </div>

          <div className="w-48 border border-gray-200 rounded-xl p-4 bg-gray-50">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-3">
              Resumen
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Servicios</span>
                <span className="font-medium">{services.length}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Productos</span>
                <span className="font-medium">{products.length}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>IVA</span>
                <span className="font-medium">{tax}%</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Descuento</span>
                <span className="font-medium">{formatCurrency(discount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="px-10">
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-gray-700 font-semibold uppercase text-[11px] tracking-wider">
                  Concepto
                </th>
                <th className="text-left px-4 py-3 text-gray-700 font-semibold uppercase text-[11px] tracking-wider">
                  Detalle
                </th>
                <th className="text-center px-4 py-3 text-gray-700 font-semibold uppercase text-[11px] tracking-wider">
                  Cant.
                </th>
                <th className="text-right px-4 py-3 text-gray-700 font-semibold uppercase text-[11px] tracking-wider">
                  Precio
                </th>
                <th className="text-right px-4 py-3 text-gray-700 font-semibold uppercase text-[11px] tracking-wider">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item, i) => (
                  <tr
                    key={`${item.type}-${i}`}
                    className={`border-b border-gray-100 ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                    }`}
                  >
                    <td className="px-4 py-4 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                      {item.description || (
                        <span className="text-gray-400">Sin descripción</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-4 text-right text-gray-500">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="px-4 py-4 text-right font-semibold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                    No hay conceptos agregados en esta cotización.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totales */}
        <div className="flex justify-end mt-6">
          <div className="w-64 border border-gray-200 rounded-2xl p-5 bg-white">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {tax > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>IVA ({tax}%)</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Descuento</span>
                  <span>- {formatCurrency(discount)}</span>
                </div>
              )}

              <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-10 mt-8 pb-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-2">
          Notas
        </p>

        <div className="border border-dashed border-gray-300 rounded-2xl p-4 min-h-[70px] bg-gray-50">
          {safeData.notes ? (
            <p className="text-sm text-gray-600 whitespace-pre-line leading-6">
              {safeData.notes}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">Sin observaciones</p>
          )}
        </div>
      </div>
    </div>
  )
}
