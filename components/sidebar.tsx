"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import AgentCard from "./agent-card"

interface SidebarProps {
  selectedAgent: string | null
  setSelectedAgent: (agent: string) => void
  agentStatus: Record<string, string>
}

const AGENTS = [
  { id: "iqvia", name: "IQVIA Insights", desc: "Market analysis", color: "#003a88" },
  { id: "exim", name: "EXIM Trends", desc: "Import/export data", color: "#003a88" },
  { id: "patent", name: "Patent Landscape", desc: "Patent search", color: "#003a88" },
  { id: "trials", name: "Clinical Trials", desc: "Clinical data", color: "#003a88" },
  { id: "internal", name: "Internal Knowledge", desc: "Internal research", color: "#003a88" },
  { id: "web", name: "Web Intelligence", desc: "Web scraping", color: "#003a88" },
  { id: "report", name: "Report Generator", desc: "Report generation", color: "#003a88" },
]

export default function Sidebar({ selectedAgent, setSelectedAgent, agentStatus }: SidebarProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll(".agent-card")

    gsap.fromTo(
      cards,
      { opacity: 0, x: -40, rotateY: -15 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      }
    )
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    )
  }, [])

  return (
    <aside
      ref={containerRef}
      className="w-full lg:w-64 space-y-3 transition-transform duration-300"
      data-parallax="0.3"
    >
      <div className="bg-gradient-to-b from-[#e9f0fa] to-white dark:from-slate-900 dark:to-slate-800 p-4 rounded-xl border border-[#003a88]/30 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-[#003a88]"
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
          <h2 className="font-bold text-[#003a88] dark:text-blue-300 text-sm">Worker Agents</h2>
        </div>

        <div className="space-y-2">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="agent-card transform transition-transform duration-300 hover:scale-[1.02]"
            >
              <AgentCard
                agent={agent}
                isSelected={selectedAgent === agent.id}
                isActive={agentStatus[agent.name] === "running"}
                isCompleted={agentStatus[agent.name] === "completed"}
                onSelect={() => setSelectedAgent(agent.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#003a88] to-[#002b66] dark:from-[#002b66] dark:to-[#001f4d] p-4 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex gap-2 mb-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xs font-semibold">Pro Tip</p>
        </div>
        <p className="text-xs leading-relaxed">
          Use specific parameters like "India market" or "respiratory molecules" for precise results.
        </p>
      </div>
    </aside>
  )
}
