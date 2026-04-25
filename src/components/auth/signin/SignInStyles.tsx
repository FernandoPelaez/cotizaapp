export default function SignInStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');

      .sora {
        font-family: 'Sora', sans-serif;
      }

      .si-input {
        transition:
          border-color 0.2s ease,
          box-shadow 0.2s ease,
          background 0.2s ease;
      }

      .si-input:focus {
        outline: none;
        border-color: #1B3D7A !important;
        box-shadow: 0 0 0 3px rgba(27,61,122,0.10);
        background: white !important;
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

      .btn-google {
        transition:
          background 0.2s ease,
          transform 0.15s ease,
          box-shadow 0.2s ease;
      }

      .btn-google:hover:not(:disabled) {
        background: #F8FAFC !important;
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important;
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

      .check-circle {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        flex-shrink: 0;
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

      @keyframes errorIn {
        from {
          opacity: 0;
          transform: translateY(-6px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .error-inline {
        animation: errorIn 0.25s cubic-bezier(0.16,1,0.3,1) both;
      }
    `}</style>
  )
}
