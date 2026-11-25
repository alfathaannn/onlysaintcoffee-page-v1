"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Flame, Snowflake, Sparkles } from "lucide-react";

const ROAST_PROFILES = [
  {
    id: "obsidian",
    name: "Obsidian 01",
    notes: "74% Cacao · Smoked Fig · Molasses",
    temp: "209°C Drop",
  },
  {
    id: "amber",
    name: "Amber 02",
    notes: "Burnt Caramel · Bergamot · Praline",
    temp: "204°C Drop",
  },
  {
    id: "halo",
    name: "Halo Reserve",
    notes: "Jasmine Mist · Honeyed Peach · Bourbon",
    temp: "199°C Drop",
  },
];

export function BentoSection() {
  const [activeProfile, setActiveProfile] = useState(ROAST_PROFILES[0]);

  return (
    <section
      id="craft"
      className="relative bg-[#040300] px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-4xl font-light tracking-tight text-[#f5efe6] sm:text-5xl md:text-6xl">
              Engineered for{" "}
              <span className="font-medium text-[#e8be82]">Sensory Depth.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm font-light leading-relaxed text-[#9b8f7e] md:text-base">
            Every drop balances high-pressure espresso dynamics with patient
            glacial cold steeping—archived in small numbered runs.
          </p>
        </div>

        {/* Asymmetric Awwwards Bento Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Bento Card 1 — Large Espresso Extraction */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl border border-[#f5efe6]/10 bg-[#0b0804] p-7 md:col-span-7 md:min-h-[480px] md:p-9"
          >
            <img
              src="/images/bento-pour.jpg"
              alt="Golden-amber espresso crema pouring from a matte black and brass portafilter"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-80 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#040300] via-[#040300]/35 to-[#040300]/45"
            />

            <div className="relative z-10 flex items-center justify-between">
            </div>

            <div className="relative z-10 max-w-md">
              <h3 className="text-2xl font-normal tracking-tight text-[#f5efe6] md:text-3xl">
                Tiger-Striped Liquid Gold
              </h3>
              <p className="mt-2.5 text-sm font-light leading-relaxed text-[#f5efe6]/75">
                Extracted through precision-machined brass dispersion screens at
                93.2°C for dense, velvety crema that holds suspended aromatics.
              </p>
            </div>
          </motion.article>

          {/* Bento Card 2 — Cold Brew Carafe */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl border border-[#f5efe6]/10 bg-[#0b0804] p-7 md:col-span-5 md:min-h-[480px] md:p-9"
          >
            <img
              src="/images/bento-coldbrew.jpg"
              alt="Chilled smoked-glass cold brew carafe with floating crystal ice cubes"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#040300] via-[#040300]/25 to-[#040300]/50"
            />

            <div className="relative z-10 flex items-center justify-between">
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-normal tracking-tight text-[#f5efe6] md:text-3xl">
                Zero Bitterness. Pure Clarity.
              </h3>
              <p className="mt-2.5 text-sm font-light leading-relaxed text-[#f5efe6]/75">
                Eighteen hours of gravity-fed cold immersion unlocks sweet cacao
                esters while leaving harsh tannins behind.
              </p>
            </div>
          </motion.article>

          {/* Bento Card 3 — Kinetic Splash Sequence Frame */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-3xl border border-[#f5efe6]/10 bg-[#0b0804] p-7 md:col-span-5 md:min-h-[420px] md:p-9"
          >
            <img
              src="/sequence/ezgif-frame-189.jpg"
              alt="High-speed coffee splash with roasted beans and ice cubes"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-75 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#040300] via-[#040300]/45 to-[#040300]/55"
            />

            <div className="relative z-10 flex items-center justify-between">
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-normal tracking-tight text-[#f5efe6] md:text-3xl">
                Suspended Aromatics
              </h3>
              <p className="mt-2.5 text-sm font-light leading-relaxed text-[#f5efe6]/75">
                Flash-chilled over dry-tempered cubes to lock volatile floral
                notes inside every iced pour.
              </p>
            </div>
          </motion.article>

          {/* Bento Card 4 — Interactive Roast Profile Selector + Vessel */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-3xl border border-[#f5efe6]/10 bg-[#0b0804] p-7 md:col-span-7 md:min-h-[420px] md:p-9"
          >
            <img
              src="/sequence/ezgif-frame-100.jpg"
              alt="Onlysaint Coffee signature frosted cup with haloed coffee bean sleeve"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-55 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#040300] via-[#040300]/80 to-[#040300]/35"
            />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {ROAST_PROFILES.map((profile) => {
                  const selected = profile.id === activeProfile.id;
                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => setActiveProfile(profile)}
                      className={`rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                        selected
                          ? "border-[#d49b54] bg-[#d49b54] text-[#040300] font-medium"
                          : "border-[#f5efe6]/15 bg-[#040300]/70 text-[#f5efe6]/80 hover:border-[#d49b54]/50"
                      }`}
                    >
                      {profile.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 max-w-lg">
              <div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#d49b54]">
                <span>{activeProfile.temp}</span>
                <span className="h-1 w-1 rounded-full bg-[#d49b54]" />
                <span>Single-Estate Lot</span>
              </div>
              <h3 className="text-2xl font-normal tracking-tight text-[#f5efe6] md:text-3xl">
                {activeProfile.name} — {activeProfile.notes}
              </h3>
              <p className="mt-2.5 text-sm font-light leading-relaxed text-[#f5efe6]/75">
                Each sleeve carries a serialized batch stamp linking directly to
                farm harvest elevation, roast curve telemetry, and extraction
                window.
              </p>

              <a
                href="#reserve"
                className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-[#e8be82] transition-colors hover:text-[#f5efe6]"
              >
                <span>Select This Profile</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
