import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"

const isDev = process.env.NODE_ENV !== "production"

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
            plan: user.plan?.name || "free",
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
    async signIn() {
      return true
    },

    async jwt({ token, user, trigger, session }) {
      try {
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

        if (trigger === "update" && session?.user?.email) {
          token.email = session.user.email
        }

        if (token?.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email as string },
            include: { plan: true },
          })

          if (dbUser) {
            token.id = dbUser.id
            token.email = dbUser.email
            token.name = dbUser.name
            token.image = dbUser.image
            token.plan = dbUser.plan?.name || "free"
            token.profileType = dbUser.profileType ?? null
            token.profileCompleted = dbUser.profileCompleted
            token.onboardingStep = dbUser.onboardingStep ?? 1
          }
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
        ;(session.user as any).profileType = (token.profileType as string | null) ?? null
        ;(session.user as any).profileCompleted = Boolean(token.profileCompleted)
        ;(session.user as any).onboardingStep = Number(token.onboardingStep ?? 1)
      }

      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: isDev,
}
