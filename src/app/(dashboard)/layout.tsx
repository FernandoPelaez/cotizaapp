"use client"

import { usePathname } from "next/navigation"
import { useState, type ReactNode } from "react"
import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"

const SIDEBAR_COLLAPSIBLE_ROUTES = [
  "/personalizar",
  "/cotizaciones",
  "/plantillas",
]

const SIDEBAR_WIDTH = "256px"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const canCollapseSidebar = SIDEBAR_COLLAPSIBLE_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        
        backgroundColor: "var(--background, #e5e5e5)",
        color: "var(--foreground, #0f172a)",
      }}
    >
      <div
        style={{
          
          width: canCollapseSidebar && sidebarCollapsed ? "0px" : SIDEBAR_WIDTH,
          overflow: "hidden",
          flexShrink: 0,
          transition: "width 0.2s ease",
        }}
      >
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onToggleSidebar={() => {
            if (!canCollapseSidebar) return
            setSidebarCollapsed((value) => !value)
          }}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main
          className="hide-scrollbar flex-1 overflow-y-auto p-4"
          style={{
            backgroundColor: "var(--background, #e5e5e5)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
