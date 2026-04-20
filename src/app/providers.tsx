"use client"

import type { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/providers/ThemeProvider"

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  )
}
