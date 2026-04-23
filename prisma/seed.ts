import { prisma } from "../src/lib/prisma"

const PLANS = [
  {
    name: "Free",
    price: 0,
    maxQuotes: 5,
    whatsappSend: false,
  },
  {
    name: "Pro",
    price: 99,
    maxQuotes: 999999,
    whatsappSend: true,
  },
  {
    name: "Premium",
    price: 199,
    maxQuotes: 999999,
    whatsappSend: true,
  },
] as const

async function main() {
  for (const plan of PLANS) {
    const existingPlan = await prisma.plan.findFirst({
      where: { name: plan.name },
      select: { id: true },
    })

    if (existingPlan) {
      await prisma.plan.update({
        where: { id: existingPlan.id },
        data: {
          price: plan.price,
          maxQuotes: plan.maxQuotes,
          whatsappSend: plan.whatsappSend,
        },
      })
    } else {
      await prisma.plan.create({
        data: {
          name: plan.name,
          price: plan.price,
          maxQuotes: plan.maxQuotes,
          whatsappSend: plan.whatsappSend,
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
    await prisma.$disconnect()
  })
  