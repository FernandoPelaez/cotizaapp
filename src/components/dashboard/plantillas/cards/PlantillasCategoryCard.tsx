import Link from "next/link"
import type {
  TemplateCategoryAccess,
  TemplateCategoryItem,
} from "@/types/template"

type PlantillasCategoryCardProps = {
  category: TemplateCategoryItem
  visible?: boolean
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
  visible = true,
}: PlantillasCategoryCardProps) {
  const badge = ACCESS_BADGE_META[category.type]

  return (
    <Link
      href={`/plantillas/${category.id}`}
      aria-label={`Abrir categoría ${category.name}`}
      className={`group relative flex min-h-[190px] flex-col overflow-hidden rounded-xl border border-[#D1D5DE] bg-white p-5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
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
          className="inline-flex items-center gap-1 text-[13px] font-semibold transition-all duration-200 group-hover:gap-2"
          style={{ color: category.accent }}
        >
          Explorar
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            <path
              d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
        style={{ backgroundColor: category.accent }}
      />
    </Link>
  )
}
