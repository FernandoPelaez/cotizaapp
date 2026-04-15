import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      plan: string
      profileType?: string | null
      profileCompleted?: boolean
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    plan: string
    profileType?: string | null
    profileCompleted?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    plan: string
    profileType?: string | null
    profileCompleted?: boolean
  }
}