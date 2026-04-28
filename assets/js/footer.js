// ═══════════════════════════════════════════════════════════════
// OVIA Footer — Single source of truth
// 모든 페이지에서 <script src="assets/js/footer.js"> 로 공통 사용
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ─── Depth-aware root prefix (gnb.js와 동일 로직) ──────────
  const depth = location.pathname.replace(/^\//, '').split('/').length - 1;
  const root  = depth > 0 ? '../'.repeat(depth) : '';

  const r = href => root + href; // resolve helper

  // ─── Pre-footer Banner CSS (동적 주입) ────────────────────
  const bannerCSS = `
  .prefooter-banner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 220px;
    max-width: 1440px;
    margin: 0 auto;
  }

  .pfb-item {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    padding: 48px 56px;
    text-decoration: none;
    transition: filter 0.35s ease;
  }
  .pfb-item:hover { filter: brightness(1.08); }
  .pfb-item:hover .pfb-arrow { transform: translateX(6px); }

  /* 왼쪽 — Pipeline (다크 네이비 → 레드) */
  .pfb-item--pipeline {
    background: linear-gradient(125deg, #0F172A 0%, #1e1b4b 40%, #7f1d1d 80%, #C8372D 100%);
  }

  /* 노이즈 텍스처 오버레이 느낌 */
  .pfb-item--pipeline::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 80% 50%, rgba(200,55,45,0.25) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 20% 80%, rgba(99,102,241,0.15) 0%, transparent 60%);
    pointer-events: none;
  }

  /* 오른쪽 — HCPs (딥 틸 → 미드나잇 그린) */
  .pfb-item--hcp {
    background: linear-gradient(125deg, #042f2e 0%, #0f4c41 35%, #134e4a 65%, #2D8A7A 100%);
  }

  .pfb-item--hcp::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 55% 70% at 85% 40%, rgba(45,138,122,0.3) 0%, transparent 65%),
      radial-gradient(ellipse 35% 50% at 15% 90%, rgba(6,182,162,0.12) 0%, transparent 55%);
    pointer-events: none;
  }

  /* 장식 원형 — 배경 디테일 */
  .pfb-item::after {
    content: '';
    position: absolute;
    right: -60px;
    top: -60px;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.06);
    pointer-events: none;
  }

  .pfb-content {
    position: relative;
    z-index: 1;
  }

  .pfb-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 14px;
  }
  .pfb-eyebrow::before {
    content: '';
    width: 18px;
    height: 1.5px;
    background: currentColor;
    border-radius: 2px;
  }

  .pfb-title {
    font-size: clamp(22px, 2.5vw, 32px);
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }

  .pfb-title em {
    font-style: normal;
    color: rgba(255,255,255,0.6);
    font-weight: 400;
    font-size: 0.7em;
    display: block;
    margin-top: 4px;
    letter-spacing: 0;
  }

  .pfb-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    letter-spacing: 0.04em;
  }

  .pfb-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.35);
    transition: transform 0.25s ease;
  }

  /* 장식 아이콘 (우측 상단) */
  .pfb-deco {
    position: absolute;
    right: 48px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.12;
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 768px) {
    .prefooter-banner { grid-template-columns: 1fr; }
    .pfb-item { padding: 40px 32px; min-height: 160px; }
    .pfb-deco { display: none; }
  }
  `;

  // CSS 주입
  const styleEl = document.createElement('style');
  styleEl.textContent = bannerCSS;
  document.head.appendChild(styleEl);

  // ─── Pre-footer Banner HTML ───────────────────────────────
  const bannerHTML = `
  <div class="prefooter-banner" role="complementary" aria-label="주요 링크 배너">

    <!-- 왼쪽: Pipeline -->
    <a href="${r('rd/pipeline.html')}" class="pfb-item pfb-item--pipeline" aria-label="파이프라인 페이지로 이동">
      <!-- 장식 원 -->
      <svg class="pfb-deco" width="320" height="320" viewBox="0 0 320 320" fill="none" aria-hidden="true">
        <circle cx="160" cy="160" r="159" stroke="white" stroke-width="1"/>
        <circle cx="160" cy="160" r="110" stroke="white" stroke-width="1"/>
        <circle cx="160" cy="160" r="60" stroke="white" stroke-width="1"/>
        <line x1="0" y1="160" x2="320" y2="160" stroke="white" stroke-width="0.5"/>
        <line x1="160" y1="0" x2="160" y2="320" stroke="white" stroke-width="0.5"/>
      </svg>

      <div class="pfb-content">
        <p class="pfb-eyebrow">R&amp;D Innovation</p>
        <h2 class="pfb-title">
          혁신 신약 파이프라인
          <em>38 Pipelines in Progress</em>
        </h2>
        <span class="pfb-cta">
          파이프라인 현황 보기
          <span class="pfb-arrow" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </span>
      </div>
    </a>

    <!-- 오른쪽: HCPs -->
    <a href="${r('patient-support/hcp.html')}" class="pfb-item pfb-item--hcp" aria-label="의료진 전용 정보 페이지로 이동">
      <!-- 장식 십자 -->
      <svg class="pfb-deco" width="300" height="300" viewBox="0 0 300 300" fill="none" aria-hidden="true">
        <rect x="120" y="30" width="60" height="240" rx="8" stroke="white" stroke-width="1"/>
        <rect x="30" y="120" width="240" height="60" rx="8" stroke="white" stroke-width="1"/>
        <circle cx="150" cy="150" r="140" stroke="white" stroke-width="0.5"/>
      </svg>

      <div class="pfb-content">
        <p class="pfb-eyebrow">Healthcare Professionals</p>
        <h2 class="pfb-title">
          의료진 전용 정보
          <em>For HCPs — Clinical Data &amp; Resources</em>
        </h2>
        <span class="pfb-cta">
          HCP 센터 바로가기
          <span class="pfb-arrow" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </span>
      </div>
    </a>

  </div>`;

  // ─── Footer HTML ───────────────────────────────────────────
  const footerHTML = `
  <footer class="site-footer">

    <!-- ① 상단 Nav 컬럼 -->
    <div class="footer-nav-area">
      <div class="footer-container">
        <div class="footer-nav-grid">

          <div class="footer-col">
            <h4 class="footer-col-title"><a href="${r('about-us/overview.html')}">회사소개</a></h4>
            <ul>
              <li><a href="${r('about-us/overview.html')}">기업소개</a></li>
              <li><a href="${r('about-us/leadership.html')}">인사말</a></li>
              <li><a href="${r('about-us/history.html')}">연혁</a></li>
              <li><a href="${r('about-us/ci.html')}">CI</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-col-title"><a href="${r('rd/research.html')}">R&amp;D</a></h4>
            <ul>
              <li><a href="${r('rd/research.html')}">연구분야</a></li>
              <li><a href="${r('rd/pipeline.html')}">파이프라인</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-col-title"><a href="${r('ir/newsroom.html')}">뉴스룸</a></h4>
            <ul>
              <li><a href="${r('ir/newsroom.html')}">뉴스룸 메인</a></li>
              <li><a href="${r('ir/overview.html')}">IR 정보</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-col-title"><a href="${r('sustainability/esg-report.html')}">지속가능경영</a></h4>
            <ul>
              <li><a href="${r('sustainability/esg-report.html')}">Overview</a></li>
              <li><a href="${r('sustainability/esg-report.html')}">Environmental</a></li>
              <li><a href="${r('sustainability/esg-report.html')}">Social</a></li>
              <li><a href="${r('sustainability/esg-report.html')}">Governance</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-col-title footer-col-title--ext">
              <a href="${r('about-us/contact.html')}">인재채용 <span class="footer-ext-arrow">↗</span></a>
            </h4>
          </div>

        </div><!-- /.footer-nav-grid -->

        <!-- TOP 버튼 -->
        <button class="footer-top-btn" id="footer-top-btn" aria-label="페이지 상단으로">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 12V4M4 7l4-4 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>TOP</span>
        </button>
      </div>
    </div><!-- /.footer-nav-area -->

    <!-- ② 구분선 + 유틸 링크 & SNS -->
    <div class="footer-util-area">
      <div class="footer-container footer-util-inner">
        <nav class="footer-util-links" aria-label="하단 유틸 메뉴">
          <a href="#">개인정보처리방침</a>
          <a href="#">사이트맵</a>
          <a href="${r('about-us/contact.html')}">찾아오시는 길</a>
          <a href="#">문의하기</a>
          <a href="#">공지사항</a>
        </nav>
        <div class="footer-social" aria-label="소셜 미디어">
          <a href="#" class="footer-social-btn" aria-label="YouTube" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.8 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
          </a>
          <a href="#" class="footer-social-btn" aria-label="Instagram" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.2 3.3-1.7 4.8-5 5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-3.3-.2-4.8-1.7-5-5C2 16.6 2 16.2 2 13s0-3.6.1-4.9c.2-3.3 1.7-4.8 5-5C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7 .1 2.7.3.3 2.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.2 4.3 2.6 6.7 7 6.9 1.3.1 1.7.1 5 .1s3.7 0 5-.1c4.3-.2 6.7-2.6 6.9-7 .1-1.3.1-1.7.1-5s0-3.7-.1-5C23.8 2.7 21.4.3 17 .1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>
          </a>
          <a href="#" class="footer-social-btn" aria-label="Facebook" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23.1 10.1 24v-8.4H7.1v-3.5h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.5 0-1.9.9-1.9 1.8v2.2h3.3l-.5 3.5h-2.8V24C19.6 23.1 24 18.1 24 12.1z"/></svg>
          </a>
          <a href="#" class="footer-social-btn" aria-label="X (Twitter)" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.3 1.6h3.3l-7.3 8.3 8.6 11.5h-6.7l-5.2-6.8-6 6.8H1.7l7.8-8.9L1.1 1.6H8l4.8 6.3 5.5-6.3zm-1.2 17.8h1.8L6.9 3.4H5l11.1 16z"/></svg>
          </a>
          <a href="#" class="footer-social-btn" aria-label="블로그" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20 2H4C2.9 2 2 2.9 2 4v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 14H8v-2h8v2zm2-4H6v-2h12v2zm0-4H6V6h12v2z"/></svg>
          </a>
        </div>
      </div>
    </div><!-- /.footer-util-area -->

    <!-- ③ 최하단: 로고 + 카피라이트 -->
    <div class="footer-brand-area">
      <div class="footer-container footer-brand-inner">
        <a href="${r('index.html')}" class="footer-logo" aria-label="OVIA 홈">
          <img src="${r('assets/images/ovia.png')}" alt="OVIA Pharmaceuticals" />
        </a>
        <p class="footer-copyright">Copyright &copy; OVIA Pharmaceuticals. All rights reserved.</p>
      </div>
    </div><!-- /.footer-brand-area -->

  </footer>`;

  // ─── Inject ────────────────────────────────────────────────
  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.outerHTML = bannerHTML + footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', bannerHTML + footerHTML);
  }

  // ─── TOP 버튼 동작 ─────────────────────────────────────────
  document.addEventListener('click', function (e) {
    if (e.target.closest('#footer-top-btn')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

})();




