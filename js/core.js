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
    return '<a class="brand ' + (klass || '') + '" href="/" aria-label="' + esc(b.name) + ' — home">' +
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
    var prefers = global.matchMedia && global.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(stored || prefers);
    if (!stored) { try { global.localStorage.setItem(THEME_KEY, prefers); } catch (e) {} }
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
    slot.querySelector('#nav-open').addEventListener('click', toggleDrawer);
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
      global.navigator.serviceWorker.register('/sw.js').catch(function () { /* offline-only env — optional */ });
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
      ? '<div class="avatar"><img class="avatar--img" src="' + a.photo + '" alt="' + esc(a.name) + '" width="88" height="88"></div>'
      : '<div class="avatar" aria-hidden="true">' + esc(a.name.trim().charAt(0) || 'ॐ') + '</div>';
    var story = a.story.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
    return '<div class="about-hero">' +
      '<div class="about-hero__id">' + avatar +
        '<div><h1 class="page-hero__title" style="font-size:var(--text-2xl)">' + esc(a.name) + '</h1>' +
        '<p class="muted" style="margin-top:var(--space-1)">' + esc(a.role) + (a.location ? ' · ' + esc(a.location) : '') + '</p></div>' +
      '</div>' +
      '<p class="lead muted" style="max-width:60ch">' + esc(a.shortIntro) + '</p>' +
      '<div class="prose-body">' +
        '<h2>My story</h2>' + story +
        '<h2>Why this website</h2>' +
        '<p>Consistency is everything in a daily practice — and it is the first thing that slips. A calm, private tool removes friction: no account, no dashboards judging you, no audience. Just you, the Name, and a faithful count.</p>' +
        '<h2>My vision</h2>' +
        '<p>' + esc(a.philosophy) + '</p>' +
      '</div>' +
      '<div class="msg">' + esc(a.message) + '</div>' +
    '</div>';
  }
  function platformHTML() {
    var p = C.platform;
    var what = p.what.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('');
    var practices = p.practices.map(function (pr) {
      return '<li><span class="dev-glyph" aria-hidden="true">॥</span><div><b>' + esc(pr.name) + '</b><p>' + esc(pr.desc) + '</p></div></li>';
    }).join('');
    return '<div class="prose-body">' +
      '<h2>What this is</h2>' + what +
      '<h2>What you can do</h2>' +
      '<ul class="practice-list">' + practices + '</ul>' +
      '<h2>Privacy, by design</h2><p>' + esc(p.privacy) + '</p>' +
      '<div class="msg">' + esc(C.aboutMe.message) + '</div>' +
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

})(typeof window !== 'undefined' ? window : this);