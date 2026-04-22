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
        background: "#f6f8fc",
        color: "#172033",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -80,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "rgba(79, 70, 229, 0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -70,
          left: -60,
          width: 190,
          height: 190,
          borderRadius: "50%",
          background: "rgba(245, 158, 11, 0.07)",
        }}
      />

      <div style={{ position: "relative", padding: "24px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e7ecf6",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 20px 46px rgba(25, 36, 64, 0.08)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.05fr 0.95fr",
              gap: 0,
              background:
                "linear-gradient(135deg, #ffffff 0%, #ffffff 62%, #f7f8ff 100%)",
            }}
          >
            <div
              style={{
                padding: "24px 22px 18px 22px",
                borderRight: "1px solid #edf1f7",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  marginBottom: 16,
                }}
              >
                {safeData.companyLogo ? (
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 18,
                      background: "#ffffff",
                      border: "1px solid #e7ecf6",
                      boxShadow: "0 10px 24px rgba(23, 32, 51, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: 7,
                      flexShrink: 0,
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
                        "linear-gradient(135deg, #1e293b 0%, #4f46e5 100%)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 800,
                      boxShadow: "0 10px 24px rgba(23, 32, 51, 0.18)",
                      flexShrink: 0,
                    }}
                  >
                    {initials}
                  </div>
                )}

                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      lineHeight: 1.15,
                      color: "#172033",
                      wordBreak: "break-word",
                    }}
                  >
                    {safeData.companyName || "Tu Empresa"}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 3,
                        borderRadius: 999,
                        background:
                          "linear-gradient(90deg, #4f46e5, #f59e0b)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 800,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#4f46e5",
                      }}
                    >
                      Moderna Pro
                    </span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background:
                    "linear-gradient(135deg, #172033 0%, #263552 55%, #4f46e5 100%)",
                  borderRadius: 22,
                  padding: "18px 18px 16px",
                  color: "#ffffff",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -18,
                    right: -12,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.70)",
                      marginBottom: 8,
                    }}
                  >
                    Propuesta de servicios
                  </div>

                  <h1
                    style={{
                      margin: 0,
                      fontSize: 29,
                      lineHeight: 1.05,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      wordBreak: "break-word",
                    }}
                  >
                    {safeData.title || "Cotización"}
                  </h1>

                  {safeData.description ? (
                    <p
                      style={{
                        margin: "10px 0 0",
                        fontSize: 10,
                        lineHeight: 1.7,
                        color: "rgba(255,255,255,0.76)",
                        maxWidth: 260,
                      }}
                    >
                      {safeData.description}
                    </p>
                  ) : null}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginTop: 14,
                }}
              >
                <div
                  style={{
                    background: "#f8faff",
                    border: "1px solid #e7ecf6",
                    borderRadius: 16,
                    padding: "14px 14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#64748b",
                      marginBottom: 7,
                    }}
                  >
                    Documento
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: 7,
                      fontSize: 9.5,
                      color: "#6b7280",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Folio</span>
                      <strong style={{ color: "#172033" }}>
                        {safeData.docNumber || "COT-001"}
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Fecha</span>
                      <strong style={{ color: "#172033" }}>
                        {safeData.date || new Date().toLocaleDateString("es-MX")}
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Vigencia</span>
                      <strong style={{ color: "#172033" }}>
                        {safeData.validUntil || "—"}
                      </strong>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "#fffaf2",
                    border: "1px solid #fde7c2",
                    borderRadius: 16,
                    padding: "14px 14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#d97706",
                      marginBottom: 7,
                    }}
                  >
                    Totales rápidos
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: 7,
                      fontSize: 9.5,
                      color: "#7b6d5b",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Conceptos</span>
                      <strong style={{ color: "#172033" }}>{items.length}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>IVA</span>
                      <strong style={{ color: "#172033" }}>{tax}%</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Descuento</span>
                      <strong style={{ color: "#172033" }}>
                        {formatMoney(discount)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "24px 22px 22px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e7ecf6",
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "11px 14px",
                    background: "linear-gradient(90deg, #f8faff, #fefaf3)",
                    borderBottom: "1px solid #edf1f7",
                    fontSize: 8.5,
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#4f46e5",
                  }}
                >
                  Datos del cliente
                </div>

                <div style={{ padding: "14px 14px" }}>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 800,
                      color: "#172033",
                      lineHeight: 1.2,
                      marginBottom: 8,
                      wordBreak: "break-word",
                    }}
                  >
                    {safeData.clientName || "Cliente"}
                  </div>

                  <div
                    style={{
                      fontSize: 9.5,
                      lineHeight: 1.75,
                      color: "#6b7280",
                    }}
                  >
                    {safeData.clientEmail && <div>{safeData.clientEmail}</div>}
                    {safeData.clientPhone && <div>{safeData.clientPhone}</div>}
                    {safeData.clientAddress && <div>{safeData.clientAddress}</div>}
                    {safeData.clientRFC && <div>RFC: {safeData.clientRFC}</div>}
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e7ecf6",
                  borderRadius: 18,
                  overflow: "hidden",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.8fr 0.7fr 0.55fr 0.95fr 1fr",
                    gap: 8,
                    padding: "11px 14px",
                    background:
                      "linear-gradient(135deg, #172033 0%, #2b3655 70%, #4f46e5 100%)",
                    color: "#f8d08c",
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
                        gridTemplateColumns:
                          "1.8fr 0.7fr 0.55fr 0.95fr 1fr",
                        gap: 8,
                        padding: "11px 14px",
                        borderTop: index === 0 ? "none" : "1px solid #f1f3f8",
                        background: index % 2 === 0 ? "#ffffff" : "#fbfcff",
                        fontSize: "10px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            color: "#172033",
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
                              color: "#9ca3af",
                              fontSize: "8.5px",
                              marginTop: 3,
                            }}
                          >
                            {item.detail}
                          </div>
                        ) : null}
                      </div>

                      <div style={{ color: "#727b8f", fontSize: "9px" }}>
                        {item.type === "service" ? "Servicio" : "Producto"}
                      </div>

                      <div style={{ textAlign: "center", color: "#727b8f" }}>
                        {item.quantity}
                      </div>

                      <div style={{ textAlign: "right", color: "#727b8f" }}>
                        {formatMoney(item.price)}
                      </div>

                      <div
                        style={{
                          textAlign: "right",
                          color: "#172033",
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
                      color: "#9ca3af",
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
                  gridTemplateColumns: "1fr 210px",
                  gap: 14,
                  alignItems: "start",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e7ecf6",
                    borderRadius: 18,
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 8.5,
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#d97706",
                      marginBottom: 8,
                    }}
                  >
                    Notas
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "9.5px",
                      lineHeight: 1.75,
                      color: "#6b7280",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {safeData.notes || "Sin observaciones adicionales."}
                  </p>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e7ecf6",
                    borderRadius: 18,
                    overflow: "hidden",
                    boxShadow: "0 10px 24px rgba(23, 32, 51, 0.06)",
                  }}
                >
                  <div style={{ padding: "14px 14px 12px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 7,
                        fontSize: "10px",
                        color: "#727b8f",
                      }}
                    >
                      <span>Subtotal</span>
                      <span style={{ color: "#172033", fontWeight: 600 }}>
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
                          color: "#727b8f",
                        }}
                      >
                        <span>IVA ({tax}%)</span>
                        <span style={{ color: "#172033", fontWeight: 600 }}>
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
                          color: "#727b8f",
                        }}
                      >
                        <span>Descuento</span>
                        <span style={{ color: "#16a34a", fontWeight: 600 }}>
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
                        "linear-gradient(135deg, #172033 0%, #4f46e5 70%, #7c3aed 100%)",
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(255,255,255,0.78)",
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
                        color: "#f8cd75",
                        fontSize: "17px",
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
                  marginTop: "auto",
                  paddingTop: 14,
                  borderTop: "1px solid #eceff6",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <p
                  style={{
                    color: "#a5acb9",
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
                      background: "#f59e0b",
                    }}
                  />
                  <p
                    style={{
                      color: "#4f46e5",
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
    </div>
  )
}


