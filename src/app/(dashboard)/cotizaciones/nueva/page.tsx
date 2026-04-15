import { Suspense } from "react"
import CotizacionForm from "@/components/dashboard/cotizaciones/CotizacionForm"

function LoadingCotizacionForm() {
  return <div>Cargando formulario...</div>
}

export default function NuevaCotizacionPage() {
  return (
    <Suspense fallback={<LoadingCotizacionForm />}>
      <CotizacionForm />
    </Suspense>
  )
}