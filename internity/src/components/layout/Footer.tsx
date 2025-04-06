"use client"

import React from 'react'
import Link from 'next/link'

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/InternGeanie.in/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/DWTHc7xW2Y',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.59 15.3c-.9 0-1.62-.73-1.62-1.62 0-.9.73-1.62 1.62-1.62.9 0 1.62.73 1.62 1.62 0 .9-.73 1.62-1.62 1.62Z" />
        <path d="M15.41 15.3c-.9 0-1.62-.73-1.62-1.62 0-.9.73-1.62 1.62-1.62.9 0 1.62.73 1.62 1.62 0 .9-.72 1.62-1.62 1.62Z" />
        <path d="M19.18 5.53C18.24 5.05 17.22 4.72 16.17 4.56c-.18.31-.39.75-.53 1.09-1.15-.17-2.29-.17-3.43 0-.14-.34-.35-.78-.54-1.09-1.05.16-2.07.49-3.01.97-1.91 2.85-2.44 5.65-2.17 8.4.94.67 1.86 1.09 2.75 1.35.22-.3.42-.61.59-.95-.33-.12-.64-.28-.93-.47.08-.06.15-.13.22-.2 1.71.77 3.58.77 5.29 0 .08.07.15.14.22.2-.29.19-.6.35-.93.47.18.34.37.65.59.95.9-.26 1.81-.68 2.75-1.35.31-3.13-.53-5.9-2.36-8.4Z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/InternGeanie',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:info@InternGeanie.in',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-gray-800 pt-12 pb-6 px-6 md:px-12">
      <div className="container mx-auto flex flex-col gap-10 md:flex-row justify-between">
        {/* Logo + Tagline */}
        <Link href="/" className="flex items-start gap-3">
          {/* <div className="w-8 h-8">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0ZM16 4C22.627 4 28 9.373 28 16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16C4 9.373 9.373 4 16 4Z"
                fill="url(#paint0_linear)" />
              <path d="M16 8C11.582 8 8 11.582 8 16C8 20.418 11.582 24 16 24C20.418 24 24 20.418 24 16C24 11.582 20.418 8 16 8ZM16 12C18.209 12 20 13.791 20 16C20 18.209 18.209 20 16 20C13.791 20 12 18.209 12 16C12 13.791 13.791 12 16 12Z"
                fill="url(#paint1_linear)" />
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
          </div> */}
          <div className="flex flex-col">
            <span className="text-white text-xl font-semibold">InternGeanie</span>
            <span className="text-gray-400 text-xs mt-1 leading-tight">
              Enabling tomorrow's<br />on-demand workforce
            </span>
          </div>
        </Link>

        {/* Navigation + Socials */}
        <div className="flex flex-col gap-8 md:items-end">
          {/* Navigation Links */}
          <div className="flex gap-6 flex-wrap justify-center md:justify-end">
            <Link href="/blog" className="text-gray-400 hover:text-white text-sm">Blog</Link>
            <Link href="/our-story" className="text-gray-400 hover:text-white text-sm">About</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link>
            
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialLinks.map(({ name, href, icon }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-gray-400 hover:text-white border border-gray-800 p-2 rounded-full transition-colors duration-200"
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-xs">
        All rights reserved with Axios & InternGeanie.
      </div>
    </footer>
  )
}

export default Footer
