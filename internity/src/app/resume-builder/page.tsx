"use client"
import { Upload, FileText, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function ResumeBuilderLanding() {
  const router = useRouter()

  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Start Your Resume 🚀</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create a professional resume in minutes. Choose how you want to get started.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <motion.div whileHover="hover" variants={cardVariants}>
          <Card
            className="h-full backdrop-blur-md bg-white/70 border border-white/20 shadow-lg rounded-2xl overflow-hidden"
          >
            <CardContent className="p-8 flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <Upload size={32} className="text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Resume</h2>
              <p className="text-gray-600 text-center mb-6">
                Already have a resume? Upload it and we'll help you enhance it.
              </p>
              <Button
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
                onClick={() => router.push("/resume-builder/upload")}
              >
                Upload File
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover="hover" variants={cardVariants}>
          <Card
            className="h-full backdrop-blur-md bg-white/70 border border-white/20 shadow-lg rounded-2xl overflow-hidden"
          >
            <CardContent className="p-8 flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                <FileText size={32} className="text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Build From Scratch</h2>
              <p className="text-gray-600 text-center mb-6">
                Create a new resume with our step-by-step guided process.
              </p>
              <Button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
                onClick={() => router.push("/resume-builder/build")}
              >
                Get Started
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
