// ═══════════════════════════════════════════════════════════════
// OVIA Main — Scroll animations + utilities
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ─── GSAP Scroll Animations ───
  gsap.registerPlugin(ScrollTrigger);

  // HERO
  gsap.timeline({
    scrollTrigger:{
      trigger:".hero-v2",
      start:"top top",
      end:"+=150%",
      scrub:1,
      pin:true
    }
  })
  .to(".hero-v2-image img",{
    scale:1.2,
    ease:"none"
  })
  .to(".hero-v2-title",{
    y:-100,
    opacity:0
  },0.5);

  // 텍스트 등장 (애플 스타일)
  gsap.from(".hero-v2-title",{
    y:50,
    opacity:0,
    duration:1,
    ease:"power3.out"
  });

  // R&D
  gsap.from(".section-title",{
    scrollTrigger:".rd-section",
    y:60,
    opacity:0,
    duration:1
  });
  
  gsap.from(".section-desc",{
    scrollTrigger:".rd-section",
    y:40,
    opacity:0,
    delay:0.2
  });

  // PRODUCT
  gsap.from(".product-box-img",{
    scrollTrigger:".product-section",
    y:80,
    opacity:0,
    duration:1
  });
  
  gsap.from(".product-section h3",{
    scrollTrigger:".product-section",
    x:40,
    opacity:0,
    delay:0.2
  });

  // ESG (분위기 전환)
  gsap.from(".esg-item",{
    scrollTrigger:".esg-section-v2",
    y:50,
    opacity:0,
    stagger:0.15
  });

  // NEWS
  gsap.from(".news-card",{
    scrollTrigger:".news-section",
    y:60,
    opacity:0,
    stagger:0.2
  });

  // CONTACT
  gsap.from(".contact-row",{
    scrollTrigger:".contact-section-v2",
    x:-50,
    opacity:0,
    stagger:0.2
  });

  // ─── Scroll animation (IntersectionObserver) ───
  const animateObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animateObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-animate]').forEach(el => {
    animateObserver.observe(el);
  });

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#' || id === '') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
