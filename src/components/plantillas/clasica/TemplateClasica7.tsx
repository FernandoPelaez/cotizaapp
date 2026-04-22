import type { TemplateData } from "@/types/cotizacion-form"

type Props = {
  data?: TemplateData
}

type QuoteItem = {
  id: string
  type: "service" | "product"
  name: string
  quantity: number
  price: number
  amount: number
}

const defaultData: TemplateData = {
  title: "Cotización demo",
  description: "Documento comercial con propuesta clara y profesional.",
  clientName: "Cliente ejemplo",
  clientEmail: "cliente@correo.com",
  clientPhone: "+52 667 123 4567",
  clientAddress: "Los Mochis, Sinaloa",
  clientRFC: "XAXX010101000",
  companyName: "Tu Empresa",
  companyLogo: undefined,
  services: [
    { name: "Servicio 1", price: 500 },
    { name: "Servicio 2", price: 800 },
  ],
  products: [{ name: "Producto 1", quantity: 2, price: 150 }],
  discount: 0,
  tax: 16,
  subtotal: 1600,
  total: 1856,
  notes: "Gracias por considerar nuestra propuesta.",
  validUntil: new Date().toISOString().slice(0, 10),
  docNumber: "COT-001",
  date: new Date().toLocaleDateString("es-MX"),
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value || 0)
}

function buildItems(data: TemplateData): QuoteItem[] {
  const serviceItems: QuoteItem[] = (data.services ?? []).map((service, index) => ({
    id: `service-${index}`,
    type: "service",
    name: service.name || `Servicio ${index + 1}`,
    quantity: 1,
    price: Number(service.price || 0),
    amount: Number(service.price || 0),
  }))

  const productItems: QuoteItem[] = (data.products ?? []).map((product, index) => ({
    id: `product-${index}`,
    type: "product",
    name: product.name || `Producto ${index + 1}`,
    quantity: Number(product.quantity || 0),
    price: Number(product.price || 0),
    amount: Number(product.quantity || 0) * Number(product.price || 0),
  }))

  return [...serviceItems, ...productItems]
}

