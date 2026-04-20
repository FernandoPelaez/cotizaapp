"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const isPersonalizar = pathname.startsWith("/personalizar")

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 text-foreground">
      <div
        style={{
          width: isPersonalizar && sidebarCollapsed ? "0px" : "240px",
          overflow: "hidden",
          flexShrink: 0,
          transition: "width .2s ease",
        }}
      >
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main className="hide-scrollbar flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}