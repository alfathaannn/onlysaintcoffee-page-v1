"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  city: string;
  tasting: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "01",
    quote:
      "Onlysaint bends the rules of iced espresso. It opens like dark valrhona ganache and finishes with a crystalline jasmine lift I usually only find in grand cru teas.",
    author: "Kenji Takahashi",
    role: "Head Sommelier, Restaurant Kōan",
    city: "Tokyo",
    tasting: "Halo Reserve — Cold Steep",
  },
  {
    id: "02",
    quote:
      "Most dark roasts hide behind smoke. Onlysaint keeps the roast deep and brooding while preserving every electric citrus note inside the cup.",
    author: "Elena Vance",
    role: "Q-Grader & Sensory Director",
    city: "Melbourne",
    tasting: "Obsidian 01 — Naked Pull",
  },
  {
    id: "03",
    quote:
      "From the weight of the frosted vessel to the silence of the Aoyama bar, drinking Onlysaint feels less like a caffeine stop and more like an architectural pause.",
    author: "Sora Lindqvist",
    role: "Principal Architect, Studio Kanso",
    city: "Copenhagen",
    tasting: "Amber 02 — Tonic Ritual",
  },
  {
    id: "04",
    quote:
      "The 18-hour glacial drip holds a syrupy mouthfeel without a single drop of dairy. It completely rewired our studio’s morning ritual.",
    author: "Marcus Chen",
    role: "Creative Director, Monolith Type",
    city: "Seoul",
    tasting: "Weekly Collector Box",
  },
];

const AUTOPLAY_MS = 6000;

export function TestimonialSection() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [isPaused, active]);

  const goPrev = () => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goNext = () => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[active];

  return (
    <section
      id="voices"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative flex min-h-[88vh] flex-col justify-between overflow-hidden bg-[#040300] px-6 py-24 md:min-h-screen md:px-12 md:py-28 lg:px-20"
    >
      {/* Ambient Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d49b54]/8 blur-[150px]"
      />

      {/* Top Header */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-[#f5efe6]/10 pb-6">
        <div className="flex items-center gap-3">

        </div>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#9b8f7e]">
          <span>{isPaused ? "Paused" : "Autoplay"}</span>
          <span className="tabular-nums text-[#f5efe6]">
            {current.id} / 0{TESTIMONIALS.length}
          </span>
        </div>
      </div>

      {/* Center Fullscreen Quote Stage */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-5xl flex-col justify-center py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -22, filter: "blur(6px)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-6 text-xs uppercase tracking-[0.28em] text-[#d49b54]">
              {current.tasting}
            </p>
            <blockquote className="text-2xl font-light leading-[1.28] tracking-tight text-[#f5efe6] sm:text-4xl md:text-5xl">
              “{current.quote}”
            </blockquote>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-lg font-medium text-[#f5efe6]">
                  {current.author}
                </p>
                <p className="text-sm font-light text-[#9b8f7e]">
                  {current.role} · {current.city}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls + Autoplay Progress Indicators */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between gap-6 border-t border-[#f5efe6]/10 pt-8 sm:flex-row sm:items-center">
        {/* Progress Bars */}
        <div className="grid flex-1 grid-cols-4 gap-3 sm:max-w-md">
          {TESTIMONIALS.map((item, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`View testimonial ${item.id}`}
                className="group flex flex-col gap-2 text-left"
              >
                <span
                  className={`text-[10px] uppercase tracking-[0.22em] transition-colors ${
                    isActive
                      ? "text-[#e8be82]"
                      : "text-[#9b8f7e]/60 group-hover:text-[#f5efe6]"
                  }`}
                >
                  {item.id}
                </span>
                <span className="relative block h-[2px] w-full overflow-hidden bg-[#f5efe6]/12">
                  {isActive && (
                    <motion.span
                      key={`${item.id}-${isPaused ? "p" : "run"}`}
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? "45%" : "100%" }}
                      transition={{
                        duration: isPaused ? 0.3 : AUTOPLAY_MS / 1000,
                        ease: "linear",
                      }}
                      className="absolute inset-y-0 left-0 bg-[#d49b54]"
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f5efe6]/15 bg-[#0b0804] text-[#f5efe6] transition-all duration-300 hover:border-[#d49b54] hover:bg-[#d49b54] hover:text-[#040300]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f5efe6]/15 bg-[#0b0804] text-[#f5efe6] transition-all duration-300 hover:border-[#d49b54] hover:bg-[#d49b54] hover:text-[#040300]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
