"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { useTheme } from "@/context/theme-context"
import ScrollAnimation from "./scroll-animation"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { isDark } = useTheme()

  return (
    <section id="about" className={`py-20 transition-colors duration-300 ${isDark ? "bg-gray-950" : "bg-white"}`}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
          className="text-3xl font-bold mb-16 text-center"
        >
          About <span className="text-blue-500">Me</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <ScrollAnimation delay={0.2} className="md:w-2/5">
            <div className="relative max-w-sm mx-auto">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-xl blur-xl"></div>
              <div className="relative overflow-hidden rounded-xl border-4 border-blue-500/30 shadow-lg shadow-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent"></div>
                <Image
                  src="/pasindu.png"
                  alt="About"
                  width={500}
                  height={600}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.4} className="md:w-3/5">
            <h3 className="text-2xl font-bold mb-4 text-blue-500">I'm Pasindu Weerakoon</h3>
            <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              I'm an undergraduate software engineering student with a passion for creating innovative web solutions. My
              journey in tech began with a curiosity about how websites work, which led me to explore various
              programming languages and frameworks.
            </p>
            <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Currently, I'm focused on becoming a fullstack web developer and blockchain developer. I enjoy building
              responsive web applications with modern technologies like React, Next.js, and Node.js. I'm also exploring
              blockchain development with Solidity and Web3.js.
            </p>
            <p className={`mb-8 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              When I'm not coding, I enjoy learning about new technologies, contributing to open-source projects, and
              participating in hackathons to challenge myself and grow my skills.
            </p>

            <div className="flex space-x-4 mb-8">
              <a
                href="https://github.com/pasindupiumal03"
                className={`${isDark ? "text-gray-400" : "text-gray-500"} hover:text-blue-500 transition-colors`}
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/pasindu-piumalxyz/"
                className={`${isDark ? "text-gray-400" : "text-gray-500"} hover:text-blue-500 transition-colors`}
              >
                <FaLinkedin size={24} />
              </a>
              
            </div>

            <a
              href="/resume.pdf"
              className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors inline-block"
            >
              Download Resume
            </a>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
