"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Plus,
  Save,
  Trash2,
  User,
} from "lucide-react"

type QuoteItem = {
  id?: string
  name: string
  quantity: number
  price: number
  total?: number
}

type QuoteDetail = {
  id: string
  title: string
  description?: string | null
  clientName: string
  clientEmail?: string | null
  clientPhone?: string | null
  clientAddress?: string | null
  clientRFC?: string | null
  notes?: string | null
  discount?: number
  tax?: number
  validUntil?: string | null
  total?: number
  templateId?: string | null
  template?: { id: string; name: string } | null
  items: QuoteItem[]
}

const STEPS = [
  { id: 1, label: "Datos del cliente", icon: User },
  { id: 2, label: "Conceptos y totales", icon: FileText },
]

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function EditarCotizacionPageClient() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const id = params?.id

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [clientRFC, setClientRFC] = useState("")
  const [notes, setNotes] = useState("")
  const [discount, setDiscount] = useState("0")
  const [tax, setTax] = useState("0")
  const [validUntil, setValidUntil] = useState("")
  const [templateId, setTemplateId] = useState("")
  const [items, setItems] = useState<QuoteItem[]>([
    { name: "", quantity: 1, price: 0 },
  ])

  useEffect(() => {
    if (!id) {
      setError("No se encontró el ID de la cotización")
      setLoading(false)
      return
    }

    let isMounted = true

    const fetchQuote = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`/api/quotes/${id}`, {
          cache: "no-store",
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data?.error || "No se pudo cargar la cotización")
        }

        const quote: QuoteDetail = data

        if (!isMounted) return

        setTitle(quote.title || "")
        setDescription(quote.description || "")
        setClientName(quote.clientName || "")
        setClientEmail(quote.clientEmail || "")
        setClientPhone(quote.clientPhone || "")
        setClientAddress(quote.clientAddress || "")
        setClientRFC(quote.clientRFC || "")
        setNotes(quote.notes || "")
        setDiscount(String(quote.discount ?? 0))
        setTax(String(quote.tax ?? 0))
        setValidUntil(
          quote.validUntil
            ? new Date(quote.validUntil).toISOString().split("T")[0]
            : ""
        )
        setTemplateId(quote.templateId || "")
        setItems(
          Array.isArray(quote.items) && quote.items.length > 0
            ? quote.items.map((item) => ({
                id: item.id,
                name: item.name || "",
                quantity: Number(item.quantity) || 1,
                price: Number(item.price) || 0,
              }))
            : [{ name: "", quantity: 1, price: 0 }]
        )
      } catch (err) {
        if (!isMounted) return

        setError(
          err instanceof Error ? err.message : "Error al cargar la cotización"
        )
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void fetchQuote()

    return () => {
      isMounted = false
    }
  }, [id])

  const handleItemChange = (
    index: number,
    field: keyof QuoteItem,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item

        if (field === "quantity" || field === "price") {
          return {
            ...item,
            [field]: Number(value),
          }
        }

        return {
          ...item,
          [field]: value,
        }
      })
    )
  }

  const addItem = () => {
    setItems((prev) => [...prev, { name: "", quantity: 1, price: 0 }])
  }

  const removeItem = (index: number) => {
    setItems((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
    )
  }

  const subtotal = items.reduce(
    (acc, item) =>
      acc + (Number(item.quantity) || 0) * (Number(item.price) || 0),
    0
  )

  const discountValue = Number(discount) || 0
  const taxValue = Number(tax) || 0
  const taxableBase = Math.max(0, subtotal - discountValue)
  const taxAmount = taxableBase * (taxValue / 100)
  const total = taxableBase + taxAmount

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!id) {
      setError("No se encontró el ID de la cotización")
      return
    }

    try {
      setSaving(true)
      setSaved(false)
      setError(null)

      const payload = {
        title: title.trim(),
        description: description.trim(),
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: clientPhone.trim(),
        clientAddress: clientAddress.trim(),
        clientRFC: clientRFC.trim(),
        notes: notes.trim(),
        discount: Number(discount) || 0,
        tax: Number(tax) || 0,
        validUntil: validUntil || null,
        templateId: templateId || null,
        items: items.map((item) => ({
          name: item.name.trim(),
          quantity: Number(item.quantity) || 0,
          price: Number(item.price) || 0,
        })),
      }

      const res = await fetch(`/api/quotes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "No se pudo actualizar la cotización")
      }

      setSaved(true)

      window.setTimeout(() => {
        router.push("/cotizaciones")
        router.refresh()
      }, 1200)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al actualizar la cotización"
      )
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    "h-9 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <p className="text-sm text-neutral-400">Cargando cotización...</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-3">
      <motion.div
        className="mx-auto max-w-[660px] space-y-3"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: SMOOTH_EASE }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-base font-bold text-neutral-900">
              Editar cotización
            </h1>

            <p className="text-xs text-neutral-400">
              Actualiza la información de la cotización.
            </p>
          </div>

          <Link
            href="/cotizaciones"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver
          </Link>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white p-1 shadow-sm">
          {STEPS.map((s) => {
            const Icon = s.icon
            const isActive = step === s.id
            const isDone = step > s.id

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className={`flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition ${
                  isActive
                    ? "bg-[#1e3a8a] text-white shadow-sm"
                    : isDone
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "text-neutral-500 hover:bg-neutral-50"
                }`}
                style={isActive ? { color: "#ffffff" } : undefined}
              >
                <Icon className="h-3.5 w-3.5" />
                {s.label}
                {isDone && <CheckCircle2 className="h-3 w-3" />}
              </button>
            )
          })}
        </div>

        {saved && (
          <motion.div
            className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
            <p className="text-xs font-semibold text-emerald-700">
              ¡Cotización guardada correctamente! Redirigiendo...
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-xs font-medium text-red-600">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div
              key="step-1"
              className="space-y-2.5 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: SMOOTH_EASE }}
            >
              <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Información general
              </h2>

              <div className="grid gap-2.5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-neutral-600">
                    Título *
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={inputClass}
                    placeholder="Ej. Desarrollo de sitio web"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-neutral-600">
                    Descripción
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${inputClass} min-h-[58px] resize-none py-2`}
                    placeholder="Descripción general de la cotización"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600">
                    Cliente *
                  </label>

                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className={inputClass}
                    placeholder="Nombre del cliente"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600">
                    Correo
                  </label>

                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className={inputClass}
                    placeholder="correo@cliente.com"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600">
                    Teléfono
                  </label>

                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className={inputClass}
                    placeholder="Teléfono"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600">
                    RFC
                  </label>

                  <input
                    type="text"
                    value={clientRFC}
                    onChange={(e) => setClientRFC(e.target.value)}
                    className={inputClass}
                    placeholder="RFC"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-neutral-600">
                    Dirección
                  </label>

                  <input
                    type="text"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    className={inputClass}
                    placeholder="Dirección del cliente"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600">
                    Vigencia
                  </label>

                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600">
                    Template ID
                  </label>

                  <input
                    type="text"
                    value={templateId}
                    onChange={(e) => setTemplateId(e.target.value)}
                    className={inputClass}
                    placeholder="Opcional"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#1e3a8a] px-4 text-xs font-semibold text-white hover:bg-[#1e40af]"
                  style={{ color: "#ffffff" }}
                >
                  Siguiente
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              className="space-y-2.5 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: SMOOTH_EASE }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Conceptos
                </h2>

                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex h-8 items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  <Plus className="h-3 w-3" />
                  Agregar
                </button>
              </div>

              <div className="hidden grid-cols-12 gap-2 px-1 md:grid">
                <p className="col-span-5 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                  Concepto
                </p>
                <p className="col-span-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                  Cant.
                </p>
                <p className="col-span-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                  Precio
                </p>
                <p className="col-span-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                  Total
                </p>
              </div>

              <div className="space-y-2">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id ?? `item-${index}`}
                    className="grid gap-2 rounded-lg border border-neutral-100 bg-neutral-50/70 p-2 md:grid-cols-12 md:items-center"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: SMOOTH_EASE }}
                  >
                    <div className="md:col-span-5">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(index, "name", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Nombre del concepto"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(index, "price", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex h-9 items-center rounded-lg border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-700">
                        $
                        {(
                          (Number(item.quantity) || 0) *
                          (Number(item.price) || 0)
                        ).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex justify-end md:col-span-1">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                        aria-label="Eliminar concepto"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid gap-2.5 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600">
                    Descuento ($)
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-600">
                    Impuesto (%)
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={tax}
                    onChange={(e) => setTax(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                <div className="space-y-1 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-neutral-800">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Descuento</span>
                    <span className="font-medium text-red-500">
                      -${discountValue.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Impuesto ({taxValue}%)</span>
                    <span className="font-medium text-neutral-800">
                      ${taxAmount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-neutral-200 pt-2 text-sm font-bold text-neutral-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-600">
                  Notas
                </label>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`${inputClass} min-h-[58px] resize-none py-2`}
                  placeholder="Notas adicionales"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Anterior
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    href="/cotizaciones"
                    className="inline-flex h-9 items-center rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-semibold text-red-600 hover:bg-red-100"
                  >
                    Cancelar
                  </Link>

                  <button
                    type="submit"
                    disabled={saving || saved}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#1e3a8a] px-4 text-xs font-semibold text-white hover:bg-[#1e40af] disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ color: "#ffffff" }}
                  >
                    {saved ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        ¡Guardado!
                      </>
                    ) : saving ? (
                      <>
                        <Save className="h-3.5 w-3.5" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="h-3.5 w-3.5" />
                        Guardar cambios
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  )
}
