// ===== ハンバーガーメニュー =====
(function () {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (!hamburger || !nav) return;

  function closeMenu() {
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  hamburger.addEventListener('click', function () {
    const open = nav.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
})();

// ===== 修理実績スライダー（矢印で横スクロール） =====
(function () {
  const track = document.getElementById('worksTrack');
  const prev = document.getElementById('worksPrev');
  const next = document.getElementById('worksNext');
  if (!track || !prev || !next) return;

  function step() {
    const card = track.querySelector('.work');
    if (!card) return 280;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 18);
    return card.getBoundingClientRect().width + gap;
  }
  prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
  next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
})();

// ===== スクロールで要素をフェードイン =====
(function () {
  if (!('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.trust__item, .work, .steps__item, .svc, .review, .ccard, .head');
  targets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(function (el) { io.observe(el); });
})();
