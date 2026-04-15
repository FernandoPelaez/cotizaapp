"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

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
  template?: {
    id: string
    name: string
  } | null
  items: QuoteItem[]
}

export default function EditarCotizacionPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const id = params?.id

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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
    if (!id) return

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
          quote.validUntil ? new Date(quote.validUntil).toISOString().split("T")[0] : ""
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
        console.error("Error cargando cotización:", err)
        setError(
          err instanceof Error
            ? err.message
            : "Ocurrió un error al cargar la cotización"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchQuote()
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
    setItems((prev) => {
      if (prev.length === 1) return prev
      return prev.filter((_, i) => i !== index)
    })
  }

  const subtotal = items.reduce((acc, item) => {
    const quantity = Number(item.quantity) || 0
    const price = Number(item.price) || 0
    return acc + quantity * price
  }, 0)

  const discountValue = Number(discount) || 0
  const taxValue = Number(tax) || 0
  const taxableBase = Math.max(0, subtotal - discountValue)
  const taxAmount = taxableBase * (taxValue / 100)
  const total = taxableBase + taxAmount

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setSaving(true)
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

      router.push("/cotizaciones")
      router.refresh()
    } catch (err) {
      console.error("Error actualizando cotización:", err)
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al actualizar la cotización"
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-neutral-500">Cargando cotización...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Editar cotización
            </h1>
            <p className="text-sm text-neutral-500">
              Actualiza la información principal de la cotización.
            </p>
          </div>

          <Link
            href="/cotizaciones"
            className="inline-flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Volver
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                placeholder="Ej. Desarrollo de sitio web"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[90px] w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                placeholder="Descripción general de la cotización"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Cliente
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                placeholder="Nombre del cliente"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Correo
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                placeholder="correo@cliente.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Teléfono
              </label>
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                placeholder="Teléfono"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                RFC
              </label>
              <input
                type="text"
                value={clientRFC}
                onChange={(e) => setClientRFC(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                placeholder="RFC"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Dirección
              </label>
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                placeholder="Dirección del cliente"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Descuento
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Impuesto %
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Vigencia
              </label>
              <input
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Template ID
              </label>
              <input
                type="text"
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                placeholder="Opcional"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-neutral-900">Conceptos</h2>

              <button
                type="button"
                onClick={addItem}
                className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Agregar concepto
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid gap-3 rounded-xl border border-neutral-200 p-4 md:grid-cols-12"
                >
                  <div className="md:col-span-5">
                    <label className="mb-2 block text-xs font-medium text-neutral-500">
                      Concepto
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                      placeholder="Nombre del concepto"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-neutral-500">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-neutral-500">
                      Precio
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", e.target.value)
                      }
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-neutral-500">
                      Total
                    </label>
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
                      $
                      {(
                        (Number(item.quantity) || 0) * (Number(item.price) || 0)
                      ).toFixed(2)}
                    </div>
                  </div>

                  <div className="md:col-span-1 flex items-end">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="w-full rounded-xl border border-red-200 px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <div className="space-y-2 text-sm text-neutral-700">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Descuento</span>
                <span>${discountValue.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Impuesto</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-neutral-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Notas
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              placeholder="Notas adicionales"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/cotizaciones"
              className="inline-flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center rounded-xl bg-[#1e3a8a] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1e40af] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
