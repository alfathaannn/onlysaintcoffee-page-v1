"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "ghost";
  strength?: number;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  onClick,
  href,
  className = "",
  variant = "primary",
  strength = 0.35,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 18, mass: 0.4 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothTextX = useSpring(textX, springConfig);
  const smoothTextY = useSpring(textY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const deltaX = e.clientX - (rect.left + rect.width / 2);
    const deltaY = e.clientY - (rect.top + rect.height / 2);

    x.set(deltaX * strength);
    y.set(deltaY * strength);
    textX.set(deltaX * (strength * 0.45));
    textY.set(deltaY * (strength * 0.45));
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
    textX.set(0);
    textY.set(0);
  };

  const baseStyles =
    variant === "primary"
      ? "border border-[#d49b54]/50 bg-[#0d0905]/85 text-[#f5efe6] backdrop-blur-md hover:border-[#e8be82]"
      : "border border-[#f5efe6]/20 bg-transparent text-[#f5efe6] hover:border-[#d49b54]/70";

  const innerContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${baseStyles} ${className}`}
    >
      {/* Liquid crema fill sweep */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{
          y: hovered ? "0%" : "105%",
          scale: hovered ? 1.05 : 0.9,
        }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-[#b87b35] via-[#d49b54] to-[#f0c98d]"
      />
      <motion.span
        style={{ x: smoothTextX, y: smoothTextY }}
        className={`relative z-10 flex items-center gap-3 transition-colors duration-300 ${
          hovered ? "text-[#040300]" : "text-[#f5efe6]"
        }`}
      >
        {children}
      </motion.span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className="inline-block">
        {innerContent}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-block bg-transparent p-0 border-0"
    >
      {innerContent}
    </button>
  );
}
