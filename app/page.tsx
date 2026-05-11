"use client"

import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useMotionTemplate, animate } from "framer-motion"
import { useEffect } from "react"
import { Github, Linkedin, Mail, ArrowUpRight, MapPin, Palette } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

const socialLinks = [
  { name: "GitHub",   href: "https://github.com/aksh-m07",             icon: Github,   target: "_blank" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/aksh-malik/",  icon: Linkedin, target: "_blank" },
  { name: "Email",    href: "https://mail.google.com/mail/?view=cm&to=akshmalik.am@gmail.com", icon: Mail, target: "_blank" },
  { name: "Art",      href: "https://akshmalik.art/",                   icon: Palette,  target: "_blank" },
]

const experiences = [
  {
    period: "2025 — Present",
    title: "Computer Science Student",
    company: "UC San Diego",
    description: "Pursuing Bachelor's in Computer Science. Active contributor to hackathons including Reboot the Earth and Data Hacks.",
    skills: ["Python","Java","C", "TypeScript", "React", "Ai&ML"],
  },
  {
    period: "April 2026 — Present",
    title: "Design Coordinator - Board Member",
    company: "Computer Science and Engineering Society (CSES), UC San Diego",
    description: "Board-level officer contributing to org-wide strategic decisions. Spearheading the launch of a new Design subcommunity through skill workshops, community socials, and subcommittee events to build member engagement.",
    skills: [],
  },
  {
    period: "April 2026 — Present",
    title: "Vice President Internal",
    company: "Triton Engineering Student Council (TESC), UC San Diego",
    description: "Directing cross-committee operations for a 15-person council, ensuring on-schedule delivery of engineering events serving 5,300+ students. Primary liaison across 10+ member organizations, coordinating syncs between TESC leadership and student groups.",
    skills: [],
  },
  {
    period: "Nov 2025 — April 2026",
    title: "Software Engineer",
    company: "Triton Engineering Student Council (TESC), UC San Diego",
    description: "Implemented CI/CD pipelines via GitHub Actions across 4+ production repos, reducing deployment friction. Refactored portal and website architecture in a 3-person team, improving responsiveness for 5,300+ students. Built reusable API-driven React components adopted across multiple repos.",
    skills: [],
  },
]

const projects = [
  {
    title: "DisasterDocs",
    description: "A browser-based emergency guidance tool that combines AI-powered protocol generation (via Groq) with optional retrieval (via Nia) to deliver clear, step-by-step emergency instructions. ",
    skills: ["HTML", "CSS", "Groq","Nia"],
    link: "https://github.com/aksh-m07/Sdx--DisasterDocs",
    image: "/DIsasterdocs.jpg",
  },
  {
    title: "Career Site",
    description: "An AI-powered career site that parses your resume, scores and ranks open roles by match, and generates tailored resume suggestions — all with smart filtering, persistent login, and a clean job browsing experience.",
    skills: ["TypeScript", "CSS", "Javascript","Next.js"],
    link: "https://github.com/aksh-m07/career-site",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80&fit=crop",
  },
  {
    title: "Agropal",
    description: "AI-powered wildfire monitoring system that activates a multi-agent pipeline to guide farmers through crop, livestock, financial, and evacuation decisions in real time.",
    skills: ["Python", "HTML", "Groq", "CSS", "Javascript"],
    link: "https://github.com/d3pant/Reeboot_th_earth",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80&fit=crop",
  },
  {
    title: "Locked The Forever In",
    description: "A one stop personalised AI model and platform for college students to manage academics.",
    skills: ["Typescript", "Browser-Use", "CSS"],
    link: "https://github.com/aksh-m07/lockedTFin",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&fit=crop",
  },
  {
    title: "Email Scraper With Voice Assistance",
    description: "a Node.js/TypeScript app that connects to any IMAP inbox, fetches today's emails, saves senders and subjects to a CSV, and reads them aloud using your system's text-to-speech.",
    skills: ["TypeScript","IMAP" ,"Voice API"],
    link: "https://github.com/aksh-m07/Email_Scraper_Voice_Assistant",
    image: "/Email scraper.jpg",
  },
  {
    title: "Art Portfolio",
    description: "A personal art gallery showcasing creative works. My art on the net.",
    skills: ["JavaScript", "CSS", "Design"],
    link: "https://github.com/aksh-m07/art_portfolio",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80&fit=crop",
  },
]

// Apple-style sticky text zoom section
function StickyZoomText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.8, 1, 1, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [100, 0, 0, 0, -50])
  
  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Apple-style word reveal animation
function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  })
  
  const words = text.split(" ")
  
  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        )
      })}
    </div>
  )
}

function Word({ children, range, progress }: { children: string; range: [number, number]; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(progress, range, [0.2, 1])
  const y = useTransform(progress, range, [20, 0])
  
  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  )
}

// Horizontal scroll section for projects
function HorizontalScrollSection({ children }: { children: React.ReactNode }) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"])
  
  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6">
          {children}
        </motion.div>
      </div>
    </section>
  )
}

// Staggered reveal for lists
function StaggerReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Apple-style fade up section
function FadeUpSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-15%" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scale up section on scroll
function ScaleSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  
  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CountUp({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionVal = useMotionValue(0)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(motionVal, value, {
      duration: 1.8,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix
      },
    })
    return controls.stop
  }, [isInView, motionVal, value, suffix])

  return <span ref={ref} className={className}>0{suffix}</span>
}


