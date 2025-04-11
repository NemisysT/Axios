"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"

const ResumeFormContext = createContext({
  formData: {
    basicInfo: {
      name: "",
      email: "",
      phone: "",
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
  },
  setFormData: (formData: any) => {},
  addEducation: () => {},
  addExperience: () => {},
  addProject: () => {},
})

export const useResumeForm = () => useContext(ResumeFormContext)

export const ResumeFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState({
    basicInfo: {
      name: "",
      email: "",
      phone: "",
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
  })

  const addEducation = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: [...prevFormData.education, { id: uuidv4(), institution: "", degree: "", year: "" }],
    }))
  }

  const addExperience = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      experience: [
        ...prevFormData.experience,
        { id: uuidv4(), title: "", company: "", startDate: "", endDate: "", description: "" },
      ],
    }))
  }

  const addProject = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      projects: [...prevFormData.projects, { id: uuidv4(), title: "", technologies: [], description: "" }],
    }))
  }

  const value = {
    formData,
    setFormData,
    addEducation,
    addExperience,
    addProject,
  }

  return <ResumeFormContext.Provider value={value}>{children}</ResumeFormContext.Provider>
}
