"use client"

import { useEffect } from "react"

export default function ScrollOptimizer() {
  useEffect(() => {
    // Optimize scroll performance
    let ticking = false

    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          ticking = false
        })
        ticking = true
      }
    }

    // Passive event listeners for better performance
    window.addEventListener('scroll', optimizeScroll, { passive: true })
    window.addEventListener('wheel', optimizeScroll, { passive: true })
    window.addEventListener('touchstart', optimizeScroll, { passive: true })
    window.addEventListener('touchmove', optimizeScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', optimizeScroll)
      window.removeEventListener('wheel', optimizeScroll)
      window.removeEventListener('touchstart', optimizeScroll)
      window.removeEventListener('touchmove', optimizeScroll)
    }
  }, [])

  return null
}