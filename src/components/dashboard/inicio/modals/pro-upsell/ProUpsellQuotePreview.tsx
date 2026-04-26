"use client"

import { Sparkles } from "lucide-react"

export default function ProUpsellQuotePreview() {
  return (
    <div
      className="hidden md:block"
      style={{
        width: 360,
        flexShrink: 0,
        position: "relative",
        minHeight: 460,
      }}
    >
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-55%, -50%)",
          width: 300,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.7) 0%, rgba(99,102,241,0.35) 40%, transparent 70%)",
          filter: "blur(22px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 18,
          right: 18,
          zIndex: 40,
          padding: "9px 14px",
          borderRadius: 12,
          border: "1px solid rgba(251,191,36,0.6)",
          background:
            "linear-gradient(135deg, rgba(160,105,0,0.65) 0%, rgba(110,70,0,0.6) 100%)",
          color: "#fcd34d",
          fontSize: 10,
          fontWeight: 900,
          lineHeight: 1.5,
          textAlign: "center",
          backdropFilter: "blur(10px)",
          boxShadow:
            "0 0 28px rgba(251,191,36,0.35), 0 4px 16px rgba(0,0,0,0.5)",
          letterSpacing: "0.05em",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            justifyContent: "center",
          }}
        >
          <Sparkles size={11} />
          <span>SE VE MÁS PRO.</span>
        </div>
        <div>VENDE MEJOR.</div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 52,
          left: 10,
          zIndex: 5,
          width: 215,
          borderRadius: 16,
          overflow: "hidden",
          transform: "rotate(-7deg)",
          background:
            "linear-gradient(150deg, #2e1065 0%, #4c1d95 45%, #6d28d9 80%, #7c3aed 100%)",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(109,40,217,0.4)",
          opacity: 1,
        }}
      >
        <div
          style={{
            padding: "11px 13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(0,0,0,0.3)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 7,
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.7)",
                }}
              />
            </div>

            <div>
              <div
                style={{
                  width: 42,
                  height: 6,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.85)",
                  marginBottom: 3,
                }}
              />
              <div
                style={{
                  width: 30,
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.35)",
                }}
              />
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                width: 62,
                height: 7,
                borderRadius: 3,
                background: "rgba(255,255,255,0.8)",
                marginBottom: 3,
                marginLeft: "auto",
              }}
            />
            <div
              style={{
                width: 38,
                height: 5,
                borderRadius: 2,
                background: "rgba(196,181,253,0.7)",
                marginLeft: "auto",
              }}
            />
          </div>
        </div>

        <div
          style={{
            padding: "10px 13px 0",
            display: "flex",
            gap: 10,
          }}
        >
          {[58, 42, 38].map((width, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <div
                style={{
                  width,
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.25)",
                }}
              />
              <div
                style={{
                  width: width - 8,
                  height: 5,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.55)",
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            margin: "10px 13px 0",
            height: 18,
            borderRadius: 6,
            background: "rgba(255,255,255,0.18)",
          }}
        />

        <div
          style={{
            padding: "8px 13px",
            display: "flex",
            flexDirection: "column",
            gap: 7,
          }}
        >
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 6,
                borderBottom: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <div
                style={{
                  width: 75 + item * 6,
                  height: 5,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.4)",
                }}
              />
              <div
                style={{
                  width: 34,
                  height: 5,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.6)",
                }}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            margin: "4px 13px",
            height: 24,
            borderRadius: 8,
            background: "rgba(255,255,255,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10px",
          }}
        >
          <div
            style={{
              width: 34,
              height: 6,
              borderRadius: 3,
              background: "rgba(255,255,255,0.7)",
            }}
          />
          <div
            style={{
              width: 52,
              height: 9,
              borderRadius: 3,
              background: "rgba(255,255,255,0.9)",
            }}
          />
        </div>

        <div
          style={{
            margin: "8px 13px 12px",
            height: 18,
            borderRadius: 7,
            background: "rgba(255,255,255,0.1)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 30,
          right: 14,
          zIndex: 15,
          width: 238,
          borderRadius: 18,
          overflow: "hidden",
          background: "#ffffff",
          transform: "rotate(3deg)",
          boxShadow:
            "0 28px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.08), 0 0 52px rgba(124,58,237,0.4)",
        }}
      >
        <div
          style={{
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "rgba(196,181,253,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: "#c4b5fd",
                }}
              />
            </div>

            <div>
              <p
                style={{
                  fontSize: 9,
                  fontWeight: 900,
                  color: "#fff",
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Tu Logo
              </p>
              <p
                style={{
                  fontSize: 7,
                  color: "rgba(255,255,255,0.45)",
                  margin: 0,
                  marginTop: 1,
                }}
              >
                Desarrollo web
              </p>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: "#fff",
                margin: 0,
                letterSpacing: "0.1em",
              }}
            >
              COTIZACIÓN
            </p>
            <p
              style={{
                fontSize: 9,
                color: "#a78bfa",
                margin: 0,
                marginTop: 1,
              }}
            >
              COT-015
            </p>
          </div>
        </div>

        <div
          style={{
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 4,
            }}
          >
            {[
              ["Cliente", "Empresa Cliente"],
              ["Fecha", "18 Abr 2026"],
              ["Vigencia", "15 días"],
            ].map(([label, value]) => (
              <div key={label}>
                <p
                  style={{
                    fontSize: 7,
                    color: "#94a3b8",
                    margin: 0,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    color: "#334155",
                    margin: 0,
                    marginTop: 2,
                    lineHeight: 1.2,
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: 7,
              color: "#94a3b8",
              margin: "-4px 0 0",
            }}
          >
            cliente@correo.com
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 0.6fr 1fr 1fr",
              padding: "6px 8px",
              borderRadius: 8,
              background: "linear-gradient(90deg, #7c3aed, #6366f1)",
              fontSize: 7,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            <span>Concepto</span>
            <span style={{ textAlign: "center" }}>Cant.</span>
            <span style={{ textAlign: "center" }}>Precio</span>
            <span style={{ textAlign: "right" }}>Total</span>
          </div>

          {[
            ["Diseño de interfaz", "1", "$8,500", "$8,500"],
            ["Desarrollo frontend", "1", "$14,000", "$14,000"],
          ].map(([concept, quantity, price, total]) => (
            <div
              key={concept}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 0.6fr 1fr 1fr",
                fontSize: 7,
                color: "#475569",
                borderBottom: "1px solid #f1f5f9",
                paddingBottom: 6,
              }}
            >
              <span style={{ lineHeight: 1.3 }}>{concept}</span>
              <span style={{ textAlign: "center" }}>{quantity}</span>
              <span style={{ textAlign: "center" }}>{price}</span>
              <span style={{ textAlign: "right", fontWeight: 700 }}>{total}</span>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {[
              ["Subtotal", "$22,500"],
              ["IVA (16%)", "$3,600"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 7,
                  color: "#64748b",
                }}
              >
                <span>{label}</span>
                <span style={{ fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7px 10px",
              borderRadius: 10,
              background: "linear-gradient(90deg, #ede9fe, #ddd6fe)",
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 900,
                color: "#5b21b6",
              }}
            >
              TOTAL
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: "#5b21b6",
              }}
            >
              $26,100
            </span>
          </div>

          <p
            style={{
              fontSize: 8,
              color: "#94a3b8",
              margin: "2px 0 0",
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
            }}
          >
            Gracias por tu confianza.
          </p>
        </div>

        <div
          style={{
            margin: "0 10px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "8px 0",
            borderRadius: 10,
            background: "linear-gradient(135deg, #4c1d95, #6366f1)",
            fontSize: 9,
            fontWeight: 800,
            color: "#fff",
            boxShadow: "0 0 18px rgba(99,102,241,0.45)",
          }}
        >
          <Sparkles size={10} />
          Vista previa · Plantilla Pro
        </div>
      </div>
    </div>
  )
}
