"use client";
import { useState, useRef, useEffect } from "react";

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
    <rect x="3" y="8" width="18" height="13" rx="3" fill="#60A5FA" />
    <rect x="8" y="4" width="8" height="5" rx="2" fill="#93C5FD" />
    <circle cx="9" cy="14" r="1.5" fill="#1e3a5f" />
    <circle cx="15" cy="14" r="1.5" fill="#1e3a5f" />
    <rect x="9" y="17" width="6" height="1.5" rx="0.75" fill="#1e3a5f" />
    <line x1="12" y1="4" x2="12" y2="2" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="1.5" r="1" fill="#60A5FA" />
    <line x1="3" y1="13" x2="1" y2="13" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="21" y1="13" x2="23" y2="13" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SkeletonChat = () => (
  <>
    <style>{`
      @keyframes shimmer {
        0%   { background-position: -600px 0; }
        100% { background-position: 600px 0; }
      }
      .sk {
        background: linear-gradient(90deg, #ECEEF2 25%, #F5F6F8 50%, #ECEEF2 75%);
        background-size: 600px 100%;
        animation: shimmer 1.4s infinite linear;
        border-radius: 8px;
      }
    `}</style>
    <div style={{
      background: "#fff",
      border: "1.5px solid #E4E7EF",
      borderRadius: 18,
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.055)",
      maxWidth: 480,
      width: "100%",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Header skeleton */}
      <div style={{ padding: "15px 22px", background: "#1B3D7A", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
        <div>
          <div style={{ width: 160, height: 12, borderRadius: 6, background: "rgba(255,255,255,0.2)", marginBottom: 8 }} />
          <div style={{ width: 60, height: 10, borderRadius: 6, background: "rgba(255,255,255,0.15)" }} />
        </div>
      </div>
      {/* Body skeleton */}
      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Bot bubble */}
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div className="sk" style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0 }} />
          <div className="sk" style={{ width: "65%", height: 64, borderRadius: "16px 16px 16px 4px" }} />
        </div>
        {/* User bubble */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="sk" style={{ width: "40%", height: 38, borderRadius: "16px 16px 4px 16px" }} />
        </div>
        {/* Bot bubble */}
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div className="sk" style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0 }} />
          <div className="sk" style={{ width: "75%", height: 80, borderRadius: "16px 16px 16px 4px" }} />
        </div>
        {/* Pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginLeft: 38 }}>
          {[100, 120, 110, 90].map((w, i) => (
            <div key={i} className="sk" style={{ width: w, height: 26, borderRadius: 99 }} />
          ))}
        </div>
      </div>
      {/* Input skeleton */}
      <div style={{ borderTop: "1px solid #F1F3F8", padding: "14px 22px", display: "flex", gap: 10 }}>
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        .sk {
          background: linear-gradient(90deg, #ECEEF2 25%, #F5F6F8 50%, #ECEEF2 75%);
          background-size: 600px 100%;
          animation: shimmer 1.4s infinite linear;
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
            border: "1.5px solid #E4E7EF",
            borderRadius: 18,
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 2px 12px rgba(0,0,0,0.055)",
            animation: "fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 20px",
            background: "#1B3D7A",
            borderBottom: "1px solid #16304f",
            flexShrink: 0,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <BotIcon size={20} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Asistente de CotizaApp</span>
              <span style={{ fontSize: 11, color: "#93C5FD", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                En línea
              </span>
            </div>
            <span style={{
              marginLeft: "auto", fontSize: 11, color: "#93C5FD",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 99, padding: "3px 12px",
            }}>
              Soporte 24/7
            </span>
          </div>

          {/* Mensajes */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "18px 18px",
            display: "flex", flexDirection: "column", gap: 12,
            background: "#F8FAFC",
          }}>
            {/* Estado vacío */}
            {chat.length === 0 && (
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 12, marginTop: 8,
                animation: "fadeUp 0.4s ease both 0.15s",
                opacity: 0, animationFillMode: "forwards",
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "#1B3D7A",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(27,61,122,0.2)",
                }}>
                  <BotIcon size={28} />
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1B3D7A", margin: 0 }}>
                  ¡Hola! ¿En qué puedo ayudarte?
                </p>
                <p style={{ fontSize: 11.5, color: "#A0AAB8", margin: 0, textAlign: "center" }}>
                  Selecciona una pregunta frecuente o escribe la tuya
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", marginTop: 4 }}>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      disabled={loading}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        textAlign: "left", fontSize: 12, color: "#1B3D7A", fontWeight: 600,
                        background: "#fff", border: "1.5px solid #E4E7EF",
                        borderRadius: 10, padding: "10px 14px",
                        cursor: "pointer", fontFamily: "inherit",
                        transition: "all 0.15s",
                        opacity: loading ? 0.4 : 1,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "#EEF4FF";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#93C5FD";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#E4E7EF";
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#60A5FA", flexShrink: 0 }} />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mensajes del chat */}
            {chat.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex", gap: 8, animation: "fadeUp 0.2s ease both",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                }}
              >
                {msg.role === "assistant" && (
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "#1B3D7A",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <BotIcon size={14} />
                  </div>
                )}
                <div style={{
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  fontSize: 13, maxWidth: "78%", lineHeight: 1.55, whiteSpace: "pre-wrap",
                  background: msg.role === "user" ? "#1B3D7A" : "#fff",
                  color: msg.role === "user" ? "#fff" : "#1F2937",
                  border: msg.role === "user" ? "none" : "1.5px solid #E4E7EF",
                  boxShadow: msg.role === "user"
                    ? "0 2px 8px rgba(27,61,122,0.2)"
                    : "0 1px 4px rgba(0,0,0,0.05)",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Pills después de respuesta */}
            {chat.length > 0 && chat[chat.length - 1].role === "assistant" && !loading && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginLeft: 36, marginTop: 4 }}>
                {SUGGESTIONS.slice(0, 4).map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    style={{
                      fontSize: 11, color: "#2A5298",
                      background: "#fff", border: "1.5px solid #E4E7EF",
                      borderRadius: 99, padding: "4px 12px",
                      cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#EEF4FF";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#93C5FD";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#fff";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#E4E7EF";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "#1B3D7A",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <BotIcon size={14} />
                </div>
                <div style={{
                  background: "#fff", border: "1.5px solid #E4E7EF",
                  borderRadius: "16px 16px 16px 4px",
                  padding: "10px 14px", display: "flex", gap: 5, alignItems: "center",
                }}>
                  {[0, 150, 300].map((delay) => (
                    <span key={delay} style={{
                      width: 6, height: 6, borderRadius: "50%", background: "#60A5FA",
                      display: "inline-block",
                      animation: `bounce 1s ${delay}ms infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            borderTop: "1px solid #F1F3F8",
            padding: "12px 16px",
            display: "flex", gap: 10, flexShrink: 0,
            background: "#fff",
          }}>
            <input
              style={{
                flex: 1, border: "1.5px solid #E4E7EF", borderRadius: 10,
                padding: "0 14px", height: 38, fontSize: 13, color: "#111827",
                background: "#F8FAFC", outline: "none", fontFamily: "inherit",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu pregunta..."
              disabled={loading}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#1B3D7A";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(27,61,122,0.1)";
                e.currentTarget.style.background = "#fff";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#E4E7EF";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "#F8FAFC";
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
                background: "#1B3D7A", color: "#fff",
                border: "none", borderRadius: 10,
                padding: "0 18px", height: 38,
                fontSize: 13, fontWeight: 600,
                cursor: (loading || !message.trim()) ? "not-allowed" : "pointer",
                opacity: (loading || !message.trim()) ? 0.45 : 1,
                fontFamily: "inherit",
                boxShadow: "0 2px 6px rgba(27,61,122,0.25)",
                transition: "opacity 0.15s, transform 0.12s",
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
