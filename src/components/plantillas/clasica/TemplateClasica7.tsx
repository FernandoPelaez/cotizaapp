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

export default function TemplateClasica7({ data }: Props) {
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
      className="bg-[#f6f7f2] font-sans text-[#1f2f22] rounded-2xl overflow-hidden border border-[#d9e6d6]"
    >
      <div className="flex min-h-[842px]">
        <div className="w-8 bg-gradient-to-b from-[#4a7c59] to-[#2d5a3d]" />

        <div className="flex-1">
          {/* HEADER */}
          <div className="px-8 pt-8 pb-6 border-b border-[#d4e4d4] bg-[#fbfcf8]">
            <div className="flex justify-between items-start gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#4a7c59] font-bold mb-2">
                  Propuesta comercial
                </p>
                <h1 className="text-3xl font-bold text-[#2d5a3d] leading-tight">
                  {safeData.title || "Cotización"}
                </h1>
                <p className="text-sm text-[#6d8f74] mt-2">
                  Documento profesional con enfoque claro y natural
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="font-bold text-[#2d5a3d] text-sm">
                  {safeData.companyName || "Tu Empresa"}
                </p>
                <p className="text-xs text-[#7aaa8a] mt-1">
                  {safeData.docNumber || "#COT-001"}
                </p>
                <p className="text-xs text-[#7aaa8a] mt-1">{today}</p>
              </div>
            </div>
          </div>

          {/* CLIENTE + RESUMEN */}
          <div className="px-8 py-5 border-b border-[#d4e4d4] bg-white">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#4a7c59] font-bold mb-2">
                  Para
                </p>
                <p className="font-semibold text-[#2d5a3d] text-base">
                  {safeData.clientName || "Cliente ejemplo"}
                </p>

                {safeData.clientEmail ? (
                  <p className="text-xs text-[#7aaa8a] mt-2">
                    {safeData.clientEmail}
                  </p>
                ) : (
                  <p className="text-xs text-[#9ab29f] mt-2">
                    Sin correo registrado
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-[#d9e6d6] bg-[#f8fbf6] p-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#4a7c59] font-bold mb-3">
                  Resumen
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#6d8f74]">
                    <span>Servicios</span>
                    <span className="font-medium">{services.length}</span>
                  </div>
                  <div className="flex justify-between text-[#6d8f74]">
                    <span>Productos</span>
                    <span className="font-medium">{products.length}</span>
                  </div>
                  <div className="flex justify-between text-[#6d8f74]">
                    <span>IVA</span>
                    <span className="font-medium">{tax}%</span>
                  </div>
                  <div className="flex justify-between text-[#6d8f74]">
                    <span>Descuento</span>
                    <span className="font-medium">{formatCurrency(discount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABLA */}
          <div className="px-8 pt-5">
            <div className="overflow-hidden rounded-2xl border border-[#d9e6d6] bg-white">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#eef5ec] border-b border-[#d4e4d4]">
                    <th className="text-left px-4 py-3 text-[#4a7c59] text-[11px] uppercase tracking-wider font-semibold">
                      Descripción
                    </th>
                    <th className="text-left px-4 py-3 text-[#4a7c59] text-[11px] uppercase tracking-wider font-semibold">
                      Detalle
                    </th>
                    <th className="text-center px-4 py-3 text-[#4a7c59] text-[11px] uppercase tracking-wider font-semibold">
                      Cant.
                    </th>
                    <th className="text-right px-4 py-3 text-[#4a7c59] text-[11px] uppercase tracking-wider font-semibold">
                      Precio
                    </th>
                    <th className="text-right px-4 py-3 text-[#4a7c59] text-[11px] uppercase tracking-wider font-semibold">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.length > 0 ? (
                    items.map((item, i) => (
                      <tr
                        key={`${item.type}-${i}`}
                        className={`border-b border-[#e6efe3] ${
                          i % 2 === 0 ? "bg-white" : "bg-[#fafcf8]"
                        }`}
                      >
                        <td className="py-3 px-4 font-medium text-[#2d5a3d]">
                          {item.name}
                        </td>
                        <td className="py-3 px-4 text-[#7aaa8a]">
                          {item.description || (
                            <span className="text-[#a1b9a6]">Sin descripción</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-[#7aaa8a]">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-4 text-right text-[#7aaa8a]">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-[#2d5a3d]">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-[#9ab29f]">
                        No hay conceptos agregados en esta cotización.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* TOTALES */}
            <div className="flex justify-end mt-5">
              <div className="w-60 rounded-2xl border border-[#d9e6d6] bg-[#fbfcf8] p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#6d8f74]">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>

                  {tax > 0 && (
                    <div className="flex justify-between text-[#6d8f74]">
                      <span>IVA ({tax}%)</span>
                      <span>{formatCurrency(taxAmount)}</span>
                    </div>
                  )}

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Descuento</span>
                      <span>− {formatCurrency(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold bg-[#2d5a3d] text-white px-4 py-3 rounded-xl mt-3 shadow-sm">
                    <span>TOTAL</span>
                    <span>{formatCurrency(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NOTAS */}
          <div className="px-8 mt-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#4a7c59] font-bold mb-2">
              Notas
            </p>

            <div className="text-sm text-[#4a7c59] bg-[#e8f0e8] border border-[#d4e4d4] rounded-xl p-4 min-h-[72px]">
              {safeData.notes ? (
                <p className="whitespace-pre-line leading-6">{safeData.notes}</p>
              ) : (
                <p className="text-[#8ea892] italic">Sin observaciones</p>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-8 mt-8 pb-6">
            <p className="text-[11px] text-[#7aaa8a]">
              ✦ {safeData.companyName || "Tu Empresa"} · Gracias por confiar en nosotros
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
