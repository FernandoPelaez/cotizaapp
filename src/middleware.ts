import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token
    const isDashboardRoute = pathname.startsWith("/dashboard")
    const isOnboardingRoute = pathname.startsWith("/onboarding")
    const isProfileRoute = pathname === "/onboarding/profile"
    const isQuestionsRoute = pathname === "/onboarding/questions"
    if (!token) {
      if (isDashboardRoute || isOnboardingRoute) {
        const signInUrl = new URL("/auth/signin", req.url)
        signInUrl.searchParams.set(
          "callbackUrl",
          req.nextUrl.pathname + req.nextUrl.search
        )

        return NextResponse.redirect(signInUrl)
      }

      return NextResponse.next()
    }

    const profileType =
      typeof token.profileType === "string" && token.profileType.length > 0
        ? token.profileType
        : null

    const profileCompleted = token.profileCompleted === true
    const rawOnboardingStep = Number(token.onboardingStep ?? 1)
    const onboardingStep = Number.isFinite(rawOnboardingStep)
      ? rawOnboardingStep
      : 1

    const hasSelectedProfile = Boolean(profileType) || onboardingStep >= 2
    if (isOnboardingRoute) {
      if (profileCompleted) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      if (isProfileRoute || isQuestionsRoute) {
        return NextResponse.next()
      }

      if (!hasSelectedProfile) {
        return NextResponse.redirect(new URL("/onboarding/profile", req.url))
      }

      return NextResponse.redirect(new URL("/onboarding/questions", req.url))
    }

    if (isDashboardRoute) {
      if (!hasSelectedProfile) {
        return NextResponse.redirect(new URL("/onboarding/profile", req.url))
      }

      if (!profileCompleted) {
        return NextResponse.redirect(new URL("/onboarding/questions", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    pages: {
      signIn: "/auth/signin",
    },

    callbacks: {
      authorized: () => true,
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*"],
}