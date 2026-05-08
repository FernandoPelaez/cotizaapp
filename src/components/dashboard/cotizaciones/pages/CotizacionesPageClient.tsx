"use client"

import { AnimatePresence, motion, type Variants } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Search,
  Sparkles,
  X,
} from "lucide-react"

import {
  cotizacionesEase,
  cotizacionesNoticeVariants,
  cotizacionesPageVariants,
  cotizacionesPanelVariants,
} from "@/components/dashboard/cotizaciones/animations/cotizaciones.motion"
import CotizacionesList from "@/components/dashboard/cotizaciones/list/CotizacionesList"
import DeleteQuoteModal from "@/components/dashboard/cotizaciones/modales/DeleteQuoteModal"
import ProUpsellModal from "@/components/dashboard/inicio/modals/ProUpsellModal"
import type { Notice, Quote, QuotesResponse } from "@/types/cotizacion"

const ITEMS_PER_PAGE = 4
const FREE_WARNING_MODAL_SESSION_KEY = "cotizaciones-free-warning-only-3-v1"
const FREE_WARNING_USED_QUOTES = 3

type TrialPlanData = {
  plan: string
  quotesUsed: number
  maxQuotes: number | null
  trialQuotesLimit: number
  trialBlocked: boolean
}

type QuotesApiResponse = QuotesResponse & {
  user?: unknown
  error?: string
}

const headerCascadeVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.12,
    },
  },
}

const headerTextVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: cotizacionesEase,
    },
  },
}

const freeWarningBackdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.18,
      ease: "easeIn",
    },
  },
}

const freeWarningModalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 16,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 12,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
}

