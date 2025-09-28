"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

interface ParticlesBackgroundProps {
  id: string
  color?: string
  lineColor?: string
  particleOpacity?: number
  lineOpacity?: number
}

export default function ParticlesBackground({
  id,
  color = "#0047ab",
  lineColor,
  particleOpacity = 0.7,
  lineOpacity = 0.6,
}: ParticlesBackgroundProps) {
  const particlesRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const pathname = usePathname()

  // Check if screen is large enough for particles
  useEffect(() => {
    const checkScreenSize = () => {
      setShouldRender(window.innerWidth >= 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    if (!shouldRender) return

    // Load particles.js script dynamically only if needed
    const existingScript = document.querySelector('script[src*="particles.min.js"]')
    if (existingScript) {
      setLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
    script.async = true
    script.onload = () => {
      setLoaded(true)
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [shouldRender])

  useEffect(() => {
    if (loaded && shouldRender && particlesRef.current && window.particlesJS) {
      // Configure particles
      window.particlesJS(id, {
        particles: {
          number: {
            value: window.innerWidth > 1200 ? 50 : 30, // Adaptive particle count
            density: {
              enable: true,
              value_area: window.innerWidth > 1200 ? 1000 : 1500,
            },
          },
          color: {
            value: color,
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
          },
          opacity: {
            value: particleOpacity,
            random: true, // Changed to true for more natural look
            anim: {
              enable: true, // Enabled animation
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: lineColor || color,
            opacity: lineOpacity,
            width: 1.2, // Slightly reduced from 1.5
          },
          move: {
            enable: true,
            speed: 1.5, // Reduced speed for better performance
            direction: "none",
            random: false, // Disabled for better performance
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false, // Disabled for better performance
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false, // Disabled for better performance
            },
            onclick: {
              enable: false, // Disabled for better performance
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 180, // Increased from 140
              line_linked: {
                opacity: 0.8, // Reduced from 1
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      })
    }

    return () => {
      if (window.pJSDom && window.pJSDom.length > 0) {
        // Clean up particles instance when component unmounts
        window.pJSDom.forEach((dom, i) => {
          if (dom.pJS.canvas.el.id === id) {
            window.pJSDom.splice(i, 1)
          }
        })
      }
    }
  }, [loaded, shouldRender, id, color, lineColor, particleOpacity, lineOpacity])

  if (!shouldRender) {
    return null
  }

  return <div id={id} ref={particlesRef} className="absolute inset-0 -z-10" />
}

// Add TypeScript definitions for the particles.js library
declare global {
  interface Window {
    particlesJS: any
    pJSDom: any[]
  }
}
