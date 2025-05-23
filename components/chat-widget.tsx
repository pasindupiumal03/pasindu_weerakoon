"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/context/theme-context"
import Image from "next/image"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm Pasindu's virtual assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { isDark } = useTheme()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch response")
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`absolute bottom-20 right-0 w-80 sm:w-96 rounded-lg shadow-xl overflow-hidden ${
              isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border-2 border-white">
                  <Image
                    src="/asistent.jpg"
                    alt="Assistant"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium">Chat with Pasindu's Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-blue-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-500 text-white self-end rounded-br-none"
                      : isDark
                        ? "bg-gray-800 text-white self-start rounded-bl-none"
                        : "bg-gray-100 text-gray-800 self-start rounded-bl-none"
                  }`}
                >
                  {message.role === "assistant" && index === 0 && (
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                        <Image
                          src="/asistent.jpg"
                          alt="Assistant"
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium">Pasindu's Assistant</span>
                    </div>
                  )}
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div
                  className={`max-w-[80%] p-3 rounded-lg self-start rounded-bl-none flex items-center gap-2 ${
                    isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                    <Image
                      src="/asistent.jpg"
                      alt="Assistant"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 p-2 rounded-md ${
                  isDark
                    ? "bg-gray-800 text-white border border-gray-700 focus:border-blue-500"
                    : "bg-gray-100 text-gray-800 border border-gray-200 focus:border-blue-500"
                } outline-none transition-colors`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`p-2 rounded-md bg-blue-500 text-white ${
                  isLoading || !input.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                } transition-colors`}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center ${
          isDark ? "bg-blue-500" : "bg-blue-500"
        }`}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image src="/asistent.jpg" alt="Assistant" fill className="object-cover" />
        </div>
      </button>
    </div>
  )
}
