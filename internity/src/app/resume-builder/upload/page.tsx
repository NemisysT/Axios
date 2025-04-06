"use client"

import { useState } from "react"
import { ArrowRight, FileText, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileUpload } from "@/components/ui/file-upload"
import Navbar from "@/components/layout/Navbar"

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const handleFileUpload = (files: File[]) => {
    if (files && files.length > 0) {
      const uploaded = files[0]
      if (
        uploaded.type === "application/pdf" ||
        uploaded.type === "application/msword" ||
        uploaded.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(uploaded)
      } else {
        alert("Please upload a PDF or Word document")
      }
    }
  }

  const removeFile = () => {
    setFile(null)
  }

  const handleNext = () => {
    localStorage.setItem(
      "uploadedResume",
      JSON.stringify({
        name: file?.name,
        size: file?.size,
        type: file?.type,
        lastModified: file?.lastModified,
      }),
    )
    router.push("/resume-builder/steps/step1")
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-[rgba(8,8,8,0.7)] to-[rgba(10,10,10,0.7)] text-[#f1eece]">
        <Card className="w-full max-w-2xl backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece] shadow-lg rounded-2xl overflow-hidden p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#f1eece] mb-2">Upload Your Resume</h1>
            <p className="text-[#e6e2b1]">Upload your existing resume and we'll help you enhance it</p>
          </div>

          {/* 🧩 File Upload Component */}
          <div className="mb-6">
            <FileUpload onChange={handleFileUpload} />
          </div>

          {/* 📂 File Display */}
          {file && (
            <div className="flex items-center justify-between bg-[rgba(19,19,24,0.85)] p-4 rounded-lg shadow mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FileText size={20} className="text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-[#f1eece] truncate max-w-xs">{file.name}</p>
                  <p className="text-sm text-[#e6e2b1]">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 hover:bg-red-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!file}
              className={`bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] py-2 px-6 rounded-lg transition-all duration-300 ${
                !file ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}
