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
  description: "Documento comercial profesional listo para compartir con tu cliente.",
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

export default function TemplateModerna({ data }: Props) {
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
      id="template-moderna"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "#f6f8fb",
        color: "#102033",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "170px",
          height: "100%",
          background: "linear-gradient(180deg, #0f1f35 0%, #102846 55%, #0b1b2e 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "-20px",
          left: "-20px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: "1px solid rgba(232, 201, 122, 0.18)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "18px",
          left: "18px",
          width: "84px",
          height: "84px",
          borderRadius: "50%",
          border: "1px solid rgba(232, 201, 122, 0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          right: "-40px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          border: "1px solid rgba(201, 169, 110, 0.12)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "170px",
          height: "100%",
          padding: "28px 18px 24px 22px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          zIndex: 2,
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          {safeData.companyLogo ? (
            <div
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "14px",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: "6px",
                boxShadow: "0 8px 22px rgba(0,0,0,0.22)",
                marginBottom: "10px",
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
                width: "54px",
                height: "54px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #c9a96e 0%, #e8c97a 100%)",
                color: "#0f1f35",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 800,
                boxShadow: "0 8px 22px rgba(0,0,0,0.22)",
                marginBottom: "10px",
              }}
            >
              {initials}
            </div>
          )}

          <p
            style={{
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 700,
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            {safeData.companyName || "Tu Empresa"}
          </p>

          <p
            style={{
              color: "#c9a96e",
              fontSize: "9px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              margin: "4px 0 0",
            }}
          >
            Pro · Modern
          </p>
        </div>

        <div
          style={{
            width: "34px",
            height: "2px",
            background: "linear-gradient(90deg, #c9a96e, transparent)",
            marginBottom: "18px",
          }}
        />

        <div style={{ marginBottom: "18px" }}>
          <p
            style={{
              color: "#c9a96e",
              fontSize: "8px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "0 0 8px",
              fontWeight: 700,
            }}
          >
            Cliente
          </p>

          <p
            style={{
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: 700,
              margin: "0 0 6px",
              lineHeight: 1.35,
            }}
          >
            {safeData.clientName || "Cliente ejemplo"}
          </p>

          <div
            style={{
              color: "#9fb0c2",
              fontSize: "9px",
              lineHeight: 1.55,
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
            width: "34px",
            height: "1px",
            background: "rgba(201,169,110,0.28)",
            marginBottom: "18px",
          }}
        />

        <div style={{ marginBottom: "18px" }}>
          <p
            style={{
              color: "#c9a96e",
              fontSize: "8px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "0 0 8px",
              fontWeight: 700,
            }}
          >
            Documento
          </p>

          <div
            style={{
              color: "#ffffff",
              fontSize: "9px",
              lineHeight: 1.65,
            }}
          >
            <div style={{ fontWeight: 700 }}>{safeData.docNumber || "COT-001"}</div>
            <div style={{ color: "#91a2b6" }}>
              {safeData.date || new Date().toLocaleDateString("es-MX")}
            </div>
            {safeData.validUntil && (
              <div style={{ color: "#91a2b6" }}>Vigencia: {safeData.validUntil}</div>
            )}
          </div>
        </div>

        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(201,169,110,0.18), rgba(201,169,110,0.06))",
              border: "1px solid rgba(201,169,110,0.28)",
              borderRadius: "12px",
              padding: "12px 10px",
            }}
          >
            <p
              style={{
                color: "#8ea0b4",
                fontSize: "8px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                margin: "0 0 6px",
              }}
            >
              Total a pagar
            </p>

            <p
              style={{
                color: "#e8c97a",
                fontSize: "19px",
                fontWeight: 800,
                margin: 0,
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              {formatMoney(finalTotal)}
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          marginLeft: "170px",
          minHeight: "842px",
          padding: "28px 28px 26px 26px",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "18px" }}>
          <p
            style={{
              color: "#102033",
              fontSize: "30px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              margin: "0 0 4px",
              lineHeight: 1.05,
            }}
          >
            {safeData.title || "Cotización"}
          </p>

          <div
            style={{
              width: "54px",
              height: "3px",
              background: "linear-gradient(90deg, #c9a96e, #e8c97a)",
              borderRadius: "999px",
              marginTop: "10px",
            }}
          />

          {safeData.description ? (
            <p
              style={{
                color: "#6d7f92",
                fontSize: "10px",
                lineHeight: 1.7,
                margin: "12px 0 0",
                maxWidth: "300px",
              }}
            >
              {safeData.description}
            </p>
          ) : (
            <p
              style={{
                color: "#8fa0b2",
                fontSize: "10px",
                lineHeight: 1.7,
                margin: "12px 0 0",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Propuesta de servicios profesional
            </p>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
            marginBottom: "18px",
          }}
        >
          {[
            {
              label: "Conceptos",
              value: String(items.length),
            },
            {
              label: "Descuento",
              value: formatMoney(discount),
            },
            {
              label: "IVA",
              value: `${tax}%`,
            },
          ].map((card, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                border: "1px solid #e6ebf1",
                borderRadius: "12px",
                padding: "12px 12px",
                boxShadow: "0 1px 4px rgba(15,31,53,0.04)",
              }}
            >
              <div
                style={{
                  color: "#8a9aab",
                  fontSize: "8px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  marginBottom: "6px",
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  color: "#102033",
                  fontSize: "16px",
                  fontWeight: 800,
                  lineHeight: 1.1,
                }}
              >
                {card.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e6ebf1",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(15,31,53,0.04)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.2fr 0.7fr 1fr 1fr 0.9fr",
              gap: "8px",
              padding: "11px 14px",
              background: "linear-gradient(135deg, #102033 0%, #1c2b3a 100%)",
              color: "#d9bf88",
              fontSize: "8.5px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
            }}
          >
            <div>Descripción</div>
            <div>Tipo</div>
            <div style={{ textAlign: "center" }}>Cant.</div>
            <div style={{ textAlign: "right" }}>Precio</div>
            <div style={{ textAlign: "right" }}>Total</div>
          </div>

          {items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.2fr 0.7fr 1fr 1fr 0.9fr",
                  gap: "8px",
                  padding: "11px 14px",
                  borderTop: index === 0 ? "none" : "1px solid #eef2f6",
                  background: index % 2 === 0 ? "#ffffff" : "#fafbfd",
                  fontSize: "10px",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#213246",
                      fontWeight: 700,
                      lineHeight: 1.35,
                    }}
                  >
                    {item.name}
                  </div>
                  {item.detail ? (
                    <div
                      style={{
                        color: "#9aa8b8",
                        fontSize: "8.5px",
                        marginTop: "3px",
                      }}
                    >
                      {item.detail}
                    </div>
                  ) : null}
                </div>

                <div
                  style={{
                    color: "#7a8a99",
                    fontSize: "9px",
                  }}
                >
                  {item.type === "service" ? "Servicio" : "Producto"}
                </div>

                <div
                  style={{
                    textAlign: "center",
                    color: "#6f8091",
                  }}
                >
                  {item.quantity}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    color: "#6f8091",
                  }}
                >
                  {formatMoney(item.price)}
                </div>

                <div
                  style={{
                    textAlign: "right",
                    color: "#102033",
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
                color: "#97a6b4",
                fontSize: "10px",
              }}
            >
              No hay conceptos agregados en esta cotización.
            </div>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 210px",
            gap: "14px",
            marginTop: "18px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e6ebf1",
              borderRadius: "14px",
              padding: "14px 14px",
              boxShadow: "0 1px 4px rgba(15,31,53,0.04)",
            }}
          >
            <div
              style={{
                color: "#c9a96e",
                fontSize: "8px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Notas
            </div>

            <p
              style={{
                color: "#6f8091",
                fontSize: "9.5px",
                lineHeight: 1.65,
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {safeData.notes || "Sin observaciones adicionales."}
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e6ebf1",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(15,31,53,0.04)",
            }}
          >
            <div style={{ padding: "13px 14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "7px",
                  fontSize: "10px",
                  color: "#6f8091",
                }}
              >
                <span>Subtotal</span>
                <span style={{ color: "#213246", fontWeight: 600 }}>
                  {formatMoney(subtotal)}
                </span>
              </div>

              {tax > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "7px",
                    fontSize: "10px",
                    color: "#6f8091",
                  }}
                >
                  <span>IVA ({tax}%)</span>
                  <span style={{ color: "#213246", fontWeight: 600 }}>
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
                    color: "#6f8091",
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
                background: "linear-gradient(135deg, #102033 0%, #1c2b3a 100%)",
              }}
            >
              <span
                style={{
                  color: "#d9bf88",
                  fontSize: "8px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Total
              </span>
              <span
                style={{
                  color: "#e8c97a",
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
            paddingTop: "16px",
            borderTop: "1px solid #e6ebf1",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: "#a0acb7",
              fontSize: "8px",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            {safeData.validUntil
              ? `Este documento es válido hasta ${safeData.validUntil}.`
              : "Documento comercial listo para compartir."}
          </p>

          <p
            style={{
              color: "#c9a96e",
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
  )
}
