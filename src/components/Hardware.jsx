import React from 'react';

export default function Hardware() {
  const specs = [
    { label: 'Display Panel', value: '3.5" Full-Color IPS Glass (178° View, 60 Hz)' },
    { label: 'Microcontroller', value: 'Embedded 32-bit MCU with Hardware FPU' },
    { label: 'Physical Dimensions', value: '112 × 94 × 78 mm' },
    { label: 'Total Weight', value: '245 grams (Weighted Base)' },
    { label: 'Power & Connectivity', value: 'Single 5V USB-C Cable (240mA Max)' },
    { label: 'Chassis Mounting', value: 'Dual M3 Brass Threaded Inserts' },
    { label: 'Thermal Architecture', value: 'Passive Convection Chimney (0 dB Silent)' },
  ];

  return (
    <section id="engineering" className="py-20 lg:py-28 bg-[#F4F6F9] text-[#0F172A] border-t border-b border-[#E2E8F0]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Component Photography */}
          <div className="rounded-xl overflow-hidden border border-[#CBD5E1] shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-white">
            <img
              src="/images/hardware-breakdown.png"
              alt="Exploded workbench view of OpenFlight Mini hardware components including custom PCB, IPS display, and housing"
              width="800"
              height="500"
              className="w-full h-auto aspect-[16/10] object-cover block"
              loading="lazy"
            />
          </div>

          {/* Right: Narrative & Confirmed Specifications */}
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#0284C7] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>ENGINEERED INSIDE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] mb-4">
              A compact, serviceable embedded system.
            </h2>
            <p className="font-body text-base sm:text-lg text-[#475569] leading-relaxed mb-8">
              Built with off-the-shelf maker accessibility and industrial-grade structural rigidity. Every component is documented, serviceable, and designed for thermal stability during 10+ hour cross-country flights.
            </p>

            {/* Confirmed Specifications Table */}
            <div className="rounded-lg overflow-hidden border border-[#E2E8F0] bg-white shadow-sm">
              <table className="w-full text-left border-collapse" aria-label="OpenFlight Mini Hardware Specifications">
                <tbody>
                  {specs.map((item, idx) => (
                    <tr
                      key={item.label}
                      className={idx !== specs.length - 1 ? 'border-b border-[#EDF2F7]' : ''}
                    >
                      <th
                        scope="row"
                        className="py-3.5 px-4 sm:px-5 font-mono text-xs font-bold text-[#475569] tracking-wider uppercase bg-[#F8FAFC] w-[40%] sm:w-[35%]"
                      >
                        {item.label}
                      </th>
                      <td className="py-3.5 px-4 sm:px-5 font-body text-sm font-medium text-[#0F172A]">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
