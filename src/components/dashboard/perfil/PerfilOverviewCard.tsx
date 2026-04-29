"use client"

import { motion } from "framer-motion"
import { useEffect, useState, type ReactNode } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

import {
  perfilOverviewContainerVariants,
  perfilOverviewChildVariants,
} from "./animations/perfil.motion"
import styles from "./Perfil.module.css"

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
    <div className={size === "lg" ? styles.avatarLarge : styles.avatarSmall}>
      {showImage ? (
        <img src={src} alt="Logo" className={styles.avatarImage} onError={onError} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

function ContactRow({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className={styles.contactRow}>
      <div className={styles.contactIcon}>{icon}</div>
      <span className={styles.contactText}>{text}</span>
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

  useEffect(() => { setImageError(false) }, [previewLogo])

  return (
    <aside className={styles.overviewAside}>
      <section className={styles.overviewCard}>
        {/* ANIMADO: contenedor orquesta el stagger de todos los hijos */}
        <motion.div
          className={styles.overviewInner}
          variants={perfilOverviewContainerVariants}
          initial="hidden"
          animate="show"
        >
          {/* badge "Vista previa" — entra primero */}
          <motion.div
            className={styles.previewBadgeWrap}
            variants={perfilOverviewChildVariants}
          >
            <span className={styles.previewBadge}>
              <svg
                className={styles.previewBadgeIcon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              Vista previa en cotización
            </span>
          </motion.div>

          <div className={styles.overviewContent}>
            <div className={styles.overviewMain}>
              {/* nombre + avatar — entra segundo */}
              <motion.div
                className={styles.profileSummary}
                variants={perfilOverviewChildVariants}
              >
                <Avatar
                  showImage={showLogoImage}
                  src={previewLogo}
                  initials={initials}
                  onError={() => setImageError(true)}
                  size="lg"
                />
                <div className={styles.profileText}>
                  <p className={styles.businessName}>{businessName}</p>
                  <span className={styles.profileTypeBadge}>{profileTypeLabel}</span>
                </div>
              </motion.div>

              {/* contactos — entran tercero */}
              <motion.div
                className={styles.contactList}
                variants={perfilOverviewChildVariants}
              >
                <ContactRow icon={<Mail size={16} />} text={email} />
                <ContactRow icon={<Phone size={16} />} text={phone} />
                <ContactRow icon={<MapPin size={16} />} text={location} />
              </motion.div>
            </div>

            {/* tarjeta cotización — entra última */}
            <motion.div
              className={styles.quotePreviewWrap}
              variants={perfilOverviewChildVariants}
            >
              <div className={styles.quotePreviewCard}>
                <div className={styles.quotePreviewHeader}>
                  <div className={styles.quotePreviewHeaderContent}>
                    <Avatar
                      showImage={showLogoImage}
                      src={previewLogo}
                      initials={initials}
                      onError={() => setImageError(true)}
                      size="sm"
                    />
                    <div className={styles.profileText}>
                      <p className={styles.previewBusinessName}>{businessName}</p>
                      <p className={styles.previewProfileType}>{profileTypeLabel}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.quotePreviewBody}>
                  <div className={styles.quotePreviewTop}>
                    <span className={styles.quoteTitle}>Cotización</span>
                    <span className={styles.quoteNumber}>#CTZ-0001</span>
                  </div>
                  <div className={styles.quoteItems}>
                    <div className={styles.quoteItem}>
                      <span className={styles.quoteItemName}>Diseño y Desarrollo</span>
                      <span className={styles.quoteItemPrice}>$12,500.00</span>
                    </div>
                    <div className={styles.quoteItem}>
                      <span className={styles.quoteItemName}>Mantenimiento</span>
                      <span className={styles.quoteItemPrice}>$2,800.00</span>
                    </div>
                  </div>
                  <div className={styles.quoteTotalRow}>
                    <span className={styles.quoteTotalLabel}>Total</span>
                    <span className={styles.quoteTotalAmount}>$15,300.00</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </aside>
  )
}
