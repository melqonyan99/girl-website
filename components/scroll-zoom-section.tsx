"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function ScrollZoomSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current) return

      const section = sectionRef.current
      const content = contentRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight))

      // Start from small scale and zoom to full size
      const scale = 0.3 + scrollProgress * 0.7
      const opacity = scrollProgress

      content.style.transform = `scale(${scale})`
      content.style.opacity = `${opacity}`
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={sectionRef} className="relative h-[150vh] flex items-center justify-center">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div
          ref={contentRef}
          className="relative w-full h-full transition-transform duration-100 ease-out"
          style={{ transformOrigin: "center center" }}
        >
          <Image src="/1.webp" alt="Her beauty" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-3xl">
              <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 text-balance">Every Moment With You</h2>
              <p className="text-xl md:text-2xl text-white/90 text-pretty">In my thoughts, always</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
