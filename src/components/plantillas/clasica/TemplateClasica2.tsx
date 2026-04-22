import type { TemplateData } from "@/types/cotizacion-form"

type Props = {
  data?: TemplateData
}

type QuoteItem = {
  id: string
  kind: "service" | "product"
  name: string
  description?: string
  quantity: number
  price: number
  amount: number
}

function currency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value || 0)
}

const defaultData: TemplateData = {
  title: "Cotización demo",
  description: "Documento comercial listo para compartir con tu cliente.",
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

function buildItems(data: TemplateData): QuoteItem[] {
  const serviceItems: QuoteItem[] = (data.services ?? []).map((service, index) => ({
    id: `service-${index}`,
    kind: "service",
    name: service.name || `Servicio ${index + 1}`,
    description: undefined,
    quantity: 1,
    price: Number(service.price || 0),
    amount: Number(service.price || 0),
  }))

  const productItems: QuoteItem[] = (data.products ?? []).map((product, index) => ({
    id: `product-${index}`,
    kind: "product",
    name: product.name || `Producto ${index + 1}`,
    description: undefined,
    quantity: Number(product.quantity || 0),
    price: Number(product.price || 0),
    amount: Number(product.quantity || 0) * Number(product.price || 0),
  }))

  return [...serviceItems, ...productItems]
}

export default function TemplateClasica2({ data }: Props) {
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
  const discount = Number(safeData.discount ?? 0)
  const tax = Number(safeData.tax ?? 0)
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
        background: "#fafaf8",
        color: "#1c1917",
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
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Franja lateral izquierda */}
        <div
          style={{
            width: 6,
            background: "linear-gradient(180deg, #b45309 0%, #d97706 50%, #f59e0b 100%)",
            flexShrink: 0,
          }}
        />

        {/* Cuerpo del header */}
        <div
          style={{
            flex: 1,
            background: "#1c1917",
            padding: "26px 28px 22px 22px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Círculos decorativos */}
          <div
            style={{
              position: "absolute",
              top: -50,
              right: -30,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "rgba(245,158,11,0.06)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -30,
              left: 200,
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.03)",
              pointerEvents: "none",
            }}
          />

          {/* Left */}
          <div style={{ position: "relative", maxWidth: 300 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 2,
                  borderRadius: 999,
                  background: "#f59e0b",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 8.5,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "#f59e0b",
                  whiteSpace: "nowrap",
                }}
              >
                Cotización profesional
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 27,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "#ffffff",
              }}
            >
              {safeData.title || "Cotización"}
            </h1>

            {safeData.description ? (
              <p
                style={{
                  margin: "9px 0 0",
                  fontSize: 10.5,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.48)",
                  maxWidth: 290,
                }}
              >
                {safeData.description}
              </p>
            ) : null}
          </div>

          {/* Right */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
              position: "relative",
              flexShrink: 0,
            }}
          >
            {safeData.companyLogo ? (
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 14,
                  background: "#ffffff",
                  padding: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  border: "1.5px solid rgba(245,158,11,0.3)",
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
                  width: 62,
                  height: 62,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #b45309, #d97706)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 800,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                }}
              >
                {initials}
              </div>
            )}

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#ffffff",
                  lineHeight: 1.2,
                }}
              >
                {safeData.companyName || "Tu Empresa"}
              </div>
              <div
                style={{
                  marginTop: 5,
                  fontSize: 9.5,
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.42)",
                }}
              >
                <div>Folio: {safeData.docNumber || "COT-001"}</div>
                <div>
                  Fecha:{" "}
                  {safeData.date || new Date().toLocaleDateString("es-MX")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ACCENT BAR */}
      <div
        style={{
          height: 3,
          background:
            "linear-gradient(90deg, #b45309 0%, #d97706 40%, #f59e0b 70%, #fcd34d 100%)",
        }}
      />

      {/* ── CLIENTE + RESUMEN ── */}
      <div
        style={{
          padding: "16px 24px 12px",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 12,
        }}
      >
        {/* Cliente */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e7e5e4",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              padding: "9px 14px",
              background: "#fef3c7",
              borderBottom: "1px solid #fde68a",
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
                background: "#b45309",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#92400e",
              }}
            >
              Cliente
            </span>
          </div>
          <div style={{ padding: "13px 15px" }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#1c1917",
                marginBottom: 7,
              }}
            >
              {safeData.clientName || "Cliente ejemplo"}
            </div>
            <div style={{ fontSize: 10, lineHeight: 1.75, color: "#57534e" }}>
              {safeData.clientEmail && <div>{safeData.clientEmail}</div>}
              {safeData.clientPhone && <div>{safeData.clientPhone}</div>}
              {safeData.clientAddress && <div>{safeData.clientAddress}</div>}
              {safeData.clientRFC && <div>RFC: {safeData.clientRFC}</div>}
            </div>
          </div>
        </div>

        {/* Resumen */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e7e5e4",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              padding: "9px 14px",
              background: "#1c1917",
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
                background: "#f59e0b",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#fcd34d",
              }}
            >
              Resumen
            </span>
          </div>
          <div
            style={{
              padding: "13px 15px",
              display: "grid",
              gap: 7,
              fontSize: 10,
              color: "#57534e",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Conceptos</span>
              <strong style={{ color: "#1c1917" }}>{items.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Descuento</span>
              <strong style={{ color: "#1c1917" }}>{currency(discount)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Impuesto</span>
              <strong style={{ color: "#1c1917" }}>{tax}%</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Vigencia</span>
              <strong style={{ color: "#1c1917" }}>
                {safeData.validUntil || "—"}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLA CONCEPTOS ── */}
      <div style={{ padding: "0 24px 12px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e7e5e4",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
          }}
        >
          {/* Thead */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 0.7fr 0.5fr 1fr 1fr",
              gap: 8,
              padding: "9px 14px",
              background: "#1c1917",
              fontSize: 8.5,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.13em",
              color: "#fcd34d",
            }}
          >
            <div>Concepto</div>
            <div>Tipo</div>
            <div style={{ textAlign: "center" }}>Cant.</div>
            <div style={{ textAlign: "right" }}>Precio</div>
            <div style={{ textAlign: "right" }}>Importe</div>
          </div>

          {items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 0.7fr 0.5fr 1fr 1fr",
                  gap: 8,
                  padding: "11px 14px",
                  borderTop: index === 0 ? "none" : "1px solid #f5f5f4",
                  background: index % 2 === 0 ? "#ffffff" : "#fafaf8",
                  fontSize: 11,
                  alignItems: "center",
                }}
              >
                <div
                  style={{ fontWeight: 600, color: "#1c1917", lineHeight: 1.35 }}
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
                      background:
                        item.kind === "service" ? "#fef3c7" : "#f5f5f4",
                      color:
                        item.kind === "service" ? "#92400e" : "#57534e",
                      border:
                        item.kind === "service"
                          ? "1px solid #fde68a"
                          : "1px solid #e7e5e4",
                    }}
                  >
                    {item.kind === "service" ? "Servicio" : "Producto"}
                  </span>
                </div>
                <div style={{ textAlign: "center", color: "#78716c" }}>
                  {item.quantity}
                </div>
                <div style={{ textAlign: "right", color: "#78716c" }}>
                  {currency(item.price)}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#b45309",
                  }}
                >
                  {currency(item.amount)}
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
          padding: "0 24px 12px",
          display: "grid",
          gridTemplateColumns: "1fr 210px",
          gap: 12,
          alignItems: "start",
        }}
      >
        {/* Notas */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e7e5e4",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              padding: "9px 14px",
              background: "#fef3c7",
              borderBottom: "1px solid #fde68a",
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
                background: "#b45309",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#92400e",
              }}
            >
              Notas y condiciones
            </span>
          </div>
          <div
            style={{
              padding: "13px 15px",
              fontSize: 10,
              lineHeight: 1.75,
              color: "#57534e",
              whiteSpace: "pre-line",
              minHeight: 52,
            }}
          >
            {safeData.notes || "Sin notas adicionales."}
          </div>
        </div>

        {/* Totales */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e7e5e4",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ padding: "13px 15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                paddingBottom: 6,
                borderBottom: "1px solid #f5f5f4",
                fontSize: 10.5,
                color: "#57534e",
              }}
            >
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: "#1c1917" }}>
                {currency(subtotal)}
              </span>
            </div>

            {discount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                  paddingBottom: 6,
                  borderBottom: "1px solid #f5f5f4",
                  fontSize: 10.5,
                  color: "#57534e",
                }}
              >
                <span>Descuento</span>
                <span style={{ fontWeight: 600, color: "#16a34a" }}>
                  - {currency(discount)}
                </span>
              </div>
            )}

            {tax > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10.5,
                  color: "#57534e",
                }}
              >
                <span>Impuesto ({tax}%)</span>
                <span style={{ fontWeight: 600, color: "#1c1917" }}>
                  {currency(taxAmount)}
                </span>
              </div>
            )}
          </div>

          {/* Total destacado */}
          <div
            style={{
              padding: "13px 15px",
              background: "#1c1917",
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
                height: 2.5,
                background:
                  "linear-gradient(90deg, #b45309, #f59e0b, #fcd34d)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -18,
                bottom: -18,
                width: 65,
                height: 65,
                borderRadius: "50%",
                background: "rgba(245,158,11,0.07)",
              }}
            />
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#f59e0b",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              {currency(finalTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div
        style={{
          marginTop: "auto",
          padding: "12px 24px 20px",
        }}
      >
        <div
          style={{
            paddingTop: 10,
            borderTop: "1px solid #e7e5e4",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 9,
            color: "#a8a29e",
          }}
        >
          <span style={{ fontWeight: 600, color: "#78716c" }}>
            {safeData.companyName || "Tu Empresa"}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {[8, 16, 8].map((w, i) => (
              <div
                key={i}
                style={{
                  width: w,
                  height: 2,
                  borderRadius: 999,
                  background: i === 1 ? "#d97706" : "#fde68a",
                }}
              />
            ))}
          </div>
          <span>
            {safeData.date || new Date().toLocaleDateString("es-MX")}
          </span>
        </div>
      </div>
    </div>
  )
}