export default function TemplateClasica7({ data }: Props) {
  const safeData: TemplateData = {
    ...defaultData,
    ...data,
    services: data?.services ?? defaultData.services,
    products: data?.products ?? defaultData.products,
  }

  const items = buildItems(safeData)

  const calculatedSubtotal =
    items.length > 0
      ? items.reduce((acc, item) => acc + item.amount, 0)
      : Number(safeData.subtotal || 0)

  const subtotal = Number(safeData.subtotal ?? calculatedSubtotal)
  const tax = Number(safeData.tax ?? 0)
  const discount = Number(safeData.discount ?? 0)
  const taxableBase = Math.max(0, subtotal - discount)
  const taxAmount = taxableBase * (tax / 100)
  const finalTotal = Number(safeData.total ?? taxableBase + taxAmount)

  const initials = String(safeData.companyName || "TE")
    .trim()
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      style={{ width: "595px", minHeight: "842px" }}
      className="overflow-hidden rounded-2xl border border-[#dbe6db] bg-[#f7f8f3] font-sans text-[#203126]"
    >
      <div className="relative overflow-hidden bg-[#1f4a36] px-8 pb-6 pt-8 text-white">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/5" />
        <div className="absolute right-20 top-10 h-24 w-24 rounded-full bg-emerald-200/10" />
        <div className="absolute -bottom-12 left-28 h-28 w-28 rounded-full bg-lime-100/10" />

        <div className="relative z-10 flex items-start justify-between gap-6">
          <div className="max-w-[320px]">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.32em] text-[#b7d8c0]">
              Propuesta de servicios
            </p>

            <h1 className="text-[31px] font-bold leading-tight">
              {safeData.title || "Cotización"}
            </h1>

            {safeData.description ? (
              <p className="mt-3 text-[12px] leading-6 text-white/75">
                {safeData.description}
              </p>
            ) : null}
          </div>

          <div className="flex min-w-[170px] flex-col items-end gap-3 text-right">
            {safeData.companyLogo ? (
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-lg">
                <img
                  src={safeData.companyLogo}
                  alt="Logo de la empresa"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#1f4a36] shadow-lg">
                {initials}
              </div>
            )}

            <div>
              <p className="text-[18px] font-semibold">
                {safeData.companyName || "Tu Empresa"}
              </p>
              <p className="mt-1 text-[11px] text-white/75">
                {safeData.docNumber || "COT-001"}
              </p>
              <p className="text-[11px] text-white/75">
                {safeData.date || new Date().toLocaleDateString("es-MX")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1.2fr_0.8fr] gap-5 px-8 py-5">
        <div className="rounded-2xl border border-[#dbe6db] bg-white p-5 shadow-sm">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#4a7c59]">
            Cliente
          </p>

          <p className="text-[18px] font-semibold text-[#264733]">
            {safeData.clientName || "Cliente ejemplo"}
          </p>

          <div className="mt-3 space-y-1.5 text-[12px] text-[#6d8f74]">
            {safeData.clientEmail && <p>{safeData.clientEmail}</p>}
            {safeData.clientPhone && <p>{safeData.clientPhone}</p>}
            {safeData.clientAddress && <p>{safeData.clientAddress}</p>}
            {safeData.clientRFC && <p>RFC: {safeData.clientRFC}</p>}
            {!safeData.clientEmail &&
              !safeData.clientPhone &&
              !safeData.clientAddress &&
              !safeData.clientRFC && (
                <p className="text-[#97ad9c]">Sin datos adicionales.</p>
              )}
          </div>
        </div>

        <div className="rounded-2xl border border-[#dbe6db] bg-[#fbfcf8] p-5">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#4a7c59]">
            Resumen
          </p>

          <div className="space-y-2 text-[12px] text-[#6d8f74]">
            <div className="flex justify-between">
              <span>Conceptos</span>
              <span className="font-semibold text-[#264733]">{items.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Impuesto</span>
              <span className="font-semibold text-[#264733]">{tax}%</span>
            </div>
            <div className="flex justify-between">
              <span>Descuento</span>
              <span className="font-semibold text-[#264733]">
                {formatCurrency(discount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Vigencia</span>
              <span className="font-semibold text-[#264733]">
                {safeData.validUntil || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8">
        <div className="overflow-hidden rounded-2xl border border-[#dbe6db] bg-white shadow-sm">
          <div className="grid grid-cols-[2.3fr_0.7fr_0.9fr_1fr] border-b border-[#dbe6db] bg-[#eef5ec] px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#4a7c59]">
            <div>Concepto</div>
            <div className="text-center">Cant.</div>
            <div className="text-right">Precio</div>
            <div className="text-right">Total</div>
          </div>

          {items.length > 0 ? (
            items.map((item, i) => (
              <div
                key={item.id}
                className={`grid grid-cols-[2.3fr_0.7fr_0.9fr_1fr] items-center border-b border-[#e6efe3] px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-white" : "bg-[#fafcf8]"
                }`}
              >
                <div>
                  <p className="font-medium text-[#2d5a3d]">{item.name}</p>
                  <p className="mt-1 text-[11px] text-[#8ba18f]">
                    {item.type === "service" ? "Servicio" : "Producto"}
                  </p>
                </div>

                <div className="text-center text-[#7aaa8a]">{item.quantity}</div>

                <div className="text-right text-[#7aaa8a]">
                  {formatCurrency(item.price)}
                </div>

                <div className="text-right font-semibold text-[#2d5a3d]">
                  {formatCurrency(item.amount)}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-10 text-center text-[#9ab29f]">
              No hay conceptos agregados en esta cotización.
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <div className="w-64 rounded-2xl border border-[#d9e6d6] bg-white p-4 shadow-sm">
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

              <div className="mt-3 flex justify-between rounded-xl bg-[#2d5a3d] px-4 py-3 font-bold text-white shadow-sm">
                <span>TOTAL</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-8">
        <div className="rounded-2xl border border-[#dbe6db] bg-white p-5 shadow-sm">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#4a7c59]">
            Notas y condiciones
          </p>

          {safeData.notes ? (
            <p className="whitespace-pre-line text-[12px] leading-6 text-[#56725d]">
              {safeData.notes}
            </p>
          ) : (
            <p className="text-[12px] italic text-[#8ea892]">Sin observaciones</p>
          )}
        </div>
      </div>

      <div className="mt-8 border-t border-[#d4e4d4] bg-[#fbfcf8] px-8 py-5">
        <div className="flex items-center justify-between gap-6">
          <p className="text-[11px] text-[#7aaa8a]">
            ✦ {safeData.companyName || "Tu Empresa"} · Gracias por confiar en
            nosotros
          </p>
          <p className="text-[11px] font-medium text-[#7aaa8a]">
            {safeData.validUntil
              ? `Válida hasta ${safeData.validUntil}`
              : "Documento comercial"}
          </p>
        </div>
      </div>
    </div>
  )
}
