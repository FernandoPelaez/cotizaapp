export default function PlanesHeader() {
  return (
    <div className="space-y-2">
      <h1
        className="text-2xl font-bold tracking-tight md:text-3xl"
        style={{ color: "var(--foreground)" }}
      >
        Elige tu plan
      </h1>

      <p
        className="max-w-2xl text-sm leading-relaxed md:text-[15px]"
        style={{ color: "var(--text-muted)" }}
      >
        Comienza gratis y mejora tu plan cuando necesites más plantillas,
        cotizaciones y funciones para tu negocio.
      </p>
    </div>
  )
}
