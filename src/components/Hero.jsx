import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden border-b border-white/10 bg-navy bg-cover bg-no-repeat bg-[position:65%_center] sm:bg-[position:68%_center] lg:bg-[position:72%_center]"
      style={{
        backgroundImage: `
          linear-gradient(180deg, rgba(2, 6, 13, 0.75) 0%, rgba(2, 6, 13, 0.22) 16%, transparent 30%),
          linear-gradient(0deg, #02060D 0%, rgba(2, 6, 13, 0.85) 6%, transparent 18%),
          linear-gradient(90deg, #050D1A 0%, rgba(5, 13, 26, 0.95) 28%, rgba(5, 13, 26, 0.78) 46%, rgba(5, 13, 26, 0.22) 68%, transparent 92%),
          url('/images/hero.png')
        `,
      }}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="max-w-[580px] w-full">
          {/* Hardware Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#091528]/80 backdrop-blur-md border border-white/15 mb-6 animate-fadeIn">
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
            <a
              href="#product-motion"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded text-sm sm:text-[0.9375rem] font-body font-semibold tracking-wide bg-cyan text-[#02060D] border border-cyan shadow-[0_4px_20px_rgba(0,229,242,0.35)] hover:bg-cyan-bright hover:shadow-[0_6px_28px_rgba(0,229,242,0.5)] hover:-translate-y-0.5 transition-all duration-200 no-underline group"
            >
              <span>Explore the instrument</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded text-sm sm:text-[0.9375rem] font-body font-semibold tracking-wide bg-white/5 text-white border border-white/20 hover:border-cyan hover:text-cyan hover:bg-cyan/5 hover:-translate-y-0.5 transition-all duration-200 no-underline"
            >
              <span>See how it works</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
