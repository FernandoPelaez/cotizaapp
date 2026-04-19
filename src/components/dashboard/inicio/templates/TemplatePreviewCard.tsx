import type { ReactNode } from "react"

type Variant = "clasica" | "pro" | "premium"

type TemplatePreviewCardProps = {
  variant?: Variant
  title?: string
  description?: string
  children: ReactNode
}

const badgeStyles: Record<Variant, string> = {
  clasica: "bg-[#eef2ff] text-[#3b5bdb]",
  pro: "bg-[#ede9fe] text-[#6d28d9]",
  premium: "bg-[#fff4d6] text-[#b7791f]",
}

const badgeLabels: Record<Variant, string> = {
  clasica: "CLÁSICA",
  pro: "PRO",
  premium: "PREMIUM",
}

const badgeIcons: Record<Variant, ReactNode> = {
  clasica: (
    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="3.5" height="3.5" rx="0.8" stroke="#3b5bdb" strokeWidth="1.2"/>
      <rect x="5.5" y="1" width="3.5" height="3.5" rx="0.8" stroke="#3b5bdb" strokeWidth="1.2"/>
      <rect x="1" y="5.5" width="3.5" height="3.5" rx="0.8" stroke="#3b5bdb" strokeWidth="1.2"/>
      <rect x="5.5" y="5.5" width="3.5" height="3.5" rx="0.8" stroke="#3b5bdb" strokeWidth="1.2"/>
    </svg>
  ),
  pro: (
    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5,1 6.2,3.8 9.5,4 7,6.2 7.8,9.5 5,8 2.2,9.5 3,6.2 0.5,4 3.8,3.8" stroke="#6d28d9" strokeWidth="1" strokeLinejoin="round" fill="#6d28d9" fillOpacity="0.2"/>
    </svg>
  ),
  premium: (
    <svg width="8" height="7" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7h8M1 7L0 2l2.5 2L5 0l2.5 4L10 2 9 7H1Z" stroke="#b7791f" strokeWidth="1.2" strokeLinejoin="round" fill="#b7791f" fillOpacity="0.2"/>
    </svg>
  ),
}

export default function TemplatePreviewCard({
  variant = "clasica",
  title,
  description,
  children,
}: TemplatePreviewCardProps) {
  return (
    <article className="w-[175px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(15,23,42,0.10)]">
      <div
        className="h-[185px] overflow-hidden bg-white p-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {children}
      </div>

      <div className="border-t border-slate-100 px-3 pb-3 pt-2">
        <span className={"inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-extrabold tracking-[0.04em] " + badgeStyles[variant]}>
          {badgeIcons[variant]}
          {badgeLabels[variant]}
        </span>

        {title ? (
          <h3 className="mt-2 text-[12px] font-extrabold leading-tight text-slate-900">
            {title}
          </h3>
        ) : null}

        {description ? (
          <p className="mt-1 text-[10px] leading-relaxed text-slate-500">
            {description}
          </p>
        ) : null}
      </div>
    </article>
  )
}
