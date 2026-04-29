"use client"

import Link from "next/link"
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

type ProfileResponseWithVisualData = ProfileResponse & {
  user?: {
    profileType?: ProfileType | null
    profile?: {
      businessName?: string | null
      logoUrl?: string | null
    } | null
  }
}

type TrialStatus = {
  plan: "free" | "pro" | "premium"
  quotesUsed: number
  trialQuotesLimit: number
  trialBlocked: boolean
}

function resolvePlan(value: unknown): TrialStatus["plan"] {
  const plan = String(value ?? "free")
    .trim()
    .toLowerCase()

  if (
    plan.includes("premium") ||
    plan.includes("empresa") ||
    plan.includes("enterprise")
  ) {
    return "premium"
  }

  if (plan.includes("pro")) {
    return "pro"
  }

  return "free"
}

function toSafeNumber(value: unknown, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export default function CotizacionForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)

  const [step, setStep] = useState(1)
  const [templateKey, setTemplateKey] = useState<string | null>(null)
  const [profileType, setProfileType] = useState<ProfileType | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [loadingTrialStatus, setLoadingTrialStatus] = useState(true)
  const [trialStatus, setTrialStatus] = useState<TrialStatus>({
    plan: "free",
    quotesUsed: 0,
    trialQuotesLimit: 5,
    trialBlocked: false,
  })
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
  const [companyLogo, setCompanyLogo] = useState("")
  const [services, setServices] = useState<Service[]>([{ name: "", price: 0 }])
  const [products, setProducts] = useState<Product[]>([])
  const [discount, setDiscount] = useState(0)
  const [tax, setTax] = useState(0)
  const [validUntil, setValidUntil] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  const isQuoteCreationBlocked =
    trialStatus.plan === "free" &&
    (trialStatus.trialBlocked ||
      (trialStatus.trialQuotesLimit > 0 &&
        trialStatus.quotesUsed >= trialStatus.trialQuotesLimit))

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
    const fetchTrialStatus = async () => {
      try {
        const res = await fetch("/api/quotes", {
          cache: "no-store",
          credentials: "include",
        })

        if (!res.ok) return

        const data = await res.json()
        const user = data?.user

        const plan = resolvePlan(user?.plan?.name)
        const quotesUsed = toSafeNumber(user?.quotesUsed, 0)
        const trialQuotesLimit = toSafeNumber(user?.trialQuotesLimit, 5)

        setTrialStatus({
          plan,
          quotesUsed,
          trialQuotesLimit,
          trialBlocked:
            Boolean(user?.trialBlocked) ||
            (plan === "free" &&
              trialQuotesLimit > 0 &&
              quotesUsed >= trialQuotesLimit),
        })
      } catch (error) {
        console.error("Error validando límite de prueba", error)
      } finally {
        setLoadingTrialStatus(false)
      }
    }

    fetchTrialStatus()
  }, [])

  useEffect(() => {
    const queryTemplate = searchParams.get("template")?.trim()

    if (queryTemplate) {
      setTemplateKey(queryTemplate)

      if (typeof window !== "undefined") {
        localStorage.setItem("selectedTemplate", queryTemplate)
      }

      return
    }

    setTemplateKey(null)

    if (typeof window !== "undefined") {
      localStorage.removeItem("selectedTemplate")
    }
  }, [searchParams])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user/profile", { cache: "no-store" })
        const data = (await res.json()) as ProfileResponseWithVisualData

        const resolvedProfileType =
          data.user?.profileType ?? data.profileType ?? null

        const profileBusinessName = data.user?.profile?.businessName?.trim() ?? ""
        const profileLogoUrl = data.user?.profile?.logoUrl?.trim() ?? ""

        if (res.ok) {
          if (resolvedProfileType) {
            setProfileType(resolvedProfileType)
          }

          if (profileBusinessName) {
            setCompanyName((prev) => prev.trim() || profileBusinessName)
          }

          if (profileLogoUrl) {
            setCompanyLogo(profileLogoUrl)
          }
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

    if (field === "name") {
      updated[index].name = value
    } else {
      updated[index].price = cleanNumber(value)
    }

    setServices(updated)
  }

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string
  ) => {
    const updated = [...products]

    if (field === "name") {
      updated[index].name = value
    } else if (field === "quantity") {
      updated[index].quantity = cleanNumber(value)
    } else {
      updated[index].price = cleanNumber(value)
    }

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

  const resolvedCompanyName = companyName.trim() || "Tu Empresa"

  const templateData: TemplateData = {
    title,
    description,
    clientName,
    clientEmail,
    clientPhone,
    clientAddress,
    clientRFC,
    companyName: resolvedCompanyName,
    companyLogo: companyLogo || undefined,
    services: validServices,
    products: validProducts,
    discount,
    tax,
    subtotal,
    total,
    notes,
    validUntil: validUntil || undefined,
    date: new Date().toLocaleDateString("es-MX"),
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isQuoteCreationBlocked) {
      openLimitModal(
        "Tu prueba gratuita ha finalizado",
        "Ya alcanzaste el límite de 5 cotizaciones de prueba. Mejora tu plan para seguir creando cotizaciones."
      )
      return
    }

    if (!templateKey) {
      showToast("Selecciona una plantilla antes de crear la cotización", "warning")
      return
    }

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

  if (loadingTrialStatus) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5] p-4">
        <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5 text-center shadow-sm">
          <p className="text-sm font-semibold text-neutral-900">
            Validando disponibilidad...
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Estamos revisando tus cotizaciones de prueba.
          </p>
        </div>
      </div>
    )
  }

  if (isQuoteCreationBlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5] p-4 -mt-16">
        <QuoteCenteredToast toasts={toasts} />

        <div className="w-full max-w-[520px] rounded-2xl border border-red-200 bg-gradient-to-b from-red-50 to-white px-8 py-9 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-2xl font-black text-red-600">
            !
          </div>

          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-red-500">
            Prueba gratuita finalizada
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-neutral-900">
            Ya usaste tus 5 cotizaciones gratis
          </h2>

          <p className="mx-auto mt-3 max-w-[390px] text-sm leading-6 text-neutral-500">
            Para seguir creando cotizaciones, mejora tu plan. Tus cotizaciones
            anteriores siguen guardadas en el historial.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/planes"
              className="inline-flex items-center justify-center rounded-full bg-[#1B3D7A] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/10 transition hover:-translate-y-0.5 hover:bg-[#244d96]"
            >
              Ver planes
            </Link>

            <Link
              href="/cotizaciones"
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-bold text-neutral-700 transition hover:-translate-y-0.5 hover:bg-neutral-50"
            >
              Ver historial
            </Link>
          </div>

          <p className="mt-5 text-[11px] leading-5 text-neutral-400">
            Límite usado: {trialStatus.quotesUsed} de{" "}
            {trialStatus.trialQuotesLimit} cotizaciones de prueba.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid min-h-screen grid-cols-1 items-start gap-4 bg-[#f0f2f5] p-4 lg:grid-cols-2">
      <QuoteLimitModal
        open={limitModal.open}
        title={limitModal.title}
        message={limitModal.message}
        onClose={closeLimitModal}
      />

      <QuoteCenteredToast toasts={toasts} />

      <div className="w-full max-w-[520px] justify-self-end overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <div className="border-b border-neutral-100 px-4 pb-0 pt-3">
          <div className="mb-2.5 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold tracking-tight text-neutral-900">
              Datos de la cotizacion
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

          <div className="-mb-px flex">
            {["Información", "Conceptos y totales"].map((tab, i) => (
              <span
                key={tab}
                onClick={() => setStep(i + 1)}
                className={`cursor-pointer border-b-2 px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  step === i + 1
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-neutral-400 hover:text-neutral-500"
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

      {templateKey ? (
        <QuoteFormPreview
          containerRef={containerRef}
          previewScale={previewScale}
          templateKey={templateKey}
          profileType={profileType}
          templateData={templateData}
        />
      ) : (
        <div
          ref={containerRef}
          className="flex min-h-[520px] w-full items-center justify-center rounded-2xl border border-neutral-200 bg-white p-6"
        >
          <div className="max-w-[360px] text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <span className="text-2xl font-black">+</span>
            </div>

            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
              Plantilla requerida
            </p>

            <h3 className="text-xl font-black tracking-[-0.03em] text-neutral-900">
              Elige una plantilla para comenzar
            </h3>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              La cotización todavía no tiene diseño asignado. Primero selecciona
              una plantilla y después verás aquí la vista previa en tiempo real.
            </p>

            <Link
              href="/plantillas"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[#1B3D7A] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/10 transition hover:-translate-y-0.5 hover:bg-[#244d96]"
            >
              Ver plantillas
            </Link>

            <p className="mt-4 text-[11px] leading-5 text-neutral-400">
              Así evitamos que el sistema agarre una plantilla al azar como si
              tuviera vida propia.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
