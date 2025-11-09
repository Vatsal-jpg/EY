"use client"

import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import PromptBox from "./prompt-box"
import ResultsPanel from "./results-panel"

interface MainWorkspaceProps {
  onRunAnalysis: (prompt: string) => void
  analysisRunning: boolean
  agentStatus: Record<string, string>
}

export default function MainWorkspace({ onRunAnalysis, analysisRunning, agentStatus }: MainWorkspaceProps) {
  const [showResults, setShowResults] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      },
    )
  }, [])

  useEffect(() => {
    if (analysisRunning) {
      setShowResults(true)
      // Animate progress bar
      gsap.to(progressRef.current, {
        opacity: 1,
        duration: 0.3,
      })
    }
  }, [analysisRunning])

  const activeAgents = Object.values(agentStatus).filter((s) => s === "running").length
  const completedAgents = Object.values(agentStatus).filter((s) => s === "completed").length
  const totalAgents = Object.keys(agentStatus).length

  return (
    <div ref={contentRef} className="flex-1 space-y-6" data-parallax="0.2">
      <PromptBox onRunAnalysis={onRunAnalysis} isLoading={analysisRunning} />

      {totalAgents > 0 && (
        <div
          ref={progressRef}
          className={`bg-white dark:bg-slate-800 rounded-xl p-4 border border-[#003a88]20 dark:border-slate-700 shadow-sm transition-all duration-300 ${
            !analysisRunning ? "opacity-0 pointer-events-none" : ""
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#003a88] dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Agent Progress</p>
              </div>
              <p className="text-xs text-[#003a88] dark:text-blue-400 font-medium">
                {completedAgents}/{totalAgents} completed
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#003a88] to-[#004cbf] dark:from-blue-700 dark:to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(completedAgents / totalAgents) * 100}%` }}
              />
            </div>

            {/* Agent Status Chips */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(agentStatus).map(([agent, status]) => (
                <div
                  key={agent}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1 ${
                    status === "completed"
                      ? "bg-[#003a88]/10 dark:bg-blue-900 text-[#003a88] dark:text-blue-300"
                      : status === "running"
                        ? "bg-[#003a88]/10 dark:bg-blue-900 text-[#003a88] dark:text-blue-300 animate-pulse"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {status === "running" ? (
                    <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block" />
                  ) : status === "completed" ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  ) : (
                    <span className="w-2 h-2 bg-gray-400 rounded-full inline-block" />
                  )}
                  {agent.split(" ")[0]}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showResults && <ResultsPanel isLoading={analysisRunning} />}
    </div>
  )
}
