"use client"

import { AnimatePresence, motion } from "framer-motion"
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

import {
  perfilFormContainerVariants,
  perfilFormChildVariants,
  perfilMessageVariants,
} from "./animations/perfil.motion"
import styles from "./Perfil.module.css"

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

function Field({ label, name, value, placeholder, disabled, icon, onChange }: FieldProps) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.inputWrap}>
        <div className={styles.fieldIcon}>{icon}</div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.input}
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    onSubmit(event)
    setIsEditing(false)
  }

  const handleLogoClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/jpeg,image/png,image/webp"
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (file) onLogoChange?.(file)
    }
    input.click()
  }

  const feedbackMessage = error || successMessage

  return (
    <section className={styles.formCard}>
      {/* ANIMADO: header entra con el container */}
      <motion.div
        className={styles.formHeader}
        variants={perfilFormChildVariants}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
      >
        <div className={styles.formHeaderContent}>
          <div className={styles.formIcon}>
            <BadgeCheck size={15} />
          </div>
          <div>
            <h3 className={styles.formTitle}>Datos principales</h3>
            <p className={styles.formDescription}>
              Edita tu información. Los cambios se guardan en tu perfil real.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ANIMADO: form body con stagger en los hijos */}
      <motion.form
        onSubmit={handleSubmit}
        className={styles.formBody}
        variants={perfilFormContainerVariants}
        initial="hidden"
        animate="show"
      >
        {/* fila 1 — nombre + teléfono */}
        <motion.div
          className={styles.fieldGrid}
          variants={perfilFormChildVariants}
        >
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
        </motion.div>

        {/* fila 2 — ciudad + estado */}
        <motion.div
          className={styles.fieldGrid}
          variants={perfilFormChildVariants}
        >
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
        </motion.div>

        {/* logo — entra después de los campos */}
        <motion.div
          className={styles.logoSection}
          variants={perfilFormChildVariants}
        >
          <span className={styles.logoLabel}>Logo del perfil</span>
          <div className={styles.logoBox}>
            <div className={styles.logoInfo}>
              <div className={styles.logoAvatar}>
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className={styles.logoImage} />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div>
                <p className={styles.logoTitle}>Logo actual</p>
                <p className={styles.logoHint}>JPG, PNG o WEBP · Máx. 2MB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogoClick}
              disabled={!isEditing || saving}
              className={styles.logoButton}
            >
              Cambiar logo
            </button>
          </div>
        </motion.div>

        {/* feedback — sin cambios, ya tenía AnimatePresence */}
        <AnimatePresence mode="popLayout">
          {feedbackMessage && (
            <motion.div
              key={error ? "profile-error" : "profile-success"}
              variants={perfilMessageVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className={`${styles.feedback} ${
                error ? styles.feedbackError : styles.feedbackSuccess
              }`}
            >
              {feedbackMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* botones — entran al último */}
        <motion.div
          className={styles.formActions}
          variants={perfilFormChildVariants}
        >
          {!isEditing ? (
            <div className={styles.editActions}>
              <button
                type="button"
                onClick={handleEditClick}
                className={styles.editButton}
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
                className={styles.resetButton}
              >
                <RotateCcw size={12} />
                Restablecer
              </button>
              <div className={styles.actionGroup}>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className={styles.cancelButton}
                >
                  <X size={12} />
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={styles.saveButton}
                >
                  {saving ? (
                    <><Loader2 size={12} />Guardando...</>
                  ) : (
                    <><Save size={12} />Guardar cambios</>
                  )}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.form>
    </section>
  )
}
