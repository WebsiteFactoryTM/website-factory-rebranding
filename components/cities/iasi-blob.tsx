"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface IasiBlobProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function IasiBlob({ className, size = "lg" }: IasiBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const animationRef = useRef<number>()

  const sizeConfig = {
    sm: { imageSize: 220, showDetails: false },
    md: { imageSize: 340, showDetails: true },
    lg: { imageSize: 480, showDetails: true },
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
    <div ref={containerRef} className={cn("relative w-full h-full touch-none cursor-pointer select-none", className)}>
      {/* Background glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{ transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1 - parallaxOffset * 0.5}px)` }}
      >
        <div
          className={cn(
            "rounded-full blur-[100px] transition-all duration-700",
            isHovering ? "bg-brand/50" : "bg-brand/30",
            size === "sm" ? "w-48 h-48" : size === "md" ? "w-72 h-72" : "w-[550px] h-[450px]",
          )}
        />
      </div>

      {/* Secondary glow - cyan for Iași's cultural/academic identity */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          transform: `translate(${mousePos.x * 0.15 + 40}px, ${mousePos.y * 0.12 - parallaxOffset * 0.3 - 30}px)`,
        }}
      >
        <div
          className={cn(
            "rounded-full blur-[80px] transition-all duration-700",
            isHovering ? "bg-glow-cyan/40" : "bg-glow-cyan/20",
            size === "sm" ? "w-32 h-32" : size === "md" ? "w-48 h-48" : "w-[320px] h-[280px]",
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
            size === "sm" ? "w-64 h-56" : size === "md" ? "w-96 h-80" : "w-[540px] h-[440px]",
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
            isHovering ? "border-glow-cyan/25" : "border-glow-cyan/10",
            size === "sm" ? "w-56 h-48" : size === "md" ? "w-80 h-72" : "w-[480px] h-[400px]",
          )}
        />
      </div>

      {/* Main Palace Image Container */}
      <div
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3 - parallaxOffset}px) scale(${isHovering ? 1.03 : 1})`,
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="relative" style={{ width: config.imageSize, height: config.imageSize * 0.75 }}>
          <Image
            src="/images/iasi-palatul-culturii.webp"
            alt="Palatul Culturii Iași - simbol al culturii și inovației din Moldova"
            fill
            className="object-contain drop-shadow-2xl"
            style={{
              filter: isHovering
                ? "drop-shadow(0 0 50px oklch(0.5 0.2 240 / 0.5))"
                : "drop-shadow(0 0 25px oklch(0.5 0.2 240 / 0.3))",
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
              top: size === "lg" ? "5%" : "10%",
              right: size === "lg" ? "0%" : "-5%",
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
                <span className="ml-2 text-[8px] text-muted-foreground truncate">site-iasi.ro</span>
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

          {/* Code snippet - Iași culture & tech theme */}
          <div
            className="absolute will-change-transform"
            style={{
              bottom: size === "lg" ? "15%" : "20%",
              left: size === "lg" ? "-2%" : "-8%",
              transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.6 - parallaxOffset * 0.4}px)`,
            }}
          >
            <div
              className={cn(
                "rounded-xl bg-[#1a1a2e]/95 backdrop-blur-xl border border-brand/20 shadow-2xl font-mono p-4",
                size === "lg" ? "text-[11px]" : "text-[9px]",
              )}
            >
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-muted-foreground text-[9px]">iasi.config.ts</span>
              </div>
              <div className="text-purple-400">
                {"const"} <span className="text-cyan-400">moldova</span> = {"{"}
              </div>
              <div className="pl-3 text-foreground/80">
                city: <span className="text-green-400">"Iași"</span>,
              </div>
              <div className="pl-3 text-foreground/80">
                heritage: <span className="text-yellow-400">"cultural"</span>,
              </div>
              <div className="pl-3 text-foreground/80">
                tech: <span className="text-cyan-400">"growing"</span>
              </div>
              <div className="text-purple-400">{"}"}</div>
            </div>
          </div>

          {/* Culture Badge - unique to Iași */}
          <div
            className="absolute will-change-transform"
            style={{
              top: size === "lg" ? "50%" : "45%",
              right: size === "lg" ? "-8%" : "-10%",
              transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.4}px)`,
            }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 backdrop-blur-sm shadow-lg">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className={cn("font-bold text-cyan-400", size === "lg" ? "text-sm" : "text-xs")}>
                Capitala Culturală
              </span>
            </div>
          </div>

          {/* SEO Badge */}
          <div
            className="absolute will-change-transform"
            style={{
              bottom: size === "lg" ? "28%" : "32%",
              right: size === "lg" ? "5%" : "0%",
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
              top: size === "lg" ? "18%" : "22%",
              left: size === "lg" ? "3%" : "-2%",
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
                  Iași
                </div>
                <div className={cn("text-muted-foreground", size === "lg" ? "text-[10px]" : "text-[8px]")}>
                  Moldova, România
                </div>
              </div>
            </div>
          </div>

          {/* University Badge */}
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
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span className={cn("font-medium text-violet-400", size === "lg" ? "text-xs" : "text-[10px]")}>
                Centru Universitar
              </span>
            </div>
          </div>
        </>
      )}

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(size === "sm" ? 5 : 12)].map((_, i) => (
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
                    : "bg-blue-400/50 w-1 h-1",
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
