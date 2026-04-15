import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    if (
      pathname.startsWith("/auth") ||
      pathname.startsWith("/api/auth")
    ) {
      return NextResponse.next()
    }

    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }

    const profileType = token.profileType
    const profileCompleted = token.profileCompleted
    const onboardingStep = Number(token.onboardingStep ?? 1)

    const isOnboardingRoute = pathname.startsWith("/onboarding")
    const isProfileRoute = pathname === "/onboarding/profile"
    const isQuestionsRoute = pathname === "/onboarding/questions"

    if (!profileType || onboardingStep < 2) {
      if (!isProfileRoute) {
        return NextResponse.redirect(new URL("/onboarding/profile", req.url))
      }
      return NextResponse.next()
    }

    if (!profileCompleted) {
      if (!isQuestionsRoute) {
        return NextResponse.redirect(new URL("/onboarding/questions", req.url))
      }
      return NextResponse.next()
    }

    if (profileCompleted && isOnboardingRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
  {
    pages: {
      signIn: "/auth/signin",
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
  ],
}
