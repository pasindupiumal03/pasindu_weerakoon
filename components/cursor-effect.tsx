"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"

// Throttle function for better performance
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  return (...args: any[]) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const { isDark } = useTheme()
  const requestRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Throttled mouse move handler for better performance
  const throttledMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }, 8), // 8ms throttle (roughly 120fps)
    []
  )

  useEffect(() => {
    setIsVisible(true)
    window.addEventListener("mousemove", throttledMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [throttledMouseMove])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.1,
      },
    },
    text: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.2,
      backgroundColor: isDark ? "rgba(0, 71, 171, 0.4)" : "rgba(59, 130, 246, 0.4)",
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.15,
      },
    },
  }

  useEffect(() => {
    const mouseEnter = () => setCursorVariant("text")
    const mouseLeave = () => setCursorVariant("default")

    // Use event delegation for better performance
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('h1, h2, h3, a, button, [role="button"]')) {
        mouseEnter()
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('h1, h2, h3, a, button, [role="button"]')) {
        mouseLeave()
      }
    }

    document.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.addEventListener("mouseout", handleMouseOut, { passive: true })

    return () => {
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-blue-500 rounded-full pointer-events-none z-50 opacity-80"
        variants={variants}
        animate={cursorVariant}
        style={{
          willChange: 'transform',
        }}
      />
      <div
        className="cursor-dot-outline fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 border opacity-60"
        style={{
          left: `${mousePosition.x - 16}px`,
          top: `${mousePosition.y - 16}px`,
          borderColor: isDark ? "#0047ab" : "#3b82f6",
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
    </>
  )
}
