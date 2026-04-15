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

export default function TemplateModerna4({ data }: Props) {
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
  const totalLabel = showTax ? "Total con IVA" : "Total"

  const formatCurrency = (value: number) =>
    `$${Number(value || 0).toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`

  return (
    <div
      id="template-moderna4"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        backgroundColor: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
        color: "#1A5276",
      }}
    >
      {/* Franja lateral izquierda decorativa */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "5px",
          height: "100%",
          background: "linear-gradient(180deg, #1A5276 0%, #2E86C1 50%, #AED6F1 100%)",
        }}
      />

      {/* Forma decorativa superior derecha */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "200px",
          height: "160px",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: "#EBF5FB",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-20px",
            right: "20px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "#D6EAF8",
            opacity: 0.6,
          }}
        />
      </div>

      {/* HEADER */}
      <div
        style={{
          padding: "30px 36px 22px 46px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
          gap: "20px",
        }}
      >
        {/* Logo + empresa */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "#1A5276",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
              flexShrink: 0,
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.8"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>

          <p
            style={{
              color: "#1A5276",
              fontSize: "17px",
              fontWeight: "800",
              margin: "0 0 2px",
              letterSpacing: "-0.02em",
              wordBreak: "break-word",
            }}
          >
            {companyName}
          </p>

          <p
            style={{
              color: "#2E86C1",
              fontSize: "8.5px",
              margin: "0 0 6px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            Propuesta comercial
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {data.companyPhone && (
              <span
                style={{
                  color: "#6B7280",
                  fontSize: "8.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  wordBreak: "break-word",
                }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2E86C1"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
                {data.companyPhone}
              </span>
            )}

            {data.companyEmail && (
              <span
                style={{
                  color: "#6B7280",
                  fontSize: "8.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  wordBreak: "break-word",
                }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2E86C1"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {data.companyEmail}
              </span>
            )}

            {data.companyWeb && (
              <span
                style={{
                  color: "#2E86C1",
                  fontSize: "8.5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontWeight: "600",
                  wordBreak: "break-word",
                }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2E86C1"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
                {data.companyWeb}
              </span>
            )}

            {data.companyAddress && (
              <span
                style={{
                  color: "#6B7280",
                  fontSize: "8.5px",
                  wordBreak: "break-word",
                }}
              >
                {data.companyAddress}
              </span>
            )}
          </div>
        </div>

        {/* Título documento */}
        <div style={{ textAlign: "right", paddingTop: "6px", flexShrink: 0 }}>
          <div
            style={{
              background: "#1A5276",
              borderRadius: "10px",
              padding: "12px 20px",
              marginBottom: "10px",
              display: "inline-block",
              maxWidth: "220px",
            }}
          >
            <p
              style={{
                color: "#FFFFFF",
                fontSize: "18px",
                fontWeight: "800",
                margin: 0,
                letterSpacing: "0.04em",
                wordBreak: "break-word",
              }}
            >
              {documentTitle.toUpperCase()}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "4px",
            }}
          >
            {data.docNumber && (
              <div
                style={{
                  background: "#EBF5FB",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    color: "#2E86C1",
                    fontSize: "8px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  No.
                </span>
                <span
                  style={{
                    color: "#1A5276",
                    fontSize: "11px",
                    fontWeight: "700",
                  }}
                >
                  {data.docNumber}
                </span>
              </div>
            )}
            <span style={{ color: "#9CA3AF", fontSize: "8.5px" }}>{today}</span>
          </div>
        </div>
      </div>

      {/* Línea separadora elegante */}
      <div
        style={{
          margin: "0 36px 0 46px",
          height: "1px",
          background: "linear-gradient(90deg, #1A5276 0%, #AED6F1 60%, transparent 100%)",
        }}
      />

      {/* CUERPO */}
      <div
        style={{
          padding: "20px 36px 110px 46px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Bloque cliente + resumen */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "22px" }}>
          {/* Info cliente */}
          <div
            style={{
              flex: 1,
              background: "#F8FAFC",
              border: "1px solid #D6EAF8",
              borderRadius: "10px",
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "#1A5276",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.5"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span
                style={{
                  color: "#1A5276",
                  fontSize: "8px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}
              >
                Datos del cliente
              </span>
            </div>

            <p
              style={{
                color: "#1A5276",
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
                  color: "#6B7280",
                  fontSize: "9px",
                  margin: "0 0 2px",
                  wordBreak: "break-word",
                }}
              >
                {data.clientEmail}
              </p>
            )}
            {data.clientPhone && (
              <p style={{ color: "#6B7280", fontSize: "9px", margin: "0 0 2px" }}>
                {data.clientPhone}
              </p>
            )}
            {data.clientAddress && (
              <p
                style={{
                  color: "#6B7280",
                  fontSize: "9px",
                  margin: 0,
                  wordBreak: "break-word",
                }}
              >
                {data.clientAddress}
              </p>
            )}
          </div>

          {/* Total hero */}
          <div
            style={{
              width: "165px",
              background: "#1A5276",
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
                bottom: "-25px",
                right: "-25px",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "rgba(46,134,193,0.3)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-15px",
                left: "-15px",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "rgba(174,214,241,0.15)",
              }}
            />

            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "7.5px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                margin: "0 0 6px",
                position: "relative",
                zIndex: 1,
                fontWeight: "600",
              }}
            >
              Total a pagar
            </p>

            <p
              style={{
                color: "#FFFFFF",
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
                color: "rgba(255,255,255,0.35)",
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
                width: "35px",
                height: "1px",
                background: "rgba(174,214,241,0.5)",
                margin: "10px auto",
                position: "relative",
                zIndex: 1,
              }}
            />

            <div
              style={{
                background: "rgba(46,134,193,0.4)",
                borderRadius: "20px",
                padding: "3px 10px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "7.5px",
                  margin: 0,
                  letterSpacing: "0.06em",
                }}
              >
                {showTax ? `Incluye IVA ${tax}%` : "Monto final"}
              </p>
            </div>
          </div>
        </div>

        {/* Mensaje personalizado */}
        <div
          style={{
            background: "#EBF5FB",
            borderLeft: "3px solid #2E86C1",
            borderRadius: "0 8px 8px 0",
            padding: "10px 14px",
            marginBottom: "20px",
            display: "flex",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2E86C1"
            strokeWidth="2"
            style={{ flexShrink: 0, marginTop: "1px" }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{ color: "#1A5276", fontSize: "9px", lineHeight: "1.7", margin: 0 }}>
            Estimado(a) <strong>{clientName}</strong>, a continuación se presenta el
            detalle de los conceptos incluidos en esta cotización. Esta propuesta
            tiene vigencia de <strong>30 días naturales</strong>.
          </p>
        </div>

        {/* TABLA */}
        <div
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid #D6EAF8",
          }}
        >
          {/* Header tabla */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 50px 88px 88px",
              background: "#1A5276",
              padding: "10px 16px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "8px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Descripción
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "8px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Cant.
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "8px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: "700",
                textAlign: "right",
              }}
            >
              Precio unit.
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "8px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: "700",
                textAlign: "right",
              }}
            >
              Total
            </span>
          </div>

          {/* Filas */}
          {hasItems ? (
            allItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 50px 88px 88px",
                  padding: "11px 16px",
                  background: index % 2 === 0 ? "#FFFFFF" : "#F8FBFE",
                  borderBottom:
                    index < allItems.length - 1 ? "1px solid #EBF5FB" : "none",
                  alignItems: "center",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      color: "#1A5276",
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
                        color: "#9CA3AF",
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
                    color: "#6B7280",
                    fontSize: "10.5px",
                    textAlign: "center",
                  }}
                >
                  {item.qty}
                </span>

                <span
                  style={{
                    color: "#6B7280",
                    fontSize: "10.5px",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(item.price)}
                </span>

                <span
                  style={{
                    color: "#1A5276",
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
              <span style={{ color: "#9CA3AF", fontSize: "10px" }}>
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
                borderBottom: "1px solid #EBF5FB",
              }}
            >
              <span style={{ color: "#9CA3AF", fontSize: "10px" }}>Subtotal</span>
              <span
                style={{
                  color: "#1A5276",
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
                  borderBottom: showDiscount ? "1px dashed #D6EAF8" : "none",
                }}
              >
                <span style={{ color: "#9CA3AF", fontSize: "10px" }}>
                  IVA ({tax}%)
                </span>
                <span
                  style={{
                    color: "#1A5276",
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
                  borderBottom: "1px solid #EBF5FB",
                }}
              >
                <span style={{ color: "#0F6E56", fontSize: "10px" }}>Descuento</span>
                <span
                  style={{
                    color: "#0F6E56",
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
                padding: "12px 14px",
                marginTop: "8px",
                background: "#1A5276",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "9px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}
              >
                {totalLabel}
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
              background: "#F8FBFE",
              borderRadius: "10px",
              border: "1px solid #D6EAF8",
              padding: "13px 16px",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "6px",
                background: "#2E86C1",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <div>
              <p
                style={{
                  color: "#1A5276",
                  fontSize: "7.5px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: "700",
                  margin: "0 0 4px",
                }}
              >
                Notas y condiciones
              </p>
              <p
                style={{
                  color: "#4B6B8A",
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
          </div>
        )}

        {/* Firma */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
          <div style={{ textAlign: "center", width: "160px" }}>
            <div
              style={{
                height: "1px",
                background: "#D6EAF8",
                marginBottom: "6px",
              }}
            />
            <p
              style={{
                color: "#1A5276",
                fontSize: "9px",
                fontWeight: "600",
                margin: "0 0 2px",
                wordBreak: "break-word",
              }}
            >
              {companyName}
            </p>
            <p style={{ color: "#9CA3AF", fontSize: "8px", margin: 0 }}>Firma y sello</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <div
          style={{
            height: "3px",
            background: "linear-gradient(90deg, #1A5276 0%, #2E86C1 50%, #AED6F1 100%)",
          }}
        />
        <div
          style={{
            background: "#1A5276",
            padding: "14px 36px 14px 46px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
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
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "8px",
                    wordBreak: "break-word",
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
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
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
                <svg
                  width="9"
                  height="9"
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
                    color: "rgba(255,255,255,0.5)",
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
              color: "rgba(255,255,255,0.25)",
              fontSize: "7.5px",
              margin: 0,
              letterSpacing: "0.04em",
              textAlign: "right",
            }}
          >
            Documento válido por 30 días · {today}
          </p>
        </div>
      </div>
    </div>
  )
}
