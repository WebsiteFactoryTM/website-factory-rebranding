"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ShoppingCart, CreditCard, Package, Star, Heart, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

interface EcommerceBlobProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function EcommerceBlob({ className, size = "lg" }: EcommerceBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [cartItems, setCartItems] = useState(3)
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

  // Animate cart items
  useEffect(() => {
    const interval = setInterval(() => {
      setCartItems((prev) => (prev >= 5 ? 1 : prev + 1))
    }, 2000)
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
      store: "w-48 sm:w-56",
      payment: "w-24 sm:w-28",
      product: "w-20 sm:w-24",
      analytics: "hidden",
      discount: "hidden",
      loyalty: "hidden",
      glow: "w-[250px] h-[250px]",
      ring1: "w-[220px] h-[220px]",
      ring2: "w-[180px] h-[180px]",
    },
    md: {
      store: "w-56 sm:w-64 md:w-72",
      payment: "w-28 sm:w-32 md:w-36",
      product: "w-24 sm:w-28",
      analytics: "hidden md:block",
      discount: "hidden",
      loyalty: "hidden",
      glow: "w-[350px] h-[350px]",
      ring1: "w-[320px] h-[320px]",
      ring2: "w-[260px] h-[260px]",
    },
    lg: {
      store: "w-64 sm:w-72 md:w-80 lg:w-96",
      payment: "w-32 sm:w-36 md:w-40",
      product: "w-24 sm:w-28 md:w-32",
      analytics: "hidden md:block",
      discount: "hidden lg:block",
      loyalty: "hidden lg:block",
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
          <filter id="gooEcommerce">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
          <linearGradient id="cartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
          filter: "url(#gooEcommerce)",
        }}
      >
        {/* Central Shopping Cart - main element */}
        <div
          className="relative cart-float will-change-transform"
          style={{
            transform: `translate(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px) rotateX(${mousePos.y * 0.08}deg) rotateY(${-mousePos.x * 0.08}deg) scale(${isHovering ? 1.03 : 1})`,
            transformStyle: "preserve-3d",
            transition: "transform 0.1s linear",
          }}
        >
          {/* Main Store Card */}
          <div className={cn("rounded-2xl overflow-hidden shadow-2xl cart-morph", sizes.store)}>
            {/* Store Header */}
            <div className="bg-gradient-to-r from-brand via-brand-light to-glow-violet p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Package className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-white font-semibold text-xs sm:text-sm">Your Store</span>
              </div>
              <div className="relative">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <span className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-glow-cyan text-[8px] sm:text-[10px] font-bold rounded-full flex items-center justify-center text-brand-dark animate-bounce">
                  {cartItems}
                </span>
              </div>
            </div>

            {/* Store Content */}
            <div className="bg-gradient-to-br from-background via-card to-muted p-3 sm:p-4 relative overflow-hidden">
              {/* Product Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {/* Product Card 1 */}
                <div
                  className="bg-card rounded-lg sm:rounded-xl p-2 sm:p-3 border border-border/50 group"
                  style={{ animation: "pulse 3s ease-in-out infinite" }}
                >
                  <div className="aspect-square rounded-md sm:rounded-lg bg-gradient-to-br from-glow-cyan/20 to-glow-violet/20 mb-1 sm:mb-2 relative overflow-hidden">
                    <div className="absolute top-1 right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/80 flex items-center justify-center">
                      <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-500" />
                    </div>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-foreground/20 rounded w-3/4 mb-1" />
                  <div className="h-1.5 sm:h-2 bg-brand/40 rounded w-1/2" />
                </div>

                {/* Product Card 2 */}
                <div
                  className="bg-card rounded-lg sm:rounded-xl p-2 sm:p-3 border border-border/50"
                  style={{ animation: "pulse 3s ease-in-out 0.5s infinite" }}
                >
                  <div className="aspect-square rounded-md sm:rounded-lg bg-gradient-to-br from-brand/20 to-glow-cyan/20 mb-1 sm:mb-2 relative">
                    <div className="absolute top-1 left-1 px-1 py-0.5 bg-red-500 rounded text-[6px] sm:text-[8px] text-white font-bold">
                      -30%
                    </div>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-foreground/20 rounded w-full mb-1" />
                  <div className="h-1.5 sm:h-2 bg-brand/40 rounded w-2/3" />
                </div>

                {/* Product Card 3 */}
                <div
                  className="bg-card rounded-lg sm:rounded-xl p-2 sm:p-3 border border-border/50"
                  style={{ animation: "pulse 3s ease-in-out 1s infinite" }}
                >
                  <div className="aspect-square rounded-md sm:rounded-lg bg-gradient-to-br from-glow-violet/20 to-brand/20 mb-1 sm:mb-2 relative">
                    <div className="absolute bottom-1 left-1 right-1 flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-foreground/20 rounded w-2/3 mb-1" />
                  <div className="h-1.5 sm:h-2 bg-brand/40 rounded w-1/2" />
                </div>

                {/* Product Card 4 */}
                <div
                  className="bg-card rounded-lg sm:rounded-xl p-2 sm:p-3 border border-border/50"
                  style={{ animation: "pulse 3s ease-in-out 1.5s infinite" }}
                >
                  <div className="aspect-square rounded-md sm:rounded-lg bg-gradient-to-br from-glow-cyan/30 to-brand/20 mb-1 sm:mb-2 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-brand/40" />
                    </div>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-foreground/20 rounded w-full mb-1" />
                  <div className="h-1.5 sm:h-2 bg-green-500/40 rounded w-3/4" />
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-3 sm:mt-4 h-8 sm:h-10 rounded-full bg-gradient-to-r from-brand to-brand-light flex items-center justify-center gap-2">
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                <span className="text-white text-xs sm:text-sm font-semibold">Adaugă în coș</span>
              </div>

              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_4s_infinite]" />
            </div>
          </div>
        </div>

        {/* Floating Payment Card - responsive positioning */}
        <div
          className="absolute payment-orbit will-change-transform"
          style={{
            transform: `translate(${-100 + mousePos.x * 0.4}px, ${60 + mousePos.y * 0.4}px) rotateZ(${-12 + mousePos.x * 0.1}deg) scale(${isHovering ? 1.08 : 1})`,
            transition: "transform 0.1s linear",
          }}
        >
          <div
            className={cn(
              "rounded-xl overflow-hidden shadow-xl border-2 border-brand/30 bg-gradient-to-br from-brand to-brand-dark p-2 sm:p-3",
              sizes.payment,
            )}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="w-6 h-4 sm:w-8 sm:h-6 rounded bg-yellow-400/80" />
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
            </div>
            <div className="space-y-1">
              <div className="flex gap-1 sm:gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-0.5">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/40" />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-1 sm:mt-2">
                <div className="h-1.5 sm:h-2 bg-white/30 rounded w-12 sm:w-16" />
                <div className="h-1.5 sm:h-2 bg-white/30 rounded w-6 sm:w-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Product Box - hidden on small screens */}
        <div
          className={cn("absolute product-orbit will-change-transform", size === "sm" ? "hidden" : "hidden sm:block")}
          style={{
            transform: `translate(${100 + mousePos.x * 0.5}px, ${-50 + mousePos.y * 0.5}px) rotateZ(${8 - mousePos.x * 0.08}deg) scale(${isHovering ? 1.06 : 1})`,
            transition: "transform 0.1s linear",
          }}
        >
          <div
            className={cn("rounded-xl overflow-hidden shadow-xl border-2 border-glow-cyan/30 bg-card", sizes.product)}
          >
            <div className="aspect-square bg-gradient-to-br from-glow-cyan/20 to-glow-violet/20 flex items-center justify-center">
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-brand/40" />
            </div>
            <div className="p-1.5 sm:p-2 space-y-1">
              <div className="h-1 sm:h-1.5 bg-foreground/20 rounded w-full" />
              <div className="flex justify-between items-center">
                <div className="h-1.5 sm:h-2 bg-brand/50 rounded w-1/3 font-bold" />
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-1 h-1 sm:w-1.5 sm:h-1.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Analytics Card - hidden on small/medium screens */}
        <div
          className={cn("absolute analytics-orbit will-change-transform", sizes.analytics)}
          style={{
            transform: `translate(${-140 + mousePos.x * 0.6}px, ${-70 + mousePos.y * 0.6}px) scale(${isHovering ? 1.1 : 1})`,
            transition: "transform 0.1s linear",
          }}
        >
          <div className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-card border border-brand/20 shadow-lg">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] sm:text-[10px] text-muted-foreground">Live Sales</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-foreground">€12,847</div>
            <div className="flex items-center gap-1 text-[8px] sm:text-[10px] text-green-500">
              <span>↑ 24%</span>
              <span className="text-muted-foreground">vs ieri</span>
            </div>
          </div>
        </div>

        {/* Floating Discount Badge - only on large */}
        <div
          className={cn("absolute discount-orbit will-change-transform", sizes.discount)}
          style={{
            transform: `translate(${150 + mousePos.x * 0.45}px, ${70 + mousePos.y * 0.45}px) scale(${isHovering ? 1.08 : 1})`,
            transition: "transform 0.1s linear",
          }}
        >
          <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg">
            <span className="text-white font-bold text-xs sm:text-sm">-50% OFF</span>
          </div>
        </div>

        {/* Floating Loyalty Stars - only on large */}
        <div
          className={cn("absolute loyalty-orbit will-change-transform", sizes.loyalty)}
          style={{
            transform: `translate(${-80 + mousePos.x * 0.35}px, ${100 + mousePos.y * 0.35}px) scale(${isHovering ? 1.1 : 1})`,
            transition: "transform 0.1s linear",
          }}
        >
          <div className="flex gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full glass-premium shadow-lg">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300",
                  i <= 4 ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground",
                )}
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
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

      {/* Orbiting rings - responsive */}
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
            isHovering ? "border-glow-violet/25" : "border-glow-violet/10",
          )}
        />
      </div>

      <style jsx>{`
        .cart-float {
          animation: cartFloat 8s ease-in-out infinite;
        }
        .cart-morph {
          animation: cartMorph 12s ease-in-out infinite;
        }
        .payment-orbit {
          animation: paymentOrbit 10s ease-in-out infinite;
        }
        .product-orbit {
          animation: productOrbit 12s ease-in-out infinite;
        }
        .analytics-orbit {
          animation: analyticsOrbit 9s ease-in-out infinite;
        }
        .discount-orbit {
          animation: discountOrbit 11s ease-in-out infinite;
        }
        .loyalty-orbit {
          animation: loyaltyOrbit 13s ease-in-out infinite;
        }
        
        @keyframes cartFloat {
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
        
        @keyframes cartMorph {
          0%, 100% {
            border-radius: 16px;
          }
          50% {
            border-radius: 20px 16px 18px 14px;
          }
        }
        
        @keyframes paymentOrbit {
          0%, 100% {
            transform: translate(-100px, 60px) rotateZ(-12deg);
          }
          50% {
            transform: translate(-110px, 50px) rotateZ(-16deg);
          }
        }
        
        @keyframes productOrbit {
          0%, 100% {
            transform: translate(100px, -50px) rotateZ(8deg);
          }
          50% {
            transform: translate(110px, -60px) rotateZ(4deg);
          }
        }
        
        @keyframes analyticsOrbit {
          0%, 100% {
            transform: translate(-140px, -70px);
          }
          50% {
            transform: translate(-130px, -80px);
          }
        }
        
        @keyframes discountOrbit {
          0%, 100% {
            transform: translate(150px, 70px) rotate(0deg);
          }
          50% {
            transform: translate(140px, 80px) rotate(5deg);
          }
        }
        
        @keyframes loyaltyOrbit {
          0%, 100% {
            transform: translate(-80px, 100px);
          }
          50% {
            transform: translate(-90px, 110px);
          }
        }
        
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  )
}
