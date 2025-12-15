"use client";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EntranceScreenProps {
  onEnter: () => void;
}

export function EntranceScreen({ onEnter }: EntranceScreenProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-lg">
      <div className="text-center space-y-8 px-6">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-serif text-primary animate-fade-in">
            For Someone Special
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-delay">
            A message from the heart
          </p>
        </div>

        <Button
          onClick={onEnter}
          size="lg"
          className="cursor-pointer group relative overflow-hidden px-8 py-6 text-lg font-medium animate-fade-in-delay-2"
        >
          <Volume2 className="mr-2 h-5 w-5" />
          Enter
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/50 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
        </Button>
      </div>
    </div>
  );
}
