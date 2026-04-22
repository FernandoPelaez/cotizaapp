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
  clientRFC?: string
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

export default function TemplateClasica5({ data }: Props) {
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

  const initials = String(safeData.companyName || "TE")
    .trim()
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      style={{
        width: 595,
        minHeight: 842,
        background: "#f9f7f4",
        color: "#1c1917",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── FRANJA SUPERIOR DE COLOR ── */}
      <div
        style={{
          height: 6,
          background: "linear-gradient(90deg, #ea580c 0%, #f97316 50%, #fb923c 100%)",
        }}
      />

      {/* ── HEADER ── */}
      <div
        style={{
          background: "#ffffff",
          padding: "22px 30px 18px",
          borderBottom: "1px solid #f0ebe4",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorativo fondo */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -20,
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "rgba(249,115,22,0.05)",
            pointerEvents: "none",
          }}
        />

        {/* Izquierda */}
        <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 9,
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: 999,
              padding: "3px 10px",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#ea580c",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 8,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#c2410c",
              }}
            >
              Documento comercial
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 25,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              color: "#1c1917",
            }}
          >
            {safeData.title || "Cotización"}
          </h1>

          {safeData.description ? (
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 10.5,
                lineHeight: 1.6,
                color: "#78716c",
                maxWidth: 280,
              }}
            >
              {safeData.description}
            </p>
          ) : null}

          <div
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 9.5,
              color: "#78716c",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: 5,
                padding: "2px 8px",
                fontWeight: 700,
                color: "#c2410c",
                fontSize: 9,
              }}
            >
              {safeData.docNumber || "COT-001"}
            </span>
            <span style={{ color: "#d6d3d1", fontSize: 8 }}>|</span>
            <span>{today}</span>
            {safeData.validUntil && (
              <>
                <span style={{ color: "#d6d3d1", fontSize: 8 }}>|</span>
                <span>Vigencia: {safeData.validUntil}</span>
              </>
            )}
          </div>
        </div>

        {/* Derecha: logo + empresa */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 8,
            flexShrink: 0,
            position: "relative",
          }}
        >
          {safeData.companyLogo ? (
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: "#ffffff",
                border: "1.5px solid #fed7aa",
                padding: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: "0 3px 10px rgba(234,88,12,0.1)",
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
                width: 56,
                height: 56,
                borderRadius: 12,
                background: "linear-gradient(135deg, #ea580c, #f97316)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 17,
                fontWeight: 800,
                boxShadow: "0 3px 10px rgba(234,88,12,0.2)",
              }}
            >
              {initials}
            </div>
          )}

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1c1917",
                lineHeight: 1.2,
              }}
            >
              {safeData.companyName || "Tu Empresa"}
            </div>
          </div>
        </div>
      </div>

      {/* ── CLIENTE + RESUMEN (layout horizontal diferente) ── */}
      <div
        style={{
          padding: "14px 30px 12px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        {/* Cliente */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #f0ebe4",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "7px 13px",
              background: "#fff7ed",
              borderBottom: "1px solid #fed7aa",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: "#ea580c",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#ffffff",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 8,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#c2410c",
              }}
            >
              Cliente
            </span>
          </div>
          <div style={{ padding: "12px 14px" }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1c1917",
                marginBottom: 6,
              }}
            >
              {safeData.clientName || "Cliente ejemplo"}
            </div>
            <div style={{ fontSize: 9.5, lineHeight: 1.75, color: "#57534e" }}>
              {safeData.clientEmail && <div>{safeData.clientEmail}</div>}
              {safeData.clientPhone && <div>{safeData.clientPhone}</div>}
              {safeData.clientAddress && <div>{safeData.clientAddress}</div>}
              {safeData.clientRFC && <div>RFC: {safeData.clientRFC}</div>}
              {!safeData.clientEmail &&
                !safeData.clientPhone &&
                !safeData.clientAddress && (
                  <div style={{ color: "#a8a29e" }}>
                    Sin datos de contacto adicionales.
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Resumen */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #f0ebe4",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "7px 13px",
              background: "#1c1917",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: "#f97316",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#ffffff",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 8,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#fed7aa",
              }}
            >
              Resumen
            </span>
          </div>
          <div
            style={{
              padding: "12px 14px",
              display: "grid",
              gap: 6,
              fontSize: 10.5,
              color: "#57534e",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Servicios</span>
              <strong style={{ color: "#1c1917" }}>{services.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Productos</span>
              <strong style={{ color: "#1c1917" }}>{products.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Impuesto</span>
              <strong style={{ color: "#1c1917" }}>{tax}%</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Descuento</span>
              <strong style={{ color: "#1c1917" }}>{formatCurrency(discount)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLA ── */}
      <div style={{ padding: "0 30px 12px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #f0ebe4",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {/* Thead */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 0.5fr 1fr 1fr",
              gap: 8,
              padding: "9px 14px",
              background: "#1c1917",
              fontSize: 8.5,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.13em",
              color: "#fed7aa",
            }}
          >
            <div>Concepto</div>
            <div>Detalle</div>
            <div style={{ textAlign: "center" }}>Cant.</div>
            <div style={{ textAlign: "right" }}>Precio</div>
            <div style={{ textAlign: "right" }}>Total</div>
          </div>

          {items.length > 0 ? (
            items.map((item, i) => (
              <div
                key={`${item.type}-${i}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 0.5fr 1fr 1fr",
                  gap: 8,
                  padding: "11px 14px",
                  borderTop: i === 0 ? "none" : "1px solid #fafaf9",
                  background: i % 2 === 0 ? "#ffffff" : "#fafaf8",
                  fontSize: 11,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: "#1c1917",
                    lineHeight: 1.35,
                  }}
                >
                  {item.name}
                </div>
                <div style={{ fontSize: 9.5, color: "#78716c" }}>
                  {item.description || (
                    <span style={{ color: "#d6d3d1" }}>Sin desc.</span>
                  )}
                </div>
                <div style={{ textAlign: "center", color: "#78716c" }}>
                  {item.quantity}
                </div>
                <div style={{ textAlign: "right", color: "#78716c" }}>
                  {formatCurrency(item.price)}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#c2410c",
                  }}
                >
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "22px 14px",
                textAlign: "center",
                fontSize: 11,
                color: "#a8a29e",
              }}
            >
              No hay conceptos agregados en esta cotización.
            </div>
          )}
        </div>
      </div>

      {/* ── NOTAS + TOTALES ── */}
      <div
        style={{
          padding: "0 30px 14px",
          display: "grid",
          gridTemplateColumns: "1fr 210px",
          gap: 12,
          alignItems: "start",
        }}
      >
        {/* Notas */}
        <div>
          <p
            style={{
              fontSize: 8,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#a8a29e",
              marginBottom: 7,
            }}
          >
            Notas
          </p>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #f0ebe4",
              borderRadius: 10,
              padding: "12px 14px",
              minHeight: 60,
            }}
          >
            {safeData.notes ? (
              <p
                style={{
                  fontSize: 10,
                  lineHeight: 1.7,
                  color: "#57534e",
                  whiteSpace: "pre-line",
                }}
              >
                {safeData.notes}
              </p>
            ) : (
              <p
                style={{
                  fontSize: 10,
                  color: "#a8a29e",
                  fontStyle: "italic",
                }}
              >
                Sin observaciones
              </p>
            )}
          </div>
        </div>

        {/* Totales */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #f0ebe4",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "12px 14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                paddingBottom: 6,
                borderBottom: "1px solid #f5f5f4",
                fontSize: 10.5,
                color: "#78716c",
              }}
            >
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: "#1c1917" }}>
                {formatCurrency(subtotal)}
              </span>
            </div>

            {tax > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                  paddingBottom: 6,
                  borderBottom: "1px solid #f5f5f4",
                  fontSize: 10.5,
                  color: "#78716c",
                }}
              >
                <span>IVA ({tax}%)</span>
                <span style={{ fontWeight: 600, color: "#1c1917" }}>
                  {formatCurrency(taxAmount)}
                </span>
              </div>
            )}

            {discount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10.5,
                  color: "#78716c",
                }}
              >
                <span>Descuento</span>
                <span style={{ fontWeight: 600, color: "#16a34a" }}>
                  − {formatCurrency(discount)}
                </span>
              </div>
            )}
          </div>

          {/* Total destacado */}
          <div
            style={{
              padding: "12px 14px",
              background: "linear-gradient(135deg, #ea580c, #f97316)",
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
                right: -12,
                bottom: -12,
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#ffedd5",
              }}
            >
              Total
            </span>
            <span style={{ fontSize: 17, fontWeight: 800, color: "#ffffff" }}>
              {formatCurrency(finalTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div
        style={{
          marginTop: "auto",
          borderTop: "1px solid #f0ebe4",
          padding: "10px 30px",
          background: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 9,
            color: "#78716c",
            fontWeight: 600,
          }}
        >
          {safeData.companyName || "Tu Empresa"}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          {[6, 14, 6].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 2,
                borderRadius: 999,
                background: i === 1 ? "#f97316" : "#fed7aa",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 9, color: "#78716c" }}>
          Documento generado digitalmente
        </span>
      </div>
    </div>
  )
}
