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

export default function TemplateModerna3({ data }: Props) {
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
      id="template-moderna3"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        backgroundColor: "#F8F7FF",
        position: "relative",
        overflow: "hidden",
        color: "#1E1040",
      }}
    >
      {/* Decorativos fondo */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "280px",
          height: "280px",
          background: "linear-gradient(135deg,#6C3FC5 0%,#9B6FE8 100%)",
          borderRadius: "50%",
          opacity: 0.12,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "60px",
          width: "140px",
          height: "140px",
          background: "#F59E0B",
          borderRadius: "50%",
          opacity: 0.08,
        }}
      />

      {/* Franja superior */}
      <div
        style={{
          height: "5px",
          background: "linear-gradient(90deg,#6C3FC5 0%,#9B6FE8 50%,#F59E0B 100%)",
        }}
      />

      {/* HEADER */}
      <div
        style={{
          padding: "28px 36px 24px 36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid #EDE9FF",
          gap: "20px",
        }}
      >
        {/* Logo + empresa */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              border: "2px dashed #C4B5F4",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#F3F0FF",
              flexShrink: 0,
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9B6FE8"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M3 9l4-4 4 4 4-4 4 4" />
              <path d="M3 15l4-4 4 4 4-4 4 4" />
            </svg>
            <span
              style={{
                fontSize: "7px",
                color: "#C4B5F4",
                letterSpacing: "0.08em",
                marginTop: "2px",
              }}
            >
              LOGO
            </span>
          </div>

          <div style={{ minWidth: 0 }}>
            <p
              style={{
                color: "#1E1040",
                fontSize: "16px",
                fontWeight: "800",
                margin: 0,
                letterSpacing: "-0.01em",
                lineHeight: "1.2",
                wordBreak: "break-word",
              }}
            >
              {companyName}
            </p>

            <p
              style={{
                color: "#9B6FE8",
                fontSize: "9px",
                margin: "3px 0 0",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              Propuesta comercial
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "5px",
                flexWrap: "wrap",
              }}
            >
              {data.companyPhone && (
                <span style={{ color: "#9CA3AF", fontSize: "8.5px" }}>
                  {data.companyPhone}
                </span>
              )}
              {data.companyPhone && data.companyEmail && (
                <span style={{ color: "#D8B4FE", fontSize: "8px" }}>•</span>
              )}
              {data.companyEmail && (
                <span
                  style={{
                    color: "#9CA3AF",
                    fontSize: "8.5px",
                    wordBreak: "break-word",
                  }}
                >
                  {data.companyEmail}
                </span>
              )}
            </div>

            {data.companyWeb && (
              <p
                style={{
                  color: "#9B6FE8",
                  fontSize: "8.5px",
                  margin: "2px 0 0",
                  fontWeight: "600",
                  wordBreak: "break-word",
                }}
              >
                {data.companyWeb}
              </p>
            )}

            {data.companyAddress && (
              <p
                style={{
                  color: "#9CA3AF",
                  fontSize: "8.5px",
                  margin: "2px 0 0",
                  wordBreak: "break-word",
                }}
              >
                {data.companyAddress}
              </p>
            )}
          </div>
        </div>

        {/* Título + número doc */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg,#6C3FC5,#9B6FE8)",
              borderRadius: "10px",
              padding: "10px 18px",
              marginBottom: "8px",
              maxWidth: "220px",
            }}
          >
            <p
              style={{
                color: "#FFFFFF",
                fontSize: "20px",
                fontWeight: "800",
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: "1",
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
              gap: "3px",
            }}
          >
            {data.docNumber && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    color: "#9CA3AF",
                    fontSize: "8.5px",
                    letterSpacing: "0.06em",
                  }}
                >
                  N°
                </span>
                <span
                  style={{
                    color: "#1E1040",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.04em",
                  }}
                >
                  #{data.docNumber}
                </span>
              </div>
            )}
            <span style={{ color: "#9CA3AF", fontSize: "8.5px" }}>{today}</span>
          </div>
        </div>
      </div>

      {/* CUERPO */}
      <div style={{ padding: "22px 36px 100px 36px" }}>
        {/* Fila: cliente + total */}
        <div style={{ display: "flex", gap: "14px", marginBottom: "22px" }}>
          {/* Tarjeta cliente */}
          <div style={{ flex: 1, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "3px",
                height: "100%",
                background: "linear-gradient(180deg,#6C3FC5,#C4B5F4)",
                borderRadius: "2px",
              }}
            />
            <div
              style={{
                padding: "14px 16px 14px 20px",
                background: "#FFFFFF",
                borderRadius: "0 10px 10px 0",
                border: "1px solid #EDE9FF",
                borderLeft: "none",
              }}
            >
              <p
                style={{
                  color: "#6C3FC5",
                  fontSize: "7.5px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: "700",
                  margin: "0 0 8px",
                }}
              >
                Datos del cliente
              </p>

              <p
                style={{
                  color: "#1E1040",
                  fontSize: "13px",
                  fontWeight: "800",
                  margin: "0 0 4px",
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
          </div>

          {/* Tarjeta total hero */}
          <div
            style={{
              width: "170px",
              background: "linear-gradient(145deg,#1E1040 0%,#3D1F8A 100%)",
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
                background: "rgba(155,111,232,0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "-20px",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "rgba(245,158,11,0.12)",
              }}
            />

            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "7.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: "0 0 6px",
                position: "relative",
                zIndex: 1,
              }}
            >
              Total a pagar
            </p>

            <p
              style={{
                color: "#F59E0B",
                fontSize: "24px",
                fontWeight: "800",
                margin: 0,
                lineHeight: "1",
                letterSpacing: "-0.03em",
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
                width: "40px",
                height: "1px",
                background: "rgba(245,158,11,0.3)",
                margin: "10px auto",
                position: "relative",
                zIndex: 1,
              }}
            />

            <div
              style={{
                background: "rgba(108,63,197,0.5)",
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
                  letterSpacing: "0.08em",
                }}
              >
                {showTax ? "Incluye IVA" : "Monto final"}
              </p>
            </div>
          </div>
        </div>

        {/* Mensaje intro */}
        <div
          style={{
            background: "#F3F0FF",
            borderRadius: "8px",
            padding: "10px 14px",
            marginBottom: "20px",
            display: "flex",
            gap: "8px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#6C3FC5",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1px",
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
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <p
            style={{
              color: "#4C3A8A",
              fontSize: "9.5px",
              lineHeight: "1.65",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            Estimado(a){" "}
            <strong style={{ fontStyle: "normal", color: "#1E1040" }}>
              {clientName}
            </strong>
            , a continuación se presenta el detalle de los servicios y productos
            considerados en esta propuesta. Esta cotización tiene validez de 30
            días.
          </p>
        </div>

        {/* TABLA */}
        <div
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(108,63,197,0.10)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 55px 85px 85px",
              background: "linear-gradient(135deg,#6C3FC5 0%,#9B6FE8 100%)",
              padding: "11px 16px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "8px",
                letterSpacing: "0.16em",
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
                letterSpacing: "0.16em",
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
                letterSpacing: "0.16em",
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
                letterSpacing: "0.16em",
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
                  gridTemplateColumns: "1fr 55px 85px 85px",
                  padding: "11px 16px",
                  background: index % 2 === 0 ? "#FFFFFF" : "#FAF8FF",
                  borderBottom:
                    index < allItems.length - 1 ? "1px solid #F0EBFF" : "none",
                  alignItems: "center",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      color: "#1E1040",
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
                        color: "#C4B5F4",
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
                    color: "#9CA3AF",
                    fontSize: "10.5px",
                    textAlign: "center",
                  }}
                >
                  {item.qty}
                </span>

                <span
                  style={{
                    color: "#9CA3AF",
                    fontSize: "10.5px",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(item.price)}
                </span>

                <span
                  style={{
                    color: "#1E1040",
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
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
          <div style={{ width: "220px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 12px",
                borderBottom: "1px solid #F0EBFF",
              }}
            >
              <span style={{ color: "#9CA3AF", fontSize: "10px" }}>Subtotal</span>
              <span
                style={{
                  color: "#4B3B8A",
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
                  borderBottom: showDiscount ? "1px dashed #E9E3FF" : "none",
                }}
              >
                <span style={{ color: "#9CA3AF", fontSize: "10px" }}>
                  IVA ({tax}%)
                </span>
                <span
                  style={{
                    color: "#4B3B8A",
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
                  borderBottom: "1px solid #F0EBFF",
                }}
              >
                <span style={{ color: "#10B981", fontSize: "10px" }}>Descuento</span>
                <span
                  style={{
                    color: "#10B981",
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
                background: "linear-gradient(135deg,#1E1040 0%,#3D1F8A 100%)",
                borderRadius: "10px",
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.7)",
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
                  color: "#F59E0B",
                  fontSize: "18px",
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
              background: "#FFFBEB",
              borderRadius: "10px",
              border: "1px solid #FDE68A",
              padding: "12px 16px",
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
                background: "#F59E0B",
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
                  color: "#92400E",
                  fontSize: "7.5px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: "700",
                  margin: "0 0 4px",
                }}
              >
                Notas
              </p>
              <p
                style={{
                  color: "#78350F",
                  fontSize: "9.5px",
                  lineHeight: "1.6",
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
      </div>

      {/* FOOTER */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <div
          style={{
            height: "4px",
            background: "linear-gradient(90deg,#6C3FC5 0%,#9B6FE8 50%,#F59E0B 100%)",
          }}
        />
        <div
          style={{
            background: "#1E1040",
            padding: "12px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "8px",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            Este documento es válido por 30 días a partir de su emisión.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "20px",
                height: "1.5px",
                background: "#9B6FE8",
                borderRadius: "1px",
              }}
            />
            <p
              style={{
                color: "#C4B5F4",
                fontSize: "8px",
                margin: 0,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: "600",
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
