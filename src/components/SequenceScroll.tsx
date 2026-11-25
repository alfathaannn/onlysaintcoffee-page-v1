"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { useLenisScroll } from "./LenisProvider";

const TOTAL_FRAMES = 190;
const BG_COLOR = "#040300";

function getFrameSrc(index: number): string {
  const frameNum = String(index + 1).padStart(3, "0");
  return `/sequence/ezgif-frame-${frameNum}.jpg`;
}

interface SequenceScrollProps {
  onLoadProgress?: (progress: number) => void;
  onReady?: () => void;
}

export function SequenceScroll({
  onLoadProgress,
  onReady,
}: SequenceScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafDrawRef = useRef<number | null>(null);
  const [introInteractive, setIntroInteractive] = useState(true);
  const [ctaInteractive, setCtaInteractive] = useState(false);

  const { lenis, scrollTo } = useLenisScroll();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring interpolation for ultra-fluid frame scrubbing without stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 26,
    restDelta: 0.0004,
  });

  // Story Text Overlays mapped to scroll milestones: 0%, 30%, 60%, 90%
  const introOpacity = useTransform(scrollYProgress, [0, 0.14, 0.175], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.14, 0.175], [0, 0, -56]);

  const sloganLeftOpacity = useTransform(
    scrollYProgress,
    [0.19, 0.27, 0.37, 0.45],
    [0, 1, 1, 0]
  );
  const sloganLeftX = useTransform(
    scrollYProgress,
    [0.19, 0.29, 0.45],
    [-36, 0, -18]
  );

  const sloganRightOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.56, 0.66, 0.74],
    [0, 1, 1, 0]
  );
  const sloganRightX = useTransform(
    scrollYProgress,
    [0.48, 0.58, 0.74],
    [36, 0, 18]
  );

  const ctaOpacity = useTransform(
    scrollYProgress,
    [0.77, 0.86, 0.96, 1],
    [0, 1, 1, 0.9]
  );
  const ctaScale = useTransform(scrollYProgress, [0.77, 0.88], [0.94, 1]);
  const ctaY = useTransform(scrollYProgress, [0.77, 0.88], [28, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const shouldEnableIntro = latest < 0.16;
    setIntroInteractive((prev) =>
      prev !== shouldEnableIntro ? shouldEnableIntro : prev
    );

    const shouldEnableCta = latest >= 0.78;
    setCtaInteractive((prev) => (prev !== shouldEnableCta ? shouldEnableCta : prev));
  });

  /**
   * Hidden auto-scroll trigger: smoothly glides through the entire
   * scrollytelling sequence and landing sections all the way to 100% bottom.
   * Any manual wheel/touch input cancels immediately (lock: false).
   */
  const handleAutoScrollToBottom = useCallback(() => {
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const remaining = Math.max(0, maxScroll - window.scrollY);
    if (remaining <= 0) return;

    const durationSec = Math.max(6, Math.min(18, remaining / 450));

    if (lenis) {
      lenis.scrollTo(maxScroll, {
        duration: durationSec,
        lock: false,
        easing: (t) =>
          t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      });
    } else {
      window.scrollTo({ top: maxScroll, behavior: "smooth" });
    }
  }, [lenis]);

  /**
   * Draws a given frame onto the canvas using exact "cover" fit scaling,
   * centered perfectly on all desktop & mobile aspect ratios.
   */
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const clampedIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
    const img = imagesRef.current[clampedIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.max(1, Math.round(rect.width * dpr));
    const targetH = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, targetW, targetH);

    // Cover-fit geometry centered in viewport
    const scale = Math.max(
      targetW / img.naturalWidth,
      targetH / img.naturalHeight
    );
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const dx = (targetW - drawW) / 2;
    const dy = (targetH - drawH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, []);

  // Preload all 190 sequence frames with progress reporting
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const handleProgress = () => {
      if (isCancelled) return;
      loadedCount += 1;
      const pct = (loadedCount / TOTAL_FRAMES) * 100;
      onLoadProgress?.(pct);

      if (loadedCount >= TOTAL_FRAMES) {
        drawFrame(Math.round(currentFrameRef.current));
        onReady?.();
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i += 1) {
      const img = new Image();
      img.decoding = "async";
      img.src = getFrameSrc(i);
      img.onload = () => {
        imagesRef.current[i] = img;
        if (i === 0) {
          drawFrame(0);
        }
        handleProgress();
      };
      img.onerror = () => {
        handleProgress();
      };
    }

    return () => {
      isCancelled = true;
    };
  }, [drawFrame, onLoadProgress, onReady]);

  // Continuous interpolated render loop so fast wheel flicks glide seamlessly
  useEffect(() => {
    let running = true;

    const tick = () => {
      if (!running) return;
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.28;
        drawFrame(Math.round(currentFrameRef.current));
      }
      rafDrawRef.current = requestAnimationFrame(tick);
    };

    rafDrawRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafDrawRef.current !== null) {
        cancelAnimationFrame(rafDrawRef.current);
      }
    };
  }, [drawFrame]);

  // Update target frame on every spring tick
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const nextIndex = latest * (TOTAL_FRAMES - 1);
    targetFrameRef.current = nextIndex;
    drawFrame(Math.round(nextIndex));
  });

  // Redraw responsively on viewport resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      drawFrame(Math.round(currentFrameRef.current));
    });
    observer.observe(canvas);

    return () => observer.disconnect();
  }, [drawFrame]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-[400vh] w-full bg-[#040300]"
    >
      {/* Sticky HTML5 Canvas — Centered Cover Fit */}
      <canvas
        ref={canvasRef}
        className="sticky top-0 block h-screen w-full bg-[#040300]"
      />

      {/* Sticky Edge-Blend Mask & Editorial Story Overlays */}
      <div className="pointer-events-none sticky top-0 -mt-[100vh] h-screen w-full overflow-hidden">
        {/* Seamless peripheral vignette matching exact #040300 page ground */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 84% 82% at 50% 50%, rgba(4,3,0,0) 48%, rgba(4,3,0,0.68) 84%, #040300 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#040300]/75 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#040300] via-[#040300]/50 to-transparent"
        />

        {/* 0% Scroll — Centered Title & Subheading */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="absolute inset-0 flex flex-col items-center justify-between px-6 pb-10 pt-28 text-center md:px-12 md:pb-12"
        >
          <div className="relative my-auto max-w-4xl px-6 py-8">
            <h1 className="text-5xl font-bold uppercase tracking-[-0.04em] text-[#ffffff] sm:text-7xl md:text-8xl lg:text-[7.5rem] lg:leading-[0.92]">
              Onlysaint
              <span className="mt-1 block font-semibold text-[#eab86c]">
                Coffee
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-sm font-normal leading-relaxed tracking-wide text-[#f5efe6] [text-shadow:0_4px_20px_rgba(4,3,0,0.98)] md:text-base">
              Sacred rituals suspended in obsidian ice and velvet crema. Scroll
              to witness every millisecond of the collision.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#9b8f7e]">
              Scroll to Awaken
            </span>
            <motion.button
              type="button"
              onClick={handleAutoScrollToBottom}
              aria-label="Auto scroll to bottom of page"
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              whileTap={{ scale: 0.92 }}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#f5efe6]/20 bg-[#040300]/50 text-[#d49b54] backdrop-blur-sm transition-colors duration-300 hover:border-[#d49b54]/70 hover:bg-[#110b05]/80 ${
                introInteractive ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </motion.div>

        {/* 30% Scroll — Left Aligned Slogan */}
        <motion.div
          style={{ opacity: sloganLeftOpacity, x: sloganLeftX }}
          className="absolute inset-0 flex items-center px-6 md:px-16 lg:px-24"
        >
          <div className="max-w-lg rounded-2xl border border-[#f5efe6]/8 bg-[#040300]/45 p-6 backdrop-blur-md md:bg-transparent md:p-0 md:border-0 md:backdrop-blur-none">
            <h2 className="text-3xl font-light leading-[1.08] tracking-tight text-[#f5efe6] drop-shadow-[0_8px_32px_rgba(4,3,0,0.9)] sm:text-5xl md:text-6xl">
              Roasted in Shadow.
              <span className="block font-medium text-[#e8be82]">
                Brewed for Clarity.
              </span>
            </h2>
            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-[#f5efe6]/75 md:text-base">
              High-elevation Ethiopian &amp; Colombian heirloom lots roasted past
              silence—unlocking dark cacao, toasted hazelnut, and resinous amber
              sweetness.
            </p>
          </div>
        </motion.div>

        {/* 60% Scroll — Right Aligned Slogan */}
        <motion.div
          style={{ opacity: sloganRightOpacity, x: sloganRightX }}
          className="absolute inset-0 flex items-center justify-end px-6 md:px-16 lg:px-24"
        >
          <div className="max-w-lg rounded-2xl border border-[#f5efe6]/8 bg-[#040300]/45 p-6 text-right backdrop-blur-md md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
            <h2 className="text-3xl font-light leading-[1.08] tracking-tight text-[#f5efe6] drop-shadow-[0_8px_32px_rgba(4,3,0,0.9)] sm:text-5xl md:text-6xl">
              Velvet Crema Meets
              <span className="block font-medium text-[#e8be82]">
                Crystal Ice.
              </span>
            </h2>
            <p className="ml-auto mt-4 max-w-md text-sm font-light leading-relaxed text-[#f5efe6]/75 md:text-base">
              Eighteen hours of calibrated 4°C micro-drip extraction suspended in
              hand-cut crystal ice—zero astringency, pure silk mouthfeel.
            </p>
          </div>
        </motion.div>

        {/* 90% Scroll — Centered CTA & Interactive Magnetic Button */}
        <motion.div
          style={{ opacity: ctaOpacity, scale: ctaScale, y: ctaY }}
          className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center ${
            ctaInteractive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
        </motion.div>
      </div>
    </section>
  );
}
