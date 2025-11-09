"use client"

import type React from "react"

interface SplineViewerProps {
  url: string
  style?: React.CSSProperties
}

export default function SplineViewer({ url, style }: SplineViewerProps) {
  return <spline-viewer url={url} style={style} />
}
