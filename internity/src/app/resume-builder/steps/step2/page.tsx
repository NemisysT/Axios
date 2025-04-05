"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Building, Calendar, Plus, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import ProgressBar from "../../components/progress-bar"
import NavigationButtons from "../../components/navigation-buttons"
import { useResumeForm } from "../../components/resume-form-context"

export default function EducationStep() {
  const { formData, handleEducationChange, addEducation, removeEducation, saveFormData } = useResumeForm()

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (
    <>
      <ProgressBar
        currentStep={2}
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Education</h1>
            <p className="text-gray-600">Add your educational background</p>
          </div>

          <div className="space-y-6">
            {formData.education.map((edu, index) => (
              <div key={edu.id} className="p-6 border border-gray-200 rounded-lg bg-white/80 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Education #{index + 1}</h3>
                  {formData.education.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`} className="text-gray-700">
                      Degree
                    </Label>
                    <Select value={edu.degree} onValueChange={(value) => handleEducationChange(index, "degree", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High School">High School</SelectItem>
                        <SelectItem value="Associate's">Associate's Degree</SelectItem>
                        <SelectItem value="Bachelor's">Bachelor's Degree</SelectItem>
                        <SelectItem value="Master's">Master's Degree</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`institution-${index}`} className="text-gray-700">
                      Institution
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Building size={18} />
                      </div>
                      <Input
                        id={`institution-${index}`}
                        placeholder="University or School Name"
                        className="pl-10"
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`year-${index}`} className="text-gray-700">
                      Graduation Year
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <Calendar size={18} />
                      </div>
                      <Input
                        id={`year-${index}`}
                        placeholder="2023"
                        className="pl-10"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addEducation} className="w-full py-2 border-dashed">
              <Plus size={16} className="mr-2" />
              Add Another Education
            </Button>
          </div>

          <NavigationButtons
            currentStep={2}
            totalSteps={5}
            onSaveData={saveFormData}
            backUrl="/resume-builder/steps/step1"
            nextUrl="/resume-builder/steps/step3"
          />
        </motion.div>
      </Card>
    </>
  )
}

