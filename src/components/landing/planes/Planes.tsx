"use client"

import { motion, type Variants } from "framer-motion"

import PlanesGrid from "./PlanesGrid"
import PlanesStyles from "./PlanesStyles"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
}

const noteVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 1.4,
      ease: easeOut,
    },
  },
}

export default function Planes() {
  return (
    <>
      <PlanesStyles />

      <section className="planes-section" id="planes">
        <div
          className="deco-circle"
          style={{
            width: 400,
            height: 400,
            top: -110,
            right: -90,
          }}
        />

        <div
          className="deco-circle"
          style={{
            width: 240,
            height: 240,
            bottom: -60,
            left: -50,
          }}
        />

        <div
          className="deco-circle"
          style={{
            width: 160,
            height: 160,
            top: "38%",
            left: "43%",
          }}
        />

        <div className="planes-inner">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="planes-badge">Precios</div>

            <h2 className="planes-title">Planes para cada necesidad</h2>

            <p className="planes-sub">
              Empieza gratis y escala conforme tu negocio crece. Sin contratos,
              cancela cuando quieras.
            </p>
          </motion.div>

          <PlanesGrid />

          <motion.p
            className="planes-note"
            variants={noteVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Precios en MXN · IVA no incluido · Cancela en cualquier momento
          </motion.p>
        </div>
      </section>
    </>
  )
}
