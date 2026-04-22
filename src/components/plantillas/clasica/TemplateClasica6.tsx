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

export default function TemplateClasica6({ data }: Props) {
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
        background: "#f0f4f8",
        color: "#0f2744",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── HEADER con layout asimétrico ── */}
      <div
        style={{
          display: "flex",
          minHeight: 148,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Bloque izquierdo oscuro */}
        <div
          style={{
            width: 340,
            background: "#0f2744",
            padding: "26px 26px 22px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -35,
              left: -20,
              width: 110,
              height: 110,
              borderRadius: "50%",
              background: "rgba(56,189,248,0.07)",
              pointerEvents: "none",
            }}
          />

          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 2,
                  borderRadius: 999,
                  background: "#38bdf8",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "#7dd3fc",
                  whiteSpace: "nowrap",
                }}
              >
                Cotización profesional
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "#ffffff",
                maxWidth: 270,
              }}
            >
              {safeData.title || "Cotización"}
            </h1>

            {safeData.description ? (
              <p
                style={{
                  margin: "7px 0 0",
                  fontSize: 10,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.48)",
                  maxWidth: 270,
                }}
              >
                {safeData.description}
              </p>
            ) : null}
          </div>

          <div
            style={{
              marginTop: 12,
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              fontSize: 9,
            }}
          >
            <span
              style={{
                background: "rgba(56,189,248,0.15)",
                border: "1px solid rgba(56,189,248,0.25)",
                borderRadius: 5,
                padding: "2px 8px",
                fontWeight: 700,
                color: "#7dd3fc",
              }}
            >
              {safeData.docNumber || "COT-001"}
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
            <span style={{ color: "rgba(255,255,255,0.45)" }}>{today}</span>
            {safeData.validUntil && (
              <>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                <span style={{ color: "rgba(255,255,255,0.45)" }}>
                  Vigencia: {safeData.validUntil}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Bloque derecho claro */}
        <div
          style={{
            flex: 1,
            background: "#1e4069",
            padding: "22px 24px 18px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -25,
              right: -15,
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "rgba(56,189,248,0.06)",
              pointerEvents: "none",
            }}
          />

          {safeData.companyLogo ? (
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 13,
                background: "#ffffff",
                border: "1.5px solid rgba(56,189,248,0.3)",
                padding: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                flexShrink: 0,
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
                borderRadius: 13,
                background: "linear-gradient(135deg, #38bdf8, #0284c7)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 17,
                fontWeight: 800,
                boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                flexShrink: 0,
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
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              {safeData.companyName || "Tu Empresa"}
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 9,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6,
              }}
            >
              <div>Documento comercial</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CLIENTE + RESUMEN ── */}
      <div
        style={{
          padding: "14px 24px 12px",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 12,
        }}
      >
        {/* Cliente */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(15,39,68,0.06)",
          }}
        >
          <div
            style={{
              padding: "8px 14px",
              background: "#e0f2fe",
              borderBottom: "1px solid #bae6fd",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <div
              style={{
                width: 3,
                height: 13,
                borderRadius: 999,
                background: "#0284c7",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 8,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#0369a1",
              }}
            >
              Datos del cliente
            </span>
          </div>
          <div style={{ padding: "12px 14px" }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#0f2744",
                marginBottom: 6,
              }}
            >
              {safeData.clientName || "Cliente ejemplo"}
            </div>
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
        </div>

        {/* Resumen */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(15,39,68,0.06)",
          }}
        >
          <div
            style={{
              padding: "8px 14px",
              background: "#0f2744",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <div
              style={{
                width: 3,
                height: 13,
                borderRadius: 999,
                background: "#38bdf8",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 8,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#7dd3fc",
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
              color: "#475569",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Servicios</span>
              <strong style={{ color: "#0f2744" }}>{services.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Productos</span>
              <strong style={{ color: "#0f2744" }}>{products.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>IVA</span>
              <strong style={{ color: "#0f2744" }}>{tax}%</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Descuento</span>
              <strong style={{ color: "#0f2744" }}>{formatCurrency(discount)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLA ── */}
      <div style={{ padding: "0 24px 12px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(15,39,68,0.06)",
          }}
        >
          {/* Thead */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 0.5fr 1fr 1fr",
              gap: 8,
              padding: "9px 14px",
              background: "#0f2744",
              fontSize: 8.5,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.13em",
              color: "#7dd3fc",
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
                    color: "#0f2744",
                    lineHeight: 1.35,
                  }}
                >
                  {item.name}
                </div>
                <div style={{ fontSize: 9.5, color: "#64748b" }}>
                  {item.description || (
                    <span style={{ color: "#cbd5e1" }}>Sin desc.</span>
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
                    color: "#0284c7",
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
          padding: "0 24px 14px",
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
              color: "#94a3b8",
              marginBottom: 7,
            }}
          >
            Notas
          </p>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: 10,
              padding: "12px 14px",
              minHeight: 60,
              boxShadow: "0 1px 4px rgba(15,39,68,0.05)",
            }}
          >
            {safeData.notes ? (
              <p
                style={{
                  fontSize: 10,
                  lineHeight: 1.7,
                  color: "#475569",
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
            border: "1px solid #cbd5e1",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(15,39,68,0.06)",
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
              <span style={{ fontWeight: 600, color: "#0f2744" }}>
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
                <span style={{ fontWeight: 600, color: "#0f2744" }}>
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
              background: "#0f2744",
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
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: "linear-gradient(90deg, #0284c7, #38bdf8, #7dd3fc)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -14,
                bottom: -14,
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(56,189,248,0.07)",
              }}
            />
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#7dd3fc",
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
          background: "#0f2744",
          padding: "10px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 9, color: "#7dd3fc", fontWeight: 600 }}>
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
                background: i === 1 ? "#38bdf8" : "rgba(56,189,248,0.35)",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>
          Documento generado digitalmente
        </span>
      </div>
    </div>
  )
}