function serializeQuotes(quotes: Quote[]) {
  return JSON.stringify(
    quotes.map((quote) => ({
      id: quote.id,
      title: quote.title,
      clientName: quote.clientName,
      clientPhone: quote.clientPhone ?? "",
      total: quote.total,
      status: quote.status,
      sendChannel: quote.sendChannel ?? "",
      sentAt: quote.sentAt ?? "",
      responseExpiresAt: quote.responseExpiresAt ?? "",
      createdAt: quote.createdAt,
    }))
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function toSafeNumber(value: unknown, fallback = 0) {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : fallback
}

function toNullableNumber(value: unknown) {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : null
}

function resolvePlanName(plan: unknown) {
  if (typeof plan === "string") return plan.trim() || "free"

  if (isRecord(plan) && typeof plan.name === "string") {
    return plan.name.trim() || "free"
  }

  return "free"
}

function resolvePlanMaxQuotes(plan: unknown) {
  if (isRecord(plan)) {
    return toNullableNumber(plan.maxQuotes)
  }

  return null
}

function normalizePlanData(source: unknown): TrialPlanData | null {
  if (!source) return null

  const root =
    isRecord(source) && isRecord(source.user) ? source.user : source

  if (!isRecord(root)) return null

  const planValue = root.plan
  const plan = resolvePlanName(planValue)
  const planMaxQuotes = resolvePlanMaxQuotes(planValue)
  const explicitMaxQuotes = toNullableNumber(root.maxQuotes)
  const maxQuotes = explicitMaxQuotes ?? planMaxQuotes

  const trialQuotesLimit = toSafeNumber(
    root.trialQuotesLimit,
    maxQuotes ?? 5
  )

  return {
    plan,
    quotesUsed: toSafeNumber(root.quotesUsed, 0),
    maxQuotes,
    trialQuotesLimit,
    trialBlocked: Boolean(root.trialBlocked),
  }
}

function isFreePlan(plan: unknown) {
  const normalizedPlan = resolvePlanName(plan).trim().toLowerCase()

  return (
    normalizedPlan === "free" ||
    normalizedPlan === "gratis" ||
    normalizedPlan === "gratuito" ||
    normalizedPlan.includes("free") ||
    normalizedPlan.includes("gratis")
  )
}

type FreeTrialWarningModalProps = {
  open: boolean
  quotesUsed: number
  quotesLimit: number
  onClose: () => void
}

function FreeTrialWarningModal({
  open,
  quotesUsed,
  quotesLimit,
  onClose,
}: FreeTrialWarningModalProps) {
  const remainingQuotes = Math.max(quotesLimit - quotesUsed, 0)
  const progressPercent =
    quotesLimit > 0
      ? Math.min(100, Math.round((quotesUsed / quotesLimit) * 100))
      : 0

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={freeWarningBackdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 18,
            background: "rgba(15, 23, 42, 0.42)",
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="free-warning-title"
            variants={freeWarningModalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{
              position: "relative",
              width: "min(100%, 430px)",
              overflow: "hidden",
              borderRadius: 28,
              border: "1px solid rgba(209, 220, 245, 0.95)",
              background:
                "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
              boxShadow:
                "0 28px 70px rgba(15, 23, 42, 0.22), 0 12px 34px rgba(27, 61, 122, 0.18)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -80,
                right: -80,
                width: 190,
                height: 190,
                borderRadius: "999px",
                background:
                  "radial-gradient(circle, rgba(59, 130, 246, 0.22), transparent 68%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: -90,
                left: -90,
                width: 190,
                height: 190,
                borderRadius: "999px",
                background:
                  "radial-gradient(circle, rgba(27, 61, 122, 0.16), transparent 70%)",
              }}
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar aviso"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 2,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 34,
                height: 34,
                borderRadius: 12,
                border: "1px solid rgba(209, 220, 245, 0.95)",
                background: "rgba(255, 255, 255, 0.9)",
                color: "#64748b",
                cursor: "pointer",
                boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
              }}
            >
              <X size={16} />
            </button>

            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: "34px 30px 30px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  margin: "0 auto 18px",
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #1B3D7A 0%, #2A5298 100%)",
                  color: "#ffffff",
                  boxShadow:
                    "0 18px 34px rgba(27, 61, 122, 0.28), 0 6px 16px rgba(42, 82, 152, 0.18)",
                }}
              >
                <Sparkles size={25} />
              </div>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: "rgba(238, 242, 250, 0.95)",
                  border: "1px solid rgba(209, 220, 245, 0.95)",
                  color: "#1B3D7A",
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Aviso de plan gratis
              </span>

              <h2
                id="free-warning-title"
                style={{
                  margin: "16px 0 0",
                  color: "#0f172a",
                  fontSize: 25,
                  lineHeight: 1.1,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                }}
              >
                Ya usaste {quotesUsed} de tus {quotesLimit} pruebas gratis
              </h2>

              <p
                style={{
                  margin: "12px auto 0",
                  maxWidth: 330,
                  color: "#64748b",
                  fontSize: 14,
                  lineHeight: 1.65,
                }}
              >
                Vas muy bien. Todavía te quedan{" "}
                <strong
                  style={{
                    color: "#1B3D7A",
                    fontWeight: 900,
                  }}
                >
                  {remainingQuotes} cotizaciones gratis
                </strong>{" "}
                para seguir probando CotizaApp.
              </p>

              <div
                style={{
                  margin: "22px auto 0",
                  width: "100%",
                  maxWidth: 310,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    color: "#475569",
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  <span>Pruebas usadas</span>
                  <span>
                    {quotesUsed}/{quotesLimit}
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: 9,
                    borderRadius: 999,
                    overflow: "hidden",
                    background: "#dbeafe",
                  }}
                >
                  <div
                    style={{
                      width: `${progressPercent}%`,
                      height: "100%",
                      borderRadius: 999,
                      background:
                        "linear-gradient(90deg, #1B3D7A 0%, #3B82F6 100%)",
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                style={{
                  marginTop: 24,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 44,
                  padding: "0 26px",
                  borderRadius: 16,
                  border: "none",
                  background:
                    "linear-gradient(135deg, #1B3D7A 0%, #2A5298 100%)",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 900,
                  cursor: "pointer",
                  boxShadow:
                    "0 16px 30px rgba(27, 61, 122, 0.24), 0 6px 16px rgba(42, 82, 152, 0.16)",
                }}
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function CotizacionesPageClient() {
  const { status } = useSession()

  const [quotes, setQuotes] = useState<Quote[]>([])
  const [planData, setPlanData] = useState<TrialPlanData | null>(null)

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [sendingWhatsAppId, setSendingWhatsAppId] = useState<string | null>(
    null
  )
  const [quoteToDelete, setQuoteToDelete] = useState<Quote | null>(null)
  const [notice, setNotice] = useState<Notice>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [showFreeWarningModal, setShowFreeWarningModal] = useState(false)
  const [showFreeLimitModal, setShowFreeLimitModal] = useState(false)
  const [limitModalHandled, setLimitModalHandled] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const showNotice = (type: "success" | "error", message: string) => {
    setNotice({ type, message })
  }

  const loadPlanData = async () => {
    try {
      if (status !== "authenticated") return

      const response = await fetch("/api/user/plan", {
        method: "GET",
        cache: "no-store",
        credentials: "include",
      })

      if (!response.ok) return

      const data = await response.json()
      const normalizedPlanData = normalizePlanData(data)

      if (normalizedPlanData) {
        setPlanData(normalizedPlanData)
      }
    } catch (error) {
      console.error("Error cargando plan del usuario", error)
    }
  }

  const loadDashboard = async (options?: {
    showLoader?: boolean
    showRefreshing?: boolean
  }) => {
    const showLoader = Boolean(options?.showLoader)
    const showRefreshing = Boolean(options?.showRefreshing)

    try {
      if (status !== "authenticated") return

      if (showLoader) setLoading(true)
      if (showRefreshing) setRefreshing(true)

      setError(null)

      const quotesRes = await fetch("/api/quotes", {
        cache: "no-store",
        credentials: "include",
      })

      const quotesData = (await quotesRes.json()) as QuotesApiResponse

      if (!quotesRes.ok) {
        throw new Error(
          quotesData.error || "No se pudieron cargar las cotizaciones"
        )
      }

      const nextQuotes = Array.isArray(quotesData.quotes)
        ? quotesData.quotes
        : []

      const normalizedPlanFromQuotes = normalizePlanData(quotesData.user)

      if (normalizedPlanFromQuotes) {
        setPlanData(normalizedPlanFromQuotes)
      }

      const hasQuoteChanges =
        serializeQuotes(nextQuotes) !== serializeQuotes(quotes)

      setQuotes(nextQuotes)

      if (showRefreshing) {
        showNotice(
          "success",
          hasQuoteChanges
            ? "Historial actualizado correctamente."
            : "No hay actualizaciones recientes."
        )
      }
    } catch (err) {
      console.error("Error cargando dashboard de cotizaciones", err)

      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al cargar la información"
      )
    } finally {
      if (showLoader) setLoading(false)
      if (showRefreshing) setRefreshing(false)
    }
  }

  useEffect(() => {
    if (status === "loading") {
      setLoading(true)
      return
    }

    if (status === "unauthenticated") {
      setLoading(false)
      setError("No autorizado")
      return
    }

    void loadDashboard({ showLoader: true })
    void loadPlanData()
  }, [status])

  useEffect(() => {
    if (!quoteToDelete) {
      setModalVisible(false)
      return
    }

    const timer = window.setTimeout(() => setModalVisible(true), 10)
    return () => window.clearTimeout(timer)
  }, [quoteToDelete])

  useEffect(() => {
    if (!quoteToDelete) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !deletingId) closeDeleteModal()
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [quoteToDelete, deletingId])

  useEffect(() => {
    if (!notice) return

    const timer = window.setTimeout(() => setNotice(null), 3500)
    return () => window.clearTimeout(timer)
  }, [notice])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const filteredQuotes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) return quotes

    return quotes.filter((quote) => {
      const haystack = [quote.title, quote.clientName, quote.clientPhone ?? ""]
        .join(" ")
        .toLowerCase()

      return haystack.includes(query)
    })
  }, [quotes, searchTerm])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredQuotes.length / ITEMS_PER_PAGE)
  )

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages))
  }, [totalPages])

  const paginatedQuotes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredQuotes.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredQuotes, currentPage])

  const planIsFree = Boolean(planData) && isFreePlan(planData?.plan)

  const quotesUsed = Math.max(
    planData?.quotesUsed ?? 0,
    planIsFree ? quotes.length : 0
  )

  const quotesLimit = planData?.trialQuotesLimit || planData?.maxQuotes || 5

  const freeWarningSessionKey = useMemo(
    () =>
      `${FREE_WARNING_MODAL_SESSION_KEY}-${FREE_WARNING_USED_QUOTES}-of-${quotesLimit}`,
    [quotesLimit]
  )

  const shouldShowFreeLimitModal =
    Boolean(planData) &&
    planIsFree &&
    quotesLimit > 0 &&
    (Boolean(planData?.trialBlocked) || quotesUsed >= quotesLimit)

  const shouldShowFreeWarningModal =
    Boolean(planData) &&
    planIsFree &&
    quotesLimit > 0 &&
    quotesUsed === FREE_WARNING_USED_QUOTES &&
    !shouldShowFreeLimitModal

  useEffect(() => {
    if (!shouldShowFreeWarningModal) {
      setShowFreeWarningModal(false)
      return
    }

    if (typeof window === "undefined") return

    const alreadyShownThisSession =
      window.sessionStorage.getItem(freeWarningSessionKey) === "true"

    if (alreadyShownThisSession) return

    const timer = window.setTimeout(() => {
      setShowFreeWarningModal(true)
    }, 650)

    return () => window.clearTimeout(timer)
  }, [shouldShowFreeWarningModal, freeWarningSessionKey])

  useEffect(() => {
    if (!shouldShowFreeLimitModal || limitModalHandled) return

    setLimitModalHandled(true)

    const timer = window.setTimeout(() => {
      setShowFreeWarningModal(false)
      setShowFreeLimitModal(true)
    }, 650)

    return () => window.clearTimeout(timer)
  }, [shouldShowFreeLimitModal, limitModalHandled])

  useEffect(() => {
    if (!showFreeWarningModal) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeFreeWarningModal()
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [showFreeWarningModal])

  useEffect(() => {
    if (!showFreeLimitModal) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeFreeLimitModal()
      }
    }

    window.addEventListener("keydown", handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [showFreeLimitModal])

  const openDeleteModal = (quote: Quote) => {
    if (deletingId) return
    setQuoteToDelete(quote)
  }

  const closeDeleteModal = () => {
    if (deletingId) return

    setModalVisible(false)
    window.setTimeout(() => setQuoteToDelete(null), 180)
  }

  const closeFreeWarningModal = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(freeWarningSessionKey, "true")
    }

    setShowFreeWarningModal(false)
  }

  const closeFreeLimitModal = () => {
    setShowFreeLimitModal(false)
  }

  const confirmDelete = async () => {
    if (!quoteToDelete) return

    try {
      setDeletingId(quoteToDelete.id)

      const res = await fetch(`/api/quotes/${quoteToDelete.id}`, {
        method: "DELETE",
        credentials: "include",
      })

      const data: { error?: string; ok?: boolean } = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "No se pudo eliminar la cotización")
      }

      showNotice("success", "Cotización eliminada correctamente")
      closeDeleteModal()

      await loadDashboard()
      await loadPlanData()
    } catch (err) {
      showNotice(
        "error",
        err instanceof Error
          ? err.message
          : "Ocurrió un error al eliminar la cotización"
      )
    } finally {
      setDeletingId(null)
    }
  }

  const handleSendWhatsApp = async (quote: Quote) => {
    try {
      if (!quote.clientPhone) {
        throw new Error("Esta cotización no tiene teléfono del cliente")
      }

      setSendingWhatsAppId(quote.id)

      const res = await fetch(`/api/quotes/${quote.id}/whatsapp`, {
        method: "POST",
        credentials: "include",
      })

      const data: {
        ok?: boolean
        error?: string
        whatsappUrl?: string
      } = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || "No se pudo preparar el envío por WhatsApp"
        )
      }

      if (!data.whatsappUrl) {
        throw new Error("No se generó el enlace de WhatsApp")
      }

      window.open(data.whatsappUrl, "_blank", "noopener,noreferrer")
      showNotice("success", "Cotización preparada para enviarse por WhatsApp")

      await loadDashboard()
      await loadPlanData()
    } catch (err) {
      showNotice(
        "error",
        err instanceof Error
          ? err.message
          : "Ocurrió un error al preparar el envío por WhatsApp"
      )
    } finally {
      setSendingWhatsAppId(null)
    }
  }

  const handleRefresh = () => {
    void loadDashboard({ showRefreshing: true })
    void loadPlanData()
  }

  if (loading || status === "loading") {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex items-center gap-3 text-sm text-neutral-400">
          <RefreshCw className="h-4 w-4 animate-spin" />
          Cargando cotizaciones...
        </div>
      </div>
    )
  }

  return (
    <>
      <motion.div
        className="space-y-4 p-4"
        variants={cotizacionesPageVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between"
          variants={headerCascadeVariants}
          initial="hidden"
          animate="show"
        >
          <div>
            <motion.h2
              className="text-lg font-bold text-neutral-900"
              variants={headerTextVariants}
            >
              Consulta tus cotizaciones
            </motion.h2>

            <motion.p
              className="mt-0.5 text-xs text-neutral-400"
              variants={headerTextVariants}
            >
              El estado actual de cada cotización y gestiona tus registros.
            </motion.p>
          </div>

          <motion.div
            className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto"
            variants={headerTextVariants}
          >
            <div className="relative min-w-0 sm:flex-1 xl:w-[280px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar cotización..."
                className="h-9 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-9 text-sm text-neutral-700 outline-none placeholder:text-neutral-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing || status !== "authenticated"}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-600 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
              />

              {refreshing ? "Actualizando..." : "Actualizar"}
            </button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {notice && (
            <motion.div
              key="cotizaciones-notice"
              variants={cotizacionesNoticeVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className={`flex items-center gap-2.5 rounded-xl border p-3 text-xs font-medium ${
                notice.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  notice.type === "success" ? "bg-emerald-400" : "bg-red-400"
                }`}
              />

              {notice.message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="w-full"
          variants={cotizacionesPanelVariants}
          initial="hidden"
          animate="show"
        >
          {error ? (
            <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />

              <p className="text-xs font-medium text-red-600">{error}</p>
            </div>
          ) : filteredQuotes.length === 0 && searchTerm.trim() ? (
            <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50 px-6 py-8 text-center">
                <p className="text-sm font-semibold text-neutral-900">
                  No encontramos cotizaciones
                </p>

                <p className="mt-1.5 text-xs text-neutral-500">
                  No hay resultados para{" "}
                  <span className="font-medium">"{searchTerm}"</span>.
                </p>

                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="mt-4 inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  Limpiar búsqueda
                </button>
              </div>
            </section>
          ) : (
            <section className="flex min-h-[calc(100vh-310px)] flex-col rounded-2xl border border-neutral-200 bg-white shadow">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <CotizacionesList
                  quotes={paginatedQuotes}
                  deletingId={deletingId}
                  sendingWhatsAppId={sendingWhatsAppId}
                  onSendWhatsApp={handleSendWhatsApp}
                  onDelete={openDeleteModal}
                />
              </div>

              <div className="flex items-center justify-between border-t border-neutral-100 px-5 py-4">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Página anterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`inline-flex h-8 min-w-[2rem] items-center justify-center rounded-md border px-2 text-xs font-medium ${
                            page === currentPage
                              ? "border-blue-200 bg-blue-50 text-blue-700"
                              : "border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Página siguiente"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs text-neutral-400">
                  Mostrando{" "}
                  <span className="font-medium text-neutral-600">
                    {Math.min(
                      (currentPage - 1) * ITEMS_PER_PAGE + 1,
                      filteredQuotes.length
                    )}
                    –
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      filteredQuotes.length
                    )}
                  </span>{" "}
                  de{" "}
                  <span className="font-medium text-neutral-600">
                    {filteredQuotes.length}
                  </span>
                </p>
              </div>
            </section>
          )}
        </motion.div>
      </motion.div>

      <FreeTrialWarningModal
        open={showFreeWarningModal}
        quotesUsed={quotesUsed}
        quotesLimit={quotesLimit}
        onClose={closeFreeWarningModal}
      />

      <ProUpsellModal
        open={showFreeLimitModal}
        variant="blocked"
        onClose={closeFreeLimitModal}
        onSeen={closeFreeLimitModal}
      />

      <DeleteQuoteModal
        quote={quoteToDelete}
        modalVisible={modalVisible}
        deletingId={deletingId}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  )
}
