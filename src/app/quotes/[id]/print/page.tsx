import type { ComponentType } from "react"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { templateMap } from "@/lib/templates"

type PageProps = {
  params: Promise<{ id: string }>
}

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

export default async function QuotePrintPage({ params }: PageProps) {
  const { id } = await params

  const quoteRecord = await prisma.quote.findUnique({
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

  if (!quoteRecord) {
    return notFound()
  }

  const quote = quoteRecord

  const normalizedItems = (quote.items || []).map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    total: item.total,
  }))

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
    quote.user.profile?.businessName || quote.user.name || "Mi negocio"

  const logoUrl = quote.user.profile?.logoUrl || ""

  const createdAtFormatted = quote.createdAt
    ? new Intl.DateTimeFormat("es-MX").format(new Date(quote.createdAt))
    : ""

  const validUntilFormatted = quote.validUntil
    ? new Intl.DateTimeFormat("es-MX").format(new Date(quote.validUntil))
    : undefined

  const templateData: TemplateData = {
    id: quote.id,
    title: quote.title,
    description: quote.description ?? "",

    clientName: quote.clientName ?? "",
    clientEmail: quote.clientEmail ?? "",
    clientPhone: quote.clientPhone ?? "",
    clientAddress: quote.clientAddress ?? "",
    clientRFC: quote.clientRFC ?? "",

    subtotal: quote.subtotal,
    discount: quote.discount,
    tax: quote.tax,
    total: quote.total,
    validUntil: validUntilFormatted,
    notes: quote.notes ?? "",
    createdAt: quote.createdAt,

    items: normalizedItems,
    services,
    products,

    businessName,
    companyName: businessName,

    logoUrl,
    companyLogo: logoUrl,

    phone: quote.user.profile?.phone || "",
    themeColor: quote.user.profile?.themeColor || "#1B3D7A",
    city: quote.user.profile?.city || "",
    state: quote.user.profile?.state || "",
    oficio: quote.user.profile?.oficio || "",

    settings: quote.user.settings ?? null,

    docNumber: quote.id.slice(0, 8).toUpperCase(),
    date: createdAtFormatted,
  }

  const templateKey = quote.template?.name?.trim() || "clasica-1"

  const SelectedTemplate = (templateMap[
    templateKey as keyof typeof templateMap
  ] || templateMap["clasica-1"]) as unknown as ComponentType<{
    data: TemplateData
  }>

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background: white;
          width: 100%;
          overflow-x: hidden;
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
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: white;
        }

        .print-page-inner {
          width: 595px;
          max-width: 595px;
          min-height: 842px;
          background: white;
          overflow: hidden;
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
