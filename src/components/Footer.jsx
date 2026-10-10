import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Footer() {
  const footerNav = [
    { label: 'The Instrument', href: '#hero' },
    { label: 'Motion Reveal (8 Frames)', href: '#product-motion' },
    { label: 'Data Pipeline', href: '#how-it-works' },
    { label: 'Flight Parameters', href: '#parameters' },
    { label: 'Hardware Architecture', href: '#engineering' },
    { label: 'Simulator Integration', href: '#simulator-context' },
  ];

  const metrics = [
    { label: 'Dimensions:', value: '112 × 94 × 78 mm', highlight: false },
    { label: 'Weight:', value: '245 grams', highlight: false },
    { label: 'Display:', value: '3.5" IPS Full Color', highlight: false },
    { label: 'Power:', value: '5V USB-C (240mA max)', highlight: true },
  ];

  return (
    <footer className="bg-[#02060D] text-slate-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Mandatory Regulatory Disclaimer */}
        <div className="rounded-lg p-5 sm:p-6 mb-16 bg-[#091528]/80 border border-amber-warning/30 flex items-start gap-4">
          <div className="w-8 h-8 rounded bg-amber-warning/15 border border-amber-warning/40 flex items-center justify-center shrink-0 mt-0.5 text-amber-warning">
            <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold tracking-widest text-amber-warning uppercase mb-1.5">
              MANDATORY REGULATORY DISCLAIMER // NON-CERTIFIED EQUIPMENT
            </div>
            <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed m-0">
              OpenFlight Mini is an educational flight-simulation prototype. It is not certified aviation equipment and must not be used for real-aircraft navigation, piloting, or safety-critical flight decisions under any circumstances.
            </p>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 pb-14 border-b border-white/10">
          {/* Brand & Mission */}
          <div>
            <a href="#top" className="flex items-center gap-3 mb-4 no-underline group" aria-label="OpenFlight Mini Home">
              <img
                src="/images/logo.png"
                alt="OpenFlight Mini Logo"
                width="70"
                height="35"
                className="h-8 w-auto aspect-[1774/887] object-contain drop-shadow-[0_2px_8px_rgba(0,229,242,0.25)] transition-transform duration-200 group-hover:scale-105"
              />
              <div className="flex flex-col text-left">
                <span className="font-brand font-bold text-sm tracking-wider text-white uppercase leading-tight">
                  OPENFLIGHT MINI
                </span>
                <span className="font-mono text-[9px] font-semibold tracking-widest text-cyan uppercase leading-tight mt-0.5">
                  FLIGHT TELEMETRY DISPLAY
                </span>
              </div>
            </a>
            <p className="font-body text-sm text-slate-400 leading-relaxed mb-4">
              Physical flight-simulator telemetry display built for realism and engineering education.
            </p>
            <div className="font-mono text-xs text-slate-500 tracking-wider">
              OPEN HARDWARE LICENSE: CERN-OHL-P v2
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-mono text-xs font-bold text-white tracking-widest uppercase mb-4">
              NAVIGATION
            </div>
            <ul className="space-y-2.5 list-none p-0 m-0 font-body text-sm">
              {footerNav.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-cyan transition-colors no-underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hardware Metrics Summary */}
          <div>
            <div className="font-mono text-xs font-bold text-white tracking-widest uppercase mb-4">
              HARDWARE METRICS
            </div>
            <ul className="space-y-2.5 list-none p-0 m-0 font-mono text-xs">
              {metrics.map((item, idx) => (
                <li
                  key={item.label}
                  className={`flex items-center justify-between pb-2 ${
                    idx !== metrics.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <span className="text-slate-500">{item.label}</span>
                  <span className={`font-bold ${item.highlight ? 'text-cyan' : 'text-slate-200'}`}>
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500 text-center sm:text-left">
          <div>
            © 2025 OPENFLIGHT PROJECT • ALL SPECIFICATIONS OPEN HARDWARE COMPLIANT
          </div>
          <div className="text-cyan font-semibold">
            FIRMWARE: OPENFLIGHT v0.9.4 | USB-C SERIAL CDC | 60Hz REFRESH
          </div>
        </div>
      </div>
    </footer>
  );
}
