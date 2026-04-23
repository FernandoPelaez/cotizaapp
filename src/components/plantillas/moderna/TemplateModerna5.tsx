type TemplateDataInput = {
  title?: string
  description?: string
  clientName?: string
  clientEmail?: string
  clientPhone?: string
  clientAddress?: string
  clientRFC?: string
  companyName?: string
  companyLogo?: string
  companyEmail?: string
  companyPhone?: string
  companyAddress?: string
  companyWeb?: string
  docNumber?: string
  date?: string
  validUntil?: string
  discount?: number
  tax?: number
  notes?: string
  services?: Array<{
    name?: string
    description?: string
    price?: number
  }>
  products?: Array<{
    name?: string
    quantity?: number
    price?: number
  }>
  total?: number
  subtotal?: number
}

type Props = {
  data?: TemplateDataInput
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

const defaultData: TemplateDataInput = {
  title: "Cotización",
  description: "Documento comercial con una propuesta clara, moderna y profesional.",
  clientName: "Cliente ejemplo",
  clientEmail: "cliente@correo.com",
  clientPhone: "+52 667 123 4567",
  clientAddress: "Los Mochis, Sinaloa",
  clientRFC: "XAXX010101000",
  companyName: "Tu empresa",
  companyLogo: undefined,
  companyEmail: "contacto@tuempresa.com",
  companyPhone: "+52 667 123 4567",
  companyAddress: "Los Mochis, Sinaloa",
  companyWeb: "www.tuempresa.com",
  docNumber: "COT-001",
  date: new Date().toLocaleDateString("es-MX"),
  validUntil: new Date().toISOString().slice(0, 10),
  discount: 0,
  tax: 16,
  notes: "Gracias por considerar nuestra propuesta.",
  services: [
    { name: "Servicio 1", description: "Detalle del servicio", price: 500 },
    { name: "Servicio 2", description: "Detalle del servicio", price: 800 },
  ],
  products: [{ name: "Producto 1", quantity: 2, price: 150 }],
  total: 1856,
  subtotal: 1600,
}

const palette = {
  pageBg: "#f4f9ff",
  pageBgSoft: "#eef6ff",
  surface: "#ffffff",
  surfaceSoft: "#f8fbff",
  sky50: "#eef7ff",
  sky100: "#dceefe",
  sky200: "#bfdffd",
  sky300: "#8cc7fb",
  blue400: "#4ca4f3",
  blue500: "#2387e2",
  blue600: "#176dc0",
  navy700: "#154a82",
  navy800: "#11385f",
  ink: "#18324d",
  inkSoft: "#5f748b",
  muted: "#94a3b8",
  border: "#dbe9f6",
  borderSoft: "#eaf2f9",
  success: "#16a34a",
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value || 0)
}

