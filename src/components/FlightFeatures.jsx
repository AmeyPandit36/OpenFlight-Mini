import { useState } from "react";
import FeatureRotor, { features } from "./FeatureRotor";

function FeatureIcon({ src, className = "h-6 w-6", active = false, alt = "" }) {
  return (
    <span
      role="img"
      aria-label={alt}
      className={`inline-block shrink-0 transition-colors duration-200 ${className} ${
        active
          ? "bg-cyan-300 drop-shadow-[0_0_8px_rgba(0,221,240,0.6)]"
          : "bg-[#7E9BAE] group-hover:bg-cyan-200"
      }`}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

export default function FlightFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = features[activeIndex];

  const selectPrevious = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + features.length) % features.length
    );
  };

  const selectNext = () => {
    setActiveIndex(
      (current) => (current + 1) % features.length
    );
  };

  return (
    <section
      id="flight-features"
      className="relative isolate overflow-hidden bg-[#030914] text-white scroll-mt-[76px] sm:scroll-mt-[76px] border-b border-white/10"
    >
      {/* Desktop cinematic background product layer */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 -z-20 pointer-events-none overflow-hidden"
      >
        <div
          className="w-full h-full bg-no-repeat bg-[position:left_calc(max(0px,50%-640px))_center] bg-[size:min(1100px,80vw)_auto]"
          style={{
            backgroundImage: "url('/images/feature-showcase.png')",
          }}
        />
      </div>

      {/* Desktop horizontal gradient overlay: clear instrument on left, amber glow in center, dark navy on right */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 -z-10 pointer-events-none bg-gradient-to-r from-transparent via-[#030914]/30 to-[#030914] via-40% to-75%"
      />

      {/* Top and bottom subtle section edge fades */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-16 sm:h-20 -z-10 pointer-events-none bg-gradient-to-b from-[#030914] via-[#030914]/85 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 sm:h-20 -z-10 pointer-events-none bg-gradient-to-t from-[#030914] via-[#030914]/85 to-transparent"
      />

      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10 pt-4 sm:pt-6 lg:pt-5 pb-4 sm:pb-5 lg:pb-5">
        {/* 1. Compact heading block at top */}
        <div className="mb-3 sm:mb-4 lg:mb-4 max-w-xl lg:ml-auto">
          <p className="mb-1 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-cyan-300 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00DDF0] animate-pulse" />
            EXPLORE THE INSTRUMENT
          </p>

          <h2 className="text-[clamp(1.75rem,2.2vw,2.25rem)] font-bold leading-tight tracking-tight text-white">
            Five parameters.
            <span className="block text-cyan-300 drop-shadow-[0_0_20px_rgba(0,221,240,0.35)]">
              One physical display.
            </span>
          </h2>

          <p className="mt-1 max-w-lg text-xs sm:text-[13px] lg:text-[14px] leading-relaxed text-slate-300">
            Explore the flight data that OpenFlight Mini brings into view. Select a parameter to discover what it represents.
          </p>
        </div>

        {/* Mobile/Tablet product visual reveal spacer */}
        <div
          aria-hidden="true"
          className="lg:hidden relative mx-auto my-4 sm:my-5 h-[160px] sm:h-[190px] w-full max-w-[380px] bg-no-repeat bg-contain bg-center pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #030914 0%, transparent 12%, transparent 88%, #030914 100%),
              linear-gradient(to bottom, #030914 0%, transparent 12%, transparent 88%, #030914 100%),
              url('/images/feature-showcase.png')
            `,
          }}
        />

        {/* 2. Coordinated main row: Product visual left, Rotor center, Feature details right */}
        <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(300px,auto)_minmax(0,1.15fr)] lg:gap-6 xl:gap-8">
          {/* Left: Product visual anchor spacer revealing the background instrument silhouette */}
          <div
            className="hidden lg:block min-h-[280px] w-full"
            aria-hidden="true"
          />

          {/* Centre: Interactive circular SVG rotor scaled proportionally to fit the viewport */}
          <div className="mx-auto w-full max-w-[290px] sm:max-w-[310px] lg:max-w-[330px] xl:max-w-[350px] shrink-0">
            <FeatureRotor
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
          </div>

          {/* Right: Selected feature information grouped consistently */}
          <div
            key={activeFeature.id}
            className="mx-auto w-full max-w-lg lg:max-w-none lg:mx-0 animate-[feature-enter_350ms_ease-out]"
            aria-live="polite"
          >
            <div className="mb-1.5 flex items-center gap-2 font-mono text-xs tracking-[0.18em]">
              <span className="text-cyan-300 font-bold">
                {activeFeature.code}
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400 font-medium">
                {String(features.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mb-2.5 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[clamp(1.4rem,1.75vw,1.75rem)] font-bold tracking-tight text-white leading-tight">
                  {activeFeature.name}
                </h3>

                <p className="mt-0.5 text-xs sm:text-sm tracking-wide text-slate-300 font-medium">
                  {activeFeature.subtitle}
                </p>
              </div>

              <FeatureIcon
                src={activeFeature.icon}
                className="mt-0.5 h-8 w-8 sm:h-9 sm:w-9"
                active={true}
                alt={activeFeature.name}
              />
            </div>

            <p className="max-w-md text-xs sm:text-[13px] leading-relaxed text-slate-300">
              {activeFeature.description}
            </p>

            <div className="my-2.5 h-px w-full bg-white/10" />

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 shadow-[0_0_12px_rgba(0,221,240,0.2)]">
                <FeatureIcon
                  src={activeFeature.icon}
                  className="h-5 w-5"
                  active={true}
                  alt=""
                />
              </div>

              <div>
                <p className="font-mono text-[clamp(1.5rem,1.85vw,1.85rem)] font-bold tracking-wide text-white leading-none">
                  {activeFeature.value}
                  <span className="ml-1.5 font-mono text-xs sm:text-sm font-semibold text-cyan-300">
                    {activeFeature.unit}
                  </span>
                </p>

                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 font-medium">
                  {activeFeature.detail}
                </p>
              </div>
            </div>

            <div className="mt-3.5 flex items-center gap-2.5">
              <button
                type="button"
                onClick={selectPrevious}
                aria-label="Previous feature"
                className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full border border-white/20 text-sm text-slate-200 transition-all duration-200 hover:border-cyan-300 hover:text-cyan-300 hover:bg-cyan-300/10 hover:shadow-[0_0_10px_rgba(0,221,240,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-95"
              >
                ←
              </button>

              <button
                type="button"
                onClick={selectNext}
                aria-label="Next feature"
                className="flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full border border-white/20 text-sm text-slate-200 transition-all duration-200 hover:border-cyan-300 hover:text-cyan-300 hover:bg-cyan-300/10 hover:shadow-[0_0_10px_rgba(0,221,240,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-95"
              >
                →
              </button>

              <span className="ml-1 font-mono text-[10px] text-slate-400 tracking-wider font-medium">
                CYCLE PARAMETERS
              </span>
            </div>
          </div>
        </div>

        {/* 3. Five-feature selector below the main row */}
        <nav
          aria-label="Flight features"
          className="mx-auto mt-3.5 sm:mt-4 lg:mt-4 max-w-5xl border-t border-white/10 pt-2.5 sm:pt-3"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-2.5 xl:gap-3">
            {features.map((feature, index) => {
              const selected = activeIndex === index;

              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-current={selected ? "step" : undefined}
                  aria-pressed={selected}
                  className={`group relative flex min-h-[68px] sm:min-h-[72px] lg:min-h-[70px] flex-col items-center justify-center gap-1 rounded-xl border p-2 sm:p-2.5 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    selected
                      ? "border-cyan-300/70 bg-cyan-300/[0.1] shadow-[0_0_16px_rgba(0,221,240,0.2)]"
                      : "border-white/10 bg-[#07111E]/60 hover:border-white/30 hover:bg-[#07111E]/90"
                  }`}
                >
                  <FeatureIcon
                    src={feature.icon}
                    className="h-5 w-5 sm:h-5.5 sm:w-5.5"
                    active={selected}
                    alt=""
                  />

                  <span
                    className={`font-mono text-[9px] sm:text-[10px] tracking-[0.16em] ${
                      selected ? "text-cyan-300 font-bold" : "text-slate-500 group-hover:text-slate-400 font-medium"
                    }`}
                  >
                    {feature.code}
                  </span>

                  <span
                    className={`text-xs sm:text-[12px] font-semibold leading-tight ${
                      selected ? "text-white" : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {feature.name}
                  </span>

                  {selected && (
                    <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00DDF0]" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* 4. Illustrative-data disclaimer beneath selector */}
        <p className="mt-2 text-center font-mono text-[9px] sm:text-[10px] text-slate-500 font-medium leading-tight">
          Display values are illustrative examples, not live simulator telemetry.
        </p>
      </div>
    </section>
  );
}
