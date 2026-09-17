/* ============================
   个人展示平台 - 交互脚本
   包含：导航高亮、滚动揭示、打字机、移动端菜单
   ============================ */

(function () {
  'use strict';

  // ----- 年份 -----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- 滚动：导航高亮 & 背景变化 -----
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__links a');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // 1. 导航背景
    if (window.scrollY > 24) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }

    // 2. 当前板块高亮
    const scrollPos = window.scrollY + window.innerHeight * 0.3;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav__links a[href="#${id}"]`);
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- 移动端菜单 -----
  const menuBtn = document.getElementById('navMenu');
  const linksWrap = document.getElementById('navLinks');
  if (menuBtn && linksWrap) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('is-open');
      linksWrap.classList.toggle('is-open');
    });
    // 点击链接后关闭
    linksWrap.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('is-open');
        linksWrap.classList.remove('is-open');
      });
    });
  }

  // ----- 滚动揭示（IntersectionObserver） -----
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // ----- 技能进度条：根据 data-fill 的数字设置 --p 变量 -----
  document.querySelectorAll('.skill[data-fill]').forEach(skill => {
    const v = parseInt(skill.getAttribute('data-fill'), 10);
    if (!isNaN(v)) {
      skill.style.setProperty('--p', Math.max(0, Math.min(100, v)) + '%');
    }
  });

  // ----- Hero 打字机效果 -----
  const roleEl = document.querySelector('.hero__role-text');
  if (roleEl) {
    const original = roleEl.textContent.trim();
    const phrasesAttr = roleEl.getAttribute('data-phrases');
    const phrases = phrasesAttr
      ? phrasesAttr.split('|').map(s => s.trim()).filter(Boolean)
      : [original];

    let pi = 0;     // phrase index
    let ci = 0;     // char index
    let deleting = false;
    const typeSpeed = { type: 80, del: 40, hold: 1600 };

    function tick() {
      const cur = phrases[pi];
      if (!deleting) {
        ci++;
        roleEl.textContent = cur.slice(0, ci);
        if (ci >= cur.length) {
          deleting = true;
          setTimeout(tick, typeSpeed.hold);
          return;
        }
        setTimeout(tick, typeSpeed.type);
      } else {
        ci--;
        roleEl.textContent = cur.slice(0, ci);
        if (ci <= 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          setTimeout(tick, 320);
          return;
        }
        setTimeout(tick, typeSpeed.del);
      }
    }
    // 启动：先把内容清空，再开始打字
    roleEl.textContent = '';
    // 等待 reveal 动画一帧
    setTimeout(tick, 600);
  }

  // ----- 平滑滚动兜底（老浏览器） -----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 60;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

})();