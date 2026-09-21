/* =========================================================================
   NAAM JAP · CORE
   Renders the global header, mobile drawer and footer from site.config.js.
   Also handles theme, header scroll state, active-link and PWA registration.
   Include AFTER site.config.js.
   ========================================================================= */
(function (global) {
  'use strict';

  var C = global.NAAM_JAP_CONFIG;
  if (!C) { if (console && console.error) console.error('NAAM_JAP_CONFIG not loaded.'); return; }

  var doc = global.document;
  var ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h12"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };

  var b = C.brand;
  var v = C.nav;

  /* ---- Active link detection ------------------------------------------- */
  function isActive(url) {
    var cur = global.location.pathname.replace(/\/?index\.html$/, '');
    if (!cur) cur = '/';
    if (url === '/') return cur === '/';
    return cur === url || cur.indexOf(url) === 0;
  }

  /* ---- Brand lockup ------------------------------------------------------ */
  function brandHTML(klass) {
    var mark =
      '<svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">' +
      '<g fill="none" stroke="currentColor" stroke-width="2">' +
      '<circle cx="20" cy="20" r="15"/>' +
      '<path d="M20 5 A15 15 0 0 1 34.8 20" opacity=".45"/>' +
      '<circle cx="20" cy="5" r="3.4" fill="currentColor" stroke="none"/>' +
      '</g></svg>';
    return '<a class="brand ' + (klass || '') + '" href="/" aria-label="' + esc(b.name) + ' - home">' +
      mark +
      '<span class="brand__text"><span class="brand__name">' + esc(b.name) + '</span>' +
      '<span class="brand__dev">' + esc(b.byline || b.devanagari) + '</span></span></a>';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---- Theme ------------------------------------------------------------- */
  var THEME_KEY = 'naamjap.theme';
  function applyTheme(theme) {
    doc.documentElement.setAttribute('data-theme', theme);
    var btn = doc.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  function initTheme() {
    var stored;
    try { stored = global.localStorage.getItem(THEME_KEY); } catch (e) {}
    // Default to light theme. Manual toggle persists and wins.
    applyTheme(stored || 'light');
  }

  /* ---- Header ------------------------------------------------------------- */
  function buildHeader() {
    var slot = doc.querySelector('[data-chrome="header"]');
    if (!slot) return;

    var nav = v.primary.map(function (item) {
      var active = isActive(item.url);
      return '<li><a href="' + item.url + '"' + (active ? ' aria-current="page"' : '') + '>' +
        esc(item.label) + (item.devanagari ? ' <span class="dev-caret">' + esc(item.devanagari) + '</span>' : '') +
        '</a></li>';
    }).join('');

    slot.className = 'site-header';
    slot.innerHTML =
      '<div class="container site-header__inner">' +
        brandHTML() +
        '<nav class="site-nav" aria-label="Primary"><ul>' + nav + '</ul></nav>' +
        '<div class="site-header__actions">' +
          '<button type="button" id="theme-toggle" class="icon-btn" aria-label="Toggle theme"></button>' +
          '<button type="button" id="nav-open" class="icon-btn hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="site-drawer"></button>' +
          '<a class="btn btn--primary btn--sm" href="' + v.cta.url + '" style="display:none">' + esc(v.cta.label) + '</a>' +
        '</div>' +
      '</div>';
    // CTA shown on desktop only
    var cta = slot.querySelector('.btn--primary'); if (cta) cta.style.removeProperty('display');

    var toggle = slot.querySelector('#theme-toggle');
    if (toggle) {
      toggle.innerHTML = isDark() ? ICONS.sun : ICONS.moon;
      toggle.addEventListener('click', function () {
        var next = isDark() ? 'light' : 'dark';
        try { global.localStorage.setItem(THEME_KEY, next); } catch (e) {}
        applyTheme(next);
        toggle.innerHTML = next === 'dark' ? ICONS.sun : ICONS.moon;
      });
    }
    var navBtn = slot.querySelector('#nav-open');
    navBtn.innerHTML = ICONS.menu;
    navBtn.addEventListener('click', toggleDrawer);
  }
function isDark() {
    return doc.documentElement.getAttribute('data-theme') === 'dark';
  }

  /* ---- Mobile drawer ------------------------------------------------------ */
  var drawer;
  var navOpenBtn;
  function ensureDrawerContent() {
    var group = function (label, links) {
      return '<div class="drawer__group"><p class="drawer__label">' + label + '</p><ul class="drawer__links">' +
        links.map(function (item) {
          var active = isActive(item.url);
          return '<li><a href="' + item.url + '"' + (active ? ' aria-current="page"' : '') + '>' + esc(item.label) +
            (item.devanagari ? ' <span class="dev-caret">' + esc(item.devanagari) + '</span>' : '') + '</a></li>';
        }).join('') + '</ul></div>';
    };
    var legalGroup = group('Legal', v.legal);
    drawer.querySelector('.drawer__body').innerHTML =
      group('Practice', v.primary) +
      group('More', v.secondary) +
      legalGroup;
  }
  function toggleDrawer(force) {
    var open = force !== undefined ? force : !(drawer && drawer.classList.contains('is-open'));
    if (!drawer) return;
    drawer.classList.toggle('is-open', open);
    doc.body.style.overflow = open ? 'hidden' : '';
    if (navOpenBtn) navOpenBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (!open && navOpenBtn) navOpenBtn.focus();
  }
  function buildDrawer() {
    drawer = doc.createElement('div');
    drawer.id = 'site-drawer';
    drawer.className = 'drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.innerHTML =
      '<div class="drawer__scrim" data-close-drawer></div>' +
      '<aside class="drawer__panel">' +
        '<div class="drawer__head">' + brandHTML() +
          '<button type="button" data-close-drawer class="icon-btn" aria-label="Close menu"></button>' +
        '</div>' +
        '<div class="drawer__body"></div>' +
        '<div class="drawer__foot" style="padding:0 var(--page-gutter) var(--space-6)">' +
          '<a class="btn btn--primary btn--block" href="' + v.cta.url + '">' + esc(v.cta.label) + '</a>' +
        '</div>' +
      '</aside>';
    doc.body.appendChild(drawer);
    drawer.querySelector('.drawer__head .icon-btn').innerHTML = ICONS.close;
    ensureDrawerContent();
    drawer.querySelectorAll('[data-close-drawer]').forEach(function (el) { el.addEventListener('click', function () { toggleDrawer(false); }); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggleDrawer(false); });
  }

  /* ---- Footer -------------------------------------------------------------- */
  function buildFooter() {
    var slot = doc.querySelector('[data-chrome="footer"]');
    if (!slot) return;
    var f = C.footer;
    var creator = C.brand.creator || { name: 'CA Anshul Karwa', url: '#' };
    var creatorHtml = '<a href="' + esc(creator.url) + '" target="_blank" rel="noopener noreferrer">' + esc(creator.name) + '</a>';
    var social = (C.social || []).map(function (s) {
      return '<a href="' + esc(s.url) + '" aria-label="' + esc(s.label) + '" rel="noopener noreferrer">' + esc(s.label) + '</a>';
    }).join('');
    var copyright = f.copyright.replace('%CREATOR%', creatorHtml);

    var cols = f.cols.map(function (col) {
      return '<div><h4>' + esc(col.heading) + '</h4><ul>' +
        col.links.map(function (l) { return '<li><a href="' + esc(l.url) + '">' + esc(l.label) + '</a></li>'; }).join('') +
        '</ul></div>';
    }).join('');

    slot.className = 'site-footer';
    slot.innerHTML =
      '<div class="container site-footer__inner">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' + brandHTML() + '<p>' + esc(f.blurb) + '</p></div>' +
          '<div class="footer-cols">' + cols + '</div>' +
        '</div>' +
        '<div class="footer-meta">' +
          '<p>' + esc(f.note) + '</p>' +
          (social ? '<div class="footer-social">' + social + '</div>' : '') +
        '</div>' +
        '<div class="footer-meta" style="margin-top:var(--space-4);border-top:0;padding-top:0">' +
          '<p>' + copyright + '</p>' +
          '<div class="footer-privacy">' +
            v.legal.map(function (l) { return '<a href="' + esc(l.url) + '">' + esc(l.label) + '</a>'; }).join('') +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ---- Header scroll state ------------------------------------------------- */
  function initScrollHeader() {
    var header = doc.querySelector('[data-chrome="header"]');
    if (!header) return;
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        header.classList.toggle('is-scrolled', global.scrollY > 8);
        ticking = false;
      });
    }
    global.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- PWA registration ---------------------------------------------------- */
  function registerSW() {
    if (!('serviceWorker' in global.navigator)) return;
    if (!/^https?:$/.test(global.location.protocol)) return; // file:// skipped
    global.addEventListener('load', function () {
      global.navigator.serviceWorker.register('/sw.js').catch(function () { /* offline-only env - optional */ });
    });
  }

  /* ---- Footer copyright with creator credit -------------------------- */
  // Render creator credit into the copyright line.
  // Config has: copyright: '© 2026 Naam Jap · Made with care, in silence by %CREATOR%'
  function renderCopyright() {
    var c = C.legal.copyright || '© 2026 Naam Jap · Made with care, in silence';
    var creator = (C.brand.creator && C.brand.creator.name) || 'CA Anshul Karwa';
    var creatorUrl = (C.brand.creator && C.brand.creator.url) || '#';
    // Replace the %CREATOR% placeholder with a real <a> tag.
    var html = c.replace('%CREATOR%', '<a href="' + creatorUrl + '" target="_blank" rel="noopener noreferrer">' + creator + '</a>');
    return esc(html);
  }

  function aboutMeHTML() {
    var a = C.aboutMe;
    var avatar = a.photo
      ? '<div class="about-avatar"><img class="about-avatar__img" src="' + a.photo + '" alt="' + esc(a.name) + '" loading="lazy"></div>'
      : '<div class="about-avatar" aria-hidden="true"><span>' + esc(a.name.trim().charAt(0) || 'ॐ') + '</span></div>';
    var story = a.story.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
    var socialHtml = (C.social || []).filter(function (s) { return s.icon === 'linkedin' || s.icon === 'instagram' || s.icon === 'mail'; }).map(function (s) {
      var svg = s.icon === 'linkedin'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
        : s.icon === 'instagram'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-.1263-.058-1.689-.072-4.947-.072zM12 6.865c-2.797 0-5.07 2.273-5.07 5.071s2.273 5.071 5.07 5.071 5.07-2.273 5.07-5.071-2.273-5.07-5.07-5.07zm0 8.844c-2.083 0-3.778-1.695-3.778-3.778s1.695-3.777 3.778-3.777 3.777 1.695 3.777 3.777-1.695 3.778-3.777 3.778z"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
      return '<a href="' + esc(s.url) + '" aria-label="' + esc(s.label) + '" target="_blank" rel="noopener noreferrer" class="about-social-link">' + svg + '</a>';
    }).join('');

    var creds = a.credentials ? '<p class="about-credentials">' + esc(a.credentials) + '</p>' : '';

    var statsHtml = '';
    if (a.stats && a.stats.length) {
      statsHtml = '<div class="about-stats">' + a.stats.map(function (s) {
        return '<div class="about-stat"><span class="about-stat__value">' + esc(s.value) + '</span><span class="about-stat__label">' + esc(s.label) + '</span></div>';
      }).join('') + '</div>';
    }

    var capsHtml = '';
    if (a.capabilities && a.capabilities.length) {
      capsHtml = '<div class="about-caps">' + a.capabilities.map(function (c) {
        return '<div class="about-cap"><h4 class="about-cap__title">' + esc(c.title) + '</h4><p class="about-cap__desc">' + esc(c.desc) + '</p></div>';
      }).join('') + '</div>';
    }

    return '<div class="about-page">' +
      '<div class="about-profile">' +
        '<div class="about-profile__visual">' +
          avatar +
          '<div class="about-deco" aria-hidden="true"></div>' +
        '</div>' +
        '<div class="about-profile__info">' +
          '<h1 class="about-name">' + esc(a.name) + '</h1>' +
          '<p class="about-role">' + esc(a.role) + (a.location ? ' · ' + esc(a.location) : '') + '</p>' +
          '<div class="about-social-row">' + socialHtml + '</div>' +
          '<p class="about-intro">' + esc(a.shortIntro) + '</p>' +
        '</div>' +
      '</div>' +
      creds +
      statsHtml +
      capsHtml +
      '<div class="about-prose">' +
        '<section class="about-section" data-reveal>' +
          '<h2 class="about-section__title"><span class="about-section__glyph" aria-hidden="true">॥</span> My story</h2>' +
          '<div class="about-section__body">' + story + '</div>' +
        '</section>' +
        '<section class="about-section" data-reveal>' +
          '<h2 class="about-section__title"><span class="about-section__glyph" aria-hidden="true">॥</span> Why this website</h2>' +
          '<div class="about-section__body"><p>Consistency is everything in a daily practice - and it is the first thing that slips. A calm, private tool removes friction: no account, no dashboards judging you, no audience. Just you, the Name, and a faithful count.</p></div>' +
        '</section>' +
        '<section class="about-section" data-reveal>' +
          '<h2 class="about-section__title"><span class="about-section__glyph" aria-hidden="true">॥</span> My vision</h2>' +
          '<div class="about-section__body"><p>' + a.philosophy + '</p></div>' +
        '</section>' +
      '</div>' +
      '<div class="about-closing" data-reveal>' +
        '<span class="about-closing__glyph" aria-hidden="true">॥</span>' +
        '<blockquote class="about-closing__quote">' + a.message + '</blockquote>' +
      '</div>' +
    '</div>';
  }
  function platformHTML() {
    var p = C.platform;
    var a = C.aboutMe;
    var what = p.what.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('');
    var practices = p.practices.map(function (pr) {
      return '<div class="plat-feature" data-reveal>' +
        '<span class="plat-feature__num">' + esc(pr.num) + '</span>' +
        '<div class="plat-feature__body">' +
          '<h3 class="plat-feature__title">' + esc(pr.name) + '</h3>' +
          '<p class="plat-feature__desc">' + esc(pr.desc) + '</p>' +
        '</div>' +
      '</div>';
    }).join('');

    var mb = p.madeBy || {};
    var photo = mb.photo || a.photo || '';
    var avatarHtml = photo
      ? '<div class="plat-made-avatar"><img src="' + esc(photo) + '" alt="' + esc(a.name) + '" loading="lazy"></div>'
      : '';
    var linkedinUrl = '';
    (C.social || []).forEach(function (s) { if (s.icon === 'linkedin') linkedinUrl = s.url; });
    var creatorLink = linkedinUrl
      ? '<a href="' + esc(linkedinUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(a.name) + '</a>'
      : esc(a.name);

    return '<div class="plat-page">' +
      '<section class="plat-hero" data-reveal>' +
        '<div class="plat-hero__text">' +
          '<h1 class="plat-hero__title">What this is</h1>' +
          '<div class="plat-hero__body">' + what + '</div>' +
        '</div>' +
      '</section>' +

      '<section class="plat-features" data-reveal>' +
        '<div class="plat-section-head">' +
          '<span class="plat-section-head__glyph" aria-hidden="true">॥</span>' +
          '<h2>What you can do</h2>' +
        '</div>' +
        '<div class="plat-features__list">' + practices + '</div>' +
      '</section>' +

      '<section class="plat-made" data-reveal>' +
        '<div class="plat-section-head">' +
          '<span class="plat-section-head__glyph" aria-hidden="true">॥</span>' +
          '<h2>Made by</h2>' +
        '</div>' +
        '<div class="plat-made__inner">' +
          avatarHtml +
          '<div class="plat-made__info">' +
            '<h3 class="plat-made__name">' + esc(a.name) + '</h3>' +
            '<p class="plat-made__role">' + esc(a.role) + (a.location ? ' · ' + esc(a.location) : '') + '</p>' +
            '<p class="plat-made__intro">' + esc(mb.intro || '') + '</p>' +
            '<p class="plat-made__link">' + creatorLink + '</p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="plat-privacy" data-reveal>' +
        '<div class="plat-section-head">' +
          '<span class="plat-section-head__glyph" aria-hidden="true">॥</span>' +
          '<h2>Privacy, by design</h2>' +
        '</div>' +
        '<div class="plat-privacy__card">' +
          '<p class="plat-privacy__label">Your device → Your practice</p>' +
          '<p class="plat-privacy__text">' + esc(p.privacy) + '</p>' +
        '</div>' +
      '</section>' +

      (p.whyExists ? '<section class="plat-why" data-reveal>' +
        '<div class="plat-section-head">' +
          '<span class="plat-section-head__glyph" aria-hidden="true">॥</span>' +
          '<h2>Why it exists</h2>' +
        '</div>' +
        '<p class="plat-why__text">' + esc(p.whyExists) + '</p>' +
      '</section>' : '') +

      '<div class="plat-closing" data-reveal>' +
        '<span class="plat-closing__glyph" aria-hidden="true">॥</span>' +
        '<blockquote class="plat-closing__quote">' + esc(a.message) + '</blockquote>' +
        '<p class="plat-closing__attr">— ' + creatorLink + '</p>' +
      '</div>' +
    '</div>';
  }
  function renderContent() {
    doc.querySelectorAll('[data-content]').forEach(function (mount) {
      var key = mount.getAttribute('data-content');
      if (key === 'about-me') mount.innerHTML = aboutMeHTML();
      else if (key === 'platform') mount.innerHTML = platformHTML();
    });
  }

  /* ---- Maker line under the page headline -------------------------------- */
  // A quiet brand line directly beneath the top headline of every module and
  // sub-module page.
  function buildMaker() {
    var h = doc.querySelector('.page-hero h1') || doc.querySelector('main h1');
    if (!h) return;
    if (h.nextElementSibling && h.nextElementSibling.classList.contains('site-maker')) return;
    var p = doc.createElement('p');
    p.className = 'site-maker';
    p.textContent = 'Made by CA Anshul Karwa';
    h.insertAdjacentElement('afterend', p);
  }

  /* ---- Init ----------------------------------------------------------------- */
  function init() {
    initTheme();
    buildHeader();
    navOpenBtn = doc.getElementById('nav-open');
    buildDrawer();
    buildMaker();
    buildFooter();
    renderContent();
    initScrollHeader();
    registerSW();
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

  /* ---- Anti-copy / DevTools deterrent -------------------------------------- */
  (function () {
    var isProtected = true;
    function block(e) { if (isProtected) { e.preventDefault(); return false; } }
    function blockKeys(e) {
      if (!isProtected) return;
      var k = e.key || e.keyCode;
      if (e.ctrlKey && (k === 'u' || k === 85 || k === 's' || k === 83 || k === 'c' || k === 67 || k === 'a' || k === 65 || k === 'x' || k === 88 || k === 'p' || k === 80)) { e.preventDefault(); return false; }
      if (e.key === 'F12' || k === 123) { e.preventDefault(); return false; }
      if (e.ctrlKey && e.shiftKey && (k === 'i' || k === 73 || k === 'j' || k === 74 || k === 'c' || k === 67)) { e.preventDefault(); return false; }
      if (e.ctrlKey && e.shiftKey && (k === 'k' || k === 75)) { e.preventDefault(); return false; }
    }
    doc.addEventListener('contextmenu', block, { passive: false });
    doc.addEventListener('selectstart', block, { passive: false });
    doc.addEventListener('copy', block, { passive: false });
    doc.addEventListener('cut', block, { passive: false });
    doc.addEventListener('paste', block, { passive: false });
    doc.addEventListener('dragstart', block, { passive: false });
    doc.addEventListener('keydown', blockKeys, { passive: false });
    doc.body.style.userSelect = 'none';
    doc.body.style.webkitUserSelect = 'none';
    doc.body.style.msUserSelect = 'none';
    doc.body.style.mozUserSelect = 'none';

  })();

})(typeof window !== 'undefined' ? window : this);