/**
 * OpenFlight Mini — 8-Frame Product Motion & Interactive Engine
 * Drives the dedicated cinematic product animation stage using the 8 selected
 * frames from `frame1`, with smooth photographic dissolve, synchronized captions,
 * and navigation controls.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNavigation();
  initActiveNavSpy();
  initEightFrameMotion();
});

/**
 * Transparent-to-Solid Header on Scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

/**
 * Mobile Navigation Drawer Toggle & Accessibility
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });
}

/**
 * Navigation Scroll Spy
 */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id], div[id="product-motion"]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          const targetHref = (id === 'hero' || id === 'product-motion') ? '#hero' : `#${id}`;
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === targetHref) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * 8-Frame Dedicated Product Motion Engine
 */
function initEightFrameMotion() {
  const canvas = document.getElementById('motion-canvas');
  const scrollWrapper = document.getElementById('product-motion');
  if (!canvas || !scrollWrapper) return;

  const ctx = canvas.getContext('2d');
  const TOTAL_FRAMES = 8;
  const frames = new Array(TOTAL_FRAMES);

  // HUD elements
  const frameNumEl = document.getElementById('motion-frame-num');
  const angleEl = document.getElementById('motion-angle-deg');

  // Story caption elements
  const captions = [
    document.getElementById('motion-caption-1'),
    document.getElementById('motion-caption-2'),
    document.getElementById('motion-caption-3'),
    document.getElementById('motion-caption-4')
  ];

  let currentFloatIndex = 0;
  let targetFloatIndex = 0;
  let allFramesLoaded = false;
  let isFirstFrameDrawn = false;

  // Frame URL constructor (supports root /frame1/ and relative ./frame1/)
  function getFrameUrl(idx) {
    const num = String(idx + 1).padStart(3, '0');
    return `/frame1/ezgif-frame-${num}.jpg`;
  }

  // Preload all 8 frames immediately (~626 KB total)
  function preloadFrames() {
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        frames[i] = img;
        loadedCount++;
        if (i === 0 && !isFirstFrameDrawn) {
          isFirstFrameDrawn = true;
          resizeCanvas();
          renderFrame(0, 0);
        }
        if (loadedCount === TOTAL_FRAMES) {
          allFramesLoaded = true;
          renderFrame(currentFloatIndex, 0);
        }
      };
      img.onerror = () => {
        // Fallback retry with relative path if root differs
        const retryImg = new Image();
        retryImg.src = `./frame1/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
        retryImg.onload = () => {
          frames[i] = retryImg;
          loadedCount++;
          if (i === 0 && !isFirstFrameDrawn) {
            isFirstFrameDrawn = true;
            resizeCanvas();
            renderFrame(0, 0);
          }
          if (loadedCount === TOTAL_FRAMES) {
            allFramesLoaded = true;
            renderFrame(currentFloatIndex, 0);
          }
        };
      };
    }
  }

  // Resize canvas for High-DPI screens
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    renderFrame(currentFloatIndex, 0);
  }

  window.addEventListener('resize', resizeCanvas);

  // Draw image with smooth aspect-ratio cover math and photographic cross-fade
  function drawCoverImage(img, alpha = 1) {
    if (!img) return;

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

  // Render active frame with cross-fade dissolution between adjacent frames
  function renderFrame(floatIdx) {
    const clampedFloat = Math.max(0, Math.min(TOTAL_FRAMES - 1, floatIdx));
    const baseIdx = Math.floor(clampedFloat);
    const nextIdx = Math.min(TOTAL_FRAMES - 1, baseIdx + 1);
    const blend = clampedFloat - baseIdx;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const baseImg = frames[baseIdx] || frames[0];
    if (baseImg) {
      drawCoverImage(baseImg, 1);
    }

    // Smooth filmic cross-fade to the next frame
    if (blend > 0.01 && nextIdx !== baseIdx) {
      const nextImg = frames[nextIdx];
      if (nextImg) {
        drawCoverImage(nextImg, blend);
      }
    }
  }

  // Synchronize story captions and telemetry readouts
  function updateCaptionsAndHUD(progress) {
    // 4 Distinct Story Phases across the 8-frame reveal
    const phase = Math.min(3, Math.floor(progress * 4));

    captions.forEach((cap, idx) => {
      if (!cap) return;
      if (idx === phase) {
        cap.classList.add('active');
      } else {
        cap.classList.remove('active');
      }
    });

    // Update bottom HUD scrubber
    const displayFrame = Math.min(8, Math.floor(progress * 7) + 1);
    const approxAngle = Math.round(progress * 65);

    if (frameNumEl) frameNumEl.textContent = `0${displayFrame} / 08`;
    if (angleEl) angleEl.textContent = `VIEW ANGLE: ${approxAngle}°`;
  }

  // Scroll listener mapped to 260vh container
  function onScroll() {
    const rect = scrollWrapper.getBoundingClientRect();
    const scrollDistance = rect.height - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));

    targetFloatIndex = progress * (TOTAL_FRAMES - 1);
    updateCaptionsAndHUD(progress);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // 60 FPS Render Loop with subtle inertia
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderLoop() {
    if (isReducedMotion) {
      currentFloatIndex = targetFloatIndex;
    } else {
      currentFloatIndex += (targetFloatIndex - currentFloatIndex) * 0.2;
    }

    renderFrame(currentFloatIndex);
    requestAnimationFrame(renderLoop);
  }

  // Kickoff
  preloadFrames();
  requestAnimationFrame(renderLoop);
}
