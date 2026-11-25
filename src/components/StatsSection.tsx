"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";

interface StatItem {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  detail: string;
}

const STATS: StatItem[] = [
  {
    value: 192,
    label: "Micro-Lots Cupped",
    detail: "Direct-trade harvests evaluated blind each season before selecting three.",
  },
  {
    value: 18,
    suffix: "H",
    label: "Glacial Cold Steep",
    detail: "Gravity-regulated 4°C extraction for zero bitterness and liqueur clarity.",
  },
  {
    value: 94.8,
    decimals: 1,
    label: "Q-Grader Score",
    detail: "Verified competition-tier sensory score across our Reserve roasts.",
  },
  {
    value: 12400,
    suffix: "+",
    label: "Daily Rituals Poured",
    detail: "Served across Tokyo, Seoul, Kyoto, and private collector subscriptions.",
  },
];

function CountUpNumber({
  target,
  decimals = 0,
  suffix = "",
}: {
  target: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration: 2.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (decimals > 0) {
          setDisplay(latest.toFixed(decimals));
        } else {
          setDisplay(Math.round(latest).toLocaleString("en-US"));
        }
      },
    });

    return () => controls.stop();
  }, [isInView, target, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix && <span className="text-[#d49b54]">{suffix}</span>}
    </span>
  );
}

export function StatsSection() {
  return (
    <section
      id="stats"
      className="relative border-y border-[#f5efe6]/10 bg-[#040300] px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-light tracking-tight text-[#f5efe6] sm:text-5xl">
              Measured in <span className="font-medium text-[#e8be82]">Precision.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light text-[#9b8f7e]">
            Every cup is backed by lab-grade refractometry, moisture profiling,
            and patient extraction math.
          </p>
        </div>

        <div className="grid grid-cols-1 divide-y divide-[#f5efe6]/10 border-y border-[#f5efe6]/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.65,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col justify-between p-7 transition-colors duration-500 hover:bg-[#0c0804] md:p-9"
            >
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#9b8f7e]">
                0{idx + 1}
              </span>

              <div className="my-8 text-5xl font-light tracking-tight text-[#f5efe6] transition-transform duration-500 group-hover:translate-x-1 md:text-6xl">
                <CountUpNumber
                  target={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </div>

              <div>
                <h3 className="text-base font-medium tracking-tight text-[#f5efe6]">
                  {stat.label}
                </h3>
                <p className="mt-2 text-xs font-light leading-relaxed text-[#9b8f7e]">
                  {stat.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
