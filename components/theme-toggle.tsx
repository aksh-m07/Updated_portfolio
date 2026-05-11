"use client"

import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50">
        <div className="h-5 w-5" />
      </div>
    )
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: resolvedTheme === "dark" ? 0 : 180,
          scale: resolvedTheme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon className="h-5 w-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: resolvedTheme === "light" ? 0 : -180,
          scale: resolvedTheme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun className="h-5 w-5" />
      </motion.div>
    </motion.button>
  )
}
