import type { ComponentType } from "react"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { templateMap } from "@/lib/templates"

export const dynamic = "force-dynamic"
export const revalidate = 0

type PageProps = {
  params: Promise<{ id: string }>
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

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date))
}

function resolveTemplateKey(templateName: string | null | undefined) {
  const fallback = "clasica-1" as keyof typeof templateMap
  const rawTemplateName = templateName?.trim()

  if (!rawTemplateName) return fallback

  if (rawTemplateName in templateMap) {
    return rawTemplateName as keyof typeof templateMap
  }

  const normalizedTemplateName = rawTemplateName.toLowerCase()
  const templateKeys = Object.keys(templateMap) as Array<keyof typeof templateMap>

  const matchedKey = templateKeys.find((key) =>
    normalizedTemplateName.includes(String(key).toLowerCase())
  )

  return matchedKey ?? fallback
}

export default async function QuotePrintPage({ params }: PageProps) {
  const { id } = await params

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
      : normalizedItems
          .filter((item) => item.quantity === 1)
          .map((item) => ({
            name: item.name,
            price: item.price,
          }))

  const products =
    profileType === "negocio"
      ? normalizedItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }))
      : normalizedItems
          .filter((item) => item.quantity > 1)
          .map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          }))

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
    services,
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

  const templateKey = resolveTemplateKey(quote.template?.name)

  const SelectedTemplate = templateMap[templateKey] as unknown as ComponentType<{
    data: TemplateData
  }>

  return (
    <>
      <style>{`
        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
          background: white;
        }

        * {
          box-sizing: border-box;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        @page {
          size: A4;
          margin: 0;
        }

        .print-page-shell {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: white;
        }

        .print-page-inner {
          width: 595px;
          max-width: 595px;
          min-height: 842px;
          overflow: hidden;
          background: white;
        }
      `}</style>

      <div className="print-page-shell">
        <div className="print-page-inner">
          <SelectedTemplate data={templateData} />
        </div>
      </div>
    </>
  )
}
