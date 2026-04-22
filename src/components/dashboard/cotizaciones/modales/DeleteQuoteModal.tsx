import { CheckCircle2 } from "lucide-react"
import type { Quote } from "@/types/cotizacion"

type DeleteQuoteModalProps = {
  quote: Quote | null
  modalVisible: boolean
  deletingId: string | null
  onClose: () => void
  onConfirm: () => void
  deleted?: boolean
}

export default function DeleteQuoteModal({
  quote,
  modalVisible,
  deletingId,
  onClose,
  onConfirm,
  deleted = false,
}: DeleteQuoteModalProps) {
  if (!quote && !deleted) return null

  const isDeleting = deletingId === quote?.id
  const isVisible = modalVisible

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-200 ${
        isVisible ? "bg-black/50 opacity-100" : "pointer-events-none bg-black/0 opacity-0"
      }`}
      onClick={!deleted ? onClose : undefined}
    >
      <div
        className={`w-full max-w-sm rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl transition-all duration-200 ${
          isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {deleted ? (
          /* Pantalla de éxito */
          <div className="flex flex-col items-center justify-center gap-3 py-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-7 w-7 text-emerald-500" />
            </div>
            <h3 className="text-base font-semibold text-neutral-900">
              ¡Eliminado exitosamente!
            </h3>
            <p className="text-sm text-neutral-400">
              La cotización fue eliminada correctamente.
            </p>
          </div>
        ) : (
          <>
            {/* Ícono */}
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>

            {/* Textos */}
            <h3 className="text-base font-semibold text-neutral-900">
              Eliminar cotización
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
              Esta acción no se puede deshacer. La cotización será eliminada permanentemente.
            </p>

            {/* Tarjeta de la cotización */}
            <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-400">
                Cotización seleccionada
              </p>
              <p className="mt-1.5 text-sm font-semibold text-neutral-900">{quote!.title}</p>
              <p className="mt-0.5 text-sm text-neutral-500">{quote!.clientName}</p>
            </div>

            {/* Acciones */}
            <div className="mt-5 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={!!deletingId}
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={!!deletingId}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Eliminando...
                  </>
                ) : (
                  "Eliminar"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
