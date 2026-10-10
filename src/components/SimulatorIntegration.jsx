import React from 'react';
import { Check } from 'lucide-react';

export default function SimulatorIntegration() {
  const features = [
    {
      title: 'Yoke & Throttle Friendly',
      desc: 'A compact 112mm footprint fits naturally into existing desktop flight simulator setups without rearranging controls.',
    },
    {
      title: 'Zero Framerate Penalty on Host PC',
      desc: 'Transfers telemetry rendering entirely to the onboard processor, leaving 100% of GPU power dedicated to simulator visuals.',
    },
    {
      title: 'Universal Simulator Compatibility',
      desc: 'Native support for Microsoft Flight Simulator 2024 via SimConnect, Laminar Research X-Plane 12 via Datarefs, and custom Python bridges.',
    },
  ];

  return (
    <section id="simulator-context" className="py-20 lg:py-28 bg-navy text-white relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Narrative & Feature Highlights */}
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-cyan uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#00E5F2]" />
              <span>FLIGHT DECK INTEGRATION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Your simulator. A physical instrument.
            </h2>
            <p className="font-body text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Whether positioned adjacent to your throttle quadrant, mounted above your flight yoke, or flanking a center stick, OpenFlight Mini delivers true flight deck depth without GPU performance penalties.
            </p>

            <ul className="space-y-6 list-none p-0 m-0">
              {features.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded bg-cyan/15 border border-cyan/40 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5 text-cyan stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-slate-300 leading-relaxed m-0">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Context Photography */}
          <div className="rounded-xl overflow-hidden border border-white/15 shadow-[0_24px_50px_rgba(0,0,0,0.6)] bg-navy-black">
            <img
              src="/images/simulator-device-setup.png"
              alt="OpenFlight Mini display integrated into desktop flight simulation setup with laptop and flight controls"
              width="800"
              height="500"
              className="w-full h-auto aspect-[16/10] object-cover block"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
