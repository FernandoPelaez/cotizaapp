type ServiceItem = {
  name?: string
  description?: string
  price?: number
}

type ProductItem = {
  name?: string
  quantity?: number
  price?: number
}

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
  logoUrl?: string
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
  services?: ServiceItem[]
  products?: ProductItem[]
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
  unit: string
  price: number
  amount: number
  detail?: string
}

const defaultData: TemplateDataInput = {
  title: "Cotización",
  description: "Documento comercial con una propuesta clara, elegante y profesional.",
  clientName: "Cliente ejemplo",
  clientEmail: "cliente@correo.com",
  clientPhone: "+52 667 123 4567",
  clientAddress: "Los Mochis, Sinaloa",
  clientRFC: "XAXX010101000",
  companyName: "Tu empresa",
  companyLogo: undefined,
  logoUrl: undefined,
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
  pageBg: "#f4f8fc",
  pageBgSoft: "#edf4fb",
  surface: "#ffffff",
  surfaceSoft: "#f8fbfe",
  blue50: "#eef5fb",
  blue100: "#dce9f7",
  blue200: "#bfd6ee",
  blue300: "#98bddf",
  blue400: "#6b9dcc",
  blue500: "#3f7fb7",
  blue600: "#2f6799",
  navy700: "#21496f",
  navy800: "#183650",
  ink: "#1e2f3f",
  inkSoft: "#5c7185",
  muted: "#94a4b5",
  border: "#dce7f1",
  borderSoft: "#ebf1f6",
  success: "#1f8a5b",
}

