"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  User,
  Settings,
  Bell,
  LogOut,
  Sparkles,
  Calendar,
  Building,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Mock internship data - would come from database in a real app
const mockInternships = [
  {
    id: "int1",
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "Remote",
    duration: "3 months",
    stipend: "₹15,000/month",
    skills: ["React", "JavaScript", "HTML/CSS"],
    description: "Join our team to build responsive web applications using React and modern JavaScript.",
    postedDate: "2023-04-10",
    deadline: "2023-05-10",
    source: "LinkedIn",
  },
  {
    id: "int2",
    title: "UI/UX Design Intern",
    company: "DesignHub",
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹20,000/month",
    skills: ["Figma", "UI/UX", "Prototyping"],
    description: "Work on designing user interfaces for our mobile and web applications.",
    postedDate: "2023-04-08",
    deadline: "2023-05-08",
    source: "Unstop",
  },
  {
    id: "int3",
    title: "Data Science Intern",
    company: "DataViz Inc",
    location: "Hybrid - Delhi, India",
    duration: "4 months",
    stipend: "₹25,000/month",
    skills: ["Python", "Machine Learning", "Data Analysis"],
    description: "Analyze large datasets and build machine learning models to derive insights.",
    postedDate: "2023-04-05",
    deadline: "2023-05-05",
    source: "LinkedIn",
  },
  {
    id: "int4",
    title: "Backend Developer Intern",
    company: "ServerStack",
    location: "Remote",
    duration: "3 months",
    stipend: "₹18,000/month",
    skills: ["Node.js", "Express", "MongoDB"],
    description: "Develop and maintain backend services for our web applications.",
    postedDate: "2023-04-03",
    deadline: "2023-05-03",
    source: "Unstop",
  },
  {
    id: "int5",
    title: "Mobile App Developer Intern",
    company: "AppWorks",
    location: "Mumbai, India",
    duration: "6 months",
    stipend: "₹22,000/month",
    skills: ["React Native", "JavaScript", "Mobile Development"],
    description: "Build cross-platform mobile applications using React Native.",
    postedDate: "2023-04-01",
    deadline: "2023-05-01",
    source: "LinkedIn",
  },
  {
    id: "int6",
    title: "DevOps Intern",
    company: "CloudTech",
    location: "Remote",
    duration: "4 months",
    stipend: "₹20,000/month",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    description: "Work on automating deployment pipelines and managing cloud infrastructure.",
    postedDate: "2023-03-28",
    deadline: "2023-04-28",
    source: "Unstop",
  },
]

