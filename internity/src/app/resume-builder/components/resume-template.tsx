"use client"

import { useState } from "react"

interface ResumeData {
  education: {
    institution: string
    degree: string
    date: string
    gpa?: string
    location?: string
  }[]
  skills: {
    category: string
    items: string[]
  }[]
  experience: {
    title: string
    company: string
    date: string
    location: string
    responsibilities: string[]
  }[]
  projects: {
    name: string
    technologies: string
    description: string[]
    links?: {
      github?: string
      live?: string
    }
  }[]
  achievements: string[]
  contact: {
    name: string
    email: string
    phone: string
    linkedin: string
    github: string
    portfolio?: string
  }
}

export default function ResumeTemplate() {
  const [resumeData] = useState<ResumeData>({
    contact: {
      name: "YOUR NAME",
      email: "your.email@example.com",
      phone: "(123) 456-7890",
      linkedin: "linkedin.com/in/yourprofile",
      github: "github.com/yourusername",
      portfolio: "yourportfolio.com",
    },
    education: [
      {
        institution: "University Name",
        degree: "Bachelor of Science in Computer Science",
        date: "Aug 2020 - May 2024",
        gpa: "3.8/4.0",
        location: "City, State",
      },
    ],
    skills: [
      {
        category: "Languages",
        items: ["JavaScript", "TypeScript", "Python", "Java", "C++"],
      },
      {
        category: "Frameworks & Libraries",
        items: ["React", "Next.js", "Node.js", "Express", "TailwindCSS"],
      },
      {
        category: "Tools & Technologies",
        items: ["Git", "GitHub", "VS Code", "Docker", "AWS", "Firebase"],
      },
      {
        category: "Databases",
        items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
      },
    ],
    experience: [
      {
        title: "Software Engineering Intern",
        company: "Company Name",
        date: "May 2023 - Aug 2023",
        location: "City, State",
        responsibilities: [
          "Developed and maintained web applications using React and Node.js, improving user experience and performance",
          "Collaborated with cross-functional teams to implement new features and resolve bugs",
          "Optimized database queries resulting in a 30% improvement in application response time",
          "Participated in code reviews and contributed to technical documentation",
        ],
      },
    ],
    projects: [
      {
        name: "Project Name",
        technologies: "React, Node.js, MongoDB, Express",
        description: [
          "Developed a full-stack web application that allows users to create and share content",
          "Implemented user authentication and authorization using JWT",
          "Designed and built RESTful APIs for data retrieval and manipulation",
          "Deployed the application using Docker and AWS EC2",
        ],
        links: {
          github: "github.com/yourusername/project",
          live: "project-demo.com",
        },
      },
      {
        name: "Another Project",
        technologies: "Next.js, TypeScript, TailwindCSS, Firebase",
        description: [
          "Built a responsive web application with real-time data synchronization",
          "Implemented server-side rendering for improved SEO and performance",
          "Created a custom authentication system with role-based access control",
          "Utilized Firebase for backend services and hosting",
        ],
        links: {
          github: "github.com/yourusername/another-project",
        },
      },
    ],
    achievements: [
      "Dean's List for Academic Excellence (2020-2023)",
      "1st Place in University Hackathon (2022)",
      "Recipient of Merit Scholarship for Outstanding Academic Performance",
      "Published research paper on [Topic] in [Journal/Conference]",
    ],
  })

  return (
    <div className="max-w-[850px] mx-auto p-8 bg-white text-black font-sans">
      {/* Header with Contact Information */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">{resumeData.contact.name}</h1>
        <div className="text-sm space-y-1">
          <div className="flex justify-center gap-4">
            <span>{resumeData.contact.email}</span>
            <span>{resumeData.contact.phone}</span>
          </div>
          <div className="flex justify-center gap-4">
            <span>{resumeData.contact.linkedin}</span>
            <span>{resumeData.contact.github}</span>
            {resumeData.contact.portfolio && <span>{resumeData.contact.portfolio}</span>}
          </div>
        </div>
      </header>

      {/* Education Section */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">Education</h2>
        <div className="space-y-3">
          {resumeData.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <div className="font-bold">{edu.institution}</div>
                <div>{edu.location}</div>
              </div>
              <div className="flex justify-between">
                <div>
                  {edu.degree}
                  {edu.gpa ? ` | GPA: ${edu.gpa}` : ""}
                </div>
                <div>{edu.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">Technical Skills</h2>
        <div className="space-y-2">
          {resumeData.skills.map((skillGroup, index) => (
            <div key={index} className="flex">
              <div className="font-bold w-40">{skillGroup.category}:</div>
              <div>{skillGroup.items.join(", ")}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">Experience</h2>
        <div className="space-y-4">
          {resumeData.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <div className="font-bold">{exp.title}</div>
                <div>{exp.date}</div>
              </div>
              <div className="flex justify-between">
                <div>{exp.company}</div>
                <div>{exp.location}</div>
              </div>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-sm">
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">Projects</h2>
        <div className="space-y-4">
          {resumeData.projects.map((project, index) => (
            <div key={index}>
              <div className="font-bold">
                {project.name} | {project.technologies}
                {project.links && (
                  <span className="font-normal">
                    {project.links.github && ` | GitHub: ${project.links.github}`}
                    {project.links.live && ` | Live: ${project.links.live}`}
                  </span>
                )}
              </div>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                {project.description.map((desc, idx) => (
                  <li key={idx} className="text-sm">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section>
        <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3">Achievements</h2>
        <ul className="list-disc pl-5 space-y-1">
          {resumeData.achievements.map((achievement, index) => (
            <li key={index} className="text-sm">
              {achievement}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
