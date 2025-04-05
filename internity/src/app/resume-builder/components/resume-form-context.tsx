"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for our form data
export interface BasicInfo {
  name: string
  email: string
  phone: string
  profilePicture: File | null
}

export interface Education {
  degree: string
  institution: string
  year: string
  id: string
}

export interface Experience {
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
  id: string
}

export interface FormData {
  basicInfo: BasicInfo
  education: Education[]
  experience: Experience[]
  skills: string[]
}

// Initial form data
export const initialFormData: FormData = {
  basicInfo: {
    name: "",
    email: "",
    phone: "",
    profilePicture: null,
  },
  education: [
    {
      degree: "",
      institution: "",
      year: "",
      id: "edu-1",
    },
  ],
  experience: [
    {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      id: "exp-1",
    },
  ],
  skills: [],
}

// Available skills for selection
export const availableSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Python",
  "Java",
  "C#",
  "PHP",
  "HTML",
  "CSS",
  "SQL",
  "NoSQL",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "Git",
  "Agile",
  "Scrum",
  "Project Management",
  "UI/UX Design",
  "Figma",
  "Communication",
  "Leadership",
  "Problem Solving",
  "Teamwork",
]

interface ResumeFormContextType {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  previewUrl: string | null
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>
  saveFormData: () => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBasicInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEducationChange: (index: number, field: keyof Education, value: string) => void
  addEducation: () => void
  removeEducation: (index: number) => void
  handleExperienceChange: (index: number, field: keyof Experience, value: string) => void
  addExperience: () => void
  removeExperience: (index: number) => void
  toggleSkill: (skill: string) => void
}

const ResumeFormContext = createContext<ResumeFormContextType | undefined>(undefined)

export function ResumeFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Load form data from localStorage if available
  useEffect(() => {
    const savedData = localStorage.getItem("resumeFormData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // We need to handle the File object separately since it can't be serialized
        setFormData({
          ...parsedData,
          basicInfo: {
            ...parsedData.basicInfo,
            profilePicture: null,
          },
        })

        // Restore preview URL if it exists
        const savedPreviewUrl = localStorage.getItem("profilePicturePreview")
        if (savedPreviewUrl) {
          setPreviewUrl(savedPreviewUrl)
        }
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }
  }, [])

  // Save form data to localStorage
  const saveFormData = () => {
    localStorage.setItem("resumeFormData", JSON.stringify(formData))

    // Save preview URL separately
    if (previewUrl) {
      localStorage.setItem("profilePicturePreview", previewUrl)
    }
  }

  // Handle file upload for profile picture
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFormData({
        ...formData,
        basicInfo: {
          ...formData.basicInfo,
          profilePicture: file,
        },
      })

      // Create a preview URL
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    }
  }

  // Handle basic info changes
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      basicInfo: {
        ...formData.basicInfo,
        [name]: value,
      },
    })
  }

  // Handle education changes
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...formData.education]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      education: updatedEducation,
    })
  }

  // Add new education entry
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: "",
          institution: "",
          year: "",
          id: `edu-${Date.now()}`,
        },
      ],
    })
  }

  // Remove education entry
  const removeEducation = (index: number) => {
    if (formData.education.length > 1) {
      const updatedEducation = [...formData.education]
      updatedEducation.splice(index, 1)
      setFormData({
        ...formData,
        education: updatedEducation,
      })
    }
  }

  // Handle experience changes
  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const updatedExperience = [...formData.experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    }
    setFormData({
      ...formData,
      experience: updatedExperience,
    })
  }

  // Add new experience entry
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
          id: `exp-${Date.now()}`,
        },
      ],
    })
  }

  // Remove experience entry
  const removeExperience = (index: number) => {
    if (formData.experience.length > 1) {
      const updatedExperience = [...formData.experience]
      updatedExperience.splice(index, 1)
      setFormData({
        ...formData,
        experience: updatedExperience,
      })
    }
  }

  // Handle skill toggle
  const toggleSkill = (skill: string) => {
    if (formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: formData.skills.filter((s) => s !== skill),
      })
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      })
    }
  }

  return (
    <ResumeFormContext.Provider
      value={{
        formData,
        setFormData,
        previewUrl,
        setPreviewUrl,
        saveFormData,
        handleFileChange,
        handleBasicInfoChange,
        handleEducationChange,
        addEducation,
        removeEducation,
        handleExperienceChange,
        addExperience,
        removeExperience,
        toggleSkill,
      }}
    >
      {children}
    </ResumeFormContext.Provider>
  )
}

export function useResumeForm() {
  const context = useContext(ResumeFormContext)
  if (context === undefined) {
    throw new Error("useResumeForm must be used within a ResumeFormProvider")
  }
  return context
}

