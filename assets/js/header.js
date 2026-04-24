// ═══════════════════════════════════════════════════════════════
// OVIA Header Interactions
// gnb.js가 inject 완료 후 'gnb:ready' 이벤트를 받아 실행
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function initHeader() {
    const header     = document.getElementById('site-header');
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!header) return;

    // ─── Scroll elevation ───
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ─── Mobile menu toggle ───
    hamburger?.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // ─── Mobile submenu accordion ───
    document.querySelectorAll('.mobile-gnb-trigger').forEach(trigger => {
      const activate = () => {
        const item = trigger.closest('.mobile-gnb-item');
        const isActive = item.classList.toggle('active');
        trigger.setAttribute('aria-expanded', String(isActive));
        // close siblings
        item.parentElement.querySelectorAll('.mobile-gnb-item').forEach(sib => {
          if (sib !== item) {
            sib.classList.remove('active');
            sib.querySelector('.mobile-gnb-trigger')?.setAttribute('aria-expanded', 'false');
          }
        });
      };
      trigger.addEventListener('click', activate);
      trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });
    });

    // ─── Close mobile on resize ───
    window.matchMedia('(min-width: 1100px)').addEventListener('change', e => {
      if (e.matches) {
        mobileMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
        hamburger?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // ─── Close mobile on outside click ───
    document.addEventListener('pointerdown', e => {
      if (
        mobileMenu?.classList.contains('active') &&
        !mobileMenu.contains(e.target) &&
        !hamburger?.contains(e.target)
      ) {
        mobileMenu.classList.remove('active');
        hamburger?.classList.remove('active');
        hamburger?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // ─── Language toggle ───
    document.querySelector('.lang-toggle')?.addEventListener('click', e => {
      const span = e.target.closest('span[role="button"]');
      if (!span) return;
      span.closest('.lang-toggle').querySelectorAll('span').forEach(s => {
        s.classList.remove('active');
        s.setAttribute('aria-pressed', 'false');
      });
      span.classList.add('active');
      span.setAttribute('aria-pressed', 'true');
    });

    // ─── GNB keyboard nav (Fluent) ───
    document.querySelectorAll('.gnb-item').forEach(item => {
      const trigger = item.querySelector('.gnb-trigger');
      const menu    = item.querySelector('.mega-menu');
      if (!trigger || !menu) return;

      // 호버로만 동작하도록 키보드 이벤트는 Escape만 처리
      trigger.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          trigger.blur();
        }
      });

      menu.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          trigger.blur();
        }
      });
    });
  }

  // gnb.js inject 완료 후 실행
  document.addEventListener('gnb:ready', initHeader);
  // fallback: gnb.js 없이 직접 헤더가 있는 경우
  if (document.getElementById('site-header')) initHeader();

})();
