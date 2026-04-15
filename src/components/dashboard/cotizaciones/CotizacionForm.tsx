"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { templateMap } from "@/lib/templates"

type ProfileType = "independiente" | "negocio"

type Service = {
  name: string
  price: number
}

type Product = {
  name: string
  quantity: number
  price: number
}

type TemplateData = {
  title: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress?: string
  companyName: string
  companyLogo?: string
  services: Service[]
  products: Product[]
  discount: number
  tax: number
  subtotal: number
  total: number
  notes: string
  docNumber?: string
  date?: string
}

type Toast = {
  id: number
  message: string
  type: "success" | "error" | "warning"
}

type ProfileResponse = {
  success?: boolean
  profileType?: ProfileType | null
  profileCompleted?: boolean
  onboardingStep?: number
  error?: string
}

type LimitModalState = {
  open: boolean
  title: string
  message: string
}

const cleanNumber = (value: string) => {
  const num = Number(value)
  return Number.isNaN(num) ? 0 : num
}

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value || 0)
}

export default function CotizacionForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)

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
  const [companyLogo, setCompanyLogo] = useState<string | null>(null)
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
    }, 3000)
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
        if (res.ok && data.profileType) {
          setProfileType(data.profileType)
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

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setCompanyLogo(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleServiceChange = (i: number, field: keyof Service, value: string) => {
    const updated = [...services]
    if (field === "name") updated[i].name = value
    else updated[i].price = cleanNumber(value)
    setServices(updated)
  }

  const handleProductChange = (i: number, field: keyof Product, value: string) => {
    const updated = [...products]
    if (field === "name") updated[i].name = value
    else if (field === "quantity") updated[i].quantity = cleanNumber(value)
    else updated[i].price = cleanNumber(value)
    setProducts(updated)
  }

  const addService = () => setServices((prev) => [...prev, { name: "", price: 0 }])

  const removeService = (index: number) => {
    const updated = services.filter((_, i) => i !== index)
    setServices(updated.length > 0 ? updated : [{ name: "", price: 0 }])
  }

  const addProduct = () => setProducts((prev) => [...prev, { name: "", quantity: 1, price: 0 }])

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
  const productsTotal = validProducts.reduce((acc, p) => acc + p.quantity * p.price, 0)
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
    companyLogo: companyLogo ?? undefined,
    services: validServices,
    products: validProducts,
    discount,
    tax,
    subtotal,
    total,
    notes,
    date: new Date().toLocaleDateString("es-MX"),
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const items = [
      ...validServices.map((s) => ({ name: s.name, quantity: 1, price: s.price })),
      ...validProducts,
    ]

    if (!title.trim()) {
      showToast("Agrega un título para la cotización", "warning")
      return
    }
    if (!clientName.trim()) {
      showToast("Agrega el nombre del cliente", "warning")
      return
    }
    if (items.length === 0) {
      showToast("Agrega al menos un servicio o producto válido", "warning")
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

            showToast("¡Cotización creada exitosamente!", "success")
            router.push("/cotizaciones")
            router.refresh()
          } catch (err) {
            console.error(err)
            showToast("Ocurrió un error inesperado", "error")
          } finally {
            setLoading(false)
      }
    }

  const SelectedTemplate = useMemo(() => {
    return (
      templateMap[templateKey as keyof typeof templateMap] ||
      templateMap["clasica-1"]
    )
  }, [templateKey])

  const previewContent = (
    <div style={{ margin: "0 auto", width: `${595 * previewScale}px` }}>
      <div
        style={{
          width: "595px",
          transformOrigin: "top left",
          transform: `scale(${previewScale})`,
          pointerEvents: "none",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        }}
      >
        <SelectedTemplate data={templateData} />
      </div>
    </div>
  )

  const inputCls =
    "w-full h-[34px] border border-neutral-200 rounded-lg px-3 text-[12px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
  const labelCls =
    "block text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-1"
  const sectionCls =
    "text-[10px] font-bold text-neutral-500 uppercase tracking-widest pb-2 border-b border-neutral-100 mb-3 flex items-center justify-between"

  const showServicesSection = profileType !== "negocio"
  const showProductsSection = profileType !== "independiente"

  // Estilos base de botones del modal — la transición va aquí
  const btnBase: React.CSSProperties = {
    height: "40px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    border: "none",
    transition: "transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, opacity 0.15s ease",
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 min-h-screen bg-[#f0f2f5] items-start">

      {/* ══════ MODAL LÍMITE ══════ */}
      {limitModal.open && (
        <>
          <style>{`
            .modal-btn-red {
              background: #DC2626 !important;
              box-shadow: 0 4px 12px rgba(220,38,38,0.35) !important;
            }
            .modal-btn-red:hover {
              background: #b91c1c !important;
              box-shadow: 0 6px 20px rgba(220,38,38,0.55) !important;
              transform: translateY(-2px) !important;
            }
            .modal-btn-red:active {
              transform: translateY(0px) scale(0.97) !important;
              box-shadow: 0 2px 8px rgba(220,38,38,0.4) !important;
            }

            .modal-btn-blue {
              background: #1B3D7A !important;
              box-shadow: 0 4px 14px rgba(27,61,122,0.5) !important;
              border: 1px solid rgba(74,144,217,0.4) !important;
              text-decoration: none !important;
            }
            .modal-btn-blue:hover {
              background: #254d9a !important;
              box-shadow: 0 6px 22px rgba(27,61,122,0.7) !important;
              transform: translateY(-2px) !important;
            }
            .modal-btn-blue:active {
              transform: translateY(0px) scale(0.97) !important;
              box-shadow: 0 2px 10px rgba(27,61,122,0.5) !important;
            }

            .modal-btn-close:hover {
              background: rgba(255,255,255,0.14) !important;
              color: white !important;
              transform: rotate(90deg) !important;
            }
            .modal-btn-close {
              transition: background 0.2s ease, color 0.2s ease, transform 0.25s ease !important;
            }

            .modal-card:hover {
              background: rgba(27,61,122,0.4) !important;
              border-color: rgba(74,144,217,0.4) !important;
              transform: translateY(-2px) !important;
            }
            .modal-card {
              transition: background 0.18s ease, border-color 0.18s ease, transform 0.18s ease !important;
            }
          `}</style>

          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              backgroundColor: "rgba(0,0,0,0.72)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLimitModal()
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "560px",
                backgroundColor: "#0f1f3d",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(27,61,122,0.4)",
                color: "white",
                overflow: "hidden",
              }}
            >
              {/* Degradado decorativo */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "120px",
                  background: "linear-gradient(180deg, rgba(27,61,122,0.5) 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Botón cerrar con rotación al hover */}
              <button
                type="button"
                onClick={closeLimitModal}
                className="modal-btn-close"
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div style={{ padding: "32px 32px 28px" }}>

                {/* Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    backgroundColor: "rgba(217,119,6,0.15)",
                    border: "1px solid rgba(217,119,6,0.35)",
                    borderRadius: "999px",
                    padding: "4px 12px 4px 9px",
                    marginBottom: "16px",
                  }}
                >
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="#D97706">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#D97706", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    Límite alcanzado
                  </span>
                </div>

                {/* Título */}
                <h2 style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.25, margin: "0 0 10px 0", letterSpacing: "-0.02em", color: "white" }}>
                  {limitModal.title}
                </h2>

                {/* Descripción */}
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, margin: "0 0 24px 0" }}>
                  {limitModal.message}
                </p>

                {/* Cards con hover */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "24px" }}>
                  {[
                    {
                      icon: (
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#4A90D9" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="12" y1="18" x2="12" y2="12" />
                          <line x1="9" y1="15" x2="15" y2="15" />
                        </svg>
                      ),
                      title: "Más cotizaciones",
                      desc: "Sigue creando sin pausas en tu trabajo.",
                    },
                    {
                      icon: (
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#4A90D9" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      ),
                      title: "Más plantillas",
                      desc: "Diseños premium para tus propuestas.",
                    },
                    {
                      icon: (
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#4A90D9" strokeWidth="2">
                          <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      ),
                      title: "Flujo completo",
                      desc: "Descarga PDFs sin interrupciones.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="modal-card"
                      style={{
                        backgroundColor: "rgba(27,61,122,0.25)",
                        border: "1px solid rgba(74,144,217,0.2)",
                        borderRadius: "14px",
                        padding: "14px 12px",
                      }}
                    >
                      <div style={{ marginBottom: "8px" }}>{item.icon}</div>
                      <div style={{ fontSize: "11px", fontWeight: 600, marginBottom: "4px", color: "white" }}>
                        {item.title}
                      </div>
                      <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Separador */}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "20px" }} />

                {/* Botones */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

                  {/* "Ahora no" — rojo con hover más oscuro + lift */}
                  <button
                    type="button"
                    onClick={closeLimitModal}
                    className="modal-btn-red"
                    style={{
                      ...btnBase,
                      padding: "0 18px",
                      color: "white",
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Ahora no
                  </button>

                  {/* "Ver planes" — azul marino con hover más claro + lift */}
                  <a
                    href="/planes"
                    className="modal-btn-blue"
                    style={{
                      ...btnBase,
                      padding: "0 22px",
                      color: "white",
                    }}
                  >
                    Ver planes
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════ TOASTS ══════ */}
      {toasts.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col gap-2 items-center">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-[13px] font-semibold pointer-events-auto
                  ${toast.type === "success" ? "bg-[#1B3D7A] text-white" : ""}
                  ${toast.type === "error" ? "bg-[#DC2626] text-white" : ""}
                  ${toast.type === "warning" ? "bg-[#D97706] text-white" : ""}
                `}
              >
                {toast.type === "success" && (
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
                {toast.type === "error" && (
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                )}
                {toast.type === "warning" && (
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </span>
                )}
                {toast.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════ FORMULARIO ══════ */}
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden max-w-[520px] w-full justify-self-end">
        <div className="px-4 pt-3 pb-0 border-b border-neutral-100">
          <h2 className="text-[13px] font-semibold text-neutral-900 tracking-tight mb-2.5">
            Nueva cotización
          </h2>
          <div className="flex -mb-px">
            {["Información", "Conceptos", "Totales"].map((tab, i) => (
              <span
                key={tab}
                className={`px-3 py-1.5 text-[11px] font-medium border-b-2 ${
                  i === 0
                    ? "text-blue-600 border-blue-600"
                    : "text-neutral-400 border-transparent"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          <div>
            <p className={sectionCls}>Datos generales</p>
            <div className="space-y-2">
              <div>
                <label className={labelCls}>Título del documento</label>
                <input
                  className={inputCls}
                  placeholder="Ej. Cotización — Proyecto residencial"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Descripción</label>
                <input
                  className={inputCls}
                  placeholder="Breve descripción de la cotización"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className={labelCls}>Nombre de tu empresa</label>
                  <input
                    className={inputCls}
                    placeholder="Ej. Studio Creativo S.A."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="flex-shrink-0">
                  <label className={labelCls}>Logo</label>
                  <label className="relative w-[34px] h-[34px] rounded-lg border-2 border-dashed border-neutral-300 hover:border-blue-400 bg-neutral-50 hover:bg-blue-50 flex items-center justify-center cursor-pointer transition-all overflow-hidden group">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleLogoChange}
                    />
                    {companyLogo ? (
                      <img src={companyLogo} alt="logo" className="w-full h-full object-contain p-0.5" />
                    ) : (
                      <svg
                        className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-400 transition-colors"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    )}
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelCls}>Cliente</label>
                  <input
                    className={inputCls}
                    placeholder="Nombre completo"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Email cliente</label>
                  <input
                    className={inputCls}
                    placeholder="correo@cliente.com"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={labelCls}>Teléfono cliente</label>
                  <input
                    className={inputCls}
                    placeholder="Ej. +52 667 123 4567"
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>RFC cliente</label>
                  <input
                    className={inputCls}
                    placeholder="RFC opcional"
                    value={clientRFC}
                    onChange={(e) => setClientRFC(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className={labelCls}>Dirección cliente</label>
                <input
                  className={inputCls}
                  placeholder="Dirección o ubicación"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Vigencia</label>
                <input
                  className={inputCls}
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                />
              </div>
            </div>
          </div>

          {showServicesSection && (
            <div>
              <p className={sectionCls}>
                Servicios
                <button
                  type="button"
                  onClick={addService}
                  className="flex items-center gap-1 text-blue-500 text-[11px] font-medium normal-case tracking-normal hover:text-blue-600"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Agregar
                </button>
              </p>
              <div className="space-y-1.5">
                {services.map((s, i) => (
                  <div key={i} className="grid grid-cols-[1fr_85px_28px] gap-1.5 items-center">
                    <input
                      className={inputCls}
                      placeholder="Nombre del servicio"
                      value={s.name}
                      onChange={(e) => handleServiceChange(i, "name", e.target.value)}
                    />
                    <input
                      className={inputCls}
                      placeholder="$0.00"
                      value={s.price || ""}
                      onChange={(e) => handleServiceChange(i, "price", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeService(i)}
                      className="w-[28px] h-[34px] rounded-lg border border-red-100 bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showProductsSection && (
            <div>
              <p className={sectionCls}>
                Productos
                <button
                  type="button"
                  onClick={addProduct}
                  className="flex items-center gap-1 text-blue-500 text-[11px] font-medium normal-case tracking-normal hover:text-blue-600"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Agregar
                </button>
              </p>
              {products.length === 0 ? (
                <p className="text-[11px] text-neutral-400 py-0.5">Sin productos agregados</p>
              ) : (
                <div className="space-y-1.5">
                  {products.map((p, i) => (
                    <div key={i} className="grid grid-cols-[1fr_55px_75px_28px] gap-1.5 items-center">
                      <input
                        className={inputCls}
                        placeholder="Producto"
                        value={p.name}
                        onChange={(e) => handleProductChange(i, "name", e.target.value)}
                      />
                      <input
                        className={inputCls}
                        placeholder="Cant."
                        value={p.quantity || ""}
                        onChange={(e) => handleProductChange(i, "quantity", e.target.value)}
                      />
                      <input
                        className={inputCls}
                        placeholder="$0.00"
                        value={p.price || ""}
                        onChange={(e) => handleProductChange(i, "price", e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeProduct(i)}
                        className="w-[28px] h-[34px] rounded-lg border border-red-100 bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div>
            <p className={sectionCls}>Ajustes</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelCls}>Descuento ($)</label>
                <input
                  className={inputCls}
                  placeholder="0.00"
                  value={discount || ""}
                  onChange={(e) => setDiscount(cleanNumber(e.target.value))}
                />
              </div>
              <div>
                <label className={labelCls}>Impuesto (%)</label>
                <input
                  className={inputCls}
                  placeholder="16"
                  value={tax || ""}
                  onChange={(e) => setTax(cleanNumber(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-[12px] text-neutral-600 space-y-1">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-neutral-900">{formatMoney(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Impuesto</span>
                <span className="font-medium text-neutral-900">{formatMoney(taxAmount)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200 pt-2">
                <span className="font-semibold text-neutral-900">Total</span>
                <span className="font-bold text-[#1B3D7A]">{formatMoney(total)}</span>
              </div>
            </div>
          </div>

          <div>
            <p className={sectionCls}>Notas / Condiciones</p>
            <textarea
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-[12px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none h-[80px] bg-white"
              placeholder="Forma de pago, vigencia, condiciones especiales..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-0.5">
            <button
              type="submit"
              disabled={loading}
              className="h-9 px-4 bg-[#1B3D7A] text-white rounded-xl text-[12px] font-medium hover:bg-[#16326a] disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1" />
                  </svg>
                  Creando...
                </span>
              ) : (
                "Crear cotización"
              )}
            </button>

          </div>
        </form>
      </div>

      {/* ══════ VISTA PREVIA ══════ */}
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden sticky top-5">
        <div className="px-4 py-2.5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_#dcfce7]" />
            <span className="text-[11px] font-medium text-neutral-500">
              Vista previa en tiempo real
            </span>
          </div>
          <div className="flex items-center gap-2">
            {profileType && (
              <span className="text-[10px] font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-100">
                {profileType === "independiente" ? "Independiente" : "Negocio"}
              </span>
            )}
            {templateKey && (
              <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                Plantilla {templateKey}
              </span>
            )}
          </div>
        </div>
        <div
          ref={containerRef}
          className="p-4"
          style={{
            maxHeight: "calc(100vh - 140px)",
            overflowY: "auto",
            scrollbarWidth: "none" as const,
          }}
        >
          {previewContent}
        </div>
      </div>

    </div>
  )
}

