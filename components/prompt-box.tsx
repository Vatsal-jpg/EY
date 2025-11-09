"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { analyzeQuery } from "@/lib/query-handler"

interface PromptBoxProps {
  onRunAnalysis: (prompt: string) => void
  isLoading: boolean
}

const SAMPLE_QUERIES = [
  "Find respiratory molecules with low competition but high patient burden in India.",
  "Identify antiviral compounds suitable for immunocompromised patients.",
  "Search for cardiovascular repurposing opportunities in Asian markets.",
  "Analyze pricing potential for rare disease treatments.",
  "Find oncology candidates with Phase 2 data available.",
]

export default function PromptBox({ onRunAnalysis, isLoading }: PromptBoxProps) {
  const [prompt, setPrompt] = useState("")
  const [queryError, setQueryError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
  }, [])

  const handleRunAnalysis = () => {
    if (prompt.trim()) {
      const analysis = analyzeQuery(prompt)
      if (!analysis.isValid) {
        setQueryError(analysis.message)
        gsap.to(buttonRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
        return
      }

      setQueryError(null)
      onRunAnalysis(prompt)
      gsap.to(buttonRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 })
    }
  }

  const handleSampleQuery = (query: string) => {
    setPrompt(query)
    setQueryError(null)
    setTimeout(() => {
      const analysis = analyzeQuery(query)
      if (analysis.isValid) {
        onRunAnalysis(query)
      }
    }, 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleRunAnalysis()
  }

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="bg-white dark:bg-slate-800 rounded-xl border border-[#003a88]/30 dark:border-slate-700 shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
      >
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-[#003a88] dark:text-[#4d8fe0]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Ask AgenicAI
        </label>

        <textarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value)
            setQueryError(null)
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask AgenicAI: e.g., 'Find respiratory molecules with low competition but high patient burden in India.'"
          className="w-full h-28 px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003a88] dark:focus:ring-[#4d8fe0] focus:border-transparent resize-none"
          disabled={isLoading}
        />

        {queryError && (
          <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex gap-2">
            <svg
              className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-red-700 dark:text-red-300">{queryError}</p>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Tip: Include market, indication, or patient demographics for better results
          </p>

          <button
            ref={buttonRef}
            onClick={handleRunAnalysis}
            disabled={isLoading || !prompt.trim()}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
              isLoading || !prompt.trim()
                ? "bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#003a88] to-[#0048a3] dark:from-[#0048a3] dark:to-[#0052b8] text-white hover:shadow-lg hover:from-[#0048a3] hover:to-[#0052b8] dark:hover:from-[#003a88] dark:hover:to-[#0048a3] active:scale-95"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {isLoading ? "Analyzing..." : "Run Analysis"}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 px-2">Try sample queries:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {SAMPLE_QUERIES.map((query, index) => (
            <button
              key={index}
              onClick={() => handleSampleQuery(query)}
              disabled={isLoading}
              className="text-left p-3 rounded-lg bg-[#003a88]/5 dark:bg-slate-700 border border-[#003a88]/20 dark:border-slate-600 hover:border-[#003a88]/60 dark:hover:border-[#4d8fe0]/60 text-[#003a88] dark:text-[#4d8fe0] text-sm hover:bg-[#003a88]/10 dark:hover:bg-slate-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p className="font-medium">{query.substring(0, 40)}...</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
