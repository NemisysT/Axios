"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone } from "lucide-react"
import { useResumeForm } from "../../components/resume-form-context"

export default function BasicInfoStepContent() {
  const { formData, previewUrl, handleBasicInfoChange, handleFileChange } = useResumeForm()

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Basic Information</h1>
        <p className="text-gray-600">Let's start with your personal details</p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4 border-4 border-white shadow-lg">
            {previewUrl ? (
              <img src={previewUrl || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={48} className="text-gray-400" />
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("profile-upload")?.click()}
            className="mt-2"
          >
            Upload Photo
          </Button>
          <input id="profile-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">
              Full Name
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <User size={18} />
              </div>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                className="pl-10"
                value={formData.basicInfo.name}
                onChange={handleBasicInfoChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                value={formData.basicInfo.email}
                onChange={handleBasicInfoChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700">
              Phone Number
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <Phone size={18} />
              </div>
              <Input
                id="phone"
                name="phone"
                placeholder="(123) 456-7890"
                className="pl-10"
                value={formData.basicInfo.phone}
                onChange={handleBasicInfoChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

