import { Suspense } from "react"
import CotizacionForm from "@/components/dashboard/cotizaciones/form/CotizacionForm"

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
