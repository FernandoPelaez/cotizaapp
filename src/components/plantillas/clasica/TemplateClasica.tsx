import type { TemplateData } from "@/types/cotizacion-form"

type Props = {
  data?: TemplateData
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value || 0)
}

const defaultData: TemplateData = {
  title: "Cotización demo",
  description: "Documento de referencia para propuesta comercial.",
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

export default function TemplateClasica({ data }: Props) {
  const safeData: TemplateData = {
    ...defaultData,
    ...data,
    services: data?.services ?? defaultData.services,
    products: data?.products ?? defaultData.products,
  }

  const subtotal =
    safeData.subtotal ??
    [
      ...safeData.services.map((s) => ({ price: s.price as number })),
      ...safeData.products.map((p) => ({
        price: (p.price as number) * (p.quantity as number),
      })),
    ].reduce((acc, item) => acc + (item.price || 0), 0)

  const discount = safeData.discount ?? 0
  const tax = safeData.tax ?? 0
  const taxableBase = Math.max(0, subtotal - discount)
  const taxAmount = taxableBase * (tax / 100)
  const total = safeData.total ?? taxableBase + taxAmount

  const initials = String(safeData.companyName || "TE")
    .trim()
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      id="template-clasica"
      style={{
        width: 595,
        minHeight: 842,
        background: "#f8faff",
        color: "#1a1a2e",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decoración top-right — detrás del contenido, z-index 0 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 176,
          height: 176,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <svg viewBox="0 0 180 180" fill="none" style={{ width: "100%", height: "100%" }}>
          <circle cx="180" cy="0" r="140" fill="#1e3a8a" fillOpacity="0.06" />
          <circle cx="180" cy="0" r="100" fill="#1e3a8a" fillOpacity="0.06" />
          <circle cx="180" cy="0" r="60" fill="#1e3a8a" fillOpacity="0.08" />
        </svg>
      </div>

      {/* Decoración bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 160,
          height: 160,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <svg viewBox="0 0 160 160" fill="none" style={{ width: "100%", height: "100%" }}>
          <circle cx="0" cy="160" r="120" fill="#1e3a8a" fillOpacity="0.05" />
          <circle cx="0" cy="160" r="80" fill="#1e3a8a" fillOpacity="0.05" />
        </svg>
      </div>

      {/* ── HEADER ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "28px 36px 22px",
        }}
      >
        {/* Top row: logo/empresa + fecha */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            gap: 12,
          }}
        >
          {/* Logo + nombre */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            {safeData.companyLogo ? (
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "#ffffff",
                  border: "1.5px solid #dbeafe",
                  boxShadow: "0 4px 12px rgba(30,58,138,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: 6,
                  flexShrink: 0,
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
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: 800,
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(30,58,138,0.25)",
                }}
              >
                {initials}
              </div>
            )}

            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#1e3a8a",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {safeData.companyName || "Tu Empresa"}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#6b7280",
                  marginTop: 2,
                  fontWeight: 500,
                }}
              >
                {safeData.docNumber ?? "COT-001"}
              </div>
            </div>
          </div>

          {/* Fecha — con flexShrink: 0 para que no se comprima ni se salga */}
          <div
            style={{
              background: "#ffffff",
              border: "1.5px solid #dbeafe",
              borderRadius: 10,
              padding: "7px 14px",
              boxShadow: "0 2px 8px rgba(30,58,138,0.07)",
              flexShrink: 0,
              minWidth: 0,
            }}
          >
            <div
              style={{
                fontSize: 8,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#93c5fd",
                marginBottom: 2,
                whiteSpace: "nowrap",
              }}
            >
              Fecha
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#1e3a8a",
                whiteSpace: "nowrap",
              }}
            >
              {safeData.date || new Date().toLocaleDateString("es-MX")}
            </div>
          </div>
        </div>

        {/* Title row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 16,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 3,
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 8.5,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#1e3a8a",
                  whiteSpace: "nowrap",
                }}
              >
                Cotización de servicios
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "#1a1a2e",
              }}
            >
              {safeData.title || "Documento comercial"}
            </h1>

            {safeData.description ? (
              <p
                style={{
                  margin: "8px 0 0",
                  maxWidth: 310,
                  fontSize: 11,
                  lineHeight: 1.65,
                  color: "#6b7280",
                }}
              >
                {safeData.description}
              </p>
            ) : null}
          </div>

          {/* Vigencia */}
          <div
            style={{
              minWidth: 130,
              maxWidth: 150,
              background: "#ffffff",
              border: "1.5px solid #dbeafe",
              borderRadius: 12,
              padding: "11px 14px",
              boxShadow: "0 2px 8px rgba(30,58,138,0.07)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 8,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#93c5fd",
                marginBottom: 4,
                whiteSpace: "nowrap",
              }}
            >
              Vigencia
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#1a1a2e",
                whiteSpace: "nowrap",
              }}
            >
              {safeData.validUntil || "Sin definir"}
            </div>
          </div>
        </div>
      </div>

      {/* ACCENT BAR */}
      <div
        style={{
          height: 3,
          background: "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 60%, #93c5fd 100%)",
          margin: "0 36px",
          borderRadius: 999,
          position: "relative",
          zIndex: 10,
        }}
      />

      {/* ── CLIENTE + EMISOR ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "14px 36px 12px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        {/* Cliente */}
        <div
          style={{
            background: "#ffffff",
            border: "1.5px solid #dbeafe",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(30,58,138,0.06)",
          }}
        >
          <div
            style={{
              padding: "9px 14px",
              background: "linear-gradient(90deg, #eff6ff, #f0f9ff)",
              borderBottom: "1px solid #dbeafe",
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
                background: "#1e3a8a",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#1e3a8a",
              }}
            >
              Datos del cliente
            </span>
          </div>
          <div style={{ padding: "12px 14px" }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: 6,
              }}
            >
              {safeData.clientName || "Sin cliente"}
            </div>
            <div style={{ fontSize: 10, lineHeight: 1.75, color: "#4b5563" }}>
              {safeData.clientAddress && <div>{safeData.clientAddress}</div>}
              {safeData.clientPhone && <div>{safeData.clientPhone}</div>}
              {safeData.clientEmail && <div>{safeData.clientEmail}</div>}
              {safeData.clientRFC && <div>RFC: {safeData.clientRFC}</div>}
            </div>
          </div>
        </div>

        {/* Emisor */}
        <div
          style={{
            background: "#ffffff",
            border: "1.5px solid #dbeafe",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(30,58,138,0.06)",
          }}
        >
          <div
            style={{
              padding: "9px 14px",
              background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
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
                background: "#93c5fd",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#bfdbfe",
              }}
            >
              Datos del emisor
            </span>
          </div>
          <div style={{ padding: "12px 14px" }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: 6,
              }}
            >
              {safeData.companyName || "Tu Empresa"}
            </div>
            <div style={{ fontSize: 10, lineHeight: 1.75, color: "#4b5563" }}>
              <div>Documento: {safeData.docNumber ?? "COT-001"}</div>
              <div>
                Fecha: {safeData.date || new Date().toLocaleDateString("es-MX")}
              </div>
              {safeData.validUntil && (
                <div>Vigencia: {safeData.validUntil}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLA SERVICIOS ── */}
      {safeData.services.length > 0 && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "0 36px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "#1e3a8a",
                whiteSpace: "nowrap",
              }}
            >
              Servicios
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, #dbeafe, transparent)",
              }}
            />
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1.5px solid #dbeafe",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(30,58,138,0.06)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2.4fr 0.5fr 1fr 1fr",
                gap: 10,
                padding: "9px 14px",
                background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#bfdbfe",
              }}
            >
              <div>Descripción</div>
              <div style={{ textAlign: "center" }}>Cant.</div>
              <div style={{ textAlign: "right" }}>Precio</div>
              <div style={{ textAlign: "right" }}>Subtotal</div>
            </div>

            {safeData.services.map((service, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.4fr 0.5fr 1fr 1fr",
                  gap: 10,
                  padding: "11px 14px",
                  borderTop: i === 0 ? "none" : "1px solid #eff6ff",
                  background: i % 2 === 0 ? "#ffffff" : "#f8faff",
                  fontSize: 11,
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: "#1a1a2e", lineHeight: 1.35 }}>
                    {service.name || "-"}
                  </div>
                </div>
                <div style={{ textAlign: "center", color: "#6b7280" }}>1</div>
                <div style={{ textAlign: "right", color: "#6b7280" }}>
                  {formatMoney(service.price || 0)}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#1e3a8a",
                  }}
                >
                  {formatMoney(service.price || 0)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TABLA PRODUCTOS ── */}
      {safeData.products.length > 0 && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "0 36px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "#1e3a8a",
                whiteSpace: "nowrap",
              }}
            >
              Productos
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, #dbeafe, transparent)",
              }}
            />
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1.5px solid #dbeafe",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(30,58,138,0.06)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2.4fr 0.5fr 1fr 1fr",
                gap: 10,
                padding: "9px 14px",
                background: "linear-gradient(90deg, #1e3a8a, #2563eb)",
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#bfdbfe",
              }}
            >
              <div>Producto</div>
              <div style={{ textAlign: "center" }}>Cantidad</div>
              <div style={{ textAlign: "right" }}>Precio unit.</div>
              <div style={{ textAlign: "right" }}>Subtotal</div>
            </div>

            {safeData.products.map((product, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.4fr 0.5fr 1fr 1fr",
                  gap: 10,
                  padding: "11px 14px",
                  borderTop: i === 0 ? "none" : "1px solid #eff6ff",
                  background: i % 2 === 0 ? "#ffffff" : "#f8faff",
                  fontSize: 11,
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: 600, color: "#1a1a2e" }}>
                  {product.name || "-"}
                </div>
                <div style={{ textAlign: "center", color: "#6b7280" }}>
                  {product.quantity}
                </div>
                <div style={{ textAlign: "right", color: "#6b7280" }}>
                  {formatMoney(product.price || 0)}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#1e3a8a",
                  }}
                >
                  {formatMoney((product.price || 0) * (product.quantity || 0))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── NOTAS + TOTALES ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 36px 12px",
          display: "grid",
          gridTemplateColumns: "1fr 200px",
          gap: 12,
          alignItems: "start",
        }}
      >
        {/* Notas */}
        {safeData.notes ? (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 8.5,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#1e3a8a",
                  whiteSpace: "nowrap",
                }}
              >
                Condiciones
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "linear-gradient(90deg, #dbeafe, transparent)",
                }}
              />
            </div>
            <div
              style={{
                background: "#ffffff",
                border: "1.5px solid #dbeafe",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: 10,
                lineHeight: 1.75,
                color: "#4b5563",
                whiteSpace: "pre-wrap",
                boxShadow: "0 2px 8px rgba(30,58,138,0.05)",
              }}
            >
              {safeData.notes}
            </div>
          </div>
        ) : (
          <div />
        )}

        {/* Totales */}
        <div
          style={{
            background: "#ffffff",
            border: "1.5px solid #dbeafe",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(30,58,138,0.06)",
          }}
        >
          <div style={{ padding: "12px 14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                fontSize: 10.5,
                color: "#4b5563",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: 6,
              }}
            >
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: "#1a1a2e" }}>
                {formatMoney(subtotal)}
              </span>
            </div>

            {tax > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                  fontSize: 10.5,
                  color: "#4b5563",
                  borderBottom: "1px solid #f1f5f9",
                  paddingBottom: 6,
                }}
              >
                <span>Impuestos ({tax}%)</span>
                <span style={{ fontWeight: 600, color: "#1a1a2e" }}>
                  {formatMoney(taxAmount)}
                </span>
              </div>
            )}

            {discount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                  fontSize: 10.5,
                  color: "#4b5563",
                  borderBottom: "1px solid #f1f5f9",
                  paddingBottom: 6,
                }}
              >
                <span>Descuento</span>
                <span style={{ fontWeight: 600, color: "#16a34a" }}>
                  - {formatMoney(discount)}
                </span>
              </div>
            )}
          </div>

          <div
            style={{
              padding: "13px 14px",
              background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
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
                background: "linear-gradient(90deg, #3b82f6, #93c5fd)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -16,
                bottom: -16,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "#93c5fd",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: 19,
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              {formatMoney(total)}
            </span>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div
        style={{
          marginTop: "auto",
          position: "relative",
          zIndex: 10,
          padding: "12px 36px 20px",
        }}
      >
        <div
          style={{
            paddingTop: 10,
            borderTop: "1px solid #dbeafe",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 9,
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ fontWeight: 600, color: "#6b7280" }}>
              {safeData.companyName || "Tu Empresa"}
            </span>
            {safeData.validUntil && (
              <span>Vigencia: {safeData.validUntil}</span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {[8, 16, 8].map((w, i) => (
              <div
                key={i}
                style={{
                  width: w,
                  height: 2,
                  borderRadius: 999,
                  background: i === 1 ? "#3b82f6" : "#bfdbfe",
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
