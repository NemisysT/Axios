import type { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">{children}</div>
}

