import { Quote } from "./cotizaciones.types"

type DeleteQuoteModalProps = {
  quote: Quote | null
  modalVisible: boolean
  deletingId: string | null
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteQuoteModal({
  quote,
  modalVisible,
  deletingId,
  onClose,
  onConfirm,
}: DeleteQuoteModalProps) {
  if (!quote) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-200 ${
        modalVisible ? "bg-black/60 opacity-100" : "bg-black/0 opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl transition-all duration-200 ${
          modalVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-95 opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              Eliminar cotización
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              ¿Seguro que deseas eliminar esta cotización? Esta acción no se
              puede deshacer.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Cotización seleccionada
            </p>
            <p className="mt-1 text-sm font-semibold text-neutral-900">
              {quote.title}
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              {quote.clientName}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={!!deletingId}
            className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={!!deletingId}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deletingId === quote.id ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  )
}
