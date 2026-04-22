import type { TemplateData } from "@/types/cotizacion-form"

type TemplatePremium5Props = {
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

export default function TemplatePremium5({ data }: TemplatePremium5Props) {
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
        background: "#fdf7f2",
        color: "#2e1a14",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: 155,
          background: "#3d1a14",
          display: "grid",
          gridTemplateColumns: "1fr auto",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: -45,
            left: -20,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(195,98,67,0.14)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -30,
            right: 140,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(232,162,120,0.1)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 20,
            right: -10,
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: "12px solid rgba(232,162,120,0.1)",
            pointerEvents: "none",
          }}
        />

        {/* Left */}
        <div
          style={{
            padding: "26px 28px 22px",
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
              marginBottom: 12,
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#e8a278",
              }}
            />
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "#e8a278",
              }}
            >
              Propuesta premium
            </span>
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#e8a278",
              }}
            />
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 27,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
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
                fontSize: 10.5,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.48)",
                maxWidth: 295,
              }}
            >
              {data.description}
            </p>
          ) : null}
        </div>

        {/* Right */}
        <div
          style={{
            padding: "24px 24px 20px",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            minWidth: 158,
            position: "relative",
          }}
        >
          {data.companyLogo ? (
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "#ffffff",
                padding: 7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                border: "1.5px solid rgba(232,162,120,0.35)",
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
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg, #c36243, #8c3520)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 800,
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
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
                color: "rgba(255,255,255,0.42)",
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
          background: "linear-gradient(90deg, #8c3520 0%, #c36243 35%, #e8a278 65%, #c36243 100%)",
        }}
      />

      {/* CLIENTE + RESUMEN */}
      <div
        style={{
          padding: "15px 22px 11px",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 11,
        }}
      >
        {/* Cliente */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #ecd8cc",
          }}
        >
          <div
            style={{
              padding: "9px 14px",
              background: "#f5ede7",
              borderBottom: "1px solid #e8d5c8",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: "#c36243",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#ffffff",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#8c3520",
              }}
            >
              Datos del cliente
            </span>
          </div>
          <div style={{ padding: "13px 15px" }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#2e1a14",
                marginBottom: 7,
              }}
            >
              {data.clientName || "Cliente"}
            </div>
            <div
              style={{
                fontSize: 10,
                lineHeight: 1.75,
                color: "#7a5548",
              }}
            >
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
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #ecd8cc",
          }}
        >
          <div
            style={{
              padding: "9px 14px",
              background: "#3d1a14",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: "#c36243",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#ffffff",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#e8a278",
              }}
            >
              Resumen
            </span>
          </div>
          <div
            style={{
              padding: "13px 15px",
              display: "grid",
              gap: 7,
              fontSize: 10,
              color: "#7a5548",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
            >
              <span>Conceptos</span>
              <strong style={{ color: "#2e1a14" }}>{rows.length}</strong>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
            >
              <span>Descuento</span>
              <strong style={{ color: "#2e1a14" }}>{formatMoney(discount)}</strong>
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
            >
              <span>Impuesto</span>
              <strong style={{ color: "#2e1a14" }}>{taxPercent}%</strong>
            </div>
            {data.validUntil ? (
              <div
                style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
              >
                <span>Vigencia</span>
                <strong style={{ color: "#2e1a14" }}>{data.validUntil}</strong>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* TABLA */}
      <div style={{ padding: "0 22px" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #ecd8cc",
          }}
        >
          {/* Encabezado tabla */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.25fr 0.55fr 1fr 1fr",
              gap: 10,
              padding: "10px 15px",
              background: "#3d1a14",
              fontSize: 8.5,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#e8a278",
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
                padding: "20px 15px",
                textAlign: "center",
                fontSize: 11,
                color: "#c4a090",
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
                  gridTemplateColumns: "2.25fr 0.55fr 1fr 1fr",
                  gap: 10,
                  padding: "11px 15px",
                  borderTop: index === 0 ? "none" : "1px solid #f5ebe4",
                  background: index % 2 === 0 ? "#ffffff" : "#fdf7f4",
                  fontSize: 11,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#2e1a14",
                      lineHeight: 1.35,
                    }}
                  >
                    {row.concept}
                  </div>
                  {row.detail ? (
                    <div
                      style={{
                        marginTop: 2,
                        fontSize: 8.5,
                        color: "#c36243",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {row.detail}
                    </div>
                  ) : null}
                </div>

                <div style={{ textAlign: "center", color: "#7a5548" }}>
                  {row.quantity}
                </div>

                <div style={{ textAlign: "right", color: "#7a5548" }}>
                  {formatMoney(row.unitPrice)}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#8c3520",
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
          padding: "11px 22px 0",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 11,
        }}
      >
        {/* Notas */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #ecd8cc",
          }}
        >
          <div
            style={{
              padding: "9px 14px",
              background: "#f5ede7",
              borderBottom: "1px solid #e8d5c8",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                background: "#c36243",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#ffffff",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#8c3520",
              }}
            >
              Notas y condiciones
            </span>
          </div>
          <div
            style={{
              padding: "13px 15px",
              fontSize: 10,
              lineHeight: 1.75,
              color: "#7a5548",
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
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #ecd8cc",
          }}
        >
          <div style={{ padding: "13px 15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 7,
                fontSize: 10.5,
                color: "#7a5548",
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
                color: "#7a5548",
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
                color: "#7a5548",
              }}
            >
              <span>Impuesto</span>
              <span>{formatMoney(taxAmount)}</span>
            </div>
          </div>

          {/* Total destacado */}
          <div
            style={{
              padding: "13px 15px",
              background: "linear-gradient(135deg, #3d1a14 0%, #6b2516 100%)",
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
                height: 2.5,
                background: "linear-gradient(90deg, #8c3520, #e8a278, #c36243)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -20,
                bottom: -20,
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: "rgba(232,162,120,0.08)",
              }}
            />
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#e8a278",
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
      <div
        style={{
          marginTop: "auto",
          padding: "12px 22px 20px",
        }}
      >
        <div
          style={{
            paddingTop: 10,
            borderTop: "1px solid #e8d5c8",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 9,
            color: "#c4a090",
          }}
        >
          <span>{data.companyName || "Tu empresa"}</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            {[8, 14, 8].map((w, i) => (
              <div
                key={i}
                style={{
                  width: w,
                  height: 2,
                  borderRadius: 999,
                  background: i === 1 ? "#c36243" : "#e8c4b0",
                }}
              />
            ))}
          </div>
          <span>{data.docNumber || "COT-001"}</span>
        </div>
      </div>
    </div>
  )
}
