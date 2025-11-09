"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const spinnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "none",
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fade-in"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Loading spinner */}
        <div ref={spinnerRef} className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 border-r-green-400 dark:border-t-green-400 dark:border-r-green-300"></div>
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-green-600 dark:border-b-green-500 opacity-50"></div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-white font-semibold text-lg">Processing Request</p>
          <p className="text-green-200 dark:text-green-300 text-sm mt-1">Starting analysis agents...</p>
        </div>

        {/* Pulse indicator */}
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 bg-green-400 rounded-full loading-pulse"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full loading-pulse" style={{ animationDelay: "0.3s" }}></div>
          <div className="w-2 h-2 bg-green-400 rounded-full loading-pulse" style={{ animationDelay: "0.6s" }}></div>
        </div>
      </div>
    </div>
  )
}
