import type { TemplateData } from "@/types/cotizacion-form"

type TemplatePremium6Props = {
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

export default function TemplatePremium6({ data }: TemplatePremium6Props) {
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
        background: "#eef2f7",
        color: "#1a2744",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          background: "#0f2d52",
          minHeight: 160,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: 120,
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "rgba(0,180,160,0.09)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -25,
            left: 260,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />

        {/* Left side */}
        <div
          style={{
            padding: "28px 30px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: 24,
                height: 3,
                borderRadius: 999,
                background: "#00b4a0",
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "#00b4a0",
              }}
            >
              Cotización premium
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 29,
              fontWeight: 800,
              letterSpacing: "-0.028em",
              lineHeight: 1.1,
              color: "#ffffff",
              maxWidth: 310,
            }}
          >
            {data.title || "Cotización profesional"}
          </h1>

          {data.description ? (
            <p
              style={{
                margin: "10px 0 0",
                fontSize: 10.5,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.52)",
                maxWidth: 300,
              }}
            >
              {data.description}
            </p>
          ) : null}
        </div>

        {/* Right side */}
        <div
          style={{
            padding: "26px 26px 22px",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            minWidth: 162,
            position: "relative",
          }}
        >
          {data.companyLogo ? (
            <div
              style={{
                width: 66,
                height: 66,
                borderRadius: 16,
                background: "#ffffff",
                padding: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: "0 8px 18px rgba(0,0,0,0.22)",
                border: "1.5px solid rgba(0,180,160,0.3)",
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
                width: 66,
                height: 66,
                borderRadius: 16,
                background: "linear-gradient(135deg, #00b4a0, #007d71)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 21,
                fontWeight: 800,
                boxShadow: "0 8px 18px rgba(0,0,0,0.22)",
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
                marginTop: 6,
                fontSize: 9.5,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.48)",
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
          height: 4,
          background: "linear-gradient(90deg, #00b4a0 0%, #00d4bc 50%, #007d71 100%)",
          width: "100%",
        }}
      />

      {/* CLIENTE + RESUMEN */}
      <div
        style={{
          padding: "16px 24px 12px",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 12,
        }}
      >
        {/* Cliente */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #d8e3ef",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "9px 14px",
              background: "#0f2d52",
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#00b4a0",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <div
              style={{
                width: 3,
                height: 13,
                borderRadius: 999,
                background: "#00b4a0",
              }}
            />
            Datos del cliente
          </div>
          <div style={{ padding: "13px 15px" }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0f2d52",
                marginBottom: 7,
              }}
            >
              {data.clientName || "Cliente"}
            </div>
            <div style={{ fontSize: 10, lineHeight: 1.75, color: "#5b6f8a" }}>
              <div>{data.clientEmail || "correo@cliente.com"}</div>
              <div>{data.clientPhone || "Sin teléfono"}</div>
              {data.clientRFC ? <div>RFC: {data.clientRFC}</div> : null}
              {data.clientAddress ? <div>{data.clientAddress}</div> : null}
            </div>
          </div>
        </div>

        {/* Resumen */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #d8e3ef",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "9px 14px",
              background: "#e8f7f5",
              borderBottom: "1px solid #b2e4de",
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#007d71",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <div
              style={{
                width: 3,
                height: 13,
                borderRadius: 999,
                background: "#00b4a0",
              }}
            />
            Resumen
          </div>
          <div
            style={{
              padding: "13px 15px",
              display: "grid",
              gap: 7,
              fontSize: 10,
              color: "#5b6f8a",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span>Conceptos</span>
              <strong style={{ color: "#0f2d52" }}>{rows.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span>Descuento</span>
              <strong style={{ color: "#0f2d52" }}>{formatMoney(discount)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span>Impuesto</span>
              <strong style={{ color: "#0f2d52" }}>{taxPercent}%</strong>
            </div>
            {data.validUntil ? (
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span>Vigencia</span>
                <strong style={{ color: "#0f2d52" }}>{data.validUntil}</strong>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div style={{ padding: "0 24px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #d8e3ef",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Header tabla */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.35fr 0.6fr 1fr 1fr",
              gap: 12,
              padding: "10px 15px",
              background: "#0f2d52",
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.13em",
              color: "#a8c4dc",
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
                fontSize: 11,
                color: "#8fa3ba",
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
                  padding: "12px 15px",
                  borderTop: index === 0 ? "none" : "1px solid #eaf0f7",
                  background: index % 2 === 0 ? "#ffffff" : "#f5f8fc",
                  fontSize: 11,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{ fontWeight: 700, color: "#0f2d52", lineHeight: 1.4 }}
                  >
                    {row.concept}
                  </div>
                  {row.detail ? (
                    <div
                      style={{
                        marginTop: 3,
                        fontSize: 9,
                        color: "#00956d",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {row.detail}
                    </div>
                  ) : null}
                </div>
                <div style={{ textAlign: "center", color: "#5b6f8a" }}>
                  {row.quantity}
                </div>
                <div style={{ textAlign: "right", color: "#5b6f8a" }}>
                  {formatMoney(row.unitPrice)}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#0f2d52",
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
          padding: "12px 24px 0",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 12,
        }}
      >
        {/* Notas */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #d8e3ef",
            borderRadius: 16,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.13em",
              color: "#1a2744",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <div
              style={{
                width: 3,
                height: 13,
                borderRadius: 999,
                background: "#00b4a0",
              }}
            />
            Notas y condiciones
          </div>
          <div
            style={{
              fontSize: 10,
              lineHeight: 1.75,
              color: "#5b6f8a",
              whiteSpace: "pre-wrap",
            }}
          >
            {data.notes || "Sin notas adicionales."}
          </div>
        </div>

        {/* Totales */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #d8e3ef",
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
                fontSize: 10.5,
                color: "#5b6f8a",
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
                fontSize: 10.5,
                color: "#5b6f8a",
              }}
            >
              <span>Descuento</span>
              <span>- {formatMoney(discount)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10.5,
                color: "#5b6f8a",
              }}
            >
              <span>Impuesto</span>
              <span>{formatMoney(taxAmount)}</span>
            </div>
          </div>

          {/* Total destacado */}
          <div
            style={{
              padding: "14px 15px",
              background: "linear-gradient(135deg, #0f2d52 0%, #1a4a7a 100%)",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: "linear-gradient(90deg, #00b4a0, #00d4bc, #007d71)",
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#00d4bc",
              }}
            >
              Total
            </span>
            <span style={{ fontSize: 17, fontWeight: 800 }}>
              {formatMoney(total)}
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: "auto", padding: "14px 24px 22px" }}>
        <div
          style={{
            paddingTop: 10,
            borderTop: "1px solid #cdd8e6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            fontSize: 9,
            color: "#8fa3ba",
          }}
        >
          <span>{data.companyName || "Tu empresa"}</span>
          <div
            style={{
              flex: 1,
              height: 1,
              background: "linear-gradient(90deg, transparent, #00b4a0, transparent)",
              opacity: 0.4,
            }}
          />
          <span>{data.docNumber || "COT-001"}</span>
        </div>
      </div>
    </div>
  )
}
