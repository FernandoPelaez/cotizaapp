import type { TemplateData } from "@/types/cotizacion-form"

type Props = {
  data?: TemplateData
}

type QuoteItem = {
  id: string
  type: "service" | "product"
  name: string
  quantity: number
  price: number
  amount: number
  detail?: string
}

const defaultData: TemplateData = {
  title: "Cotización",
  description:
    "Documento comercial con una propuesta clara, moderna y profesional.",
  clientName: "Cliente ejemplo",
  clientEmail: "cliente@correo.com",
  clientPhone: "+52 667 123 4567",
  clientAddress: "Los Mochis, Sinaloa",
  clientRFC: "XAXX010101000",
  companyName: "Tu Empresa",
  companyLogo: undefined,
  docNumber: "COT-001",
  date: new Date().toLocaleDateString("es-MX"),
  discount: 0,
  tax: 16,
  notes: "Gracias por considerar nuestra propuesta.",
  services: [
    { name: "Servicio 1", price: 500 },
    { name: "Servicio 2", price: 800 },
  ],
  products: [{ name: "Producto 1", quantity: 2, price: 150 }],
  total: 1856,
  subtotal: 1600,
  validUntil: new Date().toISOString().slice(0, 10),
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value || 0)
}

function buildItems(data: TemplateData): QuoteItem[] {
  const serviceItems: QuoteItem[] = (data.services ?? []).map(
    (service, index) => ({
      id: `service-${index}`,
      type: "service",
      name: service.name || `Servicio ${index + 1}`,
      quantity: 1,
      price: Number(service.price || 0),
      amount: Number(service.price || 0),
      detail: "Servicio",
    })
  )

  const productItems: QuoteItem[] = (data.products ?? []).map(
    (product, index) => ({
      id: `product-${index}`,
      type: "product",
      name: product.name || `Producto ${index + 1}`,
      quantity: Number(product.quantity || 0),
      price: Number(product.price || 0),
      amount: Number(product.quantity || 0) * Number(product.price || 0),
      detail: "Producto",
    })
  )

  return [...serviceItems, ...productItems]
}

const palette = {
  pageBg: "#f4f7fb",
  pageBgSoft: "#edf4ff",
  surface: "#ffffff",
  surfaceSoft: "#f8fbff",
  surfaceWarm: "#fff8f1",
  ink: "#122033",
  inkSoft: "#334155",
  muted: "#6b7a90",
  mutedSoft: "#94a3b8",
  border: "#dbe5f0",
  borderSoft: "#e8eef5",
  navy: "#0f172a",
  blue: "#1d4ed8",
  blueSoft: "#2563eb",
  cyan: "#0ea5e9",
  orange: "#f97316",
  orangeSoft: "#fb923c",
  green: "#16a34a",
}

