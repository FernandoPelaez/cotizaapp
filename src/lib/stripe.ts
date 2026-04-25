import "server-only"

import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY no está configurada en las variables de entorno")
}

export const stripe = new Stripe(stripeSecretKey)
