"use client"

import {
  BadgeCheck,
  Building2,
  Loader2,
  Map,
  MapPin,
  Pencil,
  Phone,
  RotateCcw,
  Save,
  X,
} from "lucide-react"
import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useState,
} from "react"
import type { ProfileFormValues } from "@/types/profile"

type PerfilFormCardProps = {
  values: ProfileFormValues
  saving: boolean
  error: string | null
  successMessage: string | null
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onReset: () => void
  onCancel?: () => void
  onEditClick?: () => void
  isEditing?: boolean
  initials?: string
  logoUrl?: string
  onLogoChange?: (file: File) => void
}

type FieldProps = {
  label: string
  name: keyof ProfileFormValues
  value: string
  placeholder: string
  disabled: boolean
  icon: ReactNode
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function Field({
  label,
  name,
  value,
  placeholder,
  disabled,
  icon,
  onChange,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-[11px] font-semibold"
        style={{ color: "var(--foreground)" }}
      >
        {label}
      </span>

      <div className="relative w-full">
        <div
          className="pointer-events-none absolute left-2.5 top-[10px] flex items-center"
          style={{ color: "var(--primary)" }}
        >
          {icon}
        </div>

        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full rounded-lg border px-3 py-2 pl-8 text-[12px] outline-none disabled:cursor-not-allowed"
          style={{
            backgroundColor: disabled
              ? "color-mix(in srgb, var(--background) 80%, var(--card))"
              : "var(--card)",
            borderColor: "color-mix(in srgb, var(--border) 75%, transparent)",
            color: disabled ? "var(--text-muted)" : "var(--foreground)",
          }}
        />
      </div>
    </div>
  )
}

export default function PerfilFormCard({
  values,
  saving,
  error,
  successMessage,
  onChange,
  onSubmit,
  onReset,
  onCancel,
  onEditClick,
  isEditing: isEditingProp,
  initials = "FD",
  logoUrl,
  onLogoChange,
}: PerfilFormCardProps) {
  const [isEditing, setIsEditing] = useState(isEditingProp ?? false)

  const handleEditClick = () => {
    setIsEditing(true)
    onEditClick?.()
  }

  const handleCancel = () => {
    setIsEditing(false)
    onReset()
    onCancel?.()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    onSubmit(e)
    setIsEditing(false)
  }

  const handleLogoClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/jpeg,image/png,image/webp"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) onLogoChange?.(file)
    }
    input.click()
  }

  return (
    <section
      className="w-full overflow-hidden rounded-[16px] border"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "color-mix(in srgb, var(--border) 75%, transparent)",
        boxShadow:
          "0 8px 20px color-mix(in srgb, var(--foreground) 4%, transparent)",
      }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-3"
        style={{
          borderColor: "color-mix(in srgb, var(--border) 75%, transparent)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: "var(--primary-soft)",
              color: "var(--primary)",
            }}
          >
            <BadgeCheck size={15} />
          </div>

          <div>
            <h3
              className="text-[13px] font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Datos principales
            </h3>

            <p
              className="text-[11px]"
              style={{ color: "var(--text-muted)" }}
            >
              Edita tu información. Los cambios se guardan en tu perfil real.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Nombre comercial"
            name="businessName"
            value={values.businessName}
            placeholder="Fernando Dev"
            disabled={!isEditing || saving}
            icon={<Building2 size={13} />}
            onChange={onChange}
          />

          <Field
            label="Teléfono"
            name="phone"
            value={values.phone}
            placeholder="+52 668 123 4567"
            disabled={!isEditing || saving}
            icon={<Phone size={13} />}
            onChange={onChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Ciudad"
            name="city"
            value={values.city}
            placeholder="Los Mochis"
            disabled={!isEditing || saving}
            icon={<MapPin size={13} />}
            onChange={onChange}
          />

          <Field
            label="Estado"
            name="state"
            value={values.state}
            placeholder="Sinaloa"
            disabled={!isEditing || saving}
            icon={<Map size={13} />}
            onChange={onChange}
          />
        </div>

        <div>
          <span
            className="text-[11px] font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Logo del perfil
          </span>

          <div
            className="mt-1.5 flex items-center justify-between rounded-lg border px-3 py-2"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--background) 65%, var(--card))",
              borderColor: "color-mix(in srgb, var(--border) 75%, transparent)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg text-[12px] font-bold"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--card)",
                }}
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>

              <div>
                <p
                  className="text-[12px] font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  Logo actual
                </p>

                <p
                  className="text-[10px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  JPG, PNG o WEBP · Máx. 2MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogoClick}
              disabled={!isEditing || saving}
              className="rounded-lg border px-3 py-1.5 text-[11px] font-semibold disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "color-mix(in srgb, var(--border) 75%, transparent)",
                color: "var(--primary)",
              }}
            >
              Cambiar logo
            </button>
          </div>
        </div>

        {(error || successMessage) && (
          <div
            className="rounded-lg border px-3 py-2 text-[11px] leading-relaxed"
            style={{
              backgroundColor: error ? "var(--error-bg)" : "var(--success-bg)",
              borderColor: error
                ? "color-mix(in srgb, var(--error) 35%, var(--border))"
                : "color-mix(in srgb, var(--success) 35%, var(--border))",
              color: error ? "var(--error)" : "var(--success)",
            }}
          >
            {error || successMessage}
          </div>
        )}

        <div
          className="flex items-center justify-between gap-2 border-t pt-3"
          style={{
            borderColor: "color-mix(in srgb, var(--border) 75%, transparent)",
          }}
        >
          {!isEditing ? (
            <div className="flex w-full justify-end">
              <button
                type="button"
                onClick={handleEditClick}
                className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-[12px] font-bold"
                style={{
                  backgroundColor: "var(--primary-soft)",
                  borderColor:
                    "color-mix(in srgb, var(--primary) 24%, var(--border))",
                  color: "var(--primary)",
                }}
              >
                <Pencil size={12} />
                Editar perfil
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={onReset}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  backgroundColor: "var(--warning-bg)",
                  borderColor:
                    "color-mix(in srgb, var(--warning) 35%, var(--border))",
                  color: "var(--warning)",
                }}
              >
                <RotateCcw size={12} />
                Restablecer
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    backgroundColor: "var(--error-bg)",
                    borderColor:
                      "color-mix(in srgb, var(--error) 35%, var(--border))",
                    color: "var(--error)",
                  }}
                >
                  <X size={12} />
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-[12px] font-bold disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    backgroundColor: "var(--primary)",
                    borderColor: "var(--primary)",
                    color: "var(--card)",
                  }}
                >
                  {saving ? (
                    <>
                      <Loader2 size={12} />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save size={12} />
                      Guardar cambios
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </section>
  )
}
