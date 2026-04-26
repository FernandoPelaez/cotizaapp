"use client"

export default function ProUpsellDecorations() {
  return (
    <>
      <div
        className="absolute inset-x-0 top-0 z-10"
        style={{
          height: 2,
          borderRadius: "24px 24px 0 0",
          background:
            "linear-gradient(90deg, transparent 0%, #7c3aed 20%, #e879f9 50%, #7c3aed 80%, transparent 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute"
        style={{
          top: -120,
          right: -100,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 65%)",
          filter: "blur(14px)",
        }}
      />

      <div
        className="pointer-events-none absolute"
        style={{
          bottom: -80,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 65%)",
          filter: "blur(18px)",
        }}
      />
    </>
  )
}
