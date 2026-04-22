"use client"

import { useMemo, type RefObject } from "react"
import { templateMap } from "@/lib/templates"
import type { ProfileType, TemplateData } from "@/types/cotizacion-form"

type QuoteFormPreviewProps = {
  containerRef: RefObject<HTMLDivElement | null>
  previewScale: number
  templateKey: string
  profileType: ProfileType | null
  templateData: TemplateData
}

export default function QuoteFormPreview({
  containerRef,
  previewScale,
  templateKey,
  profileType,
  templateData,
}: QuoteFormPreviewProps) {
  const resolvedTemplateKey = templateKey?.trim() || "clasica-1"

  const SelectedTemplate = useMemo(() => {
    return (
      templateMap[resolvedTemplateKey as keyof typeof templateMap] ??
      templateMap["clasica-1"]
    )
  }, [resolvedTemplateKey])

  return (
    <div className="sticky top-5 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_#dcfce7]" />
          <span className="text-[11px] font-medium text-neutral-500">
            Vista previa en tiempo real
          </span>
        </div>

        <div className="flex items-center gap-2">
          {profileType && (
            <span className="rounded-full border border-violet-100 bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600">
              {profileType === "independiente" ? "Independiente" : "Negocio"}
            </span>
          )}

          <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
            Plantilla {resolvedTemplateKey}
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="p-4"
        style={{
          maxHeight: "calc(100vh - 140px)",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <div style={{ margin: "0 auto", width: `${595 * previewScale}px` }}>
          <div
            style={{
              width: "595px",
              transformOrigin: "top left",
              transform: `scale(${previewScale})`,
              pointerEvents: "none",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
              background: "#fff",
            }}
          >
            <SelectedTemplate data={templateData} />
          </div>
        </div>
      </div>
    </div>
  )
}
