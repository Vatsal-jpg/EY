"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "@/components/header"
import SplineViewer from "@/components/SplineViewer"

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
  const [showDemo, setShowDemo] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const splineRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const demoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(textRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" })

    gsap.fromTo(
      splineRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2 },
    )

    gsap.to(heroRef.current, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", scrub: 1.5 },
    })

    gsap.utils.toArray(".feature-card").forEach((card: any) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" } },
      )
    })

    gsap.utils.toArray(".feature-card").forEach((el: any, i) => {
      gsap.to(el, { y: -6, duration: 2, repeat: -1, yoyo: true, ease: "power1.inOut", delay: i * 0.2 })
    })

    gsap.fromTo(
      teamRef.current?.querySelectorAll(".team-member"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: teamRef.current, start: "top 80%" },
      },
    )

    gsap.fromTo(
      teamRef.current?.querySelector(".team-header"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: teamRef.current, start: "top 90%" },
      },
    )
  }, [])

  const agents = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2"
          />
        </svg>
      ),
      title: "IQVIA Insights",
      desc: "Market analysis and competitive intelligence from IQVIA data",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "EXIM Trends",
      desc: "Export-import data analysis for pharmaceutical markets",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Patent Landscape",
      desc: "Comprehensive patent search and analysis engine",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.452a2 2 0 00-1.141.341l-.1.066a2 2 0 00-.898 2.605L6.75 21"
          />
        </svg>
      ),
      title: "Clinical Trials",
      desc: "Real-time clinical trial data and research aggregation",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13M2 16c0-5.308 4.228-9.772 10-9.747s10 4.465 10 9.747"
          />
        </svg>
      ),
      title: "Internal Knowledge",
      desc: "Access to proprietary internal research and documents",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      title: "Web Intelligence",
      desc: "Real-time web scraping and trend analysis",
    },
  ]

  const teamMembers = ["Vansh Jain", "Vatsal Jain", "Madhura Loyalekar", "Priyank Shah", "Soham Padalia"]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white via-[#eaf0fa] to-white dark:from-black dark:via-slate-950 dark:to-black overflow-hidden">
        <section ref={heroRef} className="pt-20 pb-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
              {/* Left side - Text */}
              <div ref={textRef} className="z-10">
                <div className="mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d6e0f5] dark:bg-slate-800 mb-6">
                    <svg className="w-8 h-8 text-[#003a88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#003a88] to-[#004bb3] dark:from-[#5a8fff] dark:to-[#89b4ff] bg-clip-text text-transparent mb-6">
                    AgenicAI
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-4">
                    Pharmaceutical Research Assistant Powered by Intelligent Agents
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 max-w-xl mb-10 text-lg">
                    Leverage multi-agent AI orchestration to analyze market trends, patent landscapes, clinical trials,
                    and more.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setShowDemo(true)}
                      className="px-8 py-3 rounded-lg bg-[#003a88] text-white font-semibold hover:bg-[#004bb3] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      View Demo
                    </button>
                    <Link
                      href="/dashboard"
                      className="px-8 py-3 rounded-lg bg-white dark:bg-slate-800 text-[#003a88] font-semibold border-2 border-[#003a88] hover:bg-[#f5f7fb] dark:hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-center"
                    >
                      Launch App
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right side - Spline 3D Model */}
              <div ref={splineRef} className="hidden lg:flex justify-center items-center">
                <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-[#ccd6f6] dark:border-slate-700">
                  <SplineViewer
                    url="https://prod.spline.design/zIr1U-wPHNDKpi98/scene.splinecode"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AGENTS SECTION */}
        <section id="agents-section" ref={featuresRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">
            Powerful Agents Working Together
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, idx) => (
              <div
                key={idx}
                className="feature-card p-8 rounded-xl bg-white dark:bg-slate-800 border border-[#ccd6f6] hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-[#003a88] mb-4">{agent.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{agent.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{agent.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM SECTION */}
        <section id="team-section" ref={teamRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="team-header text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-[#003a88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-semibold text-[#003a88] uppercase tracking-wider">EY Techathon 6.0</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">The Caffeine Coders</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Building the future of pharmaceutical intelligence with AI-driven innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="team-member p-6 rounded-xl bg-gradient-to-br from-[#eaf0fa] to-white dark:from-slate-800 dark:to-slate-900 border border-[#ccd6f6] hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#4c6ef5] to-[#003a88] flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {member.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{member}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* DEMO MODAL */}
        {showDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div
              ref={demoRef}
              className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#ccd6f6]">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Quick Demo</h3>
                <button
                  onClick={() => setShowDemo(false)}
                  className="p-2 hover:bg-[#eaf0fa] dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-8 overflow-y-auto max-h-[calc(80vh-80px)] space-y-6">
                <div className="bg-[#eaf0fa] dark:bg-slate-700 p-6 rounded-lg">
                  <p className="font-semibold text-slate-900 dark:text-white mb-2">Sample Query:</p>
                  <p className="text-slate-700 dark:text-slate-300">
                    "Analyze market opportunities for diabetes treatment in Southeast Asia"
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-lg space-y-4">
                  <p className="font-semibold text-slate-900 dark:text-white">Multi-Agent Response:</p>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li>
                      • <strong>IQVIA Insights:</strong> Market size ₹18,900 Cr, 8.5% CAGR till 2030
                    </li>
                    <li>
                      • <strong>EXIM Trends:</strong> Import growth 12% YoY (India, Thailand lead)
                    </li>
                    <li>
                      • <strong>Patent Landscape:</strong> 234 new filings; top 3 hold 45%
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/dashboard"
                    onClick={() => setShowDemo(false)}
                    className="flex-1 px-6 py-3 rounded-lg bg-[#003a88] text-white font-semibold hover:bg-[#004bb3] transition-all duration-300 text-center"
                  >
                    Try Full App
                  </Link>
                  <button
                    onClick={() => setShowDemo(false)}
                    className="px-6 py-3 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
