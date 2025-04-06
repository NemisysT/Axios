"use client"

import { Button } from "@/components/ui/button"
import { Download, Mail, Phone } from "lucide-react"
import { useResumeForm } from "../../components/resume-form-context"

export default function ReviewStepContent() {
  const { formData, previewUrl } = useResumeForm()

  // Generate PDF (mock function)
  const generatePDF = () => {
    alert("In a real application, this would generate a PDF of your resume.")
    // This would typically call a PDF generation library or API
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Review Your Resume</h1>
        <p className="text-gray-600">Here's a preview of your resume</p>
      </div>

      <div className="space-y-8 p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
        {/* Basic Info Preview */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {previewUrl && (
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={previewUrl || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
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

      <div className="mt-8 flex justify-center">
        <Button
          onClick={generatePDF}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
        >
          <Download size={16} className="mr-2" />
          Export as PDF
        </Button>
      </div>
    </>
  )
}

