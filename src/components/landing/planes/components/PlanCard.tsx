"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import type { LandingPlan } from "../data/planes.data"

import {
  planButtonTap,
  planFeatureItemVariants,
  planFeaturesContainerVariants,
} from "../animations/planes.motion"
import styles from "../Planes.module.css"
import PlanBadge from "./PlanBadge"

type PlanCardProps = {
  plan: LandingPlan
}

type PlanButtonVariant = "outline" | "filled" | "empresa"

type PlanButtonProps = {
  href: string
  cta: string
  variant: PlanButtonVariant
}

const MotionLink = motion.create(Link)

function PlanFeatures({ features }: { features: string[] }) {
  return (
    <motion.div
      className={styles.planFeatures}
      variants={planFeaturesContainerVariants}
    >
      {features.map((feature) => (
        <motion.div
          key={feature}
          className={styles.planFeatItem}
          variants={planFeatureItemVariants}
        >
          <div className={styles.featCheck} aria-hidden="true">
            ✓
          </div>

          <span>{feature}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

function PlanPrice({ precio, periodo }: { precio: string; periodo: string }) {
  return (
    <div className={styles.planPriceRow}>
      <span className={styles.planPriceNum}>{precio}</span>

      {periodo ? <span className={styles.planPricePer}>{periodo}</span> : null}
    </div>
  )
}

function PlanButton({ href, cta, variant }: PlanButtonProps) {
  const buttonClassName = {
    outline: styles.btnOutlinePlan,
    filled: styles.btnFilledPlan,
    empresa: styles.btnEmpresaPlan,
  }[variant]

  return (
    <MotionLink href={href} className={buttonClassName} whileTap={planButtonTap}>
      {cta}
    </MotionLink>
  )
}

function PlanContent({
  plan,
  buttonVariant,
  showSpacer = false,
}: {
  plan: LandingPlan
  buttonVariant: PlanButtonVariant
  showSpacer?: boolean
}) {
  return (
    <>
      {showSpacer ? <div style={{ height: 34 }} aria-hidden="true" /> : null}

      <div className={styles.planName}>{plan.nombre}</div>

      <PlanPrice precio={plan.precio} periodo={plan.periodo} />

      <div className={styles.planDivider} />

      <PlanFeatures features={plan.features} />

      <PlanButton href={plan.href} cta={plan.cta} variant={buttonVariant} />
    </>
  )
}

export default function PlanCard({ plan }: PlanCardProps) {
  if (plan.popular) {
    return (
      <div className={styles.proShell}>
        <div className={styles.proShellBg} aria-hidden="true" />

        <div className={styles.proInner}>
          <PlanBadge type="popular" />

          <PlanContent plan={plan} buttonVariant="filled" />
        </div>
      </div>
    )
  }

  if (plan.premium) {
    return (
      <div className={styles.premiumCard}>
        <PlanBadge type="premium" />

        <PlanContent plan={plan} buttonVariant="empresa" />
      </div>
    )
  }

  return (
    <div className={styles.planCard}>
      <PlanContent plan={plan} buttonVariant="outline" showSpacer />
    </div>
  )
}
