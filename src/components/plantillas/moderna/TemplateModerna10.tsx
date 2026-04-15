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

type Props = {
  data: {
    title?: string
    clientName?: string
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
    logoUrl?: string
    services?: ServiceItem[]
    products?: ProductItem[]
    total?: number
    subtotal?: number
  }
}

export default function TemplateModernaX({ data }: Props) {
  const safeServices = Array.isArray(data.services) ? data.services : []
  const safeProducts = Array.isArray(data.products) ? data.products : []

  const companyName = data.companyName?.trim() || "Tu empresa"
  const clientName = data.clientName?.trim() || "Cliente"
  const documentTitle = data.title?.trim() || "Cotización"
  const today = data.date?.trim() || "Sin fecha"

  const allItems = [
    ...safeServices.map((service) => ({
      name: service.name || "Servicio",
      description: service.description,
      qty: 1,
      type: "Servicio",
      price: Number(service.price || 0),
      total: Number(service.price || 0),
    })),
    ...safeProducts.map((product) => ({
      name: product.name || "Producto",
      description: undefined,
      qty: Number(product.quantity || 0),
      type: "Producto",
      price: Number(product.price || 0),
      total: Number(product.quantity || 0) * Number(product.price || 0),
    })),
  ]

  const calculatedSubtotal = allItems.reduce((acc, item) => acc + item.total, 0)
  const subtotal = Number(data.subtotal ?? calculatedSubtotal)
  const tax = Number(data.tax ?? 0)
  const discount = Number(data.discount ?? 0)
  const taxAmount = subtotal * (tax / 100)

  const finalTotal =
    typeof data.total === "number"
      ? data.total
      : Math.max(subtotal + taxAmount - discount, 0)

  const hasItems = allItems.length > 0
  const showTax = tax > 0
  const showDiscount = discount > 0

  const formatCurrency = (value: number) =>
    `$${Number(value || 0).toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`

  const NAVY = "#162033"
  const NAVY_SOFT = "#24324D"
  const SKY = "#5B8DEF"
  const SKY_SOFT = "#DCE7FF"
  const SKY_PALE = "#F5F8FF"
  const TEXT = "#1E293B"
  const MUTED = "#64748B"
  const BORDER = "#E2E8F0"
  const WHITE = "#FFFFFF"

  return (
    <div
      id="template-moderna-x"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        backgroundColor: WHITE,
        position: "relative",
        overflow: "hidden",
        color: TEXT,
      }}
    >
      {/* Fondo decorativo */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: SKY_SOFT,
          opacity: 0.85,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "90px",
          right: "-30px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: SKY_SOFT,
          opacity: 0.4,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-70px",
          left: "-50px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: SKY_SOFT,
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_SOFT} 100%)`,
          padding: "32px 36px 26px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            opacity: 0.5,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "16px",
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "9px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: "700",
                margin: "0 0 8px",
              }}
            >
              Documento comercial
            </p>
            <p
              style={{
                color: WHITE,
                fontSize: "30px",
                fontWeight: "800",
                margin: "0 0 6px",
                lineHeight: "1",
                letterSpacing: "-0.03em",
                wordBreak: "break-word",
              }}
            >
              {documentTitle.toUpperCase()}
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "9px",
                margin: 0,
                letterSpacing: "0.08em",
              }}
            >
              {data.docNumber ? `#${data.docNumber} · ` : ""}
              {today}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <div style={{ textAlign: "right", minWidth: 0 }}>
              <p
                style={{
                  color: WHITE,
                  fontSize: "14px",
                  fontWeight: "800",
                  margin: "0 0 3px",
                  wordBreak: "break-word",
                }}
              >
                {companyName}
              </p>
              {data.companyWeb && (
                <p
                  style={{
                    color: "#A9C3FF",
                    fontSize: "8px",
                    margin: "0 0 2px",
                    fontWeight: "600",
                    wordBreak: "break-word",
                  }}
                >
                  {data.companyWeb}
                </p>
              )}
              {data.companyEmail && (
                <p
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "8px",
                    margin: "0 0 2px",
                    wordBreak: "break-word",
                  }}
                >
                  {data.companyEmail}
                </p>
              )}
              {data.companyPhone && (
                <p
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "8px",
                    margin: 0,
                  }}
                >
                  {data.companyPhone}
                </p>
              )}
            </div>

            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1.5px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {data.logoUrl ? (
                <img
                  src={data.logoUrl}
                  alt="Logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M7 12h10" />
                  <path d="M12 7v10" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Banda acento */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "4px",
          background: `linear-gradient(90deg, ${SKY} 0%, #79A8FF 50%, ${SKY_SOFT} 100%)`,
        }}
      />

      {/* Datos cliente + resumen total */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "22px 36px 18px",
          display: "flex",
          gap: "14px",
        }}
      >
        <div
          style={{
            flex: 1,
            background: SKY_PALE,
            border: `1px solid ${BORDER}`,
            borderRadius: "14px",
            padding: "16px 18px",
          }}
        >
          <p
            style={{
              color: SKY,
              fontSize: "8px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "700",
              margin: "0 0 8px",
            }}
          >
            Cliente
          </p>
          <p
            style={{
              color: TEXT,
              fontSize: "14px",
              fontWeight: "800",
              margin: "0 0 5px",
              lineHeight: "1.2",
              wordBreak: "break-word",
            }}
          >
            {clientName}
          </p>
          {data.clientEmail && (
            <p
              style={{
                color: MUTED,
                fontSize: "9px",
                margin: "0 0 2px",
                wordBreak: "break-word",
              }}
            >
              {data.clientEmail}
            </p>
          )}
          {data.clientPhone && (
            <p style={{ color: MUTED, fontSize: "9px", margin: "0 0 2px" }}>
              {data.clientPhone}
            </p>
          )}
          {data.clientAddress && (
            <p
              style={{
                color: MUTED,
                fontSize: "9px",
                margin: 0,
                wordBreak: "break-word",
              }}
            >
              {data.clientAddress}
            </p>
          )}
        </div>

        <div
          style={{
            width: "180px",
            background: NAVY,
            borderRadius: "14px",
            padding: "18px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-24px",
              right: "-24px",
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }}
          />
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "8px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "700",
              margin: "0 0 6px",
              position: "relative",
              zIndex: 1,
            }}
          >
            Total a pagar
          </p>
          <p
            style={{
              color: WHITE,
              fontSize: "24px",
              fontWeight: "800",
              margin: 0,
              lineHeight: "1",
              letterSpacing: "-0.02em",
              position: "relative",
              zIndex: 1,
              wordBreak: "break-word",
            }}
          >
            {formatCurrency(finalTotal)}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.32)",
              fontSize: "8px",
              margin: "4px 0 0",
              position: "relative",
              zIndex: 1,
            }}
          >
            MXN
          </p>
        </div>
      </div>

      {/* Tabla */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 36px 150px" }}>
        <div
          style={{
            borderRadius: "14px",
            overflow: "hidden",
            border: `1px solid ${BORDER}`,
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 70px 78px 85px 95px",
              background: NAVY,
              padding: "10px 16px",
              alignItems: "center",
            }}
          >
            {["Concepto", "Cantidad", "Tipo", "Precio", "Subtotal"].map((header, index) => (
              <span
                key={index}
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "7.5px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: "700",
                  textAlign: index === 0 ? "left" : "right",
                }}
              >
                {header}
              </span>
            ))}
          </div>

          {hasItems ? (
            allItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 70px 78px 85px 95px",
                  padding: "12px 16px",
                  background: index % 2 === 0 ? WHITE : SKY_PALE,
                  borderBottom:
                    index < allItems.length - 1 ? `1px solid ${BORDER}` : "none",
                  alignItems: "center",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      color: TEXT,
                      fontSize: "10px",
                      fontWeight: "700",
                      display: "block",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.name || "—"}
                  </span>
                  {item.description && (
                    <span
                      style={{
                        color: "#94A3B8",
                        fontSize: "8px",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.description}
                    </span>
                  )}
                </div>

                <span style={{ color: MUTED, fontSize: "10px", textAlign: "right" }}>
                  {item.qty}
                </span>
                <span style={{ color: MUTED, fontSize: "10px", textAlign: "right" }}>
                  {item.type}
                </span>
                <span style={{ color: MUTED, fontSize: "10px", textAlign: "right" }}>
                  {formatCurrency(item.price)}
                </span>
                <span
                  style={{
                    color: TEXT,
                    fontSize: "10px",
                    fontWeight: "700",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(item.total)}
                </span>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "18px 16px",
                background: WHITE,
                textAlign: "center",
              }}
            >
              <span style={{ color: MUTED, fontSize: "10px" }}>
                No hay conceptos registrados en esta cotización.
              </span>
            </div>
          )}
        </div>

        {/* Totales */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "18px" }}>
          <div
            style={{
              width: "265px",
              border: `1px solid ${BORDER}`,
              borderRadius: "12px",
              overflow: "hidden",
              background: WHITE,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 16px",
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              <span style={{ color: MUTED, fontSize: "9.5px" }}>Subtotal</span>
              <span style={{ color: TEXT, fontSize: "9.5px", fontWeight: "600" }}>
                {formatCurrency(subtotal)}
              </span>
            </div>

            {showTax && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 16px",
                  borderBottom: showDiscount ? `1px solid ${BORDER}` : "none",
                }}
              >
                <span style={{ color: MUTED, fontSize: "9.5px" }}>IVA ({tax}%)</span>
                <span style={{ color: TEXT, fontSize: "9.5px", fontWeight: "600" }}>
                  {formatCurrency(taxAmount)}
                </span>
              </div>
            )}

            {showDiscount && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 16px",
                  borderBottom: `1px solid ${BORDER}`,
                }}
              >
                <span style={{ color: "#4A8C6E", fontSize: "9.5px" }}>Descuento</span>
                <span style={{ color: "#4A8C6E", fontSize: "9.5px", fontWeight: "600" }}>
                  -{formatCurrency(discount)}
                </span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "11px 16px",
                background: NAVY,
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "9px",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {showTax ? "Total con IVA" : "Total"}
              </span>
              <span
                style={{
                  color: WHITE,
                  fontSize: "16px",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                }}
              >
                {formatCurrency(finalTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Notas */}
        {data.notes && (
          <div style={{ marginBottom: "20px" }}>
            <p
              style={{
                color: NAVY,
                fontSize: "10px",
                fontWeight: "800",
                margin: "0 0 6px",
                letterSpacing: "0.02em",
              }}
            >
              Notas y condiciones
            </p>
            <p
              style={{
                color: MUTED,
                fontSize: "9px",
                lineHeight: "1.7",
                margin: 0,
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {data.notes}
            </p>
          </div>
        )}

        {/* Firma + badge empresa */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "16px",
          }}
        >
          <div style={{ width: "180px", flexShrink: 0 }}>
            <div
              style={{
                height: "40px",
                borderBottom: `1px solid ${BORDER}`,
                marginBottom: "6px",
              }}
            />
            <p
              style={{
                color: MUTED,
                fontSize: "8px",
                fontWeight: "600",
                margin: "0 0 1px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Firma autorizada
            </p>
            <p
              style={{
                color: TEXT,
                fontSize: "9px",
                fontWeight: "700",
                margin: 0,
                wordBreak: "break-word",
              }}
            >
              {companyName}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: SKY_PALE,
              border: `1px solid ${BORDER}`,
              borderRadius: "12px",
              padding: "10px 14px",
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                overflow: "hidden",
                border: `1px solid ${BORDER}`,
                background: WHITE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {data.logoUrl ? (
                <img
                  src={data.logoUrl}
                  alt="Logo"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={NAVY}
                  strokeWidth="1.5"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              )}
            </div>

            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  color: TEXT,
                  fontSize: "9px",
                  fontWeight: "800",
                  margin: "0 0 1px",
                  lineHeight: "1.2",
                  wordBreak: "break-word",
                }}
              >
                {companyName}
              </p>
              {data.companyWeb && (
                <p
                  style={{
                    color: SKY,
                    fontSize: "7.5px",
                    margin: 0,
                    fontWeight: "600",
                    wordBreak: "break-word",
                  }}
                >
                  {data.companyWeb}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <div
          style={{
            height: "3px",
            background: `linear-gradient(90deg, ${SKY} 0%, #79A8FF 50%, ${SKY_SOFT} 100%)`,
          }}
        />
        <div
          style={{
            background: SKY_PALE,
            borderTop: `1px solid ${BORDER}`,
            padding: "12px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <p
            style={{
              color: MUTED,
              fontSize: "8px",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            Este documento es válido por 30 días a partir de su fecha de emisión.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {data.companyPhone && (
              <span style={{ color: MUTED, fontSize: "8px" }}>{data.companyPhone}</span>
            )}
            {data.companyEmail && (
              <span
                style={{
                  color: MUTED,
                  fontSize: "8px",
                  wordBreak: "break-word",
                }}
              >
                {data.companyEmail}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
