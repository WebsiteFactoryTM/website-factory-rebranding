"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface WebsiteBlobProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function WebsiteBlob({ className, size = "lg" }: WebsiteBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const animationRef = useRef<number | undefined>(undefined)

  // Smooth lerp animation
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setMousePos((prev) => ({
        x: lerp(prev.x, targetPos.x, 0.06),
        y: lerp(prev.y, targetPos.y, 0.06),
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

  // Scroll parallax
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
    const normalizedX = ((x - rect.left) / rect.width - 0.5) * 50
    const normalizedY = ((y - rect.top) / rect.height - 0.5) * 50
    setTargetPos({ x: normalizedX, y: normalizedY })
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY)
      }
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
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
        container.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [handleInteraction])

  const parallaxOffset = scrollY * 0.08

  const sizeConfig = {
    sm: {
      browserWidth: "w-48 sm:w-56",
      glowSize: "w-[250px] h-[250px]",
      ringSize1: "w-[220px] h-[220px]",
      ringSize2: "w-[180px] h-[180px]",
      showMobile: true,
      showTablet: false,
      showCode: false,
      showPalette: false,
      mobileOffset: { x: -80, y: 50 },
    },
    md: {
      browserWidth: "w-56 sm:w-64 md:w-72",
      glowSize: "w-[350px] h-[350px]",
      ringSize1: "w-[300px] h-[300px]",
      ringSize2: "w-[240px] h-[240px]",
      showMobile: true,
      showTablet: true,
      showCode: false,
      showPalette: false,
      mobileOffset: { x: -100, y: 60 },
    },
    lg: {
      browserWidth: "w-64 sm:w-72 md:w-80 lg:w-96",
      glowSize: "w-[500px] h-[500px]",
      ringSize1: "w-[400px] h-[400px]",
      ringSize2: "w-[320px] h-[320px]",
      showMobile: true,
      showTablet: true,
      showCode: true,
      showPalette: true,
      mobileOffset: { x: -140, y: 80 },
    },
  }

  const config = sizeConfig[size]

  return (
    <div ref={containerRef} className={cn("relative w-full h-full touch-none cursor-pointer", className)}>
      {/* SVG Filter for gooey effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="gooWebsite">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          <linearGradient id="browserGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.4 0.25 270)">
              <animate
                attributeName="stop-color"
                values="oklch(0.4 0.25 270);oklch(0.5 0.22 285);oklch(0.55 0.18 200);oklch(0.4 0.25 270)"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="oklch(0.65 0.18 290)">
              <animate
                attributeName="stop-color"
                values="oklch(0.65 0.18 290);oklch(0.7 0.15 200);oklch(0.6 0.2 270);oklch(0.65 0.18 290)"
                dur="12s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
      </svg>

      {/* Background glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1 - parallaxOffset * 0.5}px)`,
        }}
      >
        <div
          className={cn(
            "rounded-full blur-[100px] transition-colors duration-700",
            config.glowSize,
            isHovering ? "bg-brand/35" : "bg-brand/20",
          )}
        />
      </div>

      {/* Main composition */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{
          transform: `translateY(${-parallaxOffset}px)`,
          filter: "url(#gooWebsite)",
        }}
      >
        {/* Central browser window - main element */}
        <div
          className="relative browser-float will-change-transform"
          style={{
            transform: `translate(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px) rotateX(${mousePos.y * 0.08}deg) rotateY(${-mousePos.x * 0.08}deg) scale(${isHovering ? 1.03 : 1})`,
            transformStyle: "preserve-3d",
            transition: "transform 0.1s linear",
          }}
        >
          {/* Browser chrome */}
          <div className={cn("rounded-2xl overflow-hidden shadow-2xl browser-morph", config.browserWidth)}>
            {/* Browser header */}
            <div className="bg-gradient-to-r from-brand via-brand-light to-glow-violet p-2 sm:p-3 flex items-center gap-2">
              <div className="flex gap-1 sm:gap-1.5">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/30" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/30" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white/30" />
              </div>
              <div className="flex-1 h-4 sm:h-5 bg-white/10 rounded-full mx-2 sm:mx-4" />
            </div>
            {/* Browser content - morphing design */}
            <div className="bg-gradient-to-br from-background via-card to-muted aspect-[4/3] p-2 sm:p-4 relative overflow-hidden">
              {/* Animated layout lines */}
              <div className="absolute inset-2 sm:inset-4 grid grid-rows-6 gap-1 sm:gap-2">
                {/* Header bar */}
                <div
                  className="row-span-1 rounded bg-gradient-to-r from-brand/40 to-brand/20 animate-pulse"
                  style={{ animationDuration: "3s" }}
                />
                {/* Hero section */}
                <div className="row-span-2 grid grid-cols-2 gap-1 sm:gap-2">
                  <div className="space-y-1 sm:space-y-2">
                    <div
                      className="h-2 sm:h-3 rounded bg-foreground/20 w-3/4"
                      style={{ animation: "pulse 2.5s ease-in-out infinite" }}
                    />
                    <div
                      className="h-2 sm:h-3 rounded bg-foreground/15 w-full"
                      style={{ animation: "pulse 2.5s ease-in-out 0.2s infinite" }}
                    />
                    <div
                      className="h-2 sm:h-3 rounded bg-foreground/10 w-2/3"
                      style={{ animation: "pulse 2.5s ease-in-out 0.4s infinite" }}
                    />
                    <div
                      className="h-4 sm:h-6 rounded bg-brand/50 w-1/2 mt-1 sm:mt-2"
                      style={{ animation: "pulse 3s ease-in-out infinite" }}
                    />
                  </div>
                  <div
                    className="rounded-lg bg-gradient-to-br from-glow-cyan/30 to-glow-violet/30"
                    style={{ animation: "pulse 4s ease-in-out infinite" }}
                  />
                </div>
                {/* Cards section */}
                <div className="row-span-2 grid grid-cols-3 gap-1 sm:gap-2">
                  <div
                    className="rounded bg-card border border-border/50"
                    style={{ animation: "pulse 3s ease-in-out 0.1s infinite" }}
                  />
                  <div
                    className="rounded bg-card border border-border/50"
                    style={{ animation: "pulse 3s ease-in-out 0.3s infinite" }}
                  />
                  <div
                    className="rounded bg-card border border-border/50"
                    style={{ animation: "pulse 3s ease-in-out 0.5s infinite" }}
                  />
                </div>
                {/* Footer */}
                <div
                  className="row-span-1 rounded bg-muted/50"
                  style={{ animation: "pulse 4s ease-in-out infinite" }}
                />
              </div>
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" />
            </div>
          </div>
        </div>

        {/* Floating mobile device */}
        {config.showMobile && (
          <div
            className="absolute mobile-orbit will-change-transform"
            style={{
              transform: `translate(${config.mobileOffset.x + mousePos.x * 0.4}px, ${config.mobileOffset.y + mousePos.y * 0.4}px) rotateZ(${-8 + mousePos.x * 0.1}deg) scale(${isHovering ? 1.08 : 1})`,
              transition: "transform 0.1s linear",
            }}
          >
            <div
              className={cn(
                "rounded-xl overflow-hidden shadow-xl border-2 border-brand/30",
                size === "sm" ? "w-14 sm:w-16" : size === "md" ? "w-16 sm:w-20" : "w-20 sm:w-24 md:w-28",
              )}
            >
              <div className="bg-brand/80 h-1.5 sm:h-2 flex items-center justify-center">
                <div className="w-4 sm:w-6 h-0.5 sm:h-1 rounded-full bg-white/30" />
              </div>
              <div className="bg-gradient-to-b from-card to-muted aspect-[9/16] p-1 sm:p-1.5">
                <div className="h-full rounded bg-muted/50 space-y-0.5 sm:space-y-1 p-0.5 sm:p-1">
                  <div className="h-1 sm:h-1.5 bg-foreground/20 rounded w-3/4" />
                  <div className="h-1 sm:h-1.5 bg-foreground/15 rounded w-full" />
                  <div className="h-3 sm:h-4 bg-glow-cyan/20 rounded mt-0.5 sm:mt-1" />
                  <div className="grid grid-cols-2 gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                    <div className="h-2 sm:h-3 bg-card rounded" />
                    <div className="h-2 sm:h-3 bg-card rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating tablet */}
        {config.showTablet && (
          <div
            className="absolute tablet-orbit will-change-transform hidden sm:block"
            style={{
              transform: `translate(${(size === "md" ? 100 : 130) + mousePos.x * 0.5}px, ${(size === "md" ? -40 : -60) + mousePos.y * 0.5}px) rotateZ(${12 - mousePos.x * 0.08}deg) scale(${isHovering ? 1.06 : 1})`,
              transition: "transform 0.1s linear",
            }}
          >
            <div
              className={cn(
                "rounded-lg overflow-hidden shadow-xl border-2 border-glow-violet/30",
                size === "md" ? "w-24 sm:w-28" : "w-28 sm:w-32 md:w-36",
              )}
            >
              <div className="bg-glow-violet/70 h-1.5 sm:h-2" />
              <div className="bg-gradient-to-br from-card to-background aspect-[4/3] p-1 sm:p-1.5">
                <div className="h-full rounded bg-muted/30 grid grid-rows-3 gap-0.5 sm:gap-1 p-0.5 sm:p-1">
                  <div className="bg-foreground/15 rounded" />
                  <div className="grid grid-cols-2 gap-0.5 sm:gap-1">
                    <div className="bg-brand/20 rounded" />
                    <div className="bg-glow-cyan/20 rounded" />
                  </div>
                  <div className="bg-foreground/10 rounded" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating code snippet */}
        {config.showCode && (
          <div
            className="absolute code-orbit will-change-transform hidden md:block"
            style={{
              transform: `translate(${-160 + mousePos.x * 0.6}px, ${-90 + mousePos.y * 0.6}px) scale(${isHovering ? 1.1 : 1})`,
              transition: "transform 0.1s linear",
            }}
          >
            <div className="px-3 py-2 rounded-lg bg-[#1e1e2e] border border-brand/20 shadow-lg font-mono text-[10px] sm:text-xs">
              <div className="flex gap-1.5 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400/70" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                <div className="w-2 h-2 rounded-full bg-green-400/70" />
              </div>
              <div className="space-y-0.5 text-white/80">
                <p>
                  <span className="text-glow-violet">{"<"}</span>
                  <span className="text-glow-cyan">div</span>
                  <span className="text-glow-violet">{">"}</span>
                </p>
                <p className="pl-2">
                  <span className="text-brand-light">Your</span>
                  <span className="text-white"> Website</span>
                </p>
                <p>
                  <span className="text-glow-violet">{"</"}</span>
                  <span className="text-glow-cyan">div</span>
                  <span className="text-glow-violet">{">"}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Floating design element - color palette */}
        {config.showPalette && (
          <div
            className="absolute palette-orbit will-change-transform hidden lg:block"
            style={{
              transform: `translate(${170 + mousePos.x * 0.45}px, ${100 + mousePos.y * 0.45}px) scale(${isHovering ? 1.08 : 1})`,
              transition: "transform 0.1s linear",
            }}
          >
            <div className="flex gap-1 p-2 rounded-lg glass-premium shadow-lg">
              <div className="w-5 h-5 rounded-full bg-brand" />
              <div className="w-5 h-5 rounded-full bg-glow-violet" />
              <div className="w-5 h-5 rounded-full bg-glow-cyan" />
              <div className="w-5 h-5 rounded-full bg-foreground/80" />
            </div>
          </div>
        )}

        {/* Cursor pointer element - only on larger sizes */}
        {size === "lg" && (
          <div
            className="absolute w-4 h-4 pointer-events-none will-change-transform hidden md:block"
            style={{
              transform: `translate(${40 + mousePos.x * 0.8}px, ${20 + mousePos.y * 0.8}px)`,
              transition: "transform 0.05s linear",
            }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-lg">
              <path
                d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36z"
                fill="white"
                stroke="oklch(0.4 0.2 270)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Orbiting rings */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none animate-[spin_50s_linear_infinite]"
        style={{ transform: `translateY(${-parallaxOffset * 0.3}px)` }}
      >
        <div
          className={cn(
            "rounded-full border border-dashed transition-all duration-500",
            config.ringSize1,
            isHovering ? "border-brand/30" : "border-brand/15",
          )}
        />
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none animate-[spin_40s_linear_infinite_reverse]"
        style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}
      >
        <div
          className={cn(
            "rounded-full border transition-all duration-500",
            config.ringSize2,
            isHovering ? "border-glow-violet/25" : "border-glow-violet/10",
          )}
        />
      </div>

      <style jsx>{`
        .browser-float {
          animation: browserFloat 8s ease-in-out infinite;
        }
        .browser-morph {
          animation: browserMorph 12s ease-in-out infinite;
        }
        .mobile-orbit {
          animation: mobileOrbit 10s ease-in-out infinite;
        }
        .tablet-orbit {
          animation: tabletOrbit 12s ease-in-out infinite;
        }
        .code-orbit {
          animation: codeOrbit 9s ease-in-out infinite;
        }
        .palette-orbit {
          animation: paletteOrbit 11s ease-in-out infinite;
        }
        
        @keyframes browserFloat {
          0%, 100% {
            transform: translateY(0) rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: translateY(-8px) rotateX(2deg) rotateY(-2deg);
          }
          50% {
            transform: translateY(0) rotateX(0deg) rotateY(0deg);
          }
          75% {
            transform: translateY(-5px) rotateX(-1deg) rotateY(2deg);
          }
        }
        
        @keyframes browserMorph {
          0%, 100% {
            border-radius: 16px;
          }
          50% {
            border-radius: 20px 16px 18px 14px;
          }
        }
        
        @keyframes mobileOrbit {
          0%, 100% {
            transform: translate(-140px, 80px) rotateZ(-8deg);
          }
          50% {
            transform: translate(-150px, 70px) rotateZ(-12deg);
          }
        }
        
        @keyframes tabletOrbit {
          0%, 100% {
            transform: translate(130px, -60px) rotateZ(12deg);
          }
          50% {
            transform: translate(140px, -70px) rotateZ(8deg);
          }
        }
        
        @keyframes codeOrbit {
          0%, 100% {
            transform: translate(-160px, -90px);
          }
          50% {
            transform: translate(-150px, -100px);
          }
        }
        
        @keyframes paletteOrbit {
          0%, 100% {
            transform: translate(170px, 100px);
          }
          50% {
            transform: translate(160px, 110px);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  )
}
