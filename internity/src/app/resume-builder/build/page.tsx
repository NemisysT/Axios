"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function BuildResume() {
  const router = useRouter()

  useEffect(() => {
    // Initialize form data in localStorage if it doesn't exist
    if (!localStorage.getItem("resumeFormData")) {
      const initialData = {
        basicInfo: {
          name: "",
          email: "",
          phone: "",
          profilePicture: null,
        },
        education: [
          {
            degree: "",
            institution: "",
            year: "",
            id: "edu-1",
          },
        ],
        experience: [
          {
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
            id: "exp-1",
          },
        ],
        skills: [],
      }
      localStorage.setItem("resumeFormData", JSON.stringify(initialData))
    }

    // Navigate to the first step
    router.push("/resume-builder/steps/step1")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Preparing your resume builder...</p>
      </div>
    </div>
  )
}

