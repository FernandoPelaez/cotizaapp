import { motion } from "framer-motion";

import type { PlanUsageCardProps } from "@/types/configuracion";

import { configuracionEase } from "../animations/configuracion.motion";
import { proFeatures } from "../data/configuracion.data";
import styles from "../Configuracion.module.css";

export default function PlanUsageCard({
  plan,
  usage,
  usedPct,
  onUpgradeClick,
}: PlanUsageCardProps) {
  const isLimitReached = usage ? usage.quotesUsed >= usage.maxQuotes : false;

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
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <p className={styles.headTitle}>Plan y uso</p>
      </div>

      <div className={styles.body}>
        <div className={styles.row}>
          <div>
            <p className={styles.label}>Plan actual</p>

            <span
              style={{
                display: "inline-block",
                marginTop: 5,
                fontSize: 10.5,
                fontWeight: 700,
                padding: "2px 10px",
                borderRadius: 20,
                background:
                  "color-mix(in srgb, var(--foreground) 6%, var(--card))",
                color: "var(--text-muted)",
                letterSpacing: "0.07em",
                border:
                  "1px solid color-mix(in srgb, var(--border) 75%, transparent)",
              }}
            >
              {plan?.name ?? "FREE"}
            </span>
          </div>
        </div>

        <div
          className={styles.row}
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            gap: 12,
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
              <p className={styles.label}>Cotizaciones usadas</p>
              <p className={styles.hint}>
                {usage
                  ? `${usage.quotesUsed} de ${usage.maxQuotes} utilizadas`
                  : "Sin datos"}
              </p>
            </div>

            {usage && (
              <span
                className={styles.badge}
                style={{
                  color: isLimitReached ? "var(--error)" : "var(--success)",
                  background: isLimitReached
                    ? "var(--error-bg)"
                    : "var(--success-bg)",
                  border: `1px solid ${
                    isLimitReached
                      ? "color-mix(in srgb, var(--error) 35%, var(--border))"
                      : "color-mix(in srgb, var(--success) 35%, var(--border))"
                  }`,
                }}
              >
                {isLimitReached
                  ? "Límite alcanzado"
                  : `${usage.remaining} disponible${
                      usage.remaining !== 1 ? "s" : ""
                    }`}
              </span>
            )}
          </div>

          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${usedPct}%` }}
              transition={{
                duration: 0.55,
                ease: configuracionEase,
              }}
              style={{
                background:
                  usedPct >= 100
                    ? "var(--error)"
                    : usedPct >= 66
                    ? "var(--warning)"
                    : "var(--success)",
              }}
            />
          </div>
        </div>

        <div
          className={styles.row}
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            gap: 0,
          }}
        >
          <p
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              margin: "0 0 8px",
            }}
          >
            Incluido en Pro
          </p>

          {proFeatures.map((text, index) => (
            <motion.div
              key={text}
              className={styles.proFeature}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.32,
                delay: 0.12 + index * 0.045,
                ease: configuracionEase,
              }}
            >
              <div className={styles.proFeatureCheck}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <span className={styles.proFeatureText}>{text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={`${styles.button} ${styles.buttonSuccess}`}
          onClick={onUpgradeClick}
          style={{
            width: "100%",
            justifyContent: "center",
            height: 40,
            borderRadius: 10,
            fontSize: 13,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          Mejorar a Pro — Ver planes
        </button>
      </div>
    </div>
  );
}
