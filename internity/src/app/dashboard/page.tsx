"use client"

import type React from "react"

import { useState,useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Briefcase, Settings, Bell, LogOut, Sparkles, Lock, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/app/context/context";
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [agentActive, setAgentActive] = useState(false)
  const [credentialsOpen, setCredentialsOpen] = useState(false)
  const [user, setuser] = useState([])
  const {logoutUser} = useAuth()

  // Mock user data - would come from authentication in a real app
  useEffect(() => {
   fetchuser()
  }, [])
  
  const fetchuser = async () => {
    const response = await fetch(' http://127.0.0.1:5000/user/details', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    const userData = await response.json()
    console.log(userData)
    setuser(userData)
  }

  const handleLogout = () => {
    logoutUser()
    router.push('/')
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
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg text-[#f1eece]/70 hover:bg-[rgba(30,30,35,0.5)] transition-colors">
                    <Bell size={18} />
                    <span>Notifications</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg text-[#f1eece]/70 hover:bg-[rgba(30,30,35,0.5)] transition-colors" onClick={() => {handleLogout()}}>
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </Card>

            {/* Credentials Card */}
            <Card className="backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece]/20 shadow-lg rounded-2xl overflow-hidden mt-6">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#f1eece] flex items-center">
                    <Lock size={18} className="mr-2" />
                    Platform Credentials
                  </h3>
                </div>
                <p className="text-[#f1eece]/70 text-sm mb-4">
                  Connect your accounts to let our AI agent apply to internships on your behalf.
                </p>
                <Dialog open={credentialsOpen} onOpenChange={setCredentialsOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] border-none">
                      Manage Credentials
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="backdrop-blur-sm bg-[rgba(19,19,24,0.95)] border border-[#f1eece]/20 text-[#f1eece]">
                    <DialogHeader>
                      <DialogTitle className="text-[#f1eece]">Platform Credentials</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSaveCredentials} className="space-y-6 py-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="linkedin-email" className="text-[#f1eece]">
                              LinkedIn Email
                            </Label>
                          </div>
                          <Input
                            id="linkedin-email"
                            name="linkedin-email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece] placeholder:text-[#f1eece]/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="linkedin-password" className="text-[#f1eece]">
                              LinkedIn Password
                            </Label>
                          </div>
                          <Input
                            id="linkedin-password"
                            name="linkedin-password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece] placeholder:text-[#f1eece]/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="unstop-email" className="text-[#f1eece]">
                              Unstop Email
                            </Label>
                          </div>
                          <Input
                            id="unstop-email"
                            name="unstop-email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece] placeholder:text-[#f1eece]/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="unstop-password" className="text-[#f1eece]">
                              Unstop Password
                            </Label>
                          </div>
                          <Input
                            id="unstop-password"
                            name="unstop-password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece] placeholder:text-[#f1eece]/50"
                          />
                        </div>
                      </div>

                      <div className="bg-[rgba(30,30,35,0.5)] p-3 rounded-lg text-[#f1eece]/70 text-sm">
                        <p>
                          <strong>Security Note:</strong> We use these credentials only to let our AI apply on your
                          behalf. Your credentials are encrypted and never shared with third parties.
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] border-none"
                        >
                          Save Credentials
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
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

            {/* Dashboard Stats */}
            <Card className="backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece]/20 shadow-lg rounded-2xl overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#f1eece] mb-6">Dashboard Overview</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[rgba(30,30,35,0.5)] border border-[#f1eece]/10 rounded-lg p-4">
                    <h3 className="text-[#f1eece]/70 text-sm mb-1">Total Applications</h3>
                    <p className="text-2xl font-bold text-[#f1eece]">12</p>
                  </div>
                  <div className="bg-[rgba(30,30,35,0.5)] border border-[#f1eece]/10 rounded-lg p-4">
                    <h3 className="text-[#f1eece]/70 text-sm mb-1">Interviews</h3>
                    <p className="text-2xl font-bold text-[#f1eece]">3</p>
                  </div>
                  <div className="bg-[rgba(30,30,35,0.5)] border border-[#f1eece]/10 rounded-lg p-4">
                    <h3 className="text-[#f1eece]/70 text-sm mb-1">Success Rate</h3>
                    <p className="text-2xl font-bold text-[#f1eece]">25%</p>
                  </div>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6 bg-[rgba(30,30,35,0.5)]">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-[#f1eece] data-[state=active]:text-[#131318] text-[#f1eece]/80"
                    >
                      All Applications
                    </TabsTrigger>
                    <TabsTrigger
                      value="linkedin"
                      className="data-[state=active]:bg-[#f1eece] data-[state=active]:text-[#131318] text-[#f1eece]/80"
                    >
                      LinkedIn
                    </TabsTrigger>
                    <TabsTrigger
                      value="unstop"
                      className="data-[state=active]:bg-[#f1eece] data-[state=active]:text-[#131318] text-[#f1eece]/80"
                    >
                      Unstop
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
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
                  </TabsContent>

                  <TabsContent value="linkedin">
                    <div className="space-y-3">
                      {applications
                        .filter((app) => app.source === "LinkedIn")
                        .map((app) => (
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
                              <span className="text-xs text-[#f1eece]/50">
                                {new Date(app.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="unstop">
                    <div className="space-y-3">
                      {applications
                        .filter((app) => app.source === "Unstop")
                        .map((app) => (
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
                              <span className="text-xs text-[#f1eece]/50">
                                {new Date(app.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
