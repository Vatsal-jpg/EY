"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ResultsPanelProps {
  isLoading: boolean
}

const generatePDF = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>AgenicAI Analysis Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
        h1 { color: #003a88; border-bottom: 3px solid #003a88; padding-bottom: 10px; }
        h2 { color: #003a88; margin-top: 30px; }
        h3 { color: #0055b3; }
        .metric { background: #f0f4fa; padding: 15px; margin: 10px 0; border-left: 4px solid #003a88; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #003a88; color: white; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .summary-list { list-style: none; padding-left: 0; }
        .summary-list li { padding: 8px 0; padding-left: 25px; position: relative; }
        .summary-list li:before { content: "✓"; position: absolute; left: 0; color: #003a88; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>AgenicAI Pharmaceutical Analysis Report</h1>
      <h2>Executive Summary</h2>
      <ul class="summary-list">
        <li>3 respiratory molecules identified with high repurposing potential</li>
        <li>Patient burden > 50M in India market, low current competition</li>
        <li>Average clinical trial timeline: 3.2 years, estimated cost: ₹1,640 Cr</li>
        <li>Market opportunity: ₹18,900 Cr by 2028</li>
      </ul>

      <h2>Key Metrics</h2>
      <div class="metric">
        <h3>Market Size</h3>
        <p><strong>₹18,900 Cr</strong> (Projected 2028 value)</p>
      </div>
      <div class="metric">
        <h3>Success Rate</h3>
        <p><strong>68%</strong> Phase 2+ approval odds</p>
      </div>
      <div class="metric">
        <h3>Candidates</h3>
        <p><strong>3</strong> Molecules identified</p>
      </div>
      <div class="metric">
        <h3>Timeline</h3>
        <p><strong>3.2 years</strong> Average trial duration</p>
      </div>

      <h2>Top Candidates</h2>
      <table>
        <tr>
          <th>Rank</th><th>Molecule Name</th><th>Indication</th><th>Market Opportunity</th>
        </tr>
        <tr><td>1st</td><td>Molecule A-147</td><td>Idiopathic Pulmonary Fibrosis</td><td>₹7,297 Cr</td></tr>
        <tr><td>2nd</td><td>Compound B-233</td><td>COPD Exacerbation</td><td>₹5,907 Cr</td></tr>
        <tr><td>3rd</td><td>Entity C-501</td><td>Asthma Management</td><td>₹5,658 Cr</td></tr>
      </table>

      <h2>Analysis Date</h2>
      <p>${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
    </body>
    </html>
  `
  const blob = new Blob([htmlContent], { type: "application/pdf" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `AgenicAI-Report-${new Date().getTime()}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const generatePPT = () => {
  const pptContent = `THEME_NAME:"Office Theme"
SLIDE:1
TITLE:"AgenicAI Pharmaceutical Analysis"
SUBTITLE:"Master-Worker Agent Orchestration Report"

SLIDE:2
TITLE:"Executive Summary"
BULLETS:
• 3 respiratory molecules identified with high repurposing potential
• Patient burden > 50M in India market
• Low current competition in target segments
• Market opportunity: ₹18,900 Cr by 2028

SLIDE:3
TITLE:"Key Metrics"
CONTENT:
Market Size: ₹18,900 Cr (2028 projection)
Success Rate: 68% (Phase 2+ approval odds)
Candidates: 3 Molecules Identified
Timeline: 3.2 years average trial duration

SLIDE:4
TITLE:"Top Candidates"
TABLE:
Rank | Molecule | Indication | Market Size
1st | Molecule A-147 | Idiopathic Pulmonary Fibrosis | ₹7,297 Cr
2nd | Compound B-233 | COPD Exacerbation | ₹5,907 Cr
3rd | Entity C-501 | Asthma Management | ₹5,658 Cr

SLIDE:5
TITLE:"Next Steps"
BULLETS:
• Conduct detailed competitive analysis
• Initiate Phase 1 safety studies
• Engage regulatory consultation
• Plan market entry strategy

SLIDE:6
TITLE:"Report Generated"
SUBTITLE:"${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}"
FOOTER:"AgenicAI - Pharma Innovation Assistant"`
  const blob = new Blob([pptContent], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `AgenicAI-Presentation-${new Date().getTime()}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function ResultsPanel({ isLoading }: ResultsPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(containerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })

    sectionsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      )
    })
  }, [])

  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    if (el) sectionsRef.current[index] = el
  }

  if (isLoading) {
    return (
      <div ref={containerRef} className="bg-white dark:bg-slate-800 rounded-xl border border-[#003a88]/30 dark:border-slate-700 shadow-lg p-6 space-y-6">
        <div className="space-y-3">
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded animate-pulse w-1/3"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded animate-pulse w-full" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="bg-white dark:bg-slate-800 rounded-xl border border-[#003a88]/30 dark:border-slate-700 shadow-lg p-6 space-y-10">
      <div ref={(el) => setSectionRef(el, 0)}>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-[#003a88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586l5.414 5.414V19a2 2 0 01-2 2z" />
          </svg>
          Executive Summary
        </h3>
        <div className="bg-[#f0f4fa] dark:bg-[#001f4d] p-4 rounded-lg border border-[#003a88]/30 dark:border-[#002b66] space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>3 respiratory molecules identified with high repurposing potential</p>
          <p>Patient burden &gt; 50M in India market, low current competition</p>
          <p>Average clinical trial timeline: 3.2 years, estimated cost ₹1,640 Cr</p>
          <p>Market opportunity: ₹18,900 Cr by 2028</p>
        </div>
      </div>

      <div ref={(el) => setSectionRef(el, 1)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Market Size", value: "₹18,900 Cr", note: "Projected 2028 value" },
          { label: "Success Rate", value: "68%", note: "Phase 2+ approval odds" },
          { label: "Candidates", value: "3", note: "Molecules identified" },
          { label: "Timeline", value: "3.2 yrs", note: "Average trial duration" },
        ].map((metric, i) => (
          <div key={i} className="bg-gradient-to-br from-[#f0f4fa] to-white dark:from-[#001f4d] dark:to-slate-800 p-4 rounded-lg border border-[#003a88]/30 dark:border-[#002b66]">
            <p className="text-xs font-semibold text-[#003a88] mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{metric.note}</p>
          </div>
        ))}
      </div>

      <div ref={(el) => setSectionRef(el, 2)}>
        <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-[#003a88]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Top Candidates
        </h4>
        <div className="space-y-2">
          {[
            { name: "Molecule A-147", indication: "Idiopathic Pulmonary Fibrosis", market: "₹7,297 Cr", rank: "1st" },
            { name: "Compound B-233", indication: "COPD Exacerbation", market: "₹5,907 Cr", rank: "2nd" },
            { name: "Entity C-501", indication: "Asthma Management", market: "₹5,658 Cr", rank: "3rd" },
          ].map((candidate, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 hover:border-[#003a88]/50 dark:hover:border-[#0055b3] transition-colors"
            >
              <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{candidate.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{candidate.indication}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#003a88]">{candidate.market}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Rank: {candidate.rank}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={(el) => setSectionRef(el, 3)} className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
        <button
          onClick={generatePDF}
          className="flex-1 px-4 py-2 rounded-lg bg-[#f0f4fa] dark:bg-[#001f4d] text-[#003a88] font-semibold hover:bg-[#e4ecf8] dark:hover:bg-[#002b66] border border-[#003a88]/30 flex items-center justify-center gap-2 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Download PDF
        </button>

        <button
          onClick={generatePPT}
          className="flex-1 px-4 py-2 rounded-lg bg-[#f0f4fa] dark:bg-[#001f4d] text-[#003a88] font-semibold hover:bg-[#e4ecf8] dark:hover:bg-[#002b66] border border-[#003a88]/30 flex items-center justify-center gap-2 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          Download PPT
        </button>
      </div>
    </div>
  )
}
