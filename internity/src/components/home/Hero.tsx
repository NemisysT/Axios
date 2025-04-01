"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import RotatingText from "../RotatingText/RotatingText"
import Waves from "../Waves/Waves"
import { ArrowRight } from "lucide-react"

const Hero = () => {
  const axiosTextRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Waves
          lineColor="rgba(255, 255, 255, 0.3)"
          backgroundColor="rgba(255, 255, 255, 0.05)"
          waveSpeedX={0.015}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="flex flex-wrap items-center justify-center">
              Effortless
              <RotatingText
                texts={["Job Search", "Automation", "Simplification"]}
                mainClassName="px-3 sm:px-3 md:px-4 bg-cyan-300 text-black overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg ml-2"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 text-lg mb-10 max-w-2xl">
            Discover the future of job hunting with Axios. Simplify your job search, create professional resumes, and
            find your best job opportunities—all with one click.
          </p>

          {/* CTA Button */}
          <Link href="https://app.Axios.in/">
            <Button className="rounded-full px-8 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium shadow-lg">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        

        
        {/* Company logos */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-70">
          {["Microsoft", "Adobe", "Amazon", "Facebook", "Google", "Samsung", "Nvidia"].map((company) => (
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

