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
import { type ChangeEvent, type FormEvent, useState } from "react"
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
  icon: React.ReactNode
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function Field({ label, name, value, placeholder, disabled, icon, onChange }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold text-[#10254d]">{label}</span>
      <div className="relative w-full">
        <div className="pointer-events-none absolute left-2.5 top-[10px] flex items-center text-[#2f5fe3]">
          {icon}
        </div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-lg border px-3 py-2 pl-8 text-[12px] outline-none transition-all
            ${disabled ? "cursor-not-allowed border-[#dbe6f7] bg-[#f4f8ff] text-slate-400"
              : "border-[#dbe6f7] bg-white text-[#10254d] focus:border-[#2f5fe3] focus:ring-1 focus:ring-[#2f5fe3]/10"}`}
        />
      </div>
    </div>
  )
}

export default function PerfilFormCard({
  values, saving, error, successMessage, onChange, onSubmit, onReset, onCancel,
  onEditClick, isEditing: isEditingProp, initials = "FD", logoUrl, onLogoChange,
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
    <section className="w-full overflow-hidden rounded-[16px] border border-[#dbe6f7] bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#dbe6f7] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#eef4ff] text-[#2f5fe3]">
            <BadgeCheck size={15} />
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-[#10254d]">Datos principales</h3>
            <p className="text-[11px] text-slate-500">Edita tu información. Los cambios se guardan en tu perfil real.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-3">

        {/* Nombre + Teléfono */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nombre comercial" name="businessName" value={values.businessName}
            placeholder="Fernando Dev" disabled={!isEditing || saving} icon={<Building2 size={13} />} onChange={onChange} />
          <Field label="Teléfono" name="phone" value={values.phone}
            placeholder="+52 668 123 4567" disabled={!isEditing || saving} icon={<Phone size={13} />} onChange={onChange} />
        </div>

        {/* Ciudad + Estado */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Ciudad" name="city" value={values.city}
            placeholder="Los Mochis" disabled={!isEditing || saving} icon={<MapPin size={13} />} onChange={onChange} />
          <Field label="Estado" name="state" value={values.state}
            placeholder="Sinaloa" disabled={!isEditing || saving} icon={<Map size={13} />} onChange={onChange} />
        </div>

        {/* Logo */}
        <div>
          <span className="text-[11px] font-semibold text-[#10254d]">Logo del perfil</span>
          <div className="mt-1.5 flex items-center justify-between rounded-lg border border-[#dbe6f7] bg-[#f8fbff] px-3 py-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#10254d] text-[12px] font-bold text-white">
                {logoUrl ? <img src={logoUrl} alt="Logo" className="h-full w-full object-cover" /> : <span>{initials}</span>}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#10254d]">Logo actual</p>
                <p className="text-[10px] text-slate-400">JPG, PNG o WEBP · Máx. 2MB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogoClick}
              disabled={!isEditing || saving}
              className="rounded-lg border border-[#dbe6f7] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#2f5fe3] hover:bg-[#eef4ff] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cambiar logo
            </button>
          </div>
        </div>

        {/* Alertas */}
        {(error || successMessage) && (
          <div className={`rounded-lg border px-3 py-2 text-[11px] leading-relaxed ${
            error ? "border-red-200 bg-red-50 text-red-600" : "border-green-200 bg-green-50 text-green-700"}`}>
            {error || successMessage}
          </div>
        )}

        {/* Botones */}
        <div className="flex items-center justify-between gap-2 border-t border-[#dbe6f7] pt-3">

          {!isEditing ? (
            /* Vista: solo botón Editar */
            <div className="flex w-full justify-end">
              <button
                type="button"
                onClick={handleEditClick}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#cfe0ff] bg-[#eef4ff] px-4 py-2 text-[12px] font-bold text-[#173b72] hover:bg-[#e3edff] transition"
              >
                <Pencil size={12} />
                Editar perfil
              </button>
            </div>
          ) : (
            /* Modo edición: Restablecer | Cancelar + Guardar */
            <>
              <button
                type="button" onClick={onReset} disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#cfe0ff] bg-[#eef4ff] px-3 py-2 text-[12px] font-semibold text-[#10254d] hover:bg-[#e3edff] transition disabled:border-[#dbe6f7] disabled:bg-[#f4f8ff] disabled:text-slate-400"
              >
                <RotateCcw size={12} />
                Restablecer
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button" onClick={handleCancel} disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] font-semibold text-red-600 hover:bg-red-100 transition disabled:border-red-100 disabled:bg-red-50 disabled:text-red-300"
                >
                  <X size={12} />
                  Cancelar
                </button>
                <button
                  type="submit" disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2 text-[12px] font-bold text-white hover:bg-emerald-700 transition disabled:border-emerald-300 disabled:bg-emerald-300 disabled:text-white"
                >
                  {saving ? <><Loader2 size={12} className="animate-spin" />Guardando...</> : <><Save size={12} />Guardar cambios</>}
                </button>
              </div>
            </>
          )}

        </div>

      </form>
    </section>
  )
}
