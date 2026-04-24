export function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#DCDCDC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "3px solid #D1D5DB",
          borderTopColor: "#1B3D7A",
          animation: "spin .7s linear infinite",
        }}
      />

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
