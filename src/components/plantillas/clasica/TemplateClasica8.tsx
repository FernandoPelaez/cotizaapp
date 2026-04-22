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
        color: "#18181b",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── FRANJA SUPERIOR ── */}
      <div
        style={{
          height: 5,
          background: "linear-gradient(90deg, #0f766e 0%, #14b8a6 50%, #5eead4 100%)",
        }}
      />

      {/* ── HEADER ── */}
      <div
        style={{
          background: "#0f172a",
          padding: "24px 30px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorativos */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -20,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(20,184,166,0.07)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: 120,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(20,184,166,0.05)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            position: "relative",
          }}
        >
          {/* Izquierda */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 10,
                background: "rgba(20,184,166,0.12)",
                border: "1px solid rgba(20,184,166,0.2)",
                borderRadius: 999,
                padding: "3px 10px",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#14b8a6",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "#5eead4",
                  whiteSpace: "nowrap",
                }}
              >
                Cotización de servicios
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 27,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "#ffffff",
              }}
            >
              {safeData.title || "Cotización"}
            </h1>

            {safeData.description ? (
              <p
                style={{
                  margin: "7px 0 0",
                  fontSize: 10.5,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.45)",
                  maxWidth: 285,
                }}
              >
                {safeData.description}
              </p>
            ) : null}

            <div
              style={{
                marginTop: 11,
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
                fontSize: 9,
              }}
            >
              <span
                style={{
                  background: "rgba(20,184,166,0.15)",
                  border: "1px solid rgba(20,184,166,0.25)",
                  borderRadius: 5,
                  padding: "2px 8px",
                  fontWeight: 700,
                  color: "#5eead4",
                }}
              >
                {safeData.docNumber || "COT-001"}
              </span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
              <span style={{ color: "rgba(255,255,255,0.42)" }}>{today}</span>
              {safeData.validUntil && (
                <>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
                  <span style={{ color: "rgba(255,255,255,0.42)" }}>
                    Vigencia: {safeData.validUntil}
                  </span>
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
              gap: 9,
              flexShrink: 0,
              position: "relative",
            }}
          >
            {safeData.companyLogo ? (
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 14,
                  background: "#ffffff",
                  border: "1.5px solid rgba(20,184,166,0.3)",
                  padding: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
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
                  width: 58,
                  height: 58,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 800,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                }}
              >
                {initials}
              </div>
            )}

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.2,
                }}
              >
                {safeData.companyName || "Tu Empresa"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CLIENTE + RESUMEN ── */}
      <div
        style={{
          padding: "14px 30px 12px",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 12,
          background: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        {/* Cliente */}
        <div>
          <p
            style={{
              fontSize: 8,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "#0f766e",
              marginBottom: 7,
            }}
          >
            Cliente
          </p>
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 5,
            }}
          >
            {safeData.clientName || "Cliente ejemplo"}
          </p>
          <div style={{ fontSize: 9.5, lineHeight: 1.75, color: "#475569" }}>
            {safeData.clientEmail && <div>{safeData.clientEmail}</div>}
            {safeData.clientPhone && <div>{safeData.clientPhone}</div>}
            {safeData.clientAddress && <div>{safeData.clientAddress}</div>}
            {safeData.clientRFC && <div>RFC: {safeData.clientRFC}</div>}
            {!safeData.clientEmail &&
              !safeData.clientPhone &&
              !safeData.clientAddress && (
                <div style={{ color: "#94a3b8" }}>
                  Sin datos de contacto adicionales.
                </div>
              )}
          </div>
        </div>

        {/* Resumen */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              padding: "7px 13px",
              background: "#f0fdfa",
              borderBottom: "1px solid #ccfbf1",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 3,
                height: 12,
                borderRadius: 999,
                background: "#0f766e",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 8,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#0f766e",
              }}
            >
              Resumen
            </span>
          </div>
          <div
            style={{
              padding: "11px 13px",
              display: "grid",
              gap: 6,
              fontSize: 10.5,
              color: "#475569",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Servicios</span>
              <strong style={{ color: "#0f172a" }}>{services.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Productos</span>
              <strong style={{ color: "#0f172a" }}>{products.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>IVA</span>
              <strong style={{ color: "#0f172a" }}>{tax}%</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Descuento</span>
              <strong style={{ color: "#0f172a" }}>{formatCurrency(discount)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLA ── */}
      <div style={{ padding: "14px 30px 12px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          {/* Thead */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 0.5fr 1fr 1fr",
              gap: 8,
              padding: "9px 14px",
              background: "#0f172a",
              fontSize: 8.5,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.13em",
              color: "#5eead4",
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
                  borderTop: i === 0 ? "none" : "1px solid #f1f5f9",
                  background: i % 2 === 0 ? "#ffffff" : "#f8fafc",
                  fontSize: 11,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: "#0f172a",
                    lineHeight: 1.35,
                  }}
                >
                  {item.name}
                </div>
                <div style={{ fontSize: 9.5, color: "#64748b" }}>
                  {item.description || (
                    <span style={{ color: "#cbd5e1" }}>Sin descripción</span>
                  )}
                </div>
                <div style={{ textAlign: "center", color: "#64748b" }}>
                  {item.quantity}
                </div>
                <div style={{ textAlign: "right", color: "#64748b" }}>
                  {formatCurrency(item.price)}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#0f766e",
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
                color: "#94a3b8",
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
              color: "#0f766e",
              marginBottom: 7,
            }}
          >
            Notas
          </p>
          <div
            style={{
              background: "#f0fdfa",
              borderLeft: "3.5px solid #14b8a6",
              borderRadius: "0 10px 10px 0",
              padding: "12px 14px",
              minHeight: 60,
            }}
          >
            {safeData.notes ? (
              <p
                style={{
                  fontSize: 10,
                  lineHeight: 1.7,
                  color: "#334155",
                  whiteSpace: "pre-line",
                }}
              >
                {safeData.notes}
              </p>
            ) : (
              <p style={{ fontSize: 10, color: "#94a3b8", fontStyle: "italic" }}>
                Sin observaciones
              </p>
            )}
          </div>
        </div>

        {/* Totales */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ padding: "12px 14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                paddingBottom: 6,
                borderBottom: "1px solid #f1f5f9",
                fontSize: 10.5,
                color: "#64748b",
              }}
            >
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: "#0f172a" }}>
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
                  borderBottom: "1px solid #f1f5f9",
                  fontSize: 10.5,
                  color: "#64748b",
                }}
              >
                <span>IVA ({tax}%)</span>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>
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
                  color: "#64748b",
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
              background: "linear-gradient(135deg, #0f766e, #14b8a6)",
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
                top: -12,
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
                color: "#ccfbf1",
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
          background: "#0f172a",
          padding: "10px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 9, color: "#5eead4", fontWeight: 600 }}>
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
                background: i === 1 ? "#14b8a6" : "rgba(20,184,166,0.35)",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>
          Documento válido por 30 días
        </span>
      </div>
    </div>
  )
}
