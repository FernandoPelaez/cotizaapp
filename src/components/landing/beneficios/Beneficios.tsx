"use client"

import { motion } from "framer-motion"

import {
  beneficioCardVariants,
  beneficioIconVariants,
  beneficiosBadgeVariants,
  beneficiosTextVariants,
  beneficiosTitleVariants,
  beneficioShimmerVariants,
} from "./animations/beneficios.motion"
import { beneficiosItems } from "./data/beneficios.data"
import styles from "./Beneficios.module.css"

const beneficioGradients = [
  "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)",
  "linear-gradient(135deg, #059669 0%, #064e3b 100%)",
  "linear-gradient(135deg, #6d28d9 0%, #312e81 100%)",
  "linear-gradient(135deg, #f97316 0%, #7c2d12 100%)",
  "linear-gradient(135deg, #e11d48 0%, #881337 100%)",
  "linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%)",
  "linear-gradient(135deg, #d97706 0%, #78350f 100%)",
  "linear-gradient(135deg, #0d9488 0%, #134e4a 100%)",
]

export default function Beneficios() {
  return (
    <section className={styles.section} id="beneficios">
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.span
            className={styles.badge}
            variants={beneficiosBadgeVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Beneficios
          </motion.span>

          <motion.h2
            className={styles.title}
            variants={beneficiosTitleVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Todo lo que ganas al usar{" "}
            <span className={styles.titleAccent}>CotizaApp</span>
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            variants={beneficiosTextVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Más clientes cerrados, menos tiempo perdido y una imagen que habla
            por tu negocio.
          </motion.p>
        </div>

        <div className={styles.grid}>
          {beneficiosItems.map((item, index) => (
            <motion.article
              key={item.title}
              className={styles.card}
              custom={index}
              variants={beneficioCardVariants}
              initial="hidden"
              whileInView="show"
              whileHover="hover"
              viewport={{
                once: false,
                amount: 0.25,
              }}
            >
              {/* AJUSTE: el color de hover queda con CSS/style directo para que siempre se vea */}
              <div
                className={styles.cardOverlay}
                style={{
                  background:
                    beneficioGradients[index % beneficioGradients.length],
                }}
              />

              <motion.div
                className={styles.cardShimmer}
                variants={beneficioShimmerVariants}
                initial="rest"
              />

              <div className={styles.cardContent}>
                <motion.div
                  className={`${styles.cardIcon} ${item.iconBg}`}
                  variants={beneficioIconVariants}
                  initial="rest"
                >
                  {item.icon}
                </motion.div>

                <h3 className={styles.cardTitle}>{item.title}</h3>

                <p className={styles.cardText}>{item.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}