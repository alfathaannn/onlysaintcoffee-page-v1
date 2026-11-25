import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ONLYSAINT COFFEE — Sacred Rituals in Every Cold Extraction",
  description:
    "An interactive scrollytelling experience by Onlysaint Coffee. Small-batch obsidian roast, glacial cold extraction, and sensory craft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-[#040300] font-sans text-[#f5efe6] tracking-tight antialiased selection:bg-[#d49b54]/30 selection:text-[#f5efe6]">
        <LenisProvider>
          {/* Subtle ambient film grain across viewport */}
          <div
            aria-hidden="true"
            className="grain-overlay pointer-events-none fixed inset-0 z-40 opacity-80 mix-blend-soft-light"
          />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
