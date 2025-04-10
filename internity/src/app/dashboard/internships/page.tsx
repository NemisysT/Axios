"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Briefcase,
  Settings,
  LogOut,
  Lock,
  MapPin,
  Clock,
  DollarSign,
  Building,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Filter,
  Save,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Type definitions for the internship data structures
interface LinkedInInternship {
  id: string
  title: string
  company: string
  location: string
  duration: string
  stipend: string
  category: string
}

interface InternshalaInternship {
  id: string
  title: string
  company: string
  applicants: string
  days_left: string
  skills: string[]
  category: string
  scraped_at: string
  url: string | null
}

interface UnstopInternship {
  id: string
  title: string
  company: string
  location: string
  duration: string
  stipend: string
  category: string
}


export default function InternshipsPage() {

  useEffect(() => {
      const clock = document.getElementById("system-clock")
      const date = document.getElementById("system-date")
  
      if (!clock || !date) return
  
      function updateTime() {
        const now = new Date()
  
        if (clock) {
          clock.textContent = now.toLocaleTimeString("en-US", { hour12: false })
        }
        if (date) {
          date.textContent = now.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        }
      }
  
      const intervalId = setInterval(updateTime, 1000)
      updateTime()
  
      return () => clearInterval(intervalId) // Cleanup interval on component unmount
    }, [])

  const [activeInternshipTab, setActiveInternshipTab] = useState("linkedin")
  const [preferencesOpen, setPreferencesOpen] = useState(true)
  const [credentialsOpen, setCredentialsOpen] = useState(false)

  // Loading states for each platform
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false)
  const [isInternshalaLoading, setIsInternshalaLoading] = useState(false)
  const [isUnstopLoading, setIsUnstopLoading] = useState(false)

  // Internship data for each platform
  const [linkedInInternships, setLinkedInInternships] = useState<LinkedInInternship[]>([])
  const [internshalaInternships, setInternshalaInternships] = useState<InternshalaInternship[]>([])
  const [unstopInternships, setUnstopInternships] = useState<UnstopInternship[]>([])

  // Application preferences
  const [category, setCategory] = useState("")
  const [userType, setUserType] = useState("fresher")
  const [passingYear, setPassingYear] = useState("2026")
  const [quickApply, setQuickApply] = useState(true)

  // Platform credentials
  const [credentials, setCredentials] = useState({
    linkedin: { email: "", password: "" },
    unstop: { email: "", password: "" },
    internshala: { email: "", password: "" },
  })

  // Mock user data - would come from authentication in a real app
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    profileImage: "/placeholder.svg?height=100&width=100",
  }

  // Mock LinkedIn internships
  const mockLinkedInInternships: LinkedInInternship[] = [
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

  // Mock Internshala internships
  const mockInternshalaInternships: InternshalaInternship[] = [
    {
      id: "in1",
      title: "WordPress Developer",
      company: "Godwin Vox Dei",
      applicants: "N/A",
      days_left: "10",
      skills: ["Fresher"],
      category: "full-stack-development",
      scraped_at: "2025-04-10T16:02:37.458Z",
      url: null,
    },
    {
      id: "in2",
      title: "React Developer",
      company: "CodeCraft",
      applicants: "50+",
      days_left: "5",
      skills: ["React", "JavaScript", "CSS"],
      category: "frontend-development",
      scraped_at: "2025-04-10T16:02:37.458Z",
      url: "https://example.com/job1",
    },
    {
      id: "in3",
      title: "UI/UX Designer",
      company: "DesignHub",
      applicants: "25+",
      days_left: "15",
      skills: ["Figma", "Adobe XD", "UI Design"],
      category: "design",
      scraped_at: "2025-04-10T16:02:37.458Z",
      url: "https://example.com/job2",
    },
  ]

  // Mock Unstop internships
  const mockUnstopInternships: UnstopInternship[] = [
    {
      id: "un1",
      title: "Machine Learning Engineer",
      company: "AI Solutions",
      location: "Hyderabad",
      duration: "6 Months",
      stipend: "₹ 25,000 /month",
      category: "machine-learning-internship",
    },
    {
      id: "un2",
      title: "Data Analyst",
      company: "DataInsights",
      location: "Remote",
      duration: "3 Months",
      stipend: "₹ 12,000 /month",
      category: "data-analysis-internship",
    },
    {
      id: "un3",
      title: "Backend Developer",
      company: "ServerStack",
      location: "Delhi",
      duration: "4 Months",
      stipend: "₹ 18,000 /month",
      category: "backend-development-internship",
    },
  ]

  // Load initial data
  useEffect(() => {
    // In a real app, this would fetch data from the database
    // For now, we'll use the mock data
    setLinkedInInternships(mockLinkedInInternships)
    setInternshalaInternships(mockInternshalaInternships)
    setUnstopInternships(mockUnstopInternships)

    // MongoDB integration would look like this (commented out as requested)
    /*
    const fetchInternships = async () => {
      try {
        // Connect to MongoDB
        // const client = await connectToMongoDB();
        // const db = client.db("resume_platform");
        
        // Fetch internships for each platform
        // const linkedInData = await db.collection("internships").find({ source: "linkedin" }).toArray();
        // const internshalaData = await db.collection("internships").find({ source: "internshala" }).toArray();
        // const unstopData = await db.collection("internships").find({ source: "unstop" }).toArray();
        
        // Update state with fetched data
        // setLinkedInInternships(linkedInData);
        // setInternshalaInternships(internshalaData);
        // setUnstopInternships(unstopData);
        
        // Close MongoDB connection
        // await client.close();
      } catch (error) {
        console.error("Error fetching internships:", error);
      }
    };
    
    fetchInternships();
    */
  }, [])

  // Handle scraping for each platform
  const handleScrapeLinkedIn = async () => {
    setIsLinkedInLoading(true)

    // In a real app, this would call the API to scrape LinkedIn
    // For now, we'll simulate a delay and then update with mock data
    setTimeout(() => {
      // MongoDB integration would look like this (commented out as requested)
      /*
      fetch('/api/scrape/linkedin', {
        method: 'POST',
      })
        .then(response => response.json())
        .then(data => {
          setLinkedInInternships(data);
        })
        .catch(error => {
          console.error('Error scraping LinkedIn:', error);
        })
        .finally(() => {
          setIsLinkedInLoading(false);
        });
      */

      // For demo purposes, just update with the mock data after a delay
      setLinkedInInternships([...mockLinkedInInternships])
      setIsLinkedInLoading(false)
    }, 2000)
  }

  const handleScrapeInternshala = async () => {
    setIsInternshalaLoading(true)

    // In a real app, this would call the API to scrape Internshala
    // For now, we'll simulate a delay and then update with mock data
    setTimeout(() => {
      // MongoDB integration would look like this (commented out as requested)
      /*
      fetch('/api/scrape/internshala', {
        method: 'POST',
      })
        .then(response => response.json())
        .then(data => {
          setInternshalaInternships(data);
        })
        .catch(error => {
          console.error('Error scraping Internshala:', error);
        })
        .finally(() => {
          setIsInternshalaLoading(false);
        });
      */

      // For demo purposes, just update with the mock data after a delay
      setInternshalaInternships([...mockInternshalaInternships])
      setIsInternshalaLoading(false)
    }, 2000)
  }

  const handleScrapeUnstop = async () => {
    setIsUnstopLoading(true)

    // In a real app, this would call the API to scrape Unstop
    // For now, we'll simulate a delay and then update with mock data
    setTimeout(() => {
      // MongoDB integration would look like this (commented out as requested)
      /*
      fetch('/api/scrape/unstop', {
        method: 'POST',
      })
        .then(response => response.json())
        .then(data => {
          setUnstopInternships(data);
        })
        .catch(error => {
          console.error('Error scraping Unstop:', error);
        })
        .finally(() => {
          setIsUnstopLoading(false);
        });
      */

      // For demo purposes, just update with the mock data after a delay
      setUnstopInternships([...mockUnstopInternships])
      setIsUnstopLoading(false)
    }, 2000)
  }

  // Handle saving application preferences
  const handleSavePreferences = () => {
    // In a real app, this would save the preferences to the database
    // For now, we'll just log them to the console
    console.log("Saving preferences:", { category, userType, passingYear, quickApply })

    // MongoDB integration would look like this (commented out as requested)
    /*
    fetch('/api/user/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        category, 
        userType, 
        passingYear, 
        quickApply 
      }),
    });
    */

    // Show a success message
    alert("Application preferences saved successfully!")
  }

  // Handle saving platform credentials
  const handleSaveCredentials = () => {
    // In a real app, this would save the credentials to the database
    // For now, we'll just log them to the console
    console.log("Saving credentials:", credentials)

    // MongoDB integration would look like this (commented out as requested)
    /*
    fetch('/api/user/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    */

    // Show a success message
    alert("Platform credentials saved successfully!")
  }

  // Handle credential input changes
  const handleCredentialChange = (platform: string, field: string, value: string) => {
    setCredentials({
      ...credentials,
      [platform]: {
        ...credentials[platform as keyof typeof credentials],
        [field]: value,
      },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgba(8,8,8,0.7)] to-[rgba(10,10,10,0.7)] text-[#f1eece]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Sidebar / Navigation */}
          <div className="w-full md:w-64 mb-8 md:mb-0">
            <Card className="backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece]/20 shadow-lg rounded-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-[rgba(30,30,35,0.5)] flex items-center justify-center overflow-hidden mb-4 border-2 border-[#f1eece]/30">
                    <img
                      src={user.profileImage || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-[#f1eece]">{user.name}</h2>
                  <p className="text-[#f1eece]/70 text-sm">{user.email}</p>
                </div>

                <nav className="space-y-1">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg text-[#f1eece]/70 hover:bg-[rgba(30,30,35,0.5)] transition-colors"
                  >
                    <User size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/dashboard/internships"
                    className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(30,30,35,0.5)] text-[#f1eece] hover:bg-[rgba(30,30,35,0.7)] transition-colors"
                  >
                    <Briefcase size={18} />
                    <span>Internships</span>
                  </Link>
                  <Link
                    href="/resume-builder"
                    className="flex items-center gap-3 p-3 rounded-lg text-[#f1eece]/70 hover:bg-[rgba(30,30,35,0.5)] transition-colors"
                  >
                    <Settings size={18} />
                    <span>Resume Builder</span>
                  </Link>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg text-[#f1eece]/70 hover:bg-[rgba(30,30,35,0.5)] transition-colors">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </Card>

            <Card className="backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece]/20 shadow-lg rounded-2xl overflow-hidden mt-6">
              <div className="p-6 text-center space-y-6">
                <div>
                  <h4 className="text-xs uppercase text-[#f1eece]/40 tracking-wide">System Time</h4>
                  <h1 className="text-4xl font-semibold text-[#f1eece] tracking-wider" id="system-clock">
                    00:00:00
                  </h1>
                  <p className="text-[#f1eece]/60 text-sm tracking-wide mt-1" id="system-date">
                    Apr 10, 2025
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Internship Sources Card */}
            <Card className="backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece]/20 shadow-lg rounded-2xl overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#f1eece] mb-6">Internship Sources</h2>

                <Tabs defaultValue="linkedin" value={activeInternshipTab} onValueChange={setActiveInternshipTab}>
                  <TabsList className="grid grid-cols-3 mb-6 bg-[rgba(30,30,35,0.5)]">
                    <TabsTrigger
                      value="linkedin"
                      className="data-[state=active]:bg-[#f1eece] data-[state=active]:text-[#131318] text-[#f1eece]/80"
                    >
                      LinkedIn
                    </TabsTrigger>
                    <TabsTrigger
                      value="internshala"
                      className="data-[state=active]:bg-[#f1eece] data-[state=active]:text-[#131318] text-[#f1eece]/80"
                    >
                      Internshala
                    </TabsTrigger>
                    <TabsTrigger
                      value="unstop"
                      className="data-[state=active]:bg-[#f1eece] data-[state=active]:text-[#131318] text-[#f1eece]/80"
                    >
                      Unstop
                    </TabsTrigger>
                  </TabsList>

                  {/* LinkedIn Tab */}
                  <TabsContent value="linkedin">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-[#f1eece]">LinkedIn Internships</h3>
                      <Button
                        onClick={handleScrapeLinkedIn}
                        disabled={isLinkedInLoading}
                        className="bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] border-none"
                      >
                        {isLinkedInLoading ? (
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

                    {isLinkedInLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin h-6 w-6 border-2 border-[#a90519] border-t-transparent rounded-full"></div>
                        <span className="ml-3 text-[#f1eece]/70">Scraping LinkedIn internships...</span>
                      </div>
                    ) : linkedInInternships.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {linkedInInternships.map((internship) => (
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
                  </TabsContent>

                  {/* Internshala Tab */}
                  <TabsContent value="internshala">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-[#f1eece]">Internshala Internships</h3>
                      <Button
                        onClick={handleScrapeInternshala}
                        disabled={isInternshalaLoading}
                        className="bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] border-none"
                      >
                        {isInternshalaLoading ? (
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

                    {isInternshalaLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin h-6 w-6 border-2 border-[#a90519] border-t-transparent rounded-full"></div>
                        <span className="ml-3 text-[#f1eece]/70">Scraping Internshala internships...</span>
                      </div>
                    ) : internshalaInternships.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {internshalaInternships.map((internship) => (
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

                              <div className="flex items-center justify-between mt-3">
                                <div className="text-[#f1eece]/70 text-sm">
                                  <span className="font-medium">Applicants:</span> {internship.applicants}
                                </div>
                                <div className="text-[#f1eece]/70 text-sm">
                                  <span className="font-medium">Days Left:</span> {internship.days_left}
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 mt-3">
                                {internship.skills.map((skill, index) => (
                                  <Badge
                                    key={index}
                                    className="bg-[#f1eece]/10 text-[#f1eece]/90 border border-[#f1eece]/20"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>

                              <div className="mt-auto pt-3 flex justify-between items-center">
                                <Badge className="bg-[#f1eece]/10 text-[#f1eece]/90 border border-[#f1eece]/20">
                                  {internship.category}
                                </Badge>
                                <div className="text-[#f1eece]/50 text-xs">
                                  Scraped: {new Date(internship.scraped_at).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-[#f1eece]/50">
                        <p>No Internshala internships found. Click "Scrape Now" to fetch the latest listings.</p>
                      </div>
                    )}
                  </TabsContent>

                  {/* Unstop Tab */}
                  <TabsContent value="unstop">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-[#f1eece]">Unstop Internships</h3>
                      <Button
                        onClick={handleScrapeUnstop}
                        disabled={isUnstopLoading}
                        className="bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] border-none"
                      >
                        {isUnstopLoading ? (
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

                    {isUnstopLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin h-6 w-6 border-2 border-[#a90519] border-t-transparent rounded-full"></div>
                        <span className="ml-3 text-[#f1eece]/70">Scraping Unstop internships...</span>
                      </div>
                    ) : unstopInternships.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {unstopInternships.map((internship) => (
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
                        <p>No Unstop internships found. Click "Scrape Now" to fetch the latest listings.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </Card>

            {/* Application Preferences Section */}
            <Collapsible
              open={preferencesOpen}
              onOpenChange={setPreferencesOpen}
              className="backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece]/20 shadow-lg rounded-2xl overflow-hidden mb-6"
            >
              <div className="p-6">
                <CollapsibleTrigger asChild>
                  <div className="flex justify-between items-center cursor-pointer">
                    <h2 className="text-2xl font-bold text-[#f1eece] flex items-center">
                      <Filter size={20} className="mr-2" />
                      Application Preferences
                    </h2>
                    <Button variant="ghost" className="p-0 h-auto text-[#f1eece]">
                      {preferencesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-[#f1eece]">
                        Category
                      </Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece]">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#131318] border-[#f1eece]/30 text-[#f1eece]">
                          <SelectItem value="tech">Tech</SelectItem>
                          <SelectItem value="media">Media</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="data">Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="userType" className="text-[#f1eece]">
                        User Type
                      </Label>
                      <Select value={userType} onValueChange={setUserType}>
                        <SelectTrigger className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece]">
                          <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#131318] border-[#f1eece]/30 text-[#f1eece]">
                          <SelectItem value="fresher">Fresher</SelectItem>
                          <SelectItem value="experienced">Experienced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passingYear" className="text-[#f1eece]">
                        Passing Year
                      </Label>
                      <Select value={passingYear} onValueChange={setPassingYear}>
                        <SelectTrigger className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece]">
                          <SelectValue placeholder="Select passing year" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#131318] border-[#f1eece]/30 text-[#f1eece]">
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                          <SelectItem value="2027">2027</SelectItem>
                          <SelectItem value="2028">2028</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quickApply" className="text-[#f1eece]">
                        Quick Apply
                      </Label>
                      <div className="flex items-center space-x-2 pt-2">
                        <Switch
                          id="quickApply"
                          checked={quickApply}
                          onCheckedChange={setQuickApply}
                          className="data-[state=checked]:bg-[#a90519]"
                        />
                        <Label htmlFor="quickApply" className="text-[#f1eece]/70">
                          {quickApply ? "Enabled" : "Disabled"}
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleSavePreferences}
                      className="bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] border-none"
                    >
                      <Save size={16} className="mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Platform Credentials Section */}
            <Collapsible
              open={credentialsOpen}
              onOpenChange={setCredentialsOpen}
              className="backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece]/20 shadow-lg rounded-2xl overflow-hidden"
            >
              <div className="p-6">
                <CollapsibleTrigger asChild>
                  <div className="flex justify-between items-center cursor-pointer">
                    <h2 className="text-2xl font-bold text-[#f1eece] flex items-center">
                      <Lock size={20} className="mr-2" />
                      Platform Credentials
                    </h2>
                    <Button variant="ghost" className="p-0 h-auto text-[#f1eece]">
                      {credentialsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-6 space-y-6">
                  {/* LinkedIn Credentials
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#f1eece]">LinkedIn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin-email" className="text-[#f1eece]">
                          LinkedIn Email
                        </Label>
                        <Input
                          id="linkedin-email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece] placeholder:text-[#f1eece]/50"
                          value={credentials.linkedin.email}
                          onChange={(e) => handleCredentialChange("linkedin", "email", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin-password" className="text-[#f1eece]">
                          LinkedIn Password
                        </Label>
                        <Input
                          id="linkedin-password"
                          type="password"
                          placeholder="••••••••"
                          className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece] placeholder:text-[#f1eece]/50"
                          value={credentials.linkedin.password}
                          onChange={(e) => handleCredentialChange("linkedin", "password", e.target.value)}
                        />
                      </div>
                    </div>
                  </div> */}

                  {/* Unstop Credentials */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#f1eece]">Unstop</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="unstop-email" className="text-[#f1eece]">
                          Unstop Email
                        </Label>
                        <Input
                          id="unstop-email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece] placeholder:text-[#f1eece]/50"
                          value={credentials.unstop.email}
                          onChange={(e) => handleCredentialChange("unstop", "email", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unstop-password" className="text-[#f1eece]">
                          Unstop Password
                        </Label>
                        <Input
                          id="unstop-password"
                          type="password"
                          placeholder="••••••••"
                          className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece] placeholder:text-[#f1eece]/50"
                          value={credentials.unstop.password}
                          onChange={(e) => handleCredentialChange("unstop", "password", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Internshala Credentials */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#f1eece]">Internshala</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="internshala-email" className="text-[#f1eece]">
                          Internshala Email
                        </Label>
                        <Input
                          id="internshala-email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece] placeholder:text-[#f1eece]/50"
                          value={credentials.internshala.email}
                          onChange={(e) => handleCredentialChange("internshala", "email", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="internshala-password" className="text-[#f1eece]">
                          Internshala Password
                        </Label>
                        <Input
                          id="internshala-password"
                          type="password"
                          placeholder="••••••••"
                          className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece] placeholder:text-[#f1eece]/50"
                          value={credentials.internshala.password}
                          onChange={(e) => handleCredentialChange("internshala", "password", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[rgba(30,30,35,0.5)] p-4 rounded-lg text-[#f1eece]/70 text-sm flex items-start space-x-2">
                    <Shield className="h-5 w-5 text-[#a90519] mt-0.5 flex-shrink-0" />
                    <p>
                      These credentials are securely stored and used only to apply on your behalf. Your data is
                      encrypted and never shared with third parties.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleSaveCredentials}
                      className="bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] border-none"
                    >
                      <Save size={16} className="mr-2" />
                      Save Credentials
                    </Button>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  )
}
