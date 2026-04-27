"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import {
  footerBottomVariants,
  footerCardVariants,
  footerHeaderVariants,
  footerLeftVariants,
} from "./animations/footer.motion"
import styles from "./Footer.module.css"

const MotionLink = motion.create(Link)

export default function Footer() {
  return (
    <footer className={styles.footerRoot} aria-label="Sección final">
      <div className={styles.footerGlow} aria-hidden="true" />
      <div className={styles.footerGlowLeft} aria-hidden="true" />

      <div className={styles.footerMain}>
        <motion.div
          className={styles.footerLeft}
          variants={footerLeftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          <motion.div
            className={styles.footerLeftTop}
            variants={footerHeaderVariants}
          >
            <div className={styles.footerBadge}>
              <svg
                className={styles.footerBadgeIcon}
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M7 1l1.5 4h4l-3.2 2.4 1.2 4L7 9l-3.5 2.4 1.2-4L1.5 5h4z"
                  fill="currentColor"
                />
              </svg>
              Empieza ahora
            </div>

            <h2 className={styles.footerTitle}>
              Convierte tus cotizaciones en una experiencia{" "}
              <span className={styles.footerTitleItalic}>más profesional</span>
            </h2>

            <p className={styles.footerSubtitle}>
              Crea, personaliza y comparte propuestas claras en menos tiempo,
              sin instalaciones ni procesos complicados.
            </p>

            <div className={styles.footerActions}>
              <MotionLink
                href="/auth/register?plan=free"
                className={styles.primaryButton}
              >
                ✦ Crear cuenta gratis
              </MotionLink>
            </div>
          </motion.div>

          <div className={styles.footerLeftBottom}>
            <p className={styles.footerBrandText}>
              La forma más rápida de crear cotizaciones profesionales que
              transmiten confianza.
            </p>
          </div>
        </motion.div>

        <motion.div
          className={styles.footerRight}
          variants={footerCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          <div className={styles.footerMockup} aria-hidden="true">
            {/* Tarjeta CLÁSICA */}
            <div className={`${styles.footerCard} ${styles.footerCardLeft}`}>
              <div className={styles.footerCardHeader}>
                <div>
                  <div className={styles.footerCardBrand}>CotizaApp</div>
                  <div className={styles.footerCardCompany}>
                    Mi Empresa S.A. de C.V.
                  </div>
                </div>
                <div className={styles.footerCardNum}>
                  COT-2026-045
                  <br />
                  12/04/2026
                </div>
              </div>

              <div className={styles.footerCardClientLabel}>Cliente</div>
              <div className={styles.footerCardClientName}>
                Constructora Norte SA
              </div>

              <div className={styles.footerCardValidity}>
                <span>Vigencia</span>
                <span>15 días</span>
              </div>

              <div className={styles.footerCardRows}>
                <div className={styles.footerCardRow}>
                  <span>Diseño web</span>
                  <span className={styles.footerCardRowVal}>$4,500</span>
                </div>
                <div className={styles.footerCardRow}>
                  <span>Branding</span>
                  <span className={styles.footerCardRowVal}>$2,800</span>
                </div>
                <div className={styles.footerCardRow}>
                  <span>SEO</span>
                  <span className={styles.footerCardRowVal}>$1,200</span>
                </div>
              </div>

              <div className={styles.footerCardDivider} />

              <div className={styles.footerCardTotal}>
                <span className={styles.footerCardTotalLabel}>TOTAL</span>
                <span className={styles.footerCardTotalVal}>$8,500</span>
              </div>

              <span
                className={`${styles.footerCardBadge} ${styles.badgeClassic}`}
              >
                <span className={styles.badgeDot} /> Clásica
              </span>
            </div>

            {/* Tarjeta PRO (centro) */}
            <div className={`${styles.footerCard} ${styles.footerCardMain}`}>
              <div className={styles.footerCardHeader}>
                <div>
                  <div className={styles.footerCardBrand}>CotizaApp</div>
                  <div className={styles.footerCardCompany}>
                    Mi Empresa S.A. de C.V.
                  </div>
                </div>
                <div className={styles.footerCardNum}>
                  COT-2026-047
                  <br />
                  26/04/2026
                </div>
              </div>

              <div className={styles.footerCardClientLabel}>Cliente</div>
              <div className={styles.footerCardClientName}>
                Digital Mind Agency
              </div>

              <div className={styles.footerCardValidity}>
                <span>Vigencia</span>
                <span>30 días</span>
              </div>

              <div className={styles.footerCardRows}>
                <div className={styles.footerCardRow}>
                  <span>Estrategia digital</span>
                  <span className={styles.footerCardRowVal}>$7,000</span>
                </div>
                <div className={styles.footerCardRow}>
                  <span>Campaña SEM</span>
                  <span className={styles.footerCardRowVal}>$4,500</span>
                </div>
                <div className={styles.footerCardRow}>
                  <span>Analítica mensual</span>
                  <span className={styles.footerCardRowVal}>$3,600</span>
                </div>
                <div className={styles.footerCardRow}>
                  <span>Reporte ejecutivo</span>
                  <span className={styles.footerCardRowVal}>$2,400</span>
                </div>
              </div>

              <div className={styles.footerCardDivider} />

              <div className={styles.footerCardTotal}>
                <span className={styles.footerCardTotalLabel}>TOTAL</span>
                <span className={styles.footerCardTotalVal}>$17,500</span>
              </div>

              <span className={`${styles.footerCardBadge} ${styles.badgePro}`}>
                <span className={styles.badgeDot} /> Pro
              </span>
            </div>

            {/* Tarjeta PREMIUM */}
            <div className={`${styles.footerCard} ${styles.footerCardRight}`}>
              <div className={styles.footerCardHeader}>
                <div>
                  <div className={styles.footerCardBrand}>CotizaApp</div>
                  <div className={styles.footerCardCompany}>
                    Mi Empresa S.A. de C.V.
                  </div>
                </div>
                <div className={styles.footerCardNum}>
                  COT-2026-043
                  <br />
                  08/04/2026
                </div>
              </div>

              <div className={styles.footerCardClientLabel}>Cliente</div>
              <div className={styles.footerCardClientName}>
                Verde Consulting
              </div>

              <div className={styles.footerCardValidity}>
                <span>Vigencia</span>
                <span>15 días</span>
              </div>

              <div className={styles.footerCardRows}>
                <div className={styles.footerCardRow}>
                  <span>Consultoría ambiental</span>
                  <span className={styles.footerCardRowVal}>$4,900</span>
                </div>
                <div className={styles.footerCardRow}>
                  <span>Plan de impacto</span>
                  <span className={styles.footerCardRowVal}>$2,800</span>
                </div>
                <div className={styles.footerCardRow}>
                  <span>Certificación ISO</span>
                  <span className={styles.footerCardRowVal}>$3,200</span>
                </div>
              </div>

              <div className={styles.footerCardDivider} />

              <div className={styles.footerCardTotal}>
                <span className={styles.footerCardTotalLabel}>TOTAL</span>
                <span className={styles.footerCardTotalVal}>$10,900</span>
              </div>

              <span
                className={`${styles.footerCardBadge} ${styles.badgePremium}`}
              >
                <span className={styles.badgeDot} /> Premium
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className={styles.footerDivider} />

      {/* ── Copyright: ── */}
      <motion.div
        className={styles.footerBottom}
        variants={footerBottomVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <p className={styles.footerCopy}>
          © 2026 CotizaApp. Todos los derechos reservados.
        </p>
      </motion.div>
    </footer>
  )
}