export default function TemplateModerna3({ data }: Props) {
  const safeData: TemplateData = {
    ...defaultData,
    ...data,
    services: data?.services ?? defaultData.services,
    products: data?.products ?? defaultData.products,
  }

  const items = buildItems(safeData)

  const calculatedSubtotal =
    items.length > 0
      ? items.reduce((acc, item) => acc + item.amount, 0)
      : Number(safeData.subtotal || 0)

  const subtotal = Number(safeData.subtotal ?? calculatedSubtotal)
  const discount = Number(safeData.discount ?? 0)
  const tax = Number(safeData.tax ?? 0)
  const taxableBase = Math.max(0, subtotal - discount)
  const taxAmount = taxableBase * (tax / 100)
  const finalTotal = Number(safeData.total ?? taxableBase + taxAmount)

  const initials = String(safeData.companyName || "TE")
    .trim()
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      id="template-moderna-3"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: palette.pageBg,
        color: palette.ink,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -70,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(37, 99, 235, 0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 90,
          left: -70,
          width: 170,
          height: 170,
          borderRadius: "50%",
          background: "rgba(14, 165, 233, 0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -90,
          left: -20,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(249, 115, 22, 0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: -55,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "rgba(29, 78, 216, 0.05)",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: "22px",
        }}
      >
        <div
          style={{
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: "30px",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "1.12fr 0.88fr",
              background:
                "linear-gradient(135deg, #0f172a 0%, #12274a 38%, #1d4ed8 100%)",
              color: "#ffffff",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -30,
                right: 120,
                width: 130,
                height: 130,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -50,
                left: 120,
                width: 110,
                height: 110,
                borderRadius: "50%",
                background: "rgba(249,115,22,0.16)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 26,
                right: 24,
                width: 88,
                height: 88,
                borderRadius: "24px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.06)",
                transform: "rotate(18deg)",
              }}
            />

            <div
              style={{
                position: "relative",
                padding: "24px 24px 22px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 4,
                    borderRadius: 999,
                    background:
                      "linear-gradient(90deg, #fb923c 0%, #fde68a 100%)",
                  }}
                />
                <span
                  style={{
                    fontSize: 8.5,
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.78)",
                  }}
                >
                  Propuesta comercial
                </span>
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 31,
                  lineHeight: 1.03,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  maxWidth: 300,
                  wordBreak: "break-word",
                }}
              >
                {safeData.title || "Cotización"}
              </h1>

              {safeData.description ? (
                <p
                  style={{
                    margin: "12px 0 0",
                    maxWidth: 310,
                    fontSize: "10px",
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.76)",
                  }}
                >
                  {safeData.description}
                </p>
              ) : null}
            </div>

            <div
              style={{
                position: "relative",
                padding: "22px 22px 20px",
                borderLeft: "1px solid rgba(255,255,255,0.09)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 14,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 10,
                }}
              >
                {safeData.companyLogo ? (
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 18,
                      background: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: 7,
                      boxShadow: "0 12px 28px rgba(0,0,0,0.16)",
                    }}
                  >
                    <img
                      src={safeData.companyLogo}
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
                      borderRadius: 18,
                      background:
                        "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 800,
                      boxShadow: "0 12px 28px rgba(249, 115, 22, 0.28)",
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
                      lineHeight: 1.15,
                      wordBreak: "break-word",
                    }}
                  >
                    {safeData.companyName || "Tu Empresa"}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 9.5,
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.72)",
                    }}
                  >
                    <div>{safeData.docNumber || "COT-001"}</div>
                    <div>{safeData.date || new Date().toLocaleDateString("es-MX")}</div>
                    {safeData.validUntil ? <div>Vigencia: {safeData.validUntil}</div> : null}
                  </div>
                </div>
              </div>

              <div
                style={{
                  minWidth: 144,
                  borderRadius: 18,
                  padding: "13px 15px",
                  background:
                    "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
                  boxShadow: "0 14px 32px rgba(249, 115, 22, 0.28)",
                  textAlign: "right",
                }}
              >
                <div
                  style={{
                    fontSize: 8,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "rgba(255,255,255,0.82)",
                    marginBottom: 6,
                  }}
                >
                  Total final
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    lineHeight: 1,
                    color: "#ffffff",
                  }}
                >
                  {formatMoney(finalTotal)}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "18px 20px 16px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                gap: 14,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  background: palette.surfaceSoft,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 18,
                  padding: "15px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: 8.5,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: palette.blue,
                    marginBottom: 8,
                  }}
                >
                  Cliente
                </div>

                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: palette.ink,
                    marginBottom: 7,
                    lineHeight: 1.2,
                    wordBreak: "break-word",
                  }}
                >
                  {safeData.clientName || "Cliente"}
                </div>

                <div
                  style={{
                    fontSize: 9.5,
                    lineHeight: 1.75,
                    color: palette.muted,
                  }}
                >
                  {safeData.clientEmail && <div>{safeData.clientEmail}</div>}
                  {safeData.clientPhone && <div>{safeData.clientPhone}</div>}
                  {safeData.clientAddress && <div>{safeData.clientAddress}</div>}
                  {safeData.clientRFC && <div>RFC: {safeData.clientRFC}</div>}
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
                    background: "#f7fbff",
                    border: `1px solid ${palette.border}`,
                    borderRadius: 18,
                    padding: "14px 13px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: palette.blue,
                      marginBottom: 8,
                    }}
                  >
                    Resumen
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: 7,
                      fontSize: 9.5,
                      color: palette.muted,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Conceptos</span>
                      <strong style={{ color: palette.ink }}>{items.length}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>IVA</span>
                      <strong style={{ color: palette.ink }}>{tax}%</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Descuento</span>
                      <strong style={{ color: palette.ink }}>
                        {formatMoney(discount)}
                      </strong>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: palette.surfaceWarm,
                    border: "1px solid #fde5cf",
                    borderRadius: 18,
                    padding: "14px 13px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: palette.orange,
                      marginBottom: 8,
                    }}
                  >
                    Documento
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: 7,
                      fontSize: 9.5,
                      color: "#7c6f62",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Folio</span>
                      <strong style={{ color: palette.ink }}>
                        {safeData.docNumber || "COT-001"}
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Fecha</span>
                      <strong style={{ color: palette.ink }}>
                        {safeData.date || new Date().toLocaleDateString("es-MX")}
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Vigencia</span>
                      <strong style={{ color: palette.ink }}>
                        {safeData.validUntil || "—"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                border: `1px solid ${palette.border}`,
                background: palette.surface,
                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.1fr 0.85fr 0.55fr 1fr 1fr",
                  gap: 8,
                  padding: "11px 14px",
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #12305c 55%, #1d4ed8 100%)",
                  color: "#dbeafe",
                  fontSize: "8.5px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                }}
              >
                <div>Descripción</div>
                <div>Tipo</div>
                <div style={{ textAlign: "center" }}>Cant.</div>
                <div style={{ textAlign: "right" }}>Precio</div>
                <div style={{ textAlign: "right" }}>Importe</div>
              </div>

              {items.length > 0 ? (
                items.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2.1fr 0.85fr 0.55fr 1fr 1fr",
                      gap: 8,
                      padding: "11px 14px",
                      borderTop: index === 0 ? "none" : `1px solid ${palette.borderSoft}`,
                      background: index % 2 === 0 ? "#ffffff" : "#fbfdff",
                      fontSize: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: palette.ink,
                          fontWeight: 700,
                          lineHeight: 1.35,
                          wordBreak: "break-word",
                        }}
                      >
                        {item.name}
                      </div>
                      {item.detail ? (
                        <div
                          style={{
                            color: palette.mutedSoft,
                            fontSize: "8.5px",
                            marginTop: 3,
                          }}
                        >
                          {item.detail}
                        </div>
                      ) : null}
                    </div>

                    <div
                      style={{
                        color: palette.muted,
                        fontSize: "9px",
                      }}
                    >
                      {item.type === "service" ? "Servicio" : "Producto"}
                    </div>

                    <div style={{ textAlign: "center", color: palette.muted }}>
                      {item.quantity}
                    </div>

                    <div style={{ textAlign: "right", color: palette.muted }}>
                      {formatMoney(item.price)}
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        color: palette.ink,
                        fontWeight: 800,
                      }}
                    >
                      {formatMoney(item.amount)}
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: "26px 14px",
                    textAlign: "center",
                    color: palette.mutedSoft,
                    fontSize: "10px",
                  }}
                >
                  No hay conceptos registrados en esta cotización.
                </div>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 220px",
                gap: 14,
                marginTop: 16,
                alignItems: "start",
              }}
            >
              <div
                style={{
                  background: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 18,
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: 8.5,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: palette.orange,
                    marginBottom: 8,
                  }}
                >
                  Notas / condiciones
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "9.5px",
                    lineHeight: 1.75,
                    color: palette.muted,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {safeData.notes || "Sin observaciones adicionales."}
                </p>
              </div>

              <div
                style={{
                  background: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 10px 24px rgba(15, 23, 42, 0.05)",
                }}
              >
                <div
                  style={{
                    padding: "13px 14px",
                    background: "linear-gradient(180deg, #ffffff, #f8fbff)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 7,
                      fontSize: "10px",
                      color: palette.muted,
                    }}
                  >
                    <span>Subtotal</span>
                    <span style={{ color: palette.ink, fontWeight: 600 }}>
                      {formatMoney(subtotal)}
                    </span>
                  </div>

                  {tax > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 7,
                        fontSize: "10px",
                        color: palette.muted,
                      }}
                    >
                      <span>IVA ({tax}%)</span>
                      <span style={{ color: palette.ink, fontWeight: 600 }}>
                        {formatMoney(taxAmount)}
                      </span>
                    </div>
                  )}

                  {discount > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "10px",
                        color: palette.muted,
                      }}
                    >
                      <span>Descuento</span>
                      <span style={{ color: palette.green, fontWeight: 700 }}>
                        − {formatMoney(discount)}
                      </span>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 14px",
                    background:
                      "linear-gradient(135deg, #0f172a 0%, #1d4ed8 65%, #0ea5e9 100%)",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: "8.5px",
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    Total final
                  </span>
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "18px",
                      fontWeight: 800,
                    }}
                  >
                    {formatMoney(finalTotal)}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 18,
                paddingTop: 14,
                borderTop: `1px solid ${palette.borderSoft}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <p
                style={{
                  color: palette.mutedSoft,
                  fontSize: "8px",
                  margin: 0,
                  letterSpacing: "0.04em",
                }}
              >
                {safeData.validUntil
                  ? `Este documento es válido hasta ${safeData.validUntil}.`
                  : "Documento comercial listo para compartir."}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 18,
                    height: 2,
                    borderRadius: 999,
                    background:
                      "linear-gradient(90deg, #f97316 0%, #1d4ed8 100%)",
                  }}
                />
                <p
                  style={{
                    color: palette.blue,
                    fontSize: "8px",
                    margin: 0,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {safeData.companyName || "Tu Empresa"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

