"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface LiquidBlobProps {
  className?: string
  interactive?: boolean
}

export function LiquidBlob({ className, interactive = true }: LiquidBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isPulsing, setIsPulsing] = useState(false)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setMousePos((prev) => ({
        x: lerp(prev.x, targetPos.x, 0.08),
        y: lerp(prev.y, targetPos.y, 0.08),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [targetPos])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleInteraction = useCallback((x: number, y: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const normalizedX = ((x - rect.left) / rect.width - 0.5) * 60
    const normalizedY = ((y - rect.top) / rect.height - 0.5) * 60
    setTargetPos({ x: normalizedX, y: normalizedY })
  }, [])

  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleTouchStart = () => {
      setIsTouching(true)
      setIsPulsing(true)
      setTimeout(() => setIsPulsing(false), 400)
    }

    const handleTouchEnd = () => {
      setIsTouching(false)
      setTargetPos({ x: 0, y: 0 })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => {
      setIsHovering(false)
      setTargetPos({ x: 0, y: 0 })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
      container.addEventListener("touchmove", handleTouchMove, { passive: true })
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [interactive, handleInteraction])

  const isActive = isHovering || isTouching
  const parallaxOffset = scrollY * 0.1

  return (
    <div ref={containerRef} className={cn("relative w-full h-full touch-none cursor-pointer", className)}>
      {/* SVG Filter for gooey/metaball effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          <linearGradient id="metalGradientSmooth" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.45 0.25 270)">
              <animate
                attributeName="stop-color"
                values="oklch(0.45 0.25 270);oklch(0.55 0.22 285);oklch(0.65 0.15 200);oklch(0.45 0.25 270)"
                dur="8s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="oklch(0.7 0.18 280)">
              <animate
                attributeName="stop-color"
                values="oklch(0.7 0.18 280);oklch(0.8 0.1 200);oklch(0.65 0.2 270);oklch(0.7 0.18 280)"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="oklch(0.55 0.2 285)">
              <animate
                attributeName="stop-color"
                values="oklch(0.55 0.2 285);oklch(0.75 0.12 195);oklch(0.5 0.22 270);oklch(0.55 0.2 285)"
                dur="12s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
      </svg>

      {/* Main blob container with gooey filter */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{
          filter: "url(#goo)",
          transform: `translateY(${-parallaxOffset}px)`,
        }}
      >
        {/* Central blob - the "body" */}
        <div
          className={cn(
            "absolute w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full blob-morph will-change-transform",
            isPulsing && "animate-[blob-pulse_0.4s_ease-out]",
          )}
          style={{
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) scale(${isActive ? 1.05 : 1})`,
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand/90 via-brand-light/70 to-glow-cyan/50 dark:from-brand via-brand-light/80 dark:to-glow-violet/60 blob-morph" />
          {/* Inner highlight - follows cursor like an "eye" */}
          <div
            className="absolute w-1/3 h-1/4 rounded-full bg-white/50 blur-xl will-change-transform"
            style={{
              top: `${22 - mousePos.y * 0.15}%`,
              left: `${22 - mousePos.x * 0.15}%`,
            }}
          />
          {/* Secondary highlight */}
          <div
            className="absolute w-1/5 h-1/6 rounded-full bg-white/30 blur-lg will-change-transform"
            style={{
              top: `${45 - mousePos.y * 0.08}%`,
              right: `${22 + mousePos.x * 0.08}%`,
            }}
          />
        </div>

        {/* Satellite blob 1 */}
        <div
          className="absolute w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full blob-orbit-1 will-change-transform"
          style={{
            transform: `translate(${70 + mousePos.x * 0.5}px, ${-50 + mousePos.y * 0.5}px) scale(${isActive ? 1.1 : 1})`,
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-glow-violet/80 via-brand/60 to-glow-cyan/40 dark:from-glow-violet/90 dark:via-brand/70 dark:to-glow-cyan/50 blob-morph-alt" />
          <div className="absolute top-3 left-4 w-1/3 h-1/4 rounded-full bg-white/30 blur-lg" />
        </div>

        {/* Satellite blob 2 */}
        <div
          className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full blob-orbit-2 will-change-transform"
          style={{
            transform: `translate(${-90 + mousePos.x * 0.4}px, ${70 + mousePos.y * 0.4}px) scale(${isActive ? 1.08 : 1})`,
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-glow-cyan/70 via-glow-violet/50 to-brand/40 dark:from-glow-cyan/80 dark:via-glow-violet/60 dark:to-brand/50 blob-morph" />
          <div className="absolute top-2 left-3 w-1/3 h-1/4 rounded-full bg-white/25 blur-md" />
        </div>

        {/* Satellite blob 3 - smaller, more reactive */}
        <div
          className="absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full blob-orbit-3 will-change-transform"
          style={{
            transform: `translate(${110 + mousePos.x * 0.7}px, ${90 + mousePos.y * 0.7}px) scale(${isActive ? 1.15 : 1})`,
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-light/60 via-glow-cyan/40 to-white/30 blob-morph-alt" />
        </div>
      </div>

      {/* Glow effect behind blobs */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1 - parallaxOffset * 0.5}px)`,
        }}
      >
        <div
          className={cn(
            "w-72 h-72 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] rounded-full blur-[80px] md:blur-[100px] transition-colors duration-700",
            isActive ? "bg-brand/40 dark:bg-brand/50" : "bg-brand/25 dark:bg-brand/35",
          )}
        />
      </div>

      {/* Animated rings */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none animate-[spin_40s_linear_infinite]"
        style={{
          transform: `translateY(${-parallaxOffset * 0.3}px)`,
        }}
      >
        <div
          className={cn(
            "w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full border transition-all duration-500",
            isActive ? "border-brand/35 dark:border-brand/45" : "border-brand/15 dark:border-brand/25",
          )}
        />
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none animate-[spin_35s_linear_infinite_reverse]"
        style={{
          transform: `translateY(${-parallaxOffset * 0.2}px)`,
        }}
      >
        <div
          className={cn(
            "w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border border-dashed transition-all duration-500",
            isActive
              ? "border-glow-violet/30 dark:border-glow-violet/40"
              : "border-glow-violet/15 dark:border-glow-violet/25",
          )}
        />
      </div>

      <style jsx>{`
        .blob-morph {
          animation: blobMorph 12s ease-in-out infinite;
        }
        .blob-morph-alt {
          animation: blobMorphAlt 10s ease-in-out infinite;
        }
        .blob-orbit-1 {
          animation: blobFloat1 14s ease-in-out infinite;
        }
        .blob-orbit-2 {
          animation: blobFloat2 12s ease-in-out infinite;
        }
        .blob-orbit-3 {
          animation: blobFloat3 10s ease-in-out infinite;
        }
        
        @keyframes blobMorph {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            border-radius: 40% 60% 55% 45% / 55% 45% 55% 45%;
          }
          50% {
            border-radius: 50% 50% 35% 65% / 40% 60% 40% 60%;
          }
          75% {
            border-radius: 55% 45% 60% 40% / 65% 35% 60% 40%;
          }
        }
        
        @keyframes blobMorphAlt {
          0%, 100% {
            border-radius: 50% 50% 40% 60% / 55% 45% 55% 45%;
          }
          33% {
            border-radius: 45% 55% 55% 45% / 50% 50% 50% 50%;
          }
          66% {
            border-radius: 55% 45% 45% 55% / 45% 55% 45% 55%;
          }
        }
        
        @keyframes blobFloat1 {
          0%, 100% {
            transform: translate(70px, -50px);
          }
          33% {
            transform: translate(85px, -35px);
          }
          66% {
            transform: translate(60px, -65px);
          }
        }
        
        @keyframes blobFloat2 {
          0%, 100% {
            transform: translate(-90px, 70px);
          }
          33% {
            transform: translate(-75px, 85px);
          }
          66% {
            transform: translate(-105px, 55px);
          }
        }
        
        @keyframes blobFloat3 {
          0%, 100% {
            transform: translate(110px, 90px);
          }
          50% {
            transform: translate(95px, 105px);
          }
        }
        
        @keyframes blob-pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.12);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
