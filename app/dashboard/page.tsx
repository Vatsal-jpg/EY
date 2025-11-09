"use client"

import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MainWorkspace from "@/components/main-workspace"
import ReportModal from "@/components/report-modal"
import LoadingScreen from "@/components/loading-screen"

export default function DashboardPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [analysisRunning, setAnalysisRunning] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [agentStatus, setAgentStatus] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax scrolling effect
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollY = window.scrollY
      const elements = containerRef.current.querySelectorAll("[data-parallax]")

      elements.forEach((element) => {
        const speed = Number.parseFloat(element.getAttribute("data-parallax") || "0.5")
        gsap.to(element, {
          y: scrollY * speed,
          duration: 0.5,
          overwrite: "auto",
        })
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Initial animation on mount
    gsap.fromTo(
      ".page-container",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
    )
  }, [])

  const handleRunAnalysis = async (prompt: string) => {
    setIsLoading(true)

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setAnalysisRunning(true)
    setAgentStatus({
      "IQVIA Insights": "running",
      "EXIM Trends": "running",
      "Patent Landscape": "running",
      "Clinical Trials": "running",
      "Internal Knowledge": "running",
      "Web Intelligence": "running",
      "Report Generator": "idle",
    })

    // Simulate agent work with staggered completion
    const agents = [
      "IQVIA Insights",
      "EXIM Trends",
      "Patent Landscape",
      "Clinical Trials",
      "Internal Knowledge",
      "Web Intelligence",
    ]

    for (let i = 0; i < agents.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setAgentStatus((prev) => ({
        ...prev,
        [agents[i]]: "completed",
      }))
    }

    await new Promise((resolve) => setTimeout(resolve, 800))
    setAgentStatus((prev) => ({
      ...prev,
      "Report Generator": "completed",
    }))

    setAnalysisRunning(false)
    setShowReportModal(true)
  }

  const handleSelectAgent = async (agentId: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)
    setSelectedAgent(agentId)
  }

  return (
    <>
      {isLoading && <LoadingScreen />}

      <div
        ref={containerRef}
        className="page-container min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-black dark:via-slate-950 dark:to-black"
      >
        <Header />

        <main className="flex flex-col lg:flex-row gap-6 p-6 lg:p-8 max-w-7xl mx-auto">
          <Sidebar selectedAgent={selectedAgent} setSelectedAgent={handleSelectAgent} agentStatus={agentStatus} />

          <MainWorkspace
            onRunAnalysis={handleRunAnalysis}
            analysisRunning={analysisRunning}
            agentStatus={agentStatus}
          />
        </main>

        {showReportModal && <ReportModal onClose={() => setShowReportModal(false)} />}
      </div>
    </>
  )
}
