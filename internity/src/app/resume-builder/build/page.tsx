"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function BuildResume() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the first step
    router.push("/resume-builder/steps")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <p className="text-lg text-gray-600">Redirecting to step 1...</p>
      </div>
    </div>
  )
}

