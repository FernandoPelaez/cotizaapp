import type { HeroTemplateItem } from "../data/heroTemplates.data"

type TemplateMiniPreviewProps = {
  color: string
  acento: string
  cliente: string
  numero: string
  items: HeroTemplateItem[]
  total: string
}

export default function TemplateMiniPreview({
  color,
  acento,
  cliente,
  numero,
  items,
  total,
}: TemplateMiniPreviewProps) {
  return (
    <div
      style={{
        background: "#f8fafc",
        borderRadius: "10px 10px 0 0",
        overflow: "hidden",
        height: 200,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          background: color,
          padding: "9px 11px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 6.5,
              color: "rgba(255,255,255,0.95)",
              fontWeight: 700,
              letterSpacing: 0.4,
            }}
          >
            MI EMPRESA S.A. DE C.V.
          </div>

          <div
            style={{
              fontSize: 5.5,
              color: "rgba(255,255,255,0.6)",
              marginTop: 2,
            }}
          >
            RFC: MEP123456ABC · Tel: (667) 123-4567
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 5,
              color: "rgba(255,255,255,0.55)",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Cotización
          </div>

          <div
            style={{
              fontSize: 6.5,
              color: "rgba(255,255,255,0.95)",
              fontWeight: 700,
              marginTop: 1,
            }}
          >
            {numero}
          </div>

          <div
            style={{
              fontSize: 5,
              color: "rgba(255,255,255,0.5)",
              marginTop: 1,
            }}
          >
            12/04/2026
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "6px 11px",
          background: acento,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${color}22`,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 5,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: 0.4,
              marginBottom: 2,
            }}
          >
            Cliente:
          </div>

          <div
            style={{
              fontSize: 6.5,
              color,
              fontWeight: 700,
            }}
          >
            {cliente}
          </div>

          <div
            style={{
              fontSize: 5,
              color: "#64748b",
              marginTop: 1,
            }}
          >
            RFC: CLI987654XYZ
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 5,
              color: "#64748b",
            }}
          >
            Vigencia:
          </div>

          <div
            style={{
              fontSize: 6,
              color: "#374151",
              fontWeight: 600,
              marginTop: 1,
            }}
          >
            15 días
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 20px 48px",
          padding: "4px 11px 3px",
          background: color,
          gap: 3,
        }}
      >
        {["Descripción", "Qty", "Precio"].map((heading) => (
          <div
            key={heading}
            style={{
              fontSize: 5,
              color: "rgba(255,255,255,0.75)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.4,
            }}
          >
            {heading}
          </div>
        ))}
      </div>

      {items.map((item, index) => (
        <div
          key={`${item.desc}-${index}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 20px 48px",
            padding: "4px 11px",
            gap: 3,
            background: index % 2 === 0 ? "#fff" : "#f8fafc",
            borderBottom: `1px solid ${acento}`,
          }}
        >
          <div
            style={{
              fontSize: 5.5,
              color: "#374151",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {item.desc}
          </div>

          <div
            style={{
              fontSize: 5.5,
              color: "#64748b",
              textAlign: "center",
            }}
          >
            {item.qty}
          </div>

          <div
            style={{
              fontSize: 5.5,
              color: "#374151",
              fontWeight: 600,
              textAlign: "right",
            }}
          >
            {item.precio}
          </div>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "6px 11px",
          gap: 6,
          borderTop: `2px solid ${acento}`,
          background: "#fff",
        }}
      >
        <div
          style={{
            fontSize: 5.5,
            color: "#64748b",
            fontWeight: 600,
            letterSpacing: 0.3,
          }}
        >
          TOTAL:
        </div>

        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: "#fff",
            background: color,
            padding: "2px 8px",
            borderRadius: 4,
          }}
        >
          {total}
        </div>
      </div>
    </div>
  )
}
