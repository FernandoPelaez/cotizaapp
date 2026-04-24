import type { ProfileType } from "../types"
import { SparkleIcon } from "../icons/OnboardingIcons"

type WelcomeScreenProps = {
  profileType: ProfileType
}

const confettiItems = [
  { cx: 22, cy: 40, size: 5, delay: 0.05, dur: 0.9, color: "#4F9EFF", rounded: true },
  { cx: 30, cy: 48, size: 7, delay: 0.15, dur: 1.1, color: "#A78BFA", rounded: false },
  { cx: 38, cy: 36, size: 6, delay: 0.25, dur: 0.95, color: "#34D399", rounded: true },
  { cx: 46, cy: 52, size: 8, delay: 0.35, dur: 1.2, color: "#FCD34D", rounded: false },
  { cx: 54, cy: 39, size: 5, delay: 0.45, dur: 0.9, color: "#F87171", rounded: true },
  { cx: 62, cy: 50, size: 7, delay: 0.55, dur: 1.15, color: "#60A5FA", rounded: false },
  { cx: 70, cy: 42, size: 6, delay: 0.65, dur: 1.05, color: "#FBBF24", rounded: true },
  { cx: 78, cy: 55, size: 5, delay: 0.75, dur: 1.25, color: "#4F9EFF", rounded: false },
  { cx: 25, cy: 58, size: 6, delay: 0.2, dur: 1.1, color: "#A78BFA", rounded: true },
  { cx: 35, cy: 32, size: 5, delay: 0.3, dur: 0.95, color: "#34D399", rounded: false },
  { cx: 50, cy: 34, size: 7, delay: 0.4, dur: 1.15, color: "#FCD34D", rounded: true },
  { cx: 66, cy: 35, size: 6, delay: 0.5, dur: 1.05, color: "#F87171", rounded: false },
]

const starPositions = [
  [15, 18],
  [80, 12],
  [92, 55],
  [8, 70],
  [50, 8],
  [70, 82],
  [25, 88],
  [88, 30],
  [40, 75],
  [60, 20],
]

