"use client"

import type React from "react"

import { ResumeFormProvider } from "../components/resume-form-context"

export default function ResumeBuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ResumeFormProvider>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="w-full max-w-4xl">{children}</div>
      </div>
    </ResumeFormProvider>
  )
}

