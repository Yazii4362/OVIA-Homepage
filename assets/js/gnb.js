// ═══════════════════════════════════════════════════════════════
// OVIA GNB — Single source of truth
// 모든 페이지에서 <script src="assets/js/gnb.js"> 로 공통 사용
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ─── Navigation Data ───────────────────────────────────────
  const NAV = [
    {
      id: 'about',
      label: 'ABOUT US',
      items: [
        { ko: '회사소개',      en: 'Company Overview', href: 'about-us/overview.html' },
        { ko: '리더십',        en: 'Leadership',       href: 'about-us/leadership.html' },
        { ko: 'CI',            en: 'CI',               href: 'about-us/ci.html' },
        { ko: '연혁',          en: 'History',          href: 'about-us/history.html' },
        { ko: '찾아오시는 길', en: 'Contact',          href: 'about-us/contact.html' },
      ],
    },
    {
      id: 'rd',
      label: 'R&amp;D',
      items: [
        { ko: '연구분야',   en: 'Research Areas', href: 'rd/research.html' },
        { ko: '파이프라인', en: 'Pipeline',       href: 'rd/pipeline.html' },
        { ko: '파트너십',   en: 'Partnerships',   href: 'rd/partnerships.html' },
      ],
    },
    {
      id: 'business',
      label: 'BUSINESS',
      items: [
        { ko: '제품 정보',    en: 'Our Products',   href: 'business/products.html' },
        { ko: '판매약국찾기', en: 'Find a Pharmacy', href: 'business/pharmacy.html' },
        { ko: 'CMO',          en: 'CMO Services',   href: 'business/cmo.html' },
      ],
    },
    {
      id: 'patient',
      label: 'PATIENT SUPPORT',
      items: [
        { ko: '환자 지원 프로그램', en: 'Support Programs',   href: 'patient/programs.html' },
        { ko: '질환 정보',          en: 'Disease Information', href: 'patient/disease.html' },
        { ko: '임상시험 참여',      en: 'Clinical Trials',    href: 'patient/trials.html' },
        { ko: '의료진 지원',        en: 'For HCPs',           href: 'patient/hcp.html' },
      ],
    },
    {
      id: 'sustainability',
      label: 'SUSTAINABILITY',
      items: [
        { ko: 'Environmental', en: 'Environmental', href: 'sustainability/environmental.html' },
        { ko: 'Social',        en: 'Social',        href: 'sustainability/social.html' },
        { ko: 'Governance',    en: 'Governance',    href: 'sustainability/governance.html' },
        { ko: 'ESG Report',    en: 'ESG Report',    href: 'sustainability/esg-report.html' },
      ],
    },
    {
      id: 'ir',
      label: 'IR',
      items: [
        { ko: 'IR 정보',  en: 'IR Overview',  href: 'ir/overview.html' },
        { ko: '공시정보', en: 'Disclosures',  href: 'ir/disclosures.html' },
        { ko: '뉴스룸',   en: 'Newsroom',     href: 'ir/newsroom.html' },
      ],
    },
  ];

  // ─── Detect active section from current page ───────────────
  // pathname 예: /about-us/ci.html → 'about-us/ci'
  const pathParts = location.pathname.replace(/^\//, '').replace(/\.html$/, '');
  const getActiveId = () => {
    for (const nav of NAV) {
      if (nav.items.some(item => {
        const itemPath = item.href.replace(/\.html$/, '');
        return pathParts.endsWith(itemPath.split('/').pop()) ||
               pathParts === itemPath ||
               pathParts.startsWith(itemPath.split('/')[0]);
      })) {
        return nav.id;
      }
    }
    return null;
  };
  const activeId = getActiveId();

  // ─── Resolve href relative to site root ───────────────────
  // gnb.js 위치: assets/js/gnb.js (루트 기준 2단계 아래)
  // 서브페이지(about-us/, rd/ 등)에서도 올바른 경로를 만들기 위해
  // 현재 페이지 depth를 계산해 상대경로 prefix를 붙임
  const depth = location.pathname.replace(/^\//, '').split('/').length - 1;
  const rootPrefix = depth > 0 ? '../'.repeat(depth) : '';

  const resolveHref = href => rootPrefix + href;
  const chevronSVG = `<svg class="chevron" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;

  // ─── Build desktop GNB HTML ────────────────────────────────
  const buildDesktopGNB = () => {
    const navButtons = NAV.map(nav => {
      const isActive = nav.id === activeId;
      return `
        <div class="gnb-item${isActive ? ' active' : ''}" data-nav="${nav.id}">
          <button class="gnb-trigger"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="menu-${nav.id}">
            ${nav.label}
            ${chevronSVG}
          </button>
        </div>`;
    }).join('');

    const megaMenuColumns = NAV.map(nav => {
      const menuItems = nav.items.map(item => `
        <a href="${resolveHref(item.href)}">${item.ko}</a>`).join('');

      return `
        <div class="mega-menu" id="menu-${nav.id}">
          <div class="mega-menu-title">${nav.label}</div>
          ${menuItems}
        </div>`;
    }).join('');

    return `
      ${navButtons}
      <div class="mega-menu-backdrop">
        <div class="mega-menu-container">
          ${megaMenuColumns}
        </div>
      </div>`;
  };

  // ─── Build mobile menu HTML ────────────────────────────────
  const buildMobileMenu = () => {
    return NAV.map(nav => {
      const subItems = nav.items.map(item =>
        `<a href="${resolveHref(item.href)}">${item.ko}</a>`
      ).join('');

      return `
        <div class="mobile-gnb-item" data-nav="${nav.id}">
          <div class="mobile-gnb-trigger" role="button" tabindex="0"
            aria-expanded="false" aria-controls="mobile-sub-${nav.id}">
            ${nav.label}
            ${chevronSVG}
          </div>
          <div class="mobile-sub" id="mobile-sub-${nav.id}">
            ${subItems}
          </div>
        </div>`;
    }).join('');
  };

  // ─── Full header HTML ──────────────────────────────────────
  const headerHTML = `
    <header id="site-header">
      <div class="container">
        <div class="header-inner">

          <a href="${resolveHref('index.html')}" class="header-logo" aria-label="OVIA Pharmaceuticals 홈">
            <img src="${resolveHref('assets/images/ovia.png')}" alt="OVIA Pharmaceuticals" class="logo-img" />
          </a>

          <nav class="gnb" role="navigation" aria-label="주 메뉴">
            ${buildDesktopGNB()}
          </nav>

          <div class="header-right">
            <div class="lang-toggle" role="group" aria-label="언어 선택">
              <span class="active" role="button" tabindex="0" aria-pressed="true">KO</span>
              <span role="button" tabindex="0" aria-pressed="false">EN</span>
            </div>
            <button class="btn-icon header-search-btn" aria-label="검색">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" stroke-width="1.5"/>
                <path d="M12 12l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
            <button id="hamburger" class="hamburger" aria-label="메뉴 열기" aria-expanded="false" aria-controls="mobile-menu">
              <span></span><span></span><span></span>
            </button>
          </div>

        </div>
      </div>
    </header>

    <div id="mobile-menu" class="mobile-menu" role="dialog" aria-label="모바일 메뉴" aria-modal="true">
      <nav>
        ${buildMobileMenu()}
      </nav>
    </div>`;

  // ─── Inject into page ──────────────────────────────────────
  const placeholder = document.getElementById('gnb-placeholder');
  if (placeholder) {
    placeholder.outerHTML = headerHTML;
  } else {
    // fallback: prepend to body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  // ─── Init interactions (after injection) ──────────────────
  // Delegated to header.js — just fire a custom event
  document.dispatchEvent(new CustomEvent('gnb:ready'));

})();
