import type { TemplateData } from "@/types/cotizacion-form"

type TemplatePremium3Props = {
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

export default function TemplatePremium3({ data }: TemplatePremium3Props) {
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
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 0.7fr",
          minHeight: 188,
          background: "#0f172a",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "28px 30px 24px",
            background:
              "linear-gradient(135deg, #0f172a 0%, #102a43 46%, #0f766e 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -42,
              left: -22,
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -55,
              right: 55,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "rgba(45,212,191,0.10)",
            }}
          />

          <div style={{ position: "relative" }}>
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
                  background: "linear-gradient(90deg, #2dd4bf, #a7f3d0)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#99f6e4",
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
                maxWidth: 300,
              }}
            >
              {data.title || "Cotización profesional"}
            </h1>

            {data.description ? (
              <p
                style={{
                  margin: "10px 0 0",
                  maxWidth: 305,
                  fontSize: 12,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {data.description}
              </p>
            ) : null}
          </div>
        </div>

        <div
          style={{
            padding: "28px 24px 22px",
            background: "#111827",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {data.companyLogo ? (
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: "#ffffff",
                padding: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: "0 14px 30px rgba(0,0,0,0.16)",
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
                borderRadius: 20,
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0f172a",
                fontSize: 22,
                fontWeight: 800,
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
              }}
            >
              {data.companyName || "Tu empresa"}
            </div>

            <div
              style={{
                marginTop: 8,
                fontSize: 11,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.70)",
              }}
            >
              <div>{data.docNumber || "COT-001"}</div>
              <div>{data.date || "Sin fecha"}</div>
              {data.validUntil ? <div>Válida hasta: {data.validUntil}</div> : null}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "22px 30px 14px" }}>
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
              border: "1px solid #dbe3ee",
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "11px 15px",
                background: "#eff6ff",
                borderBottom: "1px solid #dbeafe",
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#1d4ed8",
              }}
            >
              Cliente
            </div>

            <div style={{ padding: "14px 16px" }}>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: 8,
                }}
              >
                {data.clientName || "Cliente"}
              </div>

              <div
                style={{
                  fontSize: 11,
                  lineHeight: 1.75,
                  color: "#64748b",
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
              background: "#ffffff",
              border: "1px solid #dcefe9",
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "11px 15px",
                background: "#ecfeff",
                borderBottom: "1px solid #ccfbf1",
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#0f766e",
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

      <div style={{ padding: "0 30px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #dbe3ee",
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
              background: "#f8fafc",
              borderBottom: "1px solid #e5edf7",
              fontSize: 10,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#334155",
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
                  gridTemplateColumns: "2.35fr 0.6fr 1fr 1fr",
                  gap: 12,
                  padding: "14px 16px",
                  borderTop: index === 0 ? "none" : "1px solid #eef2f7",
                  background: index % 2 === 0 ? "#ffffff" : "#fcfdff",
                  fontSize: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#0f172a",
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
                    color: "#0f172a",
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
            border: "1px solid #dbe3ee",
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
              color: "#0f766e",
              marginBottom: 8,
            }}
          >
            Notas y condiciones
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
            background: "#ffffff",
            border: "1px solid #dcefe9",
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
              background: "linear-gradient(90deg, #0f172a, #0f766e)",
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
            borderTop: "1px solid #dbe3ee",
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
