import type { TemplateData } from "@/types/cotizacion-form"

type TemplatePremiumProps = {
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

export default function TemplatePremium({ data }: TemplatePremiumProps) {
  const rows = buildRows(data)
  const subtotal = data.subtotal ?? rows.reduce((acc, row) => acc + row.amount, 0)
  const discount = data.discount ?? 0
  const taxableBase = Math.max(0, subtotal - discount)
  const taxPercent = data.tax ?? 0
  const taxAmount = taxableBase * (taxPercent / 100)
  const total = data.total ?? taxableBase + taxAmount

  return (
    <div
      style={{
        width: 595,
        minHeight: 842,
        background: "#ffffff",
        color: "#0f172a",
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
          padding: "30px 34px 24px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #6d28d9 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -48,
            right: -30,
            width: 170,
            height: 170,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -42,
            right: 90,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(245,158,11,0.12)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
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
                  width: 36,
                  height: 4,
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #f59e0b, #fde68a)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#fcd34d",
                }}
              >
                Premium
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 28,
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              {data.title || "Cotización profesional"}
            </h1>

            {data.description ? (
              <p
                style={{
                  margin: "10px 0 0",
                  maxWidth: 300,
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.76)",
                }}
              >
                {data.description}
              </p>
            ) : null}
          </div>

          <div
            style={{
              width: 168,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            {data.companyLogo ? (
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.12)",
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
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
                  width: 72,
                  height: 72,
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                {String(data.companyName || "TE")
                  .trim()
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                {data.companyName || "Tu empresa"}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 11,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.72)",
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

      <div style={{ padding: "24px 34px 16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >
          <div
            style={{
              border: "1px solid #ede9fe",
              borderRadius: 18,
              overflow: "hidden",
              background: "#ffffff",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                background: "#faf5ff",
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#6d28d9",
              }}
            >
              Cliente
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: "#111827",
                }}
              >
                {data.clientName || "Cliente"}
              </div>
              <div style={{ fontSize: 11, lineHeight: 1.7, color: "#64748b" }}>
                <div>{data.clientEmail || "correo@cliente.com"}</div>
                <div>{data.clientPhone || "Sin teléfono"}</div>
                {data.clientRFC ? <div>RFC: {data.clientRFC}</div> : null}
                {data.clientAddress ? <div>{data.clientAddress}</div> : null}
              </div>
            </div>
          </div>

          <div
            style={{
              border: "1px solid #f3e8ff",
              borderRadius: 18,
              overflow: "hidden",
              background: "linear-gradient(180deg, #ffffff 0%, #faf5ff 100%)",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                background: "#fff7ed",
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#c2410c",
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
                color: "#475569",
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
                <strong style={{ color: "#111827" }}>{rows.length}</strong>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span>Descuento</span>
                <strong style={{ color: "#111827" }}>{formatMoney(discount)}</strong>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span>Impuesto</span>
                <strong style={{ color: "#111827" }}>{taxPercent}%</strong>
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
                  <strong style={{ color: "#111827" }}>{data.validUntil}</strong>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 34px" }}>
        <div
          style={{
            overflow: "hidden",
            border: "1px solid #ede9fe",
            borderRadius: 18,
            background: "#ffffff",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.2fr 0.7fr 1fr 1fr",
              gap: 12,
              padding: "12px 16px",
              background: "linear-gradient(90deg, #faf5ff, #fff7ed)",
              fontSize: 10,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#6d28d9",
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
                color: "#94a3b8",
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
                  gridTemplateColumns: "2.2fr 0.7fr 1fr 1fr",
                  gap: 12,
                  padding: "14px 16px",
                  borderTop: index === 0 ? "none" : "1px solid #f3f4f6",
                  background: index % 2 === 0 ? "#ffffff" : "#fcfcff",
                  fontSize: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#111827",
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
                        color: "#94a3b8",
                      }}
                    >
                      {row.detail}
                    </div>
                  ) : null}
                </div>

                <div style={{ textAlign: "center", color: "#475569" }}>
                  {row.quantity}
                </div>

                <div style={{ textAlign: "right", color: "#475569" }}>
                  {formatMoney(row.unitPrice)}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#111827",
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
          gap: 20,
        }}
      >
        <div
          style={{
            flex: 1,
            border: "1px solid #ede9fe",
            borderRadius: 18,
            background: "#faf5ff",
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#7c3aed",
              marginBottom: 8,
            }}
          >
            Notas
          </div>
          <div
            style={{
              fontSize: 11,
              lineHeight: 1.75,
              color: "#475569",
              whiteSpace: "pre-wrap",
            }}
          >
            {data.notes || "Sin notas adicionales."}
          </div>
        </div>

        <div
          style={{
            width: 220,
            border: "1px solid #ede9fe",
            borderRadius: 18,
            overflow: "hidden",
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
                color: "#475569",
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
                color: "#475569",
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
                color: "#475569",
              }}
            >
              <span>Impuesto</span>
              <span>{formatMoney(taxAmount)}</span>
            </div>
          </div>

          <div
            style={{
              padding: "15px 16px",
              background: "linear-gradient(90deg, #6d28d9, #9333ea, #f59e0b)",
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
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            fontSize: 10,
            color: "#94a3b8",
          }}
        >
          <span>{data.companyName || "Tu empresa"}</span>
          <span>{data.docNumber || "COT-001"}</span>
        </div>
      </div>
    </div>
  )
}
