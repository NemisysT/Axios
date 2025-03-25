"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()

  const navLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/our-story' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 md:px-12 z-50 bg-transparent absolute top-0 left-0 right-0">
      <Link href="/" className="flex items-center">
        <div className="relative w-8 h-8 mr-2">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0ZM16 4C22.627 4 28 9.373 28 16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16C4 9.373 9.373 4 16 4Z" fill="url(#paint0_linear)" />
            <path d="M16 8C11.582 8 8 11.582 8 16C8 20.418 11.582 24 16 24C20.418 24 24 20.418 24 16C24 11.582 20.418 8 16 8ZM16 12C18.209 12 20 13.791 20 16C20 18.209 18.209 20 16 20C13.791 20 12 18.209 12 16C12 13.791 13.791 12 16 12Z" fill="url(#paint1_linear)" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8A2BE2" />
                <stop offset="1" stopColor="#4A0E95" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="8" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8A2BE2" />
                <stop offset="1" stopColor="#4A0E95" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="text-white text-xl font-semibold ml-1">proism</span>
      </Link>

      <div className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === link.href ? "text-white" : "text-muted-foreground"
            )}
          >
            {link.name}
          </Link>
        ))}

        <Link href="https://app.proism.in/" target="_blank">
          <Button variant="outline" className="border border-purple-light bg-transparent hover:bg-purple-dark text-white rounded-full px-6 neon-glow">
            Get Started
          </Button>
        </Link>
      </div>

      <button className="md:hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  )
}

export default Navbar
