"use client";

import React, { useState } from "react";
import { ArrowUp, ArrowUpRight, Check } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { useLenisScroll } from "./LenisProvider";

export function Footer() {
  const { scrollTo } = useLenisScroll();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#f5efe6]/10 bg-[#040300] px-6 pt-20 pb-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Top Editorial Grid */}
        <div className="grid grid-cols-1 gap-12 pb-16 lg:grid-cols-12">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <BrandMark className="h-8 w-8 text-[#d49b54]" />
              <span className="text-sm font-medium uppercase tracking-[0.28em] text-[#f5efe6]">
                Onlysaint Coffee
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-[#9b8f7e]">
              Small-batch obsidian roastery &amp; cold extraction lab. Receive
              early harvest notes and private batch drop dispatches.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-7 flex max-w-md items-center gap-2 rounded-full border border-[#f5efe6]/15 bg-[#0b0804] p-1.5 focus-within:border-[#d49b54]/70"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubscribed(false);
                }}
                placeholder="Enter your email for batch drops"
                aria-label="Email address for batch drops"
                className="w-full bg-transparent px-4 py-2 text-xs text-[#f5efe6] placeholder:text-[#9b8f7e]/70 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#d49b54] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#040300] transition-colors hover:bg-[#e8be82]"
              >
                {subscribed ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Joined</span>
                  </>
                ) : (
                  <span>Join</span>
                )}
              </button>
            </form>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-[#d49b54]">
                Experience
              </p>
              <ul className="space-y-2.5 text-sm font-light text-[#9b8f7e]">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollTo("#hero")}
                    className="transition-colors hover:text-[#f5efe6]"
                  >
                    The Pour Sequence
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollTo("#about")}
                    className="transition-colors hover:text-[#f5efe6]"
                  >
                    Philosophy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollTo("#craft")}
                    className="transition-colors hover:text-[#f5efe6]"
                  >
                    Extraction Craft
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollTo("#reserve")}
                    className="transition-colors hover:text-[#f5efe6]"
                  >
                    Reserve Roast
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-[#d49b54]">
                Sanctuaries
              </p>
              <ul className="space-y-2.5 text-sm font-light text-[#9b8f7e]">
                <li>Tokyo · Minami-Aoyama</li>
                <li>Seoul · Hannam-daero</li>
                <li>Kyoto · Nakagyo Lab</li>
                <li className="pt-1 text-xs text-[#f5efe6]/70">
                  Daily 08:00 — 21:00
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.26em] text-[#d49b54]">
                Connect
              </p>
              <ul className="space-y-2.5 text-sm font-light text-[#9b8f7e]">
                <li>
                  <a
                    href="mailto:ritual@onlysaint.coffee"
                    className="inline-flex items-center gap-1 transition-colors hover:text-[#f5efe6]"
                  >
                    <span>Concierge</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-[#f5efe6]"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-[#f5efe6]"
                  >
                    <span>X / Journal</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Utility Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f5efe6]/10 py-6 text-[11px] uppercase tracking-[0.22em] text-[#9b8f7e]">
          <span>&copy; 2026 Onlysaint Coffee Roasters. All rights reserved.</span>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="group inline-flex items-center gap-2 text-[#f5efe6] transition-colors hover:text-[#e8be82]"
          >
            <span>Back to Top</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#f5efe6]/20 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:border-[#d49b54]">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>

        {/* Monumental Display Wordmark — SVG viewBox scales cleanly without ever clipping */}
        <div className="mt-6 w-full select-none pt-2">
          <svg
            viewBox="0 0 1200 175"
            className="h-auto w-full"
            aria-label="ONLYSAINT"
            role="img"
          >
            <defs>
              <linearGradient
                id="footer-wordmark-grad"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f5efe6" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#f5efe6" stopOpacity="0.03" />
              </linearGradient>
            </defs>
            <text
              x="600"
              y="148"
              textAnchor="middle"
              fill="url(#footer-wordmark-grad)"
              style={{
                fontFamily: "var(--font-outfit), ui-sans-serif, system-ui, sans-serif",
                fontSize: "164px",
                fontWeight: 600,
                letterSpacing: "-0.04em",
              }}
            >
              ONLYSAINT
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
