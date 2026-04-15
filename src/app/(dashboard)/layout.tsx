import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-200 text-foreground">
      
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        
        <Header />

        <main className="flex-1 p-4 bg-gray-200 overflow-y-auto">
          
          <div className="bg-white rounded-2xl p-6 min-h-full shadow-sm">
            {children}
          </div>

        </main>

      </div>
    </div>
  )
}
