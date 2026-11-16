/* Estavia landing page scripts */
(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Sticky header shadow on scroll
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 6px 20px rgba(0,0,0,.4)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

  // Reveal-on-scroll animation
  var revealTargets = document.querySelectorAll(
    '.intro-item, .service-card, .why-copy, .why-media, .gallery-grid figure, .contact-copy, .contact-form'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  // Contact form -> builds a WhatsApp / mailto message
  var form = document.getElementById('quote-form');
  var note = document.getElementById('form-note');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var text =
        'Hello Estavia,%0A%0AI would like a quote for: ' + encodeURIComponent(data.get('service')) +
        '%0AName: ' + encodeURIComponent(data.get('name')) +
        '%0APhone: ' + encodeURIComponent(data.get('phone')) +
        (data.get('email') ? '%0AEmail: ' + encodeURIComponent(data.get('email')) : '') +
        (data.get('message') ? '%0ADetails: ' + encodeURIComponent(data.get('message')) : '');

      // WhatsApp to the primary phone number (254...)
      window.open('https://wa.me/254750856829?text=' + text, '_blank');
      note.textContent = 'Opening WhatsApp with your request — press send there to complete it.';
      form.reset();
    });
  }

  // Footer year
  var year = document.getElementById('year');
  if (year) { year.textContent = new Date().getFullYear(); }
})();
