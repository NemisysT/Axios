"use client"

import React, { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Hero = () => {
  const proismTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple animation for the logo (this is a placeholder, ideally we'd use the video from the original site)
    const animateProism = () => {
      if (proismTextRef.current) {
        proismTextRef.current.classList.add('animate-pulse');
        setTimeout(() => {
          if (proismTextRef.current) {
            proismTextRef.current.classList.remove('animate-pulse');
          }
        }, 2000);
      }
    };

    const interval = setInterval(animateProism, 5000);
    // Run once on load
    animateProism();

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30 z-0"></div>

      {/* Purple gradient orb in background */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-br from-purple-900/20 to-transparent blur-3xl -top-[400px] -right-[400px] z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <div className="text-sm text-gray-400 mb-4">Are you ready to be a Pro?</div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Effortless Job Search, Powered by Automation
          </h1>

          <p className="text-gray-400 mb-8 max-w-2xl">
            Discover the future of job hunting with Proism. Simplify your job search, create professional resumes, and find your best job opportunities—all with one click.
          </p>

          <Link href="https://app.proism.in/">
            <Button className="rounded-full px-8 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium neon-glow">
              Get Started for Free
            </Button>
          </Link>
        </div>

        {/* Proism big text */}
        <div
          ref={proismTextRef}
          className="mt-32 flex justify-center items-center"
        >
          <div className="text-8xl md:text-9xl font-bold text-white opacity-80">
            proism
          </div>
        </div>

        {/* "Let proism find your best fit jobs" */}
        <div className="mt-8 text-center">
          <h2 className="text-xl md:text-2xl font-medium">Let proism find your best fit jobs</h2>
        </div>

        {/* Company logos */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-70">
          {['Microsoft', 'Adobe', 'Amazon', 'Facebook', 'Google', 'Samsung', 'Nvidia'].map((company) => (
            <div key={company} className="h-8 flex items-center justify-center">
              <div className="text-gray-400 text-sm font-medium">{company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
