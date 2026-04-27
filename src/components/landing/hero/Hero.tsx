"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

import {
  heroLeftItemVariants,
  heroLeftVariants,
  heroPreviewVariants,
  templateCardVariants,
} from "./animations/hero.motion"
import TemplateMiniPreview from "./components/TemplateMiniPreview"
import TypewriterText from "./components/TypewriterText"
import { heroTemplates } from "./data/heroTemplates.data"
import styles from "./Hero.module.css"

export default function Hero() {
  const [typewriterActive, setTypewriterActive] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const timer = setTimeout(() => setTypewriterActive(true), 1750)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className={styles.heroSection} id="hero">
      <div className={styles.heroGridBg} />
      <div className={styles.heroGlow1} />
      <div className={styles.heroGlow2} />

      <div className={styles.heroInner}>
        <motion.div
          className={styles.heroLeft}
          variants={heroLeftVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className={styles.heroTitle}
            variants={heroLeftItemVariants}
          >
            Genera cotizaciones{" "}
            <span className={styles.heroTitleAccent}>listas para enviar</span>{" "}
            en plantillas{" "}
            <span className={styles.typewriterPlaceholder}>
              <TypewriterText canStart={typewriterActive} />
            </span>
          </motion.h1>

          <motion.p
            className={styles.heroSub}
            variants={heroLeftItemVariants}
          >
            Crea cotizaciones sin esfuerzo. Ahorra tiempo, evita errores y
            mejora la presentación de tus propuestas ante cada cliente.
          </motion.p>

          <motion.div
            className={styles.heroActions}
            variants={heroLeftItemVariants}
          >
            <motion.div
              className={styles.btnMotionWrap}
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -1, 0],
                      filter: [
                        "drop-shadow(0 6px 18px rgba(59,130,246,0.18))",
                        "drop-shadow(0 10px 26px rgba(59,130,246,0.28))",
                        "drop-shadow(0 6px 18px rgba(59,130,246,0.18))",
                      ],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <motion.div
                whileHover={{
                  y: -3,
                  scale: 1.035,
                  filter: "drop-shadow(0 12px 30px rgba(59,130,246,0.38))",
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  type: "spring",
                  stiffness: 360,
                  damping: 20,
                }}
              >
                <Link href="/auth/register" className={styles.btnHero}>
                  <motion.span
                    className={styles.btnHeroSheen}
                    aria-hidden="true"
                    initial={{ x: "-130%", opacity: 0 }}
                    animate={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : {
                            x: ["-130%", "130%"],
                            opacity: [0, 0.65, 0],
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : {
                            duration: 2.8,
                            repeat: Infinity,
                            repeatDelay: 1.1,
                            ease: "easeInOut",
                          }
                    }
                  />

                  <span className={styles.btnHeroContent}>
                    <motion.svg
                      className={styles.sparkle}
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              rotate: [0, -5, 5, 0],
                              scale: [1, 1.08, 1],
                            }
                      }
                      transition={
                        shouldReduceMotion
                          ? undefined
                          : {
                              duration: 2.6,
                              repeat: Infinity,
                              repeatDelay: 0.4,
                              ease: "easeInOut",
                            }
                      }
                    >
                      <path d="M12 3l1.6 4.6L18 9.2l-4.4 1.6L12 15.4l-1.6-4.6L6 9.2l4.4-1.6L12 3z" />
                      <path d="M19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" />
                      <path d="M5 15l.9 2.6 2.6.9-2.6.9L5 22l-.9-2.6-2.6-.9 2.6-.9L5 15z" />
                    </motion.svg>

                    <span className={styles.textButton}>Empezar gratis</span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.heroRight}
          variants={heroPreviewVariants}
          initial="hidden"
          animate="show"
        >
          <div className={styles.plantillasWrapper}>
            <div className={styles.plantillasHeader}>
              <div>
                <div className={styles.plantillasTitle}>Plantillas</div>
                <div className={styles.plantillasSub}>
                  Las más modernas y premium
                </div>
              </div>

              <div className={styles.plantillasCount}>
                {heroTemplates.length} plantillas
              </div>
            </div>

            <div className={styles.plantillasGrid}>
              {heroTemplates.map((template, index) => (
                <motion.div
                  key={template.nombre}
                  className={styles.plantillaCard}
                  custom={index}
                  variants={templateCardVariants}
                  initial="hidden"
                  animate="show"
                  whileHover={{
                    y: -6,
                    scale: 1.025,
                    borderColor: "#93c5fd",
                    boxShadow:
                      "0 18px 44px rgba(0,0,0,0.5), 0 0 0 1px rgba(147,197,253,0.3)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <TemplateMiniPreview
                    color={template.color}
                    acento={template.acento}
                    cliente={template.cliente}
                    numero={template.numero}
                    items={template.items}
                    total={template.total}
                  />

                  <div className={styles.plantillaCardBody}>
                    <div className={styles.plantillaBadge}>
                      {template.tipo}
                    </div>

                    <div className={styles.plantillaType}>
                      Plantilla estándar · {template.nombre}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
