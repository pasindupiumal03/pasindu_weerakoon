"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiMongodb,
  SiSolidity,
  SiExpress,
  SiNextdotjs,
  SiGit,
  SiEthereum,
  SiWeb3Dotjs,
  SiTypescript,
} from "react-icons/si"
import { useTheme } from "@/context/theme-context"
import ScrollAnimation from "./scroll-animation"

const skills = [
  { name: "React", icon: SiReact, color: "text-cyan-400", percentage: 85 },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-500", percentage: 75 },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400", percentage: 90 },
  { name: "HTML5", icon: SiHtml5, color: "text-orange-500", percentage: 95 },
  { name: "CSS3", icon: SiCss3, color: "text-blue-400", percentage: 90 },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400", percentage: 80 },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500", percentage: 70 },
  { name: "Solidity", icon: SiSolidity, color: "text-gray-400", percentage: 60 },
  { name: "Express", icon: SiExpress, color: "text-gray-300", percentage: 75 },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white", percentage: 80 },
  { name: "Git", icon: SiGit, color: "text-orange-500", percentage: 85 },
  { name: "Ethereum", icon: SiEthereum, color: "text-purple-400", percentage: 65 },
  { name: "Web3.js", icon: SiWeb3Dotjs, color: "text-purple-500", percentage: 70 },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-500", percentage: 75 },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { isDark } = useTheme()

  return (
    <section
      id="skills"
      className={`relative py-20 transition-colors duration-300 ${isDark ? "bg-black" : "bg-white"}`}
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
          className={`text-3xl font-bold mb-16 text-center ${isDark ? "text-white" : "text-gray-900"}`}
        >
          My <span className="text-blue-500">Skills</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <ScrollAnimation key={skill.name} delay={index * 0.1}>
              <div
                className={`rounded-lg p-6 shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 ${
                  isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 flex items-center justify-center mr-4 group">
                    <skill.icon
                      className={`w-8 h-8 ${skill.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>{skill.name}</h3>
                  <span className="ml-auto text-blue-500 font-medium">{skill.percentage}%</span>
                </div>
                <div className={`w-full ${isDark ? "bg-gray-800" : "bg-gray-200"} rounded-full h-2.5`}>
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${skill.percentage}%` }}></div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
