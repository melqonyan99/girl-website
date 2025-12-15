"use client"

import { useEffect, useRef, useState } from "react"

export function MosaicGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const scrollStart = rect.top - windowHeight * 1.8
      const scrollEnd = rect.top - windowHeight * 0.2
      const scrollRange = scrollEnd - scrollStart
      const progress = Math.max(0, Math.min(1, -scrollStart / scrollRange))

      setScrollProgress(progress)
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const images = [
    {
      url: "/14.webp",
      rotation: -6,
      size: "small",
    },
    {
      url: "/6.jpg",
      rotation: 8,
      size: "medium",
    },
    {
      url: "/9.jpg",
      rotation: -4,
      size: "medium",
    },
    {
      url: "/13.jpg",
      rotation: 9,
      size: "small",
    },
    {
      url: "/5.jpg",
      rotation: 10,
      size: "large",
    },
    {
      url: "/15.webp",
      rotation: -8,
      size: "small",
    },
    {
      url: "/7.jpg",
      rotation: 5,
      size: "medium",
    },
  ]

  const getImageStyle = (index: number) => {
    const delay = index * 0.05
    const imageProgress = Math.max(0, Math.min(1, (scrollProgress - delay) * 1.5))
    const scale = 0.3 + imageProgress * 0.7
    const opacity = imageProgress

    return {
      transform: `scale(${scale})`,
      opacity: opacity,
      willChange: "transform, opacity",
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-b from-background to-secondary/10 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2
          className="text-5xl md:text-6xl font-serif font-bold text-center text-foreground mb-16 text-balance"
          style={{
            transform: `scale(${scrollProgress})`,
            opacity: scrollProgress,
            willChange: "transform, opacity",
          }}
        >
          Moments of <span className="text-primary">Beauty</span>
        </h2>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className={`
                ${image.size === "large" ? "col-span-2 row-span-2" : ""}
                ${image.size === "medium" ? "col-span-1 row-span-1" : ""}
                ${image.size === "small" ? "col-span-1 row-span-1" : ""}
                transition-all duration-500 hover:scale-105 hover:z-10
              `}
              style={getImageStyle(index)}
            >
              <div
                className="w-full h-full min-h-[250px] rounded-2xl shadow-xl"
                style={{
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: `rotate(${image.rotation}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
