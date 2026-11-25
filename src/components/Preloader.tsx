"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BrandMark } from "./BrandMark";
import { useLenisScroll } from "./LenisProvider";

interface PreloaderProps {
  progress: number;
  isReady: boolean;
}

const LOADING_PHRASES = [
  "Tempering Single-Origin Beans",
  "Chilling Glacial Extraction",
  "Calibrating Velvet Crema",
  "Awakening the Pour",
];

export function Preloader({ progress, isReady }: PreloaderProps) {
  const { stopScroll, startScroll } = useLenisScroll();

  useEffect(() => {
    if (!isReady) {
      stopScroll();
      document.body.style.overflow = "hidden";
    } else {
      startScroll();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isReady, stopScroll, startScroll]);

  const clamped = Math.min(100, Math.max(0, Math.round(progress)));
  const phraseIndex = Math.min(
    LOADING_PHRASES.length - 1,
    Math.floor((clamped / 100) * LOADING_PHRASES.length)
  );

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="onlysaint-preloader"
          initial={{ y: "0%" }}
          exit={{
            y: "-100%",
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#040300] px-6 py-8 md:px-12 md:py-10"
        >
          {/* Ambient radial warmth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,155,84,0.12),transparent_60%)]"
          />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-[#9b8f7e]">
            <span>ONLYSAINT COFFEE</span>
            <span>EST. 2026 — ROASTERY &amp; LAB</span>
          </div>

          {/* Center Emblem + Percentage */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.75, 1, 0.75],
              }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 text-[#d49b54]"
            >
              <BrandMark className="h-14 w-14 md:h-16 md:w-16" />
            </motion.div>

            <div className="overflow-hidden">
              <motion.p
                key={phraseIndex}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mb-4 text-xs font-normal uppercase tracking-[0.3em] text-[#9b8f7e]"
              >
                {LOADING_PHRASES[phraseIndex]}
              </motion.p>
            </div>

            <div className="flex items-baseline gap-1 font-light tabular-nums tracking-tight text-[#f5efe6]">
              <span className="text-6xl md:text-8xl">
                {String(clamped).padStart(3, "0")}
              </span>
              <span className="text-xl text-[#d49b54] md:text-2xl">%</span>
            </div>
          </div>

          {/* Bottom Hairline Progress */}
          <div className="relative z-10 mx-auto w-full max-w-xl">
            <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#9b8f7e]">
              <span>Preloading 190-Frame Sequence</span>
              <span>{clamped === 100 ? "Ready" : "Buffering"}</span>
            </div>
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#f5efe6]/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8c5320] via-[#d49b54] to-[#f0c98d]"
                initial={{ width: "0%" }}
                animate={{ width: `${clamped}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
