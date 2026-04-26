"use client"

import type { Product, Service } from "@/types/cotizacion-form"

type QuoteFormStepTwoProps = {
  services: Service[]
  products: Product[]
  showServicesSection: boolean
  showProductsSection: boolean
  discount: number
  tax: number
  subtotal: number
  taxAmount: number
  total: number
  notes: string
  loading: boolean
  inputCls: string
  labelCls: string
  sectionCls: string
  formatMoney: (value: number) => string
  onServiceChange: (
    index: number,
    field: keyof Service,
    value: string
  ) => void
  onProductChange: (
    index: number,
    field: keyof Product,
    value: string
  ) => void
  onAddService: () => void
  onRemoveService: (index: number) => void
  onAddProduct: () => void
  onRemoveProduct: (index: number) => void
  onDiscountChange: (value: string) => void
  onTaxChange: (value: string) => void
  onNotesChange: (value: string) => void
  onBack: () => void
}

export default function QuoteFormStepTwo({
  services,
  products,
  showServicesSection,
  showProductsSection,
  discount,
  tax,
  subtotal,
  taxAmount,
  total,
  notes,
  loading,
  inputCls,
  labelCls,
  sectionCls,
  formatMoney,
  onServiceChange,
  onProductChange,
  onAddService,
  onRemoveService,
  onAddProduct,
  onRemoveProduct,
  onDiscountChange,
  onTaxChange,
  onNotesChange,
  onBack,
}: QuoteFormStepTwoProps) {
  return (
    <div className="space-y-3.5 p-4">
      {showServicesSection && (
        <div>
          <p className={sectionCls}>
            Servicios
            <button
              type="button"
              onClick={onAddService}
              className="flex items-center gap-1 text-[11px] font-medium normal-case tracking-normal text-blue-500 transition-colors hover:text-blue-600"
            >
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Agregar
            </button>
          </p>

          <div className="space-y-1.5">
            {services.map((service, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_85px_28px] items-center gap-1.5"
              >
                <input
                  className={inputCls}
                  placeholder="Nombre del servicio"
                  value={service.name}
                  onChange={(e) =>
                    onServiceChange(index, "name", e.target.value)
                  }
                />

                <input
                  className={inputCls}
                  placeholder="$0.00"
                  value={service.price || ""}
                  onChange={(e) =>
                    onServiceChange(index, "price", e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() => onRemoveService(index)}
                  className="flex h-[34px] w-[28px] items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-400 transition-colors hover:bg-red-100"
                >
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showProductsSection && (
        <div>
          <p className={sectionCls}>
            Productos
            <button
              type="button"
              onClick={onAddProduct}
              className="flex items-center gap-1 text-[11px] font-medium normal-case tracking-normal text-blue-500 transition-colors hover:text-blue-600"
            >
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Agregar
            </button>
          </p>

          {products.length === 0 ? (
            <p className="py-0.5 text-[11px] text-neutral-400">
              Sin productos agregados
            </p>
          ) : (
            <div className="space-y-1.5">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_55px_75px_28px] items-center gap-1.5"
                >
                  <input
                    className={inputCls}
                    placeholder="Producto"
                    value={product.name}
                    onChange={(e) =>
                      onProductChange(index, "name", e.target.value)
                    }
                  />

                  <input
                    className={inputCls}
                    placeholder="Cant."
                    value={product.quantity || ""}
                    onChange={(e) =>
                      onProductChange(index, "quantity", e.target.value)
                    }
                  />

                  <input
                    className={inputCls}
                    placeholder="$0.00"
                    value={product.price || ""}
                    onChange={(e) =>
                      onProductChange(index, "price", e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => onRemoveProduct(index)}
                    className="flex h-[34px] w-[28px] items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-400 transition-colors hover:bg-red-100"
                  >
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div>
        <p className={sectionCls}>Ajustes</p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Descuento ($)</label>
            <input
              className={inputCls}
              placeholder="0.00"
              value={discount || ""}
              onChange={(e) => onDiscountChange(e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>Impuesto (%)</label>
            <input
              className={inputCls}
              placeholder="16"
              value={tax || ""}
              onChange={(e) => onTaxChange(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-3 space-y-1 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-[12px] text-neutral-600">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-neutral-900">
              {formatMoney(subtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Impuesto</span>
            <span className="font-medium text-neutral-900">
              {formatMoney(taxAmount)}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-neutral-200 pt-2">
            <span className="font-semibold text-neutral-900">Total</span>
            <span className="font-bold text-[#1B3D7A]">
              {formatMoney(total)}
            </span>
          </div>
        </div>
      </div>

      <div>
        <p className={sectionCls}>Notas / Condiciones</p>

        <textarea
          className="h-[72px] w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[12px] text-neutral-900 placeholder:text-neutral-400 transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          placeholder="Forma de pago, vigencia, condiciones especiales..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 text-[12px] font-medium text-neutral-600 transition-all hover:-translate-y-0.5 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-200 active:translate-y-0"
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Atrás
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-9 items-center justify-center rounded-xl bg-[#1B3D7A] px-5 text-[12px] font-semibold !text-white shadow-sm shadow-blue-950/10 transition-all hover:-translate-y-0.5 hover:bg-[#16326a] focus:outline-none focus:ring-2 focus:ring-blue-200 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
          style={{ color: "#FFFFFF" }}
        >
          {loading ? (
            <span
              className="inline-flex items-center gap-1.5 !text-white"
              style={{ color: "#FFFFFF" }}
            >
              <svg
                className="h-3 w-3 animate-spin text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1" />
              </svg>
              Creando...
            </span>
          ) : (
            <span className="!text-white" style={{ color: "#FFFFFF" }}>
              Crear cotización
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
