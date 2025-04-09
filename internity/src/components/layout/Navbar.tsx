"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/app/context/context";

const Navbar = () => {
  const pathname = usePathname();
  const { isLoggedIn, logoutUser } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navLinks = [
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/our-story" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="text-white text-lg font-semibold tracking-tight">
          InternGeanie
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-white",
              pathname === link.href ? "text-white" : "text-gray-400"
            )}
          >
            {link.name}
          </Link>
        ))}

        {isClient && (
          <>
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="rounded-full border border-white/30 text-white hover:bg-white/10 px-5 text-sm"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={logoutUser}
                  variant="outline"
                  className="ml-2 rounded-full border border-red-400 text-white hover:bg-red-500/20 px-5 text-sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="rounded-full border border-white/30 text-white hover:bg-white/10 px-5 text-sm"
                >
                  Login / Signup
                </Button>
              </Link>
            )}
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button className="md:hidden text-white focus:outline-none hover:scale-105 transition-transform">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
