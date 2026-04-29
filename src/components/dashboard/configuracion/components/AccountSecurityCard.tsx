import { AnimatePresence, motion } from "framer-motion";

import type { AccountSecurityCardProps } from "@/types/configuracion";

import { emailPanelVariants } from "../animations/configuracion.motion";
import styles from "../Configuracion.module.css";

export default function AccountSecurityCard({
  email,
  userMeta,
  activeSessions,
  isGoogleUser,
  isEditingEmail,
  newEmail,
  loading,
  setIsEditingEmail,
  setNewEmail,
  onUpdateEmail,
  onChangePassword,
  onLogoutAll,
  onOpenDeleteModal,
  formatRelativeTime,
}: AccountSecurityCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div className={styles.headIcon}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <p className={styles.headTitle}>Cuenta y seguridad</p>
      </div>

      <div className={styles.body}>
        <div
          className={styles.row}
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            gap: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p className={styles.label}>Correo electrónico</p>
              <p className={styles.hint}>{email || "Sin correo"}</p>
            </div>

            {!isEditingEmail && (
              <button
                className={`${styles.button} ${styles.buttonOutline}`}
                onClick={() => {
                  setIsEditingEmail(true);
                  setNewEmail(email || "");
                }}
              >
                Cambiar
              </button>
            )}
          </div>

          <AnimatePresence initial={false}>
            {isEditingEmail && (
              <motion.div
                key="email-panel"
                className={styles.emailPanel}
                variants={emailPanelVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                style={{ overflow: "hidden" }}
              >
                <p className={styles.emailPanelLabel}>
                  Nuevo correo electrónico
                </p>

                <input
                  className={styles.input}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  type="email"
                  autoFocus
                />

                <div className={styles.emailPanelActions}>
                  <button
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    onClick={onUpdateEmail}
                    disabled={loading}
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    {loading ? (
                      <>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            strokeOpacity="0.25"
                          />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Guardar cambio
                      </>
                    )}
                  </button>

                  <button
                    className={`${styles.button} ${styles.buttonDangerSoft}`}
                    onClick={() => {
                      setIsEditingEmail(false);
                      setNewEmail("");
                    }}
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    Cancelar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.row}>
          <div>
            <p className={styles.label}>Contraseña</p>
            <p className={styles.hint}>
              {userMeta?.updatedAt
                ? `Última actualización ${formatRelativeTime(
                    userMeta.updatedAt
                  )}`
                : "Sin datos"}
            </p>
          </div>

          <button
            className={`${styles.button} ${styles.buttonOutline}`}
            onClick={onChangePassword}
          >
            Cambiar
          </button>
        </div>

        <div className={styles.row}>
          <div>
            <p className={styles.label}>Sesiones activas</p>
            <p className={styles.hint}>
              {isGoogleUser
                ? "Sesión activa vía Google"
                : activeSessions !== null
                ? activeSessions === 1
                  ? "1 dispositivo conectado"
                  : `${activeSessions} dispositivos conectados`
                : "Sin datos"}
            </p>
          </div>

          <button
            className={`${styles.button} ${styles.buttonOutline}`}
            onClick={onLogoutAll}
          >
            Cerrar sesiones
          </button>
        </div>

        <div style={{ flex: 1 }} />

        <div className={styles.dangerZone} />

        <div className={styles.dangerRow}>
          <div>
            <p className={styles.label} style={{ color: "var(--error)" }}>
              Eliminar cuenta
            </p>

            <p className={styles.hint}>Acción permanente e irreversible</p>
          </div>

          <button
            className={`${styles.button} ${styles.buttonDangerSoft}`}
            onClick={onOpenDeleteModal}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