export function WelcomeScreen({ profileType }: WelcomeScreenProps) {
  return (
    <div style={{ minHeight: "100vh", background: "#DCDCDC", padding: "24px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          background: "#1B3D7A",
          borderRadius: "16px",
          border: "1px solid #152E5E",
          minHeight: "calc(100vh - 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

          .sora {
            font-family: 'Sora', sans-serif;
          }

          @keyframes floatP {
            0% {
              transform: translateY(0) scale(1);
              opacity: 0;
            }

            10% {
              opacity: 0.8;
            }

            85% {
              opacity: 0.2;
            }

            100% {
              transform: translateY(-110vh) scale(0.3);
              opacity: 0;
            }
          }

          .wc-particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            animation: floatP linear infinite;
          }

          @keyframes twinkle {
            0%, 100% {
              opacity: 0;
              transform: scale(0);
            }

            50% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .wc-star {
            position: absolute;
            pointer-events: none;
          }

          @keyframes ringP {
            0%, 100% {
              transform: scale(1);
              opacity: 0.2;
            }

            50% {
              transform: scale(1.2);
              opacity: 0.05;
            }
          }

          .wc-r1 {
            animation: ringP 2.6s ease-in-out infinite;
          }

          .wc-r2 {
            animation: ringP 2.6s ease-in-out 0.6s infinite;
          }

          .wc-r3 {
            animation: ringP 2.6s ease-in-out 1.2s infinite;
          }

          @keyframes iconPop {
            0% {
              transform: scale(0) rotate(-30deg);
              opacity: 0;
            }

            70% {
              transform: scale(1.12) rotate(4deg);
              opacity: 1;
            }

            100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          .wc-icon {
            animation: iconPop 0.8s cubic-bezier(.34,1.56,.64,1) 0.2s both;
          }

          @keyframes orbitGlow {
            from {
              transform: rotate(0deg) translateX(54px) rotate(0deg);
            }

            to {
              transform: rotate(360deg) translateX(54px) rotate(-360deg);
            }
          }

          .orbit-dot {
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            margin: -4px 0 0 -4px;
            animation: orbitGlow 3s linear infinite;
          }

          .orbit-dot2 {
            position: absolute;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            margin: -2.5px 0 0 -2.5px;
            animation: orbitGlow 4s linear 1.5s infinite;
            opacity: 0.6;
          }

          @keyframes iconShine {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(255,255,255,0);
            }

            50% {
              box-shadow: 0 0 50px 10px rgba(120,160,255,0.18);
            }
          }

          .wc-icon-inner {
            animation: iconShine 3s ease-in-out 0.9s infinite;
          }

          @keyframes sUp {
            from {
              transform: translateY(24px);
              opacity: 0;
            }

            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .wc-t1 { animation: sUp 0.8s cubic-bezier(.16,1,.3,1) 0.50s both; }
          .wc-t2 { animation: sUp 0.8s cubic-bezier(.16,1,.3,1) 0.65s both; }
          .wc-t3 { animation: sUp 0.8s cubic-bezier(.16,1,.3,1) 0.78s both; }
          .wc-t4 { animation: sUp 0.8s cubic-bezier(.16,1,.3,1) 0.90s both; }
          .wc-t5 { animation: sUp 0.8s cubic-bezier(.16,1,.3,1) 1.02s both; }
          .wc-t6 { animation: sUp 0.8s cubic-bezier(.16,1,.3,1) 1.14s both; }

          @keyframes bgIn {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          .wc-wrap {
            animation: bgIn 0.5s ease both;
          }

          .dot-loader span {
            display: inline-block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: rgba(255,255,255,0.45);
            animation: dotB 1.3s ease-in-out infinite;
          }

          .dot-loader span:nth-child(2) {
            animation-delay: 0.2s;
          }

          .dot-loader span:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes dotB {
            0%, 80%, 100% {
              transform: scale(0.65);
              opacity: 0.35;
            }

            40% {
              transform: scale(1.2);
              opacity: 1;
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -300% center;
            }

            100% {
              background-position: 300% center;
            }
          }

          .wc-badge {
            background: linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.04) 100%);
            background-size: 300% auto;
            animation: shimmer 3s linear infinite;
          }

          @keyframes confettiFloat {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }

            100% {
              transform: translateY(-80px) rotate(360deg);
              opacity: 0;
            }
          }

          .wc-confetti {
            position: absolute;
            pointer-events: none;
          }

          @keyframes checkPop {
            0% {
              transform: scale(0);
              opacity: 0;
            }

            60% {
              transform: scale(1.3);
              opacity: 1;
            }

            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          .check-pill {
            animation: sUp 0.6s cubic-bezier(.16,1,.3,1) both;
          }

          .check-pill-icon {
            animation: checkPop 0.5s cubic-bezier(.34,1.56,.64,1) both;
          }

          @keyframes progressFill {
            from {
              width: 0;
            }

            to {
              width: 100%;
            }
          }

          .wc-progress {
            animation: progressFill 2.8s cubic-bezier(.4,0,.2,1) 0.4s both;
          }
        `}</style>

        {[...Array(12)].map((_, index) => {
          const colors = [
            "rgba(99,160,255,0.12)",
            "rgba(167,139,250,0.1)",
            "rgba(52,211,153,0.08)",
            "rgba(251,191,36,0.09)",
          ]

          return (
            <div
              key={index}
              className="wc-particle"
              style={{
                width: 14 + index * 9,
                height: 14 + index * 9,
                left: `${3 + index * 8}%`,
                bottom: -(8 + index * 9),
                background: colors[index % 4],
                animationDuration: `${5 + index}s`,
                animationDelay: `${index * 0.28}s`,
              }}
            />
          )
        })}

        {starPositions.map(([x, y], index) => (
          <div
            key={index}
            className="wc-star"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animation: `twinkle ${
                1.5 + (index % 3) * 0.7
              }s ease-in-out ${index * 0.3}s infinite`,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,0.35)"
            >
              <path d="M12 2l1.8 5.5H20l-4.8 3.5 1.8 5.5L12 13l-5 3.5 1.8-5.5L4 7.5h6.2z" />
            </svg>
          </div>
        ))}

        {confettiItems.map((item, index) => (
          <div
            key={index}
            className="wc-confetti"
            style={{
              left: `${item.cx}%`,
              top: `${item.cy}%`,
              width: item.size,
              height: item.size,
              background: item.color,
              borderRadius: item.rounded ? "50%" : "3px",
              animation: `confettiFloat ${item.dur}s ease-out ${item.delay}s both`,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "20%",
            right: "20%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />

        <div
          className="wc-wrap"
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <div
            className="wc-icon"
            style={{
              position: "relative",
              marginBottom: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="wc-r3"
              style={{
                position: "absolute",
                width: 190,
                height: 190,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />

            <div
              className="wc-r2"
              style={{
                position: "absolute",
                width: 146,
                height: 146,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.12)",
              }}
            />

            <div
              className="wc-r1"
              style={{
                position: "absolute",
                width: 108,
                height: 108,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.20)",
              }}
            />

            <div
              style={{
                position: "absolute",
                width: 108,
                height: 108,
                borderRadius: "50%",
              }}
            >
              <div
                className="orbit-dot"
                style={{ background: "rgba(255,255,255,0.9)" }}
              />

              <div
                className="orbit-dot2"
                style={{ background: "rgba(167,139,250,0.9)" }}
              />
            </div>

            <div
              className="wc-icon-inner"
              style={{
                width: 76,
                height: 76,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(99,139,255,0.15) 100%)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SparkleIcon />
            </div>
          </div>

          <h1
            className="wc-t1 sora"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
              fontWeight: 800,
              color: "white",
              marginBottom: 12,
              letterSpacing: "-0.03em",
              textShadow: "0 2px 24px rgba(0,0,0,0.2)",
            }}
          >
            ¡Todo listo!
          </h1>

          <p
            className="wc-t2 sora"
            style={{
              color: "rgba(255,255,255,0.78)",
              fontSize: 16,
              marginBottom: 8,
              maxWidth: 300,
              lineHeight: 1.65,
            }}
          >
            Tu perfil de{" "}
            <strong
              style={{
                color: "white",
                background: "rgba(255,255,255,0.13)",
                padding: "1px 9px",
                borderRadius: 6,
                fontWeight: 700,
              }}
            >
              {profileType === "independiente" ? "independiente" : "negocio"}
            </strong>{" "}
            está configurado.
          </p>

          <p
            className="wc-t3 sora"
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 13.5,
              marginBottom: 32,
              maxWidth: 300,
              lineHeight: 1.6,
            }}
          >
            Preparando tus plantillas — entrarás al dashboard en un momento.
          </p>

          <div
            className="wc-t4"
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 36,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["Plantillas", "PDF profesional", "Vista previa"].map(
              (feature, index) => (
                <div
                  key={feature}
                  className="check-pill"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 999,
                    padding: "5px 12px",
                    animationDelay: `${0.9 + index * 0.18}s`,
                  }}
                >
                  <div
                    className="check-pill-icon"
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: "rgba(52,211,153,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      animationDelay: `${1.1 + index * 0.18}s`,
                    }}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  </div>

                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.85)",
                      fontFamily: "Sora, sans-serif",
                    }}
                  >
                    {feature}
                  </span>
                </div>
              )
            )}
          </div>

          <div
            className="wc-t5 wc-badge sora"
            style={{
              padding: "10px 24px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 32,
              color: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            ✦ Empieza explorando las plantillas
          </div>

          <div
            className="wc-t5"
            style={{
              width: 200,
              height: 3,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 999,
              overflow: "hidden",
              marginBottom: 24,
            }}
          >
            <div
              className="wc-progress"
              style={{
                height: "100%",
                background:
                  "linear-gradient(90deg, rgba(99,160,255,0.8), rgba(167,139,250,0.9))",
                borderRadius: 999,
              }}
            />
          </div>

          <div className="wc-t6 dot-loader" style={{ display: "flex", gap: 10 }}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  )
}
