export default function RegisterStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');

      .sora {
        font-family: 'Sora', sans-serif;
      }

      .page-enter {
        animation: pageIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
      }

      @keyframes pageIn {
        from {
          opacity: 0;
          transform: translateY(24px) scale(0.985);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .left-enter {
        animation: leftIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
      }

      @keyframes leftIn {
        from {
          opacity: 0;
          transform: translateX(-18px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .right-enter {
        animation: rightIn 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.18s both;
      }

      @keyframes rightIn {
        from {
          opacity: 0;
          transform: translateX(18px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .form-enter {
        animation: formIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both;
      }

      @keyframes formIn {
        from {
          opacity: 0;
          transform: translateY(14px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .reg-input {
        transition:
          border-color 0.2s ease,
          box-shadow 0.2s ease,
          background 0.2s ease;
      }

      .reg-input:focus {
        outline: none;
        border-color: #1B3D7A !important;
        box-shadow: 0 0 0 3px rgba(27,61,122,0.10);
        background: white !important;
      }

      .reg-input-error {
        border-color: #DC2626 !important;
        box-shadow: 0 0 0 3px rgba(220,38,38,0.08) !important;
      }

      .btn-primary {
        transition:
          opacity 0.2s ease,
          transform 0.15s ease,
          box-shadow 0.2s ease;
      }

      .btn-primary:hover:not(:disabled) {
        opacity: 0.91;
        transform: translateY(-1px);
        box-shadow: 0 10px 28px rgba(27,61,122,0.42) !important;
      }

      .btn-primary:active:not(:disabled) {
        transform: scale(0.99);
      }

      .btn-secondary {
        transition:
          background 0.2s ease,
          border-color 0.2s ease,
          transform 0.15s ease;
      }

      .btn-secondary:hover {
        background: #EEF2FF !important;
        border-color: #1B3D7A !important;
        transform: translateY(-1px);
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .spinner {
        width: 13px;
        height: 13px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
        flex-shrink: 0;
      }

      .divider-line {
        flex: 1;
        height: 1px;
        background: #D1D9E6;
      }

      .left-bg::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
        background-size: 44px 44px;
        pointer-events: none;
      }

      .orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(55px);
        pointer-events: none;
      }

      .orb-1 {
        width: 280px;
        height: 280px;
        background: rgba(96,165,250,0.16);
        top: -70px;
        left: -70px;
      }

      .orb-2 {
        width: 220px;
        height: 220px;
        background: rgba(147,197,253,0.11);
        bottom: -50px;
        right: -50px;
      }

      .glass-card {
        border-radius: 12px;
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.13);
      }

      .dot-live {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #4ADE80;
        animation: pulse-live 2.2s ease-in-out infinite;
        flex-shrink: 0;
      }

      @keyframes pulse-live {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.3;
        }
      }

      .check-row {
        display: flex;
        align-items: flex-start;
        gap: 9px;
        margin-bottom: 9px;
      }

      .check-circle {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        flex-shrink: 0;
        margin-top: 1px;
        background: rgba(255,255,255,0.13);
        border: 1px solid rgba(255,255,255,0.24);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .check-circle::after {
        content: '';
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #93C5FD;
      }
    `}</style>
  )
}
