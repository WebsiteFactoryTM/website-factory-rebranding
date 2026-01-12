"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface FloatingElementProps {
  children?: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  distance?: number
  style?: React.CSSProperties
}

export function FloatingElement({ children, className, delay = 0, duration = 6, distance = 20, style }: FloatingElementProps) {
  return (
    <div
      className={cn("will-change-transform", className)}
      style={{
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        ["--float-distance" as string]: `${distance}px`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
