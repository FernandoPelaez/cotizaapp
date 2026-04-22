import type { TemplateData } from "@/types/cotizacion-form"

type TemplatePremium10Props = {
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

export default function TemplatePremium10({
  data,
}: TemplatePremium10Props) {
  const rows = buildRows(data)
  const subtotal =
    data.subtotal ?? rows.reduce((acc, row) => acc + row.amount, 0)
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
        background: "#faf8f3",
        color: "#2f2a2e",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "18px 22px 0",
        }}
      >
        <div
          style={{
            background: "#fffdf9",
            border: "1px solid #ece6dc",
            borderRadius: 22,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(88,78,69,0.05)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "18px 1fr",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(180deg, #8b7cf6 0%, #67c3b7 48%, #d8b46c 100%)",
              }}
            />

            <div
              style={{
                position: "relative",
                padding: "22px 22px 18px",
                background:
                  "linear-gradient(135deg, #f8f5ff 0%, #f7fcfb 52%, #fffaf2 100%)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  right: -25,
                  top: -18,
                  width: 105,
                  height: 105,
                  borderRadius: "50%",
                  background: "rgba(139,124,246,0.10)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: 75,
                  bottom: -32,
                  width: 95,
                  height: 95,
                  borderRadius: "50%",
                  background: "rgba(103,195,183,0.10)",
                }}
              />

              <div
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "1.15fr 0.85fr",
                  gap: 14,
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
                        height: 4,
                        borderRadius: 999,
                        background:
                          "linear-gradient(90deg, #8b7cf6, #67c3b7)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.16em",
                        color: "#7a6ce2",
                      }}
                    >
                      Edición premium
                    </span>
                  </div>

                  <h1
                    style={{
                      margin: 0,
                      fontSize: 27,
                      lineHeight: 1.05,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: "#2e2732",
                      maxWidth: 295,
                    }}
                  >
                    {data.title || "Cotización profesional"}
                  </h1>

                  {data.description ? (
                    <p
                      style={{
                        margin: "8px 0 0",
                        maxWidth: 300,
                        fontSize: 11,
                        lineHeight: 1.65,
                        color: "#756c77",
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
                        border: "1px solid #ece6dc",
                        boxShadow: "0 10px 22px rgba(88,78,69,0.08)",
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
                        background:
                          "linear-gradient(135deg, #8b7cf6 0%, #67c3b7 100%)",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        fontWeight: 800,
                        boxShadow: "0 10px 22px rgba(103,195,183,0.18)",
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
                        color: "#2e2732",
                      }}
                    >
                      {data.companyName || "Tu empresa"}
                    </div>

                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 10,
                        lineHeight: 1.65,
                        color: "#807583",
                      }}
                    >
                      <div>{data.docNumber || "COT-001"}</div>
                      <div>{data.date || "Sin fecha"}</div>
                      {data.validUntil ? (
                        <div>Válida hasta: {data.validUntil}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "12px 22px 14px",
              background: "#fffdf9",
              borderTop: "1px solid #f2ece3",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gap: 10,
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #efe8df",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "10px 14px",
                    background: "#fbf8ff",
                    borderBottom: "1px solid #f0e9fb",
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "#7a6ce2",
                  }}
                >
                  Cliente
                </div>

                <div style={{ padding: "12px 14px" }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#2f2a2e",
                      marginBottom: 7,
                    }}
                  >
                    {data.clientName || "Cliente"}
                  </div>

                  <div
                    style={{
                      fontSize: 10,
                      lineHeight: 1.7,
                      color: "#786f76",
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
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e8f1ef",
                    borderRadius: 16,
                    padding: "12px 12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "#4ea397",
                      marginBottom: 8,
                    }}
                  >
                    Resumen
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: 7,
                      fontSize: 10,
                      color: "#786f76",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8,
                      }}
                    >
                      <span>Conceptos</span>
                      <strong style={{ color: "#2f2a2e" }}>{rows.length}</strong>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8,
                      }}
                    >
                      <span>Impuesto</span>
                      <strong style={{ color: "#2f2a2e" }}>{taxPercent}%</strong>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8,
                      }}
                    >
                      <span>Vigencia</span>
                      <strong style={{ color: "#2f2a2e" }}>
                        {data.validUntil || "—"}
                      </strong>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #8b7cf6 0%, #7567dd 100%)",
                    borderRadius: 16,
                    padding: "12px 12px",
                    color: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "rgba(255,255,255,0.76)",
                      marginBottom: 8,
                    }}
                  >
                    Total final
                  </div>

                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 800,
                      lineHeight: 1.05,
                      marginBottom: 8,
                    }}
                  >
                    {formatMoney(total)}
                  </div>

                  <div
                    style={{
                      fontSize: 10,
                      lineHeight: 1.6,
                      color: "rgba(255,255,255,0.78)",
                    }}
                  >
                    Documento listo para compartir o descargar.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "0 22px 12px" }}>
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #efe8df",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.3fr 0.55fr 1fr 1fr",
                  gap: 10,
                  padding: "10px 14px",
                  background:
                    "linear-gradient(90deg, #f9f6ff 0%, #f4fbfa 60%, #fff9f0 100%)",
                  borderBottom: "1px solid #f0ebe3",
                  fontSize: 9,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#887d89",
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
                    color: "#a1979b",
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
                      gridTemplateColumns: "2.3fr 0.55fr 1fr 1fr",
                      gap: 10,
                      padding: "12px 14px",
                      borderTop: index === 0 ? "none" : "1px solid #f5efe8",
                      background: index % 2 === 0 ? "#ffffff" : "#fffdf9",
                      fontSize: 11,
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#2f2a2e",
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
                            color: "#a1979b",
                          }}
                        >
                          {row.detail}
                        </div>
                      ) : null}
                    </div>

                    <div style={{ textAlign: "center", color: "#786f76" }}>
                      {row.quantity}
                    </div>

                    <div style={{ textAlign: "right", color: "#786f76" }}>
                      {formatMoney(row.unitPrice)}
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        fontWeight: 800,
                        color: "#4d9b90",
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
              padding: "0 22px 14px",
              display: "grid",
              gridTemplateColumns: "1fr 172px",
              gap: 10,
            }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #efe8df",
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
                  color: "#c39a53",
                  marginBottom: 8,
                }}
              >
                Notas y condiciones
              </div>

              <div
                style={{
                  fontSize: 10,
                  lineHeight: 1.7,
                  color: "#786f76",
                  whiteSpace: "pre-wrap",
                }}
              >
                {data.notes || "Sin notas adicionales."}
              </div>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #efe8df",
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
                    color: "#786f76",
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
                    color: "#786f76",
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
                    color: "#786f76",
                  }}
                >
                  <span>Impuesto</span>
                  <span>{formatMoney(taxAmount)}</span>
                </div>
              </div>

              <div
                style={{
                  padding: "13px 14px",
                  background:
                    "linear-gradient(90deg, #67c3b7 0%, #8b7cf6 62%, #d8b46c 100%)",
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
              padding: "0 22px 18px",
            }}
          >
            <div
              style={{
                paddingTop: 10,
                borderTop: "1px solid #efe8df",
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                fontSize: 9,
                color: "#a1979b",
              }}
            >
              <span>{data.companyName || "Tu empresa"}</span>
              <span>{data.docNumber || "COT-001"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}