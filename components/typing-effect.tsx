"use client"

import { useState, useEffect, useRef } from "react"

interface TypingEffectProps {
  staticText?: string
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenPhrases?: number
  className?: string
  staticClassName?: string
  typingClassName?: string
}

export default function TypingEffect({
  staticText = "I'm a",
  phrases = ["Web Developer", "Blockchain Developer", "Smart Contract Engineer", "UI/UX Designer"],
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 2000,
  className = "text-2xl md:text-3xl font-medium mb-6",
  staticClassName = "text-white",
  typingClassName = "text-blue-500",
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const currentPhraseRef = useRef(phrases[0])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const typeText = () => {
      const currentPhrase = phrases[phraseIndex]
      currentPhraseRef.current = currentPhrase

      if (isPaused) {
        timeout = setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(true)
        }, delayBetweenPhrases)
        return
      }

      if (isDeleting) {
        // Deleting text
        if (displayText.length === 0) {
          setIsDeleting(false)
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
        } else {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1))
        }
        timeout = setTimeout(typeText, deletingSpeed)
      } else {
        // Typing text
        if (displayText === currentPhrase) {
          setIsPaused(true)
        } else {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1))
        }
        timeout = setTimeout(typeText, typingSpeed)
      }
    }

    timeout = setTimeout(typeText, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex, isPaused, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases])

  return (
    <h3 className={className}>
      <span className={staticClassName}>{staticText} </span>
      <span className={typingClassName}>{displayText}</span>
      <span className="text-blue-500 animate-pulse">|</span>
    </h3>
  )
}
