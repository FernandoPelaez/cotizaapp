import { ArrowIcon } from "../icons/OnboardingIcons"

type QuestionActionsProps = {
  loading: boolean
  selectedOption: string | null
  isLastQuestion: boolean
  onBack: () => void
  onNext: () => void
}

export function QuestionActions({
  loading,
  selectedOption,
  isLastQuestion,
  onBack,
  onNext,
}: QuestionActionsProps) {
  const canContinue = Boolean(selectedOption) && !loading

  return (
    <div
      className="fu4"
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .spinner {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: white;
          animation: spin .7s linear infinite;
          flex-shrink: 0;
        }

        .arrow-btn {
          transition: transform .25s ease;
        }

        button:not(:disabled):hover .arrow-btn {
          transform: translateX(3px);
        }
      `}</style>

      <button
        type="button"
        onClick={onBack}
        disabled={loading}
        style={{
          padding: "11px 20px",
          borderRadius: 999,
          border: "1.5px solid #D1D5DB",
          background: "white",
          fontSize: 13,
          fontWeight: 500,
          color: "#64748B",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          transition: "all .2s ease",
          opacity: loading ? 0.7 : 1,
        }}
      >
        ← Atrás
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canContinue}
        className="sora"
        style={{
          flex: 1,
          padding: "11px 0",
          borderRadius: 999,
          fontWeight: 600,
          fontSize: 13,
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transition: "all .3s ease",
          cursor: canContinue ? "pointer" : "not-allowed",
          ...(selectedOption
            ? {
                background: "linear-gradient(135deg, #1B3D7A 0%, #2A5298 100%)",
                color: "white",
                boxShadow: loading ? "none" : "0 6px 18px rgba(27,61,122,0.28)",
                opacity: loading ? 0.8 : 1,
              }
            : {
                background: "#D1D5DB",
                color: "#94A3B8",
              }),
        }}
      >
        {loading ? (
          <>
            <div className="spinner" />
            Configurando tu perfil...
          </>
        ) : (
          <>
            {isLastQuestion ? "Finalizar" : "Siguiente"}

            {selectedOption && (
              <div
                className="arrow-btn"
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowIcon />
              </div>
            )}
          </>
        )}
      </button>
    </div>
  )
}
