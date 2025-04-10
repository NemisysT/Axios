"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Building, MapPin, Clock, DollarSign } from "lucide-react"
import { motion } from "framer-motion"
import { LayoutWrapper } from "../components/layout-wrapper"
import { CredentialsSection } from "../components/credentials-section"

// Type definition for LinkedIn internship data
interface LinkedInInternship {
  id: string
  title: string
  company: string
  location: string
  duration: string
  stipend: string
  category: string
}

export default function LinkedInInternshipsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [internships, setInternships] = useState<LinkedInInternship[]>([])

  // Mock LinkedIn internships
  const mockInternships: LinkedInInternship[] = [
    {
      id: "li1",
      title: "Web Development",
      company: "Foodcow",
      location: "Chennai",
      duration: "3 Months",
      stipend: "₹ 5,000 - 10,000 /month",
      category: "web-development-internship",
    },
    {
      id: "li2",
      title: "Frontend Developer",
      company: "TechSolutions",
      location: "Remote",
      duration: "6 Months",
      stipend: "₹ 15,000 /month",
      category: "frontend-development-internship",
    },
    {
      id: "li3",
      title: "Full Stack Developer",
      company: "WebWizards",
      location: "Bangalore",
      duration: "4 Months",
      stipend: "₹ 20,000 - 25,000 /month",
      category: "full-stack-development-internship",
    },
  ]

  // Load initial data
  useEffect(() => {
    setInternships(mockInternships)
  }, [])

  // Handle scraping for LinkedIn
  const handleScrape = async () => {
    setIsLoading(true)

    // In a real app, this would call the API to scrape LinkedIn
    // For now, we'll simulate a delay and then update with mock data
    setTimeout(() => {
      // For demo purposes, just update with the mock data after a delay
      setInternships([...mockInternships])
      setIsLoading(false)
    }, 2000)
  }

  return (
    <LayoutWrapper title="LinkedIn Internships">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#f1eece]">LinkedIn Internships</h3>
        <Button
          onClick={handleScrape}
          disabled={isLoading}
          className="bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] border-none"
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-[#f1eece] border-t-transparent rounded-full"></div>
              Scraping...
            </>
          ) : (
            <>
              <RefreshCw size={16} className="mr-2" />
              Scrape Now
            </>
          )}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin h-6 w-6 border-2 border-[#a90519] border-t-transparent rounded-full"></div>
          <span className="ml-3 text-[#f1eece]/70">Scraping LinkedIn internships...</span>
        </div>
      ) : internships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {internships.map((internship) => (
            <motion.div
              key={internship.id}
              className="bg-[rgba(19,19,24,0.85)] text-[#f1eece] border border-[#f1eece]/20 rounded-xl p-4 shadow transition hover:scale-[1.01]"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col h-full">
                <h4 className="text-lg font-semibold text-[#f1eece]">{internship.title}</h4>
                <div className="flex items-center text-[#f1eece]/70 mt-1">
                  <Building size={16} className="mr-1" />
                  {internship.company}
                </div>

                <div className="grid grid-cols-1 gap-2 mt-3">
                  <div className="flex items-center text-[#f1eece]/70 text-sm">
                    <MapPin size={14} className="mr-1" />
                    {internship.location}
                  </div>
                  <div className="flex items-center text-[#f1eece]/70 text-sm">
                    <Clock size={14} className="mr-1" />
                    {internship.duration}
                  </div>
                  <div className="flex items-center text-[#f1eece]/70 text-sm">
                    <DollarSign size={14} className="mr-1" />
                    {internship.stipend}
                  </div>
                </div>

                <div className="mt-auto pt-3">
                  <Badge className="bg-[#f1eece]/10 text-[#f1eece]/90 border border-[#f1eece]/20">
                    {internship.category}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-[#f1eece]/50">
          <p>No LinkedIn internships found. Click "Scrape Now" to fetch the latest listings.</p>
        </div>
      )}
      <CredentialsSection />
    </LayoutWrapper>
  )
}
