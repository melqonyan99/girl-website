"use client";

import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollStart = rect.top - windowHeight * 1.8; // Start animation earlier - when section is 80% below viewport
      const scrollEnd = rect.top - windowHeight * 0.2;
      const scrollRange = scrollEnd - scrollStart;
      const progress = Math.max(0, Math.min(1, -scrollStart / scrollRange));

      setScrollProgress(progress);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scale = 0.3 + scrollProgress * 0.7; // Start smaller
  const opacity = scrollProgress;

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background images */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url(/placeholder.svg?height=1080&width=1920&query=dreamy+clouds+sky+sunset)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Floating images */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-12 left-12 w-40 h-40 rounded-xl opacity-40 shadow-xl"
          style={{
            backgroundImage:
              "url(/11.jpg?height=300&width=300&query=heart+love+romantic)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `rotate(-15deg) scale(${scale})`,
            opacity: opacity * 0.4,
            willChange: "transform, opacity",
          }}
        />
        <div
          className="absolute bottom-20 right-16 w-56 h-56 rounded-xl opacity-40 shadow-xl"
          style={{
            backgroundImage:
              "url(/12.jpg?height=400&width=400&query=beautiful+memories+moments)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `rotate(12deg) scale(${scale})`,
            opacity: opacity * 0.4,
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* Content with zoom effect */}
      <div
        className="relative z-10 max-w-4xl mx-auto text-center space-y-8 transition-all duration-500"
        style={{
          transform: `scale(${scale})`,
          opacity: opacity,
          willChange: "transform, opacity",
        }}
      >
        <Heart className="w-20 h-20 text-primary fill-primary mx-auto animate-pulse" />

        <h2 className="text-5xl md:text-7xl font-serif font-bold text-foreground text-balance">
          You Are <span className="text-primary">Everything</span>
        </h2>

        <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
          I made this for you because you deserve to know how beautiful you are.
          Even if you don't love me back, I hope this brings a smile to your
          face. You're amazing, and I'm grateful just to know you.
        </p>

        <div className="pt-8">
          <p className="text-xl text-primary font-medium">
            With all my heart, thank you for being you
          </p>
        </div>
      </div>
    </section>
  );
}