function buildItems(data: TemplateDataInput): QuoteItem[] {
  const serviceItems: QuoteItem[] = (data.services ?? []).map((service, index) => ({
    id: `service-${index}`,
    type: "service",
    name: service.name || `Servicio ${index + 1}`,
    quantity: 1,
    price: Number(service.price || 0),
    amount: Number(service.price || 0),
    detail: service.description || "Servicio",
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

export default function TemplateModerna4({ data }: Props) {
  const safeData: TemplateDataInput = {
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
      id="template-moderna4"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily:
          "Inter, 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        background: `linear-gradient(180deg, ${palette.pageBg} 0%, ${palette.pageBgSoft} 100%)`,
        position: "relative",
        overflow: "hidden",
        color: palette.ink,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -70,
          right: -55,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(35, 135, 226, 0.09)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 30,
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: "rgba(140, 199, 251, 0.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -55,
          left: -35,
          width: 165,
          height: 165,
          borderRadius: "50%",
          background: "rgba(35, 135, 226, 0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "6px",
          background: `linear-gradient(90deg, ${palette.sky300} 0%, ${palette.blue500} 50%, ${palette.navy700} 100%)`,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "18px",
        }}
      >
        <div
          style={{
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 18px 42px rgba(17, 56, 95, 0.09)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              background: `linear-gradient(135deg, ${palette.sky50} 0%, #ffffff 58%, ${palette.surfaceSoft} 100%)`,
            }}
          >
            <div
              style={{
                padding: "22px 22px 18px",
                borderRight: `1px solid ${palette.borderSoft}`,
              }}
            >
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
                    background: `linear-gradient(90deg, ${palette.blue400}, ${palette.navy700})`,
                  }}
                />
                <span
                  style={{
                    fontSize: "8px",
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: palette.blue600,
                  }}
                >
                  Propuesta comercial
                </span>
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 28,
                  lineHeight: 1.04,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: palette.ink,
                  maxWidth: 300,
                  wordBreak: "break-word",
                }}
              >
                {safeData.title || "Cotización"}
              </h1>

              {safeData.description ? (
                <p
                  style={{
                    margin: "10px 0 0",
                    maxWidth: 300,
                    fontSize: "9.8px",
                    lineHeight: 1.7,
                    color: palette.inkSoft,
                  }}
                >
                  {safeData.description}
                </p>
              ) : null}

              <div
                style={{
                  marginTop: 14,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    background: palette.surfaceSoft,
                    border: `1px solid ${palette.border}`,
                    borderRadius: 16,
                    padding: "12px 13px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "7.8px",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: palette.blue600,
                      marginBottom: 8,
                    }}
                  >
                    Documento
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: 6,
                      fontSize: "9px",
                      color: palette.inkSoft,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span>Folio</span>
                      <strong style={{ color: palette.ink, textAlign: "right" }}>
                        {safeData.docNumber || "COT-001"}
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span>Fecha</span>
                      <strong style={{ color: palette.ink, textAlign: "right" }}>
                        {safeData.date || new Date().toLocaleDateString("es-MX")}
                      </strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span>Vigencia</span>
                      <strong style={{ color: palette.ink, textAlign: "right" }}>
                        {safeData.validUntil || "—"}
                      </strong>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: palette.sky50,
                    border: `1px solid ${palette.sky100}`,
                    borderRadius: 16,
                    padding: "12px 13px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "7.8px",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: palette.navy700,
                      marginBottom: 8,
                    }}
                  >
                    Resumen
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: 6,
                      fontSize: "9px",
                      color: palette.inkSoft,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span>Conceptos</span>
                      <strong style={{ color: palette.ink }}>{items.length}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span>IVA</span>
                      <strong style={{ color: palette.ink }}>{tax}%</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span>Descuento</span>
                      <strong style={{ color: palette.ink }}>
                        {formatMoney(discount)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "22px 22px 18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 12,
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
                      width: 66,
                      height: 66,
                      borderRadius: 18,
                      background: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: 8,
                      border: `1px solid ${palette.border}`,
                      boxShadow: "0 10px 22px rgba(17, 56, 95, 0.09)",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={safeData.companyLogo}
                      alt="Logo de la empresa"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "100%",
                        height: "100%",
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
                      background: `linear-gradient(135deg, ${palette.blue500} 0%, ${palette.navy700} 100%)`,
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 19,
                      fontWeight: 800,
                      boxShadow: "0 10px 22px rgba(23, 109, 192, 0.18)",
                      flexShrink: 0,
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
                      color: palette.ink,
                      lineHeight: 1.18,
                      wordBreak: "break-word",
                    }}
                  >
                    {safeData.companyName || "Tu empresa"}
                  </div>

                  <div
                    style={{
                      marginTop: 5,
                      fontSize: "9px",
                      lineHeight: 1.65,
                      color: palette.inkSoft,
                    }}
                  >
                    {safeData.companyEmail ? <div>{safeData.companyEmail}</div> : null}
                    {safeData.companyPhone ? <div>{safeData.companyPhone}</div> : null}
                    {safeData.companyAddress ? <div>{safeData.companyAddress}</div> : null}
                    {safeData.companyWeb ? <div>{safeData.companyWeb}</div> : null}
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderRadius: 18,
                  padding: "15px 15px 14px",
                  background: `linear-gradient(135deg, ${palette.navy800} 0%, ${palette.navy700} 42%, ${palette.blue500} 100%)`,
                  color: "#fff",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 14px 28px rgba(17, 56, 95, 0.14)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -18,
                    right: -10,
                    width: 78,
                    height: 78,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -20,
                    left: 30,
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                  }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      fontSize: "7.8px",
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.78)",
                      marginBottom: 7,
                    }}
                  >
                    Total final
                  </div>

                  <div
                    style={{
                      fontSize: 23,
                      fontWeight: 800,
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      color: "#ffffff",
                      wordBreak: "break-word",
                    }}
                  >
                    {formatMoney(finalTotal)}
                  </div>

                  <div
                    style={{
                      marginTop: 9,
                      display: "inline-block",
                      background: "rgba(255,255,255,0.12)",
                      borderRadius: 999,
                      padding: "4px 10px",
                      fontSize: "7.4px",
                      color: "rgba(255,255,255,0.82)",
                    }}
                  >
                    {tax > 0 ? `Incluye IVA ${tax}%` : "Monto final"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "14px 18px 16px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  border: `1px solid ${palette.border}`,
                  borderRadius: 16,
                  padding: "13px 14px",
                }}
              >
                <div
                  style={{
                    fontSize: "8px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: palette.blue600,
                    marginBottom: 8,
                  }}
                >
                  Cliente
                </div>

                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: palette.ink,
                    marginBottom: 6,
                    lineHeight: 1.2,
                    wordBreak: "break-word",
                  }}
                >
                  {safeData.clientName || "Cliente"}
                </div>

                <div
                  style={{
                    fontSize: "9.2px",
                    lineHeight: 1.7,
                    color: palette.inkSoft,
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
                  background: palette.sky50,
                  border: `1px solid ${palette.sky100}`,
                  borderRadius: 16,
                  padding: "13px 14px",
                }}
              >
                <div
                  style={{
                    fontSize: "8px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: palette.navy700,
                    marginBottom: 8,
                  }}
                >
                  Mensaje
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "9px",
                    lineHeight: 1.7,
                    color: palette.ink,
                  }}
                >
                  Estimado(a) <strong>{safeData.clientName || "Cliente"}</strong>, aquí se
                  presenta el detalle de esta cotización en un formato claro,
                  profesional y listo para compartir.
                </p>
              </div>
            </div>

            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${palette.border}`,
                background: "#ffffff",
                boxShadow: "0 1px 4px rgba(17, 56, 95, 0.03)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.1fr 0.8fr 0.55fr 1fr 1fr",
                  gap: 8,
                  padding: "10px 13px",
                  background: `linear-gradient(135deg, ${palette.navy800} 0%, ${palette.navy700} 58%, ${palette.blue500} 100%)`,
                  color: "rgba(255,255,255,0.88)",
                  fontSize: "8px",
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
                      gridTemplateColumns: "2.1fr 0.8fr 0.55fr 1fr 1fr",
                      gap: 8,
                      padding: "10px 13px",
                      borderTop: index === 0 ? "none" : `1px solid ${palette.borderSoft}`,
                      background: index % 2 === 0 ? "#ffffff" : palette.sky50,
                      fontSize: "9.5px",
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
                            color: palette.muted,
                            fontSize: "8px",
                            marginTop: 3,
                            wordBreak: "break-word",
                          }}
                        >
                          {item.detail}
                        </div>
                      ) : null}
                    </div>

                    <div
                      style={{
                        color: palette.inkSoft,
                        fontSize: "8.6px",
                      }}
                    >
                      {item.type === "service" ? "Servicio" : "Producto"}
                    </div>

                    <div style={{ textAlign: "center", color: palette.inkSoft }}>
                      {item.quantity}
                    </div>

                    <div style={{ textAlign: "right", color: palette.inkSoft }}>
                      {formatMoney(item.price)}
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        color: palette.blue600,
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
                    padding: "22px 14px",
                    textAlign: "center",
                    color: palette.muted,
                    fontSize: "9.5px",
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
                gap: 12,
                marginTop: 14,
                alignItems: "start",
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  border: `1px solid ${palette.border}`,
                  borderRadius: 16,
                  padding: "13px 14px",
                }}
              >
                <div
                  style={{
                    fontSize: "8px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: palette.blue600,
                    marginBottom: 8,
                  }}
                >
                  Notas
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "9.2px",
                    lineHeight: 1.7,
                    color: palette.inkSoft,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {safeData.notes || "Sin observaciones adicionales."}
                </p>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  border: `1px solid ${palette.border}`,
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 10px 22px rgba(17, 56, 95, 0.05)",
                }}
              >
                <div style={{ padding: "12px 13px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 7,
                      fontSize: "9.5px",
                      color: palette.inkSoft,
                    }}
                  >
                    <span>Subtotal</span>
                    <span style={{ color: palette.ink, fontWeight: 700 }}>
                      {formatMoney(subtotal)}
                    </span>
                  </div>

                  {tax > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 7,
                        fontSize: "9.5px",
                        color: palette.inkSoft,
                      }}
                    >
                      <span>IVA ({tax}%)</span>
                      <span style={{ color: palette.ink, fontWeight: 700 }}>
                        {formatMoney(taxAmount)}
                      </span>
                    </div>
                  )}

                  {discount > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "9.5px",
                        color: palette.inkSoft,
                      }}
                    >
                      <span>Descuento</span>
                      <span style={{ color: palette.success, fontWeight: 700 }}>
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
                    padding: "11px 13px",
                    background: `linear-gradient(135deg, ${palette.blue500} 0%, ${palette.navy700} 100%)`,
                  }}
                >
                  <span
                    style={{
                      color: "rgba(255,255,255,0.86)",
                      fontSize: "8px",
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
                marginTop: 15,
                paddingTop: 12,
                borderTop: `1px solid ${palette.borderSoft}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <p
                style={{
                  color: palette.muted,
                  fontSize: "7.8px",
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
                    background: palette.blue500,
                  }}
                />
                <p
                  style={{
                    color: palette.navy700,
                    fontSize: "8px",
                    margin: 0,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  {safeData.companyName || "Tu empresa"}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid ${palette.border}`,
              background: `linear-gradient(135deg, ${palette.navy800} 0%, ${palette.navy700} 58%, ${palette.blue500} 100%)`,
              padding: "11px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {safeData.companyPhone ? (
                <span
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "8px",
                    wordBreak: "break-word",
                  }}
                >
                  {safeData.companyPhone}
                </span>
              ) : null}

              {safeData.companyEmail ? (
                <span
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "8px",
                    wordBreak: "break-word",
                  }}
                >
                  {safeData.companyEmail}
                </span>
              ) : null}

              {safeData.companyWeb ? (
                <span
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "8px",
                    wordBreak: "break-word",
                  }}
                >
                  {safeData.companyWeb}
                </span>
              ) : null}
            </div>

            <p
              style={{
                color: "rgba(255,255,255,0.58)",
                fontSize: "7.5px",
                margin: 0,
                letterSpacing: "0.04em",
                textAlign: "right",
              }}
            >
              Documento válido por 30 días ·{" "}
              {safeData.date || new Date().toLocaleDateString("es-MX")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
