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

  var carousel = document.getElementById('gallery-carousel');
  if (carousel) {
    var viewport = document.getElementById('gallery-viewport');
    var track = document.getElementById('gallery-track');
    var pauseButton = document.getElementById('gallery-toggle');
    var previousButton = document.getElementById('gallery-prev');
    var nextButton = document.getElementById('gallery-next');
    var slides = Array.prototype.slice.call(track.querySelectorAll('figure'));
    var slideIndex = 0;
    var paused = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var interval = null;

    function slideStep() {
      var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      return slides[0].getBoundingClientRect().width + gap;
    }

    function setPosition(animate) {
      track.style.transition = animate ? '' : 'none';
      track.style.transform = 'translateX(-' + Math.round(slideIndex * slideStep()) + 'px)';
      if (!animate) {
        track.offsetWidth;
        track.style.transition = '';
      }
    }

    function setupCarousel() {
      Array.prototype.slice.call(track.querySelectorAll('[data-gallery-clone]')).forEach(function (clone) {
        clone.parentNode.removeChild(clone);
      });
      var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
      var slideWidth = slides[0].getBoundingClientRect().width;
      var visibleCount = Math.max(1, Math.round((viewport.clientWidth + gap) / (slideWidth + gap)));
      slides.slice(0, visibleCount).forEach(function (slide) {
        var clone = slide.cloneNode(true);
        clone.setAttribute('data-gallery-clone', '');
        clone.setAttribute('aria-hidden', 'true');
        clone.classList.remove('reveal', 'visible');
        track.appendChild(clone);
      });
      slideIndex = 0;
      setPosition(false);
    }

    function moveNext() {
      if (slideIndex >= slides.length) {
        slideIndex = 0;
        setPosition(false);
      }
      slideIndex += 1;
      setPosition(true);
      if (slideIndex === slides.length) {
        window.setTimeout(function () {
          if (slideIndex === slides.length) {
            slideIndex = 0;
            setPosition(false);
          }
        }, 700);
      }
    }

    function movePrevious() {
      if (slideIndex === 0 || slideIndex === slides.length) {
        slideIndex = slides.length;
        setPosition(false);
        window.requestAnimationFrame(function () {
          slideIndex = slides.length - 1;
          setPosition(true);
        });
      } else {
        slideIndex -= 1;
        setPosition(true);
      }
    }

    function updateInterval() {
      if (interval) window.clearInterval(interval);
      interval = null;
      if (!paused) interval = window.setInterval(moveNext, 4200);
    }

    function updatePauseButton() {
      pauseButton.textContent = paused ? 'Play' : 'Pause';
      pauseButton.setAttribute('aria-pressed', paused ? 'true' : 'false');
      pauseButton.setAttribute('aria-label', paused ? 'Play automatic slideshow' : 'Pause automatic slideshow');
    }

    previousButton.addEventListener('click', function () {
      movePrevious();
      updateInterval();
    });
    nextButton.addEventListener('click', function () {
      moveNext();
      updateInterval();
    });
    pauseButton.addEventListener('click', function () {
      paused = !paused;
      updatePauseButton();
      updateInterval();
    });
    window.addEventListener('resize', function () {
      window.requestAnimationFrame(setupCarousel);
    });

    setupCarousel();
    updatePauseButton();
    updateInterval();
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
