import { loadEnvConfig } from "@next/env"

loadEnvConfig(process.cwd())

const PLANS = [
  {
    slug: "free",
    name: "Free",
    description: "Ideal para comenzar y probar la herramienta",
    price: 0,
    priceCents: 0,
    currency: "mxn",
    interval: "FREE",
    maxQuotes: 5,
    templateLimit: 10,
    whatsappSend: false,
    isFree: true,
    isActive: true,
  },
  {
    slug: "pro",
    name: "Pro",
    description: "Para profesionales que quieren crecer",
    price: 99,
    priceCents: 9900,
    currency: "mxn",
    interval: "MONTHLY",
    maxQuotes: 999999,
    templateLimit: 20,
    whatsappSend: true,
    isFree: false,
    isActive: true,
  },
  {
    slug: "empresa",
    name: "Empresa",
    description: "Ideal para negocios que buscan toda la biblioteca disponible",
    price: 199,
    priceCents: 19900,
    currency: "mxn",
    interval: "MONTHLY",
    maxQuotes: 999999,
    templateLimit: 30,
    whatsappSend: true,
    isFree: false,
    isActive: true,
  },
] as const

async function main() {
  const { prisma } = await import("../src/lib/prisma")

  for (const plan of PLANS) {
    const existingPlan = await prisma.plan.findFirst({
      where: {
        OR: [
          { slug: plan.slug },
          { name: plan.name },
          ...(plan.slug === "empresa" ? [{ name: "Premium" }] : []),
        ],
      },
      select: { id: true },
    })

    if (existingPlan) {
      await prisma.plan.update({
        where: { id: existingPlan.id },
        data: {
          slug: plan.slug,
          name: plan.name,
          description: plan.description,
          price: plan.price,
          priceCents: plan.priceCents,
          currency: plan.currency,
          interval: plan.interval,
          maxQuotes: plan.maxQuotes,
          templateLimit: plan.templateLimit,
          whatsappSend: plan.whatsappSend,
          isFree: plan.isFree,
          isActive: plan.isActive,
        },
      })
    } else {
      await prisma.plan.create({
        data: {
          slug: plan.slug,
          name: plan.name,
          description: plan.description,
          price: plan.price,
          priceCents: plan.priceCents,
          currency: plan.currency,
          interval: plan.interval,
          maxQuotes: plan.maxQuotes,
          templateLimit: plan.templateLimit,
          whatsappSend: plan.whatsappSend,
          isFree: plan.isFree,
          isActive: plan.isActive,
        },
      })
    }
  }

  console.log("✅ Planes sembrados correctamente")
}

main()
  .catch((error) => {
    console.error("❌ Error al ejecutar seed:", error)
    process.exit(1)
  })
  .finally(async () => {
    const { prisma } = await import("../src/lib/prisma")
    await prisma.$disconnect()
  })
  