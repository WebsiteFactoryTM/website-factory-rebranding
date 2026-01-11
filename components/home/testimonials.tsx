"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FloatingElement } from "@/components/ui/floating-element"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { generateTestimonialLogoAltText } from "@/lib/image-alt-text"
import { testimonials } from "@/lib/testimonials-data"

export function Testimonials() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Calculate items per view based on screen size
  const getItemsPerView = useCallback(() => {
    if (typeof window === "undefined") return 3
    return window.innerWidth >= 768 ? 3 : 1
  }, [])

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView)

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [getItemsPerView])

  const maxIndex = Math.max(0, testimonials.length - itemsPerView)

  // Scroll to specific index
  const scrollToIndex = useCallback(
    (index: number) => {
      if (!scrollRef.current) return
      const newIndex = Math.max(0, Math.min(index, maxIndex))
      setCurrentIndex(newIndex)

      const cardWidth = scrollRef.current.scrollWidth / testimonials.length
      const gap = 24 // gap-6 = 1.5rem = 24px
      const scrollPosition = newIndex * (cardWidth + gap)

      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    },
    [maxIndex],
  )

  // Handle scroll event to update current index
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || isDragging) return

      const scrollLeft = scrollRef.current.scrollLeft
      const cardWidth = scrollRef.current.scrollWidth / testimonials.length
      const gap = 24
      const newIndex = Math.round(scrollLeft / (cardWidth + gap))

      if (newIndex !== currentIndex && newIndex >= 0 && newIndex <= maxIndex) {
        setCurrentIndex(newIndex)
      }
    }

    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [currentIndex, maxIndex, isDragging])

  // Navigation handlers
  const handlePrev = () => {
    scrollToIndex(currentIndex - 1)
  }

  const handleNext = () => {
    scrollToIndex(currentIndex + 1)
  }

  // Touch/Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    // Snap to nearest card
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft
      const cardWidth = scrollRef.current.scrollWidth / testimonials.length
      const gap = 24
      const newIndex = Math.round(scrollLeft / (cardWidth + gap))
      scrollToIndex(newIndex)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
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
    // Snap to nearest card
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft
      const cardWidth = scrollRef.current.scrollWidth / testimonials.length
      const gap = 24
      const newIndex = Math.round(scrollLeft / (cardWidth + gap))
      scrollToIndex(newIndex)
    }
  }

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-secondary/20">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-brand/8 blur-[100px]"
          delay={0}
          duration={11}
        >
          <div />
        </FloatingElement>
        <FloatingElement
          className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-glow-violet/10 blur-[80px]"
          delay={2}
          duration={9}
        >
          <div />
        </FloatingElement>
        <FloatingElement
          className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-glow-cyan/8 blur-[60px]"
          delay={1}
          duration={13}
        >
          <div />
        </FloatingElement>
      </div>

      <div
        className="absolute top-20 right-10 lg:right-20 w-24 h-24 lg:w-36 lg:h-36 metallic-surface rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-15"
        style={{ animation: "morph 15s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-20 left-10 lg:left-20 w-20 h-20 lg:w-28 lg:h-28 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-sm opacity-20"
        style={{
          background: "linear-gradient(135deg, var(--glow-cyan), var(--brand))",
          animation: "morph 12s ease-in-out infinite reverse",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "max-w-3xl mx-auto text-center mb-16 lg:mb-20 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
            Testimoniale
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Ce spun <span className="gradient-text">clienții noștri</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Feedback real de la companii care au ales să lucreze cu noi.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={cn(
                "rounded-full w-12 h-12 border-border/50 hover:border-brand/50 hover:bg-brand/5",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-all duration-300",
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    currentIndex === index
                      ? "bg-brand w-8"
                      : "bg-border/50 hover:bg-border/70",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={cn(
                "rounded-full w-12 h-12 border-border/50 hover:border-brand/50 hover:bg-brand/5",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-all duration-300",
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Testimonials Carousel */}
          <div
            ref={scrollRef}
            className={cn(
              "flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory",
              "cursor-grab active:cursor-grabbing",
              "scroll-smooth",
            )}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={cn(
                  "group relative p-8 rounded-3xl shrink-0 snap-start",
                  "bg-card/80 backdrop-blur-sm border border-border/50",
                  "transition-all duration-500",
                  "hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/5",
                  "card-lift card-metallic",
                  // Mobile: full width minus padding, Desktop: 3 cards per view
                  "w-[calc(100%-3rem)] md:w-[calc((100%-3rem)/3)]",
                )}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/5 via-transparent to-glow-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quote icon with gradient background */}
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-brand to-brand-light flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-brand/30 transition-all duration-500">
                  <Quote className="w-5 h-5 text-white" />
                </div>

                {/* Rating stars */}
                <div className="relative flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand text-brand" />
                  ))}
                </div>

                {/* Content */}
                <p className="relative text-foreground leading-relaxed mb-8 text-balance">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Partner Logo */}
                <div className="relative mb-4 flex justify-start">
                  <div
                    className={cn(
                      "relative w-28 h-16 rounded-lg p-2 flex items-center justify-center",
                      "bg-white dark:bg-gray-800",
                      "border border-border/30 dark:border-gray-700",
                      "shadow-sm group-hover:shadow-md",
                      "transition-all duration-300",
                    )}
                  >
                    <Image
                      src={testimonial.logo || "/placeholder.svg"}
                      alt={generateTestimonialLogoAltText(
                        testimonial.name,
                        testimonial.role,
                        testimonial.role.match(/(?:,|–|-)\s*(.+)/)?.[1]?.trim(),
                      )}
                      width={100}
                      height={56}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Author */}
                <div className="relative text-left">
                  <div className="font-semibold text-foreground group-hover:text-brand transition-colors mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>

                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-brand to-brand-light blur-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
