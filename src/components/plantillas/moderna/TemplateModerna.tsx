type Service = {
  name: string
  description?: string
  price: number
}

type Product = {
  name: string
  quantity: number
  price: number
}

type TemplateData = {
  title: string
  clientName: string
  clientEmail?: string
  clientPhone?: string
  clientAddress?: string
  companyName?: string
  companyEmail?: string
  companyPhone?: string
  companyAddress?: string
  companyWeb?: string
  docNumber?: string
  date?: string
  discount?: number
  tax?: number
  notes?: string
  services: Service[]
  products: Product[]
  total: number
  subtotal?: number
}

type Props = {
  data?: TemplateData
}

const defaultData: TemplateData = {
  title: "Cotización",
  clientName: "Cliente ejemplo",
  clientEmail: undefined,
  clientPhone: undefined,
  clientAddress: undefined,
  companyName: "Tu Empresa",
  companyEmail: undefined,
  companyPhone: undefined,
  companyAddress: undefined,
  companyWeb: undefined,
  docNumber: "COT-001",
  date: undefined,
  discount: 0,
  tax: 0,
  notes: undefined,
  services: [
    { name: "Servicio 1", price: 500 },
    { name: "Servicio 2", price: 800 },
  ],
  products: [],
  total: 1300,
  subtotal: 1300,
}

