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
  const totalLabel = showTax ? `IVA ${tax}% incl.` : "Monto final"

  const formatCurrency = (value: number) =>
    `$${Number(value || 0).toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`

  return (
    <div
      id="template-moderna-wave"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        backgroundColor: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ONDA SUPERIOR IZQUIERDA */}
      <svg
        viewBox="0 0 595 200"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "595px",
          height: "200px",
          zIndex: 0,
        }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L595,0 L595,80 Q500,160 380,120 Q260,80 160,140 Q80,180 0,160 Z"
          fill="#1B2A4A"
        />
        <path
          d="M0,0 L260,0 L260,100 Q180,150 80,130 Q40,120 0,110 Z"
          fill="#243656"
          opacity="0.6"
        />
      </svg>

      {/* ONDA INFERIOR DERECHA */}
      <svg
        viewBox="0 0 595 180"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "595px",
          height: "180px",
          zIndex: 0,
        }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,180 L595,180 L595,40 Q480,0 360,60 Q240,120 120,50 Q60,20 0,50 Z"
          fill="#1B2A4A"
        />
        <path
          d="M595,180 L300,180 L300,80 Q400,20 500,60 Q560,80 595,100 Z"
          fill="#243656"
          opacity="0.5"
        />
      </svg>

      {/* HEADER */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "28px 36px 0 36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* Logo + empresa */}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.4"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M8 12l2 2 4-4" />
            </svg>
          </div>

          <p
            style={{
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "800",
              margin: "0 0 2px",
              letterSpacing: "-0.01em",
              wordBreak: "break-word",
            }}
          >
            {companyName}
          </p>

          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "8px",
              margin: 0,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            Servicios profesionales
          </p>
        </div>

        {/* Fecha + número */}
        <div style={{ textAlign: "right", paddingTop: "4px", flexShrink: 0 }}>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "8.5px",
              margin: "0 0 4px",
              letterSpacing: "0.08em",
            }}
          >
            {today}
          </p>

          {data.docNumber && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px",
                padding: "4px 12px",
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "7.5px",
                  letterSpacing: "0.1em",
                }}
              >
                N°
              </span>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: "10px",
                  fontWeight: "700",
                }}
              >
                {data.docNumber}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Título */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "16px 36px 0",
        }}
      >
        <p
          style={{
            color: "#FFFFFF",
            fontSize: "28px",
            fontWeight: "800",
            margin: 0,
            letterSpacing: "-0.03em",
            lineHeight: "1",
            opacity: 0.92,
            wordBreak: "break-word",
          }}
        >
          {documentTitle.toUpperCase()}
        </p>
      </div>

      {/* CUERPO */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "28px 36px 200px",
        }}
      >
        {/* Cliente + total */}
        <div style={{ display: "flex", gap: "14px", marginBottom: "24px" }}>
          {/* Cliente */}
          <div
            style={{
              flex: 1,
              background: "#F7F9FC",
              border: "1px solid #E2E8F2",
              borderRadius: "12px",
              padding: "16px 18px",
            }}
          >
            <p
              style={{
                color: "#8A9BB5",
                fontSize: "7.5px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: "700",
                margin: "0 0 8px",
              }}
            >
              Preparado para
            </p>
            <p
              style={{
                color: "#1B2A4A",
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
                  color: "#6B7A94",
                  fontSize: "9px",
                  margin: "0 0 2px",
                  wordBreak: "break-word",
                }}
              >
                {data.clientEmail}
              </p>
            )}
            {data.clientPhone && (
              <p style={{ color: "#6B7A94", fontSize: "9px", margin: "0 0 2px" }}>
                {data.clientPhone}
              </p>
            )}
            {data.clientAddress && (
              <p
                style={{
                  color: "#6B7A94",
                  fontSize: "9px",
                  margin: 0,
                  wordBreak: "break-word",
                }}
              >
                {data.clientAddress}
              </p>
            )}
          </div>

          {/* Total */}
          <div
            style={{
              width: "168px",
              background: "#1B2A4A",
              borderRadius: "12px",
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
                bottom: "-30px",
                right: "-30px",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
              }}
            />

            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "7.5px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                margin: "0 0 6px",
                fontWeight: "600",
                position: "relative",
                zIndex: 1,
              }}
            >
              Total a pagar
            </p>

            <p
              style={{
                color: "#FFFFFF",
                fontSize: "22px",
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
                color: "rgba(255,255,255,0.25)",
                fontSize: "8px",
                margin: "3px 0 0",
                position: "relative",
                zIndex: 1,
              }}
            >
              MXN
            </p>

            <div
              style={{
                width: "36px",
                height: "1px",
                background: "rgba(255,255,255,0.15)",
                margin: "10px auto",
                position: "relative",
                zIndex: 1,
              }}
            />

            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "3px 10px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "7.5px",
                  margin: 0,
                  letterSpacing: "0.06em",
                }}
              >
                {totalLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Info empresa */}
        <div
          style={{
            display: "flex",
            gap: "18px",
            marginBottom: "20px",
            padding: "9px 14px",
            background: "#F0F4FA",
            borderRadius: "8px",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#8A9BB5",
              fontSize: "7px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: "700",
              flexShrink: 0,
            }}
          >
            Emisor
          </span>

          <div style={{ width: "1px", height: "12px", background: "#D0D8E8" }} />

          <div
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {data.companyPhone && (
              <span style={{ color: "#4A5C7A", fontSize: "8.5px" }}>
                {data.companyPhone}
              </span>
            )}
            {data.companyEmail && (
              <span
                style={{
                  color: "#4A5C7A",
                  fontSize: "8.5px",
                  wordBreak: "break-word",
                }}
              >
                {data.companyEmail}
              </span>
            )}
            {data.companyWeb && (
              <span
                style={{
                  color: "#4A5C7A",
                  fontSize: "8.5px",
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
                  color: "#4A5C7A",
                  fontSize: "8.5px",
                  wordBreak: "break-word",
                }}
              >
                {data.companyAddress}
              </span>
            )}
          </div>
        </div>

        {/* TABLA */}
        <div
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid #E2E8F2",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 50px 88px 88px",
              background: "#1B2A4A",
              padding: "10px 16px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "7.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Descripción
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "7.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Cant.
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "7.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: "700",
                textAlign: "right",
              }}
            >
              P. Unit.
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "7.5px",
                letterSpacing: "0.18em",
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
                  gridTemplateColumns: "1fr 50px 88px 88px",
                  padding: "11px 16px",
                  background: index % 2 === 0 ? "#FFFFFF" : "#F7F9FC",
                  borderBottom:
                    index < allItems.length - 1 ? "1px solid #EDF1F8" : "none",
                  alignItems: "center",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      color: "#1B2A4A",
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
                    color: "#8A9BB5",
                    fontSize: "10.5px",
                    textAlign: "center",
                  }}
                >
                  {item.qty}
                </span>

                <span
                  style={{
                    color: "#8A9BB5",
                    fontSize: "10.5px",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(item.price)}
                </span>

                <span
                  style={{
                    color: "#1B2A4A",
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
              <span style={{ color: "#8A9BB5", fontSize: "10px" }}>
                No hay conceptos registrados en esta cotización.
              </span>
            </div>
          )}
        </div>

        {/* TOTALES */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "14px" }}>
          <div style={{ width: "220px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 12px",
                borderBottom: "1px solid #EDF1F8",
              }}
            >
              <span style={{ color: "#8A9BB5", fontSize: "10px" }}>Subtotal</span>
              <span
                style={{
                  color: "#1B2A4A",
                  fontSize: "10px",
                  fontWeight: "600",
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
                  padding: "5px 12px",
                  borderBottom: showDiscount ? "1px dashed #E2E8F2" : "none",
                }}
              >
                <span style={{ color: "#8A9BB5", fontSize: "10px" }}>
                  IVA ({tax}%)
                </span>
                <span
                  style={{
                    color: "#1B2A4A",
                    fontSize: "10px",
                    fontWeight: "600",
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
                  padding: "5px 12px",
                  borderBottom: "1px solid #EDF1F8",
                }}
              >
                <span style={{ color: "#5B8C6E", fontSize: "10px" }}>Descuento</span>
                <span
                  style={{
                    color: "#5B8C6E",
                    fontSize: "10px",
                    fontWeight: "600",
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
                padding: "11px 14px",
                marginTop: "8px",
                background: "#1B2A4A",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "9px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}
              >
                {showTax ? "Total con IVA" : "Total"}
              </span>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: "17px",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                }}
              >
                {formatCurrency(finalTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* NOTAS */}
        {data.notes && (
          <div
            style={{
              marginTop: "18px",
              background: "#F7F9FC",
              borderRadius: "10px",
              border: "1px solid #E2E8F2",
              borderLeft: "3px solid #1B2A4A",
              padding: "12px 16px",
            }}
          >
            <p
              style={{
                color: "#1B2A4A",
                fontSize: "7.5px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: "700",
                margin: "0 0 5px",
              }}
            >
              Nota
            </p>
            <p
              style={{
                color: "#4A5C7A",
                fontSize: "9.5px",
                lineHeight: "1.65",
                margin: 0,
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {data.notes}
            </p>
          </div>
        )}

        {/* Firma */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "22px" }}>
          <div style={{ textAlign: "center", width: "155px" }}>
            <div
              style={{
                height: "36px",
                borderBottom: "1px solid #C8D3E5",
                marginBottom: "6px",
              }}
            />
            <p
              style={{
                color: "#1B2A4A",
                fontSize: "9px",
                fontWeight: "700",
                margin: "0 0 2px",
                wordBreak: "break-word",
              }}
            >
              {companyName}
            </p>
            <p style={{ color: "#8A9BB5", fontSize: "7.5px", margin: 0 }}>
              Firma y sello
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          padding: "0 36px 22px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {data.companyPhone && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
              </svg>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "8px" }}>
                {data.companyPhone}
              </span>
            </div>
          )}

          {data.companyEmail && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "8px",
                  wordBreak: "break-word",
                }}
              >
                {data.companyEmail}
              </span>
            </div>
          )}

          {data.companyWeb && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span
                style={{
                  color: "rgba(255,255,255,0.6)",
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
            color: "rgba(255,255,255,0.3)",
            fontSize: "7.5px",
            margin: 0,
            letterSpacing: "0.04em",
            textAlign: "right",
          }}
        >
          Válido por 30 días · {today}
        </p>
      </div>
    </div>
  )
}
