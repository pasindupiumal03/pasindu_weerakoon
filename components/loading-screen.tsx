"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reduced loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black dark:bg-black"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-8"
          >
            <span className="text-white">Welcome to </span>
            <span className="text-blue-500">Pasindu</span>
            <span className="text-white">.</span>
          </motion.div>
          <div className="flex space-x-3">
            <motion.div
              animate={{
                y: [0, -15, 0],
                backgroundColor: ["#0047ab", "#3b82f6", "#0047ab"],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                times: [0, 0.5, 1],
                delay: 0,
              }}
              className="w-4 h-4 rounded-full bg-blue-500"
            />
            <motion.div
              animate={{
                y: [0, -15, 0],
                backgroundColor: ["#0047ab", "#3b82f6", "#0047ab"],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                times: [0, 0.5, 1],
                delay: 0.2,
              }}
              className="w-4 h-4 rounded-full bg-blue-500"
            />
            <motion.div
              animate={{
                y: [0, -15, 0],
                backgroundColor: ["#0047ab", "#3b82f6", "#0047ab"],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                times: [0, 0.5, 1],
                delay: 0.4,
              }}
              className="w-4 h-4 rounded-full bg-blue-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
