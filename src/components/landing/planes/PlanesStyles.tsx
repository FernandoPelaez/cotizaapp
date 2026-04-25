export default function PlanesStyles() {
  return (
    <style>{`
      .planes-section {
        width: 100%;
        padding: 80px 24px;
        background: #1B3D7A;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
      }

      .deco-circle {
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.04);
        pointer-events: none;
      }

      .planes-inner {
        max-width: 1060px;
        margin: 0 auto;
        text-align: center;
      }

      .planes-badge {
        display: inline-block;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.55);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 999px;
        padding: 5px 16px;
        margin-bottom: 16px;
      }

      .planes-title {
        font-size: clamp(26px, 4vw, 38px);
        font-weight: 800;
        color: white;
        margin: 0 0 12px;
        line-height: 1.15;
      }

      .planes-sub {
        font-size: 14px;
        color: rgba(255,255,255,0.5);
        max-width: 440px;
        margin: 0 auto 44px;
        line-height: 1.7;
      }

      .planes-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        align-items: stretch;
      }

      @media (max-width: 900px) {
        .planes-grid {
          grid-template-columns: 1fr;
          max-width: 380px;
          margin: 0 auto;
        }
      }

      .plan-wrap {
        display: flex;
        flex-direction: column;
      }

      .plan-card {
        background: white;
        border-radius: 20px;
        padding: 28px 24px;
        text-align: left;
        display: flex;
        flex-direction: column;
        flex: 1;
        box-sizing: border-box;
        box-shadow: 0 4px 20px rgba(0,0,0,0.13);
        transition: box-shadow 0.3s ease;
      }

      .plan-wrap:hover .plan-card {
        box-shadow: 0 24px 52px rgba(0,0,0,0.22);
      }

      .pro-shell {
        position: relative;
        border-radius: 22px;
        padding: 2.5px;
        flex: 1;
        box-sizing: border-box;
        overflow: hidden;
        box-shadow: 0 8px 36px rgba(27,61,122,0.5);
        transition: box-shadow 0.3s ease;
      }

      .plan-wrap:hover .pro-shell {
        box-shadow: 0 24px 56px rgba(27,61,122,0.7);
      }

      .pro-shell-bg {
        position: absolute;
        inset: -50%;
        background: conic-gradient(from 0deg, #60a5fa, #1B3D7A 25%, #818cf8 50%, #60a5fa 75%, #1B3D7A);
        animation: spinBorder 3s linear infinite;
        z-index: 0;
      }

      @keyframes spinBorder {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }

      .pro-inner {
        position: relative;
        z-index: 1;
        background: white;
        border-radius: 20px;
        padding: 28px 24px;
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
      }

      .premium-card {
        background: white;
        border-radius: 20px;
        padding: 28px 24px;
        text-align: left;
        display: flex;
        flex-direction: column;
        flex: 1;
        box-sizing: border-box;
        box-shadow: 0 4px 20px rgba(0,0,0,0.13);
        transition: box-shadow 0.3s ease;
      }

      .plan-wrap:hover .premium-card {
        box-shadow: 0 24px 52px rgba(0,0,0,0.22);
      }

      .plan-tag {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #9ca3af;
        margin-bottom: 3px;
      }

      .plan-name {
        font-size: 20px;
        font-weight: 800;
        color: #0f172a;
        margin: 0 0 16px;
      }

      .plan-price-row {
        display: flex;
        align-items: baseline;
        gap: 3px;
        margin-bottom: 20px;
      }

      .plan-price-num {
        font-size: 42px;
        font-weight: 800;
        color: #1B3D7A;
        line-height: 1;
        letter-spacing: -2px;
      }

      .plan-price-per {
        font-size: 12px;
        color: #9ca3af;
        font-weight: 500;
      }

      .plan-divider {
        height: 1px;
        background: #f1f5f9;
        margin-bottom: 16px;
      }

      .plan-features {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 9px;
        margin-bottom: 24px;
      }

      .plan-feat-item {
        display: flex;
        align-items: center;
        gap: 9px;
        font-size: 13px;
        color: #374151;
      }

      .feat-check {
        width: 17px;
        height: 17px;
        border-radius: 50%;
        background: #EEF2FA;
        color: #1B3D7A;
        font-size: 8px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .popular-pill {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        background: #1B3D7A;
        color: white;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        padding: 4px 12px;
        border-radius: 999px;
        margin-bottom: 14px;
        width: fit-content;
        transform-origin: left center;
      }

      .premium-pill {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        background: #EEF2FA;
        color: #1B3D7A;
        border: 1px solid #dbe4f3;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        padding: 4px 12px;
        border-radius: 999px;
        margin-bottom: 14px;
        width: fit-content;
        transform-origin: left center;
      }

      .btn-outline-plan,
      .btn-empresa-plan {
        width: 100%;
        padding: 12px 16px;
        border-radius: 12px;
        border: 1.5px solid #e2e8f0;
        background: white;
        color: #1B3D7A;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.22s ease;
        margin-top: auto;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btn-outline-plan:hover,
      .btn-empresa-plan:hover {
        background: #EEF2FA;
        border-color: #1B3D7A;
      }

      .btn-filled-plan {
        width: 100%;
        padding: 12px 16px;
        border-radius: 12px;
        border: none;
        background: #1B3D7A;
        color: white;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.22s ease;
        margin-top: auto;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btn-filled-plan:hover {
        background: #162f5e;
      }

      .planes-note {
        margin-top: 36px;
        font-size: 11px;
        color: rgba(255,255,255,0.28);
        letter-spacing: 0.03em;
      }
    `}</style>
  )
}
