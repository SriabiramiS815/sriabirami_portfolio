/* Portfolio interactions: theme, mobile menu, typing text, scroll effects, contact form */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage may be blocked */ }
    });
  }

  /* ---------- Mobile navigation ---------- */
  var nav = document.getElementById('site-nav');
  var burger = document.getElementById('nav-toggle');

  function setMenu(open) {
    if (!nav || !burger) return;
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (burger) {
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
  }
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Typing effect in the hero ---------- */
  var typed = document.getElementById('typed');
  if (typed && !reduceMotion) {
    var roles = (typed.getAttribute('data-roles') || '').split('|').filter(Boolean);
    if (roles.length > 1) {
      var roleIndex = 0, charIndex = roles[0].length, deleting = true;

      function tick() {
        var word = roles[roleIndex];
        if (deleting) {
          charIndex--;
        } else {
          charIndex++;
        }
        typed.textContent = word.slice(0, charIndex);

        var delay = deleting ? 38 : 75;
        if (!deleting && charIndex === word.length) {
          deleting = true;
          delay = 1800;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          delay = 350;
        }
        setTimeout(tick, delay);
      }
      // The first role stays fully visible for a moment before it starts to delete.
      setTimeout(tick, 2200);
    }
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el, i) {
      // Small stagger for siblings inside the same grid
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Highlight the nav link of the section in view ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = '#' + entry.target.id;
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Contact form (AJAX, falls back to normal post without JS) ---------- */
  var form = document.getElementById('contact-form');
  var statusEl = document.getElementById('form-status');
  var submitBtn = document.getElementById('submit-btn');

  function clearErrors() {
    form.querySelectorAll('.field').forEach(function (f) { f.classList.remove('invalid'); });
    form.querySelectorAll('[data-error-for]').forEach(function (p) { p.textContent = ''; });
    statusEl.textContent = '';
    statusEl.className = 'form-status';
  }

  function showErrors(errors) {
    Object.keys(errors).forEach(function (name) {
      var p = form.querySelector('[data-error-for="' + name + '"]');
      if (p) {
        p.textContent = errors[name].join(' ');
        p.closest('.field').classList.add('invalid');
      }
    });
  }

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : '';
  }

  if (form && statusEl && submitBtn && window.fetch) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      // Quick client-side checks (the server validates again)
      var data = new FormData(form);
      var clientErrors = {};
      if (!String(data.get('name') || '').trim()) clientErrors.name = ['Please enter your name.'];
      var email = String(data.get('email') || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) clientErrors.email = ['Please enter a valid email address.'];
      if (String(data.get('message') || '').trim().length < 10) clientErrors.message = ['Please write at least 10 characters.'];
      if (Object.keys(clientErrors).length) {
        showErrors(clientErrors);
        return;
      }

      var originalLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRFToken': getCookie('csrftoken') || String(data.get('csrfmiddlewaretoken') || '')
        },
        credentials: 'same-origin'
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (body) {
            return { ok: res.ok, body: body };
          });
        })
        .then(function (result) {
          if (result.ok && result.body.ok) {
            form.reset();
            statusEl.textContent = result.body.message;
            statusEl.className = 'form-status ok';
          } else if (result.body.errors) {
            showErrors(result.body.errors);
            statusEl.textContent = 'Please fix the highlighted fields.';
            statusEl.className = 'form-status err';
          } else {
            throw new Error('Request failed');
          }
        })
        .catch(function () {
          statusEl.textContent = 'Sorry, something went wrong. Please email me directly instead.';
          statusEl.className = 'form-status err';
        })
        .then(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
        });
    });
  }
})();
