"use client";

import { Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10">
      {/* Background decorative images */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-2xl opacity-20 shadow-2xl"
          style={{
            backgroundImage: "url(/1.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "rotate(-8deg)",
          }}
        />
        <div
          className="absolute bottom-32 right-16 w-72 h-72 rounded-2xl opacity-20 shadow-2xl"
          style={{
            backgroundImage: "url(/2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "rotate(12deg)",
          }}
        />
      </div>

      {/* Main content - always visible */}
      <div className="relative z-10 text-center px-4">
        <div className="flex justify-center mb-6 animate-bounce-slow">
          <Heart className="w-16 h-16 text-primary fill-primary animate-pulse" />
        </div>
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-foreground mb-4 text-balance">
          A Gift <br />
          <span className="text-4xl md:text-6xl text-primary">
            For The Girl With a Dimple On Her Left Cheek
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          To show you how beautiful you are and how much you mean to me
        </p>
      </div>
    </section>
  );
}
