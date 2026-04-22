import type { TemplateData } from "@/types/cotizacion-form"

type TemplatePremium4Props = {
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

export default function TemplatePremium4({ data }: TemplatePremium4Props) {
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
        background: "#fcfaf7",
        color: "#2f241c",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "26px 30px 22px",
          background: "linear-gradient(135deg, #f7efe5 0%, #f5eadf 55%, #eee2d3 100%)",
          borderBottom: "1px solid #e6d8c7",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 18,
            alignItems: "start",
          }}
        >
          <div>
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
                  background: "linear-gradient(90deg, #8b5e3c, #d4b08c)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#8b5e3c",
                }}
              >
                Cotización premium
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 28,
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#2f241c",
                maxWidth: 320,
              }}
            >
              {data.title || "Cotización profesional"}
            </h1>

            {data.description ? (
              <p
                style={{
                  margin: "10px 0 0",
                  maxWidth: 330,
                  fontSize: 12,
                  lineHeight: 1.7,
                  color: "#71594a",
                }}
              >
                {data.description}
              </p>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 12,
            }}
          >
            {data.companyLogo ? (
              <div
                style={{
                  width: 74,
                  height: 74,
                  borderRadius: 20,
                  background: "#ffffff",
                  border: "1px solid #e7d9c7",
                  boxShadow: "0 10px 24px rgba(76,56,40,0.10)",
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
                  borderRadius: 20,
                  background: "#173b63",
                  color: "#f8f4ee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 800,
                  boxShadow: "0 10px 24px rgba(23,59,99,0.18)",
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
                  color: "#173b63",
                }}
              >
                {data.companyName || "Tu empresa"}
              </div>

              <div
                style={{
                  marginTop: 7,
                  fontSize: 11,
                  lineHeight: 1.7,
                  color: "#6b5a4d",
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

      <div style={{ padding: "20px 30px 14px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 14,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #eadfce",
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "11px 15px",
                background: "#f8f2eb",
                borderBottom: "1px solid #efe2d5",
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#8b5e3c",
              }}
            >
              Cliente
            </div>

            <div style={{ padding: "14px 16px" }}>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#2f241c",
                  marginBottom: 8,
                }}
              >
                {data.clientName || "Cliente"}
              </div>

              <div
                style={{
                  fontSize: 11,
                  lineHeight: 1.75,
                  color: "#6f5d50",
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
              background: "#173b63",
              borderRadius: 18,
              overflow: "hidden",
              color: "#f8f4ee",
            }}
          >
            <div
              style={{
                padding: "11px 15px",
                background: "rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#dfe8f3",
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
                color: "rgba(255,255,255,0.82)",
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
                <strong style={{ color: "#ffffff" }}>{rows.length}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span>Descuento</span>
                <strong style={{ color: "#ffffff" }}>{formatMoney(discount)}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span>Impuesto</span>
                <strong style={{ color: "#ffffff" }}>{taxPercent}%</strong>
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
                  <strong style={{ color: "#ffffff" }}>{data.validUntil}</strong>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 30px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #eadfce",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.35fr 0.6fr 1fr 1fr",
              gap: 12,
              padding: "12px 16px",
              background: "#f7f2eb",
              borderBottom: "1px solid #efe2d5",
              fontSize: 10,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#7a5a43",
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
                color: "#a08b7b",
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
                  gridTemplateColumns: "2.35fr 0.6fr 1fr 1fr",
                  gap: 12,
                  padding: "14px 16px",
                  borderTop: index === 0 ? "none" : "1px solid #f3ebe1",
                  background: index % 2 === 0 ? "#ffffff" : "#fdfaf6",
                  fontSize: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#2f241c",
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
                        color: "#a08b7b",
                      }}
                    >
                      {row.detail}
                    </div>
                  ) : null}
                </div>

                <div style={{ textAlign: "center", color: "#6f5d50" }}>
                  {row.quantity}
                </div>

                <div style={{ textAlign: "right", color: "#6f5d50" }}>
                  {formatMoney(row.unitPrice)}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#173b63",
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
          padding: "18px 30px 0",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 14,
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #eadfce",
            borderRadius: 18,
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#8b5e3c",
              marginBottom: 8,
            }}
          >
            Notas y condiciones
          </div>

          <div
            style={{
              fontSize: 11,
              lineHeight: 1.75,
              color: "#6f5d50",
              whiteSpace: "pre-wrap",
            }}
          >
            {data.notes || "Sin notas adicionales."}
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #d8e2ee",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "14px 16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                fontSize: 12,
                color: "#6f5d50",
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
                color: "#6f5d50",
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
                color: "#6f5d50",
              }}
            >
              <span>Impuesto</span>
              <span>{formatMoney(taxAmount)}</span>
            </div>
          </div>

          <div
            style={{
              padding: "15px 16px",
              background: "linear-gradient(90deg, #173b63, #315d87)",
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
          padding: "18px 30px 28px",
        }}
      >
        <div
          style={{
            paddingTop: 12,
            borderTop: "1px solid #e8dccf",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            fontSize: 10,
            color: "#a08b7b",
          }}
        >
          <span>{data.companyName || "Tu empresa"}</span>
          <span>{data.docNumber || "COT-001"}</span>
        </div>
      </div>
    </div>
  )
}
