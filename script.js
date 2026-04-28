(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── reveal-on-scroll ─────────────────────────── */
  const targets = document.querySelectorAll(
    '.section, .hero__title, .hero__lede, .hero__cta, .stats, ' +
    '.tile, .card, .modules li, .audience li, .price, ' +
    '.about__photo, .about__body, .quote, .contact__left, .form, ' +
    '.footer__line'
  );
  targets.forEach(el => el.classList.add('reveal'));

  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    targets.forEach(el => io.observe(el));

    /* small staggered delay for groups */
    document.querySelectorAll('.grid, .modules, .audience ul, .voices, .stats')
      .forEach(group => {
        [...group.children].forEach((child, i) => {
          child.style.setProperty('--delay', `${i * 60}ms`);
        });
      });
  } else {
    targets.forEach(el => el.classList.add('is-in'));
  }

  /* ── nav burger (mobile) ───────────────────────── */
  const burger = document.querySelector('.nav__burger');
  const links  = document.querySelector('.nav__links');
  const closeMenu = () => {
    links?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    burger?.setAttribute('aria-expanded', 'false');
  };
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = !links.classList.contains('is-open');
      links.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeMenu();
    });
    /* close on viewport upsize past mobile breakpoint */
    matchMedia('(min-width: 981px)').addEventListener('change', (e) => {
      if (e.matches) closeMenu();
    });
    /* close on Escape */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ── form (client-side ack only) ───────────────── */
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name  = form.querySelector('#f-name')?.value.trim();
      const email = form.querySelector('#f-email')?.value.trim();
      if (!name || !email) {
        const first = !name ? form.querySelector('#f-name') : form.querySelector('#f-email');
        first?.focus();
        return;
      }
      const ack = form.querySelector('.form__ack');
      const btn = form.querySelector('button[type="submit"]');
      if (ack) ack.hidden = false;
      if (btn) btn.disabled = true;
      form.reset();
    });
  }
})();
