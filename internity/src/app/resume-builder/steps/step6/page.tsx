"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Mail, Phone, Edit, Save, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import ProgressBar from "../../components/progress-bar"
import NavigationButtons from "../../components/navigation-buttons"
import { useResumeForm } from "../../components/resume-form-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BasicInfoStepContent from "../../components/step-components/basic-info-step"
import EducationStepContent from "../../components/step-components/education-step"
import ExperienceStepContent from "../../components/step-components/experience-step"
import SkillsStepContent from "../../components/step-components/skills-step"
import ProjectsStepContent from "../../components/step-components/projects-step"

export default function ReviewStep() {
  const {
    formData,
    previewUrl,
    saveFormData,
    isLoading,
    isEditing,
    setIsEditing,
    fetchResumeFromBackend,
    saveResumeToBackend,
  } = useResumeForm()

  // Fetch resume data when component mounts
  useEffect(() => {
    fetchResumeFromBackend()
  }, [])

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  // Generate PDF and send data to backend
  const generatePDF = async () => {
    await saveResumeToBackend()
    alert("Your resume has been generated and is ready for download!")
  }

  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }

  const handleSaveChanges = async () => {
    await saveResumeToBackend()
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading your resume...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <ProgressBar
        currentStep={6}
        totalSteps={6}
        stepLabels={["Basic Info", "Education", "Experience", "Skills", "Projects", "Review"]}
      />

      <Card className="backdrop-blur-md bg-white/70 border border-white/20 shadow-xl rounded-2xl overflow-hidden">
        <motion.div
          initial="initial"
          animate="animate"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Review Your Resume</h1>
              <p className="text-gray-600">Here's a preview of your resume</p>
            </div>
            <Button onClick={toggleEditMode} variant="outline" className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Save size={16} />
                  <span>View Mode</span>
                </>
              ) : (
                <>
                  <Edit size={16} />
                  <span>Edit Mode</span>
                </>
              )}
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-8">
              <Tabs defaultValue="basic-info" className="w-full">
                <TabsList className="grid grid-cols-5 w-full mb-6">
                  <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="basic-info">
                  <BasicInfoStepContent />
                </TabsContent>

                <TabsContent value="education">
                  <EducationStepContent />
                </TabsContent>

                <TabsContent value="experience">
                  <ExperienceStepContent />
                </TabsContent>

                <TabsContent value="skills">
                  <SkillsStepContent />
                </TabsContent>

                <TabsContent value="projects">
                  <ProjectsStepContent />
                </TabsContent>
              </Tabs>

              <div className="flex justify-center">
                <Button
                  onClick={handleSaveChanges}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
                >
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
              {/* Basic Info Preview */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  {previewUrl && (
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{formData.basicInfo.name || "Your Name"}</h2>
                    <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
                      {formData.basicInfo.email && (
                        <div className="flex items-center">
                          <Mail size={14} className="mr-1" />
                          {formData.basicInfo.email}
                        </div>
                      )}
                      {formData.basicInfo.phone && (
                        <div className="flex items-center">
                          <Phone size={14} className="mr-1" />
                          {formData.basicInfo.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Preview */}
              {formData.education.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Education</h3>
                  {formData.education.map((edu) => (
                    <div key={edu.id} className="space-y-1">
                      <div className="font-medium">{edu.degree || "Degree"}</div>
                      <div className="text-gray-600">{edu.institution || "Institution"}</div>
                      <div className="text-gray-500 text-sm">{edu.year || "Year"}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience Preview */}
              {formData.experience.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Experience</h3>
                  {formData.experience.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="font-medium">{exp.title || "Job Title"}</div>
                      <div className="text-gray-600">{exp.company || "Company"}</div>
                      <div className="text-gray-500 text-sm">
                        {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                      </div>
                      <p className="text-gray-700 text-sm">{exp.description || "Job description..."}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects Preview */}
              {formData.projects.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Projects</h3>
                  {formData.projects.map((project) => (
                    <div key={project.id} className="space-y-2">
                      <div className="font-medium">{project.title || "Project Title"}</div>
                      <p className="text-gray-700 text-sm">{project.description || "Project description..."}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Preview */}
              {formData.skills.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Button
              onClick={generatePDF}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
            >
              <Download size={16} className="mr-2" />
              Export as PDF
            </Button>
          </div>

          <NavigationButtons
            currentStep={6}
            totalSteps={6}
            onSaveData={saveFormData}
            backUrl="/resume-builder/steps/step5"
          />
        </motion.div>
      </Card>
    </>
  )
}

