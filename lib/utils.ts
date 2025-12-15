import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Howl } from "howler";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const audioPlayer = (
  source: string | string[],
  onEndCallback?: () => void,
  additionalFormats?: string | string[] | undefined
) => {
  const sources = Array.isArray(source) ? [...source] : [source];
  const formats = Array.isArray(additionalFormats)
    ? [...additionalFormats]
    : additionalFormats
    ? [additionalFormats]
    : [];

  const sound = new Howl({
    src: sources,
    format: ["wav", "mp3", ...formats],
    autoplay: false,
    loop: false,
    mute: false,
    onend: () => {
      if (onEndCallback) {
        setTimeout(() => {
          onEndCallback();
        }, 1500);
      }
    },
  });

  return {
    play: () => {
      if (sound.state() === "loaded") {
        sound.play();
      }
    },
    stop: () => {
      sound.stop();
    },
    toggleMute: (state: boolean) => {
      sound.mute(!state);
    },
    setVolume: (level: number) => {
      sound.volume(Math.min(Math.max(level, 0), 1));
    },
    setGain: (level: number) => {
      sound.rate(level);
    },
  };
};
