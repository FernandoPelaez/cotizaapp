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
  clientPhone?: string
  clientAddress?: string
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

function currency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value)
}

export default function TemplateClasica2({ data }: Props) {
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
      month: "2-digit",
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

  const calculatedSubtotal =
    items.length > 0
      ? items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : Number(safeData.subtotal || 0)

  const subtotal = Number(safeData.subtotal ?? calculatedSubtotal)
  const tax = Number(safeData.tax ?? 0)
  const discount = Number(safeData.discount ?? 0)
  const taxAmount = subtotal * (tax / 100)
  const finalTotal = Number(safeData.total ?? subtotal + taxAmount - discount)

  return (
    <div
      style={{ width: "595px", minHeight: "842px" }}
      className="bg-white text-[#111827] rounded-2xl overflow-hidden border border-gray-200 font-sans"
    >
      {/* Header superior */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-slate-900 to-slate-700 px-10 py-8 text-white">
        <div className="flex justify-between items-start gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70 mb-2">
              Documento comercial
            </p>
            <h1 className="text-4xl font-bold leading-none">
              {safeData.title || "Cotización"}
            </h1>
            <p className="mt-3 text-sm text-white/80">
              Propuesta clara, profesional y lista para compartir.
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-lg font-semibold">
              {safeData.companyName || "Tu Empresa"}
            </p>
            <p className="text-sm text-white/80 mt-1">
              Folio: {safeData.docNumber || "#COT-001"}
            </p>
            <p className="text-sm text-white/80">
              Fecha: {today}
            </p>
          </div>
        </div>
      </div>

      <div className="px-10 py-8">
        {/* Datos cliente */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Cliente
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {safeData.clientName || "Cliente ejemplo"}
            </p>

            <div className="mt-3 space-y-1.5 text-sm text-gray-600">
              {safeData.clientEmail && <p>{safeData.clientEmail}</p>}
              {safeData.clientPhone && <p>{safeData.clientPhone}</p>}
              {safeData.clientAddress && <p>{safeData.clientAddress}</p>}
              {!safeData.clientEmail &&
                !safeData.clientPhone &&
                !safeData.clientAddress && (
                  <p>Sin datos de contacto adicionales.</p>
                )}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Resumen
            </p>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Servicios</span>
                <span className="font-medium">{services.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Productos</span>
                <span className="font-medium">{products.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Impuesto</span>
                <span className="font-medium">{tax}%</span>
              </div>
              <div className="flex justify-between">
                <span>Descuento</span>
                <span className="font-medium">{currency(discount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-100">
              <tr className="text-slate-700">
                <th className="text-left px-4 py-3 font-semibold">Concepto</th>
                <th className="text-left px-4 py-3 font-semibold">Detalle</th>
                <th className="text-center px-4 py-3 font-semibold">Cant.</th>
                <th className="text-right px-4 py-3 font-semibold">Precio</th>
                <th className="text-right px-4 py-3 font-semibold">Importe</th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => {
                  const lineTotal = item.price * item.quantity

                  return (
                    <tr
                      key={`${item.type}-${index}`}
                      className="border-t border-gray-200 align-top"
                    >
                      <td className="px-4 py-4 font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {item.description || (
                          <span className="text-gray-400">Sin descripción</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-4 text-right text-gray-700">
                        {currency(item.price)}
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-gray-900">
                        {currency(lineTotal)}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-500">
                    No hay conceptos agregados en esta cotización.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totales */}
        <div className="mt-8 flex justify-end">
          <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-slate-50 p-5">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{currency(subtotal)}</span>
              </div>

              {tax > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span>Impuesto ({tax}%)</span>
                  <span>{currency(taxAmount)}</span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Descuento</span>
                  <span>- {currency(discount)}</span>
                </div>
              )}

              <div className="border-t border-gray-300 pt-3 flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>{currency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notas */}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Observaciones
          </h2>

          {safeData.notes ? (
            <p className="text-sm leading-6 text-gray-600 whitespace-pre-line">
              {safeData.notes}
            </p>
          ) : (
            <div className="space-y-3">
              <div className="h-4 border-b border-dashed border-gray-300" />
              <div className="h-4 border-b border-dashed border-gray-300" />
              <div className="h-4 border-b border-dashed border-gray-300" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
