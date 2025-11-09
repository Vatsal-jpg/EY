"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Link from "next/link"

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if theme preference exists in localStorage
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = savedTheme ? savedTheme === "dark" : true
    setIsDark(prefersDark)
    if (!prefersDark) {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem("theme", newDarkMode ? "dark" : "light")

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Smooth scroll handler
  const handleScroll = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (!mounted) return null

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-[#003a88] dark:bg-slate-900 backdrop-blur-md bg-opacity-95 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-md">
              <svg
                className="w-6 h-6 text-[#003a88] dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white leading-tight">AgenicAI</h1>
              <p className="text-blue-100 dark:text-blue-300 text-xs">Pharma Innovation Assistant</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-blue-50">
            <button
              onClick={() => handleScroll("agents-section")}
              className="hover:text-white transition-colors duration-300"
            >
              Agents
            </button>
            <button
              onClick={() => handleScroll("team-section")}
              className="hover:text-white transition-colors duration-300"
            >
              Team
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-medium transition-all duration-300 hover:shadow-lg"
            >
              Launch App
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 dark:bg-slate-700 dark:hover:bg-slate-600 text-white transition-all duration-300 hover:shadow-lg flex items-center justify-center"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 18a6 6 0 100-12 6 6 0 000 12zM12 1v6m0 6v6m4.22-15.22l-4.24 4.24m0 5.96l4.24 4.24m-9.46-9.46l-4.24-4.24m0 5.96l4.24 4.24M1 12h6m6 0h6"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
