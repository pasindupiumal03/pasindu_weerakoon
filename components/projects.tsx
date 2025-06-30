"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import { useTheme } from "@/context/theme-context"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB. Features include user authentication, product catalog, cart functionality, and payment integration.",
    image: "/placeholder.jpg",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    github: "#",
    live: "#",
  },
  {
    title: "PolybiuOS",
    description:
      "POLYBIUOS is an advanced AI-powered code generation and analysis platform designed to enhance developer productivity through intelligent automation and powerful tools. It offers a sleek, terminal-inspired interface with a cyberpunk aesthetic.",
    image: "/polybiuos.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "OpenAI API"],
    github: "https://github.com/pasindupiumal03/eigencode",
    live: "https://polybiuos.io/",
  },
  {
    title: "Fraktom",
    description:
      "A modern, educational trading simulation platform inspired by pump.fun. Fraktom lets users practice trading without risking real money, climb leaderboards, and learn trading concepts interactively.",
    image: "/fraktom.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    github: "https://github.com/pasindupiumal03/fraktom",
    live: "https://www.fraktom.com/",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern portfolio website with interactive animations and responsive design, showcasing projects and skills.",
    image: "/placeholder.jpg",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "Three.js"],
    github: "https://github.com/pasindupiumal03/pasindu_weerakoon",
    live: "#",
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { isDark } = useTheme()

  return (
    <section
      id="projects"
      className={`relative py-20 transition-colors duration-300 ${isDark ? "bg-black" : "bg-white"}`}
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
          className="text-3xl font-bold mb-16 text-center"
        >
          My <span className="text-blue-500">Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`rounded-xl overflow-hidden border transition-all group hover:border-blue-500/30 ${
                isDark ? "bg-gray-900/80 backdrop-blur-sm border-gray-800" : "bg-white border-gray-200 shadow-md"
              }`}
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.jpg"}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>{project.title}</h3>
                <p className={isDark ? "text-gray-400 mb-4" : "text-gray-600 mb-4"}>{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 transition-colors ${
                      isDark ? "text-gray-400 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"
                    }`}
                  >
                    <FaGithub size={18} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 transition-colors ${
                      isDark ? "text-gray-400 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"
                    }`}
                  >
                    <FaExternalLinkAlt size={16} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
