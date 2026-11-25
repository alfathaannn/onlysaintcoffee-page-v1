"use client";

import React, { useMemo, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";

const MANIFESTO_TEXT =
  "We treat every extraction like sacred architecture. Single-origin lots roasted in deep obsidian silence, cooled over hand-cut crystal ice, and poured for those who refuse ordinary mornings.";

const ACCENT_WORDS = new Set([
  "sacred",
  "architecture.",
  "obsidian",
  "crystal",
  "ordinary",
]);

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  isAccent: boolean;
}

function RevealChar({ char, progress, range, isAccent }: CharProps) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const color = useTransform(
    progress,
    range,
    isAccent ? ["#5b4a33", "#e8be82"] : ["#4b4236", "#f5efe6"]
  );

  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {char}
    </motion.span>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.78", "end 0.58"],
  });

  // Precompute global character indices grouped by words so lines never break mid-word
  const { wordGroups, totalChars } = useMemo(() => {
    const words = MANIFESTO_TEXT.split(" ");
    let runningIndex = 0;
    const groups = words.map((word) => {
      const chars = word.split("").map((ch) => {
        const idx = runningIndex;
        runningIndex += 1;
        return { ch, idx };
      });
      // Account for space cadence
      runningIndex += 1;
      return {
        word,
        isAccent: ACCENT_WORDS.has(word.toLowerCase()),
        chars,
      };
    });
    return { wordGroups: groups, totalChars: runningIndex };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#040300] px-6 py-28 md:px-12 md:py-40 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* Top Metadata Row */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-[#f5efe6]/10 pb-6">
          <div className="flex items-center gap-3">
          </div>
          <span className="text-xs uppercase tracking-[0.24em] text-[#9b8f7e]">
            Scroll-Scrubbed Manifesto
          </span>
        </div>

        {/* Character-by-character Scroll Scrub Text Reveal */}
        <h2 className="text-3xl font-light leading-[1.22] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.65rem]">
          {wordGroups.map((group, wordIdx) => (
            <span
              key={`${group.word}-${wordIdx}`}
              className="mr-[0.28em] inline-block whitespace-nowrap"
            >
              {group.chars.map(({ ch, idx }) => {
                const start = idx / totalChars;
                const end = Math.min(1, start + 1 / Math.max(12, totalChars * 0.25));
                return (
                  <RevealChar
                    key={idx}
                    char={ch}
                    progress={scrollYProgress}
                    range={[start, end]}
                    isAccent={group.isAccent}
                  />
                );
              })}
            </span>
          ))}
        </h2>

        {/* Supporting Editorial Columns */}
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[#f5efe6]/10 pt-10 md:grid-cols-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#d49b54]">
              Origin Altitude
            </p>
            <p className="mt-2 text-lg font-light text-[#f5efe6]">
              1,950m — 2,200m ASL
            </p>
            <p className="mt-1 text-sm font-light text-[#9b8f7e]">
              Sidama, Ethiopia &amp; Huila, Colombia micro-estates.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#d49b54]">
              Roast Signature
            </p>
            <p className="mt-2 text-lg font-light text-[#f5efe6]">
              Obsidian Omni-Curve
            </p>
            <p className="mt-1 text-sm font-light text-[#9b8f7e]">
              Slow Maillard development for syrupy caramel density.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#d49b54]">
              Water Chemistry
            </p>
            <p className="mt-2 text-lg font-light text-[#f5efe6]">
              78 ppm Mineral Balance
            </p>
            <p className="mt-1 text-sm font-light text-[#9b8f7e]">
              Remineralized glacial water calibrated for clean sweetness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
