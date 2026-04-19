"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import type { DashboardProfileUser, ProfileFormValues } from "@/types/profile"

type PerfilOverviewCardProps = {
  user: DashboardProfileUser
  values: ProfileFormValues
  initials: string
}

function getProfileTypeLabel(profileType: DashboardProfileUser["profileType"]) {
  if (profileType === "independiente") return "Independiente"
  if (profileType === "negocio") return "Empresa"
  return "Perfil"
}

function getLocation(city: string, state: string) {
  const parts = [city.trim(), state.trim()].filter(Boolean)
  return parts.length > 0 ? parts.join(", ") : "Sin ubicación"
}

function getBusinessName(values: ProfileFormValues, user: DashboardProfileUser) {
  return values.businessName.trim() || user.name?.trim() || "Tu negocio"
}

type AvatarProps = {
  showImage: boolean
  src: string
  initials: string
  onError: () => void
  size?: "lg" | "sm"
}

function Avatar({ showImage, src, initials, onError, size = "lg" }: AvatarProps) {
  return (
    <div
      className={
        size === "lg"
          ? "flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#dbe6ff] text-[26px] font-bold tracking-tight text-[#2f5fe3]"
          : "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/20 text-[14px] font-bold tracking-tight text-white"
      }
    >
      {showImage ? (
        <img src={src} alt="Logo" className="h-full w-full object-cover" onError={onError} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

function ContactRow({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[13px] text-slate-500">
      <div className="flex h-4 w-4 shrink-0 items-center justify-center text-[#2f5fe3]">
        {icon}
      </div>
      <span className="truncate">{text}</span>
    </div>
  )
}

export default function PerfilOverviewCard({ user, values, initials }: PerfilOverviewCardProps) {
  const [imageError, setImageError] = useState(false)

  const profileTypeLabel = getProfileTypeLabel(user.profileType)
  const businessName = getBusinessName(values, user)
  const previewLogo = values.logoUrl.trim()
  const showLogoImage = Boolean(previewLogo) && !imageError
  const email = user.email?.trim() || "Sin correo"
  const phone = values.phone.trim() || "Sin teléfono"
  const location = getLocation(values.city, values.state)

  useEffect(() => {
    setImageError(false)
  }, [previewLogo])

  return (
    <aside className="h-full w-full">
      <section className="h-full w-full overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-sm">
        <div className="flex h-full w-full flex-col px-6 py-6">

          {/* Chip superior */}
          <div className="mb-5 flex justify-end">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 shadow-sm">
              <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              Vista previa en cotización
            </span>
          </div>

          {/* Layout 2 columnas */}
          <div className="flex flex-1 items-start gap-6">

            {/* ── Columna izquierda: datos del usuario ── */}
            <div className="flex min-w-0 flex-1 flex-col gap-5">

              {/* Avatar + nombre + tipo en fila horizontal */}
              <div className="flex items-center gap-3">
                <Avatar
                  showImage={showLogoImage}
                  src={previewLogo}
                  initials={initials}
                  onError={() => setImageError(true)}
                  size="lg"
                />
                <div className="min-w-0">
                  <p className="truncate text-[18px] font-bold leading-snug text-[#10254d]">
                    {businessName}
                  </p>
                  <span className="mt-1 inline-flex items-center rounded-full bg-[#dbe6ff] px-2.5 py-0.5 text-[11px] font-semibold text-[#2f5fe3]">
                    {profileTypeLabel}
                  </span>
                </div>
              </div>

              {/* Datos de contacto */}
              <div className="flex flex-col gap-3">
                <ContactRow icon={<Mail className="h-4 w-4" />} text={email} />
                <ContactRow icon={<Phone className="h-4 w-4" />} text={phone} />
                <ContactRow icon={<MapPin className="h-4 w-4" />} text={location} />
              </div>
            </div>

            {/* ── Columna derecha: mini plantilla de cotización ── */}
            <div className="w-[270px] shrink-0">
              <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,35,90,0.13)]">

                {/* Header azul oscuro */}
                <div className="bg-[#062b78] px-5 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/20 text-[14px] font-bold tracking-tight text-white">
                      {showLogoImage ? (
                        <img
                          src={previewLogo}
                          alt="Logo"
                          className="h-full w-full object-cover"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <span>{initials}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-bold uppercase tracking-wide text-white">
                        {businessName}
                      </p>
                      <p className="mt-0.5 text-[11px] text-blue-200">{profileTypeLabel}</p>
                    </div>
                  </div>
                </div>

                {/* Cuerpo blanco */}
                <div className="space-y-3.5 px-5 pt-5 pb-8">

                  {/* Folio */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-[13px] font-semibold text-slate-700">Cotización</span>
                    <span className="text-[12px] text-slate-400">#CTZ-0001</span>
                  </div>

                  {/* Conceptos */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-[12px] text-slate-500">Diseño y Desarrollo</span>
                      <span className="shrink-0 text-[12px] text-slate-500">$12,500.00</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-[12px] text-slate-500">Mantenimiento</span>
                      <span className="shrink-0 text-[12px] text-slate-500">$2,800.00</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between gap-2 border-t border-slate-200 pt-3">
                    <span className="text-[13px] font-bold text-slate-900">Total</span>
                    <span className="text-[13px] font-bold text-[#2f5fe3]">$15,300.00</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </aside>
  )
}