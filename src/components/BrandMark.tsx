"use client";

import React from "react";

interface BrandMarkProps {
  className?: string;
}

/**
 * Renders the Onlysaint Coffee emblem from /images/logo.webp,
 * masked to currentColor so it adapts seamlessly to the site's
 * crema-gold (#d49b54 / #e8be82) and obsidian (#040300) palette.
 */
export function BrandMark({ className = "h-8 w-8" }: BrandMarkProps) {
  return (
    <span
      role="img"
      aria-label="Onlysaint Coffee Crest"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: "url('/images/logo.webp')",
        WebkitMaskImage: "url('/images/logo.webp')",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
