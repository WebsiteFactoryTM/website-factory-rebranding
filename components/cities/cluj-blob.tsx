"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ClujBlobProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function ClujBlob({ className, size = "lg" }: ClujBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const animationRef = useRef<number | undefined>(undefined)
  const [particles, setParticles] = useState<Array<{ top: number; left: number; duration: number }>>([])

  // Initialize particles on client-side only to prevent hydration errors
  useEffect(() => {
    const particleCount = size === "sm" ? 5 : 10
    setParticles(
      Array.from({ length: particleCount }, () => ({
        top: 10 + Math.random() * 80,
        left: 5 + Math.random() * 90,
        duration: 4 + Math.random() * 5,
      })),
    )
  }, [size])

  const sizeConfig = {
    sm: { imageSize: 200, showDetails: false },
    md: { imageSize: 300, showDetails: true },
    lg: { imageSize: 420, showDetails: true },
  }

  const config = sizeConfig[size]

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    const animate = () => {
      setMousePos((prev) => ({
        x: lerp(prev.x, targetPos.x, 0.15),
        y: lerp(prev.y, targetPos.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [targetPos])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleInteraction = useCallback((x: number, y: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const normalizedX = ((x - rect.left) / rect.width - 0.5) * 40
    const normalizedY = ((y - rect.top) / rect.height - 0.5) * 40
    setTargetPos({ x: normalizedX, y: normalizedY })
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleInteraction(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handleInteraction(e.touches[0].clientX, e.touches[0].clientY)
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

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full touch-none cursor-pointer select-none overflow-hidden", className)}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{ transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1 - parallaxOffset * 0.5}px)` }}
      >
        <div
          className={cn(
            "rounded-full blur-[100px] transition-all duration-700",
            isHovering ? "bg-brand/50" : "bg-brand/30",
            size === "sm" ? "w-48 h-48" : size === "md" ? "w-72 h-72" : "w-[500px] h-[500px]",
          )}
        />
      </div>

      {/* Secondary glow - violet for Cluj's tech hub identity */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          transform: `translate(${mousePos.x * 0.15 + 30}px, ${mousePos.y * 0.12 - parallaxOffset * 0.3 - 20}px)`,
        }}
      >
        <div
          className={cn(
            "rounded-full blur-[80px] transition-all duration-700",
            isHovering ? "bg-glow-violet/40" : "bg-glow-violet/20",
            size === "sm" ? "w-32 h-32" : size === "md" ? "w-48 h-48" : "w-[300px] h-[300px]",
          )}
        />
      </div>

      {/* Animated rings */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ animation: "spin 50s linear infinite" }}
      >
        <div
          className={cn(
            "rounded-full border transition-all duration-500",
            isHovering ? "border-brand/30" : "border-brand/15",
            size === "sm" ? "w-56 h-56" : size === "md" ? "w-80 h-80" : "w-[480px] h-[480px]",
          )}
        />
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ animation: "spin 40s linear infinite reverse" }}
      >
        <div
          className={cn(
            "rounded-full border border-dashed transition-all duration-500",
            isHovering ? "border-glow-violet/25" : "border-glow-violet/10",
            size === "sm" ? "w-48 h-48" : size === "md" ? "w-72 h-72" : "w-[420px] h-[420px]",
          )}
        />
      </div>

      {/* Main Church Image Container */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3 - parallaxOffset}px) scale(${isHovering ? 1.03 : 1})`,
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="relative" style={{ width: config.imageSize, height: config.imageSize }}>
          <Image
            src="/images/cluj-napoca-church.webp"
            alt="Biserica Sfântul Mihail Cluj-Napoca - simbol al orașului"
            fill
            className="object-contain drop-shadow-2xl"
            style={{
              filter: isHovering
                ? "drop-shadow(0 0 40px oklch(0.5 0.2 270 / 0.5))"
                : "drop-shadow(0 0 20px oklch(0.5 0.2 270 / 0.3))",
              transition: "filter 0.5s ease",
            }}
            priority
          />

          {/* Reflection highlight */}
          <div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              background: `radial-gradient(circle at ${50 + mousePos.x * 0.5}% ${50 + mousePos.y * 0.5}%, white 0%, transparent 60%)`,
              opacity: isHovering ? 0.15 : 0.08,
              transition: "opacity 0.3s ease",
              mixBlendMode: "overlay",
            }}
          />
        </div>
      </div>

      {/* Floating web/code elements */}
      {config.showDetails && (
        <>
          {/* Browser window */}
          <div
            className="absolute will-change-transform"
            style={{
              top: size === "lg" ? "8%" : "12%",
              right: size === "lg" ? "2%" : "5%", // Adjusted from negative
              transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.5 - parallaxOffset * 0.3}px)`,
            }}
          >
            <div
              className={cn(
                "rounded-xl bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border border-border/50 shadow-2xl overflow-hidden",
                size === "lg" ? "w-36 h-28" : "w-28 h-22",
              )}
            >
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30 bg-muted/30">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="ml-2 text-[8px] text-muted-foreground truncate">site-cluj.ro</span>
              </div>
              <div className="p-3 space-y-2">
                <div className="h-2 w-full bg-brand/40 rounded" />
                <div className="h-1.5 w-3/4 bg-muted-foreground/20 rounded" />
                <div className="h-1.5 w-1/2 bg-muted-foreground/15 rounded" />
                <div className="flex gap-1 mt-2">
                  <div className="h-6 w-6 bg-brand/20 rounded" />
                  <div className="h-6 w-6 bg-brand/20 rounded" />
                  <div className="h-6 w-6 bg-brand/20 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Code snippet - Cluj tech hub theme */}
          <div
            className="absolute will-change-transform"
            style={{
              bottom: size === "lg" ? "12%" : "18%",
              left: size === "lg" ? "2%" : "5%", // Adjusted from negative
              transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.6 - parallaxOffset * 0.4}px)`,
            }}
          >
            <div
              className={cn(
                "rounded-xl bg-white/95 dark:bg-[#1a1a2e]/95 backdrop-blur-xl border border-brand/30 dark:border-brand/20 shadow-2xl font-mono p-4",
                size === "lg" ? "text-[11px]" : "text-[9px]",
              )}
            >
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/20 dark:border-white/10">
                <div className="w-2 h-2 rounded-full bg-brand" />
                <span className="text-muted-foreground text-[9px]">cluj.config.ts</span>
              </div>
              <div className="text-purple-600 dark:text-purple-400">
                {"const"} <span className="text-cyan-600 dark:text-cyan-400">startup</span> = {"{"}
              </div>
              <div className="pl-3 text-foreground/80">
                city: <span className="text-green-600 dark:text-green-400">"Cluj-Napoca"</span>,
              </div>
              <div className="pl-3 text-foreground/80">
                hub: <span className="text-yellow-600 dark:text-yellow-400">"Silicon Valley"</span>,
              </div>
              <div className="pl-3 text-foreground/80">
                tech: <span className="text-cyan-600 dark:text-cyan-400">"cutting-edge"</span>
              </div>
              <div className="text-purple-600 dark:text-purple-400">{"}"}</div>
            </div>
          </div>

          {/* Tech Hub Badge - unique to Cluj */}
          <div
            className="absolute will-change-transform"
            style={{
              top: size === "lg" ? "55%" : "50%",
              right: size === "lg" ? "2%" : "5%", // Adjusted from negative
              transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.4}px)`,
            }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 backdrop-blur-sm shadow-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
              <span className={cn("font-bold text-violet-400", size === "lg" ? "text-sm" : "text-xs")}>Tech Hub</span>
            </div>
          </div>

          {/* Performance Badge */}
          <div
            className="absolute will-change-transform"
            style={{
              bottom: size === "lg" ? "25%" : "30%",
              right: size === "lg" ? "5%" : "8%",
              transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.35}px)`,
            }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/20 border border-brand/30 backdrop-blur-sm shadow-lg">
              <svg
                className="w-3.5 h-3.5 text-brand"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span className={cn("font-medium text-brand", size === "lg" ? "text-xs" : "text-[10px]")}>
                Ultra Fast
              </span>
            </div>
          </div>

          {/* Location Pin */}
          <div
            className="absolute will-change-transform"
            style={{
              top: size === "lg" ? "20%" : "25%",
              left: size === "lg" ? "8%" : "10%", // Adjusted positioning
              transform: `translate(${mousePos.x * 0.55}px, ${mousePos.y * 0.45}px)`,
            }}
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/90 border border-border/50 backdrop-blur-sm shadow-lg">
              <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-brand"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className={cn("font-semibold text-foreground", size === "lg" ? "text-xs" : "text-[10px]")}>
                  Cluj-Napoca
                </div>
                <div className={cn("text-muted-foreground", size === "lg" ? "text-[10px]" : "text-[8px]")}>
                  Silicon Valley RO
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full",
              i % 4 === 0
                ? "bg-brand/70 w-1.5 h-1.5"
                : i % 4 === 1
                  ? "bg-glow-cyan/60 w-1 h-1"
                  : i % 4 === 2
                    ? "bg-glow-violet/50 w-2 h-2"
                    : "bg-rose-400/50 w-1 h-1",
            )}
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animationName: "float",
              animationDuration: `${particle.duration}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0% { transform: translate(0px, 0px) scale(1); opacity: 0.6; }
          25% { transform: translate(-12px, -18px) scale(1.15); opacity: 0.9; }
          50% { transform: translate(18px, -22px) scale(0.85); opacity: 1; }
          75% { transform: translate(10px, -12px) scale(1.08); opacity: 0.75; }
          100% { transform: translate(0px, 0px) scale(1); opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
