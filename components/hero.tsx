"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa"
import ParticlesBackground from "./particles-background"
import TypingEffect from "./typing-effect"
import { useTheme } from "@/context/theme-context"

export default function Hero() {
  const { isDark } = useTheme()
  const imageRef = useRef<HTMLDivElement>(null)

  return (
    <section id="home" className="relative h-screen flex items-center transition-colors duration-300">
      <ParticlesBackground
        id="particles-home"
        color={isDark ? "#0047ab" : "#3b82f6"}
        lineColor={isDark ? "#0047ab" : "#3b82f6"}
        particleOpacity={0.7}
        lineOpacity={0.6}
      />

      <div className="container mx-auto px-6 z-10 pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-3/5 text-center md:text-left" // Increased from 1/2 to 3/5
          >
            <h2 className="text-blue-500 text-xl mb-2">HELLO!</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className={isDark ? "text-white" : "text-gray-900"}>I am </span>
              <span className="text-blue-500">Pasindu</span>
            </h1>

            <TypingEffect
              staticText="I'm a"
              phrases={[
                "Full Stack Developer",
                "Web Developer",
                "Blockchain Developer",
                "Smart Contract Engineer",
                "UI/UX Designer",
              ]}
              staticClassName={isDark ? "text-white" : "text-gray-900"}
              typingClassName="text-blue-500"
            />

            <p className={`mb-8 max-w-lg mx-auto md:mx-0 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              BSc (Hons) software engineering undergraduate passionate about fullstack web development and blockchain
              technology.
            </p>

            <div className="flex justify-center md:justify-start space-x-4 mb-8">
              <a
                href="https://www.linkedin.com/in/pasindu-piumalxyz/"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-blue-500"
                    : "bg-gray-200 text-gray-600 hover:text-white hover:bg-blue-500"
                }`}
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://github.com/pasindupiumal03"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-blue-500"
                    : "bg-gray-200 text-gray-600 hover:text-white hover:bg-blue-500"
                }`}
              >
                <FaGithub size={20} />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-blue-500"
                    : "bg-gray-200 text-gray-600 hover:text-white hover:bg-blue-500"
                }`}
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-blue-500"
                    : "bg-gray-200 text-gray-600 hover:text-white hover:bg-blue-500"
                }`}
              >
                <FaInstagram size={20} />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <a
                href="/resume.pdf"
                className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors uppercase"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-blue-500 text-blue-500 rounded-full font-medium hover:bg-blue-500/10 transition-colors uppercase"
              >
                Hire Me
              </a>
            </div>
          </motion.div>

          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 md:mt-0 md:w-2/5 flex justify-center md:justify-center" // Changed from 1/2 to 2/5 and justify-end to justify-center
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {" "}
              {/* Reduced size slightly */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500/30">
                <Image
                  src="/pasindu.png"
                  alt="Profile"
                  width={400}
                  height={400}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
