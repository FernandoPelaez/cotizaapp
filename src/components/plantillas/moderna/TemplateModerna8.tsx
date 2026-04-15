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

export default function TemplateModernaZ({ data }: Props) {
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
      price: Number(service.price || 0),
      total: Number(service.price || 0),
    })),
    ...safeProducts.map((product) => ({
      name: product.name || "Producto",
      description: undefined,
      qty: Number(product.quantity || 0),
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

  const INDIGO = "#3D52A0"
  const INDIGO_DARK = "#1E2D6B"
  const INDIGO_LIGHT = "#D8E0F5"
  const INDIGO_PALE = "#EEF1FB"
  const BG = "#F5F7FF"

  return (
    <div
      id="template-moderna-z"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        backgroundColor: BG,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: "-60px",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: INDIGO_LIGHT,
          opacity: 0.6,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-20px",
          left: "120px",
          width: "110px",
          height: "110px",
          borderRadius: "50%",
          background: INDIGO_LIGHT,
          opacity: 0.35,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          right: "-50px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: INDIGO_LIGHT,
          opacity: 0.5,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          right: "100px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: INDIGO_LIGHT,
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "38px 40px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "16px",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              color: INDIGO_DARK,
              fontSize: "36px",
              fontWeight: "800",
              margin: "0 0 4px",
              letterSpacing: "-0.04em",
              lineHeight: "1",
              wordBreak: "break-word",
            }}
          >
            {documentTitle.toUpperCase()}
          </p>
          {data.docNumber && (
            <p
              style={{
                color: INDIGO,
                fontSize: "10px",
                fontWeight: "600",
                margin: 0,
                letterSpacing: "0.1em",
                opacity: 0.6,
              }}
            >
              N° {data.docNumber}
            </p>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "10px",
              overflow: "hidden",
              border: `1.5px solid ${INDIGO_LIGHT}`,
              background: "#FFFFFF",
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
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke={INDIGO}
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            )}
          </div>

          <div style={{ textAlign: "right", minWidth: 0 }}>
            <p
              style={{
                color: INDIGO_DARK,
                fontSize: "14px",
                fontWeight: "800",
                margin: "0 0 2px",
                letterSpacing: "-0.01em",
                wordBreak: "break-word",
              }}
            >
              {companyName}
            </p>
            {data.companyWeb && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  justifyContent: "flex-end",
                  marginBottom: "1px",
                }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={INDIGO}
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
                <span
                  style={{
                    color: INDIGO,
                    fontSize: "8.5px",
                    fontWeight: "600",
                    wordBreak: "break-word",
                  }}
                >
                  {data.companyWeb}
                </span>
              </div>
            )}
            {data.companyAddress && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  justifyContent: "flex-end",
                }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={INDIGO}
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span
                  style={{
                    color: "#7A86B0",
                    fontSize: "8px",
                    wordBreak: "break-word",
                  }}
                >
                  {data.companyAddress}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 40px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: `1.5px solid ${INDIGO_LIGHT}`,
          marginBottom: "22px",
          paddingBottom: "22px",
          gap: "16px",
        }}
      >
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ display: "flex", gap: "6px", minWidth: 0 }}>
              <span
                style={{
                  color: INDIGO_DARK,
                  fontSize: "9px",
                  fontWeight: "700",
                  minWidth: "44px",
                }}
              >
                Nombre:
              </span>
              <span
                style={{
                  color: "#3C4A6E",
                  fontSize: "9px",
                  wordBreak: "break-word",
                }}
              >
                {clientName}
              </span>
            </div>
          </div>

          {data.clientEmail && (
            <div style={{ display: "flex", gap: "6px", marginTop: "3px", minWidth: 0 }}>
              <span
                style={{
                  color: INDIGO_DARK,
                  fontSize: "9px",
                  fontWeight: "700",
                  minWidth: "44px",
                }}
              >
                Email:
              </span>
              <span
                style={{
                  color: "#3C4A6E",
                  fontSize: "9px",
                  wordBreak: "break-word",
                }}
              >
                {data.clientEmail}
              </span>
            </div>
          )}

          {data.clientPhone && (
            <div style={{ display: "flex", gap: "6px", marginTop: "3px" }}>
              <span
                style={{
                  color: INDIGO_DARK,
                  fontSize: "9px",
                  fontWeight: "700",
                  minWidth: "44px",
                }}
              >
                Tel:
              </span>
              <span style={{ color: "#3C4A6E", fontSize: "9px" }}>{data.clientPhone}</span>
            </div>
          )}

          {data.clientAddress && (
            <div style={{ display: "flex", gap: "6px", marginTop: "3px", minWidth: 0 }}>
              <span
                style={{
                  color: INDIGO_DARK,
                  fontSize: "9px",
                  fontWeight: "700",
                  minWidth: "44px",
                }}
              >
                Dirección:
              </span>
              <span
                style={{
                  color: "#3C4A6E",
                  fontSize: "9px",
                  wordBreak: "break-word",
                }}
              >
                {data.clientAddress}
              </span>
            </div>
          )}
        </div>

        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <span style={{ color: INDIGO_DARK, fontSize: "9px", fontWeight: "700" }}>
            Fecha:{" "}
          </span>
          <span style={{ color: "#3C4A6E", fontSize: "9px" }}>{today}</span>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "0 40px 160px" }}>
        <div
          style={{
            borderRadius: "14px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "36px 1fr 60px 80px 90px",
              background: INDIGO_LIGHT,
              padding: "10px 16px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: INDIGO_DARK,
                fontSize: "8px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              No
            </span>
            <span
              style={{
                color: INDIGO_DARK,
                fontSize: "8px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Servicio / Producto
            </span>
            <span
              style={{
                color: INDIGO_DARK,
                fontSize: "8px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Cant.
            </span>
            <span
              style={{
                color: INDIGO_DARK,
                fontSize: "8px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "700",
                textAlign: "right",
              }}
            >
              Precio
            </span>
            <span
              style={{
                color: INDIGO_DARK,
                fontSize: "8px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "700",
                textAlign: "right",
              }}
            >
              Total
            </span>
          </div>

          {hasItems ? (
            allItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "36px 1fr 60px 80px 90px",
                  padding: "11px 16px",
                  background: index % 2 === 0 ? "#FFFFFF" : INDIGO_PALE,
                  borderBottom:
                    index < allItems.length - 1 ? `1px solid ${INDIGO_LIGHT}` : "none",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: INDIGO,
                    fontSize: "9px",
                    fontWeight: "700",
                    textAlign: "center",
                    background: INDIGO_PALE,
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  {index + 1}
                </span>

                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      color: INDIGO_DARK,
                      fontSize: "10.5px",
                      fontWeight: "600",
                      display: "block",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.name || "-"}
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

                <span
                  style={{
                    color: "#7A86B0",
                    fontSize: "10.5px",
                    textAlign: "center",
                  }}
                >
                  {item.qty}
                </span>

                <span
                  style={{
                    color: "#7A86B0",
                    fontSize: "10.5px",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(item.price)}
                </span>

                <span
                  style={{
                    color: INDIGO_DARK,
                    fontSize: "10.5px",
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
                background: "#FFFFFF",
                textAlign: "center",
              }}
            >
              <span style={{ color: "#7A86B0", fontSize: "10px" }}>
                No hay conceptos registrados en esta cotización.
              </span>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "22px" }}>
          <div
            style={{
              flex: 1,
              background: INDIGO_LIGHT,
              borderRadius: "40px",
              padding: "14px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ color: INDIGO_DARK, fontSize: "10px", fontWeight: "700" }}>
              Subtotal
            </span>
            <span
              style={{
                color: INDIGO_DARK,
                fontSize: "14px",
                fontWeight: "800",
                textAlign: "right",
              }}
            >
              {formatCurrency(subtotal)}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              background: INDIGO,
              borderRadius: "40px",
              padding: "14px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "10px",
                fontWeight: "700",
              }}
            >
              {showTax ? `Total (IVA ${tax}%)` : "Total"}
            </span>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "14px",
                fontWeight: "800",
                textAlign: "right",
              }}
            >
              {formatCurrency(finalTotal)}
            </span>
          </div>
        </div>

        {showDiscount && (
          <div
            style={{
              background: "#E8F5EE",
              borderRadius: "10px",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
              border: "1px solid #C3E5D0",
              gap: "10px",
            }}
          >
            <span style={{ color: "#2D6A4F", fontSize: "10px", fontWeight: "600" }}>
              Descuento aplicado
            </span>
            <span
              style={{
                color: "#2D6A4F",
                fontSize: "10px",
                fontWeight: "700",
                textAlign: "right",
              }}
            >
              - {formatCurrency(discount)}
            </span>
          </div>
        )}

        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
          <div style={{ width: "160px", flexShrink: 0 }}>
            <div
              style={{
                height: "44px",
                borderBottom: `1px solid ${INDIGO_LIGHT}`,
                marginBottom: "6px",
              }}
            />
            <p
              style={{
                color: "#7A86B0",
                fontSize: "8px",
                fontWeight: "600",
                margin: 0,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Firma
            </p>
          </div>

          {data.notes ? (
            <div style={{ flex: 1 }}>
              <p
                style={{
                  color: INDIGO_DARK,
                  fontSize: "10px",
                  fontWeight: "800",
                  margin: "0 0 6px",
                  letterSpacing: "0.04em",
                }}
              >
                Notas y condiciones
              </p>
              <p
                style={{
                  color: "#4A5C7A",
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
          ) : (
            (data.companyPhone || data.companyEmail || data.companyAddress) && (
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    color: INDIGO_DARK,
                    fontSize: "10px",
                    fontWeight: "800",
                    margin: "0 0 6px",
                  }}
                >
                  Datos de contacto
                </p>
                {data.companyPhone && (
                  <p style={{ color: "#4A5C7A", fontSize: "9px", margin: "0 0 2px" }}>
                    {data.companyPhone}
                  </p>
                )}
                {data.companyEmail && (
                  <p
                    style={{
                      color: "#4A5C7A",
                      fontSize: "9px",
                      margin: "0 0 2px",
                      wordBreak: "break-word",
                    }}
                  >
                    {data.companyEmail}
                  </p>
                )}
                {data.companyAddress && (
                  <p
                    style={{
                      color: "#4A5C7A",
                      fontSize: "9px",
                      margin: 0,
                      wordBreak: "break-word",
                    }}
                  >
                    {data.companyAddress}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          background: "#FFFFFF",
          borderTop: `1.5px solid ${INDIGO_LIGHT}`,
          padding: "13px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "18px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {data.companyPhone && (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: INDIGO_PALE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={INDIGO}
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
              </div>
              <span style={{ color: "#4A5C7A", fontSize: "8px" }}>{data.companyPhone}</span>
            </div>
          )}

          {data.companyEmail && (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: INDIGO_PALE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={INDIGO}
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span
                style={{
                  color: "#4A5C7A",
                  fontSize: "8px",
                  wordBreak: "break-word",
                }}
              >
                {data.companyEmail}
              </span>
            </div>
          )}

          {data.companyWeb && (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: INDIGO_PALE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={INDIGO}
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <span
                style={{
                  color: "#4A5C7A",
                  fontSize: "8px",
                  wordBreak: "break-word",
                }}
              >
                {data.companyWeb}
              </span>
            </div>
          )}
        </div>

        <p
          style={{
            color: "#B0BAD4",
            fontSize: "7.5px",
            margin: 0,
            letterSpacing: "0.04em",
            flexShrink: 0,
          }}
        >
          Válido 30 días · {today}
        </p>
      </div>
    </div>
  )
}
