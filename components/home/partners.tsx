"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { generatePartnerLogoAltText } from "@/lib/image-alt-text"

const partners = [
  { name: "Sotherm", logo: "/partners/logo-design-sotherm.webp" },
  { name: "Merpano", logo: "/partners/design-logo-merpano.webp" },
  { name: "OrneBlue Phoenix", logo: "/partners/blue-phoenix-partner.webp" },
  { name: "Ornella", logo: "/partners/ornella.webp" },
  { name: "You Plus Agency", logo: "/partners/youplus-partner.webp" },
  { name: "Frentzy", logo: "/partners/frentzy.webp" },
  { name: "Pinocchio", logo: "/partners/pinocchio.webp" },
  { name: "The Permanent", logo: "/partners/the-permanent-partner.webp" },
  { name: "Revelio", logo: "/partners/revelio.webp" },
  { name: "Jurjut", logo: "/partners/jurjut.webp" },
  { name: "Horvel", logo: "/partners/horvel.webp" },
]

// Duplicate partners for infinite loop
const duplicatedPartners = [...partners, ...partners, ...partners]

export function Partners() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const autoScrollRef = useRef<number | null>(null)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate single set width for seamless loop
  const getSingleSetWidth = useCallback(() => {
    if (!scrollRef.current) return 0
    const firstChild = scrollRef.current.firstElementChild as HTMLElement
    if (!firstChild) return 0
    return partners.length * (firstChild.offsetWidth + 32) // 32px is gap (gap-8 = 2rem)
  }, [])

  // Smooth auto-scroll with infinite loop
  useEffect(() => {
    if (!scrollRef.current || isPaused || isDragging) return

    const scrollContainer = scrollRef.current
    const scrollSpeed = 0.3 // pixels per frame (smooth speed)
    let lastTimestamp = performance.now()

    const autoScroll = (timestamp: number) => {
      if (!scrollContainer || isPaused || isDragging) return

      const deltaTime = timestamp - lastTimestamp
      lastTimestamp = timestamp

      // Smooth scroll using requestAnimationFrame timing
      const scrollDelta = (scrollSpeed * deltaTime) / 16.67 // Normalize to 60fps
      scrollContainer.scrollLeft += scrollDelta

      // Infinite loop: when we've scrolled past one set, reset seamlessly
      const singleSetWidth = getSingleSetWidth()
      if (singleSetWidth > 0 && scrollContainer.scrollLeft >= singleSetWidth) {
        scrollContainer.scrollLeft = scrollContainer.scrollLeft - singleSetWidth
      }

      autoScrollRef.current = requestAnimationFrame(autoScroll)
    }

    autoScrollRef.current = requestAnimationFrame(autoScroll)

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current)
      }
    }
  }, [isPaused, isDragging, getSingleSetWidth])

  // Pause auto-scroll on user interaction
  const pauseAutoScroll = useCallback(() => {
    setIsPaused(true)
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
    }
    // Resume after 2 seconds of inactivity
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 2000)
  }, [])

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    pauseAutoScroll()
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // Smooth drag multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    pauseAutoScroll()
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    pauseAutoScroll()
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    pauseAutoScroll()
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    pauseAutoScroll()
  }

  // Handle wheel scroll (mouse wheel)
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!scrollRef.current) return
      pauseAutoScroll()
      scrollRef.current.scrollLeft += e.deltaY
    },
    [pauseAutoScroll]
  )

  // Handle native scroll events
  const handleScroll = useCallback(() => {
    pauseAutoScroll()
  }, [pauseAutoScroll])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current)
      }
    }
  }, [])

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-muted/30">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Scrollable Partners Carousel */}
        <div
          ref={scrollRef}
          className={cn(
            "flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide",
            "cursor-grab active:cursor-grabbing",
            isPaused ? "" : "scroll-smooth"
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          onScroll={handleScroll}
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 group"
              style={{
                animation: index < partners.length ? `fadeInUp 0.6s ease-out ${index * 0.1}s forwards` : undefined,
              }}
            >
              <div className="relative w-40 sm:w-48 lg:w-56 h-24 sm:h-28 lg:h-32 rounded-xl bg-card/80 backdrop-blur-sm border border-border/40 shadow-sm hover:shadow-md hover:border-border/60 transition-all duration-300 p-4 sm:p-5 lg:p-6 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={generatePartnerLogoAltText(partner.name)}
                  width={200}
                  height={120}
                  className="w-full h-full object-contain filter grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
