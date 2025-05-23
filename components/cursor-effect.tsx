"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/context/theme-context"

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const { isDark } = useTheme()

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", mouseMove)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    text: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      backgroundColor: isDark ? "rgba(0, 71, 171, 0.3)" : "rgba(59, 130, 246, 0.3)",
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
  }

  useEffect(() => {
    const textElements = document.querySelectorAll("h1, h2, h3, a, button")

    const mouseEnter = () => setCursorVariant("text")
    const mouseLeave = () => setCursorVariant("default")

    textElements.forEach((element) => {
      element.addEventListener("mouseenter", mouseEnter)
      element.addEventListener("mouseleave", mouseLeave)
    })

    return () => {
      textElements.forEach((element) => {
        element.removeEventListener("mouseenter", mouseEnter)
        element.removeEventListener("mouseleave", mouseLeave)
      })
    }
  }, [])

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
      />
      <div
        className="cursor-dot-outline fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 translate-x-[-50%] translate-y-[-50%]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          borderColor: isDark ? "#0047ab" : "#3b82f6",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      />
    </>
  )
}
