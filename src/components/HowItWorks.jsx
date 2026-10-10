import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Flight Simulator',
      desc: 'Host software (MSFS 2024, X-Plane 12, Prepar3D) computes aircraft aerodynamics and publishes real-time telemetry variables.',
      meta: 'SOURCE: SimConnect / Datarefs',
    },
    {
      num: '02',
      title: 'USB Serial Link',
      desc: 'Telemetry packets serialize into 64-byte binary buffers and stream through a standard USB-CDC communication port at 115,200 baud.',
      meta: 'BUS: Full-Speed USB-C CDC',
    },
    {
      num: '03',
      title: 'Embedded Controller',
      desc: 'Onboard 32-bit MCU validates CRC checksums, calculates attitude rotation matrices, and generates display primitive buffers.',
      meta: 'ENGINE: 32-bit Hardware FPU',
    },
    {
      num: '04',
      title: 'Dedicated Display',
      desc: 'Direct SPI/RGB interface flushes double-buffered framebuffers to the 3.5" IPS glass panel at a locked 60 Hz without tearing.',
      meta: 'OUTPUT: 60 FPS Hardware DMA',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#F4F6F9] text-[#0F172A] border-t border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-[840px] mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#0284C7] uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
            <span>DATA PIPELINE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] mb-4">
            From simulation physics to physical glass.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#475569] leading-relaxed">
            Telemetry moves deterministically from your PC flight simulator to the physical screen through an isolated USB serial pipeline, avoiding complex network bridges or virtual display drivers.
          </p>
        </div>

        {/* Data Flow Diagram */}
        <div className="relative">
          {/* Flow Connector Line (SVG on desktop) */}
          <div className="hidden lg:block relative h-9 mb-6 overflow-hidden">
            <svg
              className="w-full h-full"
              viewBox="0 0 1100 36"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M 40 18 L 1060 18" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
              <path
                d="M 40 18 L 1060 18"
                stroke="#0284C7"
                strokeWidth="3"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />
              <circle cx="120" cy="18" r="6" fill="#0284C7" />
              <circle cx="400" cy="18" r="6" fill="#0284C7" />
              <circle cx="700" cy="18" r="6" fill="#0284C7" />
              <circle cx="980" cy="18" r="6" fill="#0284C7" />
            </svg>
          </div>

          {/* 4 Pipeline Node Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-lg p-6 sm:p-7 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs font-bold tracking-widest text-[#0284C7] uppercase mb-2">
                    {step.num}
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-[#0F172A] mb-2.5">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-[#475569] leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>
                <div className="font-mono text-[11px] font-semibold text-[#64748B] pt-4 border-t border-[#EDF2F7] tracking-wider uppercase">
                  {step.meta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
