"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface NavigationButtonsProps {
  currentStep: number
  totalSteps: number
  onSaveData: () => void
  backUrl: string
  nextUrl?: string
}

export default function NavigationButtons({
  currentStep,
  totalSteps,
  onSaveData,
  backUrl,
  nextUrl,
}: NavigationButtonsProps) {
  const router = useRouter()

  const handleBack = () => {
    onSaveData()
    router.push(backUrl)
  }

  const handleNext = () => {
    if (nextUrl) {
      onSaveData()
      router.push(nextUrl)
    }
  }

  return (
    <div className="mt-8 flex justify-between">
      <Button type="button" variant="outline" onClick={handleBack} className={currentStep === 1 ? "opacity-50" : ""}>
        <ArrowLeft size={16} className="mr-2" />
        Previous
      </Button>

      {nextUrl && (
        <Button
          type="button"
          onClick={handleNext}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
        >
          Next
          <ArrowRight size={16} className="ml-2" />
        </Button>
      )}
    </div>
  )
}

