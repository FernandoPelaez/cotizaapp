"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react"
import { useRouter, useSearchParams } from "next/navigation"
import QuoteLimitModal from "@/components/dashboard/cotizaciones/form/QuoteLimitModal"
import QuoteCenteredToast from "@/components/dashboard/cotizaciones/form/QuoteCenteredToast"
import QuoteFormPreview from "@/components/dashboard/cotizaciones/form/QuoteFormPreview"
import QuoteFormStepOne from "@/components/dashboard/cotizaciones/form/QuoteFormStepOne"
import QuoteFormStepTwo from "@/components/dashboard/cotizaciones/form/QuoteFormStepTwo"
import { cleanNumber, formatMoney } from "@/lib/cotizacion-form"
import type {
  LimitModalState,
  Product,
  ProfileResponse,
  ProfileType,
  Service,
  TemplateData,
  Toast,
} from "@/types/cotizacion-form"

export default function CotizacionForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)

  const [step, setStep] = useState(1)
  const [templateKey, setTemplateKey] = useState("clasica-1")
  const [profileType, setProfileType] = useState<ProfileType | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [previewScale, setPreviewScale] = useState(0.38)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [limitModal, setLimitModal] = useState<LimitModalState>({
    open: false,
    title: "",
    message: "",
  })

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [clientRFC, setClientRFC] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [services, setServices] = useState<Service[]>([{ name: "", price: 0 }])
  const [products, setProducts] = useState<Product[]>([])
  const [discount, setDiscount] = useState(0)
  const [tax, setTax] = useState(0)
  const [validUntil, setValidUntil] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  const showToast = (message: string, type: Toast["type"] = "success") => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, type === "success" ? 1800 : 3000)
  }

  const openLimitModal = (title: string, message: string) => {
    setLimitModal({ open: true, title, message })
  }

  const closeLimitModal = () => {
    setLimitModal({ open: false, title: "", message: "" })
  }

  useEffect(() => {
    const queryTemplate = searchParams.get("template")?.trim()
    const storedTemplate =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedTemplate")?.trim()
        : null

    const nextTemplateKey = queryTemplate || storedTemplate || "clasica-1"
    setTemplateKey(nextTemplateKey)

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTemplate", nextTemplateKey)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile", { cache: "no-store" })
        const data: ProfileResponse = await res.json()

        const resolvedProfileType =
          data.user?.profileType ?? data.profileType ?? null

        if (res.ok && resolvedProfileType) {
          setProfileType(resolvedProfileType)
        }
      } catch (error) {
        console.error("Error cargando perfil", error)
      } finally {
        setLoadingProfile(false)
      }
    }

    fetchProfile()
  }, [])

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth - 32
        setPreviewScale((w / 595) * 0.78)
      }
    }

    update()
    window.addEventListener("resize", update)

    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    if (loadingProfile) return

    if (profileType === "independiente") {
      if (products.length === 0 && services.length === 0) {
        setServices([{ name: "", price: 0 }])
      }
    }

    if (profileType === "negocio") {
      if (products.length === 0) {
        setProducts([{ name: "", quantity: 1, price: 0 }])
      }
    }
  }, [loadingProfile, profileType, products.length, services.length])

  const handleServiceChange = (
    index: number,
    field: keyof Service,
    value: string
  ) => {
    const updated = [...services]
    if (field === "name") updated[index].name = value
    else updated[index].price = cleanNumber(value)
    setServices(updated)
  }

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string
  ) => {
    const updated = [...products]

    if (field === "name") updated[index].name = value
    else if (field === "quantity") updated[index].quantity = cleanNumber(value)
    else updated[index].price = cleanNumber(value)

    setProducts(updated)
  }

  const addService = () =>
    setServices((prev) => [...prev, { name: "", price: 0 }])

  const removeService = (index: number) => {
    const updated = services.filter((_, i) => i !== index)
    setServices(updated.length > 0 ? updated : [{ name: "", price: 0 }])
  }

  const addProduct = () =>
    setProducts((prev) => [...prev, { name: "", quantity: 1, price: 0 }])

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index))
  }

  const validServices = useMemo(
    () => services.filter((s) => s.name.trim() && s.price > 0),
    [services]
  )

  const validProducts = useMemo(
    () => products.filter((p) => p.name.trim() && p.quantity > 0 && p.price > 0),
    [products]
  )

  const servicesTotal = validServices.reduce((acc, s) => acc + s.price, 0)
  const productsTotal = validProducts.reduce(
    (acc, p) => acc + p.quantity * p.price,
    0
  )
  const subtotal = servicesTotal + productsTotal
  const taxableBase = Math.max(0, subtotal - discount)
  const taxAmount = taxableBase * (tax / 100)
  const total = taxableBase + taxAmount

  const templateData: TemplateData = {
    title,
    clientName,
    clientEmail,
    clientPhone,
    clientAddress,
    companyName: companyName || "Tu Empresa",
    services: validServices,
    products: validProducts,
    discount,
    tax,
    subtotal,
    total,
    notes,
    date: new Date().toLocaleDateString("es-MX"),
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const items = [
      ...validServices.map((s) => ({
        name: s.name,
        quantity: 1,
        price: s.price,
      })),
      ...validProducts,
    ]

    if (!title.trim()) {
      showToast("Agrega un título para la cotización", "warning")
      setStep(1)
      return
    }

    if (!clientName.trim()) {
      showToast("Agrega el nombre del cliente", "warning")
      setStep(1)
      return
    }

    if (items.length === 0) {
      showToast("Agrega al menos un servicio o producto válido", "warning")
      setStep(2)
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          clientName,
          clientEmail,
          clientPhone,
          clientAddress,
          clientRFC,
          items,
          discount,
          tax,
          validUntil: validUntil || null,
          notes,
          templateKey,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data?.error === "LIMIT_REACHED") {
          openLimitModal(
            "Límite de cotizaciones alcanzado",
            data?.message ||
              "Ya usaste todas las cotizaciones disponibles en tu plan actual. Actualiza tu cuenta para seguir creando cotizaciones."
          )
        } else if (data?.error === "TRIAL_BLOCKED") {
          openLimitModal(
            "Tu prueba gratuita ha finalizado",
            data?.message ||
              "Ya alcanzaste el límite de cotizaciones de prueba. Actualiza tu plan para seguir usando la plataforma."
          )
        } else if (data?.error === "PROFILE_INCOMPLETE") {
          showToast(
            data?.message || "Debes completar tu perfil antes de cotizar",
            "warning"
          )
        } else {
          showToast(
            data?.message || data?.error || "Error al crear la cotización",
            "error"
          )
        }
        return
      }

      if (!data?.id) {
        showToast("Error al crear la cotización", "error")
        return
      }

      showToast("¡Cotización creada con éxito!", "success")

      setTimeout(() => {
        router.push("/cotizaciones")
        router.refresh()
      }, 1800)
    } catch (err) {
      console.error(err)
      showToast("Ocurrió un error inesperado", "error")
    } finally {
      setLoading(false)
    }
  }

  const inputCls =
    "w-full h-[34px] border border-neutral-200 rounded-lg px-3 text-[12px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white"

  const labelCls =
    "block text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1"

  const sectionCls =
    "text-[10px] font-bold text-neutral-500 uppercase tracking-widest pb-2 border-b border-neutral-100 mb-3 flex items-center justify-between"

  const showServicesSection = profileType !== "negocio"
  const showProductsSection = profileType !== "independiente"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 min-h-screen bg-[#f0f2f5] items-start">
      <QuoteLimitModal
        open={limitModal.open}
        title={limitModal.title}
        message={limitModal.message}
        onClose={closeLimitModal}
      />

      <QuoteCenteredToast toasts={toasts} />

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden max-w-[520px] w-full justify-self-end">
        <div className="px-4 pt-3 pb-0 border-b border-neutral-100">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-[13px] font-semibold text-neutral-900 tracking-tight">
              Nueva cotización
            </h2>

            <div className="flex items-center gap-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === 1 ? "w-5 bg-[#1B3D7A]" : "w-2 bg-neutral-200"
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === 2 ? "w-5 bg-[#1B3D7A]" : "w-2 bg-neutral-200"
                }`}
              />
            </div>
          </div>

          <div className="flex -mb-px">
            {["Información", "Conceptos y totales"].map((tab, i) => (
              <span
                key={tab}
                onClick={() => setStep(i + 1)}
                className={`px-3 py-1.5 text-[11px] font-medium border-b-2 cursor-pointer transition-colors ${
                  step === i + 1
                    ? "text-blue-600 border-blue-600"
                    : "text-neutral-400 border-transparent hover:text-neutral-500"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <QuoteFormStepOne
              title={title}
              description={description}
              companyName={companyName}
              clientName={clientName}
              clientEmail={clientEmail}
              clientPhone={clientPhone}
              clientRFC={clientRFC}
              clientAddress={clientAddress}
              validUntil={validUntil}
              inputCls={inputCls}
              labelCls={labelCls}
              sectionCls={sectionCls}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              onCompanyNameChange={setCompanyName}
              onClientNameChange={setClientName}
              onClientEmailChange={setClientEmail}
              onClientPhoneChange={setClientPhone}
              onClientRFCChange={setClientRFC}
              onClientAddressChange={setClientAddress}
              onValidUntilChange={setValidUntil}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <QuoteFormStepTwo
              services={services}
              products={products}
              showServicesSection={showServicesSection}
              showProductsSection={showProductsSection}
              discount={discount}
              tax={tax}
              subtotal={subtotal}
              taxAmount={taxAmount}
              total={total}
              notes={notes}
              loading={loading}
              inputCls={inputCls}
              labelCls={labelCls}
              sectionCls={sectionCls}
              formatMoney={formatMoney}
              onServiceChange={handleServiceChange}
              onProductChange={handleProductChange}
              onAddService={addService}
              onRemoveService={removeService}
              onAddProduct={addProduct}
              onRemoveProduct={removeProduct}
              onDiscountChange={(value) => setDiscount(cleanNumber(value))}
              onTaxChange={(value) => setTax(cleanNumber(value))}
              onNotesChange={setNotes}
              onBack={() => setStep(1)}
            />
          )}
        </form>
      </div>

      <QuoteFormPreview
        containerRef={containerRef}
        previewScale={previewScale}
        templateKey={templateKey}
        profileType={profileType}
        templateData={templateData}
      />
    </div>
  )
}
