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

export default function TemplateClasica8({ data }: Props) {
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
      className="bg-white font-sans text-[#1c1c1c] overflow-hidden rounded-2xl border border-[#ffd7cd]"
    >
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#ff5c35] to-[#ff7a59] px-10 py-8">
        <div className="flex justify-between items-start gap-6">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#ffe1d9] font-bold mb-2">
              Cotización de servicios
            </p>
            <h1 className="text-4xl font-black text-white leading-none">
              {safeData.title || "Cotización"}
            </h1>
            <p className="text-sm text-[#ffe1d9] mt-3">
              Propuesta comercial clara, potente y lista para enviar
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="font-bold text-white text-base">
              {safeData.companyName || "Tu Empresa"}
            </p>
            <p className="text-xs text-[#ffe1d9] mt-1">
              {safeData.docNumber || "#COT-001"}
            </p>
            <p className="text-xs text-[#ffe1d9] mt-1">{today}</p>
          </div>
        </div>
      </div>

      {/* CLIENTE + RESUMEN */}
      <div className="px-10 py-5 bg-[#fff5f3] border-b border-[#ffcfbf]">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#ff5c35] font-bold mb-2">
              Cliente
            </p>
            <p className="font-bold text-[#ff5c35] text-base">
              {safeData.clientName || "Cliente ejemplo"}
            </p>
            {safeData.clientEmail ? (
              <p className="text-xs text-[#ff8d73] mt-2">{safeData.clientEmail}</p>
            ) : (
              <p className="text-xs text-[#ffad9a] mt-2">Sin correo registrado</p>
            )}
          </div>

          <div className="rounded-2xl border border-[#ffd7cd] bg-white p-4 shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#ff5c35] font-bold mb-3">
              Resumen
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Servicios</span>
                <span className="font-medium text-[#1c1c1c]">{services.length}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Productos</span>
                <span className="font-medium text-[#1c1c1c]">{products.length}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>IVA</span>
                <span className="font-medium text-[#1c1c1c]">{tax}%</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Descuento</span>
                <span className="font-medium text-[#1c1c1c]">{formatCurrency(discount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div className="px-10 pt-6">
        <div className="overflow-hidden rounded-2xl border border-[#ffe1d9] bg-white">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#fff8f6]">
                <th className="text-left px-4 py-3 border-b-2 border-[#1c1c1c] font-bold text-[11px] uppercase tracking-wider">
                  Concepto
                </th>
                <th className="text-left px-4 py-3 border-b-2 border-[#1c1c1c] font-bold text-[11px] uppercase tracking-wider">
                  Detalle
                </th>
                <th className="text-center px-4 py-3 border-b-2 border-[#1c1c1c] font-bold text-[11px] uppercase tracking-wider">
                  Cant.
                </th>
                <th className="text-right px-4 py-3 border-b-2 border-[#1c1c1c] font-bold text-[11px] uppercase tracking-wider">
                  Precio
                </th>
                <th className="text-right px-4 py-3 border-b-2 border-[#1c1c1c] font-bold text-[11px] uppercase tracking-wider">
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
                      i % 2 === 0 ? "bg-white" : "bg-[#fffaf8]"
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-[#1c1c1c]">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {item.description || (
                        <span className="text-gray-350">Sin descripción</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-400">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-500">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#ff5c35]">
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

        {/* TOTALES */}
        <div className="flex justify-end mt-5">
          <div className="w-60 rounded-2xl border border-[#ffd7cd] bg-white p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {tax > 0 && (
                <div className="flex justify-between text-gray-500">
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

              <div className="flex justify-between font-black text-white bg-[#ff5c35] px-4 py-3 rounded-xl mt-3 text-base shadow-sm">
                <span>TOTAL</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NOTAS */}
      <div className="px-10 mt-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#ff5c35] font-bold mb-2">
          Notas
        </p>

        <div className="min-h-[72px] border-l-4 border-[#ff5c35] bg-[#fff8f6] rounded-r-xl px-4 py-3">
          {safeData.notes ? (
            <p className="text-sm text-gray-600 whitespace-pre-line leading-6">
              {safeData.notes}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">Sin observaciones</p>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-8 bg-[#1c1c1c] px-10 py-4 flex justify-between items-center">
        <p className="text-[10px] text-gray-500">Documento válido por 30 días</p>
        <p className="text-[10px] text-[#ff7a59] font-bold">
          {safeData.companyName || "Tu Empresa"}
        </p>
      </div>
    </div>
  )
}
