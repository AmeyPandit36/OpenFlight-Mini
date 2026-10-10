import React, { useState, useEffect } from 'react';

/* =========================================================================
   CINEMATIC WELCOME INTRO COMPONENT
   =========================================================================
   - Displays a short, atmospheric aviation-inspired intro on page load/refresh.
   - Text starts blurred and slightly scaled, transitions into sharp focus,
     holds briefly, and fades away seamlessly to reveal the hero experience.
   - Fully configurable welcome text placeholder with clear markers.
   - Replay policy: Plays once on initial page load / refresh.
     Does NOT replay during in-page anchor navigation.
   - Respects prefers-reduced-motion (skips or uses instant reveal).
   - Fully accessible with keyboard dismiss (Escape) and click-to-skip.
   - Prevents scrollbars and interactions while active.
   ========================================================================= */

export default function WelcomeIntro({
  /* =======================================================================
     CONFIGURABLE WELCOME TEXT PLACEHOLDER
     Replace the strings below with your desired welcome copy when ready.
     ======================================================================= */
  systemBadge = "OPENFLIGHT MINI // AVIONICS SYSTEM INITIALIZATION",
  welcomeHeading = "Flight data. Made physical.",
  welcomeSubheading = "DEDICATED TELEMETRY DISPLAY FOR SIMULATION ENTHUSIASTS",
  onComplete = () => {},
}) {
  // Intro animation phase: 'blur-in' -> 'focused' -> 'fade-out' -> 'hidden'
  const [phase, setPhase] = useState('blur-in');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDismissed(true);
      onComplete();
      return;
    }

    // Lock body scrolling while intro overlay is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Timeline:
    // 0ms - 850ms: text blurs in & scales into razor-sharp focus
    // 850ms - 1900ms: holds in focus with subtle cyan glow
    // 1900ms - 2500ms: cinematic fade-out of overlay
    // 2500ms: overlay completely unmounted
    const timerFocus = setTimeout(() => {
      setPhase('focused');
    }, 850);

    const timerFade = setTimeout(() => {
      setPhase('fade-out');
    }, 1900);

    const timerEnd = setTimeout(() => {
      setPhase('hidden');
      setDismissed(true);
      document.body.style.overflow = originalOverflow;
      onComplete();
    }, 2500);

    // Escape key or Space to skip immediately
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        clearTimeout(timerFocus);
        clearTimeout(timerFade);
        clearTimeout(timerEnd);
        setPhase('hidden');
        setDismissed(true);
        document.body.style.overflow = originalOverflow;
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timerFocus);
      clearTimeout(timerFade);
      clearTimeout(timerEnd);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Quick manual skip on click
  const handleSkip = () => {
    setPhase('hidden');
    setDismissed(true);
    document.body.style.overflow = '';
    onComplete();
  };

  if (dismissed || phase === 'hidden') {
    return null;
  }

  const isFadingOut = phase === 'fade-out';
  const isFocused = phase === 'focused' || phase === 'fade-out';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Introduction"
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02060D] cursor-pointer select-none transition-all duration-600 ease-out ${
        isFadingOut ? 'opacity-0 scale-102 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
      }`}
      style={{
        transitionDuration: '600ms',
      }}
    >
      {/* Cockpit atmospheric background elements */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 45%, rgba(0, 229, 242, 0.08) 0%, rgba(2, 6, 13, 0.8) 55%, #02060D 100%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Subtle decorative radar rings centered behind text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
      >
        <div className="w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full border border-cyan/30 animate-pulse" />
        <div className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] rounded-full border border-cyan/20 border-dashed" />
      </div>

      {/* Welcome Content Container */}
      <div className="relative z-10 max-w-2xl px-6 text-center flex flex-col items-center">
        {/* Top System Status Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded bg-[#091528]/80 border border-cyan/30 mb-6 transition-all duration-700 ease-out ${
            isFocused
              ? 'opacity-100 translate-y-0 filter blur-0'
              : 'opacity-0 -translate-y-2 filter blur-sm'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#00E5F2] animate-ping" />
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] text-cyan uppercase">
            {systemBadge}
          </span>
        </div>

        {/* Cinematic Main Welcome Heading — Blur to Sharp Focus Transition */}
        <h1
          className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight transition-all duration-800 ease-out ${
            isFocused
              ? 'opacity-100 scale-100 filter blur-0 drop-shadow-[0_0_36px_rgba(0,229,242,0.45)]'
              : 'opacity-0 scale-95 filter blur-[14px]'
          }`}
        >
          {welcomeHeading}
        </h1>

        {/* Subtitle / Telemetry Prompt */}
        <p
          className={`mt-4 font-mono text-xs sm:text-sm tracking-[0.18em] text-slate-300 uppercase transition-all duration-700 delay-150 ease-out ${
            isFocused
              ? 'opacity-90 translate-y-0 filter blur-0'
              : 'opacity-0 translate-y-2 filter blur-[8px]'
          }`}
        >
          {welcomeSubheading}
        </p>

        {/* Ambient progress line indicator */}
        <div className="mt-8 w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className={`h-full bg-gradient-to-r from-cyan via-cyan-bright to-aviation-blue rounded-full transition-all ease-linear ${
              isFocused ? 'w-full duration-1800' : 'w-0 duration-300'
            }`}
          />
        </div>

        {/* Skip hint */}
        <div className="mt-6 flex items-center gap-2 text-slate-500 font-mono text-[10px] tracking-wider uppercase opacity-70">
          <span>Click anywhere or press Esc to skip</span>
        </div>
      </div>
    </div>
  );
}