export default function TemplateModerna({ data }: Props) {
  const safeData: TemplateData = {
    ...defaultData,
    ...data,
    services: data?.services ?? defaultData.services,
    products: data?.products ?? defaultData.products,
  }

  const today =
    safeData.date ??
    new Date().toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })

  const subtotal = safeData.subtotal ?? safeData.total
  const tax = safeData.tax ?? 0
  const discount = safeData.discount ?? 0
  const taxableBase = Math.max(0, subtotal - discount)
  const taxAmount = taxableBase * (tax / 100)

  const allItems = [
    ...safeData.services.map((s) => ({
      name: s.name,
      description: s.description,
      qty: 1,
      price: s.price,
      total: s.price,
    })),
    ...safeData.products.map((p) => ({
      name: p.name,
      description: undefined,
      qty: p.quantity,
      price: p.price,
      total: p.price * p.quantity,
    })),
  ]

  return (
    <div
      id="template-moderna"
      style={{
        width: "595px",
        minHeight: "842px",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        backgroundColor: "#FAFAF8",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "168px",
          height: "100%",
          background:
            "linear-gradient(180deg, #1C2B3A 0%, #0F1E2B 60%, #162333 100%)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "72px",
          left: "168px",
          width: "3px",
          height: "calc(100% - 144px)",
          background:
            "linear-gradient(180deg, #C9A96E 0%, #E8C97A 40%, #C9A96E 100%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "-40px",
          left: "-40px",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          border: "2px solid rgba(201,169,110,0.25)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-20px",
          left: "-20px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          border: "1px solid rgba(201,169,110,0.15)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          right: "-50px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          border: "2px solid rgba(201,169,110,0.15)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "168px",
          height: "100%",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          padding: "40px 20px 40px 24px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ marginBottom: "36px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #C9A96E 0%, #E8C97A 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1C2B3A"
              strokeWidth="2"
            >
              <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>
          <p
            style={{
              color: "#FFFFFF",
              fontSize: "13px",
              fontWeight: "700",
              lineHeight: "1.3",
              letterSpacing: "0.02em",
              margin: 0,
            }}
          >
            {safeData.companyName || "Tu Empresa"}
          </p>
          <p
            style={{
              color: "#C9A96E",
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: "3px 0 0",
            }}
          >
            Glamour & Style
          </p>
        </div>

        <div
          style={{
            width: "32px",
            height: "1.5px",
            background: "linear-gradient(90deg, #C9A96E, transparent)",
            marginBottom: "24px",
          }}
        />

        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              color: "#C9A96E",
              fontSize: "8px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            Contacto
          </p>
          {safeData.companyPhone && (
            <p
              style={{
                color: "#CBD5E0",
                fontSize: "10px",
                margin: "0 0 4px",
                lineHeight: "1.4",
              }}
            >
              {safeData.companyPhone}
            </p>
          )}
          {safeData.companyEmail && (
            <p
              style={{
                color: "#CBD5E0",
                fontSize: "9px",
                margin: "0 0 4px",
                lineHeight: "1.4",
                wordBreak: "break-all",
              }}
            >
              {safeData.companyEmail}
            </p>
          )}
          {safeData.companyWeb && (
            <p
              style={{
                color: "#C9A96E",
                fontSize: "9px",
                margin: "0",
                lineHeight: "1.4",
              }}
            >
              {safeData.companyWeb}
            </p>
          )}
          {safeData.companyAddress && (
            <p
              style={{
                color: "#8899AA",
                fontSize: "9px",
                margin: "6px 0 0",
                lineHeight: "1.5",
              }}
            >
              {safeData.companyAddress}
            </p>
          )}
        </div>

        <div
          style={{
            width: "32px",
            height: "1px",
            background: "rgba(201,169,110,0.3)",
            marginBottom: "24px",
          }}
        />

        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              color: "#C9A96E",
              fontSize: "8px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            Cliente
          </p>
          <p
            style={{
              color: "#FFFFFF",
              fontSize: "11px",
              fontWeight: "700",
              margin: "0 0 5px",
              lineHeight: "1.3",
            }}
          >
            {safeData.clientName}
          </p>
          {safeData.clientEmail && (
            <p
              style={{
                color: "#8899AA",
                fontSize: "9px",
                margin: "0 0 3px",
                wordBreak: "break-all",
                lineHeight: "1.4",
              }}
            >
              {safeData.clientEmail}
            </p>
          )}
          {safeData.clientPhone && (
            <p
              style={{
                color: "#8899AA",
                fontSize: "9px",
                margin: "0 0 3px",
                lineHeight: "1.4",
              }}
            >
              {safeData.clientPhone}
            </p>
          )}
          {safeData.clientAddress && (
            <p
              style={{
                color: "#8899AA",
                fontSize: "9px",
                margin: "0",
                lineHeight: "1.5",
              }}
            >
              {safeData.clientAddress}
            </p>
          )}
        </div>

        <div
          style={{
            width: "32px",
            height: "1px",
            background: "rgba(201,169,110,0.3)",
            marginBottom: "24px",
          }}
        />

        <div>
          <p
            style={{
              color: "#C9A96E",
              fontSize: "8px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            Documento
          </p>
          {safeData.docNumber && (
            <p
              style={{
                color: "#FFFFFF",
                fontSize: "10px",
                fontWeight: "700",
                margin: "0 0 4px",
              }}
            >
              {safeData.docNumber}
            </p>
          )}
          <p
            style={{
              color: "#8899AA",
              fontSize: "9px",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            {today}
          </p>
        </div>

        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(201,169,110,0.15), rgba(201,169,110,0.05))",
              border: "1px solid rgba(201,169,110,0.3)",
              borderRadius: "10px",
              padding: "14px 12px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#8899AA",
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
                color: "#E8C97A",
                fontSize: "20px",
                fontWeight: "700",
                margin: 0,
                lineHeight: "1",
                letterSpacing: "-0.01em",
              }}
            >
              ${(safeData.total || 0).toLocaleString("es-MX", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          marginLeft: "171px",
          padding: "40px 32px 40px 28px",
          position: "relative",
          zIndex: 2,
          minHeight: "842px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              color: "#1C2B3A",
              fontSize: "26px",
              fontWeight: "700",
              letterSpacing: "-0.02em",
              margin: "0 0 2px",
              lineHeight: "1",
            }}
          >
            {safeData.title || "Cotización"}
          </p>
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "linear-gradient(90deg, #C9A96E, #E8C97A)",
              borderRadius: "2px",
              marginTop: "8px",
            }}
          />
          <p
            style={{
              color: "#8899AA",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: "10px 0 0",
            }}
          >
            Servicios profesionales de belleza
          </p>
        </div>

        <div
          style={{
            background: "#F0F4F8",
            borderLeft: "3px solid #C9A96E",
            borderRadius: "0 6px 6px 0",
            padding: "10px 14px",
            marginBottom: "24px",
          }}
        >
          <p
            style={{
              color: "#4A5568",
              fontSize: "10px",
              lineHeight: "1.6",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            Estimada{" "}
            <strong style={{ color: "#1C2B3A", fontStyle: "normal" }}>
              {safeData.clientName}
            </strong>
            , gracias por elegirnos. A continuación encontrará el detalle de los
            servicios y productos cotizados con todo nuestro cuidado y
            profesionalismo.
          </p>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "10.5px",
          }}
        >
          <thead>
            <tr
              style={{
                background:
                  "linear-gradient(135deg, #1C2B3A 0%, #243447 100%)",
              }}
            >
              <th
                style={{
                  textAlign: "left",
                  color: "#C9A96E",
                  fontSize: "8.5px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "10px 12px",
                  fontWeight: "600",
                }}
              >
                Descripción
              </th>
              <th
                style={{
                  textAlign: "center",
                  color: "#C9A96E",
                  fontSize: "8.5px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "10px 8px",
                  fontWeight: "600",
                }}
              >
                Cant.
              </th>
              <th
                style={{
                  textAlign: "right",
                  color: "#C9A96E",
                  fontSize: "8.5px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "10px 8px",
                  fontWeight: "600",
                }}
              >
                Precio
              </th>
              <th
                style={{
                  textAlign: "right",
                  color: "#C9A96E",
                  fontSize: "8.5px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "10px 12px",
                  fontWeight: "600",
                }}
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F7F9FB",
                  borderBottom: "1px solid #E8EDF2",
                }}
              >
                <td
                  style={{
                    padding: "10px 12px",
                    color: "#2D3748",
                    fontWeight: "600",
                  }}
                >
                  {item.name || "-"}
                  {item.description && (
                    <span
                      style={{
                        display: "block",
                        fontSize: "8.5px",
                        color: "#A0AEC0",
                        fontWeight: "400",
                        marginTop: "2px",
                      }}
                    >
                      {item.description}
                    </span>
                  )}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    textAlign: "center",
                    color: "#718096",
                  }}
                >
                  {item.qty}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    textAlign: "right",
                    color: "#718096",
                  }}
                >
                  ${(item.price || 0).toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    textAlign: "right",
                    color: "#1C2B3A",
                    fontWeight: "700",
                  }}
                >
                  ${(item.total || 0).toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          <div style={{ width: "200px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
                borderBottom: "1px solid #E8EDF2",
              }}
            >
              <span style={{ color: "#718096", fontSize: "10px" }}>Subtotal</span>
              <span style={{ color: "#4A5568", fontSize: "10px" }}>
                ${subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
              </span>
            </div>

            {tax > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0",
                  borderBottom: "1px solid #E8EDF2",
                }}
              >
                <span style={{ color: "#718096", fontSize: "10px" }}>
                  IVA ({tax}%)
                </span>
                <span style={{ color: "#4A5568", fontSize: "10px" }}>
                  ${taxAmount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}

            {discount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 0",
                  borderBottom: "1px solid #E8EDF2",
                }}
              >
                <span style={{ color: "#38A169", fontSize: "10px" }}>
                  Descuento
                </span>
                <span style={{ color: "#38A169", fontSize: "10px" }}>
                  − ${discount.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 12px",
                marginTop: "8px",
                background:
                  "linear-gradient(135deg, #1C2B3A 0%, #243447 100%)",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  color: "#C9A96E",
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                Total
              </span>
              <span
                style={{
                  color: "#E8C97A",
                  fontSize: "16px",
                  fontWeight: "700",
                  letterSpacing: "-0.01em",
                }}
              >
                ${(safeData.total || 0).toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        {safeData.notes && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px 14px",
              background: "#F7F9FB",
              borderRadius: "8px",
              border: "1px solid #E8EDF2",
            }}
          >
            <p
              style={{
                color: "#C9A96E",
                fontSize: "8px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                margin: "0 0 5px",
                fontWeight: "600",
              }}
            >
              Notas
            </p>
            <p
              style={{
                color: "#718096",
                fontSize: "9.5px",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              {safeData.notes}
            </p>
          </div>
        )}

        <div
          style={{
            marginTop: "28px",
            paddingTop: "14px",
            borderTop: "1px solid #E8EDF2",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: "#CBD5E0",
              fontSize: "8px",
              margin: 0,
              letterSpacing: "0.06em",
            }}
          >
            Este documento es válido por 30 días a partir de la fecha de emisión.
          </p>
          <p
            style={{
              color: "#C9A96E",
              fontSize: "8px",
              margin: 0,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            {safeData.companyName || "Tu Empresa"}
          </p>
        </div>
      </div>
    </div>
  )
}
