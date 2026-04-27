"use client"

import { AnimatePresence, motion } from "framer-motion"

import {
  previewMockupPanelVariants,
  previewStepChangeVariants,
} from "../animations/preview.motion"
import styles from "../Preview.module.css"

import CardCrear from "./cards/CardCrear"
import CardPlantilla from "./cards/CardPlantilla"
import CardPreview from "./cards/CardPreview"
import CardPDF from "./cards/CardPDF"
import CardEnviar from "./cards/CardEnviar"

type PreviewMockupProps = {
  active: number
}

const previewCards = [
  CardCrear,
  CardPlantilla,
  CardPreview,
  CardPDF,
  CardEnviar,
]

export default function PreviewMockup({ active }: PreviewMockupProps) {
  const CardComponent = previewCards[active]

  return (
    <motion.div
      className={styles.mockupPanel}
      variants={previewMockupPanelVariants}
      initial="hidden"
      whileInView="show"
      whileHover="hover"
      viewport={{ once: true, amount: 0.25 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          className={styles.mockupInner}
          variants={previewStepChangeVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <CardComponent />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
