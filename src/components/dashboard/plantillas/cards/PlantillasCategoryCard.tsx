"use client"

import { motion, type Variants } from "framer-motion"
import Link from "next/link"

import type {
  TemplateCategoryAccess,
  TemplateCategoryItem,
} from "@/types/template"

type PlantillasCategoryCardProps = {
  category: TemplateCategoryItem
  visible?: boolean
}

const cardEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

const arrowVariants: Variants = {
  rest: {
    x: 0,
  },
  hover: {
    x: 4,
    transition: {
      duration: 0.32,
      ease: cardEase,
    },
  },
}

const bottomBarVariants: Variants = {
  rest: {
    scaleX: 0,
    opacity: 0,
  },
  hover: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.38,
      ease: cardEase,
    },
  },
}

const ACCESS_BADGE_META: Record<
  TemplateCategoryAccess,
  {
    label: string
    className: string
  }
> = {
  basic: {
    label: "BÁSICA",
    className: "bg-[#E8EDF7] text-[#1B3D7A]",
  },
  pro: {
    label: "PRO",
    className: "bg-[#FEF3C7] text-[#92400E]",
  },
  premium: {
    label: "PREMIUM",
    className: "bg-violet-50 text-violet-700",
  },
}

export default function PlantillasCategoryCard({
  category,
}: PlantillasCategoryCardProps) {
  const badge = ACCESS_BADGE_META[category.type]

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.99 }}
      transition={{
        duration: 0.32,
        ease: cardEase,
      }}
      className="h-full"
    >
      <Link
        href={`/plantillas/${category.id}`}
        aria-label={`Abrir categoría ${category.name}`}
        className="relative flex h-full min-h-[190px] flex-col overflow-hidden rounded-xl border border-[#D1D5DE] bg-white p-5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      >
        <span
          className={`absolute right-4 top-4 rounded-full px-2 py-1 text-[9px] font-bold tracking-[0.08em] ${badge.className}`}
        >
          {badge.label}
        </span>

        <div
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-xl"
          style={{
            backgroundColor: `${category.accent}14`,
            color: category.accent,
          }}
        >
          {category.icon}
        </div>

        <div className="flex-1">
          <h2 className="mb-1 text-[1rem] font-bold tracking-[-0.01em] text-[#111827]">
            {category.name}
          </h2>

          <p className="text-[13px] leading-6 text-[#6B7280]">
            {category.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#EAECF0] pt-3">
          <span className="text-[12px] font-medium text-[#9CA3AF]">
            {category.count} plantillas
          </span>

          <span
            className="inline-flex items-center gap-1 text-[13px] font-semibold"
            style={{ color: category.accent }}
          >
            Explorar

            <motion.svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              variants={arrowVariants}
            >
              <path
                d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </span>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px] origin-left"
          variants={bottomBarVariants}
          style={{ backgroundColor: category.accent }}
        />
      </Link>
    </motion.div>
  )
}
