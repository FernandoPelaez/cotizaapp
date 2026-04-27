"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "¿Cómo creo una cotización?",
  "¿Cómo agrego productos?",
  "¿Cómo envío una cotización?",
  "¿Puedo cancelar cuando quiera?",
  "¿Qué planes tienen?",
];

const BotIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="13" rx="3" fill="var(--card)" />
    <rect x="8" y="4" width="8" height="5" rx="2" fill="var(--primary-soft)" />
    <circle cx="9" cy="14" r="1.5" fill="var(--primary)" />
    <circle cx="15" cy="14" r="1.5" fill="var(--primary)" />
    <rect x="9" y="17" width="6" height="1.5" rx="0.75" fill="var(--primary)" />
    <line x1="12" y1="4" x2="12" y2="2" stroke="var(--primary-soft)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="1.5" r="1" fill="var(--card)" />
    <line x1="3" y1="13" x2="1" y2="13" stroke="var(--card)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="21" y1="13" x2="23" y2="13" stroke="var(--card)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SkeletonChat = () => (
  <>
    <style>{`
      .sk {
        background: color-mix(in srgb, var(--foreground) 8%, var(--card));
        border-radius: 8px;
      }
    `}</style>

    <div
      style={{
        background: "var(--card)",
        border: "1.5px solid color-mix(in srgb, var(--border) 75%, transparent)",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 2px 12px color-mix(in srgb, var(--foreground) 6%, transparent)",
        maxWidth: 480,
        width: "100%",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          padding: "15px 22px",
          background: "var(--primary)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "color-mix(in srgb, var(--card) 20%, transparent)",
          }}
        />

        <div>
          <div
            style={{
              width: 160,
              height: 12,
              borderRadius: 6,
              background: "color-mix(in srgb, var(--card) 20%, transparent)",
              marginBottom: 8,
            }}
          />

          <div
            style={{
              width: 60,
              height: 10,
              borderRadius: 6,
              background: "color-mix(in srgb, var(--card) 15%, transparent)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          padding: "20px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div
            className="sk"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              flexShrink: 0,
            }}
          />

          <div
            className="sk"
            style={{
              width: "65%",
              height: 64,
              borderRadius: "16px 16px 16px 4px",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            className="sk"
            style={{
              width: "40%",
              height: 38,
              borderRadius: "16px 16px 4px 16px",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div
            className="sk"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              flexShrink: 0,
            }}
          />

          <div
            className="sk"
            style={{
              width: "75%",
              height: 80,
              borderRadius: "16px 16px 16px 4px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginLeft: 38,
          }}
        >
          {[100, 120, 110, 90].map((w, i) => (
            <div
              key={i}
              className="sk"
              style={{ width: w, height: 26, borderRadius: 99 }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid color-mix(in srgb, var(--border) 48%, transparent)",
          padding: "14px 22px",
          display: "flex",
          gap: 10,
        }}
      >
        <div className="sk" style={{ flex: 1, height: 38, borderRadius: 10 }} />
        <div className="sk" style={{ width: 72, height: 38, borderRadius: 10 }} />
      </div>
    </div>
  </>
);

export default function ChatAyuda() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [chat, loading]);

  const sendMessage = async (text?: string) => {
    const trimmed = (text ?? message).trim();
    if (!trimmed || loading) return;

    setChat((prev) => [...prev, { role: "user", content: trimmed }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      const reply = res.ok
        ? data.reply || "Sin respuesta."
        : "El asistente no está disponible en este momento.";

      setChat((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "Error de conexión. Intenta de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .sk {
          background: color-mix(in srgb, var(--foreground) 8%, var(--card));
          border-radius: 8px;
        }
      `}</style>

      {pageLoading ? (
        <SkeletonChat />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 480,
            height: 580,
            border: "1.5px solid color-mix(in srgb, var(--border) 75%, transparent)",
            borderRadius: 18,
            overflow: "hidden",
            background: "var(--card)",
            boxShadow: "0 2px 12px color-mix(in srgb, var(--foreground) 6%, transparent)",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 20px",
              background: "var(--primary)",
              borderBottom: "1px solid color-mix(in srgb, var(--primary-hover) 75%, transparent)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "color-mix(in srgb, var(--card) 18%, transparent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <BotIcon size={20} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--card)",
                }}
              >
                Asistente de CotizaApp
              </span>

              <span
                style={{
                  fontSize: 11,
                  color: "color-mix(in srgb, var(--card) 72%, transparent)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--success)",
                    display: "inline-block",
                  }}
                />
                En línea
              </span>
            </div>

            <span
              style={{
                marginLeft: "auto",
                fontSize: 11,
                color: "color-mix(in srgb, var(--card) 72%, transparent)",
                background: "color-mix(in srgb, var(--card) 10%, transparent)",
                border: "1px solid color-mix(in srgb, var(--card) 12%, transparent)",
                borderRadius: 99,
                padding: "3px 12px",
              }}
            >
              Soporte 24/7
            </span>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "18px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              background: "color-mix(in srgb, var(--background) 78%, var(--card))",
            }}
          >
            {chat.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  marginTop: 8,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 4px 16px color-mix(in srgb, var(--primary) 20%, transparent)",
                  }}
                >
                  <BotIcon size={28} />
                </div>

                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--primary)",
                    margin: 0,
                  }}
                >
                  ¡Hola! ¿En qué puedo ayudarte?
                </p>

                <p
                  style={{
                    fontSize: 11.5,
                    color: "var(--text-muted)",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  Selecciona una pregunta frecuente o escribe la tuya
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    width: "100%",
                    marginTop: 4,
                  }}
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      disabled={loading}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        textAlign: "left",
                        fontSize: 12,
                        color: "var(--primary)",
                        fontWeight: 600,
                        background: "var(--card)",
                        border:
                          "1.5px solid color-mix(in srgb, var(--border) 75%, transparent)",
                        borderRadius: 10,
                        padding: "10px 14px",
                        cursor: loading ? "not-allowed" : "pointer",
                        fontFamily: "inherit",
                        opacity: loading ? 0.4 : 1,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "var(--primary)",
                          flexShrink: 0,
                        }}
                      />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {chat.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                }}
              >
                {msg.role === "assistant" && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <BotIcon size={14} />
                  </div>
                )}

                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius:
                      msg.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    fontSize: 13,
                    maxWidth: "78%",
                    lineHeight: 1.55,
                    whiteSpace: "pre-wrap",
                    background:
                      msg.role === "user" ? "var(--primary)" : "var(--card)",
                    color:
                      msg.role === "user" ? "var(--card)" : "var(--foreground)",
                    border:
                      msg.role === "user"
                        ? "none"
                        : "1.5px solid color-mix(in srgb, var(--border) 75%, transparent)",
                    boxShadow:
                      msg.role === "user"
                        ? "0 2px 8px color-mix(in srgb, var(--primary) 20%, transparent)"
                        : "0 1px 4px color-mix(in srgb, var(--foreground) 5%, transparent)",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {chat.length > 0 && chat[chat.length - 1].role === "assistant" && !loading && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginLeft: 36,
                  marginTop: 4,
                }}
              >
                {SUGGESTIONS.slice(0, 4).map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    style={{
                      fontSize: 11,
                      color: "var(--primary-hover)",
                      background: "var(--card)",
                      border:
                        "1.5px solid color-mix(in srgb, var(--border) 75%, transparent)",
                      borderRadius: 99,
                      padding: "4px 12px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontWeight: 500,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <BotIcon size={14} />
                </div>

                <div
                  style={{
                    background: "var(--card)",
                    border:
                      "1.5px solid color-mix(in srgb, var(--border) 75%, transparent)",
                    borderRadius: "16px 16px 16px 4px",
                    padding: "10px 14px",
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((item) => (
                    <span
                      key={item}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--primary)",
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div
            style={{
              borderTop:
                "1px solid color-mix(in srgb, var(--border) 48%, transparent)",
              padding: "12px 16px",
              display: "flex",
              gap: 10,
              flexShrink: 0,
              background: "var(--card)",
            }}
          >
            <input
              style={{
                flex: 1,
                border:
                  "1.5px solid color-mix(in srgb, var(--border) 75%, transparent)",
                borderRadius: 10,
                padding: "0 14px",
                height: 38,
                fontSize: 13,
                color: "var(--foreground)",
                background: "color-mix(in srgb, var(--background) 78%, var(--card))",
                outline: "none",
                fontFamily: "inherit",
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu pregunta..."
              disabled={loading}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px color-mix(in srgb, var(--primary) 10%, transparent)";
                e.currentTarget.style.background = "var(--card)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor =
                  "color-mix(in srgb, var(--border) 75%, transparent)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background =
                  "color-mix(in srgb, var(--background) 78%, var(--card))";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <button
              onClick={() => sendMessage()}
              disabled={loading || !message.trim()}
              style={{
                background: "var(--primary)",
                color: "var(--card)",
                border: "none",
                borderRadius: 10,
                padding: "0 18px",
                height: 38,
                fontSize: 13,
                fontWeight: 600,
                cursor: loading || !message.trim() ? "not-allowed" : "pointer",
                opacity: loading || !message.trim() ? 0.45 : 1,
                fontFamily: "inherit",
                boxShadow:
                  "0 2px 6px color-mix(in srgb, var(--primary) 25%, transparent)",
              }}
            >
              {loading ? "..." : "Enviar"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
