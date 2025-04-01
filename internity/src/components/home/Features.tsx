"use client"

import React from 'react'
import { ArrowRight, Search, Target, FileText, Send } from 'lucide-react'

const Features = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* AI-Powered Tools Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Tools for Effortless Job Search</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Leverage Axios to streamline your job search. Our AI-driven tools customize resumes based on your profile and job description, while filtering and ranking job postings, ensuring only the best-fit opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-purple-900/10 to-transparent rounded-2xl p-8 backdrop-blur-sm border border-purple-900/20">
              <h3 className="text-xl font-semibold mb-4">Job Search with ease</h3>
              <p className="text-gray-400">
                Prosim analyzes your profile and the job description to provide you with the jobs that are best compatible with you.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/10 to-transparent rounded-2xl p-8 backdrop-blur-sm border border-purple-900/20">
              <h3 className="text-xl font-semibold mb-4">On-demand Resumes</h3>
              <p className="text-gray-400">
                ProAI detects your skills and job roles from your profile.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Works like Magic, but How?</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Choose the jobs you like. We will take care of the rest. Our goal is to help you find the best job offers quickly and with least possible effort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Search className="w-12 h-12 text-purple-light" />,
                title: "Search",
                description: "ProAI takes over the job search for you. Our algorithms scour the internet to find the perfect job openings, removing your need to search."
              },
              {
                icon: <Target className="w-12 h-12 text-purple-light" />,
                title: "Match",
                description: "We ensure these jobs fit your profile before presenting you with the most suitable options along with a compatibility ratings."
              },
              {
                icon: <FileText className="w-12 h-12 text-purple-light" />,
                title: "Generate",
                description: "ProAI then crafts personalized resumes to each jobs requirements. Our tools are designed to ensure compatibility with ATS, effectively delivering your credentials."
              },
              {
                icon: <Send className="w-12 h-12 text-purple-light" />,
                title: "Apply",
                description: "The final step involves seamless applications. Our AI will auto-apply your job applications in the queue, attaches the necessary documents every time, and manages the submission process."
              }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
