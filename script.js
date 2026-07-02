// ===== RoboBricks — interactions =====
(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');

  // Sticky nav shadow on scroll
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('.nav__links a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  // Reveal on scroll
  const reveals = document.querySelectorAll(
    '.section__head, .split__card, .card, .flow, .dev__copy, .code, .market__cat, .chips, .rev, .stat, .cta__inner'
  );
  reveals.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('is-in'), (i % 4) * 70);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Access form =====
  // To capture leads automatically (recommended), create a free form at
  // https://formspree.io and paste its endpoint below, e.g.:
  //   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/abcdwxyz';
  // While this stays empty, submitting opens a pre-filled email to CONTACT_EMAIL,
  // so the form works the moment the site is live.
  const FORMSPREE_ENDPOINT = '';
  const CONTACT_EMAIL = ['sroy27.ai', 'gmail.com'].join('@');

  const form = document.getElementById('accessForm');
  const note = document.getElementById('formNote');

  const setNote = (msg, ok) => {
    note.style.color = ok ? '' : '#ff6b6b';
    note.textContent = msg;
  };

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const role = String(data.get('role') || '').trim();

      if (!name || !email || !role) { setNote('Please complete every field.', false); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setNote('Please enter a valid work email.', false); return; }

      const submitBtn = form.querySelector('button[type="submit"]');

      // Path 1 — Formspree (serverless lead capture)
      if (FORMSPREE_ENDPOINT) {
        try {
          submitBtn.disabled = true;
          setNote('Sending…', true);
          const res = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: data,
          });
          if (res.ok) {
            form.reset();
            setNote(`Thanks, ${name} — you're on the early-access list. We'll be in touch.`, true);
          } else {
            setNote(`Couldn't submit right now — please email ${CONTACT_EMAIL}.`, false);
          }
        } catch (err) {
          setNote(`Network error — please email ${CONTACT_EMAIL}.`, false);
        } finally {
          submitBtn.disabled = false;
        }
        return;
      }

      // Path 2 — no backend yet: open a pre-filled email so nothing is lost
      const subject = encodeURIComponent(`RoboBricks early access — ${role}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nRole: ${role}\n\nI'd like early access to RoboBricks.`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setNote(`Thanks, ${name}! Your email app is opening — hit send and we'll be in touch.`, true);
      form.reset();
    });
  }

  // Demo "Install" buttons in hero panel
  document.querySelectorAll('.skill__install:not(.skill__install--done)').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.textContent = 'Installed';
      btn.classList.add('skill__install--done');
    });
  });
})();
