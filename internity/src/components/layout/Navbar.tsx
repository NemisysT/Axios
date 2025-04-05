"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {useAuth} from '@/app/context/context'

const Navbar = () => {
  const pathname = usePathname()

   const { isLoggedIn, token, AuthorizationToken, logoutUser } = useAuth()

  const navLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/our-story' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 md:px-12 z-50 bg-transparent absolute top-0 left-0 right-0">
      <Link href="/" className="flex items-center">
        <div className="relative w-8 h-8 mr-2"></div>
        <span className="text-white text-xl font-semibold ml-1">InternGeanie</span>
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

        <Link href={isLoggedIn ? "/dashboard" : "/signup"} target="_blank">
          <Button
            variant="outline"
            className="border border-purple-light bg-transparent hover:bg-purple-dark text-white rounded-full px-6 neon-glow"
          >
            {isLoggedIn ? "Dashboard" : "Login / Signup"}
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
