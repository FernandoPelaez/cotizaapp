import type { TemplateData } from "@/types/cotizacion-form"

type TemplatePremium2Props = {
  data: TemplateData
}

type QuoteRow = {
  id: string
  concept: string
  quantity: number
  unitPrice: number
  amount: number
  detail?: string
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value || 0)
}

function buildRows(data: TemplateData): QuoteRow[] {
  const serviceRows: QuoteRow[] = (data.services ?? []).map((service, index) => ({
    id: `service-${index}`,
    concept: service.name || `Servicio ${index + 1}`,
    quantity: 1,
    unitPrice: service.price || 0,
    amount: service.price || 0,
    detail: "Servicio",
  }))

  const productRows: QuoteRow[] = (data.products ?? []).map((product, index) => ({
    id: `product-${index}`,
    concept: product.name || `Producto ${index + 1}`,
    quantity: product.quantity || 1,
    unitPrice: product.price || 0,
    amount: (product.quantity || 1) * (product.price || 0),
    detail: "Producto",
  }))

  return [...serviceRows, ...productRows]
}

export default function TemplatePremium2({ data }: TemplatePremium2Props) {
  const rows = buildRows(data)
  const subtotal = data.subtotal ?? rows.reduce((acc, row) => acc + row.amount, 0)
  const discount = data.discount ?? 0
  const taxableBase = Math.max(0, subtotal - discount)
  const taxPercent = data.tax ?? 0
  const taxAmount = taxableBase * (taxPercent / 100)
  const total = data.total ?? taxableBase + taxAmount
  const initials = String(data.companyName || "TE")
    .trim()
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      style={{
        width: 595,
        minHeight: 842,
        background: "#fffafc",
        color: "#3f2b36",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "30px 34px 22px",
          background:
            "linear-gradient(135deg, #fff1f6 0%, #ffe4ef 42%, #fce7f3 72%, #f3e8ff 100%)",
          borderBottom: "1px solid #f5d0df",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -55,
            right: -30,
            width: 165,
            height: 165,
            borderRadius: "50%",
            background: "rgba(244,114,182,0.10)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -45,
            left: -25,
            width: 135,
            height: 135,
            borderRadius: "50%",
            background: "rgba(192,132,252,0.10)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            gap: 18,
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 4,
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #ec4899, #a855f7)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#be185d",
                }}
              >
                Premium Rose
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 27,
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#4a2034",
              }}
            >
              {data.title || "Cotización profesional"}
            </h1>

            {data.description ? (
              <p
                style={{
                  margin: "10px 0 0",
                  maxWidth: 320,
                  fontSize: 12,
                  lineHeight: 1.65,
                  color: "#7a4b62",
                }}
              >
                {data.description}
              </p>
            ) : null}
          </div>

          <div
            style={{
              width: 175,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            {data.companyLogo ? (
              <div
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: 22,
                  background: "#ffffff",
                  border: "1px solid #f5d0df",
                  boxShadow: "0 10px 24px rgba(236,72,153,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: 8,
                }}
              >
                <img
                  src={data.companyLogo}
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
                  width: 74,
                  height: 74,
                  borderRadius: 22,
                  background: "#ffffff",
                  border: "1px solid #f5d0df",
                  boxShadow: "0 10px 24px rgba(236,72,153,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#be185d",
                }}
              >
                {initials}
              </div>
            )}

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: "#4a2034",
                }}
              >
                {data.companyName || "Tu empresa"}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 11,
                  lineHeight: 1.6,
                  color: "#8b5c71",
                }}
              >
                <div>{data.docNumber || "COT-001"}</div>
                <div>{data.date || "Sin fecha"}</div>
                {data.validUntil ? <div>Válida hasta: {data.validUntil}</div> : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "22px 34px 16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 14,
          }}
        >
          <div
            style={{
              border: "1px solid #f5d0df",
              borderRadius: 20,
              background: "#ffffff",
              overflow: "hidden",
              boxShadow: "0 8px 22px rgba(236,72,153,0.06)",
            }}
          >
            <div
              style={{
                padding: "11px 15px",
                background: "#fff1f6",
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#be185d",
              }}
            >
              Cliente
            </div>

            <div style={{ padding: "14px 16px" }}>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#4a2034",
                  marginBottom: 8,
                }}
              >
                {data.clientName || "Cliente"}
              </div>

              <div
                style={{
                  fontSize: 11,
                  lineHeight: 1.7,
                  color: "#7a4b62",
                }}
              >
                <div>{data.clientEmail || "correo@cliente.com"}</div>
                <div>{data.clientPhone || "Sin teléfono"}</div>
                {data.clientRFC ? <div>RFC: {data.clientRFC}</div> : null}
                {data.clientAddress ? <div>{data.clientAddress}</div> : null}
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid #edd5ff",
              borderRadius: 20,
              background: "linear-gradient(180deg, #ffffff 0%, #fdf4ff 100%)",
              overflow: "hidden",
              boxShadow: "0 8px 22px rgba(168,85,247,0.06)",
            }}
          >
            <div
              style={{
                padding: "11px 15px",
                background: "#fdf4ff",
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#9333ea",
              }}
            >
              Resumen
            </div>

            <div
              style={{
                padding: "14px 16px",
                display: "grid",
                gap: 8,
                fontSize: 11,
                color: "#7a4b62",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span>Conceptos</span>
                <strong style={{ color: "#4a2034" }}>{rows.length}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span>Descuento</span>
                <strong style={{ color: "#4a2034" }}>{formatMoney(discount)}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span>Impuesto</span>
                <strong style={{ color: "#4a2034" }}>{taxPercent}%</strong>
              </div>

              {data.validUntil ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <span>Vigencia</span>
                  <strong style={{ color: "#4a2034" }}>{data.validUntil}</strong>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 34px" }}>
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid #f5d0df",
            background: "#ffffff",
            boxShadow: "0 10px 24px rgba(236,72,153,0.05)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.3fr 0.7fr 1fr 1fr",
              gap: 12,
              padding: "12px 16px",
              background: "linear-gradient(90deg, #fff1f6, #fdf4ff)",
              fontSize: 10,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#be185d",
            }}
          >
            <div>Concepto</div>
            <div style={{ textAlign: "center" }}>Cant.</div>
            <div style={{ textAlign: "right" }}>Precio</div>
            <div style={{ textAlign: "right" }}>Importe</div>
          </div>

          {rows.length === 0 ? (
            <div
              style={{
                padding: "22px 16px",
                textAlign: "center",
                fontSize: 12,
                color: "#b08aa0",
              }}
            >
              Sin conceptos registrados
            </div>
          ) : (
            rows.map((row, index) => (
              <div
                key={row.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.3fr 0.7fr 1fr 1fr",
                  gap: 12,
                  padding: "14px 16px",
                  borderTop: index === 0 ? "none" : "1px solid #fdf2f8",
                  background: index % 2 === 0 ? "#ffffff" : "#fffafd",
                  fontSize: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#4a2034",
                      lineHeight: 1.4,
                    }}
                  >
                    {row.concept}
                  </div>
                  {row.detail ? (
                    <div
                      style={{
                        marginTop: 3,
                        fontSize: 10,
                        color: "#b08aa0",
                      }}
                    >
                      {row.detail}
                    </div>
                  ) : null}
                </div>

                <div style={{ textAlign: "center", color: "#7a4b62" }}>
                  {row.quantity}
                </div>

                <div style={{ textAlign: "right", color: "#7a4b62" }}>
                  {formatMoney(row.unitPrice)}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#4a2034",
                  }}
                >
                  {formatMoney(row.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div
        style={{
          padding: "18px 34px 0",
          display: "flex",
          justifyContent: "space-between",
          gap: 18,
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 20,
            border: "1px solid #f5d0df",
            background: "linear-gradient(180deg, #ffffff 0%, #fff7fb 100%)",
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#be185d",
              marginBottom: 8,
            }}
          >
            Notas y condiciones
          </div>

          <div
            style={{
              fontSize: 11,
              lineHeight: 1.75,
              color: "#7a4b62",
              whiteSpace: "pre-wrap",
            }}
          >
            {data.notes || "Sin notas adicionales."}
          </div>
        </div>

        <div
          style={{
            width: 225,
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid #edd5ff",
            background: "#ffffff",
            flexShrink: 0,
          }}
        >
          <div style={{ padding: "14px 16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                fontSize: 12,
                color: "#7a4b62",
              }}
            >
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                fontSize: 12,
                color: "#7a4b62",
              }}
            >
              <span>Descuento</span>
              <span>- {formatMoney(discount)}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                fontSize: 12,
                color: "#7a4b62",
              }}
            >
              <span>Impuesto</span>
              <span>{formatMoney(taxAmount)}</span>
            </div>
          </div>

          <div
            style={{
              padding: "15px 16px",
              background: "linear-gradient(90deg, #ec4899, #d946ef, #a855f7)",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              {formatMoney(total)}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          padding: "18px 34px 28px",
        }}
      >
        <div
          style={{
            paddingTop: 12,
            borderTop: "1px solid #f3d8e4",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            fontSize: 10,
            color: "#b08aa0",
          }}
        >
          <span>{data.companyName || "Tu empresa"}</span>
          <span>{data.docNumber || "COT-001"}</span>
        </div>
      </div>
    </div>
  )
}
