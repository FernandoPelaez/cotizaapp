import type { TemplateData } from "@/types/cotizacion-form"

type TemplatePremium7Props = {
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

export default function TemplatePremium7({ data }: TemplatePremium7Props) {
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
        background: "#f7f6f3",
        color: "#1f1b18",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "22px 24px 18px",
          background: "linear-gradient(135deg, #111111 0%, #1f4f82 55%, #f97316 100%)",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -25,
            top: -25,
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 220,
            bottom: -35,
            width: 95,
            height: 95,
            borderRadius: "50%",
            background: "rgba(249,115,22,0.12)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 16,
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 3,
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #fb923c, #fdba74)",
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#fed7aa",
                }}
              >
                Propuesta premium
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 28,
                lineHeight: 1.06,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                maxWidth: 310,
              }}
            >
              {data.title || "Cotización profesional"}
            </h1>

            {data.description ? (
              <p
                style={{
                  margin: "8px 0 0",
                  maxWidth: 315,
                  fontSize: 11,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.76)",
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
              gap: 10,
            }}
          >
            {data.companyLogo ? (
              <div
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 18,
                  background: "#ffffff",
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
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
                  width: 66,
                  height: 66,
                  borderRadius: 18,
                  background: "#ffffff",
                  color: "#111111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 800,
                  boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
                }}
              >
                {initials}
              </div>
            )}

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                {data.companyName || "Tu empresa"}
              </div>

              <div
                style={{
                  marginTop: 6,
                  fontSize: 10,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.74)",
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

      <div style={{ padding: "14px 24px 10px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 10,
          }}
        >
          <div
            style={{
              background: "#fffdfa",
              border: "1px solid #e8ddd2",
              borderRadius: 16,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#c2410c",
                marginBottom: 8,
              }}
            >
              Cliente
            </div>

            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#1f1b18",
                marginBottom: 7,
              }}
            >
              {data.clientName || "Cliente"}
            </div>

            <div
              style={{
                fontSize: 10,
                lineHeight: 1.7,
                color: "#6f6156",
              }}
            >
              <div>{data.clientEmail || "correo@cliente.com"}</div>
              <div>{data.clientPhone || "Sin teléfono"}</div>
              {data.clientRFC ? <div>RFC: {data.clientRFC}</div> : null}
              {data.clientAddress ? <div>{data.clientAddress}</div> : null}
            </div>
          </div>

          <div
            style={{
              background: "#fffdfa",
              border: "1px solid #dbe5f1",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "10px 14px",
                background: "#1f4f82",
                color: "#ffffff",
                fontSize: 9,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
              }}
            >
              Resumen
            </div>

            <div
              style={{
                padding: "12px 14px",
                display: "grid",
                gap: 7,
                fontSize: 10,
                color: "#5b6571",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Conceptos</span>
                <strong style={{ color: "#111111" }}>{rows.length}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Descuento</span>
                <strong style={{ color: "#111111" }}>{formatMoney(discount)}</strong>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Impuesto</span>
                <strong style={{ color: "#111111" }}>{taxPercent}%</strong>
              </div>

              {data.validUntil ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Vigencia</span>
                  <strong style={{ color: "#111111" }}>{data.validUntil}</strong>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 24px" }}>
        <div
          style={{
            background: "#fffdfa",
            border: "1px solid #e8ddd2",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.3fr 0.6fr 1fr 1fr",
              gap: 10,
              padding: "10px 14px",
              background: "#161311",
              color: "#ffffff",
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
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
                padding: "18px 14px",
                textAlign: "center",
                fontSize: 11,
                color: "#9a8a7c",
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
                  gridTemplateColumns: "2.3fr 0.6fr 1fr 1fr",
                  gap: 10,
                  padding: "12px 14px",
                  borderTop: index === 0 ? "none" : "1px solid #f0e7de",
                  background: index % 2 === 0 ? "#fffdfa" : "#fcf8f3",
                  fontSize: 11,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#1f1b18",
                      lineHeight: 1.35,
                    }}
                  >
                    {row.concept}
                  </div>

                  {row.detail ? (
                    <div
                      style={{
                        marginTop: 2,
                        fontSize: 9,
                        color: "#9a8a7c",
                      }}
                    >
                      {row.detail}
                    </div>
                  ) : null}
                </div>

                <div style={{ textAlign: "center", color: "#6f6156" }}>
                  {row.quantity}
                </div>

                <div style={{ textAlign: "right", color: "#6f6156" }}>
                  {formatMoney(row.unitPrice)}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 800,
                    color: "#1f4f82",
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
          padding: "12px 24px 0",
          display: "grid",
          gridTemplateColumns: "1fr 180px",
          gap: 10,
        }}
      >
        <div
          style={{
            background: "#fffdfa",
            border: "1px solid #e8ddd2",
            borderRadius: 16,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#c2410c",
              marginBottom: 8,
            }}
          >
            Notas y condiciones
          </div>

          <div
            style={{
              fontSize: 10,
              lineHeight: 1.7,
              color: "#6f6156",
              whiteSpace: "pre-wrap",
            }}
          >
            {data.notes || "Sin notas adicionales."}
          </div>
        </div>

        <div
          style={{
            background: "#fffdfa",
            border: "1px solid #e8ddd2",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "12px 14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
                fontSize: 10,
                color: "#6f6156",
              }}
            >
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
                fontSize: 10,
                color: "#6f6156",
              }}
            >
              <span>Descuento</span>
              <span>- {formatMoney(discount)}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
                fontSize: 10,
                color: "#6f6156",
              }}
            >
              <span>Impuesto</span>
              <span>{formatMoney(taxAmount)}</span>
            </div>
          </div>

          <div
            style={{
              padding: "13px 14px",
              background: "linear-gradient(90deg, #111111, #1f4f82, #f97316)",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: 16,
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
          padding: "12px 24px 20px",
        }}
      >
        <div
          style={{
            paddingTop: 10,
            borderTop: "1px solid #e8ddd2",
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            fontSize: 9,
            color: "#9a8a7c",
          }}
        >
          <span>{data.companyName || "Tu empresa"}</span>
          <span>{data.docNumber || "COT-001"}</span>
        </div>
      </div>
    </div>
  )
}
