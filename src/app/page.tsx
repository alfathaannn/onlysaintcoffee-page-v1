"use client";

import React, { useCallback, useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { SequenceScroll } from "@/components/SequenceScroll";
import { AboutSection } from "@/components/AboutSection";
import { BentoSection } from "@/components/BentoSection";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const handleLoadProgress = useCallback((pct: number) => {
    setLoadProgress(pct);
  }, []);

  const handleReady = useCallback(() => {
    // Brief pause at 100% so the preloader numbers settle cleanly before curtain wipe
    setTimeout(() => {
      setIsReady(true);
    }, 260);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#040300] text-[#f5efe6]">
      <Preloader progress={loadProgress} isReady={isReady} />
      <Navbar />

      {/* 400vh Sticky Image Sequence Scrollytelling Hero */}
      <SequenceScroll
        onLoadProgress={handleLoadProgress}
        onReady={handleReady}
      />

      {/* Closing Curtain Wrapper (-mt-[100vh] relative z-10) */}
      <div className="-mt-[100vh] relative z-10">
        {/* Soft horizon fade keeping the 90% hero CTA unobstructed before solid obsidian sweeps up */}
        <div
          aria-hidden="true"
          className="pointer-events-none h-[42vh] w-full bg-gradient-to-b from-transparent via-[#040300]/75 to-[#040300]"
        />

        <div className="bg-[#040300]">
          <AboutSection />
          <BentoSection />
          <StatsSection />
          <TestimonialSection />
          <CtaSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}
