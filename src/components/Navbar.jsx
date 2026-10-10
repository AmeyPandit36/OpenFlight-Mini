import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ activeSection = 'hero' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'The Instrument', href: '#hero', id: 'hero' },
    { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { label: 'Flight Data', href: '#parameters', id: 'parameters' },
    { label: 'Hardware', href: '#engineering', id: 'engineering' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050D1A]/90 backdrop-blur-md border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] h-[72px] sm:h-[76px]'
            : 'bg-transparent border-b border-white/5 h-[72px] sm:h-[76px]'
        }`}
        id="top"
      >
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-full flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* Left: Brand Identity */}
          <a
            href="#top"
            className="flex items-center gap-3 group shrink-0 justify-self-start no-underline"
            aria-label="OpenFlight Mini Home"
          >
            <img
              src="/images/logo.png"
              alt="OpenFlight Mini Logo"
              width="80"
              height="40"
              className="h-8 sm:h-9 md:h-[38px] w-auto aspect-[1774/887] object-contain drop-shadow-[0_2px_8px_rgba(0,229,242,0.25)] transition-transform duration-200 group-hover:scale-105"
              loading="eager"
            />
            <div className="flex flex-col text-left">
              <span className="font-brand font-bold text-sm sm:text-[0.9375rem] tracking-[0.08em] text-white uppercase leading-tight whitespace-nowrap">
                OPENFLIGHT MINI
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-[0.14em] text-cyan uppercase leading-tight mt-0.5 whitespace-nowrap">
                FLIGHT TELEMETRY DISPLAY
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex justify-self-center" aria-label="Primary Navigation">
            <ul className="flex items-center gap-8 list-none m-0 p-0">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id || (link.id === 'hero' && activeSection === 'product-motion');
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={`font-nav text-sm font-medium transition-colors duration-150 py-1 relative no-underline tracking-tight whitespace-nowrap ${
                        isActive ? 'text-white' : 'text-slate-300/80 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] bg-cyan transition-all duration-200 ${
                          isActive ? 'w-full' : 'w-0 hover:w-full'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Actions & Mobile Toggle */}
          <div className="flex items-center gap-4 shrink-0 justify-self-end">
            {/* Desktop Discover CTA */}
            <a
              href="#product-motion"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded text-[13px] font-body font-semibold tracking-wide bg-gradient-to-r from-cyan to-[#00B8D9] text-[#02060D] border border-cyan/60 shadow-[0_4px_18px_rgba(0,229,242,0.3)] hover:shadow-[0_6px_24px_rgba(0,229,242,0.5)] hover:-translate-y-0.5 transition-all duration-200 no-underline whitespace-nowrap group"
            >
              <span>Discover the instrument</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="mobile-toggle"
              type="button"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded bg-[#091528]/80 border border-white/15 text-white hover:text-cyan hover:border-cyan/50 backdrop-blur-sm transition-colors duration-150 cursor-pointer"
              aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-drawer"
        className={`fixed inset-x-0 bottom-0 top-[72px] sm:top-[76px] bg-[#050D1A]/98 backdrop-blur-2xl border-t border-white/10 p-6 sm:p-8 flex flex-col z-40 transition-all duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Mobile Header Brand Display */}
        <div className="flex items-center gap-3 pb-5 border-b border-white/10">
          <img
            src="/images/logo.png"
            alt="OpenFlight Mini Logo"
            width="64"
            height="32"
            className="h-8 w-auto aspect-[1774/887] object-contain"
          />
          <div className="flex flex-col text-left">
            <span className="font-brand font-bold text-sm tracking-wider text-white uppercase">
              OPENFLIGHT MINI
            </span>
            <span className="font-mono text-[9px] font-semibold tracking-widest text-cyan uppercase">
              FLIGHT TELEMETRY DISPLAY
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-4 list-none m-0 p-0 mt-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="font-nav text-lg font-semibold text-slate-100 hover:text-cyan transition-colors block pb-3 border-b border-white/5 no-underline"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Footer CTA */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <a
            href="#product-motion"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded text-sm font-body font-semibold tracking-wide bg-gradient-to-r from-cyan to-[#00B8D9] text-[#02060D] border border-cyan/60 shadow-[0_4px_18px_rgba(0,229,242,0.3)] no-underline"
            onClick={() => setMobileOpen(false)}
          >
            <span>Discover the instrument</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </a>
        </div>
      </div>
    </>
  );
}
