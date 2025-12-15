import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BackgroundMusic } from "@/components/background-music";
import "./globals.css";
import Script from "next/script";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

// TODO poxel axjka anuny

export const metadata: Metadata = {
  title: "For Someone Special - Lilia",
  description: "A celebration of beauty and grace",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/heart-icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/heart-icon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/heart-icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/heart-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="hotjar-tracking"
          strategy="afterInteractive"
          src="https://t.contentsquare.net/uxa/3e5e092452fff.js"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <BackgroundMusic />
        <Analytics />
      </body>
    </html>
  );
}
