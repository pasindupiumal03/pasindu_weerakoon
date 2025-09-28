"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import Image from "next/image"

interface ExperienceItem {
  title: string
  organization: string
  duration: string
  description: string
  isWork: boolean
  type?: string
  tags?: string[]
  logo: string
}

const workExperienceData: ExperienceItem[] = [
  {
    title: "Intern - Software Engineer",
    organization: "ByteSquadLabs",
    type: "Full-time",
    duration: "Sep 2025 - Present",
    description: "I'm creating fullstack websites and developing chrome extensions. Working with modern web technologies to build scalable applications and browser extensions that enhance user productivity and experience.",
    tags: ["Full-Stack Development", "Next.js", "Node.js", "MongoDB", "Express.js"],
    isWork: true,
    logo: "/bytesquad-logo.png",
  },
]

const educationData: ExperienceItem[] = [
  {
    title: "BSc (Hons) in Software Engineering",
    organization: "University of Westminster",
    duration: "2024 - Present",
    description: "Specializing in Software Engineering with focus on web development and blockchain technology.",
    isWork: false,
    logo: "/university_of_westminster_logo.jpg",
  },
  {
    title: "Foundation Programme",
    organization: "Informatics Institute of Technology",
    duration: "2023 - 2024",
    description: "Completed comprehensive courses on HTML, CSS, JavaScript, and responsive design.",
    isWork: false,
    logo: "/IIT-LOGO.jpg",
  },
  {
    title: "High School Diploma",
    organization: "Pinnawala Central College",
    duration: "2013 - 2022",
    description: "Studied Mathematics and Computer Science.",
    isWork: false,
    logo: "/SCHOOL-LOGO.png",
  },
]

const allExperienceData = [...workExperienceData, ...educationData]

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
          My <span className="text-blue-500">Experience & Education</span>
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {allExperienceData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pl-16 pb-12 last:pb-0"
            >
              {index !== allExperienceData.length - 1 && (
                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-blue-500"></div>
              )}
              
              {/* Logo based on organization */}
              <div className={`absolute left-0 top-0 w-14 h-14 rounded-full border-4 bg-white flex items-center justify-center overflow-hidden ${
                item.isWork 
                  ? "border-blue-500 shadow-lg shadow-blue-500/20" 
                  : "border-blue-500 shadow-lg shadow-blue-500/20"
              }`}>
                <Image
                  src={item.logo}
                  alt={`${item.organization} logo`}
                  width={32}
                  height={32}
                  className="object-contain rounded-full"
                />
              </div>

              <div
                className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                  isDark ? "bg-gray-900 border-gray-800 text-white hover:border-blue-500/30" : "bg-white border-gray-200 text-gray-800 shadow-md hover:border-blue-500/30"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-1 ${item.isWork ? "text-blue-500" : "text-blue-500"}`}>
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {item.organization}
                      </span>
                      {item.isWork && item.type && (
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                        }`}>
                          {item.type}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {item.duration}
                  </span>
                </div>
                
                <p className={`mb-4 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {item.description}
                </p>
                
                {item.isWork && item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags!.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className={`text-xs px-3 py-1 rounded-full border ${
                          isDark 
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                            : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
