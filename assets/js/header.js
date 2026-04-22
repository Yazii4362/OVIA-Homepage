// ════════════════════════════════════════════════════════════════
// Header Navigation
// ════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ─── Mobile Menu Toggle ───
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  // ─── Mobile Submenu Toggle ───
  const mobileTriggers = document.querySelectorAll('.mobile-gnb-trigger');
  
  mobileTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.parentElement;
      parent.classList.toggle('active');
    });
  });

  // ─── Language Toggle ───
  const langToggle = document.querySelector('.lang-toggle');
  
  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      if (e.target.tagName === 'SPAN') {
        langToggle.querySelectorAll('span').forEach(span => {
          span.classList.remove('active');
        });
        e.target.classList.add('active');
      }
    });
  }

  // ─── Header Scroll Effect ───
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = 'var(--shadow-md)';
    } else {
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // ─── Close mobile menu on resize ───
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      hamburger?.classList.remove('active');
      mobileMenu?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

})();
