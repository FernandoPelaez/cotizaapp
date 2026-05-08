import type { ComponentType } from "react"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { templateMap } from "@/lib/templates"

export const dynamic = "force-dynamic"
export const revalidate = 0

type PageProps = {
  params: Promise<{ id: string }>
  searchParams?: Promise<{
    templateId?: string | string[]
    pdf?: string | string[]
  }>
}

type MoneyValue =
  | number
  | string
  | {
      toNumber?: () => number
      toString?: () => string
    }
  | null
  | undefined

type TemplateData = {
  id: string
  title: string
  description: string

  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress: string
  clientRFC: string

  subtotal: number
  discount: number
  tax: number
  total: number
  validUntil: string | undefined
  notes: string
  createdAt: Date

  items: {
    name: string
    quantity: number
    price: number
    total: number
  }[]

  services: {
    name: string
    price: number
  }[]

  products: {
    name: string
    quantity: number
    price: number
  }[]

  businessName: string
  companyName: string

  logoUrl: string
  companyLogo: string

  phone: string
  themeColor: string
  city: string
  state: string
  oficio: string

  settings: unknown

  docNumber: string
  date: string
}

function toNumber(value: MoneyValue) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0

  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  if (value && typeof value.toNumber === "function") {
    const parsed = value.toNumber()
    return Number.isFinite(parsed) ? parsed : 0
  }

  if (value && typeof value.toString === "function") {
    const parsed = Number(value.toString())
    return Number.isFinite(parsed) ? parsed : 0
  }

  return 0
}

function formatDate(date: Date | string | null | undefined) {
  if (!date) return ""

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) return ""

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate)
}

function getSingleSearchParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? ""
  return value ?? ""
}

function normalizeTemplateValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
}

function collectTextFields(source: unknown, fields: string[]) {
  if (!source || typeof source !== "object") return []

  const record = source as Record<string, unknown>

  return fields
    .map((field) => record[field])
    .filter((value): value is string | number => {
      return typeof value === "string" || typeof value === "number"
    })
    .map((value) => String(value).trim())
    .filter(Boolean)
}

function getTrailingTemplateNumber(value: string) {
  const match = value.match(/(?:^|-)(\d+)$/)
  return match?.[1] ?? ""
}

function resolveTemplateKey(...templateCandidates: Array<unknown>) {
  const fallback = "clasica-1" as keyof typeof templateMap
  const templateKeys = Object.keys(templateMap) as Array<keyof typeof templateMap>

  const rawCandidates = Array.from(
    new Set(
      templateCandidates
        .flat()
        .map((candidate) => String(candidate ?? "").trim())
        .filter(Boolean)
    )
  )

  for (const candidate of rawCandidates) {
    if (candidate in templateMap) {
      return candidate as keyof typeof templateMap
    }
  }

  for (const candidate of rawCandidates) {
    const normalizedCandidate = normalizeTemplateValue(candidate)

    const exactMatch = templateKeys.find((key) => {
      return normalizeTemplateValue(String(key)) === normalizedCandidate
    })

    if (exactMatch) return exactMatch
  }

  for (const candidate of rawCandidates) {
    const normalizedCandidate = normalizeTemplateValue(candidate)

    const embeddedMatch = templateKeys.find((key) => {
      const normalizedKey = normalizeTemplateValue(String(key))
      return normalizedCandidate.includes(normalizedKey)
    })

    if (embeddedMatch) return embeddedMatch
  }

  for (const candidate of rawCandidates) {
    const normalizedCandidate = normalizeTemplateValue(candidate)
    const candidateNumber = getTrailingTemplateNumber(normalizedCandidate)

    if (!candidateNumber) continue

    const candidateBase = normalizedCandidate.replace(
      new RegExp(`-${candidateNumber}$`),
      ""
    )

    const numberedMatch = templateKeys.find((key) => {
      const normalizedKey = normalizeTemplateValue(String(key))
      const keyNumber = getTrailingTemplateNumber(normalizedKey)

      if (keyNumber !== candidateNumber) return false

      const keyBase = normalizedKey.replace(new RegExp(`-${keyNumber}$`), "")

      return candidateBase.includes(keyBase) || keyBase.includes(candidateBase)
    })

    if (numberedMatch) return numberedMatch
  }

  return fallback
}

