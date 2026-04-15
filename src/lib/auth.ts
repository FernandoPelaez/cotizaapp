import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
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
        if (!credentials) {
          throw new Error("INVALID_CREDENTIALS")
        }

        const email = credentials.email?.toLowerCase().trim()
        const password = credentials.password

        if (!email || !password) {
          throw new Error("INVALID_CREDENTIALS")
        }

        const user = await prisma.user.findUnique({
          where: { email },
          include: { plan: true },
        })

        if (!user) {
          throw new Error("USER_NOT_FOUND")
        }

        if (!user.password) {
          throw new Error("INVALID_CREDENTIALS")
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
          throw new Error("INVALID_CREDENTIALS")
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
    },

    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string | null
        ;(session.user as any).plan = token.plan as string
        ;(session.user as any).profileType = token.profileType as string | null
        ;(session.user as any).profileCompleted = Boolean(token.profileCompleted)
        ;(session.user as any).onboardingStep = Number(token.onboardingStep ?? 1)
      }

      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
