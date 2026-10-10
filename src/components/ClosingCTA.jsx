import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function ClosingCTA() {
  return (
    <section className="py-20 lg:py-28 bg-navy border-t border-white/10 relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="rounded-2xl p-8 sm:p-12 lg:p-16 text-center max-w-[840px] mx-auto bg-gradient-to-b from-[#091528] to-[#050D1A] border border-cyan/25 shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,229,242,0.06)] relative overflow-hidden">
          {/* Ambient Corner Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan/15 rounded-full blur-3xl pointer-events-none" />

          {/* Section Kicker */}
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-cyan uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#00E5F2]" />
            <span>GET STARTED</span>
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Make your flight data tangible.
          </h2>

          {/* Description */}
          <p className="font-body text-base sm:text-lg text-slate-300 leading-relaxed max-w-[600px] mx-auto mb-8 sm:mb-10">
            Bring essential flight-simulator telemetry into a dedicated physical display designed to complement a desktop simulation setup.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#product-motion"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded text-sm sm:text-[0.9375rem] font-body font-semibold tracking-wide bg-cyan text-[#02060D] border border-cyan shadow-[0_4px_20px_rgba(0,229,242,0.35)] hover:bg-cyan-bright hover:shadow-[0_6px_28px_rgba(0,229,242,0.5)] hover:-translate-y-0.5 transition-all duration-200 no-underline group"
            >
              <span>Replay Motion Sequence</span>
              <RotateCcw className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:-rotate-90" />
            </a>

            <a
              href="#engineering"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded text-sm sm:text-[0.9375rem] font-body font-semibold tracking-wide bg-white/5 text-white border border-white/20 hover:border-cyan hover:text-cyan hover:bg-cyan/5 hover:-translate-y-0.5 transition-all duration-200 no-underline"
            >
              <span>View Hardware Specifications</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
