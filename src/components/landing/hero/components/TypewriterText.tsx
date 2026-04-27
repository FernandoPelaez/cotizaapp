"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { typewriterWords } from "../data/heroTemplates.data"

type TypewriterTextProps = {
  canStart: boolean
}

export default function TypewriterText({ canStart }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("")

  const wordIndexRef = useRef(0)
  const isDeletingRef = useRef(false)
  const charIndexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!canStart || startedRef.current) return

    startedRef.current = true

    const tick = () => {
      const currentWord = typewriterWords[wordIndexRef.current]

      if (!isDeletingRef.current) {
        charIndexRef.current += 1
        setDisplayed(currentWord.slice(0, charIndexRef.current))

        if (charIndexRef.current === currentWord.length) {
          timerRef.current = setTimeout(() => {
            isDeletingRef.current = true
            tick()
          }, 2500)

          return
        }

        timerRef.current = setTimeout(tick, 80)
        return
      }

      charIndexRef.current -= 1
      setDisplayed(currentWord.slice(0, charIndexRef.current))

      if (charIndexRef.current === 0) {
        isDeletingRef.current = false
        wordIndexRef.current = (wordIndexRef.current + 1) % typewriterWords.length
        timerRef.current = setTimeout(tick, 400)

        return
      }

      timerRef.current = setTimeout(tick, 45)
    }

    timerRef.current = setTimeout(tick, 80)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [canStart])

  return (
            <span
        style={{
            color: "#93c5fd",
            display: "inline-block",
            minWidth: 2,
        }}
        >
      {displayed}

      <motion.span
        aria-hidden="true"
        animate={canStart ? { opacity: [1, 0, 1] } : { opacity: 0 }}
        transition={{
          duration: 0.75,
          repeat: canStart ? Infinity : 0,
          ease: "linear",
        }}
        style={{
          display: "inline-block",
          width: 2,
          height: "0.85em",
          background: "#93c5fd",
          marginLeft: 2,
          verticalAlign: "middle",
          borderRadius: 1,
        }}
      />
    </span>
  )
}
