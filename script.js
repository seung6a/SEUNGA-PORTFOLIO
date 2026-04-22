/* ============================================================
   손승아 포트폴리오 - script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. CUSTOM CURSOR ─────────────────────────── */
  const cursor       = document.getElementById('cursor');
  const cursorFollow = document.getElementById('cursorFollower');

  let mouseX = 0, mouseY = 0;
  let followX = 0, followY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower
  function animateCursor() {
    followX += (mouseX - followX) * 0.12;
    followY += (mouseY - followY) * 0.12;
    cursorFollow.style.left = followX + 'px';
    cursorFollow.style.top  = followY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover effect on links/buttons
  document.querySelectorAll('a, button, .port-card, .sns-card, .art-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform       = 'translate(-50%, -50%) scale(2)';
      cursorFollow.style.transform = 'translate(-50%, -50%) scale(1.4)';
      cursor.style.background      = 'var(--purple)';
      cursorFollow.style.borderColor = 'var(--purple)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform       = 'translate(-50%, -50%) scale(1)';
      cursorFollow.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background      = 'var(--pink)';
      cursorFollow.style.borderColor = 'var(--pink)';
    });
  });

  /* ── 2. NAVBAR: scroll + active section ─────── */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Highlight active link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-sec') === current);
    });
  });

  /* ── 3. HAMBURGER MENU ────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobMenu   = document.getElementById('mobMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mob-a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobMenu.classList.remove('open');
    });
  });

  /* ── 4. SCROLL REVEAL ────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => ro.observe(el));

  // Hero elements are always visible
  document.querySelectorAll('.s-home .reveal').forEach(el => el.classList.add('vis'));

  /* ── 5. DONUT SKILL CHARTS ────────────────────── */
  const CIRCUMFERENCE = 2 * Math.PI * 52; // 326.7

  function animateDonuts() {
    document.querySelectorAll('.skill-donut-wrap').forEach(wrap => {
      const fill  = wrap.querySelector('.donut-fill');
      const pct   = parseInt(fill.getAttribute('data-pct') || 0);
      const color = fill.getAttribute('data-color') || '#FF6B9D';
      const offset = CIRCUMFERENCE * (1 - pct / 100);
      fill.style.stroke = color;
      fill.style.strokeDashoffset = offset;
    });
  }

  const skillSection = document.querySelector('.s-skills');
  if (skillSection) {
    const so = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateDonuts();
        so.disconnect();
      }
    }, { threshold: 0.2 });
    so.observe(skillSection);
  }

  /* ── 6. SMOOTH SCROLL FOR ALL ANCHOR LINKS ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href   = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 8;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── 7. SCROLL-TOP FOOTER ─────────────────────── */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 8. CARD TILT (portfolio & artwork) ─────── */
  document.querySelectorAll('.port-card, .art-card, .sns-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(600px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-6px)`;
      card.style.transition = 'box-shadow 0.3s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s';
    });
  });

  /* ── 9. PAGE FADE-IN ─────────────────────────── */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.45s ease';
  requestAnimationFrame(() => {
    setTimeout(() => { document.body.style.opacity = '1'; }, 60);
  });

  /* ── 10. FLOATING DECO STARS MOUSEMOVE ──────── */
  const decoStars = document.querySelectorAll('.deco-star');
  window.addEventListener('mousemove', e => {
    const mx = (e.clientX / window.innerWidth  - 0.5) * 20;
    const my = (e.clientY / window.innerHeight - 0.5) * 20;
    decoStars.forEach((star, i) => {
      const factor = (i + 1) * 0.5;
      star.style.transform = `translate(${mx * factor}px, ${my * factor}px)`;
    });
  });

});
