import React, { useState, useEffect } from 'react';
import WelcomeIntro from './components/WelcomeIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FlightFeatures from './components/FlightFeatures';
import ProductMotion from './components/ProductMotion';
import HowItWorks from './components/HowItWorks';
import FlightParameters from './components/FlightParameters';
import Hardware from './components/Hardware';
import SimulatorIntegration from './components/SimulatorIntegration';
import ClosingCTA from './components/ClosingCTA';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const sectionIds = [
      'hero',
      'flight-features',
      'product-motion',
      'how-it-works',
      'parameters',
      'engineering',
    ];
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-navy text-slate-100 flex flex-col font-body antialiased selection:bg-cyan selection:text-navy-black">
      {/* Cinematic Welcome Intro Overlay (Plays on initial load / refresh) */}
      {!introFinished && (
        <WelcomeIntro
          /* Configurable welcome copy placeholder props */
          systemBadge="OPENFLIGHT MINI // AVIONICS SYSTEM INITIALIZATION"
          welcomeHeading="Flight data. Made physical."
          welcomeSubheading="DEDICATED TELEMETRY DISPLAY FOR SIMULATION ENTHUSIASTS"
          onComplete={() => setIntroFinished(true)}
        />
      )}

      {/* Main Website Experience */}
      <Navbar activeSection={activeSection} />
      <main id="main-content" className="flex-1">
        <Hero />
        <FlightFeatures />
        <ProductMotion />
        <HowItWorks />
        <FlightParameters />
        <Hardware />
        <SimulatorIntegration />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
}
