# Onlysaint Coffee — Scrollytelling Landing Page

An interactive scrollytelling web experience for **Onlysaint Coffee**, built with **Next.js**, **Tailwind CSS**, **Motion**, **Lenis**, and an **HTML5 Canvas** image-sequence renderer.

## Features

- **Sticky 400vh Image Sequence Hero (`SequenceScroll.tsx`)**: Smooth spring-interpolated 190-frame HTML5 Canvas playback with DPR-aware cover-fit scaling, seamless `#040300` obsidian edge blending, choreographed scroll story overlays (`0%`, `30%`, `60%`, `90%`), and a hidden click-to-bottom auto-scroll trigger.
- **Preloader & Fullscreen Navigation**: Percentage preloader buffered across all 190 frames (`Preloader.tsx`), plus a persistent header and animated fullscreen overlay menu (`Navbar.tsx`).
- **Editorial Landing Sections**:
  - Scroll-scrubbed character-by-character manifesto reveal (`AboutSection.tsx`)
  - Asymmetric craft & roast-profile Bento grid (`BentoSection.tsx`)
  - Viewport-triggered count-up metrics (`StatsSection.tsx`)
  - Autoplay fullscreen testimonial slider (`TestimonialSection.tsx`)
  - Animated ambient allocation CTA (`CtaSection.tsx`) and responsive SVG wordmark footer (`Footer.tsx`)

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the experience.
