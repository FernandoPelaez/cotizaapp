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

  const PREVIEW_WIDTH = 595
  const PREVIEW_HEIGHT = 842
  const safePreviewScale = Math.min(previewScale * 1.08, 0.68)

  return (
    <div className="sticky top-5 flex h-[calc(100vh-175px)] min-h-[655px] max-h-[705px] w-full max-w-[520px] self-start justify-self-start overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="flex w-full flex-col">
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-2.5">
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
          className="flex flex-1 items-center justify-center overflow-hidden px-2 py-0"
        >
          <div
            style={{
              width: `${PREVIEW_WIDTH * safePreviewScale}px`,
              height: `${PREVIEW_HEIGHT * safePreviewScale}px`,
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${PREVIEW_WIDTH}px`,
                minHeight: `${PREVIEW_HEIGHT}px`,
                transformOrigin: "top left",
                transform: `scale(${safePreviewScale})`,
                pointerEvents: "none",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 10px 28px rgba(0,0,0,0.14)",
                background: "#fff",
              }}
            >
              <SelectedTemplate data={templateData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}