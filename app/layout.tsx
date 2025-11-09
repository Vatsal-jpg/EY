import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AgenicAI — Pharma Innovation Assistant",
  description: "AI-driven pharmaceutical research assistant powered by Master and Worker Agents",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
        <script
          type="module"
          src="https://cdn.jsdelivr.net/npm/@splinetool/viewer@1.0.0/build/spline-viewer.js"
        ></script>
        <script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        try {
          const savedTheme = localStorage.getItem('theme');
          const prefersDark = savedTheme === 'dark';
          if (prefersDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        } catch (_) {
          document.documentElement.classList.remove('dark'); // default → light
        }
      })();
    `,
  }}
/>

      </head>
      <body className={font-sans antialiased}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}