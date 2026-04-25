export function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  )
}

export function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function CotizaAppLogo() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          position: "relative",
          width: "24px",
          height: "24px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "18px",
            height: "18px",
            background: "#1E6FC8",
            borderRadius: "4px",
            transform: "translate(-50%, -50%) rotate(45deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-1px",
            right: "-1px",
            width: "9px",
            height: "9px",
            background: "#16A34A",
            borderRadius: "50%",
            border: "1.5px solid #1B3D7A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="5" height="5" viewBox="0 0 7 7" fill="none">
            <path
              d="M1 3.5l2 2 3-3"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <span
        style={{
          fontFamily: "Sora, sans-serif",
          fontSize: "14px",
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.2px",
        }}
      >
        Cotiza<span style={{ color: "#4A9EEB" }}>App</span>
      </span>
    </div>
  )
}

export function CotizaAppLogoDark() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          position: "relative",
          width: "24px",
          height: "24px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "18px",
            height: "18px",
            background: "#1E6FC8",
            borderRadius: "4px",
            transform: "translate(-50%, -50%) rotate(45deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-1px",
            right: "-1px",
            width: "9px",
            height: "9px",
            background: "#16A34A",
            borderRadius: "50%",
            border: "1.5px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="5" height="5" viewBox="0 0 7 7" fill="none">
            <path
              d="M1 3.5l2 2 3-3"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <span
        style={{
          fontFamily: "Sora, sans-serif",
          fontSize: "14px",
          fontWeight: 700,
          color: "#1B3D7A",
          letterSpacing: "-0.2px",
        }}
      >
        Cotiza<span style={{ color: "#1E6FC8" }}>App</span>
      </span>
    </div>
  )
}
