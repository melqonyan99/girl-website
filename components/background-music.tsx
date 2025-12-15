"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EntranceScreen } from "./entrance-screen";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showEntrance, setShowEntrance] = useState(true);

  const handleEnter = () => {
    setShowEntrance(false);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((error) => {
        console.log("[v0] Music playback error:", error);
      });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {showEntrance && <EntranceScreen onEnter={handleEnter} />}

      <audio ref={audioRef} loop preload="auto">
        <source src="/background-music.mp3" type="audio/mpeg" />
      </audio>

      {!showEntrance && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button className="cursor-pointer" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX /> : <Volume2 />}
          </Button>
        </div>
      )}
    </>
  );
}
