import type { TemplateData } from "@/types/cotizacion-form"

type TemplatePremium9Props = {
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

export default function TemplatePremium9({ data }: TemplatePremium9Props) {
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
        background: "#f5f3ef",
        color: "#1c1a17",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          minHeight: 148,
        }}
      >
        {/* Franja izquierda decorativa */}
        <div
          style={{
            width: 8,
            background: "linear-gradient(180deg, #d4af37 0%, #a0791e 100%)",
            flexShrink: 0,
          }}
        />

        {/* Cuerpo del header */}
        <div
          style={{
            flex: 1,
            background: "#0d2b1f",
            padding: "22px 22px 20px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Círculos decorativos */}
          <div
            style={{
              position: "absolute",
              right: -30,
              bottom: -30,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 60,
              top: -20,
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }}
          />

          {/* Lado izquierdo */}
          <div style={{ position: "relative", maxWidth: 310 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 2,
                  borderRadius: 999,
                  background: "#d4af37",
                }}
              />
              <span
                style={{
                  fontSize: 8.5,
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#d4af37",
                }}
              >
                Cotización premium
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 26,
                lineHeight: 1.1,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: "#ffffff",
              }}
            >
              {data.title || "Propuesta de servicios"}
            </h1>

            {data.description ? (
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: 10.5,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {data.description}
              </p>
            ) : null}
          </div>

          {/* Lado derecho */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
              position: "relative",
            }}
          >
            {data.companyLogo ? (
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 14,
                  background: "#ffffff",
                  padding: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.28)",
                  border: "1.5px solid rgba(212,175,55,0.35)",
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
                  width: 62,
                  height: 62,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #d4af37, #a0791e)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 19,
                  fontWeight: 800,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.28)",
                }}
              >
                {initials}
              </div>
            )}

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.2,
                }}
              >
                {data.companyName || "Tu empresa"}
              </div>
              <div
                style={{
                  marginTop: 5,
                  fontSize: 9.5,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.55)",
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

      {/* BANDA DORADA INFERIOR DEL HEADER */}
      <div
        style={{
          height: 4,
          background: "linear-gradient(90deg, #d4af37 0%, #f5e27a 50%, #a0791e 100%)",
        }}
      />

      {/* SECCIÓN CLIENTE + RESUMEN */}
      <div style={{ padding: "14px 22px 10px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 10,
          }}
        >
          {/* Cliente */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid #e2ddd6",
            }}
          >
            <div
              style={{
                padding: "8px 14px",
                background: "#1a3d2b",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 14,
                  borderRadius: 999,
                  background: "#d4af37",
                }}
              />
              <span
                style={{
                  fontSize: 8.5,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#d4af37",
                }}
              >
                Datos del cliente
              </span>
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0d2b1f",
                  marginBottom: 6,
                }}
              >
                {data.clientName || "Cliente"}
              </div>
              <div
                style={{
                  fontSize: 9.5,
                  lineHeight: 1.75,
                  color: "#6b6050",
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
              border: "1px solid #e2ddd6",
            }}
          >
            <div
              style={{
                padding: "8px 14px",
                background: "#1a3d2b",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 14,
                  borderRadius: 999,
                  background: "#d4af37",
                }}
              />
              <span
                style={{
                  fontSize: 8.5,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#d4af37",
                }}
              >
                Resumen
              </span>
            </div>
            <div
              style={{
                padding: "12px 14px",
                display: "grid",
                gap: 6,
                fontSize: 9.5,
                color: "#6b6050",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Conceptos</span>
                <strong style={{ color: "#0d2b1f" }}>{rows.length}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Descuento</span>
                <strong style={{ color: "#0d2b1f" }}>{formatMoney(discount)}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Impuesto</span>
                <strong style={{ color: "#0d2b1f" }}>{taxPercent}%</strong>
              </div>
              {data.validUntil ? (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Vigencia</span>
                  <strong style={{ color: "#0d2b1f" }}>{data.validUntil}</strong>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* TABLA DE CONCEPTOS */}
      <div style={{ padding: "0 22px" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #e2ddd6",
          }}
        >
          {/* Encabezado tabla */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.3fr 0.6fr 1fr 1fr",
              gap: 10,
              padding: "9px 14px",
              background: "#0d2b1f",
              fontSize: 8.5,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#d4af37",
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
                color: "#9a8e80",
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
                  padding: "11px 14px",
                  borderTop: index === 0 ? "none" : "1px solid #ede8e0",
                  background: index % 2 === 0 ? "#ffffff" : "#faf8f4",
                  fontSize: 10.5,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#0d2b1f",
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
                        color: "#a89880",
                      }}
                    >
                      {row.detail}
                    </div>
                  ) : null}
                </div>

                <div style={{ textAlign: "center", color: "#7a6e60" }}>
                  {row.quantity}
                </div>

                <div style={{ textAlign: "right", color: "#7a6e60" }}>
                  {formatMoney(row.unitPrice)}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 800,
                    color: "#1a3d2b",
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
          padding: "10px 22px 0",
          display: "grid",
          gridTemplateColumns: "1fr 184px",
          gap: 10,
        }}
      >
        {/* Notas */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #e2ddd6",
          }}
        >
          <div
            style={{
              padding: "8px 14px",
              background: "#1a3d2b",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <div
              style={{
                width: 3,
                height: 14,
                borderRadius: 999,
                background: "#d4af37",
              }}
            />
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#d4af37",
              }}
            >
              Notas y condiciones
            </span>
          </div>
          <div
            style={{
              padding: "12px 14px",
              fontSize: 9.5,
              lineHeight: 1.7,
              color: "#6b6050",
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
            border: "1px solid #e2ddd6",
          }}
        >
          <div style={{ padding: "12px 14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                fontSize: 9.5,
                color: "#7a6e60",
              }}
            >
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                fontSize: 9.5,
                color: "#7a6e60",
              }}
            >
              <span>Descuento</span>
              <span>- {formatMoney(discount)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 9.5,
                color: "#7a6e60",
              }}
            >
              <span>Impuesto</span>
              <span>{formatMoney(taxAmount)}</span>
            </div>
          </div>

          {/* Total destacado */}
          <div
            style={{
              padding: "12px 14px",
              background: "#0d2b1f",
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
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: "linear-gradient(90deg, #d4af37, #f5e27a, #a0791e)",
              }}
            />
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#d4af37",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: 15,
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
      <div
        style={{
          marginTop: "auto",
          padding: "12px 22px 18px",
        }}
      >
        <div
          style={{
            paddingTop: 10,
            borderTop: "1px solid #ddd8cf",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 8.5,
            color: "#a89880",
          }}
        >
          <span>{data.companyName || "Tu empresa"}</span>
          <div
            style={{
              width: 30,
              height: 1.5,
              borderRadius: 999,
              background: "linear-gradient(90deg, #d4af37, #a0791e)",
            }}
          />
          <span>{data.docNumber || "COT-001"}</span>
        </div>
      </div>
    </div>
  )
}
