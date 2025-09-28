import dynamic from "next/dynamic"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import LoadingScreen from "@/components/loading-screen"
import ClientWrapper from "@/components/client-wrapper"
import ScrollOptimizer from "@/components/scroll-optimizer"

// Lazy load heavy components
const About = dynamic(() => import("@/components/about"))
const Skills = dynamic(() => import("@/components/skills"))
const Education = dynamic(() => import("@/components/education"))
const Certifications = dynamic(() => import("@/components/certifications"))
const Projects = dynamic(() => import("@/components/projects"))
const Contact = dynamic(() => import("@/components/contact"))
const CursorEffect = dynamic(() => import("@/components/cursor-effect"))
const ChatWidget = dynamic(() => import("@/components/chat-widget"))
const ScrollToTop = dynamic(() => import("@/components/scroll-to-top"))

export default function Home() {
  return (
    <main className="text-foreground min-h-screen transition-colors duration-300">
      <LoadingScreen />
      <ScrollOptimizer />
      <ClientWrapper>
        <div className="hidden md:block">
          <CursorEffect />
        </div>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Education />
        <Certifications />
        <Projects />
        <Contact />
        <ChatWidget />
        <ScrollToTop />
      </ClientWrapper>
    </main>
  )
}
