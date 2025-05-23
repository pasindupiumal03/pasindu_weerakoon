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
  const pathname = usePathname()

  useEffect(() => {
    // Load particles.js script dynamically
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
    script.async = true
    script.onload = () => {
      setLoaded(true)
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (loaded && particlesRef.current && window.particlesJS) {
      // Configure particles
      window.particlesJS(id, {
        particles: {
          number: {
            value: 140, // Increased from 120
            density: {
              enable: true,
              value_area: 800,
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
            speed: 2.5, // Adjusted speed
            direction: "none",
            random: true, // Changed to true for more natural movement
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: true, // Enabled attraction
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab", // Changed back to grab for more subtle interaction
            },
            onclick: {
              enable: true,
              mode: "push",
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
  }, [loaded, id, color, lineColor, particleOpacity, lineOpacity])

  return <div id={id} ref={particlesRef} className="absolute inset-0 -z-10" />
}

// Add TypeScript definitions for the particles.js library
declare global {
  interface Window {
    particlesJS: any
    pJSDom: any[]
  }
}
