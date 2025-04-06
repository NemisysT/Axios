"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import ProgressBar from "../../components/progress-bar"
import NavigationButtons from "../../components/navigation-buttons"
import { useResumeForm, availableSkills } from "../../components/resume-form-context"

export default function SkillsStep() {
  const { formData, toggleSkill, saveFormData } = useResumeForm()

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (
    <>
      <ProgressBar
        currentStep={4}
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Skills</h1>
            <p className="text-gray-600">Select the skills that best represent you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableSkills.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${skill}`}
                  checked={formData.skills.includes(skill)}
                  onCheckedChange={() => toggleSkill(skill)}
                />
                <Label
                  htmlFor={`skill-${skill}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {skill}
                </Label>
              </div>
            ))}
          </div>

          <NavigationButtons
            currentStep={4}
            totalSteps={6}
            onSaveData={saveFormData}
            backUrl="/resume-builder/steps/step3"
            nextUrl="/resume-builder/steps/step5"
          />
        </motion.div>
      </Card>
    </>
  )
}

