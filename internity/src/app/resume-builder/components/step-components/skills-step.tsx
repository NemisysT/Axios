import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useResumeForm, availableSkills } from "../../components/resume-form-context"

export default function SkillsStepContent() {
  const { formData, toggleSkill } = useResumeForm()

  return (
    <>
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
    </>
  )
}