function TiltCard({ href, children }: { href: string; children: React.ReactNode }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 400, damping: 40 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 400, damping: 40 })
  const scale = useSpring(1, { stiffness: 400, damping: 40 })

  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"])
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.13) 0%, transparent 60%)`

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onMouseEnter() { scale.set(1.02) }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
    scale.set(1)
  }

  return (
    <div style={{ perspective: "1000px" }} className="flex-shrink-0">
      <motion.a
        ref={cardRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, scale }}
        className="group relative flex h-[70vh] w-[80vw] max-w-xl flex-col justify-end overflow-hidden rounded-3xl border border-white/10 p-10 shadow-xl"
      >
        {children}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{ background: glare }}
        />
      </motion.a>
    </div>
  )
}

export default function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 0.9])
  const heroY = useTransform(heroProgress, [0, 0.5], [0, 150])
  
  const smoothOpacity = useSpring(heroOpacity, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(heroScale, { stiffness: 100, damping: 30 })
  const smoothY = useSpring(heroY, { stiffness: 100, damping: 30 })

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div className="min-h-screen bg-background">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-foreground"
        style={{ scaleX }}
      />

      {/* Glass Header */}
      <motion.header 
        className="glass fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex w-full items-center px-6 py-4">
          <Link href="/" className="text-base font-semibold tracking-tight">
            Aksh Malik
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
            {["About", "Experience", "Projects", "Contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
        <motion.div
          style={{ opacity: smoothOpacity, scale: smoothScale, y: smoothY }}
          className="relative z-10 max-w-4xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">Building solutions that scale,</span>
            <span className="block mt-2">experiences that last.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            CS Student at UC San Diego crafting pixel-perfect interfaces at the intersection of technology, art, and design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="h-4 w-4" />
            San Diego, California
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.href}
                target={social.target}
                rel="noopener noreferrer"
                className="glass-button group relative flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              >
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="glass-subtle flex h-10 w-6 items-start justify-center rounded-full p-2"
          >
            <motion.div 
              className="h-2 w-1 rounded-full bg-muted-foreground"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - Apple style big text */}
      <section id="about" className="relative px-6 py-32 md:py-48">
        <div className="mx-auto max-w-5xl">
          <StickyZoomText className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
              Passionate about<br />
              <span className="text-muted-foreground">creating impact</span>
            </h2>
          </StickyZoomText>
        </div>
      </section>

      {/* About Details with word reveal */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <WordReveal
            text="I'm a Computer Science student at UC San Diego with roots at Delhi Public School, R.K. Puram. I'm fascinated by building things that make a difference."
            className="text-2xl font-medium leading-relaxed tracking-tight md:text-3xl lg:text-4xl"
          />
          
          <FadeUpSection className="mt-16">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              From disaster relief tools to 3D renderers, I love exploring the full spectrum of what code can create. Currently diving deep into responsible AI and accessible CS education.
            </p>
          </FadeUpSection>
          
          <FadeUpSection className="mt-8">
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Outside of coding, I love to draw, do photography, play cricket, and hang out with friends.
            </p>
          </FadeUpSection>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-3 gap-8">
            {[
              { value: 13 , suffix: "+", label: "Projects" },
              { value: 4,  suffix: "+", label: "Years Coding" },
              { value: 7,  suffix: "+", label: "Hackathons" },
            ].map((stat) => (
              <ScaleSection key={stat.label}>
                <div className="text-center">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl"
                  />
                  <div className="mt-3 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </ScaleSection>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative bg-card px-6 py-32 md:py-48">
        <div className="mx-auto max-w-5xl">
          <StickyZoomText className="text-center mb-24">
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              Experience
            </h2>
          </StickyZoomText>
          
          <div className="space-y-20">
            {experiences.map((exp, i) => (
              <FadeUpSection key={i}>
                <div className="group relative grid gap-8 md:grid-cols-[200px_1fr]">
                  <div className="text-sm text-muted-foreground md:text-base">{exp.period}</div>
                  <div>
                    <h3 className="text-2xl font-medium md:text-3xl">
                      {exp.title}
                    </h3>
                    <p className="mt-1 text-lg text-muted-foreground">{exp.company}</p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </FadeUpSection>
            ))}
          </div>

        </div>
      </section>

      {/* Projects Section - Horizontal Scroll */}
      <section id="projects" className="relative">
        <div className="px-6 py-32 md:py-48">
          <div className="mx-auto max-w-5xl">
            <StickyZoomText className="text-center">
              <h2 className="text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
                Projects
              </h2>
            </StickyZoomText>
          </div>
        </div>

        <HorizontalScrollSection>
          <div className="pl-[10vw]" />
          {projects.map((project) => (
            <TiltCard key={project.title} href={project.link}>
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <h3 className="text-3xl font-semibold md:text-4xl">{project.title}</h3>
                  <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
                <p className="mt-4 text-lg text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-blue-200/60 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-600 backdrop-blur-sm dark:border-blue-700/40 dark:bg-blue-950/40 dark:text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
          <div className="pr-[10vw]" />
        </HorizontalScrollSection>

        <FadeUpSection className="px-6 py-16 text-center">
          <a
            href="https://github.com/aksh-m07"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button group inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg font-medium"
          >
            View All on GitHub
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </FadeUpSection>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative bg-card px-6 py-32 md:py-48">
        <div className="mx-auto max-w-4xl text-center">
          <StickyZoomText>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
              {"Let's"} build<br />
              <span className="text-muted-foreground">something great</span>
            </h2>
          </StickyZoomText>
          
          <FadeUpSection className="mt-16">
            <p className="mx-auto max-w-xl text-lg text-muted-foreground md:text-xl">
              I&apos;m always interested in new projects and collaborations. Feel free to reach out.
            </p>
          </FadeUpSection>
          
          <FadeUpSection className="mt-12">
            <a
              href="https://mail.google.com/mail/?view=cm&to=akshmalik.am@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button group inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-medium"
            >
              Get in Touch
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </FadeUpSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-subtle px-6 py-12">
        <div className="flex w-full items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Aksh Malik
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.target}
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
