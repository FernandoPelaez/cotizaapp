"use client"

import { motion } from "framer-motion"
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"

import {
  perfilCardVariants,
  perfilCardsContainerVariants,
  perfilHeaderVariants,
  perfilPageVariants,
} from "./animations/perfil.motion"
import PerfilFormCard from "./PerfilFormCard"
import PerfilOverviewCard from "./PerfilOverviewCard"

import type {
  DashboardProfileUser,
  ProfileFormValues,
  ProfileResponse,
  ProfileUpdateResponse,
} from "@/types/profile"

const EMPTY_FORM_VALUES: ProfileFormValues = {
  phone: "",
  city: "",
  state: "",
  businessName: "",
  description: "",
  logoUrl: "",
}

function createFormValues(user: DashboardProfileUser | null): ProfileFormValues {
  if (!user) return EMPTY_FORM_VALUES
  return {
    phone: user.profile.phone ?? "",
    city: user.profile.city ?? "",
    state: user.profile.state ?? "",
    businessName: user.profile.businessName ?? "",
    description: user.profile.description ?? "",
    logoUrl: user.profile.logoUrl ?? "",
  }
}

function getInitials(name: string | null | undefined) {
  if (!name?.trim()) return "US"
  const parts = name.trim().split(" ").filter(Boolean).slice(0, 2)
  if (parts.length === 0) return "US"
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("")
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.trim()) return error.message
  return fallback
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string" && reader.result.trim()) {
        resolve(reader.result)
        return
      }
      reject(new Error("No se pudo procesar el logo"))
    }
    reader.onerror = () => reject(new Error("No se pudo procesar el logo"))
    reader.readAsDataURL(file)
  })
}

export default function Perfil() {
  const [user, setUser] = useState<DashboardProfileUser | null>(null)
  const [values, setValues] = useState<ProfileFormValues>(EMPTY_FORM_VALUES)
  const [initialValues, setInitialValues] = useState<ProfileFormValues>(EMPTY_FORM_VALUES)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const initials = useMemo(() => getInitials(user?.name), [user?.name])

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccessMessage(null)
      const response = await fetch("/api/user/profile", { method: "GET", cache: "no-store" })
      const data = (await response.json()) as ProfileResponse & { error?: string }
      if (!response.ok || !data?.user) throw new Error(data?.error || "No se pudo cargar el perfil")
      const nextValues = createFormValues(data.user)
      setUser(data.user)
      setValues(nextValues)
      setInitialValues(nextValues)
    } catch (error) {
      setError(getErrorMessage(error, "No se pudo cargar el perfil"))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void loadProfile() }, [loadProfile])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (error) setError(null)
    if (successMessage) setSuccessMessage(null)
  }

  const handleLogoChange = async (file: File) => {
    try {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
      if (!allowedTypes.includes(file.type)) throw new Error("Formato inválido. Usa JPG, PNG o WEBP.")
      if (file.size > 2 * 1024 * 1024) throw new Error("El logo debe pesar máximo 2MB.")
      const nextLogoUrl = await readFileAsDataUrl(file)
      setValues((current) => ({ ...current, logoUrl: nextLogoUrl }))
      if (error) setError(null)
      if (successMessage) setSuccessMessage(null)
    } catch (error) {
      setError(getErrorMessage(error, "No se pudo cargar el logo"))
      setSuccessMessage(null)
    }
  }

  const handleReset = () => {
    setValues(initialValues)
    setError(null)
    setSuccessMessage(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setSaving(true)
      setError(null)
      setSuccessMessage(null)
      const payload: ProfileFormValues = {
        phone: values.phone.trim(),
        city: values.city.trim(),
        state: values.state.trim(),
        businessName: values.businessName.trim(),
        description: values.description.trim(),
        logoUrl: values.logoUrl.trim(),
      }
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await response.json()) as ProfileUpdateResponse & { error?: string }
      if (!response.ok || !data?.user) throw new Error(data?.error || "No se pudo actualizar el perfil")
      const nextValues = createFormValues(data.user)
      setUser(data.user)
      setValues(nextValues)
      setInitialValues(nextValues)
      setSuccessMessage(data.message || "Perfil actualizado correctamente")
    } catch (error) {
      setError(getErrorMessage(error, "No se pudo actualizar el perfil"))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return null

  if (!user) {
    return (
      <motion.section
        className="min-h-full"
        variants={perfilPageVariants}
        initial="hidden"
        animate="show"
      >
        <div
          className="mx-auto w-full max-w-3xl rounded-[28px] border p-6"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "color-mix(in srgb, var(--border) 45%, transparent)",
            boxShadow: "0 8px 20px color-mix(in srgb, var(--foreground) 4%, transparent)",
          }}
        >
          <h2 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
            No se pudo cargar el perfil
          </h2>
          <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-muted)" }}>
            {error || "Ocurrió un problema al obtener la información del perfil."}
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => void loadProfile()}
              className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold"
              style={{ backgroundColor: "var(--primary)", color: "var(--card)" }}
            >
              Reintentar
            </button>
          </div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      className="min-h-full"
      variants={perfilPageVariants}
      initial="hidden"
      animate="show"
    >
      <div className="mx-auto w-full max-w-[1360px] space-y-5">
        {/* ANIMADO: título baja desde arriba suavemente */}
        <motion.div
          className="space-y-1"
          variants={perfilHeaderVariants}
          initial="hidden"
          animate="show"
        >
          <h1
            className="text-[2rem] font-semibold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Información principal
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Actualiza tus datos base y deja listo tu perfil real.
          </p>
        </motion.div>

        {/* ANIMADO: las dos tarjetas suben escalonadas con 120ms entre ellas */}
        <motion.div
          className="grid gap-5 xl:grid-cols-[620px_minmax(0,1fr)] xl:items-start"
          variants={perfilCardsContainerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div className="h-full" variants={perfilCardVariants}>
            <PerfilOverviewCard
              user={user}
              values={values}
              initials={initials}
            />
          </motion.div>

          <motion.div variants={perfilCardVariants}>
            <PerfilFormCard
              values={values}
              saving={saving}
              error={error}
              successMessage={successMessage}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onReset={handleReset}
              initials={initials}
              logoUrl={values.logoUrl}
              onLogoChange={handleLogoChange}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
