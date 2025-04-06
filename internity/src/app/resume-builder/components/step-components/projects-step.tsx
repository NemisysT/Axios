"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Code } from "lucide-react"
import { useResumeForm, availableTechnologies } from "../../components/resume-form-context"

export default function ProjectsStepContent() {
  const { formData, handleProjectChange, toggleProjectTechnology, addProject, removeProject } = useResumeForm()

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Projects</h1>
        <p className="text-gray-600">Add your notable projects and the technologies you used</p>
      </div>

      <div className="space-y-6">
        {formData.projects.map((project, index) => (
          <div key={project.id} className="p-6 border border-gray-200 rounded-lg bg-white/80 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Project #{index + 1}</h3>
              {formData.projects.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`project-title-${index}`} className="text-gray-700">
                  Project Title
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <Code size={18} />
                  </div>
                  <Input
                    id={`project-title-${index}`}
                    placeholder="E-commerce Website"
                    className="pl-10"
                    value={project.title}
                    onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`project-description-${index}`} className="text-gray-700">
                  Project Description
                </Label>
                <Textarea
                  id={`project-description-${index}`}
                  placeholder="Describe your project, its purpose, and your role..."
                  className="min-h-[100px]"
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Technologies Used</Label>
                <div className="max-h-[200px] overflow-y-auto border border-gray-200 rounded-md p-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableTechnologies.map((tech) => (
                      <div key={tech} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tech-${index}-${tech}`}
                          checked={project.technologies.includes(tech)}
                          onCheckedChange={() => toggleProjectTechnology(index, tech)}
                        />
                        <Label
                          htmlFor={`tech-${index}-${tech}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tech}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addProject} className="w-full py-2 border-dashed">
          <Plus size={16} className="mr-2" />
          Add Another Project
        </Button>
      </div>
    </>
  )
}