function formatCurrency(value: number) {
  return `$${Number(value || 0).toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function buildItems(data: TemplateDataInput): QuoteItem[] {
  const serviceItems: QuoteItem[] = (data.services ?? []).map((service, index) => ({
    id: `service-${index}`,
    type: "service",
    name: service.name || `Servicio ${index + 1}`,
    quantity: 1,
    unit: "serv.",
    price: Number(service.price || 0),
    amount: Number(service.price || 0),
    detail: service.description || "Servicio",
  }))

  const productItems: QuoteItem[] = (data.products ?? []).map((product, index) => ({
    id: `product-${index}`,
    type: "product",
    name: product.name || `Producto ${index + 1}`,
    quantity: Number(product.quantity || 0),
    unit: "pza",
    price: Number(product.price || 0),
    amount: Number(product.quantity || 0) * Number(product.price || 0),
    detail: "Producto",
  }))

  return [...serviceItems, ...productItems]
}

export default function TemplateModernaW({ data }: Props) {
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

  const hasItems = items.length > 0
  const showTax = tax > 0
  const showDiscount = discount > 0
  const resolvedLogo = safeData.companyLogo || safeData.logoUrl
  const initials = String(safeData.companyName || "TE")
    .trim()
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      id="template-moderna-w"
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
          top: -80,
          right: -45,
          width: 190,
          height: 190,
          borderRadius: "50%",
          background: "rgba(63, 127, 183, 0.09)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 85,
          left: -35,
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: "rgba(152, 189, 223, 0.13)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -50,
          right: -30,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "rgba(47, 103, 153, 0.08)",
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
            minHeight: "806px",
            display: "flex",
            flexDirection: "column",
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: "26px",
            overflow: "hidden",
            boxShadow: "0 18px 46px rgba(24, 54, 80, 0.10)",
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${palette.navy800} 0%, ${palette.navy700} 46%, ${palette.blue500} 100%)`,
              padding: "22px 22px 18px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -24,
                right: -12,
                width: 110,
                height: 110,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -24,
                left: 94,
                width: 84,
                height: 84,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "grid",
                gridTemplateColumns: "1.12fr 0.88fr",
                gap: 18,
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
                      background: `linear-gradient(90deg, ${palette.blue200} 0%, #ffffff 100%)`,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "8px",
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.82)",
                    }}
                  >
                    Propuesta corporativa
                  </span>
                </div>

                <h1
                  style={{
                    margin: 0,
                    color: "#ffffff",
                    fontSize: 30,
                    lineHeight: 1.02,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    maxWidth: 310,
                    wordBreak: "break-word",
                  }}
                >
                  {safeData.title || "Cotización"}
                </h1>

                {safeData.description ? (
                  <p
                    style={{
                      margin: "10px 0 0",
                      color: "rgba(255,255,255,0.78)",
                      fontSize: "9.8px",
                      lineHeight: 1.72,
                      maxWidth: 300,
                    }}
                  >
                    {safeData.description}
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
                {resolvedLogo ? (
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 18,
                      background: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      padding: 8,
                      boxShadow: "0 10px 24px rgba(0,0,0,0.14)",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={resolvedLogo}
                      alt="Logo de la empresa"
                      style={{
                        width: "100%",
                        height: "100%",
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
                      width: 68,
                      height: 68,
                      borderRadius: 18,
                      background: `linear-gradient(135deg, ${palette.blue400} 0%, ${palette.blue600} 100%)`,
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      fontWeight: 800,
                      boxShadow: "0 10px 24px rgba(0,0,0,0.14)",
                      flexShrink: 0,
                    }}
                  >
                    {initials}
                  </div>
                )}

                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: 17,
                      fontWeight: 800,
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
                      color: "rgba(255,255,255,0.72)",
                    }}
                  >
                    <div>{safeData.docNumber || "COT-001"}</div>
                    <div>{safeData.date || new Date().toLocaleDateString("es-MX")}</div>
                    {safeData.validUntil ? <div>Vigencia: {safeData.validUntil}</div> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "14px 16px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              flex: 1,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.08fr 0.92fr",
                gap: 12,
              }}
            >
              <div
                style={{
                  background: palette.surfaceSoft,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 16,
                  padding: "13px 14px",
                }}
              >
                <div
                  style={{
                    fontSize: "8px",
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
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
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    background: palette.blue50,
                    border: `1px solid ${palette.blue100}`,
                    borderRadius: 16,
                    padding: "13px 12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "7.8px",
                      fontWeight: 800,
                      letterSpacing: "0.14em",
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
                      <strong style={{ color: palette.ink }}>{formatCurrency(discount)}</strong>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    border: `1px solid ${palette.border}`,
                    borderRadius: 16,
                    padding: "13px 12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "7.8px",
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: palette.blue600,
                      marginBottom: 8,
                    }}
                  >
                    Contacto
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: 6,
                      fontSize: "8.8px",
                      color: palette.inkSoft,
                    }}
                  >
                    {safeData.companyPhone ? <div>{safeData.companyPhone}</div> : null}
                    {safeData.companyEmail ? <div>{safeData.companyEmail}</div> : null}
                    {safeData.companyWeb ? <div>{safeData.companyWeb}</div> : null}
                    {safeData.companyAddress ? <div>{safeData.companyAddress}</div> : null}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 174px",
                gap: 12,
                alignItems: "stretch",
              }}
            >
              <div
                style={{
                  background: palette.blue50,
                  border: `1px solid ${palette.blue100}`,
                  borderRadius: 16,
                  padding: "11px 13px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: palette.ink,
                    fontSize: "9px",
                    lineHeight: 1.7,
                  }}
                >
                  Esta versión se rediseñó con una línea azul y blanca más limpia,
                  moderna y elegante, para que la plantilla se vea más fresca,
                  profesional y mejor equilibrada visualmente.
                </p>
              </div>

              <div
                style={{
                  borderRadius: 16,
                  padding: "14px 12px",
                  background: `linear-gradient(135deg, ${palette.blue500} 0%, ${palette.navy700} 100%)`,
                  color: "#ffffff",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 12px 24px rgba(24, 54, 80, 0.14)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: -18,
                    right: -18,
                    width: 84,
                    height: 84,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.09)",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: "7.6px",
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
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
                      letterSpacing: "-0.03em",
                      wordBreak: "break-word",
                    }}
                  >
                    {formatCurrency(finalTotal)}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      display: "inline-block",
                      background: "rgba(255,255,255,0.12)",
                      borderRadius: 999,
                      padding: "4px 10px",
                      fontSize: "7.3px",
                      color: "rgba(255,255,255,0.82)",
                    }}
                  >
                    {showTax ? `Incluye IVA ${tax}%` : "Monto final"}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${palette.border}`,
                background: "#ffffff",
                boxShadow: "0 1px 4px rgba(24, 54, 80, 0.03)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 0.65fr 0.7fr 1fr 1fr",
                  gap: 8,
                  padding: "10px 13px",
                  background: `linear-gradient(135deg, ${palette.navy800} 0%, ${palette.navy700} 55%, ${palette.blue500} 100%)`,
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "8px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                }}
              >
                <div>Concepto</div>
                <div style={{ textAlign: "center" }}>Cant.</div>
                <div style={{ textAlign: "center" }}>Unidad</div>
                <div style={{ textAlign: "right" }}>Precio</div>
                <div style={{ textAlign: "right" }}>Importe</div>
              </div>

              {hasItems ? (
                items.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 0.65fr 0.7fr 1fr 1fr",
                      gap: 8,
                      padding: "10px 13px",
                      borderTop: index === 0 ? "none" : `1px solid ${palette.borderSoft}`,
                      background: index % 2 === 0 ? "#ffffff" : palette.blue50,
                      fontSize: "9.4px",
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

                    <div style={{ textAlign: "center", color: palette.inkSoft }}>
                      {item.quantity}
                    </div>

                    <div style={{ textAlign: "center", color: palette.inkSoft }}>
                      {item.unit}
                    </div>

                    <div style={{ textAlign: "right", color: palette.inkSoft }}>
                      {formatCurrency(item.price)}
                    </div>

                    <div
                      style={{
                        textAlign: "right",
                        color: palette.blue600,
                        fontWeight: 800,
                      }}
                    >
                      {formatCurrency(item.amount)}
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
                  No hay conceptos registrados en este documento.
                </div>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 210px",
                gap: 12,
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
                  Notas y condiciones
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
                  boxShadow: "0 10px 22px rgba(24, 54, 80, 0.05)",
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
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  {showTax && (
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
                        {formatCurrency(taxAmount)}
                      </span>
                    </div>
                  )}

                  {showDiscount && (
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
                        − {formatCurrency(discount)}
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
                    {formatCurrency(finalTotal)}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "auto",
                paddingTop: 12,
                borderTop: `1px solid ${palette.borderSoft}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ width: "180px", flexShrink: 0 }}>
                <div
                  style={{
                    height: "40px",
                    borderBottom: `1px solid ${palette.border}`,
                    marginBottom: 6,
                  }}
                />
                <p
                  style={{
                    color: palette.inkSoft,
                    fontSize: "8px",
                    fontWeight: 600,
                    margin: "0 0 1px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Firma autorizada
                </p>
                <p
                  style={{
                    color: palette.ink,
                    fontSize: "9px",
                    fontWeight: 700,
                    margin: 0,
                    wordBreak: "break-word",
                  }}
                >
                  {safeData.companyName || "Tu empresa"}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: palette.blue50,
                  border: `1px solid ${palette.blue100}`,
                  borderRadius: 12,
                  padding: "10px 14px",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    overflow: "hidden",
                    border: `1px solid ${palette.border}`,
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {resolvedLogo ? (
                    <img
                      src={resolvedLogo}
                      alt="Logo secundario"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  ) : (
                    <div
                      style={{
                        color: palette.blue600,
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      {initials}
                    </div>
                  )}
                </div>

                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      color: palette.ink,
                      fontSize: "9px",
                      fontWeight: 800,
                      margin: "0 0 1px",
                      lineHeight: 1.2,
                      wordBreak: "break-word",
                    }}
                  >
                    {safeData.companyName || "Tu empresa"}
                  </p>
                  {safeData.companyWeb ? (
                    <p
                      style={{
                        color: palette.blue600,
                        fontSize: "7.5px",
                        margin: 0,
                        fontWeight: 600,
                        wordBreak: "break-word",
                      }}
                    >
                      {safeData.companyWeb}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid ${palette.border}`,
              background: `linear-gradient(135deg, ${palette.navy800} 0%, ${palette.navy700} 55%, ${palette.blue500} 100%)`,
              padding: "11px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 14,
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
              Válido por 30 días · {safeData.date || new Date().toLocaleDateString("es-MX")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
