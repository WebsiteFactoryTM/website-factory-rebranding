"use client"

import { useEffect, useRef, useState } from "react"

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  /**
   * Dacă este true, conținutul este vizibil inițial pentru SEO (progressive enhancement)
   * Animațiile se aplică doar după ce JavaScript-ul se încarcă
   * @default true
   */
  seoFriendly?: boolean
}

export function useScrollReveal<T extends HTMLElement>(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true, seoFriendly = true } = options
  const ref = useRef<T>(null)
  // Pentru SEO: conținutul este vizibil inițial (opacity-100 în HTML)
  // După mount, aplicăm logica de animație
  const [isVisible, setIsVisible] = useState(seoFriendly)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // Marchează că JavaScript-ul s-a încărcat
    
    const element = ref.current
    if (!element) return

    // Verificăm dacă elementul este deja în viewport la mount
    // Dacă da, rămâne vizibil (pentru conținutul de sus)
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight * 1.2 && rect.bottom > -100
      if (isInViewport && seoFriendly) {
        // Elementul este deja vizibil, rămâne vizibil
        setIsVisible(true)
        return true
      }
      return false
    }

    // Dacă elementul este deja vizibil, nu mai aplicăm animații
    if (checkInitialVisibility() && triggerOnce) {
      return // Nu mai observăm dacă este deja vizibil
    }

    // Pentru elementele care nu sunt în viewport, aplicăm logica de scroll reveal
    if (seoFriendly && !checkInitialVisibility()) {
      // Resetăm vizibilitatea pentru a permite animația de reveal
      setIsVisible(false)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce, seoFriendly])

  return { ref: ref as any, isVisible, mounted }
}
