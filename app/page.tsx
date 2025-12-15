import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { MosaicGallery } from "@/components/mosaic-gallery"
import { QuotesSection } from "@/components/quotes-section"
import { ClosingSection } from "@/components/closing-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <MosaicGallery />
      <QuotesSection />
      <ClosingSection />
    </main>
  )
}
