// ═══════════════════════════════════════════════════════════════
// OVIA Submenu — Section navigation with GSAP gradient effect
// .sub-visual 아래에 자동 주입 / GSAP 없으면 동적 로드
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ─── Depth-aware root ──────────────────────────────────────
  const depth = location.pathname.replace(/^\//, '').split('/').length - 1;
  const root  = depth > 0 ? '../'.repeat(depth) : '';
  const r = href => root + href;

  // ─── Section / Item Data ───────────────────────────────────
  // match 는 'dir/filename' 형태로 full-path 비교 → overview 중복 문제 해결
  const SECTIONS = [
    {
      id: 'about-us',
      items: [
        { label: '회사소개.',      href: 'about-us/overview.html', match: 'about-us/overview' },
        { label: 'CI.',            href: 'about-us/ci.html',       match: 'about-us/ci'       },
        { label: '연혁.',          href: 'about-us/history.html',  match: 'about-us/history'  },
        { label: '찾아오시는 길.', href: 'about-us/contact.html',  match: 'about-us/contact'  },
      ]
    },
    {
      id: 'rd',
      items: [
        { label: '연구분야.',   href: 'rd/research.html', match: 'rd/research' },
        { label: '파이프라인.', href: 'rd/pipeline.html', match: 'rd/pipeline' },
      ]
    },
    {
      id: 'ir',
      items: [
        { label: 'IR 정보.', href: 'ir/overview.html',  match: 'ir/overview'  },
        { label: '뉴스룸.',  href: 'ir/newsroom.html',  match: 'ir/newsroom'  },
      ]
    },
    {
      id: 'sustainability',
      items: [
        { label: 'ESG Report.', href: 'sustainability/esg-report.html', match: 'sustainability/esg-report' },
      ]
    }
  ];

  // ─── Detect active page (full-path) ────────────────────────
  // e.g. /about-us/ci.html → 'about-us/ci' / /ir/overview.html → 'ir/overview'
  const path = location.pathname.toLowerCase().replace(/\.html$/, '');

  let currentSection = null;
  let currentMatch   = null;

  outer:
  for (const section of SECTIONS) {
    for (const item of section.items) {
      if (path.endsWith(item.match) || path.includes('/' + item.match)) {
        currentSection = section;
        currentMatch   = item.match;
        break outer;
      }
    }
  }

  if (!currentSection) return; // 해당 없는 페이지 → 종료

  // ─── Build HTML ────────────────────────────────────────────
  const activeIdx = currentSection.items.findIndex(i => i.match === currentMatch);
  const items     = currentSection.items;

  const itemsHTML = items.map((item, idx) => {
    const isActive = idx === activeIdx;
    return `<a href="${r(item.href)}"
               class="ov-sm-item${isActive ? ' active' : ''}"
               aria-current="${isActive ? 'page' : 'false'}">
               <span>${item.label}</span>
             </a>`;
  }).join('');

  const submenuHTML = `
  <div class="ov-submenu" aria-label="섹션 내 메뉴">
    <div class="ov-submenu-inner" id="ov-submenu-inner">
      ${itemsHTML}
    </div>
  </div>`;

  // ─── Inject CSS ────────────────────────────────────────────
  const css = `
  .ov-submenu {
    width: 100%;
    background: #f4f3f0;
    border-bottom: 1px solid #e8e6e1;
    padding: 40px 0 32px;
    overflow: hidden;
  }

  /* active 항목이 중앙에 오도록: 좌우 50vw 패딩 + scrollLeft 조정 */
  .ov-submenu-inner {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 0 50vw;
    box-sizing: content-box;
  }
  .ov-submenu-inner::-webkit-scrollbar { display: none; }

  .ov-sm-item {
    text-decoration: none;
    font-family: 'DM Sans', 'Pretendard', sans-serif;
    font-size: clamp(44px, 6.5vw, 100px);
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1;
    display: inline-block;
    padding: 0 20px;
    flex-shrink: 0;
    overflow: hidden;
  }

  .ov-sm-item span {
    display: inline-block;
    color: #ccc;
    transition: color 0.25s;
  }
  .ov-sm-item:not(.active):hover span { color: #aaa; }

  /* OVIA 포인트 컬러: Gray → Red → Teal */
  .ov-sm-item.active span {
    background: linear-gradient(
      to right,
      #bbb    30%,
      #C8372D 58%,
      #2D8A7A 100%
    );
    background-size: 260% auto;
    background-position: 0% center;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @media (max-width: 768px) {
    .ov-submenu { padding: 28px 0 20px; }
    .ov-sm-item { padding: 0 14px; }
  }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── Insert after .sub-visual ──────────────────────────────
  const subVisual = document.querySelector('.sub-visual');
  if (subVisual) {
    subVisual.insertAdjacentHTML('afterend', submenuHTML);
  } else {
    document.body.insertAdjacentHTML('afterbegin', submenuHTML);
  }

  // ─── Active 항목을 정중앙으로 스크롤 ──────────────────────
  requestAnimationFrame(() => {
    const wrap   = document.getElementById('ov-submenu-inner');
    const active = document.querySelector('.ov-sm-item.active');
    if (!wrap || !active) return;

    // active 항목 중심 − 컨테이너 반폭 = scrollLeft
    const itemCenter = active.offsetLeft + active.offsetWidth / 2;
    const halfWrap   = wrap.clientWidth / 2;
    wrap.scrollLeft  = itemCenter - halfWrap;
  });

  // ─── GSAP Animations ───────────────────────────────────────
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // ① 글자: 아래에서 위로 올라오며 등장
    gsap.from('.ov-sm-item span', {
      y: 80,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.ov-submenu',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    // ② 활성 항목: 스크롤에 따라 그라데이션 채워짐 (scrub)
    gsap.to('.ov-sm-item.active span', {
      backgroundPosition: '100% center',
      ease: 'none',
      scrollTrigger: {
        trigger: '.ov-submenu',
        start: 'top 70%',
        end: 'bottom 25%',
        scrub: 1.2
      }
    });
  }

  // GSAP 이미 로드됐으면 바로, 없으면 CDN 동적 로드
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    initGSAP();
  } else {
    const s1 = document.createElement('script');
    s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    s1.onload = function () {
      const s2 = document.createElement('script');
      s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
      s2.onload = initGSAP;
      document.head.appendChild(s2);
    };
    document.head.appendChild(s1);
  }

})();
