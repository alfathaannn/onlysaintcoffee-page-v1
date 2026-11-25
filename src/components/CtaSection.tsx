"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

const ALLOCATIONS = [
  {
    id: "obsidian-flight",
    title: "Obsidian Flight",
    meta: "3 × 250g Whole Bean · Weekly",
    price: "\$64",
  },
  {
    id: "glacial-carafe",
    title: "Glacial Concentrate",
    meta: "2 × 500ml UV Glass · Chilled",
    price: "\$78",
  },
  {
    id: "collector-vault",
    title: "Saint Collector Vault",
    meta: "Beans + Glass + Numbered Sleeve",
    price: "\$145",
  },
];

export function CtaSection() {
  const [selectedId, setSelectedId] = useState(ALLOCATIONS[0].id);
  const [reserved, setReserved] = useState(false);

  const selected =
    ALLOCATIONS.find((item) => item.id === selectedId) ?? ALLOCATIONS[0];

  const handleReserve = () => {
    setReserved(true);
    setTimeout(() => setReserved(false), 3800);
  };

  return (
    <section
      id="reserve"
      className="relative overflow-hidden border-t border-[#f5efe6]/10 bg-[#040300] px-6 py-28 md:px-12 md:py-40 lg:px-20"
    >
      {/* Animated Ambient Background Layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            x: ["-8%", "10%", "-8%"],
            y: ["-6%", "8%", "-6%"],
            scale: [1, 1.16, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-0 h-[460px] w-[460px] rounded-full bg-[#d49b54]/14 blur-[130px]"
        />
        <motion.div
          animate={{
            x: ["10%", "-12%", "10%"],
            y: ["8%", "-10%", "8%"],
            scale: [1.1, 0.96, 1.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-[#8c5320]/20 blur-[150px]"
        />

        {/* Subtle Rotating Geometric Halo Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 54, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d49b54]/10"
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#d49b54]/60" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 72, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5efe6]/5"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-light tracking-tight text-[#f5efe6] sm:text-6xl md:text-7xl">
          Awaken Your{" "}
          <span className="font-medium text-[#e8be82]">Morning Ritual.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-[#9b8f7e] md:text-base">
          Only 300 numbered allocations leave our Kyoto &amp; Tokyo labs each
          week. Select your roast format below to reserve from Batch No. 019.
        </p>

        {/* Magnetic CTA Trigger */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <MagneticButton
            onClick={handleReserve}
            ariaLabel={`Reserve ${selected.title}`}
          >
            {reserved ? (
              <>
                <Check className="h-4 w-4" />
                <span>Allocation Held — {selected.title}</span>
              </>
            ) : (
              <>
                <span>Reserve {selected.title}</span>
                <ArrowUpRight className="h-4 w-4" />
              </>
            )}
          </MagneticButton>

          <p className="text-[11px] uppercase tracking-[0.24em] text-[#9b8f7e]">
            {reserved
              ? "Confirmation dispatch queued · Roasted within 24 hours"
              : "Complimentary chilled courier · Cancel or pause anytime"}
          </p>
        </div>
      </div>
    </section>
  );
}
