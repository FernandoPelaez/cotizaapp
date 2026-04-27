import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"

const isDev = process.env.NODE_ENV !== "production"

async function getFreePlanId() {
  const freePlan = await prisma.plan.findUnique({
    where: { slug: "free" },
    select: { id: true },
  })

  return freePlan?.id ?? null
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const email = credentials?.email?.toLowerCase().trim()
          const password = credentials?.password ?? ""

          if (!email || !password) {
            if (isDev) {
              console.log("[AUTH] Credenciales incompletas")
            }

            return null
          }

          const user = await prisma.user.findUnique({
            where: { email },
            include: { plan: true },
          })

          if (!user) {
            if (isDev) {
              console.log("[AUTH] Usuario no encontrado:", email)
            }

            return null
          }

          if (!user.password) {
            if (isDev) {
              console.log("[AUTH] El usuario no tiene password guardado:", email)
            }

            return null
          }

          const isValid = await bcrypt.compare(password, user.password)

          if (!isValid) {
            if (isDev) {
              console.log("[AUTH] Password incorrecta para:", email)
            }

            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            plan: user.plan?.slug ?? "free",
            profileType: user.profileType ?? null,
            profileCompleted: user.profileCompleted,
            onboardingStep: user.onboardingStep ?? 1,
          }
        } catch (error) {
          console.error("[AUTH][AUTHORIZE_ERROR]", error)
          return null
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider !== "google") {
          return true
        }

        const email = user.email?.toLowerCase().trim()

        if (!email) {
          return false
        }

        const existingUser = await prisma.user.findUnique({
          where: { email },
          select: { id: true },
        })

        if (existingUser) {
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              name: user.name ?? undefined,
              image: user.image ?? undefined,
            },
          })

          return true
        }

        const freePlanId = await getFreePlanId()

        await prisma.user.create({
          data: {
            email,
            name: user.name ?? null,
            image: user.image ?? null,
            planId: freePlanId,
            quotesUsed: 0,
            trialBlocked: false,
            trialQuotesLimit: 5,
          },
        })

        return true
      } catch (error) {
        console.error("[AUTH][GOOGLE_SIGNIN_ERROR]", error)
        return false
      }
    },
        async jwt({ token, user, trigger, session }) {
          try {
            const shouldHydrateFromDb = Boolean(user) || trigger === "update"

            if (trigger === "update" && session?.user?.email) {
              token.email = session.user.email
            }

            if (shouldHydrateFromDb) {
              const email = (user?.email ?? token.email)?.toLowerCase().trim()

              if (email) {
                const dbUser = await prisma.user.findUnique({
                  where: { email },
                  include: { plan: true },
                })

                if (dbUser) {
                  token.id = dbUser.id
                  token.email = dbUser.email
                  token.name = dbUser.name
                  token.image = dbUser.image
                  token.plan = dbUser.plan?.slug ?? "free"
                  token.profileType = dbUser.profileType ?? null
                  token.profileCompleted = dbUser.profileCompleted
                  token.onboardingStep = dbUser.onboardingStep ?? 1

                  return token
                }
              }
            }

            if (user) {
              token.id = user.id
              token.email = user.email
              token.name = user.name
              token.image = user.image
              token.plan = (user as any).plan || "free"
              token.profileType = (user as any).profileType ?? null
              token.profileCompleted = (user as any).profileCompleted ?? false
              token.onboardingStep = (user as any).onboardingStep ?? 1
            }

            return token
          } catch (error) {
            console.error("[AUTH][JWT_ERROR]", error)
            return token
          }
        },

    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = (token.image as string | null) ?? null
        ;(session.user as any).plan = token.plan as string
        ;(session.user as any).profileType =
          (token.profileType as string | null) ?? null
        ;(session.user as any).profileCompleted = Boolean(
          token.profileCompleted
        )
        ;(session.user as any).onboardingStep = Number(
          token.onboardingStep ?? 1
        )
      }

      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: false,
}
