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

export default function TemplateClasica4({ data }: Props) {
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
      className="bg-[#fffafa] font-sans text-[#3b2230] rounded-2xl overflow-hidden border border-[#f3d6dd]"
    >
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#f9d3da] to-[#fbe7eb] px-10 py-8 relative border-b border-[#f3c7d1]">
        <div className="absolute top-4 right-6 text-[42px] opacity-20 select-none">
          ✿
        </div>

        <p className="text-[10px] tracking-[0.35em] uppercase text-[#b05068] font-semibold mb-2">
          Propuesta de servicios
        </p>

        <h1 className="text-3xl font-bold text-[#7c2d3e] leading-tight">
          {safeData.title || "Cotización"}
        </h1>

        <div className="flex justify-between mt-4 text-xs text-[#9a4057] gap-4">
          <div>
            <p className="font-semibold">
              {safeData.companyName || "Tu Empresa"}
            </p>
            <p className="mt-1 text-[#b07080]">
              Documento comercial personalizado
            </p>
          </div>

          <div className="text-right">
            <p>{safeData.docNumber || "#COT-001"}</p>
            <p className="mt-1">{today}</p>
          </div>
        </div>
      </div>

      {/* CLIENTE */}
      <div className="px-10 py-5 bg-white border-b border-[#f6d8df]">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#f09aae] font-bold mb-2">
              Cliente
            </p>

            <p className="font-semibold text-[#7c2d3e] text-base">
              {safeData.clientName || "Cliente ejemplo"}
            </p>

            <div className="mt-2 space-y-1">
              {safeData.clientEmail && (
                <p className="text-xs text-[#b07080]">{safeData.clientEmail}</p>
              )}
              {safeData.clientPhone && (
                <p className="text-xs text-[#b07080]">{safeData.clientPhone}</p>
              )}
              {!safeData.clientEmail && !safeData.clientPhone && (
                <p className="text-xs text-[#c6929f]">
                  Sin datos de contacto adicionales.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[#f3d6dd] bg-[#fff5f7] p-4">
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#f09aae] font-bold mb-3">
              Resumen
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#9a4057]">
                <span>Servicios</span>
                <span className="font-medium">{services.length}</span>
              </div>
              <div className="flex justify-between text-[#9a4057]">
                <span>Productos</span>
                <span className="font-medium">{products.length}</span>
              </div>
              <div className="flex justify-between text-[#9a4057]">
                <span>IVA</span>
                <span className="font-medium">{tax}%</span>
              </div>
              <div className="flex justify-between text-[#9a4057]">
                <span>Descuento</span>
                <span className="font-medium">{formatCurrency(discount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ITEMS */}
      <div className="px-10 pt-6">
        <div className="overflow-hidden rounded-2xl border border-[#f3d6dd] bg-white">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#fff1f4] border-b border-[#f3d6dd]">
                <th className="text-left px-4 py-3 text-[#b05068] font-semibold text-xs uppercase tracking-wider">
                  Concepto
                </th>
                <th className="text-left px-4 py-3 text-[#b05068] font-semibold text-xs uppercase tracking-wider">
                  Detalle
                </th>
                <th className="text-center px-4 py-3 text-[#b05068] font-semibold text-xs uppercase tracking-wider">
                  Cant.
                </th>
                <th className="text-right px-4 py-3 text-[#b05068] font-semibold text-xs uppercase tracking-wider">
                  Precio
                </th>
                <th className="text-right px-4 py-3 text-[#b05068] font-semibold text-xs uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item, i) => (
                  <tr
                    key={`${item.type}-${i}`}
                    className={`border-b border-[#fce8ec] ${
                      i % 2 === 0 ? "bg-white" : "bg-[#fffafb]"
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-[#7c2d3e]">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-[#b07080]">
                      {item.description || (
                        <span className="text-[#d1a8b2]">Sin descripción</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-[#b07080]">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-4 text-right text-[#b07080]">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-[#7c2d3e]">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-[#c6929f]"
                  >
                    No hay conceptos agregados en esta cotización.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-5">
          <div className="w-60 rounded-2xl border border-[#f3d6dd] bg-white p-4 shadow-sm">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#b07080]">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {tax > 0 && (
                <div className="flex justify-between text-[#b07080]">
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

              <div className="flex justify-between font-bold text-white bg-[#c94f6a] px-4 py-3 rounded-xl mt-3 text-sm shadow-sm">
                <span>TOTAL</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-10 mt-6">
        <p className="text-[9px] uppercase tracking-[0.25em] text-[#f09aae] font-bold mb-2">
          Notas
        </p>

        <div className="text-xs text-[#9a4057] bg-[#fff0f3] border border-[#f9c6cc] rounded-xl p-4 min-h-[72px]">
          {safeData.notes ? (
            <p className="whitespace-pre-line leading-5">{safeData.notes}</p>
          ) : (
            <p className="text-[#d1a8b2] italic">Sin observaciones</p>
          )}
        </div>
      </div>

      <div className="mt-8 px-10 py-4 bg-[#f9d3da] border-t border-[#f3c7d1] flex justify-between items-center">
        <p className="text-[10px] text-[#9a4057]">✿ Gracias por tu preferencia</p>
        <p className="text-[10px] text-[#9a4057] font-semibold">
          {safeData.companyName || "Tu Empresa"}
        </p>
      </div>
    </div>
  )
}
