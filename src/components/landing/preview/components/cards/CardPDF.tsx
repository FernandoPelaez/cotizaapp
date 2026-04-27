"use client"

import { useState } from "react"
import { pdfFeatures, previewRows } from "../../data/preview.data"

export default function CardPDF() {
  const [downloaded, setDownloaded] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="flex h-12 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500 shadow-sm">
          <span className="text-xs font-bold text-white">PDF</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-gray-900">
            COT-2026-047.pdf
          </div>
          <div className="mt-0.5 text-xs text-gray-500">
            Constructora Norte SA · $8,700 MXN
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDownloaded(true)}
          className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
            downloaded
              ? "border border-green-300 bg-green-100 text-green-700"
              : "bg-red-500 text-white shadow-sm hover:bg-red-600"
          }`}
        >
          {downloaded ? "✓ Listo" : "Descargar"}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between bg-[#1B3D7A] px-4 py-3">
          <div className="text-sm font-bold text-white">
            MI EMPRESA S.A. DE C.V.
          </div>
          <div className="text-sm font-bold text-white">COT-2026-047</div>
        </div>

        <div className="border-b border-gray-100 bg-[#EEF2FA] px-4 py-2">
          <span className="text-xs font-semibold text-[#1B3D7A]">
            Constructora Norte SA — 13/04/2026
          </span>
        </div>

        <div className="space-y-2 bg-white px-4 py-3">
          {previewRows.map((row) => (
            <div
              key={row.desc}
              className="flex justify-between py-0.5 text-xs text-gray-600"
            >
              <span>{row.desc}</span>
              <span className="font-semibold text-gray-800">{row.total}</span>
            </div>
          ))}

          <div className="flex items-center justify-between border-t border-gray-100 pt-2">
            <span className="text-xs font-bold text-gray-800">TOTAL</span>
            <span className="rounded-lg bg-[#1B3D7A] px-3 py-1 text-xs font-bold text-white">
              $8,700
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {pdfFeatures.map((feature) => (
          <div
            key={feature}
            className="rounded-xl border border-blue-200 bg-blue-50 py-2 text-center text-xs font-semibold text-[#1B3D7A]"
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  )
}

