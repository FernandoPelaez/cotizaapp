const defaultData = {
  title: "Cotización demo",
  clientName: "Cliente ejemplo",
  clientEmail: undefined as string | undefined,
  clientPhone: undefined as string | undefined,
  clientAddress: undefined as string | undefined,
  companyName: "Tu Empresa",
  companyEmail: undefined as string | undefined,
  companyPhone: undefined as string | undefined,
  companyAddress: undefined as string | undefined,
  companyWeb: undefined as string | undefined,
  docNumber: "#COT-001",
  date: undefined as string | undefined,
  discount: 0,
  tax: 0,
  notes: undefined as string | undefined,
  services: [
    { name: "Servicio 1", description: undefined as string | undefined, price: 500 },
    { name: "Servicio 2", description: undefined as string | undefined, price: 800 },
  ],
  products: [
    { name: "Producto 1", quantity: 2, price: 150 },
  ],
  total: 1100,
  subtotal: 1100,
}

type Props = {
  data?: {
    title: string
    clientName: string
    clientEmail?: string
    clientPhone?: string
    clientAddress?: string
    companyName?: string
    companyEmail?: string
    companyPhone?: string
    companyAddress?: string
    companyWeb?: string
    docNumber?: string
    date?: string
    discount?: number
    tax?: number
    notes?: string
    services: { name: string; description?: string; price: number }[]
    products: { name: string; quantity: number; price: number }[]
    total: number
    subtotal?: number
  }
}

