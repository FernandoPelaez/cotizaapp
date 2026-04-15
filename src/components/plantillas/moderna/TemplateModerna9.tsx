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

export default function TemplateModernaW({ data }: Props) {
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
      unit: "servicio",
      price: Number(service.price || 0),
      total: Number(service.price || 0),
    })),
    ...safeProducts.map((product) => ({
      name: product.name || "Producto",
      description: undefined,
      qty: Number(product.quantity || 0),
      unit: "pza",
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

  const SLATE = "#3D4F5C"
  const SLATE_DARK = "#1F2F3A"
  const SLATE_MID = "#536472"
  const SLATE_LIGHT = "#E4EAED"
  const SLATE_PALE = "#F2F5F7"
  const ACCENT = "#4A7C8E"
  const ACCENT_LIGHT = "#D6E8ED"
  const WHITE = "#FFFFFF"

  const labelStyle = {
    color: WHITE,
    fontSize: "8px" as const,
    fontWeight: "700" as const,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    margin: "0 0 3px",
  }

  const valueStyle = {
    color: WHITE,
    fontSize: "10px" as const,
    margin: 0,
    lineHeight: "1.5",
    opacity: 0.85,
    wordBreak: "break-word" as const,
  }

  return (
    <div
      id="template-moderna-w"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        backgroundColor: WHITE,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* HEADER SUPERIOR */}
      <div
        style={{
          background: SLATE_DARK,
          padding: "26px 36px 22px",
          position: "relative",
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
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            position: "relative",
            zIndex: 1,
            gap: "16px",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                color: WHITE,
                fontSize: "32px",
                fontWeight: "800",
                margin: "0 0 4px",
                letterSpacing: "-0.03em",
                lineHeight: "1",
                wordBreak: "break-word",
              }}
            >
              {documentTitle.charAt(0).toUpperCase() + documentTitle.slice(1).toLowerCase()}
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "7.5px",
                fontWeight: "600",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Documento profesional · {companyName}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
            <div style={{ textAlign: "right", minWidth: 0 }}>
              {data.companyAddress && (
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "8px",
                    margin: "0 0 2px",
                    wordBreak: "break-word",
                  }}
                >
                  {data.companyAddress}
                </p>
              )}
              {data.companyPhone && (
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "8px", margin: "0 0 2px" }}>
                  {data.companyPhone}
                </p>
              )}
              {data.companyEmail && (
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "8px",
                    margin: 0,
                    wordBreak: "break-word",
                  }}
                >
                  {data.companyEmail}
                </p>
              )}
            </div>

            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1.5px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.07)",
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
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.4"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BANDA DE ACENTO */}
      <div
        style={{
          height: "4px",
          background: `linear-gradient(90deg, ${ACCENT} 0%, #6AACBE 50%, ${ACCENT_LIGHT} 100%)`,
        }}
      />

      {/* Número + Fecha */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${SLATE_LIGHT}`,
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "12px 36px",
            borderRight: `1px solid ${SLATE_LIGHT}`,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              color: SLATE_MID,
              fontSize: "8.5px",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Número de documento:
          </span>
          <span style={{ color: SLATE_DARK, fontSize: "10px", fontWeight: "800" }}>
            {data.docNumber ? `#${data.docNumber}` : "—"}
          </span>
        </div>

        <div
          style={{
            flex: 1,
            padding: "12px 36px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              color: SLATE_MID,
              fontSize: "8.5px",
              fontWeight: "700",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Fecha de emisión:
          </span>
          <span style={{ color: SLATE_DARK, fontSize: "10px", fontWeight: "800" }}>
            {today}
          </span>
        </div>
      </div>

      {/* Facturado a + Emisor */}
      <div
        style={{
          display: "flex",
          background: SLATE,
          margin: "0",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "16px 36px",
            borderRight: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p style={labelStyle}>Facturado a</p>
          <p
            style={{
              ...valueStyle,
              fontSize: "12px",
              fontWeight: "700",
              margin: "0 0 4px",
            }}
          >
            {clientName}
          </p>
          {data.clientAddress && <p style={valueStyle}>{data.clientAddress}</p>}
          {data.clientPhone && <p style={valueStyle}>{data.clientPhone}</p>}
          {data.clientEmail && <p style={valueStyle}>{data.clientEmail}</p>}
        </div>

        <div
          style={{
            flex: 1,
            padding: "16px 36px",
          }}
        >
          <p style={labelStyle}>Emisor</p>
          <p
            style={{
              ...valueStyle,
              fontSize: "12px",
              fontWeight: "700",
              margin: "0 0 4px",
            }}
          >
            {companyName}
          </p>
          {data.companyAddress && <p style={valueStyle}>{data.companyAddress}</p>}
          {data.companyPhone && <p style={valueStyle}>{data.companyPhone}</p>}
          {data.companyEmail && <p style={valueStyle}>{data.companyEmail}</p>}
          {data.companyWeb && (
            <p style={{ ...valueStyle, color: "#A8D8E5" }}>{data.companyWeb}</p>
          )}
        </div>
      </div>

      {/* CUERPO */}
      <div style={{ padding: "22px 36px 150px" }}>
        <div
          style={{
            borderRadius: "0",
            overflow: "hidden",
            border: `1px solid ${SLATE_LIGHT}`,
            marginBottom: "0",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 70px 70px 80px 90px",
              background: SLATE,
              padding: "9px 16px",
              alignItems: "center",
            }}
          >
            {["Concepto", "Cantidad", "Unidad", "Precio Unit.", "Subtotal"].map((header, index) => (
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
                  gridTemplateColumns: "1fr 70px 70px 80px 90px",
                  padding: "11px 16px",
                  background: index % 2 === 0 ? WHITE : SLATE_PALE,
                  borderBottom:
                    index < allItems.length - 1 ? `1px solid ${SLATE_LIGHT}` : "none",
                  alignItems: "center",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      color: SLATE_DARK,
                      fontSize: "10px",
                      fontWeight: "600",
                      display: "block",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.name || "—"}
                  </span>
                  {item.description && (
                    <span
                      style={{
                        color: "#9AAABF",
                        fontSize: "8px",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.description}
                    </span>
                  )}
                </div>

                <span style={{ color: SLATE_MID, fontSize: "10px", textAlign: "right" }}>
                  {item.qty}
                </span>
                <span style={{ color: SLATE_MID, fontSize: "10px", textAlign: "right" }}>
                  {item.unit}
                </span>
                <span style={{ color: SLATE_MID, fontSize: "10px", textAlign: "right" }}>
                  {formatCurrency(item.price)}
                </span>
                <span
                  style={{
                    color: SLATE_DARK,
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
              <span style={{ color: SLATE_MID, fontSize: "10px" }}>
                No hay conceptos registrados en este documento.
              </span>
            </div>
          )}

          {hasItems &&
            allItems.length < 4 &&
            Array.from({ length: Math.max(0, 3 - allItems.length) }).map((_, index) => (
              <div
                key={`empty-${index}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 70px 70px 80px 90px",
                  padding: "11px 16px",
                  background: (allItems.length + index) % 2 === 0 ? WHITE : SLATE_PALE,
                  borderBottom: `1px solid ${SLATE_LIGHT}`,
                  height: "36px",
                }}
              />
            ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              width: "260px",
              border: `1px solid ${SLATE_LIGHT}`,
              borderTop: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "7px 16px",
                borderBottom: `1px solid ${SLATE_LIGHT}`,
              }}
            >
              <span style={{ color: SLATE_MID, fontSize: "9.5px" }}>Subtotal:</span>
              <span style={{ color: SLATE_DARK, fontSize: "9.5px", fontWeight: "600" }}>
                {formatCurrency(subtotal)}
              </span>
            </div>

            {showTax && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "7px 16px",
                  borderBottom: showDiscount ? `1px solid ${SLATE_LIGHT}` : "none",
                }}
              >
                <span style={{ color: SLATE_MID, fontSize: "9.5px" }}>IVA ({tax}%):</span>
                <span style={{ color: SLATE_DARK, fontSize: "9.5px", fontWeight: "600" }}>
                  {formatCurrency(taxAmount)}
                </span>
              </div>
            )}

            {showDiscount && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "7px 16px",
                  borderBottom: `1px solid ${SLATE_LIGHT}`,
                }}
              >
                <span style={{ color: "#4A8C6E", fontSize: "9.5px" }}>Descuento:</span>
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
                padding: "10px 16px",
                background: SLATE,
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
                Total:
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

        {data.notes && (
          <div style={{ marginTop: "22px" }}>
            <p
              style={{
                color: SLATE_DARK,
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
                color: SLATE_MID,
                fontSize: "9px",
                lineHeight: "1.7",
                margin: "0 0 16px",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {data.notes}
            </p>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: data.notes ? "8px" : "22px",
            gap: "16px",
          }}
        >
          <div style={{ width: "180px", flexShrink: 0 }}>
            <div
              style={{
                height: "40px",
                borderBottom: `1px solid ${SLATE_LIGHT}`,
                marginBottom: "6px",
              }}
            />
            <p
              style={{
                color: SLATE_MID,
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
                color: SLATE_DARK,
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
              background: SLATE_PALE,
              border: `1px solid ${SLATE_LIGHT}`,
              borderRadius: "10px",
              padding: "10px 14px",
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                overflow: "hidden",
                border: `1px solid ${SLATE_LIGHT}`,
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
                  stroke={SLATE}
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
                  color: SLATE_DARK,
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
                    color: ACCENT,
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

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <div
          style={{
            height: "3px",
            background: `linear-gradient(90deg, ${ACCENT} 0%, #6AACBE 50%, ${ACCENT_LIGHT} 100%)`,
          }}
        />
        <div
          style={{
            background: SLATE_PALE,
            borderTop: `1px solid ${SLATE_LIGHT}`,
            padding: "12px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <p
            style={{
              color: SLATE_MID,
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
              <span style={{ color: SLATE_MID, fontSize: "8px" }}>{data.companyPhone}</span>
            )}
            {data.companyEmail && (
              <span
                style={{
                  color: SLATE_MID,
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
