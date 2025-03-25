import React from 'react'
import MainLayout from '@/components/layout/MainLayout'
import GetStartedCTA from '@/components/ui/GetStartedCTA'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const faqCategories = [
    { id: 'all', name: 'All' },
    { id: 'prosearch', name: 'prosearch' },
    { id: 'proresume', name: 'proresume' },
  ]

  const faqs = [
    {
      question: 'How is your resume different from other similar resume building apps?',
      category: 'proresume',
    },
    {
      question: 'How many resume templates are available?',
      category: 'proresume',
    },
    {
      question: 'How do you ensure the resumes are customized to my domain?',
      category: 'proresume',
    },
    {
      question: 'Is it really free?',
      category: 'all',
    },
    {
      question: 'Is it like a job board?',
      category: 'prosearch',
    },
    {
      question: 'Why do I have to download an extension?',
      category: 'prosearch',
    },
    {
      question: 'Do you send the same resume with every job application?',
      category: 'all',
    },
    {
      question: 'Which jobs can I see on proism?',
      category: 'prosearch',
    },
    {
      question: 'What is job compatibility score?',
      category: 'prosearch',
    },
  ]

  return (
    <MainLayout>
      {/* Contact Form Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="text-gray-400 mb-2 block">Reach Out for Support</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Whether you need help with your Proism account, want to inquire about our features, or have
              feedback, our team is ready to assist. Drop us a message and we'll get back to you promptly.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-1.5">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-1.5">
                <textarea
                  placeholder="What's on your mind?"
                  rows={4}
                  className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-1.5">
                <input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md"
                >
                  Submit
                </Button>
              </div>
            </div>

            <div className="flex justify-center mt-12 space-x-6">
              <Link href="https://discord.gg/DWTHc7xW2Y" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8.59 15.3c-.9 0-1.62-.73-1.62-1.62 0-.9.73-1.62 1.62-1.62.9 0 1.62.73 1.62 1.62 0 .9-.73 1.62-1.62 1.62Z"></path>
                    <path d="M15.41 15.3c-.9 0-1.62-.73-1.62-1.62 0-.9.73-1.62 1.62-1.62.9 0 1.62.73 1.62 1.62 0 .9-.72 1.62-1.62 1.62Z"></path>
                    <path d="M19.18 5.53C18.24 5.05 17.22 4.72 16.17 4.56c-.18.31-.39.75-.53 1.09-1.15-.17-2.29-.17-3.43 0-.14-.34-.35-.78-.54-1.09-1.05.16-2.07.49-3.01.97-1.91 2.85-2.44 5.65-2.17 8.4.94.67 1.86 1.09 2.75 1.35.22-.3.42-.61.59-.95-.33-.12-.64-.28-.93-.47.08-.06.15-.13.22-.2 1.71.77 3.58.77 5.29 0 .08.07.15.14.22.2-.29.19-.6.35-.93.47.18.34.37.65.59.95.9-.26 1.81-.68 2.75-1.35.31-3.13-.53-5.9-2.36-8.4Z"></path>
                  </svg>
                </div>
              </Link>
              <Link href="https://www.instagram.com/proism.in/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </Link>
              <Link href="https://www.linkedin.com/company/proism" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
              </Link>
              <Link href="mailto:info@proism.in" className="hover:opacity-80">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">FAQs</h2>
            <p className="text-gray-400">Do you have a question? We probably have answers.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full border ${
                  category.id === 'all'
                    ? 'border-white text-white'
                    : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-800 py-4"
                >
                  <button className="flex justify-between items-center w-full text-left">
                    <span className="text-lg font-medium">{faq.question}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GetStartedCTA />
    </MainLayout>
  )
}