export default function TemplateClasica({ data }: Props) {
  const safeData = {
  ...defaultData,
  ...data,
}

  const today = safeData.date ?? new Date().toLocaleDateString("es-MX", {
    day: "2-digit", month: "long", year: "numeric",
  })

  const subtotal = safeData.subtotal ?? safeData.total
  const tax = safeData.tax ?? 0
  const discount = safeData.discount ?? 0
  const taxAmount = subtotal * (tax / 100)

  return (
    <div
      id="template-clasica"
      style={{ width: "595px", minHeight: "842px" }}
      className="bg-white relative overflow-hidden font-sans text-[#1a1a2e]"
    >

      {/* Decoración top-right */}
      <div className="absolute top-0 right-0 w-44 h-44 pointer-events-none">
        <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
          <circle cx="180" cy="0" r="140" fill="#1e3a8a" fillOpacity="0.08"/>
          <circle cx="180" cy="0" r="100" fill="#1e3a8a" fillOpacity="0.08"/>
          <circle cx="180" cy="0" r="60"  fill="#1e3a8a" fillOpacity="0.1"/>
        </svg>
      </div>

      {/* Decoración bottom-left */}
      <div className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none">
        <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
          <circle cx="0" cy="160" r="120" fill="#1e3a8a" fillOpacity="0.07"/>
          <circle cx="0" cy="160" r="80"  fill="#1e3a8a" fillOpacity="0.07"/>
        </svg>
      </div>

      {/* Header */}
      <div className="px-10 pt-9 pb-7 relative z-10">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 bg-[#1e3a8a] rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-[#1e3a8a]">
            {safeData.companyName || "Tu Empresa"}
          </span>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-[32px] font-bold text-[#1a1a2e] leading-tight">
              Cotización de<br />Servicios
            </h1>
            <p className="text-[13px] text-gray-500 mt-1">
              {safeData.title || "Documento comercial"} · Válido por 30 días
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
            <span className="text-[11px] font-semibold text-blue-500 tracking-wide">
              {safeData.docNumber ?? "#COT-001"}
            </span>
          </div>
        </div>
      </div>

      {/* Meta: cliente + emisor */}
      <div className="grid grid-cols-2 px-10 pb-7 relative z-10">
        <div className="pr-6">
          <p className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-widest mb-2">
            Datos del Cliente
          </p>
          <p className="text-[13px] font-semibold text-[#1a1a2e] mb-1">
            {safeData.clientName || "Sin cliente"}
          </p>
          {safeData.clientAddress && <p className="text-[12px] text-gray-600">{safeData.clientAddress}</p>}
          {safeData.clientPhone   && <p className="text-[12px] text-gray-600">{safeData.clientPhone}</p>}
          {safeData.clientEmail   && <p className="text-[12px] text-gray-600">{safeData.clientEmail}</p>}
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-widest mb-2">
            Datos del Emisor
          </p>
          <p className="text-[13px] font-semibold text-[#1a1a2e] mb-1">
            {safeData.companyName || "Tu Empresa"}
          </p>
          {safeData.companyAddress && <p className="text-[12px] text-gray-600">{safeData.companyAddress}</p>}
          {safeData.companyPhone   && <p className="text-[12px] text-gray-600">{safeData.companyPhone}</p>}
          {safeData.companyEmail   && <p className="text-[12px] text-gray-600">{safeData.companyEmail}</p>}
        </div>
      </div>

      {/* Tabla Servicios */}
      {safeData.services.length > 0 && (
        <div className="px-10 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-widest">Servicios</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="bg-[#1e3a8a]">
                <th className="text-left text-white font-semibold text-[11px] uppercase tracking-wider px-3.5 py-2.5">Descripción</th>
                <th className="text-center text-white font-semibold text-[11px] uppercase tracking-wider px-3.5 py-2.5">Cant.</th>
                <th className="text-right text-white font-semibold text-[11px] uppercase tracking-wider px-3.5 py-2.5">Precio</th>
                <th className="text-right text-white font-semibold text-[11px] uppercase tracking-wider px-3.5 py-2.5">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {safeData.services.map((s, i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-slate-50" : "bg-white"}>
                  <td className="px-3.5 py-2.5 font-medium text-[#1a1a2e]">
                    {s.name || "-"}
                    {s.description && (
                      <span className="block text-[10px] text-gray-400 font-normal">{s.description}</span>
                    )}
                  </td>
                  <td className="px-3.5 py-2.5 text-center text-gray-600">1</td>
                  <td className="px-3.5 py-2.5 text-right text-gray-600">${(s.price || 0).toFixed(2)}</td>
                  <td className="px-3.5 py-2.5 text-right font-semibold text-[#1a1a2e]">${(s.price || 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tabla Productos */}
      {safeData.products.length > 0 && (
        <div className="px-10 mt-4 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-widest">Productos</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr className="bg-[#1e3a8a]">
                <th className="text-left text-white font-semibold text-[11px] uppercase tracking-wider px-3.5 py-2.5">Producto</th>
                <th className="text-center text-white font-semibold text-[11px] uppercase tracking-wider px-3.5 py-2.5">Cantidad</th>
                <th className="text-right text-white font-semibold text-[11px] uppercase tracking-wider px-3.5 py-2.5">Precio unit.</th>
                <th className="text-right text-white font-semibold text-[11px] uppercase tracking-wider px-3.5 py-2.5">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {safeData.products.map((p, i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-slate-50" : "bg-white"}>
                  <td className="px-3.5 py-2.5 font-medium text-[#1a1a2e]">{p.name || "-"}</td>
                  <td className="px-3.5 py-2.5 text-center text-gray-600">{p.quantity}</td>
                  <td className="px-3.5 py-2.5 text-right text-gray-600">${(p.price || 0).toFixed(2)}</td>
                  <td className="px-3.5 py-2.5 text-right font-semibold text-[#1a1a2e]">
                    ${((p.price || 0) * (p.quantity || 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Totales */}
      <div className="flex justify-end px-10 mt-5 relative z-10">
        <div className="w-56">
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-[12px] text-gray-500">Subtotal</span>
            <span className="text-[12px] font-semibold text-gray-700">${subtotal.toFixed(2)}</span>
          </div>
          {tax > 0 && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-[12px] text-gray-500">Impuestos ({tax}%)</span>
              <span className="text-[12px] font-semibold text-gray-700">${taxAmount.toFixed(2)}</span>
            </div>
          )}
          {discount > 0 && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-[12px] text-gray-500">Descuento</span>
              <span className="text-[12px] font-semibold text-emerald-600">- ${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center bg-[#1e3a8a] rounded-lg px-4 py-3 mt-2.5">
            <span className="text-[11px] text-blue-300 uppercase tracking-wider font-semibold">Total</span>
            <span className="text-[20px] font-bold text-white">${(safeData.total || 0).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Condiciones */}
      {safeData.notes && (
        <div className="px-10 mt-6 relative z-10">
          <p className="text-[10px] font-bold text-[#1e3a8a] uppercase tracking-widest mb-2">Condiciones</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">{safeData.notes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="relative z-10 px-10 py-4 bg-slate-50 border-t border-gray-100 flex justify-between items-center mt-10">
        <div className="flex gap-5">
          {safeData.companyPhone && (
            <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
              {safeData.companyPhone}
            </span>
          )}
          {safeData.companyEmail && (
            <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {safeData.companyEmail}
            </span>
          )}
          {safeData.companyWeb && (
            <span className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
              </svg>
              {safeData.companyWeb}
            </span>
          )}
        </div>
        <span className="text-[10px] text-gray-400">{today}</span>
      </div>

    </div>
  )
}
