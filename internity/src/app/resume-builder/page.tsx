"use client"
import { Upload, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Navbar from "@/components/layout/Navbar"

export default function ResumeBuilderLanding() {
  const router = useRouter()

  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(241, 238, 206, 0.2)",
      transition: { duration: 0.3 },
    },
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-[#080808] via-[#0a0a0a] to-[#000000] text-[#f1eece]">
        <div className="w-full max-w-4xl text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start Your Resume <span className="text-[#ff102a]">🚀</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Create a professional resume in minutes. Choose how you want to get started.
          </p>
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <motion.div whileHover="hover" variants={cardVariants}>
            <Card className="h-full bg-white/5 border border-[#131318] rounded-2xl overflow-hidden backdrop-blur-md shadow-[0_0_20px_rgba(241,238,206,0.05)] transition-all duration-300">
              <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 rounded-full bg-[#7d0d1b]/20 flex items-center justify-center mb-6">
                  <Upload size={32} className="text-[#ff102a]" />
                </div>
                <h2 className="text-2xl font-bold text-[#f1eece] mb-4">Upload Resume</h2>
                <p className="text-gray-400 text-center mb-6">
                  Already have a resume? Upload it and we'll help you enhance it.
                </p>
                <Button
                  className="rounded-full px-8 py-5 bg-gradient-to-r from-[rgba(8,8,8,0.7)] to-[rgba(10,10,10,0.7)] 
                  hover:from-[rgba(19,19,24,0.85)] hover:to-[rgba(19,19,24,0.85)] 
                  text-[#f1eece] text-base font-medium shadow-lg backdrop-blur-sm 
                  border border-transparent hover:border-[#f1eece] hover:shadow-[0_0_15px_#f1eece] 
                  transition duration-300"
                  onClick={() => router.push("/resume-builder/upload")}
                >
                  Upload File
                  <ArrowRight size={20} className="ml-2 text-[#f1eece]" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover="hover" variants={cardVariants}>
            <Card className="h-full bg-white/5 border border-[#131318] rounded-2xl overflow-hidden backdrop-blur-md shadow-[0_0_20px_rgba(241,238,206,0.05)] transition-all duration-300">
              <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 rounded-full bg-[#a90519]/20 flex items-center justify-center mb-6">
                  <FileText size={32} className="text-[#f1eece]" />
                </div>
                <h2 className="text-2xl font-bold text-[#f1eece] mb-4">Build From Scratch</h2>
                <p className="text-gray-400 text-center mb-6">
                  Create a new resume with our step-by-step guided process.
                </p>
                <Button
                  className="rounded-full px-8 py-5 bg-gradient-to-r from-[rgba(8,8,8,0.7)] to-[rgba(10,10,10,0.7)] 
                  hover:from-[rgba(19,19,24,0.85)] hover:to-[rgba(19,19,24,0.85)] 
                  text-[#f1eece] text-base font-medium shadow-lg backdrop-blur-sm 
                  border border-transparent hover:border-[#f1eece] hover:shadow-[0_0_15px_#f1eece] 
                  transition duration-300"
                  onClick={() => router.push("/resume-builder/steps/step1")}
                >
                  Get Started
                  <ArrowRight size={20} className="ml-2 text-[#f1eece]" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  )
}
