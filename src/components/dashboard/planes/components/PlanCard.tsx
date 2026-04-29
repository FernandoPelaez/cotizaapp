"use client"

import { motion } from "framer-motion"
import { Check, Crown, Sparkles, Zap } from "lucide-react"
import type { MouseEventHandler } from "react"

import type { DashboardPlan, DashboardPlanId } from "@/lib/dashboard/plans"

type PlanCardProps = {
  plan: DashboardPlan
  currentPlanId?: DashboardPlanId
  isHovered?: boolean
  isSubmitting?: boolean
  onSelectPlan?: () => void
  onMouseEnter?: MouseEventHandler<HTMLElement>
  onMouseLeave?: MouseEventHandler<HTMLElement>
}

const planCardEase: [number, number, number, number] = [0.19, 1, 0.22, 1]

function getPlanIcon(icon: DashboardPlan["icon"]) {
  switch (icon) {
    case "sparkles":
      return Sparkles
    case "crown":
      return Crown
    case "zap":
    default:
      return Zap
  }
}

export default function PlanCard({
  plan,
  currentPlanId = "free",
  isHovered = false,
  isSubmitting = false,
  onSelectPlan,
  onMouseEnter,
  onMouseLeave,
}: PlanCardProps) {
  const Icon = getPlanIcon(plan.icon)
  const isCurrentPlan = currentPlanId === plan.id
  const isButtonDisabled = isCurrentPlan || isSubmitting

  const buttonLabel = isCurrentPlan
    ? "Plan actual"
    : isSubmitting
      ? "Actualizando..."
      : "Elegir plan"

  const defaultShadow = plan.highlighted
    ? "0 8px 32px rgba(45,107,255,0.25)"
    : "0 0 0 rgba(45,107,255,0)"

  const hoveredShadow = plan.highlighted
    ? "0 20px 48px rgba(45,107,255,0.35)"
    : "0 12px 32px rgba(45,107,255,0.10)"

  return (
    <motion.article
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative flex h-full flex-col gap-6 rounded-[20px] p-8"
      animate={{
        y: isHovered ? -4 : 0,
        boxShadow: isHovered ? hoveredShadow : defaultShadow,
      }}
      transition={{
        duration: 0.32,
        ease: planCardEase,
      }}
      style={{
        background: plan.highlighted ? "var(--primary)" : "var(--card)",
        border: plan.highlighted
          ? "2px solid var(--primary)"
          : `1px solid ${isHovered ? "var(--primary-light)" : "var(--border)"}`,
      }}
    >
      {plan.badge && (
        <div
          className="absolute left-1/2 top-[-12px] -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.06em]"
          style={{
            background: "var(--foreground)",
            color: "#FFFFFF",
          }}
        >
          {plan.badge}
        </div>
      )}

      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px]"
          style={{
            background: plan.highlighted
              ? "rgba(255,255,255,0.2)"
              : "var(--primary-light)",
          }}
        >
          <Icon
            size={20}
            strokeWidth={2}
            color={plan.highlighted ? "#FFFFFF" : "var(--primary)"}
          />
        </div>

        <div>
          <h2
            className="m-0 text-[18px] font-bold tracking-[-0.02em]"
            style={{
              color: plan.highlighted ? "#FFFFFF" : "var(--foreground)",
            }}
          >
            {plan.name}
          </h2>

          <p
            className="m-0 text-xs"
            style={{
              color: plan.highlighted
                ? "rgba(255,255,255,0.72)"
                : "var(--text-muted)",
            }}
          >
            {plan.description}
          </p>
        </div>
      </div>

      <div className="flex items-baseline gap-1">
        <span
          className="text-[36px] font-extrabold tracking-[-0.04em]"
          style={{
            color: plan.highlighted ? "#FFFFFF" : "var(--foreground)",
          }}
        >
          ${plan.price}
        </span>

        <span
          className="text-[13px]"
          style={{
            color: plan.highlighted
              ? "rgba(255,255,255,0.65)"
              : "var(--text-muted)",
          }}
        >
          {plan.period ? `/ ${plan.period}` : "para siempre"}
        </span>
      </div>

      <div
        className="h-px"
        style={{
          background: plan.highlighted
            ? "rgba(255,255,255,0.15)"
            : "var(--border)",
        }}
      />

      <div className="flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2.5">
            <div
              className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
              style={{
                background: plan.highlighted
                  ? "rgba(255,255,255,0.2)"
                  : "var(--success-bg)",
              }}
            >
              <Check
                size={10}
                strokeWidth={3}
                color={plan.highlighted ? "#FFFFFF" : "var(--success)"}
              />
            </div>

            <span
              className="text-[13px] leading-relaxed"
              style={{
                color: plan.highlighted ? "#FFFFFF" : "var(--foreground)",
              }}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={isButtonDisabled ? undefined : onSelectPlan}
        disabled={isButtonDisabled}
        whileHover={isButtonDisabled ? undefined : { y: -1 }}
        whileTap={isButtonDisabled ? undefined : { scale: 0.99 }}
        transition={{
          duration: 0.2,
          ease: planCardEase,
        }}
        className="w-full rounded-xl px-4 py-3 text-sm font-semibold"
        style={{
          border: "none",
          cursor: isButtonDisabled ? "default" : "pointer",
          background: isCurrentPlan
            ? "var(--primary-soft)"
            : plan.highlighted
              ? "#FFFFFF"
              : "var(--primary)",
          color: isCurrentPlan
            ? "var(--text-muted)"
            : plan.highlighted
              ? "var(--primary)"
              : "#FFFFFF",
          opacity: isSubmitting ? 0.85 : 1,
        }}
      >
        {buttonLabel}
      </motion.button>
    </motion.article>
  )
}
