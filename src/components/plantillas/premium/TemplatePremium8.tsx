import type { TemplateData } from "@/types/cotizacion-form"

type TemplatePremium8Props = {
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

export default function TemplatePremium8({ data }: TemplatePremium8Props) {
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

  const deep = "#0f2537"
  const mid = "#1a3a52"
  const accent = "#c9922a"
  const accentLight = "#fdf3e3"
  const accentBorder = "#f0d9aa"
  const surface = "#ffffff"
  const border = "#e2e8f0"
  const textPrimary = "#0f2537"
  const textSecondary = "#64748b"
  const textMuted = "#94a3b8"
  const rowAlt = "#f8fafc"

  return (
    <div
      style={{
        width: 595,
        minHeight: 842,
        background: surface,
        color: textPrimary,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: deep,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          minHeight: 152,
        }}
      >
        <div
          style={{
            padding: "28px 30px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 12,
              width: "fit-content",
              background: "rgba(201,146,42,0.15)",
              border: "1px solid rgba(201,146,42,0.35)",
              borderRadius: 20,
              padding: "3px 10px 3px 7px",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: accent,
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: accent,
              }}
            >
              Cotización premium
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              color: "#ffffff",
              maxWidth: 300,
            }}
          >
            {data.title || "Cotización profesional"}
          </h1>

          {data.description ? (
            <p
              style={{
                margin: "9px 0 0",
                fontSize: 11,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.48)",
                maxWidth: 295,
              }}
            >
              {data.description}
            </p>
          ) : null}
        </div>

        <div
          style={{
            padding: "26px 26px 22px",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            minWidth: 158,
          }}
        >
          {data.companyLogo ? (
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                background: "#ffffff",
                padding: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={data.companyLogo}
                alt="Logo"
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
                width: 64,
                height: 64,
                borderRadius: 14,
                background: accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              {initials}
            </div>
          )}

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              {data.companyName || "Tu empresa"}
            </div>
            <div
              style={{
                marginTop: 5,
                fontSize: 10,
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <div>{data.docNumber || "COT-001"}</div>
              <div>{data.date || "Sin fecha"}</div>
              {data.validUntil ? <div>Válida hasta: {data.validUntil}</div> : null}
            </div>
          </div>
        </div>
      </div>

      {/* ACCENT BAR */}
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${accent} 0%, #e8b86d 60%, rgba(201,146,42,0.2) 100%)`,
          width: "100%",
        }}
      />

      {/* CLIENTE + RESUMEN */}
      <div
        style={{
          padding: "18px 26px 14px",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 12,
        }}
      >
        <div
          style={{
            background: surface,
            border: `1px solid ${border}`,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "10px 14px",
              background: deep,
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: accent,
              }}
            />
            Cliente
          </div>
          <div style={{ padding: "13px 15px" }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: textPrimary,
                marginBottom: 7,
              }}
            >
              {data.clientName || "Cliente"}
            </div>
            <div style={{ fontSize: 11, lineHeight: 1.75, color: textSecondary }}>
              <div>{data.clientEmail || "correo@cliente.com"}</div>
              <div>{data.clientPhone || "Sin teléfono"}</div>
              {data.clientRFC ? <div>RFC: {data.clientRFC}</div> : null}
              {data.clientAddress ? <div>{data.clientAddress}</div> : null}
            </div>
          </div>
        </div>

        <div
          style={{
            background: surface,
            border: `1px solid ${border}`,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "10px 14px",
              background: accentLight,
              borderBottom: `1px solid ${accentBorder}`,
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#7a4f0d",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: accent,
              }}
            />
            Resumen
          </div>
          <div
            style={{
              padding: "13px 15px",
              display: "grid",
              gap: 7,
              fontSize: 11,
              color: textSecondary,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <span>Conceptos</span>
              <strong style={{ color: textPrimary }}>{rows.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <span>Descuento</span>
              <strong style={{ color: textPrimary }}>{formatMoney(discount)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <span>Impuesto</span>
              <strong style={{ color: textPrimary }}>{taxPercent}%</strong>
            </div>
            {data.validUntil ? (
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <span>Vigencia</span>
                <strong style={{ color: textPrimary }}>{data.validUntil}</strong>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div style={{ padding: "0 26px" }}>
        <div
          style={{
            background: surface,
            border: `1px solid ${border}`,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.35fr 0.6fr 1fr 1fr",
              gap: 12,
              padding: "11px 15px",
              background: mid,
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.75)",
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
                padding: "22px 15px",
                textAlign: "center",
                fontSize: 12,
                color: textMuted,
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
                  padding: "13px 15px",
                  borderTop: index === 0 ? "none" : `1px solid ${border}`,
                  background: index % 2 === 0 ? surface : rowAlt,
                  fontSize: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: textPrimary,
                      lineHeight: 1.4,
                    }}
                  >
                    {row.concept}
                  </div>
                  {row.detail ? (
                    <div
                      style={{
                        marginTop: 3,
                        fontSize: 9,
                        color: accent,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {row.detail}
                    </div>
                  ) : null}
                </div>
                <div style={{ textAlign: "center", color: textSecondary }}>{row.quantity}</div>
                <div style={{ textAlign: "right", color: textSecondary }}>
                  {formatMoney(row.unitPrice)}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: textPrimary,
                  }}
                >
                  {formatMoney(row.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* NOTAS + TOTALES */}
      <div
        style={{
          padding: "14px 26px 0",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 12,
        }}
      >
        <div
          style={{
            background: surface,
            border: `1px solid ${border}`,
            borderRadius: 16,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: textPrimary,
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: accent,
              }}
            />
            Notas y condiciones
          </div>
          <div
            style={{
              fontSize: 11,
              lineHeight: 1.75,
              color: textSecondary,
              whiteSpace: "pre-wrap",
            }}
          >
            {data.notes || "Sin notas adicionales."}
          </div>
        </div>

        <div
          style={{
            background: surface,
            border: `1px solid ${border}`,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "13px 15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
                fontSize: 12,
                color: textSecondary,
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
                fontSize: 12,
                color: textSecondary,
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
                fontSize: 12,
                color: textSecondary,
              }}
            >
              <span>Impuesto</span>
              <span>{formatMoney(taxAmount)}</span>
            </div>
          </div>

          <div
            style={{
              padding: "13px 15px",
              background: accent,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#ffffff",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              {formatMoney(total)}
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: "auto", padding: "16px 26px 26px" }}>
        <div
          style={{
            paddingTop: 11,
            borderTop: `1px solid ${border}`,
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            fontSize: 9,
            color: textMuted,
          }}
        >
          <span>{data.companyName || "Tu empresa"}</span>
          <span>{data.docNumber || "COT-001"}</span>
        </div>
      </div>
    </div>
  )
}
