"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [visible, setVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Dot follows instantly
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 })
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 })

  // Ring lags behind for the trailing feel
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    const HOVER_SELECTORS = "a, button, [role='button'], input, textarea, select, label, [data-slot='button']"

    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)

      const target = e.target as Element
      setHovering(!!target.closest(HOVER_SELECTORS))
    }

    function onLeave() { setVisible(false) }
    function onDown()  { setClicking(true) }
    function onUp()    { setClicking(false) }

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("mouseup", onUp)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseup", onUp)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Hide the native cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-foreground/40 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width:  hovering ? 44 : clicking ? 20 : 32,
          height: hovering ? 44 : clicking ? 20 : 32,
          backgroundColor: hovering ? "hsl(var(--accent) / 0.15)" : "transparent",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-foreground mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width:  clicking ? 6 : 6,
          height: clicking ? 6 : 6,
          scale:  clicking ? 0.5 : hovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
