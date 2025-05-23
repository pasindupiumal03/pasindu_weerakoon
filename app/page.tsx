import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Education from "@/components/education"
import Certifications from "@/components/certifications"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import CursorEffect from "@/components/cursor-effect"
import Navbar from "@/components/navbar"
import ChatWidget from "@/components/chat-widget"
import ScrollToTop from "@/components/scroll-to-top"
import LoadingScreen from "@/components/loading-screen"

export default function Home() {
  return (
    <main className="text-foreground min-h-screen transition-colors duration-300">
      <LoadingScreen />
      <CursorEffect />
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
    </main>
  )
}
