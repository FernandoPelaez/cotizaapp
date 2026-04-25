"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"

import type { LandingPlan } from "@/features/landing/planes/landing-plans.data"

type PlanCardProps = {
  plan: LandingPlan
}

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

const featuresContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.45,
    },
  },
}

const featureItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
}

const pillVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 14,
      delay: 0.5,
    },
  },
}

function PlanFeatures({ features }: { features: string[] }) {
  return (
    <motion.div
      className="plan-features"
      variants={featuresContainerVariants}
    >
      {features.map((feature) => (
        <motion.div
          key={feature}
          className="plan-feat-item"
          variants={featureItemVariants}
        >
          <div className="feat-check">✓</div>
          <span>{feature}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

function PlanPrice({ precio, periodo }: { precio: string; periodo: string }) {
  return (
    <div className="plan-price-row">
      <span className="plan-price-num">{precio}</span>
      {periodo && <span className="plan-price-per">{periodo}</span>}
    </div>
  )
}

function PlanButton({
  href,
  cta,
  className,
}: {
  href: string
  cta: string
  className: string
}) {
  return (
    <Link href={href} className={className}>
      {cta}
    </Link>
  )
}

export default function PlanCard({ plan }: PlanCardProps) {
  if (plan.popular) {
    return (
      <div className="pro-shell">
        <div className="pro-shell-bg" />

        <div className="pro-inner">
          <motion.div className="popular-pill" variants={pillVariants}>
            ★ Más popular
          </motion.div>

          <div className="plan-tag">{plan.desc}</div>
          <div className="plan-name">{plan.nombre}</div>

          <PlanPrice precio={plan.precio} periodo={plan.periodo} />

          <div className="plan-divider" />

          <PlanFeatures features={plan.features} />

          <PlanButton
            href={plan.href}
            cta={plan.cta}
            className="btn-filled-plan"
          />
        </div>
      </div>
    )
  }

  if (plan.premium) {
    return (
      <div className="premium-card">
        <motion.div className="premium-pill" variants={pillVariants}>
          ◈ Premium
        </motion.div>

        <div className="plan-tag">{plan.desc}</div>
        <div className="plan-name">{plan.nombre}</div>

        <PlanPrice precio={plan.precio} periodo={plan.periodo} />

        <div className="plan-divider" />

        <PlanFeatures features={plan.features} />

        <PlanButton
          href={plan.href}
          cta={plan.cta}
          className="btn-empresa-plan"
        />
      </div>
    )
  }

  return (
    <div className="plan-card">
      <div style={{ height: 26, marginBottom: 14 }} />

      <div className="plan-tag">{plan.desc}</div>
      <div className="plan-name">{plan.nombre}</div>

      <PlanPrice precio={plan.precio} periodo={plan.periodo} />

      <div className="plan-divider" />

      <PlanFeatures features={plan.features} />

      <PlanButton
        href={plan.href}
        cta={plan.cta}
        className="btn-outline-plan"
      />
    </div>
  )
}
