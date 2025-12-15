"use client";

import { useEffect, useRef, useState } from "react";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      const scrollStart = rect.top - windowHeight * 1.8;
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

  const scale = 0.3 + scrollProgress * 0.7;
  const imageRotation = -20 + scrollProgress * 23;
  const textOpacity = scrollProgress;

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-card min-h-screen flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div
          className="grid md:grid-cols-2 gap-12 items-center"
          style={{
            transform: `scale(${scale})`,
            opacity: scale,
            willChange: "transform, opacity",
          }}
        >
          {/* Text content */}
          <div
            className="space-y-6"
            style={{
              opacity: textOpacity,
              transform: `translateX(${-50 * (1 - scrollProgress)}px)`,
              willChange: "transform, opacity",
            }}
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground text-balance">
              Why I Admire You
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                I know we're not together, but I need you to know how incredibly
                beautiful you are to me. Every time I see you, it feels like the
                world stops for a moment.
              </p>
              <p>
                Your beauty isn't just in your appearance—though you are
                stunning—it's in everything you do. The way you smile, the way
                you talk, the way you carry yourself with such natural grace. I
                can't help but be captivated.
              </p>
              <p>
                I wish I could know you more deeply. To understand your dreams,
                your thoughts, what makes you laugh. I want to know all the
                things that make you... you.
              </p>
              <p className="text-primary font-medium text-xl">
                You deserve to know how special you are, even if you don't feel
                the same way about me.
              </p>
            </div>
          </div>

          {/* Image with rotation */}
          <div
            className="relative"
            style={{
              opacity: textOpacity,
              transform: `translateX(${50 * (1 - scrollProgress)}px)`,
              willChange: "transform, opacity",
            }}
          >
            <div
              className="w-full aspect-[3/4] rounded-3xl shadow-2xl"
              style={{
                backgroundImage: "url(/3.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `rotate(${imageRotation}deg)`,
                willChange: "transform",
              }}
            />
            <div
              className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl shadow-xl opacity-80"
              style={{
                backgroundImage: "url(/4.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `rotate(${imageRotation - 15}deg) scale(${scale})`,
                willChange: "transform",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
