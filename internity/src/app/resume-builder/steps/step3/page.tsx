"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Briefcase, Building, Calendar, Plus, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import ProgressBar from "../../components/progress-bar"
import NavigationButtons from "../../components/navigation-buttons"
import { useResumeForm } from "../../components/resume-form-context"

export default function ExperienceStep() {
  const { formData, handleExperienceChange, addExperience, removeExperience, saveFormData } = useResumeForm()

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (
    <>
      <ProgressBar
        currentStep={3}
        totalSteps={5}
        stepLabels={["Basic Info", "Education", "Experience", "Skills", "Review"]}
      />

      <Card className="backdrop-blur-md bg-white/70 border border-white/20 shadow-xl rounded-2xl overflow-hidden">
        <motion.div
          initial="initial"
          animate="animate"
          variants={pageVariants}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Work Experience</h1>
            <p className="text-gray-600">Add your professional experience</p>
          </div>

          <div className="space-y-6">
            {formData.experience.map((exp, index) => (
              <div key={exp.id} className="p-6 border border-gray-200 rounded-lg bg-white/80 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Experience #{index + 1}</h3>
                  {formData.experience.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${index}`} className="text-gray-700">
                      Job Title
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Briefcase size={18} />
                      </div>
                      <Input
                        id={`title-${index}`}
                        placeholder="Software Engineer"
                        className="pl-10"
                        value={exp.title}
                        onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`company-${index}`} className="text-gray-700">
                      Company
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Building size={18} />
                      </div>
                      <Input
                        id={`company-${index}`}
                        placeholder="Company Name"
                        className="pl-10"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${index}`} className="text-gray-700">
                        Start Date
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                          <Calendar size={18} />
                        </div>
                        <Input
                          id={`startDate-${index}`}
                          placeholder="MM/YYYY"
                          className="pl-10"
                          value={exp.startDate}
                          onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${index}`} className="text-gray-700">
                        End Date
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                          <Calendar size={18} />
                        </div>
                        <Input
                          id={`endDate-${index}`}
                          placeholder="MM/YYYY or Present"
                          className="pl-10"
                          value={exp.endDate}
                          onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${index}`} className="text-gray-700">
                      Description
                    </Label>
                    <Textarea
                      id={`description-${index}`}
                      placeholder="Describe your responsibilities and achievements..."
                      className="min-h-[100px]"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addExperience} className="w-full py-2 border-dashed">
              <Plus size={16} className="mr-2" />
              Add Another Experience
            </Button>
          </div>

          <NavigationButtons
            currentStep={3}
            totalSteps={5}
            onSaveData={saveFormData}
            backUrl="/resume-builder/steps/step2"
            nextUrl="/resume-builder/steps/step4"
          />
        </motion.div>
      </Card>
    </>
  )
}

