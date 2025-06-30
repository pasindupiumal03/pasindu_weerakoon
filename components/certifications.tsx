"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaExternalLinkAlt } from "react-icons/fa"
import { useTheme } from "@/context/theme-context"

const certifications = [
  {
    title: "React Essential Training",
    issuer: "Linkedin Learning",
    date: "June 2025",
    link: "https://www.linkedin.com/learning/certificates/18ecefba2180e13b31ed7dd8b287468f1844ffa6c26d14a0e36e3fe3e664c723?u=42314660"
  },
  {
    title: "React Native Essential Training",
    issuer: "Linkedin Learning",
    date: "June 2025",
    link: "https://www.linkedin.com/learning/certificates/3c342e442a5bfc305555a160b98a3f85e67c6ede746cb2523803d433a535c674?u=42314660"
  },
  {
    title: "TypeScript Essential Training",
    issuer: "Linkedin Learning",
    date: "June 2025",
    link: "https://www.linkedin.com/learning/certificates/d112267781453a77f074e8fd04cec6140db760f7df438e397e4a937720146bd4?u=42314660"
  },
  {
    title: "Programming Concepts for Python",
    issuer: "Linkedin Learning",
    date: "February 2025",
    link: "https://www.linkedin.com/learning/certificates/ffc2150bb3019081b4e7b1f86020e11e8fd47f8fe4281c32d297e510d76f9397?u=42314660"
  },
  {
    title: "Learning Python",
    issuer: "Linkedin Learning",
    date: "January 2025",
    link: "https://www.linkedin.com/learning/certificates/20bbd64bdb5cc877d64f847591bedf0a452ea83ecc735bbcd0d180ddd71505bb?u=42314660"
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
                  target="_blank"
                  rel="noopener noreferrer"
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
