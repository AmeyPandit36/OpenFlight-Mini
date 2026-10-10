import React from 'react';

export default function FlightParameters() {
  const parameters = [
    {
      code: 'ALT',
      title: 'Indicated Altitude',
      desc: 'Vertical elevation scale with calibrated pressure reference and target flight level bug pointer.',
      icon: '/icons/altitude.svg',
      reading: '8,500',
      unit: 'FT MSL',
      tagColor: 'text-cyan',
      readingColor: 'text-white',
    },
    {
      code: 'SPD',
      title: 'Calibrated Airspeed',
      desc: 'Dynamic airspeed indicator gauge featuring speed range operating arcs and Vne limit reference.',
      icon: '/icons/airspeed.svg',
      reading: '140',
      unit: 'KTS KIAS',
      tagColor: 'text-cyan',
      readingColor: 'text-white',
    },
    {
      code: 'HDG',
      title: 'Directional Gyro',
      desc: 'Compass rose with top lubber line index, 45° autopilot heading bug, and center miniature aircraft.',
      icon: '/icons/heading.svg',
      reading: '284°',
      unit: 'MAGNETIC',
      tagColor: 'text-cyan',
      readingColor: 'text-white',
    },
    {
      code: 'PITCH',
      title: 'Pitch Attitude',
      desc: 'Vertical pitch ladder with +10° and -10° bent tick ends and aircraft climbing boresight chevron.',
      icon: '/icons/pitch.svg',
      reading: '+3.5°',
      unit: 'NOSE UP',
      tagColor: 'text-amber-warning',
      readingColor: 'text-amber-warning',
    },
    {
      code: 'ROLL',
      title: 'Bank Angle',
      desc: 'Curved roll arc with zero-roll index, banked aircraft symbol, and inclinometer slip/skid ball.',
      icon: '/icons/roll.svg',
      reading: '-12.0°',
      unit: 'LEFT BANK',
      tagColor: 'text-aviation-blue',
      readingColor: 'text-aviation-blue',
    },
    {
      code: 'NAV',
      title: 'Route Waypoint Track',
      desc: 'Active direct-to fix waypoint tracking with breadcrumb flown path history and route distance ticks.',
      icon: '/icons/flight-path.svg',
      reading: 'EIDW',
      unit: 'ACTIVE FIX',
      tagColor: 'text-cyan',
      readingColor: 'text-white',
      featured: true,
    },
  ];

  return (
    <section id="parameters" className="py-20 lg:py-28 bg-navy text-white relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-[840px] mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-cyan uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#00E5F2]" />
            <span>PRIMARY FLIGHT DISPLAY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Five parameters. Always in peripheral scan.
          </h2>
          <p className="font-body text-base sm:text-lg text-slate-300 leading-relaxed">
            Organized according to standard glass cockpit primary flight display (PFD) conventions. Critical metrics remain fixed in the physical world for rapid pilot cross-checks.
          </p>
        </div>

        {/* Six Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {parameters.map((param) => (
            <div
              key={param.code}
              className={`rounded-lg p-6 sm:p-7 bg-[#091528] border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between ${
                param.featured
                  ? 'border-cyan/35 shadow-[0_4px_20px_rgba(0,229,242,0.08)]'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded bg-[#0D1E36] border border-white/10 flex items-center justify-center p-2.5"
                    title={param.title}
                  >
                    <img src={param.icon} alt={param.title} width="32" height="32" className="w-full h-full object-contain" />
                  </div>
                  <span className={`font-mono text-xs font-bold tracking-widest uppercase ${param.tagColor}`}>
                    {param.code}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold tracking-tight text-white mb-2">
                  {param.title}
                </h3>
                <p className="font-body text-sm text-slate-300 leading-relaxed mb-6">
                  {param.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-baseline justify-between font-mono">
                <span className={`text-2xl sm:text-3xl font-bold tracking-tight ${param.readingColor}`}>
                  {param.reading}
                </span>
                <span className="text-xs text-slate-400 font-semibold tracking-wider">
                  {param.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
