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

export default function TemplateModerna2({ data }: Props) {
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

  const totalLabel = showTax ? "Total con IVA" : "Total"

  return (
    <div
      id="template-moderna-2"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily: "'Trebuchet MS', sans-serif",
        backgroundColor: "#FFFDF9",
        position: "relative",
        overflow: "hidden",
        color: "#1A3C34",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          position: "relative",
          background: "#1A3C34",
          height: "110px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(229,115,80,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-30px",
            right: "60px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "rgba(229,115,80,0.10)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "160px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "6px",
            height: "100%",
            background: "linear-gradient(180deg, #E57350 0%, #F09070 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 36px 0 42px",
            height: "100%",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #E57350, #F09070)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.2"
                >
                  <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>

              <div>
                <p
                  style={{
                    color: "#FFFFFF",
                    fontSize: "15px",
                    fontWeight: "700",
                    margin: 0,
                    letterSpacing: "0.01em",
                  }}
                >
                  {companyName}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "9px",
                    margin: 0,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Propuesta comercial
                </p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p
              style={{
                color: "#E57350",
                fontSize: "28px",
                fontWeight: "800",
                margin: 0,
                letterSpacing: "-0.03em",
                lineHeight: "1",
              }}
            >
              {documentTitle.toUpperCase()}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "4px",
                flexWrap: "wrap",
              }}
            >
              {data.docNumber && (
                <>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "9px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    #{data.docNumber}
                  </span>
                  <span
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.25)",
                      display: "inline-block",
                    }}
                  />
                </>
              )}

              <span
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "9px",
                  letterSpacing: "0.06em",
                }}
              >
                {today}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          height: "4px",
          background: "linear-gradient(90deg, #E57350 0%, #2D6A5A 40%, #1A3C34 100%)",
        }}
      />

      {/* CUERPO */}
      <div style={{ padding: "28px 36px 32px 42px" }}>
        {/* TARJETAS */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          {/* Cliente */}
          <div
            style={{
              flex: 1,
              background: "#F0F7F4",
              borderRadius: "10px",
              padding: "16px 18px",
              borderTop: "3px solid #2D6A5A",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(45,106,90,0.07)",
              }}
            />
            <p
              style={{
                color: "#2D6A5A",
                fontSize: "8px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: "700",
                margin: "0 0 8px",
              }}
            >
              Cliente
            </p>
            <p
              style={{
                color: "#1A3C34",
                fontSize: "13px",
                fontWeight: "700",
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
                  color: "#6B8F86",
                  fontSize: "9px",
                  margin: "0 0 2px",
                  wordBreak: "break-word",
                }}
              >
                {data.clientEmail}
              </p>
            )}
            {data.clientPhone && (
              <p style={{ color: "#6B8F86", fontSize: "9px", margin: "0 0 2px" }}>
                {data.clientPhone}
              </p>
            )}
            {data.clientAddress && (
              <p
                style={{
                  color: "#6B8F86",
                  fontSize: "9px",
                  margin: 0,
                  wordBreak: "break-word",
                }}
              >
                {data.clientAddress}
              </p>
            )}
          </div>

          {/* Empresa */}
          <div
            style={{
              flex: 1,
              background: "#FEF4F0",
              borderRadius: "10px",
              padding: "16px 18px",
              borderTop: "3px solid #E57350",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "-20px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(229,115,80,0.07)",
              }}
            />
            <p
              style={{
                color: "#E57350",
                fontSize: "8px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: "700",
                margin: "0 0 8px",
              }}
            >
              Empresa
            </p>
            <p
              style={{
                color: "#1A3C34",
                fontSize: "13px",
                fontWeight: "700",
                margin: "0 0 5px",
                lineHeight: "1.2",
                wordBreak: "break-word",
              }}
            >
              {companyName}
            </p>
            {data.companyPhone && (
              <p style={{ color: "#8B6B60", fontSize: "9px", margin: "0 0 2px" }}>
                {data.companyPhone}
              </p>
            )}
            {data.companyEmail && (
              <p
                style={{
                  color: "#8B6B60",
                  fontSize: "9px",
                  margin: "0 0 2px",
                  wordBreak: "break-word",
                }}
              >
                {data.companyEmail}
              </p>
            )}
            {data.companyWeb && (
              <p
                style={{
                  color: "#E57350",
                  fontSize: "9px",
                  margin: 0,
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
                  color: "#8B6B60",
                  fontSize: "9px",
                  margin: "4px 0 0",
                  wordBreak: "break-word",
                }}
              >
                {data.companyAddress}
              </p>
            )}
          </div>

          {/* Total */}
          <div
            style={{
              width: "130px",
              background: "linear-gradient(160deg, #1A3C34 0%, #2D6A5A 100%)",
              borderRadius: "10px",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "8px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                margin: "0 0 6px",
              }}
            >
              Total
            </p>
            <p
              style={{
                color: "#E57350",
                fontSize: "20px",
                fontWeight: "800",
                margin: 0,
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                wordBreak: "break-word",
              }}
            >
              {formatCurrency(finalTotal)}
            </p>
            <div
              style={{
                width: "30px",
                height: "1px",
                background: "rgba(229,115,80,0.4)",
                margin: "8px auto",
              }}
            />
            <p
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "8px",
                letterSpacing: "0.08em",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              {showTax ? "Incluye IVA" : "Monto final"}
            </p>
          </div>
        </div>

        {/* MENSAJE */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "2px",
              minHeight: "44px",
              background: "linear-gradient(180deg, #E57350, transparent)",
              borderRadius: "2px",
              flexShrink: 0,
              marginTop: "2px",
            }}
          />
          <p
            style={{
              color: "#6B7280",
              fontSize: "10px",
              lineHeight: "1.65",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            Estimado(a){" "}
            <strong style={{ color: "#1A3C34", fontStyle: "normal" }}>
              {clientName}
            </strong>
            , a continuación se presenta el detalle de los servicios y productos
            considerados en esta propuesta.
          </p>
        </div>

        {/* TABLA */}
        <div
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid #E8F0ED",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 60px 80px 80px",
              background: "#1A3C34",
              padding: "10px 14px",
            }}
          >
            <span
              style={{
                color: "#6DBFA8",
                fontSize: "8px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              Descripción
            </span>
            <span
              style={{
                color: "#6DBFA8",
                fontSize: "8px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Cant.
            </span>
            <span
              style={{
                color: "#6DBFA8",
                fontSize: "8px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: "600",
                textAlign: "right",
              }}
            >
              Precio
            </span>
            <span
              style={{
                color: "#6DBFA8",
                fontSize: "8px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
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
                  gridTemplateColumns: "1fr 60px 80px 80px",
                  padding: "11px 14px",
                  background: index % 2 === 0 ? "#FFFFFF" : "#F8FCFA",
                  borderBottom:
                    index < allItems.length - 1 ? "1px solid #EEF4F2" : "none",
                  alignItems: "center",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      color: "#1A3C34",
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
                        color: "#A0B8B2",
                        fontSize: "8.5px",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.description}
                    </span>
                  )}
                </div>

                <span
                  style={{
                    color: "#6B8F86",
                    fontSize: "10.5px",
                    textAlign: "center",
                  }}
                >
                  {item.qty}
                </span>

                <span
                  style={{
                    color: "#6B8F86",
                    fontSize: "10.5px",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(item.price)}
                </span>

                <span
                  style={{
                    color: "#1A3C34",
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
                padding: "18px 14px",
                background: "#FFFFFF",
                textAlign: "center",
              }}
            >
              <span style={{ color: "#8AA39C", fontSize: "10px" }}>
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
                padding: "5px 10px",
              }}
            >
              <span style={{ color: "#9BA8A5", fontSize: "10px" }}>Subtotal</span>
              <span style={{ color: "#4A6B62", fontSize: "10px" }}>
                {formatCurrency(subtotal)}
              </span>
            </div>

            {showTax && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 10px",
                  borderBottom: showDiscount ? "1px dashed #D5E5E0" : "none",
                }}
              >
                <span style={{ color: "#9BA8A5", fontSize: "10px" }}>
                  IVA ({tax}%)
                </span>
                <span style={{ color: "#4A6B62", fontSize: "10px" }}>
                  {formatCurrency(taxAmount)}
                </span>
              </div>
            )}

            {showDiscount && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 10px",
                }}
              >
                <span style={{ color: "#38A169", fontSize: "10px" }}>Descuento</span>
                <span style={{ color: "#38A169", fontSize: "10px" }}>
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
                background: "linear-gradient(135deg, #E57350 0%, #F09070 100%)",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "9px",
                  letterSpacing: "0.12em",
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
              background: "#F8FCFA",
              borderRadius: "8px",
              border: "1px solid #D5E5E0",
              padding: "12px 16px",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#E57350",
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
                  color: "#2D6A5A",
                  fontSize: "8px",
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
                  color: "#6B8F86",
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

        {/* FOOTER */}
        <div
          style={{
            marginTop: "24px",
            paddingTop: "14px",
            borderTop: "1px solid #E8F0ED",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <p
            style={{
              color: "#B0C4BE",
              fontSize: "8px",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            Este documento es válido por 30 días a partir de su emisión.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "16px",
                height: "2px",
                background: "#E57350",
                borderRadius: "1px",
              }}
            />
            <p
              style={{
                color: "#2D6A5A",
                fontSize: "8px",
                margin: 0,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              {companyName}
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "5px",
          background: "linear-gradient(90deg, #E57350 0%, #2D6A5A 50%, #1A3C34 100%)",
        }}
      />
    </div>
  )
}
