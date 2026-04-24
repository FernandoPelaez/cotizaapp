type ProgressDotsProps = {
  total: number
  currentIndex: number
}

export function ProgressDots({ total, currentIndex }: ProgressDotsProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginBottom: 16,
      }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          style={{
            height: 4,
            borderRadius: 999,
            background: index <= currentIndex ? "#1B3D7A" : "#D1D5DB",
            width: index === currentIndex ? 32 : 16,
            transition: "all .4s cubic-bezier(.4,0,.2,1)",
          }}
        />
      ))}
    </div>
  )
}
