"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function QuotesSection() {
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

  const quotes = [
    {
      text: "Your beauty takes my breath away",
      accent:
        "Every time I see you, I'm reminded of how lucky the world is to have you",
    },
    {
      text: "I love how you light up any room",
      accent:
        "Your presence makes everything better, and I wish I could tell you that every day",
    },
    {
      text: "I want to know everything about you",
      accent:
        "Your thoughts, your dreams, what makes you happy—I want to understand your heart",
    },
  ];

  const getCardStyle = (index: number) => {
    const delay = index * 0.1; // Reduced delay
    const cardProgress = Math.max(
      0,
      Math.min(1, (scrollProgress - delay) * 1.5)
    );
    const scale = 0.3 + cardProgress * 0.7; // Start smaller
    const translateY = (1 - cardProgress) * 50; // Reduced travel distance
    const opacity = cardProgress;
    const rotation = index % 2 === 0 ? -2 : 2;

    return {
      transform: `rotate(${rotation}deg) scale(${scale}) translateY(${translateY}px)`,
      opacity: opacity,
      willChange: "transform, opacity",
    };
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-primary/5 min-h-screen flex items-center"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div
          className="text-center mb-16 transition-all duration-500"
          style={{
            transform: `scale(${scrollProgress})`,
            opacity: scrollProgress,
            willChange: "transform, opacity",
          }}
        >
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground text-balance">
            How I Feel <span className="text-primary">About You</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-border"
              style={getCardStyle(index)}
            >
              <div className="space-y-4">
                <p className="text-2xl font-serif font-semibold text-foreground text-balance">
                  "{quote.text}"
                </p>
                <p className="text-muted-foreground italic text-pretty">
                  {quote.accent}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
