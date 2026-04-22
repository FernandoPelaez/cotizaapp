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
  description: "Documento comercial con una propuesta clara, moderna y profesional.",
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
  const serviceItems: QuoteItem[] = (data.services ?? []).map((service, index) => ({
    id: `service-${index}`,
    type: "service",
    name: service.name || `Servicio ${index + 1}`,
    quantity: 1,
    price: Number(service.price || 0),
    amount: Number(service.price || 0),
    detail: "Servicio",
  }))

  const productItems: QuoteItem[] = (data.products ?? []).map((product, index) => ({
    id: `product-${index}`,
    type: "product",
    name: product.name || `Producto ${index + 1}`,
    quantity: Number(product.quantity || 0),
    price: Number(product.price || 0),
    amount: Number(product.quantity || 0) * Number(product.price || 0),
    detail: "Producto",
  }))

  return [...serviceItems, ...productItems]
}

export default function TemplateModerna2({ data }: Props) {
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
      id="template-moderna-2"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "#f7faf9",
        color: "#18312e",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -70,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(235,119,87,0.10)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 120,
          right: 30,
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: "rgba(33,99,86,0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -50,
          left: -40,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(235,119,87,0.06)",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: "26px 28px 0",
        }}
      >
        <div
          style={{
            borderRadius: "26px",
            overflow: "hidden",
            border: "1px solid #deebe6",
            background: "#ffffff",
            boxShadow: "0 18px 40px rgba(19, 49, 45, 0.07)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 0.85fr",
              background: "linear-gradient(135deg, #163833 0%, #214f46 58%, #2f6f61 100%)",
              color: "#ffffff",
            }}
          >
            <div
              style={{
                padding: "26px 26px 22px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -35,
                  right: -15,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -45,
                  left: 110,
                  width: 95,
                  height: 95,
                  borderRadius: "50%",
                  background: "rgba(235,119,87,0.10)",
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
                      width: 30,
                      height: 4,
                      borderRadius: 999,
                      background: "linear-gradient(90deg, #eb7757, #f1a38d)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: "#f7c7b9",
                    }}
                  >
                    Propuesta de servicios
                  </span>
                </div>

                <h1
                  style={{
                    margin: 0,
                    fontSize: 30,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    maxWidth: 300,
                  }}
                >
                  {safeData.title || "Cotización"}
                </h1>

                {safeData.description ? (
                  <p
                    style={{
                      marginTop: 10,
                      maxWidth: 305,
                      fontSize: 10.5,
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.76)",
                    }}
                  >
                    {safeData.description}
                  </p>
                ) : null}
              </div>
            </div>

            <div
              style={{
                padding: "24px 24px 20px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                {safeData.companyLogo ? (
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: 16,
                      background: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: 7,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.16)",
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
                      width: 62,
                      height: 62,
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #eb7757, #f09d84)",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 800,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.16)",
                    }}
                  >
                    {initials}
                  </div>
                )}

                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      lineHeight: 1.2,
                    }}
                  >
                    {safeData.companyName || "Tu Empresa"}
                  </div>

                  <div
                    style={{
                      marginTop: 5,
                      fontSize: 9.5,
                      lineHeight: 1.65,
                      color: "rgba(255,255,255,0.70)",
                    }}
                  >
                    <div>{safeData.docNumber || "COT-001"}</div>
                    <div>{safeData.date || new Date().toLocaleDateString("es-MX")}</div>
                    {safeData.validUntil && <div>Vigencia: {safeData.validUntil}</div>}
                  </div>
                </div>
              </div>

              <div
                style={{
                  minWidth: 130,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #eb7757 0%, #f09d84 100%)",
                  padding: "12px 14px",
                  textAlign: "right",
                  boxShadow: "0 10px 24px rgba(235,119,87,0.22)",
                }}
              >
                <div
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "rgba(255,255,255,0.78)",
                    marginBottom: 5,
                  }}
                >
                  Total final
                </div>
                <div
                  style={{
                    fontSize: 20,
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

          <div style={{ padding: "16px 22px 14px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  background: "#f5faf8",
                  border: "1px solid #dfebe6",
                  borderRadius: 16,
                  padding: "15px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: 8.5,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "#2f6f61",
                    marginBottom: 8,
                  }}
                >
                  Cliente
                </div>

                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#18312e",
                    marginBottom: 7,
                  }}
                >
                  {safeData.clientName || "Cliente"}
                </div>

                <div
                  style={{
                    fontSize: 9.5,
                    lineHeight: 1.7,
                    color: "#6a817d",
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
                    background: "#fff7f4",
                    border: "1px solid #f4ddd5",
                    borderRadius: 16,
                    padding: "14px 12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "#d06a4c",
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
                      color: "#7e6a62",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Conceptos</span>
                      <strong style={{ color: "#18312e" }}>{items.length}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>IVA</span>
                      <strong style={{ color: "#18312e" }}>{tax}%</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Descuento</span>
                      <strong style={{ color: "#18312e" }}>{formatMoney(discount)}</strong>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid #dfebe6",
                    borderRadius: 16,
                    padding: "14px 12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "#2f6f61",
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
                      color: "#6a817d",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Folio</span>
                      <strong style={{ color: "#18312e" }}>{safeData.docNumber || "COT-001"}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Fecha</span>
                      <strong style={{ color: "#18312e" }}>
                        {safeData.date || new Date().toLocaleDateString("es-MX")}
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Vigencia</span>
                      <strong style={{ color: "#18312e" }}>{safeData.validUntil || "—"}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid #e5ece9",
                background: "#ffffff",
                boxShadow: "0 1px 4px rgba(19,49,45,0.03)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.15fr 0.85fr 0.55fr 1fr 1fr",
                  gap: 8,
                  padding: "11px 14px",
                  background: "linear-gradient(135deg, #18312e 0%, #214f46 100%)",
                  color: "#d9f2eb",
                  fontSize: "8.5px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                }}
              >
                <div>Concepto</div>
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
                      gridTemplateColumns: "2.15fr 0.85fr 0.55fr 1fr 1fr",
                      gap: 8,
                      padding: "11px 14px",
                      borderTop: index === 0 ? "none" : "1px solid #eef3f1",
                      background: index % 2 === 0 ? "#ffffff" : "#fbfcfc",
                      fontSize: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: "#18312e",
                          fontWeight: 700,
                          lineHeight: 1.35,
                        }}
                      >
                        {item.name}
                      </div>
                      {item.detail ? (
                        <div
                          style={{
                            color: "#9aaba8",
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
                        color: "#7b8f8a",
                        fontSize: "9px",
                      }}
                    >
                      {item.type === "service" ? "Servicio" : "Producto"}
                    </div>

                    <div style={{ textAlign: "center", color: "#738884" }}>
                      {item.quantity}
                    </div>

                    <div style={{ textAlign: "right", color: "#738884" }}>
                      {formatMoney(item.price)}
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        color: "#18312e",
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
                    padding: "24px 14px",
                    textAlign: "center",
                    color: "#97aaa6",
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
                  background: "#ffffff",
                  border: "1px solid #e5ece9",
                  borderRadius: 16,
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: 8.5,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "#d06a4c",
                    marginBottom: 8,
                  }}
                >
                  Notas
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "9.5px",
                    lineHeight: 1.7,
                    color: "#6e837f",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {safeData.notes || "Sin observaciones adicionales."}
                </p>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5ece9",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div style={{ padding: "13px 14px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 7,
                      fontSize: "10px",
                      color: "#7a8d89",
                    }}
                  >
                    <span>Subtotal</span>
                    <span style={{ color: "#18312e", fontWeight: 600 }}>
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
                        color: "#7a8d89",
                      }}
                    >
                      <span>IVA ({tax}%)</span>
                      <span style={{ color: "#18312e", fontWeight: 600 }}>
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
                        color: "#7a8d89",
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
                    background: "linear-gradient(135deg, #eb7757 0%, #f09d84 100%)",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(255,255,255,0.86)",
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
                marginTop: 18,
                paddingTop: 14,
                borderTop: "1px solid #e7eeeb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <p
                style={{
                  color: "#a5b3b0",
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
                    width: 16,
                    height: 2,
                    borderRadius: 999,
                    background: "#eb7757",
                  }}
                />
                <p
                  style={{
                    color: "#2f6f61",
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
