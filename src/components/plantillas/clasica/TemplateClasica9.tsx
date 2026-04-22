import type { TemplateData } from "@/types/cotizacion-form"

type Props = {
  data?: TemplateData
}

type QuoteItem = {
  id: string
  type: "service" | "product"
  name: string
  description?: string
  quantity: number
  price: number
  amount: number
}

const defaultData: TemplateData = {
  title: "Cotización demo",
  description: "Documento comercial personalizado para presentar una propuesta clara y profesional.",
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
    description: undefined,
    quantity: 1,
    price: Number(service.price || 0),
    amount: Number(service.price || 0),
  }))

  const productItems: QuoteItem[] = (data.products ?? []).map((product, index) => ({
    id: `product-${index}`,
    type: "product",
    name: product.name || `Producto ${index + 1}`,
    description: undefined,
    quantity: Number(product.quantity || 0),
    price: Number(product.price || 0),
    amount: Number(product.quantity || 0) * Number(product.price || 0),
  }))

  return [...serviceItems, ...productItems]
}

export default function TemplateClasica9({ data }: Props) {
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
        color: "#4a2033",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflow: "hidden",
        borderRadius: 18,
        border: "1px solid #f4d7df",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -30,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "rgba(236,72,153,0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -30,
          top: 160,
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "rgba(244,114,182,0.08)",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: "30px 34px 22px",
          background: "linear-gradient(135deg, #fff6f9 0%, #fff9fb 100%)",
          borderBottom: "1px solid #f2d7df",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 18,
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 4,
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #ec4899, #f9a8d4)",
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#be185d",
                }}
              >
                Propuesta de servicios
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 31,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: "#4a2033",
              }}
            >
              {safeData.title || "Cotización"}
            </h1>

            {safeData.description ? (
              <p
                style={{
                  marginTop: 10,
                  maxWidth: 320,
                  fontSize: 11,
                  lineHeight: 1.75,
                  color: "#8b5b70",
                }}
              >
                {safeData.description}
              </p>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
              textAlign: "right",
            }}
          >
            {safeData.companyLogo ? (
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: "#ffffff",
                  border: "1px solid #f0d7df",
                  boxShadow: "0 8px 18px rgba(190,24,93,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: 7,
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
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: "linear-gradient(135deg, #ec4899, #f472b6)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 19,
                  fontWeight: 800,
                  boxShadow: "0 8px 18px rgba(190,24,93,0.12)",
                }}
              >
                {initials}
              </div>
            )}

            <div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#4a2033",
                  lineHeight: 1.25,
                }}
              >
                {safeData.companyName || "Tu Empresa"}
              </div>
              <div
                style={{
                  marginTop: 5,
                  fontSize: 10,
                  lineHeight: 1.7,
                  color: "#9b6b7f",
                }}
              >
                <div>{safeData.docNumber || "COT-001"}</div>
                <div>{safeData.date || new Date().toLocaleDateString("es-MX")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "16px 34px 12px",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 12,
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #f1dce4",
            borderRadius: 16,
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#d14d86",
              marginBottom: 8,
            }}
          >
            Cliente
          </div>

          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#4a2033",
              marginBottom: 8,
            }}
          >
            {safeData.clientName || "Cliente ejemplo"}
          </div>

          <div
            style={{
              fontSize: 10,
              lineHeight: 1.8,
              color: "#8b5b70",
            }}
          >
            {safeData.clientEmail && <div>{safeData.clientEmail}</div>}
            {safeData.clientPhone && <div>{safeData.clientPhone}</div>}
            {safeData.clientAddress && <div>{safeData.clientAddress}</div>}
            {safeData.clientRFC && <div>RFC: {safeData.clientRFC}</div>}

            {!safeData.clientEmail &&
              !safeData.clientPhone &&
              !safeData.clientAddress &&
              !safeData.clientRFC && (
                <div style={{ color: "#d1a0b1" }}>Sin datos de contacto adicionales.</div>
              )}
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #f1dce4",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "10px 14px",
              background: "#fff2f7",
              borderBottom: "1px solid #f4d9e2",
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#d14d86",
            }}
          >
            Resumen
          </div>

          <div
            style={{
              padding: "12px 14px",
              display: "grid",
              gap: 7,
              fontSize: 10,
              color: "#8b5b70",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Servicios</span>
              <strong style={{ color: "#4a2033" }}>
                {safeData.services?.length ?? 0}
              </strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Productos</span>
              <strong style={{ color: "#4a2033" }}>
                {safeData.products?.length ?? 0}
              </strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>IVA</span>
              <strong style={{ color: "#4a2033" }}>{tax}%</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Descuento</span>
              <strong style={{ color: "#4a2033" }}>
                {formatCurrency(discount)}
              </strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Vigencia</span>
              <strong style={{ color: "#4a2033" }}>
                {safeData.validUntil || "—"}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 34px 12px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #f1dce4",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.2fr 0.8fr 0.6fr 1fr 1fr",
              gap: 8,
              padding: "11px 14px",
              background: "linear-gradient(90deg, #fff3f7, #fff9fb)",
              borderBottom: "1px solid #f2d7df",
              fontSize: 8.5,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#cf5d8b",
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
                  gridTemplateColumns: "2.2fr 0.8fr 0.6fr 1fr 1fr",
                  gap: 8,
                  padding: "12px 14px",
                  borderTop: i === 0 ? "none" : "1px solid #fae8ee",
                  background: i % 2 === 0 ? "#ffffff" : "#fffbfd",
                  fontSize: 10.5,
                  alignItems: "center",
                }}
              >
                <div style={{ color: "#4a2033", fontWeight: 600, lineHeight: 1.35 }}>
                  {item.name}
                </div>
                <div style={{ color: "#9a6070", fontSize: 9.5 }}>
                  {item.type === "service" ? "Servicio" : "Producto"}
                </div>
                <div style={{ textAlign: "center", color: "#9a6070" }}>
                  {item.quantity}
                </div>
                <div style={{ textAlign: "right", color: "#9a6070" }}>
                  {formatCurrency(item.price)}
                </div>
                <div style={{ textAlign: "right", color: "#4a2033", fontWeight: 700 }}>
                  {formatCurrency(item.amount)}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "24px 14px",
                textAlign: "center",
                fontSize: 11,
                color: "#d8a0b2",
              }}
            >
              No hay conceptos agregados en esta cotización.
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          padding: "0 34px 14px",
          display: "grid",
          gridTemplateColumns: "1fr 210px",
          gap: 12,
          alignItems: "start",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #f1dce4",
            borderRadius: 16,
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#d14d86",
              marginBottom: 8,
            }}
          >
            Notas y condiciones
          </div>

          {safeData.notes ? (
            <p
              style={{
                fontSize: 10,
                color: "#8b5b70",
                lineHeight: 1.8,
                whiteSpace: "pre-line",
              }}
            >
              {safeData.notes}
            </p>
          ) : (
            <p
              style={{
                fontSize: 10,
                color: "#d1a0b1",
                fontStyle: "italic",
              }}
            >
              Sin observaciones
            </p>
          )}
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #f1dce4",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "14px 14px 12px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
                fontSize: 10,
                color: "#9a6070",
              }}
            >
              <span>Subtotal</span>
              <span style={{ color: "#4a2033", fontWeight: 600 }}>
                {formatCurrency(subtotal)}
              </span>
            </div>

            {discount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 7,
                  fontSize: 10,
                  color: "#9a6070",
                }}
              >
                <span>Descuento</span>
                <span style={{ color: "#16a34a", fontWeight: 600 }}>
                  − {formatCurrency(discount)}
                </span>
              </div>
            )}

            {tax > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  color: "#9a6070",
                }}
              >
                <span>IVA ({tax}%)</span>
                <span style={{ color: "#4a2033", fontWeight: 600 }}>
                  {formatCurrency(taxAmount)}
                </span>
              </div>
            )}
          </div>

          <div
            style={{
              padding: "13px 14px",
              background: "linear-gradient(135deg, #ec4899, #d946ef)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#ffffff",
            }}
          >
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
              }}
            >
              {formatCurrency(finalTotal)}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          padding: "18px 34px 22px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            borderTop: "1px solid #f2d7df",
            paddingTop: 12,
          }}
        >
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#cf6c8d",
              margin: 0,
            }}
          >
            ✦ Gracias por elegirnos ✦
          </p>
        </div>
      </div>
    </div>
  )
}
