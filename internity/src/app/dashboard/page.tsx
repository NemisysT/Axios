"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { User, Briefcase, Settings, LogOut, Sparkles, ExternalLink, Building, Calendar } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [agentActive, setAgentActive] = useState(false)
  const [credentialsOpen, setCredentialsOpen] = useState(false)
  const [activeInternshipTab, setActiveInternshipTab] = useState("linkedin")

  // Loading states for each platform
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false)
  const [isInternshalaLoading, setIsInternshalaLoading] = useState(false)
  const [isUnstopLoading, setIsUnstopLoading] = useState(false)

  // Internship data for each platform
  const [linkedInInternships, setLinkedInInternships] = useState<LinkedInInternship[]>([])
  const [internshalaInternships, setInternshalaInternships] = useState<InternshalaInternship[]>([])
  const [unstopInternships, setUnstopInternships] = useState<UnstopInternship[]>([])

  // Mock user data - would come from authentication in a real app
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    profileImage: "/placeholder.svg?height=100&width=100",
  }

  // Mock internship applications - would come from database in a real app
  const applications = [
    {
      id: "app1",
      company: "TechCorp",
      position: "Frontend Developer Intern",
      status: "Applied",
      date: "2023-04-15",
      source: "LinkedIn",
    },
    {
      id: "app2",
      company: "InnovateSoft",
      position: "UI/UX Design Intern",
      status: "Interview",
      date: "2023-04-12",
      source: "Unstop",
    },
    {
      id: "app3",
      company: "DataViz Inc",
      position: "Data Science Intern",
      status: "Rejected",
      date: "2023-04-08",
      source: "LinkedIn",
    },
  ]

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

  const handleAgentToggle = (checked: boolean) => {
    setAgentActive(checked)

    // This would trigger the AI agent to start/stop in a real app
    // Backend integration would go here (commented out as requested)
    /*
    if (checked) {
      // Start the AI agent
      fetch('/api/agent/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });
    } else {
      // Stop the AI agent
      fetch('/api/agent/stop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });
    }
    */
  }

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault()

    // This would save the credentials to the database in a real app
    // Backend integration would go here (commented out as requested)
    /*
    const formData = new FormData(e.target as HTMLFormElement);
    const credentials = {
      linkedin: {
        email: formData.get('linkedin-email'),
        password: formData.get('linkedin-password'),
      },
      unstop: {
        email: formData.get('unstop-email'),
        password: formData.get('unstop-password'),
      },
    };

    // Save credentials to database
    fetch('/api/user/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    */

    setCredentialsOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "Interview":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "Rejected":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

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
                    className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(30,30,35,0.5)] text-[#f1eece] hover:bg-[rgba(30,30,35,0.7)] transition-colors"
                  >
                    <User size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/dashboard/internships"
                    className="flex items-center gap-3 p-3 rounded-lg text-[#f1eece]/70 hover:bg-[rgba(30,30,35,0.5)] transition-colors"
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
                  {/* <button className="w-full flex items-center gap-3 p-3 rounded-lg text-[#f1eece]/70 hover:bg-[rgba(30,30,35,0.5)] transition-colors">
                    <Bell size={18} />
                    <span>Notifications</span>
                  </button> */}
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
            {/* AI Agent Panel */}
            <Card className="backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece]/20 shadow-lg rounded-2xl overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#f1eece] flex items-center">
                    <Sparkles size={20} className="mr-2" />
                    AI Agent
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-[#f1eece]/70">{agentActive ? "Active" : "Inactive"}</span>
                    <Switch
                      checked={agentActive}
                      onCheckedChange={handleAgentToggle}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg mb-6 ${agentActive ? "bg-green-500/10 border border-green-500/30" : "bg-[rgba(30,30,35,0.5)] border border-[#f1eece]/20"}`}
                >
                  <p className="text-[#f1eece]/90">
                    {agentActive
                      ? "Your AI agent is actively searching for internships that match your profile. It will automatically apply to suitable positions on your behalf."
                      : "Activate your AI agent to automatically search and apply for internships that match your profile."}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#f1eece]">Recent Applications</h3>
                    <Link
                      href="/dashboard/internships"
                      className="text-[#f1eece]/70 text-sm hover:text-[#f1eece] transition-colors flex items-center"
                    >
                      View All
                      <ExternalLink size={14} className="ml-1" />
                    </Link>
                  </div>

                  {applications.length > 0 ? (
                    <div className="space-y-3">
                      {applications.map((app) => (
                        <div
                          key={app.id}
                          className="p-4 border border-[#f1eece]/10 rounded-lg bg-[rgba(30,30,35,0.5)] hover:bg-[rgba(30,30,35,0.7)] transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-[#f1eece]">{app.position}</h4>
                              <p className="text-[#f1eece]/70 text-sm">{app.company}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge className={`${getStatusColor(app.status)}`}>{app.status}</Badge>
                                <span className="text-xs text-[#f1eece]/50">via {app.source}</span>
                              </div>
                            </div>
                            <span className="text-xs text-[#f1eece]/50">{new Date(app.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[#f1eece]/50">
                      <p>No applications yet. Activate the AI agent to start applying.</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Past Applications Section */}
            <Card className="backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece]/20 shadow-lg rounded-2xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#f1eece] mb-6">Past Applications</h2>

                {/* Past Applications Cards */}
                <div className="space-y-4">
                  {applications.length > 0 ? (
                    applications.map((app) => (
                      <motion.div
                        key={app.id}
                        className="bg-[rgba(19,19,24,0.85)] text-[#f1eece] border border-[#f1eece]/20 rounded-xl p-4 shadow transition hover:scale-[1.01]"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-[#f1eece]">{app.position}</h3>
                            <div className="flex items-center text-[#f1eece]/70 mt-1">
                              <Building size={16} className="mr-1" />
                              {app.company}
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                              <Badge className={`${getStatusColor(app.status)}`}>{app.status}</Badge>
                              <div className="flex items-center text-[#f1eece]/70 text-sm">
                                <span className="text-[#f1eece]/50 mr-1">via</span>
                                {app.source}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center text-[#f1eece]/60 text-sm">
                            <Calendar size={14} className="mr-1" />
                            Applied: {new Date(app.date).toLocaleDateString()}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-[#f1eece]/50">
                      <p>No applications yet. Activate the AI agent to start applying.</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

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
