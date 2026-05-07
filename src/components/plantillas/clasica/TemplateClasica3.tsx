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
  validUntil?: string
  clientRFC?: string
  description?: string
}

type Props = {
  data?: TemplateData
}

const defaultData: {
  title: string
  clientName: string
  companyName: string
  services: ServiceItem[]
  products: ProductItem[]
  total: number
  subtotal: number
} = {
  title: "Cotización demo",
  clientName: "Cliente ejemplo",
  companyName: "Tu Empresa",
  services: [
    {
      name: "Servicio 1",
      description: "Descripción breve del servicio",
      price: 500,
    },
    {
      name: "Servicio 2",
      description: "Descripción breve del servicio",
      price: 800,
    },
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
  const taxableBase = Math.max(0, subtotal - discount)
  const taxAmount = taxableBase * (tax / 100)
  const finalTotal = Number(safeData.total ?? taxableBase + taxAmount)

  const initials = String(safeData.companyName || "TE")
    .trim()
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      style={{
        width: 595,
        minHeight: 842,
        background: "#ffffff",
        color: "#1a2e1a",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#f0fdf4",
          borderBottom: "2px solid #bbf7d0",
          padding: "30px 38px 25px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -42,
            right: -20,
            width: 142,
            height: 142,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.09)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: -34,
            left: 165,
            width: 92,
            height: 92,
            borderRadius: "50%",
            background: "rgba(34,197,94,0.07)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 20,
            position: "relative",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 12,
                background: "#dcfce7",
                border: "1px solid #bbf7d0",
                borderRadius: 999,
                padding: "4px 12px",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#16a34a",
                  flexShrink: 0,
                }}
              />

              <span
                style={{
                  fontSize: 9.5,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#15803d",
                }}
              >
                Documento comercial
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 31,
                fontWeight: 850,
                letterSpacing: "-0.035em",
                lineHeight: 1.08,
                color: "#14532d",
              }}
            >
              {safeData.title || "Cotización"}
            </h1>

            {safeData.description ? (
              <p
                style={{
                  margin: "9px 0 0",
                  fontSize: 12,
                  lineHeight: 1.55,
                  color: "#4b7a52",
                  maxWidth: 325,
                }}
              >
                {safeData.description}
              </p>
            ) : null}

            <div
              style={{
                marginTop: 13,
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 10.5,
                color: "#4b7a52",
              }}
            >
              <span
                style={{
                  background: "#ffffff",
                  border: "1px solid #bbf7d0",
                  borderRadius: 7,
                  padding: "3px 9px",
                  fontWeight: 700,
                  color: "#15803d",
                }}
              >
                {safeData.docNumber || "COT-001"}
              </span>

              <span style={{ opacity: 0.5 }}>·</span>
              <span>{today}</span>

              {safeData.validUntil && (
                <>
                  <span style={{ opacity: 0.5 }}>·</span>
                  <span>Vigencia: {safeData.validUntil}</span>
                </>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 9,
              flexShrink: 0,
            }}
          >
            {safeData.companyLogo ? (
              <div
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 16,
                  background: "#ffffff",
                  border: "1.5px solid #bbf7d0",
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={safeData.companyLogo}
                  alt="Logo"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #16a34a, #15803d)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 850,
                  boxShadow: "0 6px 16px rgba(22,163,74,0.27)",
                }}
              >
                {initials}
              </div>
            )}

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#14532d",
                  lineHeight: 1.2,
                  maxWidth: 145,
                }}
              >
                {safeData.companyName || "Tu Empresa"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "20px 38px 16px",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 16,
          background: "#ffffff",
          borderBottom: "1px solid #f0fdf4",
        }}
      >
        <div>
          <p
            style={{
              fontSize: 9.5,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#6b7280",
              margin: "0 0 10px",
            }}
          >
            Preparado para
          </p>

          <p
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#14532d",
              margin: "0 0 7px",
              lineHeight: 1.2,
            }}
          >
            {safeData.clientName || "Cliente ejemplo"}
          </p>

          <div style={{ fontSize: 11, lineHeight: 1.75, color: "#4b5563" }}>
            {safeData.clientEmail && <div>{safeData.clientEmail}</div>}
            {safeData.clientPhone && <div>{safeData.clientPhone}</div>}
            {safeData.clientAddress && <div>{safeData.clientAddress}</div>}
            {safeData.clientRFC && <div>RFC: {safeData.clientRFC}</div>}

            {!safeData.clientEmail &&
              !safeData.clientPhone &&
              !safeData.clientAddress && (
                <div style={{ color: "#9ca3af" }}>
                  Sin datos de contacto adicionales.
                </div>
              )}
          </div>
        </div>

        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 14,
            padding: "16px 17px",
          }}
        >
          <p
            style={{
              fontSize: 9.5,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#6b7280",
              margin: "0 0 11px",
            }}
          >
            Resumen
          </p>

          <div
            style={{
              display: "grid",
              gap: 7,
              fontSize: 11.5,
              color: "#374151",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Servicios</span>
              <strong style={{ color: "#14532d" }}>{services.length}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Productos</span>
              <strong style={{ color: "#14532d" }}>{products.length}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Impuesto</span>
              <strong style={{ color: "#14532d" }}>{tax}%</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Descuento</span>
              <strong style={{ color: "#14532d" }}>
                {formatCurrency(discount)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "18px 38px 14px" }}>
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 0.5fr 1fr 1fr",
              gap: 8,
              padding: "11px 15px",
              background: "#f9fafb",
              borderBottom: "1px solid #e5e7eb",
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#6b7280",
            }}
          >
            <div>Descripción</div>
            <div>Detalle</div>
            <div style={{ textAlign: "center" }}>Cant.</div>
            <div style={{ textAlign: "right" }}>P. Unit.</div>
            <div style={{ textAlign: "right" }}>Importe</div>
          </div>

          {items.length > 0 ? (
            items.map((item, i) => (
              <div
                key={`${item.type}-${i}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 0.5fr 1fr 1fr",
                  gap: 8,
                  padding: "13px 15px",
                  borderTop: i === 0 ? "none" : "1px solid #f3f4f6",
                  background: i % 2 === 0 ? "#ffffff" : "#fafafa",
                  fontSize: 12,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    color: "#1a2e1a",
                    lineHeight: 1.35,
                  }}
                >
                  {item.name}
                </div>

                <div style={{ fontSize: 11, color: "#6b7280" }}>
                  {item.description || (
                    <span style={{ color: "#d1d5db" }}>Sin desc.</span>
                  )}
                </div>

                <div style={{ textAlign: "center", color: "#6b7280" }}>
                  {item.quantity}
                </div>

                <div style={{ textAlign: "right", color: "#6b7280" }}>
                  {formatCurrency(item.price)}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 800,
                    color: "#15803d",
                  }}
                >
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "26px 14px",
                textAlign: "center",
                fontSize: 12,
                color: "#9ca3af",
              }}
            >
              No hay conceptos agregados en esta cotización.
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          padding: "0 38px 16px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            width: 262,
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "14px 16px", background: "#ffffff" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
                paddingBottom: 7,
                borderBottom: "1px solid #f3f4f6",
                fontSize: 11.5,
                color: "#6b7280",
              }}
            >
              <span>Subtotal</span>
              <span style={{ fontWeight: 700, color: "#374151" }}>
                {formatCurrency(subtotal)}
              </span>
            </div>

            {tax > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 7,
                  paddingBottom: 7,
                  borderBottom: "1px solid #f3f4f6",
                  fontSize: 11.5,
                  color: "#6b7280",
                }}
              >
                <span>IVA ({tax}%)</span>
                <span style={{ fontWeight: 700, color: "#374151" }}>
                  {formatCurrency(taxAmount)}
                </span>
              </div>
            )}

            {discount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11.5,
                  color: "#6b7280",
                }}
              >
                <span>Descuento</span>
                <span style={{ fontWeight: 700, color: "#16a34a" }}>
                  − {formatCurrency(discount)}
                </span>
              </div>
            )}
          </div>

          <div
            style={{
              padding: "14px 16px",
              background: "#16a34a",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -15,
                top: -15,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
              }}
            />

            <span
              style={{
                fontSize: 10.5,
                fontWeight: 850,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "#dcfce7",
              }}
            >
              Total
            </span>

            <span style={{ fontSize: 19, fontWeight: 850, color: "#ffffff" }}>
              {formatCurrency(finalTotal)}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 38px 18px" }}>
        <p
          style={{
            fontSize: 9.5,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#6b7280",
            margin: "0 0 8px",
          }}
        >
          Notas / Condiciones
        </p>

        <div
          style={{
            border: "1px dashed #bbf7d0",
            borderRadius: 12,
            padding: "14px 16px",
            minHeight: 58,
            background: "#f0fdf4",
          }}
        >
          {safeData.notes ? (
            <p
              style={{
                fontSize: 11,
                lineHeight: 1.7,
                color: "#374151",
                whiteSpace: "pre-line",
                margin: 0,
              }}
            >
              {safeData.notes}
            </p>
          ) : (
            <p
              style={{
                fontSize: 11,
                color: "#9ca3af",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              Sin observaciones
            </p>
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          background: "#16a34a",
          padding: "12px 38px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 10, color: "#dcfce7", fontWeight: 700 }}>
          {safeData.companyName || "Tu Empresa"}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          {[6, 12, 6].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 2,
                borderRadius: 999,
                background: i === 1 ? "#ffffff" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>

        <span style={{ fontSize: 10, color: "#dcfce7" }}>
          Documento generado digitalmente
        </span>
      </div>
    </div>
  )
}