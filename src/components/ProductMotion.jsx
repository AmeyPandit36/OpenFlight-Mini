import React, { useEffect, useRef, useState } from 'react';

export default function ProductMotion() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [hudFrame, setHudFrame] = useState('01 / 08');
  const [hudAngle, setHudAngle] = useState(0);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const TOTAL_FRAMES = 8;
    const frames = new Array(TOTAL_FRAMES);

    let currentFloatIndex = 0;
    let targetFloatIndex = 0;
    let animFrameId = null;

    function getFrameUrl(idx) {
      const num = String(idx + 1).padStart(3, '0');
      return `/frame1/ezgif-frame-${num}.jpg`;
    }

    // Preload frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        frames[i] = img;
        if (i === 0) {
          resizeCanvas();
          renderFrame(0);
        }
      };
      img.onerror = () => {
        const fallback = new Image();
        fallback.src = `./frame1/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
        fallback.onload = () => {
          frames[i] = fallback;
          if (i === 0) {
            resizeCanvas();
            renderFrame(0);
          }
        };
      };
    }

    function resizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(currentFloatIndex);
    }

    window.addEventListener('resize', resizeCanvas);

    function drawCoverImage(img, alpha = 1) {
      if (!img || !canvas) return;
      const canvasW = canvas.width;
      const canvasH = canvas.height;
      const imgW = img.naturalWidth || 1280;
      const imgH = img.naturalHeight || 720;

      const imgAspect = imgW / imgH;
      const canvasAspect = canvasW / canvasH;

      let drawW, drawH, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        drawW = canvasW;
        drawH = canvasW / imgAspect;
        offsetX = 0;
        offsetY = (canvasH - drawH) / 2;
      } else {
        drawH = canvasH;
        drawW = canvasH * imgAspect;
        offsetX = (canvasW - drawW) / 2;
        offsetY = 0;
      }

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      ctx.restore();
    }

    function renderFrame(floatIdx) {
      if (!canvas || !ctx) return;
      const clampedFloat = Math.max(0, Math.min(TOTAL_FRAMES - 1, floatIdx));
      const baseIdx = Math.floor(clampedFloat);
      const nextIdx = Math.min(TOTAL_FRAMES - 1, baseIdx + 1);
      const blend = clampedFloat - baseIdx;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const baseImg = frames[baseIdx] || frames[0];
      if (baseImg) {
        drawCoverImage(baseImg, 1);
      }

      if (blend > 0.01 && nextIdx !== baseIdx) {
        const nextImg = frames[nextIdx];
        if (nextImg) {
          drawCoverImage(nextImg, blend);
        }
      }
    }

    function onScroll() {
      const rect = container.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      if (scrollDistance <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));

      targetFloatIndex = progress * (TOTAL_FRAMES - 1);

      // Phase update
      const phase = Math.min(3, Math.floor(progress * 4));
      setActivePhase(phase);

      // HUD scrubber update
      const displayFrame = Math.min(8, Math.floor(progress * 7) + 1);
      const approxAngle = Math.round(progress * 65);
      setHudFrame(`0${displayFrame} / 08`);
      setHudAngle(approxAngle);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function renderLoop() {
      if (isReducedMotion) {
        currentFloatIndex = targetFloatIndex;
      } else {
        currentFloatIndex += (targetFloatIndex - currentFloatIndex) * 0.2;
      }

      renderFrame(currentFloatIndex);
      animFrameId = requestAnimationFrame(renderLoop);
    }

    resizeCanvas();
    animFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', onScroll);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  const storyCaptions = [
    {
      tag: '01 // THE HARDWARE DISPLAY',
      title: 'Formed for the Desktop Cockpit.',
      desc: 'A dedicated physical display engineered to bring simulated flight dynamics into your physical peripheral view without monitor window overlays.',
      align: 'left',
    },
    {
      tag: '02 // ERGONOMIC ARCHITECTURE',
      title: '15° Slant & Anti-Glare Hood.',
      desc: 'Machined nylon-12 housing specifically angled for standard 29-inch flight simulator desk heights, preventing reflections from overhead lighting.',
      align: 'right',
    },
    {
      tag: '03 // OPTICAL FIDELITY',
      title: '3.5" IPS Full-Color Glass.',
      desc: 'High-contrast display delivering razor-sharp pitch ladders, synthetic horizons, airspeed tapes, and directional gyro heading at 60 Hz.',
      align: 'left',
    },
    {
      tag: '04 // UNINTERRUPTED WORKFLOW',
      title: 'Zero Host GPU Overhead.',
      desc: 'All telemetry parsing and frame rasterization are computed by the onboard 32-bit microcontroller via USB-C, reserving 100% of host GPU power for simulator visuals.',
      align: 'right',
    },
  ];

  return (
    <div
      id="product-motion"
      ref={containerRef}
      className="relative w-full h-[260vh] bg-navy-black border-b border-white/10"
    >
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
          aria-label="Interactive 8-frame scroll animation revealing OpenFlight Mini from multiple angles on the desktop"
        />

        {/* Lighting Vignette Overlays */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,13,0.7)_100%)]" />
        <div className="absolute top-0 inset-x-0 h-32 pointer-events-none bg-gradient-to-b from-[#02060D] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none bg-gradient-to-t from-[#02060D] to-transparent" />

        {/* Top-Left HUD Badge */}
        <div className="absolute top-24 left-6 sm:left-10 z-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#091528]/80 backdrop-blur-md border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#00E5F2] animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-cyan uppercase">
              PRODUCT STAGE // CAD REVEAL SEQUENCE
            </span>
          </div>
        </div>

        {/* Bottom-Right Scrubber Indicator */}
        <div className="absolute bottom-8 right-6 sm:right-10 z-20 pointer-events-none font-mono text-xs font-semibold text-slate-400 bg-[#091528]/80 backdrop-blur-md border border-white/15 px-4 py-2 rounded flex items-center gap-4">
          <span>
            FRAME: <span className="text-cyan font-bold">{hudFrame}</span>
          </span>
          <span className="text-white font-bold">VIEW ANGLE: {hudAngle}°</span>
        </div>

        {/* Synchronized Story Captions */}
        <div className="absolute inset-0 pointer-events-none flex items-center">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 w-full relative h-full flex items-center">
            {storyCaptions.map((caption, idx) => {
              const isActive = activePhase === idx;
              const isLeft = caption.align === 'left';
              return (
                <div
                  key={idx}
                  className={`absolute max-w-[440px] w-full transition-all duration-500 ease-out ${
                    isLeft ? 'left-5 sm:left-8' : 'right-5 sm:right-8'
                  } ${
                    isActive
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-6 pointer-events-none'
                  }`}
                >
                  <div className="p-6 sm:p-7 rounded-lg bg-[#050D1A]/90 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div className="font-mono text-[11px] font-bold tracking-widest text-cyan uppercase mb-2">
                      {caption.tag}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 leading-snug">
                      {caption.title}
                    </h2>
                    <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed m-0">
                      {caption.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
