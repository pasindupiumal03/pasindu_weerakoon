"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaExternalLinkAlt } from "react-icons/fa"
import { useTheme } from "@/context/theme-context"

const certifications = [
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "March 2023",
    link: "#",
  },
  {
    title: "Blockchain Development",
    issuer: "Coursera",
    date: "January 2023",
    link: "#",
  },
  {
    title: "React.js Advanced Concepts",
    issuer: "freeCodeCamp",
    date: "November 2022",
    link: "#",
  },
  {
    title: "JavaScript Algorithms",
    issuer: "Udemy",
    date: "August 2022",
    link: "#",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "May 2022",
    link: "#",
  },
  {
    title: "Python Data Structures",
    issuer: "Coursera",
    date: "February 2022",
    link: "#",
  },
]

export default function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { isDark } = useTheme()

  return (
    <section id="certifications" className={`py-20 transition-colors duration-300 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
          className="text-3xl font-bold mb-16 text-center"
        >
          <span className="text-blue-500">Certifications</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-xl transition-colors hover:border-blue-500/50 ${
                isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-md"
              }`}
            >
              <div className="flex items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                  <span className="text-blue-500 font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{cert.title}</h3>
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>{cert.issuer}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-500" : "text-gray-500"}>{cert.date}</span>
                <a
                  href={cert.link}
                  className="text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  View Certificate <FaExternalLinkAlt size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
