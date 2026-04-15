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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value)
}

export default function TemplateClasica3({ data }: Props) {
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
      className="bg-[#f8fafc] font-sans text-[#0f172a] rounded-2xl overflow-hidden border border-slate-200"
    >
      {/* HEADER */}
      <div className="flex">
        <div className="w-2 bg-[#1e3a5f] self-stretch" />
        <div className="flex-1 bg-gradient-to-r from-[#1e3a5f] to-[#24476f] px-8 py-7 flex justify-between items-start gap-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#93c5fd] mb-2">
              Documento comercial
            </p>
            <h1 className="text-3xl font-bold text-white leading-tight">
              {safeData.title || "Cotización"}
            </h1>
            <p className="text-[#cbd5e1] text-xs mt-2">
              {safeData.docNumber || "#COT-001"} · {today}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-white font-bold text-lg">
              {safeData.companyName || "Tu Empresa"}
            </p>
            <p className="text-xs text-[#cbd5e1] mt-1">
              Propuesta formal y lista para enviar
            </p>
          </div>
        </div>
      </div>

      {/* CLIENTE */}
      <div className="px-10 py-6 bg-white border-b border-slate-200">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">
              Preparado para
            </p>
            <p className="text-lg font-semibold text-[#1e3a5f]">
              {safeData.clientName || "Cliente ejemplo"}
            </p>

            <div className="mt-2 space-y-1">
              {safeData.clientEmail && (
                <p className="text-xs text-slate-500">{safeData.clientEmail}</p>
              )}
              {safeData.clientPhone && (
                <p className="text-xs text-slate-500">{safeData.clientPhone}</p>
              )}
              {safeData.clientAddress && (
                <p className="text-xs text-slate-500">{safeData.clientAddress}</p>
              )}
              {!safeData.clientEmail &&
                !safeData.clientPhone &&
                !safeData.clientAddress && (
                  <p className="text-xs text-slate-400">
                    Sin datos de contacto adicionales.
                  </p>
                )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-3">
              Resumen
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Servicios</span>
                <span className="font-medium">{services.length}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Productos</span>
                <span className="font-medium">{products.length}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Impuesto</span>
                <span className="font-medium">{tax}%</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Descuento</span>
                <span className="font-medium">{formatCurrency(discount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div className="px-10 pt-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-[#1e3a5f] font-semibold">
                  Descripción
                </th>
                <th className="text-left px-4 py-3 text-[#1e3a5f] font-semibold">
                  Detalle
                </th>
                <th className="text-center px-4 py-3 text-[#1e3a5f] font-semibold">
                  Cant.
                </th>
                <th className="text-right px-4 py-3 text-[#1e3a5f] font-semibold">
                  P. Unit.
                </th>
                <th className="text-right px-4 py-3 text-[#1e3a5f] font-semibold">
                  Importe
                </th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item, i) => (
                  <tr
                    key={`${item.type}-${i}`}
                    className={`border-b border-slate-100 ${
                      i % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {item.description || (
                        <span className="text-slate-350">Sin descripción</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-500">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-800">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                    No hay conceptos agregados en esta cotización.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TOTALES */}
        <div className="flex justify-end mt-5">
          <div className="w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {tax > 0 && (
                <div className="flex justify-between text-slate-500">
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

              <div className="flex justify-between font-bold text-white bg-[#1e3a5f] px-4 py-3 rounded-xl mt-3">
                <span>TOTAL</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NOTAS */}
      <div className="px-10 mt-8 pb-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">
          Notas / Condiciones
        </p>

        <div className="border border-dashed border-slate-300 rounded-xl p-4 min-h-[72px] bg-white">
          {safeData.notes ? (
            <p className="text-xs text-slate-600 whitespace-pre-line leading-5">
              {safeData.notes}
            </p>
          ) : (
            <p className="text-xs text-slate-300 italic">Sin observaciones</p>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-[#1e3a5f] px-10 py-3">
        <p className="text-[10px] text-[#93c5fd] text-center">
          {safeData.companyName || "Tu Empresa"} · Documento generado digitalmente
        </p>
      </div>
    </div>
  )
}
