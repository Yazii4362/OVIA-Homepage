// ═══════════════════════════════════════════════════════════════
// OVIA Product Scroll Animation (Apple-style)
// GSAP + ScrollTrigger + Canvas Image Sequence
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ─── Configuration ───────────────────────────────────────────
  const config = {
    frameCount: 60,
    imagePath: './assets/images/product-sequence/frame_',
    imageFormat: '.webp',
    canvasId: 'product-canvas',
    sectionClass: '.product-hero',
    isMobile: window.innerWidth < 768
  };

  // Mobile optimization: reduce frame count
  if (config.isMobile) {
    config.frameCount = 30;
  }

  // ─── Initialize ──────────────────────────────────────────────
  function init() {
    const canvas = document.getElementById(config.canvasId);
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const images = [];
    const obj = { frame: 0 };

    // Set canvas size
    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // ─── Preload Images ──────────────────────────────────────
    let loadedCount = 0;
    const preloadCount = config.isMobile ? 10 : 20; // Load first N images immediately

    for (let i = 0; i < config.frameCount; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `${config.imagePath}${frameNum}${config.imageFormat}`;
      
      // Priority loading for first frames
      if (i < preloadCount) {
        img.onload = () => {
          loadedCount++;
          if (loadedCount === 1) {
            render(); // Draw first frame immediately
          }
        };
      }
      
      images.push(img);
    }

    // ─── Render Function ─────────────────────────────────────
    function render() {
      const img = images[obj.frame];
      if (!img || !img.complete) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Center and scale image
      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      
      context.drawImage(
        img,
        x, y,
        img.width * scale,
        img.height * scale
      );
    }

    // ─── GSAP ScrollTrigger ──────────────────────────────────
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(obj, {
      frame: config.frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: config.sectionClass,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
        anticipatePin: 1
      },
      onUpdate: render
    });

    // ─── Text Animations ─────────────────────────────────────
    gsap.from('.product-hero__title', {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: config.sectionClass,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1
      }
    });

    gsap.from('.product-hero__subtitle', {
      opacity: 0,
      y: 30,
      scrollTrigger: {
        trigger: config.sectionClass,
        start: 'top 70%',
        end: 'top 20%',
        scrub: 1
      }
    });

    gsap.to('.product-hero__title', {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: config.sectionClass,
        start: 'center top',
        end: '+=50%',
        scrub: 1
      }
    });

    gsap.to('.product-hero__subtitle', {
      opacity: 0,
      y: -30,
      scrollTrigger: {
        trigger: config.sectionClass,
        start: 'center top',
        end: '+=50%',
        scrub: 1
      }
    });

    // ─── Feature Highlights ──────────────────────────────────
    const features = document.querySelectorAll('.product-feature');
    features.forEach((feature, index) => {
      const startFrame = Math.floor((config.frameCount / features.length) * index);
      const endFrame = Math.floor((config.frameCount / features.length) * (index + 1));

      gsap.fromTo(feature,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: config.sectionClass,
            start: `${(startFrame / config.frameCount) * 100}% top`,
            end: `${((startFrame + 5) / config.frameCount) * 100}% top`,
            scrub: 1
          }
        }
      );

      gsap.to(feature, {
        opacity: 0,
        x: 50,
        scrollTrigger: {
          trigger: config.sectionClass,
          start: `${((endFrame - 5) / config.frameCount) * 100}% top`,
          end: `${(endFrame / config.frameCount) * 100}% top`,
          scrub: 1
        }
      });
    });
  }

  // ─── Wait for GSAP to load ───────────────────────────────
  if (typeof gsap !== 'undefined') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof gsap !== 'undefined') {
        init();
      }
    });
  }

})();