export default async function QuotePrintPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params
  const resolvedSearchParams = searchParams ? await searchParams : {}
  const templateIdFromUrl = getSingleSearchParam(resolvedSearchParams.templateId)

  if (!id?.trim()) {
    return notFound()
  }

  const quote = await prisma.quote.findUnique({
    where: { id },
    include: {
      items: true,
      user: {
        include: {
          profile: true,
          settings: true,
        },
      },
      template: true,
    },
  })

  if (!quote) {
    return notFound()
  }

  const normalizedItems = quote.items.map((item) => {
    const quantity = toNumber(item.quantity)
    const price = toNumber(item.price)
    const total = toNumber(item.total)

    return {
      name: item.name,
      quantity,
      price,
      total: total || quantity * price,
    }
  })

  const profileType = quote.user.profileType?.toLowerCase?.() || ""

  const services =
    profileType === "independiente"
      ? normalizedItems.map((item) => ({
          name: item.name,
          price: item.price,
        }))
      : []

  const products =
    profileType === "negocio"
      ? normalizedItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }))
      : []

  const fallbackServices =
    services.length === 0 && products.length === 0
      ? normalizedItems.map((item) => ({
          name: item.name,
          price: item.price,
        }))
      : services

  const businessName =
    quote.user.profile?.businessName?.trim() ||
    quote.user.name?.trim() ||
    "Mi negocio"

  const logoUrl = quote.user.profile?.logoUrl?.trim() || ""

  const templateData: TemplateData = {
    id: quote.id,
    title: quote.title,
    description: quote.description ?? "",

    clientName: quote.clientName ?? "",
    clientEmail: quote.clientEmail ?? "",
    clientPhone: quote.clientPhone ?? "",
    clientAddress: quote.clientAddress ?? "",
    clientRFC: quote.clientRFC ?? "",

    subtotal: toNumber(quote.subtotal),
    discount: toNumber(quote.discount),
    tax: toNumber(quote.tax),
    total: toNumber(quote.total),
    validUntil: quote.validUntil ? formatDate(quote.validUntil) : undefined,
    notes: quote.notes ?? "",
    createdAt: quote.createdAt,

    items: normalizedItems,
    services: fallbackServices,
    products,

    businessName,
    companyName: businessName,

    logoUrl,
    companyLogo: logoUrl,

    phone: quote.user.profile?.phone ?? "",
    themeColor: quote.user.profile?.themeColor ?? "#1B3D7A",
    city: quote.user.profile?.city ?? "",
    state: quote.user.profile?.state ?? "",
    oficio: quote.user.profile?.oficio ?? "",

    settings: quote.user.settings ?? null,

    docNumber: quote.id.slice(0, 8).toUpperCase(),
    date: formatDate(quote.createdAt),
  }

  const quoteCandidateFields = collectTextFields(quote, [
    "templateKey",
    "templateSlug",
    "templateCode",
    "templateId",
  ])

  const templateCandidateFields = collectTextFields(quote.template, [
    "templateKey",
    "key",
    "slug",
    "code",
    "value",
    "name",
    "title",
    "id",
  ])

  const templateKey = resolveTemplateKey(
    templateIdFromUrl,
    quoteCandidateFields,
    templateCandidateFields
  )

  const SelectedTemplate = templateMap[templateKey] as unknown as ComponentType<{
    data: TemplateData
  }>

  return (
    <>
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }

        html,
        body {
          margin: 0 !important;
          padding: 0 !important;
          width: 210mm;
          min-height: 297mm;
          background: #ffffff !important;
          overflow-x: hidden;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
        }

        .print-page-shell {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          padding: 0;
          background: #ffffff;
          overflow: visible;
        }

        .print-page-inner {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          padding: 10mm 0 0 0;
          background: #ffffff;
          overflow: visible;
        }

        .print-page-inner > * {
          margin: 0 auto !important;
          box-shadow: none !important;
        }

        @media screen {
          html,
          body {
            width: 100%;
            min-height: 100%;
          }

          .print-page-shell {
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            background: #ffffff;
          }

          .print-page-inner {
            width: 210mm;
            min-height: 297mm;
            padding-top: 10mm;
            background: #ffffff;
          }
        }

        @media print {
          html,
          body {
            width: 210mm;
            min-height: 297mm;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            overflow: visible !important;
          }

          .print-page-shell,
          .print-page-inner {
            width: 210mm;
            min-height: 297mm;
            margin: 0 !important;
            background: #ffffff !important;
            overflow: visible !important;
          }

          .print-page-shell {
            padding: 0 !important;
          }

          .print-page-inner {
            padding: 10mm 0 0 0 !important;
          }

          .print-page-inner > * {
            margin: 0 auto !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="print-page-shell" data-print-root data-pdf-root>
        <div className="print-page-inner">
          <SelectedTemplate data={templateData} />
        </div>
      </div>
    </>
  )
}
