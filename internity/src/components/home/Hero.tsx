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
    <section className="relative w-full h-screen flex items-center justify-center mt-0 pt-0 pb-0 overflow-hidden">
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
      {/* Main heading - INCREASED TEXT SIZE */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
        <span className="flex flex-wrap items-center justify-center">
          Effortless
          <RotatingText
            texts={["Job Search", "Automation", "Resume"]}
            mainClassName="px-3 sm:px-4 md:px-5 bg-cyan-300 text-black overflow-hidden py-1.5 sm:py-2 md:py-2.5 justify-center rounded-lg ml-3"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1.5"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </span>
      </h1>

      {/* Subheading - INCREASED TEXT SIZE */}
      <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-2xl">
        Discover the future of job hunting with Axios. Simplify your job search, create professional resumes, and
        find your best job opportunities—all with one click.
      </p>

      {/* CTA Button - THIS IS THE HIGHLIGHTED BUTTON CODE */}
      <Link href="https://app.Axios.in/">
        <Button className="rounded-full px-10 py-7 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg font-medium shadow-lg">
          Get Started for Free
          <ArrowRight className="ml-2 h-6 w-6" />
        </Button>
      </Link>
    </div>
  </div>
</section>
  )
}

export default Hero

