"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface AgentCardProps {
  agent: {
    id: string
    name: string
    desc: string
    color: string
  }
  isSelected: boolean
  isActive: boolean
  isCompleted: boolean
  onSelect: () => void
}

const getAgentIcon = (name: string) => {
  switch (name) {
    case "IQVIA Insights":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      )
    case "EXIM Trends":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case "Patent Landscape":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      )
    case "Clinical Trials":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    case "Internal Knowledge":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z"
          />
        </svg>
      )
    case "Web Intelligence":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9-9a9 9 0 019 9"
          />
        </svg>
      )
    case "Report Generator":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      )
    default:
      return null
  }
}

export default function AgentCard({ agent, isSelected, isActive, isCompleted, onSelect }: AgentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    if (isActive) {
      gsap.to(cardRef.current, {
        boxShadow: `0 0 20px ${agent.color}40`,
        duration: 0.3,
      })
    } else {
      gsap.to(cardRef.current, {
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        duration: 0.3,
      })
    }
  }, [isActive, agent.color])

  return (
    <button
      ref={cardRef}
      onClick={onSelect}
      className={`agent-card w-full p-3 rounded-lg transition-all duration-300 text-left group ${
        isSelected
          ? "bg-white dark:bg-slate-700 border-2 border-[#003a88] dark:border-blue-400 shadow-md"
          : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-[#004cbf] dark:hover:border-blue-500"
      } ${isActive ? "agent-card-active" : ""} ${isCompleted ? "opacity-75" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-[#003a88] dark:text-blue-400">{getAgentIcon(agent.name)}</div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-[#003a88] dark:group-hover:text-blue-400">
              {agent.name}
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isActive ? (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block" /> Running...
              </span>
            ) : isCompleted ? (
              <span className="flex items-center gap-1">
                <span className="text-[#003a88] dark:text-blue-400">✓</span> Completed
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full inline-block" /> Idle
              </span>
            )}
          </p>
        </div>
      </div>
    </button>
  )
}
