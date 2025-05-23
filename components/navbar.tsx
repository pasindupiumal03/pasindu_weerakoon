"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useTheme } from "@/context/theme-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { isDark } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Determine active section based on scroll position
      const sections = ["home", "about", "skills", "education", "certifications", "projects", "contact"]
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const menuItems = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT ME", href: "#about" },
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
    { name: "CONTACT", href: "#contact" },
  ]

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const linkVariants = {
    closed: { opacity: 0, y: 50 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          scrolled || isOpen
            ? isDark
              ? "bg-black/90 backdrop-blur-md shadow-lg shadow-blue-900/10"
              : "bg-white/90 backdrop-blur-md shadow-lg shadow-gray-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-blue-500">Pasindu</span>
            <span className={isDark ? "text-white" : "text-gray-900"}>.</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-2 py-1 transition-colors ${
                  activeSection === item.href.substring(1).toLowerCase()
                    ? "text-blue-500"
                    : isDark
                      ? "text-gray-300 hover:text-blue-500"
                      : "text-gray-700 hover:text-blue-500"
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1).toLowerCase() && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex items-center md:hidden">
            <div className="mr-4">
              <ThemeToggle />
            </div>
            <button
              className="w-10 h-10 flex flex-col justify-center items-center z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ease-out ${
                  isDark ? "bg-white" : "bg-gray-900"
                } ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"}`}
              ></span>
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ease-out ${
                  isDark ? "bg-white" : "bg-gray-900"
                } ${isOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ease-out ${
                  isDark ? "bg-white" : "bg-gray-900"
                } ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"}`}
              ></span>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden ${
              isDark ? "bg-black/95" : "bg-white/95"
            }`}
          >
            <div className="flex flex-col items-center space-y-8">
              {menuItems.map((item, i) => (
                <motion.div key={item.name} custom={i} variants={linkVariants}>
                  <Link
                    href={item.href}
                    className={`text-2xl font-medium transition-colors ${
                      activeSection === item.href.substring(1).toLowerCase()
                        ? "text-blue-500"
                        : isDark
                          ? "text-white hover:text-blue-500"
                          : "text-gray-900 hover:text-blue-500"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
