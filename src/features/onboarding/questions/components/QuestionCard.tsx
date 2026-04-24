import type { Question } from "../types"

type QuestionCardProps = {
  question: Question
  selectedOption: string | null
  animating: boolean
  onSelectOption: (option: string) => void
}

export function QuestionCard({
  question,
  selectedOption,
  animating,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <div
      className={`q-fade${animating ? " out" : ""}`}
      style={{
        background: "white",
        borderRadius: 18,
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        padding: "28px 24px",
        marginBottom: 16,
      }}
    >
      <style>{`
        .q-fade {
          transition: opacity .28s ease, transform .28s ease;
        }

        .q-fade.out {
          opacity: 0;
          transform: translateY(-10px);
        }

        .opt-btn {
          width: 100%;
          padding: 14px 18px;
          background: white;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          text-align: left;
          font-size: 14px;
          color: #0F172A;
          cursor: pointer;
          transition: all .2s ease;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: inherit;
        }

        .opt-btn:hover:not(.opt-sel) {
          border-color: #A8BFDF;
          background: #F8FAFF;
          transform: translateX(3px);
        }

        .opt-btn.opt-sel {
          border-color: #1B3D7A;
          background: linear-gradient(135deg, #EEF2FA 0%, #ffffff 100%);
          box-shadow: 0 0 0 3px rgba(27,61,122,0.08);
        }
      `}</style>

      <h2
        className="sora"
        style={{
          fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
          fontWeight: 700,
          color: "#0F172A",
          lineHeight: 1.3,
          marginBottom: 24,
          letterSpacing: "-0.02em",
        }}
      >
        {question.question}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {question.options.map((option) => {
          const isSelected = selectedOption === option

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelectOption(option)}
              className={`opt-btn${isSelected ? " opt-sel" : ""}`}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  flexShrink: 0,
                  border: `2px solid ${
                    isSelected ? "#1B3D7A" : "#D1D5DB"
                  }`,
                  background: isSelected ? "#1B3D7A" : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all .2s ease",
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "white",
                    }}
                  />
                )}
              </div>

              <span style={{ fontWeight: isSelected ? 600 : 400 }}>
                {option}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
