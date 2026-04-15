import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

type PageProps = {
  params: Promise<{
    token: string
  }>
  searchParams?: Promise<{
    result?: string
  }>
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(value)
}

function formatDate(value: Date | string) {
  return new Date(value).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function getStatusLabel(status: string) {
  switch (status) {
    case "DRAFT":
      return "Borrador"
    case "PENDING":
      return "Pendiente"
    case "ACCEPTED":
      return "Aceptada"
    case "REJECTED":
      return "Rechazada"
    case "EXPIRED":
      return "Expirada"
    default:
      return status
  }
}

function getStatusClasses(status: string) {
  switch (status) {
    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700"
    case "ACCEPTED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700"
    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-700"
    case "EXPIRED":
      return "border-slate-200 bg-slate-100 text-slate-600"
    default:
      return "border-neutral-200 bg-neutral-100 text-neutral-700"
  }
}

async function getQuoteByToken(token: string) {
  return prisma.quote.findFirst({
    where: {
      responseToken: token,
    },
    include: {
      items: true,
      user: {
        include: {
          profile: true,
        },
      },
      template: true,
    },
  })
}

async function expireQuoteIfNeeded(token: string) {
  const quote = await getQuoteByToken(token)

  if (!quote) return null

  const now = new Date()
  const shouldExpire =
    quote.status === "PENDING" &&
    !!quote.responseExpiresAt &&
    quote.responseExpiresAt <= now &&
    !quote.respondedAt

  if (!shouldExpire) {
    return quote
  }

  return prisma.quote.update({
    where: {
      id: quote.id,
    },
    data: {
      status: "EXPIRED",
    },
    include: {
      items: true,
      user: {
        include: {
          profile: true,
        },
      },
      template: true,
    },
  })
}

export default async function QuoteResponsePage({
  params,
  searchParams,
}: PageProps) {
  const { token } = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const result = resolvedSearchParams?.result

  async function handleResponse(formData: FormData) {
    "use server"

    const token = String(formData.get("token") || "")
    const decision = String(formData.get("decision") || "")

    if (!token || !["ACCEPTED", "REJECTED"].includes(decision)) {
      redirect(`/quotes/respond/${token}?result=invalid`)
    }

    const quote = await prisma.quote.findFirst({
      where: {
        responseToken: token,
      },
      select: {
        id: true,
        status: true,
        responseExpiresAt: true,
        respondedAt: true,
      },
    })

    if (!quote) {
      redirect(`/quotes/respond/${token}?result=not-found`)
    }

    const now = new Date()

    const isExpired =
      quote.status === "PENDING" &&
      !!quote.responseExpiresAt &&
      quote.responseExpiresAt <= now &&
      !quote.respondedAt

    if (isExpired) {
      await prisma.quote.update({
        where: {
          id: quote.id,
        },
        data: {
          status: "EXPIRED",
        },
      })

      redirect(`/quotes/respond/${token}?result=expired`)
    }

    if (quote.status === "ACCEPTED") {
      redirect(`/quotes/respond/${token}?result=accepted`)
    }

    if (quote.status === "REJECTED") {
      redirect(`/quotes/respond/${token}?result=rejected`)
    }

    if (quote.status === "EXPIRED") {
      redirect(`/quotes/respond/${token}?result=expired`)
    }

    if (quote.status !== "PENDING") {
      redirect(`/quotes/respond/${token}?result=invalid`)
    }

    await prisma.quote.update({
      where: {
        id: quote.id,
      },
      data: {
        status: decision as "ACCEPTED" | "REJECTED",
        respondedAt: now,
      },
    })

    redirect(
      `/quotes/respond/${token}?result=${
        decision === "ACCEPTED" ? "accepted" : "rejected"
      }`
    )
  }

  const quote = await expireQuoteIfNeeded(token)

  if (!quote) {
    notFound()
  }

  const businessName =
    quote.user.profile?.businessName ||
    quote.user.name ||
    quote.user.email ||
    "Negocio"

  const canRespond = quote.status === "PENDING"
  const totalItems = quote.items.length

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">
                Respuesta de cotización
              </p>
              <h1 className="mt-1 text-2xl font-bold text-neutral-900">
                {quote.title}
              </h1>
              <p className="mt-2 text-sm text-neutral-500">
                Revisa la información y responde si aceptas o rechazas esta
                cotización.
              </p>
            </div>

            <span
              className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-sm font-medium ${getStatusClasses(
                quote.status
              )}`}
            >
              {getStatusLabel(quote.status)}
            </span>
          </div>

          {result === "accepted" && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-700">
                La cotización fue aceptada correctamente.
              </p>
            </div>
          )}

          {result === "rejected" && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                La cotización fue rechazada correctamente.
              </p>
            </div>
          )}

          {result === "expired" && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-100 p-4">
              <p className="text-sm font-medium text-slate-700">
                Esta cotización ya expiró y no puede responderse.
              </p>
            </div>
          )}

          {result === "invalid" && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-700">
                La acción solicitada no es válida para esta cotización.
              </p>
            </div>
          )}

          {result === "not-found" && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-700">
                No se encontró la cotización solicitada.
              </p>
            </div>
          )}

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Cliente
              </p>
              <p className="mt-2 text-sm font-semibold text-neutral-900">
                {quote.clientName}
              </p>

              {quote.clientPhone && (
                <p className="mt-1 text-sm text-neutral-500">
                  Teléfono: {quote.clientPhone}
                </p>
              )}

              {quote.clientEmail && (
                <p className="mt-1 text-sm text-neutral-500">
                  Correo: {quote.clientEmail}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Empresa o profesional
              </p>
              <p className="mt-2 text-sm font-semibold text-neutral-900">
                {businessName}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                Emitida el {formatDate(quote.createdAt)}
              </p>

              {quote.responseExpiresAt && (
                <p className="mt-1 text-sm text-neutral-500">
                  Disponible hasta el {formatDate(quote.responseExpiresAt)}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Resumen
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  {totalItems} concepto{totalItems === 1 ? "" : "s"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Total
                </p>
                <p className="mt-1 text-xl font-bold text-neutral-900">
                  {formatCurrency(quote.total)}
                </p>
              </div>
            </div>

            <div className="divide-y divide-neutral-200">
              {quote.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-900">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                      {item.quantity} × {formatCurrency(item.price)}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-neutral-800">
                    {formatCurrency(item.total)}
                  </p>
                </div>
              ))}
            </div>

            {(quote.description || quote.notes) && (
              <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                {quote.description && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                      Descripción
                    </p>
                    <p className="mt-2 text-sm leading-6 text-neutral-700">
                      {quote.description}
                    </p>
                  </div>
                )}

                {quote.notes && (
                  <div className={quote.description ? "mt-4" : ""}>
                    <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                      Notas
                    </p>
                    <p className="mt-2 text-sm leading-6 text-neutral-700">
                      {quote.notes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href={`/api/quotes/${quote.id}/pdf`}
              target="_blank"
              className="inline-flex items-center justify-center rounded-xl border border-blue-200 px-4 py-3 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
            >
              Ver PDF
            </Link>

            {canRespond ? (
              <form
                action={handleResponse}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input type="hidden" name="token" value={token} />

                <button
                  type="submit"
                  name="decision"
                  value="REJECTED"
                  className="inline-flex items-center justify-center rounded-xl border border-red-200 px-5 py-3 text-sm font-medium text-red-700 transition hover:bg-red-50"
                >
                  Rechazar
                </button>

                <button
                  type="submit"
                  name="decision"
                  value="ACCEPTED"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                  Aceptar
                </button>
              </form>
            ) : (
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <p className="text-sm font-medium text-neutral-700">
                  Esta cotización ya no admite respuesta.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
