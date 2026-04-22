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
  description: "Documento comercial personalizado.",
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
  notes: "Gracias por tu preferencia.",
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

export default function TemplateClasica4({ data }: Props) {
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
      style={{
        width: 595,
        minHeight: 842,
        background: "#fff8fa",
        color: "#4a1628",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #fce7ef 0%, #fdf2f5 60%, #fff0f5 100%)",
          borderBottom: "1.5px solid #f9c6d4",
          padding: "24px 30px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorativos */}
        <div
          style={{
            position: "absolute",
            top: -35,
            right: -25,
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: "rgba(236,72,153,0.07)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: 100,
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "rgba(244,114,182,0.06)",
            pointerEvents: "none",
          }}
        />
        {/* Flores decorativas */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 14,
            fontSize: 22,
            opacity: 0.18,
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          ✿
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 14,
            fontSize: 14,
            opacity: 0.13,
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          ✿
        </div>

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
                background: "rgba(255,255,255,0.7)",
                border: "1px solid #f9c6d4",
                borderRadius: 999,
                padding: "3px 11px",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#e8678a",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "#c0395a",
                }}
              >
                Propuesta de servicios
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "#7c1d3a",
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
                  color: "#a0526a",
                  maxWidth: 285,
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
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  background: "#ffffff",
                  border: "1px solid #f9c6d4",
                  borderRadius: 6,
                  padding: "2px 9px",
                  fontWeight: 700,
                  color: "#c0395a",
                }}
              >
                {safeData.docNumber || "COT-001"}
              </span>
              <span style={{ color: "#d4a0ae", fontSize: 8 }}>●</span>
              <span style={{ color: "#a0526a" }}>
                {safeData.date || new Date().toLocaleDateString("es-MX")}
              </span>
              {safeData.validUntil && (
                <>
                  <span style={{ color: "#d4a0ae", fontSize: 8 }}>●</span>
                  <span style={{ color: "#a0526a" }}>
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
            }}
          >
            {safeData.companyLogo ? (
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: "#ffffff",
                  border: "1.5px solid #f9c6d4",
                  padding: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 4px 14px rgba(201,79,106,0.12)",
                }}
              >
                <img
                  src={safeData.companyLogo}
                  alt="Logo de la empresa"
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
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #e8678a, #c0395a)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 19,
                  fontWeight: 800,
                  boxShadow: "0 4px 14px rgba(201,79,106,0.22)",
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
                  color: "#7c1d3a",
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
          padding: "15px 30px 12px",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 12,
          background: "#ffffff",
          borderBottom: "1px solid #fce7ef",
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
              color: "#e8a0b4",
              marginBottom: 7,
            }}
          >
            Cliente
          </p>
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#7c1d3a",
              marginBottom: 6,
            }}
          >
            {safeData.clientName || "Cliente ejemplo"}
          </p>
          <div style={{ fontSize: 10, lineHeight: 1.75, color: "#9a5068" }}>
            {safeData.clientEmail && <div>{safeData.clientEmail}</div>}
            {safeData.clientPhone && <div>{safeData.clientPhone}</div>}
            {safeData.clientAddress && <div>{safeData.clientAddress}</div>}
            {safeData.clientRFC && <div>RFC: {safeData.clientRFC}</div>}
            {!safeData.clientEmail &&
              !safeData.clientPhone &&
              !safeData.clientAddress &&
              !safeData.clientRFC && (
                <div style={{ color: "#d4a0ae" }}>
                  Sin datos de contacto adicionales.
                </div>
              )}
          </div>
        </div>

        {/* Resumen */}
        <div
          style={{
            background: "#fff0f4",
            border: "1px solid #f9c6d4",
            borderRadius: 12,
            padding: "12px 14px",
          }}
        >
          <p
            style={{
              fontSize: 8,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "#e8a0b4",
              marginBottom: 8,
            }}
          >
            Resumen
          </p>
          <div style={{ display: "grid", gap: 6, fontSize: 10.5, color: "#7c4560" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Conceptos</span>
              <strong style={{ color: "#7c1d3a" }}>{items.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>IVA</span>
              <strong style={{ color: "#7c1d3a" }}>{tax}%</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Descuento</span>
              <strong style={{ color: "#7c1d3a" }}>{formatCurrency(discount)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Vigencia</span>
              <strong style={{ color: "#7c1d3a" }}>{safeData.validUntil || "—"}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLA ── */}
      <div style={{ padding: "14px 30px 12px" }}>
        <div
          style={{
            border: "1px solid #f9c6d4",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {/* Thead */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 0.7fr 0.5fr 1fr 1fr",
              gap: 8,
              padding: "9px 14px",
              background: "#fff0f4",
              borderBottom: "1px solid #f9c6d4",
              fontSize: 8.5,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#c0395a",
            }}
          >
            <div>Concepto</div>
            <div>Tipo</div>
            <div style={{ textAlign: "center" }}>Cant.</div>
            <div style={{ textAlign: "right" }}>Precio</div>
            <div style={{ textAlign: "right" }}>Total</div>
          </div>

          {items.length > 0 ? (
            items.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 0.7fr 0.5fr 1fr 1fr",
                  gap: 8,
                  padding: "11px 14px",
                  borderTop: i === 0 ? "none" : "1px solid #fce7ef",
                  background: i % 2 === 0 ? "#ffffff" : "#fff8fa",
                  fontSize: 11,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    color: "#7c1d3a",
                    lineHeight: 1.35,
                  }}
                >
                  {item.name}
                </div>
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 7px",
                      borderRadius: 999,
                      fontSize: 8.5,
                      fontWeight: 700,
                      background: item.type === "service" ? "#fff0f4" : "#fdf2f5",
                      color: item.type === "service" ? "#c0395a" : "#9a5068",
                      border: `1px solid ${item.type === "service" ? "#f9c6d4" : "#f3d6dd"}`,
                    }}
                  >
                    {item.type === "service" ? "Servicio" : "Producto"}
                  </span>
                </div>
                <div style={{ textAlign: "center", color: "#9a5068" }}>
                  {item.quantity}
                </div>
                <div style={{ textAlign: "right", color: "#9a5068" }}>
                  {formatCurrency(item.price)}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#c0395a",
                  }}
                >
                  {formatCurrency(item.amount)}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "22px 14px",
                textAlign: "center",
                fontSize: 11,
                color: "#d4a0ae",
              }}
            >
              No hay conceptos agregados en esta cotización.
            </div>
          )}
        </div>
      </div>

      {/* ── TOTALES ── */}
      <div
        style={{
          padding: "0 30px 12px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            width: 230,
            border: "1px solid #f9c6d4",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "12px 14px", background: "#ffffff" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                paddingBottom: 6,
                borderBottom: "1px solid #fce7ef",
                fontSize: 10.5,
                color: "#9a5068",
              }}
            >
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: "#7c1d3a" }}>
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
                  borderBottom: "1px solid #fce7ef",
                  fontSize: 10.5,
                  color: "#9a5068",
                }}
              >
                <span>IVA ({tax}%)</span>
                <span style={{ fontWeight: 600, color: "#7c1d3a" }}>
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
                  color: "#9a5068",
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
              background: "linear-gradient(135deg, #c0395a, #e8678a)",
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
                right: -14,
                top: -14,
                width: 55,
                height: 55,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: -10,
                bottom: -10,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#ffd6e4",
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

      {/* ── NOTAS ── */}
      <div style={{ padding: "0 30px 16px" }}>
        <p
          style={{
            fontSize: 8,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "#e8a0b4",
            marginBottom: 7,
          }}
        >
          Notas
        </p>
        <div
          style={{
            border: "1px dashed #f9c6d4",
            borderRadius: 10,
            padding: "12px 14px",
            minHeight: 52,
            background: "#fff8fa",
          }}
        >
          {safeData.notes ? (
            <p
              style={{
                fontSize: 10,
                lineHeight: 1.7,
                color: "#7c4560",
                whiteSpace: "pre-line",
              }}
            >
              {safeData.notes}
            </p>
          ) : (
            <p
              style={{
                fontSize: 10,
                color: "#d4a0ae",
                fontStyle: "italic",
              }}
            >
              Sin observaciones
            </p>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div
        style={{
          marginTop: "auto",
          background: "linear-gradient(90deg, #fce7ef, #fdf2f5)",
          borderTop: "1.5px solid #f9c6d4",
          padding: "10px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 9, color: "#c0395a", fontWeight: 700 }}>
          ✿ Gracias por tu preferencia
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          {[5, 10, 5].map((w, i) => (
            <div
              key={i}
              style={{
                width: w,
                height: 2,
                borderRadius: 999,
                background: i === 1 ? "#e8678a" : "#f9c6d4",
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 9, color: "#c0395a", fontWeight: 700 }}>
          {safeData.companyName || "Tu Empresa"}
        </span>
      </div>
    </div>
  )
}
