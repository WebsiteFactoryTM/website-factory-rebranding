"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BrasovBlobProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function BrasovBlob({ className, size = "lg" }: BrasovBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const animationRef = useRef<number>()

  const sizeConfig = {
    sm: { imageSize: 280, showDetails: false },
    md: { imageSize: 400, showDetails: true },
    lg: { imageSize: 520, showDetails: true },
  }

  const config = sizeConfig[size]

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    const animate = () => {
      setMousePos((prev) => ({
        x: lerp(prev.x, targetPos.x, 0.06),
        y: lerp(prev.y, targetPos.y, 0.06),
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
      {/* Background glow - amber/gold for Transylvania medieval vibe */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{ transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1 - parallaxOffset * 0.5}px)` }}
      >
        <div
          className={cn(
            "rounded-full blur-[100px] transition-all duration-700",
            isHovering ? "bg-amber-500/40" : "bg-amber-500/25",
            size === "sm" ? "w-56 h-56" : size === "md" ? "w-80 h-80" : "w-[500px] h-[500px]",
          )}
        />
      </div>

      {/* Secondary glow - brand indigo */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          transform: `translate(${mousePos.x * 0.15 + 40}px, ${mousePos.y * 0.12 - parallaxOffset * 0.3 - 30}px)`,
        }}
      >
        <div
          className={cn(
            "rounded-full blur-[80px] transition-all duration-700",
            isHovering ? "bg-brand/40" : "bg-brand/20",
            size === "sm" ? "w-40 h-40" : size === "md" ? "w-56 h-56" : "w-[350px] h-[350px]",
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
            isHovering ? "border-amber-400/30" : "border-amber-400/15",
            size === "sm" ? "w-72 h-72" : size === "md" ? "w-[420px] h-[420px]" : "w-[580px] h-[580px]",
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
            isHovering ? "border-brand/25" : "border-brand/10",
            size === "sm" ? "w-64 h-64" : size === "md" ? "w-[380px] h-[380px]" : "w-[520px] h-[520px]",
          )}
        />
      </div>

      {/* Main Biserica Neagră Image Container */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3 - parallaxOffset}px) scale(${isHovering ? 1.03 : 1})`,
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="relative" style={{ width: config.imageSize, height: config.imageSize * 1.1 }}>
          <Image
            src="/biserica-neagra-brasov.webp"
            alt="Biserica Neagră Brașov - simbol iconic al orașului"
            fill
            className="object-contain drop-shadow-2xl"
            style={{
              filter: isHovering
                ? "drop-shadow(0 0 60px oklch(0.7 0.15 45 / 0.5))"
                : "drop-shadow(0 0 30px oklch(0.7 0.15 45 / 0.3))",
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
              top: size === "lg" ? "8%" : "10%",
              right: size === "lg" ? "2%" : "5%",
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
                <span className="ml-2 text-[8px] text-muted-foreground truncate">turism-brasov.ro</span>
              </div>
              <div className="p-3 space-y-2">
                <div className="h-2 w-full bg-amber-500/40 rounded" />
                <div className="h-1.5 w-3/4 bg-muted-foreground/20 rounded" />
                <div className="h-1.5 w-1/2 bg-muted-foreground/15 rounded" />
                <div className="flex gap-1 mt-2">
                  <div className="h-6 w-6 bg-amber-500/20 rounded" />
                  <div className="h-6 w-6 bg-amber-500/20 rounded" />
                  <div className="h-6 w-6 bg-amber-500/20 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Code snippet - Brașov tourism theme */}
          <div
            className="absolute will-change-transform"
            style={{
              bottom: size === "lg" ? "18%" : "22%",
              left: size === "lg" ? "2%" : "5%",
              transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.6 - parallaxOffset * 0.4}px)`,
            }}
          >
            <div
              className={cn(
                "rounded-xl bg-white/95 dark:bg-[#1a1a2e]/95 backdrop-blur-xl border border-amber-500/30 dark:border-amber-500/20 shadow-2xl font-mono p-4",
                size === "lg" ? "text-[11px]" : "text-[9px]",
              )}
            >
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/20 dark:border-white/10">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-muted-foreground text-[9px]">brasov.config.ts</span>
              </div>
              <div className="text-purple-600 dark:text-purple-400">
                {"const"} <span className="text-amber-600 dark:text-amber-400">destination</span> = {"{"}
              </div>
              <div className="pl-3 text-foreground/80">
                city: <span className="text-green-600 dark:text-green-400">"Brașov"</span>,
              </div>
              <div className="pl-3 text-foreground/80">
                region: <span className="text-yellow-600 dark:text-yellow-400">"Transilvania"</span>,
              </div>
              <div className="pl-3 text-foreground/80">
                industry: <span className="text-amber-600 dark:text-amber-400">"turism"</span>
              </div>
              <div className="text-purple-600 dark:text-purple-400">{"}"}</div>
            </div>
          </div>

          {/* Tourism Badge - unique to Brașov */}
          <div
            className="absolute will-change-transform"
            style={{
              top: size === "lg" ? "45%" : "40%",
              right: size === "lg" ? "2%" : "5%",
              transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.4}px)`,
            }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 backdrop-blur-sm shadow-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className={cn("font-bold text-amber-400", size === "lg" ? "text-sm" : "text-xs")}>
                Inima Transilvaniei
              </span>
            </div>
          </div>

          {/* SEO Badge */}
          <div
            className="absolute will-change-transform"
            style={{
              bottom: size === "lg" ? "35%" : "38%",
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <span className={cn("font-medium text-brand", size === "lg" ? "text-xs" : "text-[10px]")}>SEO Local</span>
            </div>
          </div>

          {/* Location Pin */}
          <div
            className="absolute will-change-transform"
            style={{
              top: size === "lg" ? "15%" : "18%",
              left: size === "lg" ? "8%" : "10%",
              transform: `translate(${mousePos.x * 0.55}px, ${mousePos.y * 0.45}px)`,
            }}
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/90 border border-border/50 backdrop-blur-sm shadow-lg">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-amber-500"
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
                  Brașov
                </div>
                <div className={cn("text-muted-foreground", size === "lg" ? "text-[10px]" : "text-[8px]")}>
                  Transilvania, România
                </div>
              </div>
            </div>
          </div>

          {/* HoReCa Badge */}
          <div
            className="absolute will-change-transform"
            style={{
              bottom: size === "lg" ? "5%" : "8%",
              left: size === "lg" ? "25%" : "20%",
              transform: `translate(${mousePos.x * 0.45}px, ${mousePos.y * 0.5}px)`,
            }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 backdrop-blur-sm shadow-lg">
              <svg
                className="w-3.5 h-3.5 text-violet-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className={cn("font-medium text-violet-400", size === "lg" ? "text-xs" : "text-[10px]")}>
                HoReCa Pro
              </span>
            </div>
          </div>
        </>
      )}

      {/* Floating particles - amber/gold themed colors */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(size === "sm" ? 5 : 12)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full",
              i % 4 === 0
                ? "bg-amber-400/70 w-1.5 h-1.5"
                : i % 4 === 1
                  ? "bg-brand/60 w-1 h-1"
                  : i % 4 === 2
                    ? "bg-violet-400/50 w-2 h-2"
                    : "bg-yellow-400/50 w-1 h-1",
            )}
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              animationName: "float",
              animationDuration: `${4 + Math.random() * 5}s`,
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
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
