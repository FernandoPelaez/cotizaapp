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

export default function TemplateClasica10({ data }: Props) {
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
      className="bg-white font-sans text-[#0c2340] rounded-2xl overflow-hidden border border-[#d7e7f5]"
    >
      {/* HEADER */}
      <div className="flex">
        <div className="bg-gradient-to-r from-[#3b9edd] to-[#67b7e8] flex-1 px-10 py-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#d8eefb] font-semibold mb-2">
            Servicios profesionales
          </p>
          <h1 className="text-3xl font-bold text-white leading-tight">
            {safeData.title || "Cotización"}
          </h1>
          <p className="text-sm text-[#d8eefb] mt-2">
            Propuesta clara, formal y lista para compartir
          </p>
        </div>

        <div className="bg-[#0c2340] px-6 py-8 text-right min-w-[160px]">
          <p className="text-white font-bold text-sm">
            {safeData.companyName || "Tu Empresa"}
          </p>
          <p className="text-[#7fc3ec] text-xs mt-2">
            {safeData.docNumber || "#COT-001"}
          </p>
          <p className="text-[#7fc3ec] text-xs mt-1">{today}</p>
        </div>
      </div>

      {/* CLIENTE + RESUMEN */}
      <div className="px-10 pt-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="border-l-4 border-[#3b9edd] pl-4 py-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#3b9edd] font-bold mb-2">
              Atención a
            </p>
            <p className="font-semibold text-base text-[#0c2340]">
              {safeData.clientName || "Cliente ejemplo"}
            </p>

            {safeData.clientEmail ? (
              <p className="text-sm text-[#6ab4e8] mt-2">{safeData.clientEmail}</p>
            ) : (
              <p className="text-sm text-[#9bccea] mt-2">Sin correo registrado</p>
            )}
          </div>

          <div className="rounded-2xl border border-[#d7e7f5] bg-[#f7fbfe] p-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#3b9edd] font-bold mb-3">
              Resumen
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#4e6b85]">
                <span>Servicios</span>
                <span className="font-medium text-[#0c2340]">{services.length}</span>
              </div>
              <div className="flex justify-between text-[#4e6b85]">
                <span>Productos</span>
                <span className="font-medium text-[#0c2340]">{products.length}</span>
              </div>
              <div className="flex justify-between text-[#4e6b85]">
                <span>IVA</span>
                <span className="font-medium text-[#0c2340]">{tax}%</span>
              </div>
              <div className="flex justify-between text-[#4e6b85]">
                <span>Descuento</span>
                <span className="font-medium text-[#0c2340]">{formatCurrency(discount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div className="px-10 pt-6">
        <div className="overflow-hidden rounded-2xl border border-[#d7e7f5] bg-white">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#f4f9fd] border-b border-[#d7e7f5]">
                <th className="text-left px-4 py-3 text-[#0c2340] font-semibold uppercase text-[11px] tracking-wider">
                  Concepto
                </th>
                <th className="text-left px-4 py-3 text-[#0c2340] font-semibold uppercase text-[11px] tracking-wider">
                  Detalle
                </th>
                <th className="text-center px-4 py-3 text-[#0c2340] font-semibold uppercase text-[11px] tracking-wider">
                  Cant.
                </th>
                <th className="text-right px-4 py-3 text-[#0c2340] font-semibold uppercase text-[11px] tracking-wider">
                  Precio
                </th>
                <th className="text-right px-4 py-3 text-[#0c2340] font-semibold uppercase text-[11px] tracking-wider">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item, i) => (
                  <tr
                    key={`${item.type}-${i}`}
                    className={`border-b border-[#eef4f8] ${
                      i % 2 === 0 ? "bg-white" : "bg-[#fbfdff]"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-[#0c2340]">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-[#6d8aa2]">
                      {item.description || (
                        <span className="text-[#a8c4d8]">Sin descripción</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-[#6d8aa2]">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right text-[#6d8aa2]">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-[#3b9edd]">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[#9bccea]">
                    No hay conceptos agregados en esta cotización.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TOTALES */}
        <div className="flex justify-end mt-5">
          <div className="w-60 rounded-2xl border border-[#d7e7f5] bg-white p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#4e6b85]">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {tax > 0 && (
                <div className="flex justify-between text-[#4e6b85]">
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

              <div className="flex justify-between font-bold text-white bg-[#0c2340] px-4 py-3 rounded-xl mt-3 shadow-sm">
                <span>TOTAL</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NOTAS */}
      <div className="px-10 mt-6 pb-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#3b9edd] font-bold mb-2">
          Notas
        </p>

        <div className="rounded-2xl border border-[#d7e7f5] bg-[#f7fbfe] p-4 min-h-[72px]">
          {safeData.notes ? (
            <p className="text-sm text-[#4e6b85] whitespace-pre-line leading-6">
              {safeData.notes}
            </p>
          ) : (
            <p className="text-sm text-[#9bccea] italic">Sin observaciones</p>
          )}
        </div>
      </div>
    </div>
  )
}
