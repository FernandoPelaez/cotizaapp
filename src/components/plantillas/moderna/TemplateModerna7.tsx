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

export default function TemplateModernaY({ data }: Props) {
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
  const totalLabel = showTax ? `IVA ${tax}% incluido` : "Monto final"

  const formatCurrency = (value: number) =>
    `$${Number(value || 0).toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`

  return (
    <div
      id="template-moderna-y"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily: "Georgia, 'Times New Roman', serif",
        backgroundColor: "#F9F7F4",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "8px",
          background: "linear-gradient(90deg, #2D6A4F 0%, #52B788 50%, #95D5B2 100%)",
        }}
      />

      <div
        style={{
          background: "#2D3A2E",
          padding: "30px 40px 26px",
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
            width: "240px",
            background:
              "repeating-linear-gradient(-55deg, rgba(82,183,136,0.06) 0px, rgba(82,183,136,0.06) 1px, transparent 1px, transparent 18px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            background: "rgba(82,183,136,0.08)",
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              minWidth: 0,
              flex: 1,
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "14px",
                overflow: "hidden",
                flexShrink: 0,
                border: "1.5px solid rgba(149,213,178,0.25)",
                background: "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(149,213,178,0.6)"
                  strokeWidth="1.3"
                >
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              )}
            </div>

            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: "18px",
                  fontWeight: "700",
                  margin: "0 0 3px",
                  fontFamily: "Georgia, serif",
                  letterSpacing: "0.01em",
                  wordBreak: "break-word",
                }}
              >
                {companyName}
              </p>

              <p
                style={{
                  color: "#95D5B2",
                  fontSize: "8px",
                  margin: "0 0 8px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                  fontWeight: "600",
                }}
              >
                Servicios profesionales
              </p>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                {data.companyPhone && (
                  <span
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "8px",
                      fontFamily: "'Segoe UI', system-ui, sans-serif",
                    }}
                  >
                    {data.companyPhone}
                  </span>
                )}
                {data.companyEmail && (
                  <span
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "8px",
                      fontFamily: "'Segoe UI', system-ui, sans-serif",
                      wordBreak: "break-word",
                    }}
                  >
                    {data.companyEmail}
                  </span>
                )}
                {data.companyWeb && (
                  <span
                    style={{
                      color: "#95D5B2",
                      fontSize: "8px",
                      fontFamily: "'Segoe UI', system-ui, sans-serif",
                      fontWeight: "600",
                      wordBreak: "break-word",
                    }}
                  >
                    {data.companyWeb}
                  </span>
                )}
                {data.companyAddress && (
                  <span
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "8px",
                      fontFamily: "'Segoe UI', system-ui, sans-serif",
                      wordBreak: "break-word",
                    }}
                  >
                    {data.companyAddress}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p
              style={{
                color: "#95D5B2",
                fontSize: "9px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                fontWeight: "600",
                margin: "0 0 5px",
                wordBreak: "break-word",
              }}
            >
              {documentTitle}
            </p>

            {data.docNumber && (
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: "22px",
                  fontWeight: "700",
                  margin: "0 0 6px",
                  fontFamily: "Georgia, serif",
                  letterSpacing: "-0.01em",
                }}
              >
                #{data.docNumber}
              </p>
            )}

            <p
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "8.5px",
                margin: 0,
                fontFamily: "'Segoe UI', system-ui, sans-serif",
              }}
            >
              {today}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "26px 40px 140px" }}>
        <div style={{ display: "flex", gap: "14px", marginBottom: "22px" }}>
          <div
            style={{
              flex: 1,
              background: "#FFFFFF",
              borderRadius: "10px",
              border: "1px solid #DDE8E0",
              padding: "16px 20px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "16px",
                bottom: "16px",
                left: 0,
                width: "3px",
                background: "linear-gradient(180deg, #52B788, #95D5B2)",
                borderRadius: "0 2px 2px 0",
              }}
            />

            <p
              style={{
                color: "#52B788",
                fontSize: "7.5px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: "600",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                margin: "0 0 8px",
              }}
            >
              Preparado para
            </p>

            <p
              style={{
                color: "#1A2B1C",
                fontSize: "15px",
                fontWeight: "700",
                margin: "0 0 5px",
                fontFamily: "Georgia, serif",
                lineHeight: "1.2",
                wordBreak: "break-word",
              }}
            >
              {clientName}
            </p>

            {data.clientEmail && (
              <p
                style={{
                  color: "#6B7E6D",
                  fontSize: "9px",
                  margin: "0 0 2px",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                  wordBreak: "break-word",
                }}
              >
                {data.clientEmail}
              </p>
            )}
            {data.clientPhone && (
              <p
                style={{
                  color: "#6B7E6D",
                  fontSize: "9px",
                  margin: "0 0 2px",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}
              >
                {data.clientPhone}
              </p>
            )}
            {data.clientAddress && (
              <p
                style={{
                  color: "#6B7E6D",
                  fontSize: "9px",
                  margin: 0,
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                  wordBreak: "break-word",
                }}
              >
                {data.clientAddress}
              </p>
            )}
          </div>

          <div
            style={{
              width: "172px",
              background: "#2D6A4F",
              borderRadius: "10px",
              padding: "18px 16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
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
                top: "-30px",
                left: "-30px",
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                background: "rgba(149,213,178,0.1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
              }}
            />

            <p
              style={{
                color: "#95D5B2",
                fontSize: "7.5px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                fontWeight: "600",
                margin: "0 0 7px",
                position: "relative",
                zIndex: 1,
              }}
            >
              Total a pagar
            </p>

            <p
              style={{
                color: "#FFFFFF",
                fontSize: "24px",
                fontWeight: "700",
                margin: 0,
                lineHeight: "1",
                fontFamily: "Georgia, serif",
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
                color: "rgba(255,255,255,0.3)",
                fontSize: "8px",
                margin: "3px 0 0",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                position: "relative",
                zIndex: 1,
              }}
            >
              MXN
            </p>

            <div
              style={{
                width: "40px",
                height: "1px",
                background: "rgba(149,213,178,0.35)",
                margin: "10px auto",
                position: "relative",
                zIndex: 1,
              }}
            />

            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "7.5px",
                margin: 0,
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                position: "relative",
                zIndex: 1,
                letterSpacing: "0.04em",
              }}
            >
              {totalLabel}
            </p>
          </div>
        </div>

        <div
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid #DDE8E0",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 50px 90px 90px",
              background: "#2D3A2E",
              padding: "10px 18px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "7.5px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                fontWeight: "600",
              }}
            >
              Descripción
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "7.5px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Cant.
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "7.5px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                fontWeight: "600",
                textAlign: "right",
              }}
            >
              Precio unit.
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "7.5px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                fontWeight: "600",
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
                  gridTemplateColumns: "1fr 50px 90px 90px",
                  padding: "12px 18px",
                  background: index % 2 === 0 ? "#FFFFFF" : "#F4F8F5",
                  borderBottom:
                    index < allItems.length - 1 ? "1px solid #EAF0EB" : "none",
                  alignItems: "center",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      color: "#1A2B1C",
                      fontSize: "10.5px",
                      fontWeight: "700",
                      fontFamily: "Georgia, serif",
                      display: "block",
                      lineHeight: "1.3",
                      wordBreak: "break-word",
                    }}
                  >
                    {item.name || "-"}
                  </span>
                  {item.description && (
                    <span
                      style={{
                        color: "#8FA890",
                        fontSize: "8px",
                        fontFamily: "'Segoe UI', system-ui, sans-serif",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.description}
                    </span>
                  )}
                </div>

                <span
                  style={{
                    color: "#8FA890",
                    fontSize: "10.5px",
                    textAlign: "center",
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                  }}
                >
                  {item.qty}
                </span>

                <span
                  style={{
                    color: "#8FA890",
                    fontSize: "10.5px",
                    textAlign: "right",
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                  }}
                >
                  {formatCurrency(item.price)}
                </span>

                <span
                  style={{
                    color: "#2D6A4F",
                    fontSize: "10.5px",
                    fontWeight: "700",
                    textAlign: "right",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  {formatCurrency(item.total)}
                </span>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "18px 18px",
                background: "#FFFFFF",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "#8FA890",
                  fontSize: "10px",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}
              >
                No hay conceptos registrados en esta cotización.
              </span>
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <div style={{ width: "228px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 14px",
                borderBottom: "1px solid #E4EDE6",
              }}
            >
              <span
                style={{
                  color: "#8FA890",
                  fontSize: "10px",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  color: "#2D3A2E",
                  fontSize: "10px",
                  fontWeight: "600",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}
              >
                {formatCurrency(subtotal)}
              </span>
            </div>

            {showTax && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 14px",
                  borderBottom: showDiscount ? "1px dashed #E4EDE6" : "none",
                }}
              >
                <span
                  style={{
                    color: "#8FA890",
                    fontSize: "10px",
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                  }}
                >
                  IVA ({tax}%)
                </span>
                <span
                  style={{
                    color: "#2D3A2E",
                    fontSize: "10px",
                    fontWeight: "600",
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                  }}
                >
                  {formatCurrency(taxAmount)}
                </span>
              </div>
            )}

            {showDiscount && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 14px",
                  borderBottom: "1px solid #E4EDE6",
                }}
              >
                <span
                  style={{
                    color: "#52B788",
                    fontSize: "10px",
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                  }}
                >
                  Descuento
                </span>
                <span
                  style={{
                    color: "#52B788",
                    fontSize: "10px",
                    fontWeight: "600",
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                  }}
                >
                  - {formatCurrency(discount)}
                </span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                marginTop: "8px",
                background: "#2D3A2E",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                  fontWeight: "600",
                }}
              >
                {showTax ? "Total con IVA" : "Total"}
              </span>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: "18px",
                  fontWeight: "700",
                  fontFamily: "Georgia, serif",
                  letterSpacing: "-0.01em",
                }}
              >
                {formatCurrency(finalTotal)}
              </span>
            </div>
          </div>
        </div>

        {data.notes && (
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "10px",
              border: "1px solid #DDE8E0",
              padding: "14px 18px",
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                background: "#EAF4EE",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#52B788"
                strokeWidth="2.2"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            <div>
              <p
                style={{
                  color: "#2D6A4F",
                  fontSize: "7.5px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                  fontWeight: "700",
                  margin: "0 0 5px",
                }}
              >
                Notas y condiciones
              </p>
              <p
                style={{
                  color: "#4A6350",
                  fontSize: "9.5px",
                  lineHeight: "1.7",
                  margin: 0,
                  fontFamily: "Georgia, serif",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {data.notes}
              </p>
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <p
            style={{
              color: "#A0B0A2",
              fontSize: "8px",
              margin: 0,
              fontFamily: "'Segoe UI', system-ui, sans-serif",
              fontStyle: "italic",
            }}
          >
            Este documento tiene vigencia de 30 días naturales.
          </p>

          <div style={{ textAlign: "center", width: "160px" }}>
            <div
              style={{
                height: "38px",
                borderBottom: "1px solid #B8CDB9",
                marginBottom: "6px",
              }}
            />
            <p
              style={{
                color: "#2D3A2E",
                fontSize: "9px",
                fontWeight: "700",
                margin: "0 0 2px",
                fontFamily: "Georgia, serif",
                wordBreak: "break-word",
              }}
            >
              {companyName}
            </p>
            <p
              style={{
                color: "#8FA890",
                fontSize: "7.5px",
                margin: 0,
                fontFamily: "'Segoe UI', system-ui, sans-serif",
              }}
            >
              Firma autorizada
            </p>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <div
          style={{
            height: "3px",
            background: "linear-gradient(90deg, #2D6A4F 0%, #52B788 50%, #95D5B2 100%)",
          }}
        />

        <div
          style={{
            background: "#2D3A2E",
            padding: "14px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {data.companyPhone && (
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#52B788"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "8px",
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                  }}
                >
                  {data.companyPhone}
                </span>
              </div>
            )}

            {data.companyEmail && (
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#52B788"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "8px",
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                    wordBreak: "break-word",
                  }}
                >
                  {data.companyEmail}
                </span>
              </div>
            )}

            {data.companyWeb && (
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#52B788"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "8px",
                    fontFamily: "'Segoe UI', system-ui, sans-serif",
                    wordBreak: "break-word",
                  }}
                >
                  {data.companyWeb}
                </span>
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <div style={{ width: "18px", height: "1px", background: "#52B788", opacity: 0.5 }} />
            <p
              style={{
                color: "#95D5B2",
                fontSize: "8px",
                margin: 0,
                fontFamily: "Georgia, serif",
                letterSpacing: "0.06em",
                wordBreak: "break-word",
              }}
            >
              {companyName}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
