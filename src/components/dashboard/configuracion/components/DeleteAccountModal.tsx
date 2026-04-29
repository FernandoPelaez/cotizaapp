import { motion } from "framer-motion";

import type { DeleteAccountModalProps } from "@/types/configuracion";

import { modalContentVariants } from "../animations/configuracion.motion";
import styles from "../Configuracion.module.css";

export default function DeleteAccountModal({
  deleteConfirmText,
  setDeleteConfirmText,
  deleteLoading,
  onClose,
  onConfirm,
}: DeleteAccountModalProps) {
  const canDelete = deleteConfirmText === "ELIMINAR";

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "color-mix(in srgb, var(--foreground) 65%, transparent)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <motion.div
        variants={modalContentVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--card)",
          borderRadius: 22,
          padding: "2.25rem",
          width: "90%",
          maxWidth: 420,
          boxShadow:
            "0 32px 80px color-mix(in srgb, var(--foreground) 25%, transparent)",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "var(--error-bg)",
            border:
              "1.5px solid color-mix(in srgb, var(--error) 35%, var(--border))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.25rem",
            color: "var(--error)",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </div>

        <h3
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "var(--foreground)",
            margin: "0 0 0.45rem",
            letterSpacing: "-0.02em",
          }}
        >
          ¿Eliminar tu cuenta?
        </h3>

        <p
          style={{
            fontSize: 13.5,
            color: "var(--text-muted)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          Esta acción es{" "}
          <strong style={{ color: "var(--error)" }}>
            permanente e irreversible
          </strong>
          . Se eliminarán todos tus datos, cotizaciones y configuraciones.
        </p>

        <div className={styles.confirmBox}>
          <p className={styles.confirmLabel}>Escribe ELIMINAR para confirmar</p>

          <input
            className={`${styles.input} ${styles.inputDanger}`}
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            placeholder="ELIMINAR"
            autoFocus
          />
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <button
            onClick={onClose}
            className={`${styles.button} ${styles.buttonOutline}`}
            style={{
              flex: 1,
              justifyContent: "center",
              height: 42,
              borderRadius: 11,
              fontSize: 13,
            }}
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            disabled={deleteLoading || !canDelete}
            style={{
              flex: 1,
              height: 42,
              borderRadius: 11,
              border: "none",
              background: canDelete
                ? "var(--error)"
                : "color-mix(in srgb, var(--error) 24%, var(--card))",
              fontSize: 13,
              fontWeight: 700,
              color: "var(--card)",
              cursor: deleteLoading || !canDelete ? "not-allowed" : "pointer",
              opacity: deleteLoading ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              fontFamily: "inherit",
              boxShadow: canDelete
                ? "0 4px 14px color-mix(in srgb, var(--error) 30%, transparent)"
                : "none",
            }}
          >
            {deleteLoading ? (
              <>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                Eliminando...
              </>
            ) : (
              <>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                </svg>
                Sí, eliminar cuenta
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}