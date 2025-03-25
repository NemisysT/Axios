import React from 'react'
import MainLayout from '@/components/layout/MainLayout'
import GetStartedCTA from '@/components/ui/GetStartedCTA'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const blogPosts = [
  {
    title: 'How AI is Revolutionizing the Job Search Process',
    excerpt: 'Artificial Intelligence is transforming how job seekers find and apply for jobs. Learn how Proism is leading this revolution.',
    date: 'March 10, 2025',
    category: 'Technology',
    slug: '/blog/ai-job-search'
  },
  {
    title: 'The Future of Resume Building: Automation and Personalization',
    excerpt: 'Discover how automated resume building tools are helping job seekers create personalized resumes that stand out to employers.',
    date: 'February 28, 2025',
    category: 'Career Tips',
    slug: '/blog/future-resume-building'
  },
  {
    title: '5 Ways to Make Your Job Application Stand Out in 2025',
    excerpt: 'With increasing competition in the job market, here are 5 expert tips to ensure your application catches the recruiter\'s attention.',
    date: 'February 15, 2025',
    category: 'Career Tips',
    slug: '/blog/job-application-tips'
  },
  {
    title: 'Why Personalized Resumes Get More Interviews',
    excerpt: 'Research shows that personalized resumes tailored to specific job descriptions are more likely to result in interview invitations.',
    date: 'January 25, 2025',
    category: 'Research',
    slug: '/blog/personalized-resumes'
  },
];

export default function BlogPage() {
  return (
    <MainLayout>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Proism Blog</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Insights, tips, and updates on job searching, resume building, and career development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden hover:border-purple-900/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 bg-purple-900/20"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{post.excerpt}</p>
                  <Link href={post.slug}>
                    <Button variant="link" className="text-purple-400 p-0 hover:text-purple-300">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button className="rounded-full px-6 py-2 bg-transparent border border-gray-700 hover:bg-gray-800 text-white">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      <GetStartedCTA />
    </MainLayout>
  )
}
