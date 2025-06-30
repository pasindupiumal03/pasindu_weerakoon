"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTheme } from "@/context/theme-context"

const educationData = [
  {
    degree: "BSc (Hons) in Software Engineering",
    institution: "University of Westminster",
    duration: "2024 - Present",
    description: "Specializing in Software Engineering with focus on web development and blockchain technology.",
  },
  {
    degree: "Foundation Programme",
    institution: "Informatics Institute of Technology",
    duration: "2023 - 2024",
    description: "Completed comprehensive courses on HTML, CSS, JavaScript, and responsive design.",
  },
  {
    degree: "High School Diploma",
    institution: "Pinnawala Central College",
    duration: "2013 - 2022",
    description: "Studied Mathematics and Computer Science.",
  },
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { isDark } = useTheme()

  return (
    <section id="education" className={`py-20 transition-colors duration-300 ${isDark ? "bg-gray-950" : "bg-white"}`}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
          className="text-3xl font-bold mb-16 text-center"
        >
          My <span className="text-blue-500">Education</span>
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {index !== educationData.length - 1 && (
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-blue-500"></div>
              )}
              <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-500 border-4 border-gray-950"></div>

              <div
                className={`p-6 rounded-xl border ${
                  isDark ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-800 shadow-md"
                }`}
              >
                <h3 className="text-xl font-bold text-blue-500 mb-1">{item.degree}</h3>
                <div className="flex justify-between mb-4">
                  <span className={isDark ? "text-gray-300" : "text-gray-600"}>{item.institution}</span>
                  <span className={isDark ? "text-gray-400" : "text-gray-500"}>{item.duration}</span>
                </div>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
