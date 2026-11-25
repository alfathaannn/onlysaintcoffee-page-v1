"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { useLenisScroll } from "./LenisProvider";

const NAV_ITEMS = [
  {
    index: "01",
    label: "The Pour",
    subtitle: "Interactive 400vh Canvas Story",
    href: "#hero",
  },
  {
    index: "02",
    label: "Philosophy",
    subtitle: "Character-Scrubbed Manifesto",
    href: "#about",
  },
  {
    index: "03",
    label: "The Craft",
    subtitle: "Origins, Steep & Extraction Bento",
    href: "#craft",
  },
  {
    index: "04",
    label: "Precision",
    subtitle: "Roastery Telemetry & Metrics",
    href: "#stats",
  },
  {
    index: "05",
    label: "Voices",
    subtitle: "Curated Palates & Reviews",
    href: "#voices",
  },
  {
    index: "06",
    label: "Reserve",
    subtitle: "Small-Batch Tasting Allocation",
    href: "#reserve",
  },
];

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "X / Twitter", href: "https://x.com" },
  { name: "Spotify Rituals", href: "https://open.spotify.com" },
  { name: "Behance Archive", href: "https://behance.net" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { scrollTo, stopScroll, startScroll } = useLenisScroll();

  useEffect(() => {
    if (isOpen) {
      stopScroll();
    } else {
      startScroll();
    }
  }, [isOpen, stopScroll, startScroll]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      scrollTo(href, 0);
    }, 320);
  };

  return (
    <>
      {/* Persistent Awwwards Top Bar */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-12 md:py-7">
        <button
          type="button"
          onClick={() => handleNavigate("#hero")}
          className="pointer-events-auto group flex items-center gap-3 rounded-full border border-[#f5efe6]/10 bg-[#040300]/55 px-4 py-2 backdrop-blur-md transition-colors duration-300 hover:border-[#d49b54]/50"
          aria-label="Onlysaint Coffee Home"
        >
          <BrandMark className="h-6 w-6 text-[#d49b54] transition-transform duration-500 group-hover:rotate-12" />
          <span className="text-xs font-medium uppercase tracking-[0.26em] text-[#f5efe6]">
            Onlysaint
          </span>
        </button>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          onMouseEnter={() => setMenuHovered(true)}
          onMouseLeave={() => setMenuHovered(false)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="pointer-events-auto group flex items-center gap-2.5 rounded-full border border-[#f5efe6]/12 bg-[#040300]/65 px-4 py-2.5 backdrop-blur-md transition-colors duration-300 hover:border-[#d49b54]/60 hover:bg-[#110b05]/90"
        >
          <span className="inline-flex w-[44px] items-center justify-center text-[11px] font-medium uppercase leading-none tracking-[0.2em] text-[#f5efe6] transition-colors group-hover:text-[#e8be82]">
            {isOpen ? "Close" : "Menu"}
          </span>
          <span className="relative flex h-4 w-[18px] shrink-0 items-center justify-center">
            <motion.span
              initial={false}
              animate={{
                y: isOpen ? 0 : -3,
                rotate: isOpen ? 45 : 0,
              }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute block h-[1.5px] w-[18px] rounded-full bg-[#f5efe6] transition-colors duration-200 group-hover:bg-[#d49b54]"
            />
            <motion.span
              initial={false}
              animate={{
                y: isOpen ? 0 : 3,
                rotate: isOpen ? -45 : 0,
                scaleX: isOpen ? 1 : menuHovered ? 1 : 0.72,
              }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute block h-[1.5px] w-[18px] rounded-full bg-[#d49b54]"
            />
          </span>
        </button>
      </header>

      {/* Fullscreen Awwwards Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            aria-label="Primary Fullscreen Navigation"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
              transition: { duration: 0.78, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{
              clipPath: "inset(0% 0% 100% 0%)",
              transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-[#040300] px-6 pb-10 pt-28 md:px-12 md:pb-12 md:pt-32"
          >
            {/* Ambient radial glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-1/4 h-[520px] w-[520px] rounded-full bg-[#d49b54]/10 blur-[140px]"
            />

            <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
              {/* Big Navigation Links */}
              <div className="lg:col-span-8">
                <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-[#9b8f7e]">
                  Index — Navigate the Ritual
                </p>
                <ul className="divide-y divide-[#f5efe6]/8 border-y border-[#f5efe6]/8">
                  {NAV_ITEMS.map((item, idx) => {
                    const dimmed = hoveredIdx !== null && hoveredIdx !== idx;
                    return (
                      <li key={item.href} className="overflow-hidden">
                        <motion.button
                          type="button"
                          onClick={() => handleNavigate(item.href)}
                          onMouseEnter={() => setHoveredIdx(idx)}
                          onMouseLeave={() => setHoveredIdx(null)}
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{
                            y: "0%",
                            opacity: 1,
                            transition: {
                              delay: 0.16 + idx * 0.055,
                              duration: 0.65,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          }}
                          exit={{
                            y: "60%",
                            opacity: 0,
                            transition: { duration: 0.25 },
                          }}
                          className={`group flex w-full items-center justify-between py-4 text-left transition-opacity duration-300 md:py-5 ${
                            dimmed ? "opacity-35" : "opacity-100"
                          }`}
                        >
                          <div className="flex items-baseline gap-4 md:gap-7">
                            <span className="text-xs font-normal tracking-[0.2em] text-[#d49b54]">
                              {item.index}
                            </span>
                            <span className="text-4xl font-light tracking-tight text-[#f5efe6] transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#e8be82] sm:text-5xl md:text-6xl">
                              {item.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="hidden text-xs tracking-wide text-[#9b8f7e] transition-colors duration-300 group-hover:text-[#f5efe6] md:inline-block">
                              {item.subtitle}
                            </span>
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f5efe6]/15 text-[#f5efe6] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#d49b54] group-hover:bg-[#d49b54] group-hover:text-[#040300]">
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          </div>
                        </motion.button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Contacts & Socials Column */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.38, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                }}
                exit={{ opacity: 0 }}
                className="flex flex-col justify-between gap-8 lg:col-span-4 lg:pl-8"
              >
                <div className="space-y-8">
                  <div>
                    <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#d49b54]">
                      Direct Concierge
                    </p>
                    <a
                      href="mailto:ritual@onlysaint.coffee"
                      className="block text-xl font-light text-[#f5efe6] transition-colors hover:text-[#e8be82]"
                    >
                      ritual@onlysaint.coffee
                    </a>
                    <a
                      href="tel:+81355500194"
                      className="mt-1 block text-sm text-[#9b8f7e] transition-colors hover:text-[#f5efe6]"
                    >
                      +81 3 5550 0194
                    </a>
                  </div>

                  <div>
                    <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#d49b54]">
                      Flagship Sanctuaries
                    </p>
                    <ul className="space-y-2 text-sm text-[#9b8f7e]">
                      <li>Tokyo — Minami-Aoyama 5-Chome</li>
                      <li>Seoul — Hannam-daero 27-gil</li>
                      <li>Kyoto — Nakagyo Roasting Lab</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#d49b54]">
                    Social Channels
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {SOCIALS.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1.5 rounded-full border border-[#f5efe6]/15 px-4 py-2 text-xs tracking-wide text-[#f5efe6] transition-all duration-300 hover:border-[#d49b54] hover:bg-[#d49b54]/10 hover:text-[#e8be82]"
                      >
                        <span>{social.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom bar inside menu */}
            <div className="relative z-10 mx-auto mt-10 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-[#f5efe6]/8 pt-6 text-[11px] uppercase tracking-[0.24em] text-[#9b8f7e]">
              <span>&copy; 2026 Onlysaint Coffee Roasters</span>
              <span>Small-Batch Obsidian Roast</span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
