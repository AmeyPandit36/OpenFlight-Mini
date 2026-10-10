import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [bgSrc, setBgSrc] = useState('/images/hero_loop.gif');

  useEffect(() => {
    // If user prefers reduced motion, fallback immediately to static hero image
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setBgSrc('/images/hero.png');
      return;
    }

    // Preload GIF to check for load errors and verify availability
    const img = new Image();
    img.src = '/images/hero_loop.gif';
    img.onerror = () => {
      setBgSrc('/images/hero.png');
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100dvh] flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden border-b border-white/10"
    >
      {/* 1. Base Dark Surface */}
      <div className="absolute inset-0 bg-[#02060D] z-0 pointer-events-none" />

      {/* 2. Static Hero Image as instant base layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none bg-cover bg-no-repeat bg-[position:65%_center] sm:bg-[position:68%_center] md:bg-[position:70%_center] lg:bg-[position:74%_center] xl:bg-[position:76%_center]"
        style={{
          backgroundImage: "url('/images/hero.png')",
        }}
      />

      {/* 3. Full-width Cinematic Background Layer (hero_loop.gif animated loop over static base) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none bg-cover bg-no-repeat bg-[position:65%_center] sm:bg-[position:68%_center] md:bg-[position:70%_center] lg:bg-[position:74%_center] xl:bg-[position:76%_center] transition-opacity duration-700"
        style={{
          backgroundImage: `url('${bgSrc}')`,
        }}
      />

      {/* 4. Layered Multi-Stop Navy & Dark Gradients for Text Readability & Product Prominence */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(2, 6, 13, 0.85) 0%, rgba(2, 6, 13, 0.25) 18%, transparent 35%),
            linear-gradient(0deg, #02060D 0%, rgba(2, 6, 13, 0.85) 8%, transparent 22%),
            linear-gradient(90deg, #02060D 0%, rgba(2, 6, 13, 0.95) 32%, rgba(2, 6, 13, 0.78) 48%, rgba(2, 6, 13, 0.20) 70%, transparent 92%)
          `,
        }}
      />

      {/* 5. Subtle Aviation Radar Overlay Graphic in Cockpit Horizon (Decorative, Non-competing) */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute right-[4%] lg:right-[8%] top-1/2 -translate-y-1/2 z-[4] pointer-events-none w-[420px] h-[420px] lg:w-[540px] lg:h-[540px] opacity-[0.08] select-none"
        style={{
          backgroundImage: "url('/icons/radar-overlay.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      />

      {/* 6. Responsive Content Container */}
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="max-w-[580px] w-full">
          {/* Hardware Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#091528]/85 backdrop-blur-md border border-white/15 mb-6 animate-fadeIn shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#00E5F2] animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-cyan uppercase">
              AVIONICS TELEMETRY DISPLAY
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            Flight data.
            <span className="text-cyan block drop-shadow-[0_0_36px_rgba(0,229,242,0.35)]">
              Made physical.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="font-body text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-[520px] mb-8 sm:mb-10">
            Bring essential flight-simulator telemetry into a dedicated physical display designed to complement a desktop simulation setup.
          </p>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Primary CTA with Supplied SVG Arrow */}
            <a
              href="#flight-features"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded text-sm sm:text-[0.9375rem] font-body font-semibold tracking-wide bg-cyan text-[#02060D] border border-cyan shadow-[0_4px_20px_rgba(0,229,242,0.35)] hover:bg-cyan-bright hover:shadow-[0_6px_28px_rgba(0,229,242,0.5)] hover:-translate-y-0.5 transition-all duration-200 no-underline group"
            >
              <span>Explore the instrument</span>
              <img
                src="/icons/arrow-right.svg"
                alt=""
                aria-hidden="true"
                className="w-4 h-4 brightness-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>

            {/* Secondary CTA with Supplied Play Circle Icon */}
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded text-sm sm:text-[0.9375rem] font-body font-semibold tracking-wide bg-[#091528]/80 text-white border border-white/20 hover:border-cyan hover:text-cyan hover:bg-cyan/10 hover:-translate-y-0.5 transition-all duration-200 no-underline group"
            >
              <img
                src="/icons/play-circle.svg"
                alt=""
                aria-hidden="true"
                className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
              />
              <span>See how it works</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