export default function InternshipsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState<string[]>([])
  const [skillsFilter, setSkillsFilter] = useState<string[]>([])
  const [stipendRange, setStipendRange] = useState([0, 30000])
  const [sourceFilter, setSourceFilter] = useState<string[]>([])
  const [filteredInternships, setFilteredInternships] = useState(mockInternships)
  const [showFilters, setShowFilters] = useState(false)

  // User data - would come from authentication in a real app
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    profileImage: "/placeholder.svg?height=100&width=100",
  }

  // Extract all unique locations, skills, and sources for filters
  const allLocations = Array.from(
    new Set(
      mockInternships.map((internship) => {
        if (internship.location.includes("Remote")) return "Remote"
        if (internship.location.includes("Hybrid")) return "Hybrid"
        return internship.location.split(",")[0].trim()
      }),
    ),
  )

  const allSkills = Array.from(new Set(mockInternships.flatMap((internship) => internship.skills)))

  const allSources = Array.from(new Set(mockInternships.map((internship) => internship.source)))

  // Apply filters
  const applyFilters = () => {
    let filtered = [...mockInternships]

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (internship) =>
          internship.title.toLowerCase().includes(query) ||
          internship.company.toLowerCase().includes(query) ||
          internship.description.toLowerCase().includes(query) ||
          internship.skills.some((skill) => skill.toLowerCase().includes(query)),
      )
    }

    // Location filter
    if (locationFilter.length > 0) {
      filtered = filtered.filter((internship) => {
        const internshipLocation = internship.location.toLowerCase()
        return locationFilter.some((location) => {
          if (location === "Remote") return internshipLocation.includes("remote")
          if (location === "Hybrid") return internshipLocation.includes("hybrid")
          return internshipLocation.includes(location.toLowerCase())
        })
      })
    }

    // Skills filter
    if (skillsFilter.length > 0) {
      filtered = filtered.filter((internship) => skillsFilter.some((skill) => internship.skills.includes(skill)))
    }

    // Stipend range filter
    filtered = filtered.filter((internship) => {
      const stipendValue = Number.parseInt(internship.stipend.replace(/[^0-9]/g, ""))
      return stipendValue >= stipendRange[0] && stipendValue <= stipendRange[1]
    })

    // Source filter
    if (sourceFilter.length > 0) {
      filtered = filtered.filter((internship) => sourceFilter.includes(internship.source))
    }

    setFilteredInternships(filtered)
  }

  // Handle applying for an internship
  const handleApply = (internshipId: string) => {
    // This would trigger the AI agent to apply for the internship in a real app
    // Backend integration would go here (commented out as requested)
    /*
    fetch('/api/agent/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userId: user.id,
        internshipId: internshipId 
      }),
    });
    */

    alert(`AI agent will apply for internship ID: ${internshipId}`)
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setLocationFilter([])
    setSkillsFilter([])
    setStipendRange([0, 30000])
    setSourceFilter([])
    setFilteredInternships(mockInternships)
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
                    <Bell size={18} />
                    <span>Notifications</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg text-[#f1eece]/70 hover:bg-[rgba(30,30,35,0.5)] transition-colors">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </Card>

            {/* Filters Card - Desktop */}
            <Card className="backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece]/20 shadow-lg rounded-2xl overflow-hidden mt-6 hidden md:block">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#f1eece] flex items-center">
                    <Filter size={18} className="mr-2" />
                    Filters
                  </h3>
                  <Button
                    variant="link"
                    onClick={resetFilters}
                    className="text-[#f1eece]/70 hover:text-[#f1eece] p-0 h-auto"
                  >
                    Reset
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Location Filter */}
                  <div className="space-y-3">
                    <h4 className="text-[#f1eece]/90 font-medium">Location</h4>
                    <div className="space-y-2">
                      {allLocations.map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-${location}`}
                            checked={locationFilter.includes(location)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setLocationFilter([...locationFilter, location])
                              } else {
                                setLocationFilter(locationFilter.filter((l) => l !== location))
                              }
                            }}
                            className="border-[#f1eece]/30 data-[state=checked]:bg-[#f1eece] data-[state=checked]:text-[#131318]"
                          />
                          <Label htmlFor={`location-${location}`} className="text-[#f1eece]/80 text-sm cursor-pointer">
                            {location}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Filter */}
                  <div className="space-y-3">
                    <h4 className="text-[#f1eece]/90 font-medium">Skills</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                      {allSkills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={skillsFilter.includes(skill)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSkillsFilter([...skillsFilter, skill])
                              } else {
                                setSkillsFilter(skillsFilter.filter((s) => s !== skill))
                              }
                            }}
                            className="border-[#f1eece]/30 data-[state=checked]:bg-[#f1eece] data-[state=checked]:text-[#131318]"
                          />
                          <Label htmlFor={`skill-${skill}`} className="text-[#f1eece]/80 text-sm cursor-pointer">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stipend Range */}
                  <div className="space-y-3">
                    <h4 className="text-[#f1eece]/90 font-medium">Stipend Range</h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 30000]}
                        max={30000}
                        step={1000}
                        value={stipendRange}
                        onValueChange={setStipendRange}
                        className="[&_[role=slider]]:bg-[#f1eece]"
                      />
                      <div className="flex justify-between mt-2 text-[#f1eece]/70 text-sm">
                        <span>₹{stipendRange[0].toLocaleString()}</span>
                        <span>₹{stipendRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Source Filter */}
                  <div className="space-y-3">
                    <h4 className="text-[#f1eece]/90 font-medium">Source</h4>
                    <div className="space-y-2">
                      {allSources.map((source) => (
                        <div key={source} className="flex items-center space-x-2">
                          <Checkbox
                            id={`source-${source}`}
                            checked={sourceFilter.includes(source)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSourceFilter([...sourceFilter, source])
                              } else {
                                setSourceFilter(sourceFilter.filter((s) => s !== source))
                              }
                            }}
                            className="border-[#f1eece]/30 data-[state=checked]:bg-[#f1eece] data-[state=checked]:text-[#131318]"
                          />
                          <Label htmlFor={`source-${source}`} className="text-[#f1eece]/80 text-sm cursor-pointer">
                            {source}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={applyFilters}
                    className="w-full bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] border-none"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card className="backdrop-blur-sm bg-[rgba(19,19,24,0.85)] border border-[#f1eece]/20 shadow-lg rounded-2xl overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#f1eece] mb-6">Available Internships</h2>

                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#f1eece]/50"
                      size={18}
                    />
                    <Input
                      placeholder="Search internships..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece] placeholder:text-[#f1eece]/50"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-[180px] bg-[rgba(30,30,35,0.5)] border-[#f1eece]/30 text-[#f1eece]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#131318] border-[#f1eece]/30 text-[#f1eece]">
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="stipend-high">Highest Stipend</SelectItem>
                        <SelectItem value="stipend-low">Lowest Stipend</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      className="md:hidden border-[#f1eece]/30 text-[#f1eece]"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter size={18} />
                    </Button>
                    <Button
                      onClick={applyFilters}
                      className="bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] border-none"
                    >
                      Search
                    </Button>
                  </div>
                </div>

                {/* Mobile Filters */}
                {showFilters && (
                  <Card className="backdrop-blur-sm bg-[rgba(25,25,30,0.95)] border border-[#f1eece]/20 shadow-lg rounded-xl overflow-hidden mb-6 md:hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[#f1eece]">Filters</h3>
                        <Button
                          variant="link"
                          onClick={resetFilters}
                          className="text-[#f1eece]/70 hover:text-[#f1eece] p-0 h-auto"
                        >
                          Reset
                        </Button>
                      </div>

                      <Tabs defaultValue="location" className="w-full">
                        <TabsList className="grid grid-cols-4 mb-4 bg-[rgba(30,30,35,0.5)]">
                          <TabsTrigger
                            value="location"
                            className="data-[state=active]:bg-[#f1eece] data-[state=active]:text-[#131318] text-[#f1eece]/80"
                          >
                            Location
                          </TabsTrigger>
                          <TabsTrigger
                            value="skills"
                            className="data-[state=active]:bg-[#f1eece] data-[state=active]:text-[#131318] text-[#f1eece]/80"
                          >
                            Skills
                          </TabsTrigger>
                          <TabsTrigger
                            value="stipend"
                            className="data-[state=active]:bg-[#f1eece] data-[state=active]:text-[#131318] text-[#f1eece]/80"
                          >
                            Stipend
                          </TabsTrigger>
                          <TabsTrigger
                            value="source"
                            className="data-[state=active]:bg-[#f1eece] data-[state=active]:text-[#131318] text-[#f1eece]/80"
                          >
                            Source
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="location">
                          <div className="grid grid-cols-2 gap-2">
                            {allLocations.map((location) => (
                              <div key={location} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-location-${location}`}
                                  checked={locationFilter.includes(location)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setLocationFilter([...locationFilter, location])
                                    } else {
                                      setLocationFilter(locationFilter.filter((l) => l !== location))
                                    }
                                  }}
                                  className="border-[#f1eece]/30 data-[state=checked]:bg-[#f1eece] data-[state=checked]:text-[#131318]"
                                />
                                <Label
                                  htmlFor={`mobile-location-${location}`}
                                  className="text-[#f1eece]/80 text-sm cursor-pointer"
                                >
                                  {location}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="skills">
                          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                            {allSkills.map((skill) => (
                              <div key={skill} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-skill-${skill}`}
                                  checked={skillsFilter.includes(skill)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSkillsFilter([...skillsFilter, skill])
                                    } else {
                                      setSkillsFilter(skillsFilter.filter((s) => s !== skill))
                                    }
                                  }}
                                  className="border-[#f1eece]/30 data-[state=checked]:bg-[#f1eece] data-[state=checked]:text-[#131318]"
                                />
                                <Label
                                  htmlFor={`mobile-skill-${skill}`}
                                  className="text-[#f1eece]/80 text-sm cursor-pointer"
                                >
                                  {skill}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="stipend">
                          <div className="px-2">
                            <Slider
                              defaultValue={[0, 30000]}
                              max={30000}
                              step={1000}
                              value={stipendRange}
                              onValueChange={setStipendRange}
                              className="[&_[role=slider]]:bg-[#f1eece]"
                            />
                            <div className="flex justify-between mt-2 text-[#f1eece]/70 text-sm">
                              <span>₹{stipendRange[0].toLocaleString()}</span>
                              <span>₹{stipendRange[1].toLocaleString()}</span>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="source">
                          <div className="grid grid-cols-2 gap-2">
                            {allSources.map((source) => (
                              <div key={source} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`mobile-source-${source}`}
                                  checked={sourceFilter.includes(source)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSourceFilter([...sourceFilter, source])
                                    } else {
                                      setSourceFilter(sourceFilter.filter((s) => s !== source))
                                    }
                                  }}
                                  className="border-[#f1eece]/30 data-[state=checked]:bg-[#f1eece] data-[state=checked]:text-[#131318]"
                                />
                                <Label
                                  htmlFor={`mobile-source-${source}`}
                                  className="text-[#f1eece]/80 text-sm cursor-pointer"
                                >
                                  {source}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>

                      <Button
                        onClick={() => {
                          applyFilters()
                          setShowFilters(false)
                        }}
                        className="w-full mt-4 bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] border-none"
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </Card>
                )}

                {/* Active Filters */}
                {(locationFilter.length > 0 ||
                  skillsFilter.length > 0 ||
                  sourceFilter.length > 0 ||
                  stipendRange[0] > 0 ||
                  stipendRange[1] < 30000) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {locationFilter.map((location) => (
                      <Badge
                        key={location}
                        className="bg-[rgba(30,30,35,0.7)] text-[#f1eece] hover:bg-[rgba(30,30,35,0.9)] border border-[#f1eece]/20"
                        onClick={() => setLocationFilter(locationFilter.filter((l) => l !== location))}
                      >
                        {location} ×
                      </Badge>
                    ))}
                    {skillsFilter.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-[rgba(30,30,35,0.7)] text-[#f1eece] hover:bg-[rgba(30,30,35,0.9)] border border-[#f1eece]/20"
                        onClick={() => setSkillsFilter(skillsFilter.filter((s) => s !== skill))}
                      >
                        {skill} ×
                      </Badge>
                    ))}
                    {sourceFilter.map((source) => (
                      <Badge
                        key={source}
                        className="bg-[rgba(30,30,35,0.7)] text-[#f1eece] hover:bg-[rgba(30,30,35,0.9)] border border-[#f1eece]/20"
                        onClick={() => setSourceFilter(sourceFilter.filter((s) => s !== source))}
                      >
                        {source} ×
                      </Badge>
                    ))}
                    {(stipendRange[0] > 0 || stipendRange[1] < 30000) && (
                      <Badge
                        className="bg-[rgba(30,30,35,0.7)] text-[#f1eece] hover:bg-[rgba(30,30,35,0.9)] border border-[#f1eece]/20"
                        onClick={() => setStipendRange([0, 30000])}
                      >
                        ₹{stipendRange[0].toLocaleString()} - ₹{stipendRange[1].toLocaleString()} ×
                      </Badge>
                    )}
                    <Button
                      variant="link"
                      onClick={resetFilters}
                      className="text-[#f1eece]/70 hover:text-[#f1eece] p-0 h-auto"
                    >
                      Clear All
                    </Button>
                  </div>
                )}

                {/* Internship Cards */}
                <div className="space-y-4">
                  {filteredInternships.length > 0 ? (
                    filteredInternships.map((internship) => (
                      <motion.div
                        key={internship.id}
                        className="bg-[rgba(19,19,24,0.85)] text-[#f1eece] border border-[#f1eece]/20 rounded-xl p-4 shadow transition hover:border-[#f1eece]/40"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-xl font-semibold text-[#f1eece]">{internship.title}</h3>
                                <div className="flex items-center text-[#f1eece]/70 mt-1">
                                  <Building size={16} className="mr-1" />
                                  {internship.company}
                                </div>
                              </div>
                              <Badge className="bg-[rgba(30,30,35,0.7)] text-[#f1eece] border border-[#f1eece]/20">
                                {internship.source}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
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

                            <p className="text-[#f1eece]/80 mt-3 text-sm">{internship.description}</p>

                            <div className="flex flex-wrap gap-2 mt-3">
                              {internship.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  className="bg-[#f1eece]/10 text-[#f1eece]/90 border border-[#f1eece]/20"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center text-[#f1eece]/60 text-xs">
                                <Calendar size={12} className="mr-1" />
                                Posted: {new Date(internship.postedDate).toLocaleDateString()}
                                <span className="mx-2">•</span>
                                <Calendar size={12} className="mr-1" />
                                Deadline: {new Date(internship.deadline).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-row md:flex-col justify-between md:justify-center gap-2 md:min-w-[150px]">
                            <Button
                              onClick={() => handleApply(internship.id)}
                              className="bg-gradient-to-r from-[#7d0d1b] to-[#a90519] hover:from-[#a90519] hover:to-[#ff102a] text-[#f1eece] border-none"
                            >
                              <Sparkles size={16} className="mr-2" />
                              Apply via AI
                            </Button>
                            <Button
                              variant="outline"
                              className="border-[#f1eece]/30 text-[#f1eece] hover:bg-[#f1eece]/10"
                            >
                              <ExternalLink size={16} className="mr-2" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-[#f1eece]/50">
                      <p className="text-lg">No internships found matching your filters.</p>
                      <Button
                        variant="link"
                        onClick={resetFilters}
                        className="text-[#f1eece]/70 hover:text-[#f1eece] mt-2"
                      >
                        Reset Filters
                      </Button>
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
