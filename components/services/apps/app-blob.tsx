"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Smartphone, Monitor, Cloud, Code2, Zap, Database, Globe, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppBlobProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function AppBlob({ className, size = "lg" }: AppBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeNotification, setActiveNotification] = useState(0)
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

  // Animate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNotification((prev) => (prev + 1) % 4)
    }, 2500)
    return () => clearInterval(interval)
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

  const sizeClasses = {
    sm: {
      mobile: "w-32 h-56",
      webapp: "hidden",
      saas: "hidden",
      code: "hidden",
      glow: "w-[250px] h-[250px]",
      ring1: "w-[220px] h-[220px]",
      ring2: "w-[180px] h-[180px]",
    },
    md: {
      mobile: "w-36 h-64",
      webapp: "hidden md:block w-44 h-32",
      saas: "hidden",
      code: "hidden",
      glow: "w-[350px] h-[350px]",
      ring1: "w-[320px] h-[320px]",
      ring2: "w-[260px] h-[260px]",
    },
    lg: {
      mobile: "w-44 h-80",
      webapp: "w-56 h-40",
      saas: "block",
      code: "block",
      glow: "w-[500px] h-[500px]",
      ring1: "w-[400px] h-[400px]",
      ring2: "w-[320px] h-[320px]",
    },
  }

  const sizes = sizeClasses[size]

  return (
    <div ref={containerRef} className={cn("relative w-full h-full touch-none cursor-pointer", className)}>
      {/* SVG Filter for gooey effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="gooApp">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          <linearGradient id="appGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.4 0.25 270)">
              <animate
                attributeName="stop-color"
                values="oklch(0.4 0.25 270);oklch(0.5 0.22 200);oklch(0.55 0.18 290);oklch(0.4 0.25 270)"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="oklch(0.65 0.18 195)">
              <animate
                attributeName="stop-color"
                values="oklch(0.65 0.18 195);oklch(0.7 0.15 290);oklch(0.6 0.2 270);oklch(0.65 0.18 195)"
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
            sizes.glow,
            isHovering ? "bg-brand/35" : "bg-brand/20",
          )}
        />
      </div>

      {/* Main composition */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{
          transform: `translateY(${-parallaxOffset}px)`,
          filter: "url(#gooApp)",
        }}
      >
        {/* Central Mobile Device - main element */}
        <div
          className="relative mobile-float will-change-transform"
          style={{
            transform: `translate(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px) rotateX(${mousePos.y * 0.08}deg) rotateY(${-mousePos.x * 0.08}deg) scale(${isHovering ? 1.03 : 1})`,
            transformStyle: "preserve-3d",
            transition: "transform 0.1s linear",
          }}
        >
          {/* Mobile Phone Frame */}
          <div
            className={cn(
              "rounded-[2rem] overflow-hidden shadow-2xl mobile-morph border-4 border-foreground/20 bg-card",
              sizes.mobile,
            )}
          >
            {/* Phone Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-foreground/90 rounded-full z-10" />

            {/* Phone Screen */}
            <div className="h-full bg-gradient-to-br from-brand via-brand-light to-glow-violet p-3 pt-8">
              {/* App Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="h-2 bg-white/40 rounded w-16 mb-1" />
                    <div className="h-1.5 bg-white/20 rounded w-10" />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20" />
              </div>

              {/* App Content Cards */}
              <div className="space-y-2">
                <div
                  className="bg-white/15 backdrop-blur-sm rounded-xl p-3"
                  style={{ animation: "pulse 3s ease-in-out infinite" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-glow-cyan/30 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-white/40 rounded w-full mb-1" />
                      <div className="h-1.5 bg-white/20 rounded w-2/3" />
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded w-full" />
                </div>

                <div
                  className="bg-white/15 backdrop-blur-sm rounded-xl p-3"
                  style={{ animation: "pulse 3s ease-in-out 0.5s infinite" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-glow-violet/30 flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-white/40 rounded w-3/4 mb-1" />
                      <div className="h-1.5 bg-white/20 rounded w-1/2" />
                    </div>
                  </div>
                </div>

                <div
                  className="bg-white/15 backdrop-blur-sm rounded-xl p-3"
                  style={{ animation: "pulse 3s ease-in-out 1s infinite" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-brand-dark/30 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-white/40 rounded w-full mb-1" />
                      <div className="h-1.5 bg-white/20 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="absolute bottom-3 left-3 right-3 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-around px-4">
                {[Smartphone, Globe, Cloud, Code2].map((Icon, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                      i === activeNotification ? "bg-white/30 scale-110" : "bg-transparent",
                    )}
                  >
                    <Icon className={cn("w-4 h-4", i === activeNotification ? "text-white" : "text-white/60")} />
                  </div>
                ))}
              </div>
            </div>

            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" />
          </div>
        </div>

        {/* Floating Web App Window - responsive */}
        <div
          className={cn("absolute webapp-orbit will-change-transform", sizes.webapp)}
          style={{
            transform: `translate(${-120 + mousePos.x * 0.4}px, ${-80 + mousePos.y * 0.4}px) rotateZ(${-8 + mousePos.x * 0.1}deg) scale(${isHovering ? 1.08 : 1})`,
            transition: "transform 0.1s linear",
          }}
        >
          <div className="rounded-xl overflow-hidden shadow-xl border-2 border-glow-cyan/30 bg-card">
            {/* Window Header */}
            <div className="h-6 bg-muted flex items-center gap-1.5 px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="flex-1 mx-2">
                <div className="h-3 bg-background rounded-full flex items-center px-2">
                  <div className="w-2 h-2 rounded-full bg-brand/50 mr-1" />
                  <div className="h-1.5 bg-muted-foreground/30 rounded w-full" />
                </div>
              </div>
            </div>
            {/* Window Content */}
            <div className="p-3 bg-gradient-to-br from-glow-cyan/10 to-brand/10">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="w-5 h-5 text-brand" />
                <span className="text-xs font-semibold text-foreground">Web App</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 bg-foreground/10 rounded w-full" />
                <div className="h-2 bg-foreground/10 rounded w-3/4" />
                <div className="h-6 bg-brand/20 rounded-lg mt-2 flex items-center justify-center">
                  <span className="text-[10px] text-brand font-medium">Next.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating SaaS Dashboard - only on large */}
        <div
          className={cn("absolute saas-orbit will-change-transform", size === "lg" ? sizes.saas : "hidden")}
          style={{
            transform: `translate(${100 + mousePos.x * 0.5}px, ${50 + mousePos.y * 0.5}px) scale(${isHovering ? 1.06 : 1})`,
            transition: "transform 0.1s linear",
          }}
        >
          <div className="w-40 rounded-xl overflow-hidden shadow-xl border-2 border-glow-violet/30 bg-card">
            <div className="p-3 bg-gradient-to-br from-glow-violet/10 to-brand/10">
              <div className="flex items-center gap-2 mb-2">
                <Cloud className="w-4 h-4 text-glow-violet" />
                <span className="text-[10px] font-semibold text-foreground">SaaS Platform</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-8 bg-brand/20 rounded flex items-center justify-center">
                  <span className="text-[8px] text-brand font-bold">12.5K</span>
                </div>
                <div className="h-8 bg-glow-cyan/20 rounded flex items-center justify-center">
                  <span className="text-[8px] text-glow-cyan font-bold">+24%</span>
                </div>
              </div>
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-brand to-glow-violet rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Code Snippet - only on large */}
        <div
          className={cn("absolute code-orbit will-change-transform", size === "lg" ? sizes.code : "hidden")}
          style={{
            transform: `translate(${-80 + mousePos.x * 0.35}px, ${90 + mousePos.y * 0.35}px) rotateZ(${6 - mousePos.x * 0.08}deg) scale(${isHovering ? 1.1 : 1})`,
            transition: "transform 0.1s linear",
          }}
        >
          <div className="px-4 py-3 rounded-xl bg-card border border-brand/20 shadow-lg font-mono text-[10px]">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-3.5 h-3.5 text-brand" />
              <span className="text-muted-foreground">app.tsx</span>
            </div>
            <div className="space-y-0.5">
              <div>
                <span className="text-glow-violet">const</span> <span className="text-glow-cyan">App</span> = () =&gt;{" "}
                {"{"}
              </div>
              <div className="pl-2">
                <span className="text-glow-violet">return</span> &lt;<span className="text-brand">View</span>&gt;
              </div>
              <div className="pl-2">
                &lt;/<span className="text-brand">View</span>&gt;
              </div>
              <div>{"}"}</div>
            </div>
          </div>
        </div>

        {/* Floating React Native Badge - only on large */}
        <div
          className={cn("absolute rn-orbit will-change-transform", size === "lg" ? "block" : "hidden")}
          style={{
            transform: `translate(${130 + mousePos.x * 0.45}px, ${-60 + mousePos.y * 0.45}px) scale(${isHovering ? 1.08 : 1})`,
            transition: "transform 0.1s linear",
          }}
        >
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#61DAFB]/20 to-brand/20 border border-[#61DAFB]/30 shadow-lg">
            <span className="text-xs font-semibold text-foreground flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4"
                  stroke="#61DAFB"
                  strokeWidth="1"
                  fill="none"
                  transform="rotate(60 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4"
                  stroke="#61DAFB"
                  strokeWidth="1"
                  fill="none"
                  transform="rotate(120 12 12)"
                />
              </svg>
              React Native
            </span>
          </div>
        </div>

        {/* Cursor pointer element */}
        <div
          className="absolute w-3 h-3 sm:w-4 sm:h-4 pointer-events-none will-change-transform hidden sm:block"
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
      </div>

      {/* Orbiting rings */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none animate-[spin_50s_linear_infinite]"
        style={{ transform: `translateY(${-parallaxOffset * 0.3}px)` }}
      >
        <div
          className={cn(
            "rounded-full border border-dashed transition-all duration-500",
            sizes.ring1,
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
            sizes.ring2,
            isHovering ? "border-glow-cyan/25" : "border-glow-cyan/10",
          )}
        />
      </div>

      <style jsx>{`
        .mobile-float {
          animation: mobileFloat 8s ease-in-out infinite;
        }
        .mobile-morph {
          animation: mobileMorph 12s ease-in-out infinite;
        }
        .webapp-orbit {
          animation: webappOrbit 10s ease-in-out infinite;
        }
        .saas-orbit {
          animation: saasOrbit 11s ease-in-out infinite;
        }
        .code-orbit {
          animation: codeOrbit 9s ease-in-out infinite;
        }
        .rn-orbit {
          animation: rnOrbit 12s ease-in-out infinite;
        }

        @keyframes mobileFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes mobileMorph {
          0%, 100% { border-radius: 2rem; }
          25% { border-radius: 2.2rem 1.8rem 2rem 1.9rem; }
          50% { border-radius: 1.9rem 2.1rem 1.8rem 2rem; }
          75% { border-radius: 2.1rem 1.9rem 2.2rem 1.8rem; }
        }

        @keyframes webappOrbit {
          0%, 100% { transform: translate(-120px, -80px) rotate(-8deg); }
          50% { transform: translate(-110px, -90px) rotate(-5deg); }
        }

        @keyframes saasOrbit {
          0%, 100% { transform: translate(100px, 50px); }
          50% { transform: translate(110px, 40px); }
        }

        @keyframes codeOrbit {
          0%, 100% { transform: translate(-80px, 90px) rotate(6deg); }
          50% { transform: translate(-90px, 100px) rotate(3deg); }
        }

        @keyframes rnOrbit {
          0%, 100% { transform: translate(130px, -60px); }
          50% { transform: translate(120px, -70px); }
        }
      `}</style>
    </div>
  )
}
