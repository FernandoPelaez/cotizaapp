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

function Avatar({
  showImage,
  src,
  initials,
  onError,
  size = "lg",
}: AvatarProps) {
  return (
    <div
      className={
        size === "lg"
          ? "flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full text-[26px] font-bold tracking-tight"
          : "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full text-[14px] font-bold tracking-tight"
      }
      style={{
        backgroundColor:
          size === "lg"
            ? "var(--primary-soft)"
            : "color-mix(in srgb, var(--card) 20%, transparent)",
        color: size === "lg" ? "var(--primary)" : "var(--card)",
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt="Logo"
          className="h-full w-full object-cover"
          onError={onError}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

function ContactRow({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div
      className="flex items-center gap-2.5 text-[13px]"
      style={{ color: "var(--text-muted)" }}
    >
      <div
        className="flex h-4 w-4 shrink-0 items-center justify-center"
        style={{ color: "var(--primary)" }}
      >
        {icon}
      </div>

      <span className="truncate">{text}</span>
    </div>
  )
}

export default function PerfilOverviewCard({
  user,
  values,
  initials,
}: PerfilOverviewCardProps) {
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
      <section
        className="h-full w-full overflow-hidden rounded-[16px] border"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "color-mix(in srgb, var(--border) 75%, transparent)",
          boxShadow:
            "0 8px 20px color-mix(in srgb, var(--foreground) 4%, transparent)",
        }}
      >
        <div className="flex h-full w-full flex-col px-6 py-6">
          <div className="mb-5 flex justify-end">
            <span
              className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium"
              style={{
                backgroundColor: "var(--card)",
                borderColor:
                  "color-mix(in srgb, var(--border) 75%, transparent)",
                color: "var(--text-muted)",
                boxShadow:
                  "0 8px 20px color-mix(in srgb, var(--foreground) 4%, transparent)",
              }}
            >
              <svg
                className="h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Vista previa en cotización
            </span>
          </div>

          <div className="flex flex-1 items-start gap-6">
            <div className="flex min-w-0 flex-1 flex-col gap-5">
              <div className="flex items-center gap-3">
                <Avatar
                  showImage={showLogoImage}
                  src={previewLogo}
                  initials={initials}
                  onError={() => setImageError(true)}
                  size="lg"
                />

                <div className="min-w-0">
                  <p
                    className="truncate text-[18px] font-bold leading-snug"
                    style={{ color: "var(--foreground)" }}
                  >
                    {businessName}
                  </p>

                  <span
                    className="mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{
                      backgroundColor: "var(--primary-soft)",
                      color: "var(--primary)",
                    }}
                  >
                    {profileTypeLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <ContactRow icon={<Mail className="h-4 w-4" />} text={email} />
                <ContactRow icon={<Phone className="h-4 w-4" />} text={phone} />
                <ContactRow
                  icon={<MapPin className="h-4 w-4" />}
                  text={location}
                />
              </div>
            </div>

            <div className="w-[270px] shrink-0">
              <div
                className="overflow-hidden rounded-[12px] border"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor:
                    "color-mix(in srgb, var(--border) 75%, transparent)",
                  boxShadow:
                    "0 8px 24px color-mix(in srgb, var(--primary) 13%, transparent)",
                }}
              >
                <div
                  className="px-5 py-5"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      showImage={showLogoImage}
                      src={previewLogo}
                      initials={initials}
                      onError={() => setImageError(true)}
                      size="sm"
                    />

                    <div className="min-w-0">
                      <p
                        className="truncate text-[13px] font-bold uppercase tracking-wide"
                        style={{ color: "var(--card)" }}
                      >
                        {businessName}
                      </p>

                      <p
                        className="mt-0.5 text-[11px]"
                        style={{
                          color:
                            "color-mix(in srgb, var(--card) 72%, transparent)",
                        }}
                      >
                        {profileTypeLabel}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5 px-5 pb-8 pt-5">
                  <div
                    className="flex items-center justify-between border-b pb-3"
                    style={{
                      borderColor:
                        "color-mix(in srgb, var(--border) 45%, transparent)",
                    }}
                  >
                    <span
                      className="text-[13px] font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      Cotización
                    </span>

                    <span
                      className="text-[12px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      #CTZ-0001
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="min-w-0 truncate text-[12px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Diseño y Desarrollo
                      </span>

                      <span
                        className="shrink-0 text-[12px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        $12,500.00
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="min-w-0 truncate text-[12px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Mantenimiento
                      </span>

                      <span
                        className="shrink-0 text-[12px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        $2,800.00
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between gap-2 border-t pt-3"
                    style={{
                      borderColor:
                        "color-mix(in srgb, var(--border) 75%, transparent)",
                    }}
                  >
                    <span
                      className="text-[13px] font-bold"
                      style={{ color: "var(--foreground)" }}
                    >
                      Total
                    </span>

                    <span
                      className="text-[13px] font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      $15,300.00
                    </span>
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
