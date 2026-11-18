/* =========================================================================
   NAAM JAP · HOME  (live today strip)
   Fills the "Today" card on / with real numbers from the store - today's
   jap / malas / naam and the current streak - then fades the "Coming"
   placeholder out. Requires: store.js, shared.js (via feature).
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var F = NJ && NJ.feature;
  if (!NJ || !NJ.store || !F) return;

  function fmt(n) { return Number(n || 0).toLocaleString(); }

  function render() {
    var card = doc.getElementById('today-card');
    if (!card) return;
    var t = NJ.store.getToday();
    var s = F.streak();
    var d = NJ.store.load();
    var man = d.modules.sadhana.manual || {};
    var done = man[NJ.store.todayKey()] || (t.jap + t.malas + t.naam) > 0;

    card.innerHTML =
      '<span class="today__day" aria-hidden="true">॥</span>' +
      '<span class="today__mid">' +
      '<strong>' + (done ? 'Today\u2019s sadhana is underway' : 'A moment for today') + '</strong>' +
      '<span>' + fmt(t.jap) + ' jap · ' + fmt(t.malas) + ' malas · ' + fmt(t.naam) + ' written' +
      (s.current > 0 ? ' · ' + s.current + '-day streak' : '') + '</span>' +
      '</span>' +
      '<span class="pill pill--good">See sadhana</span>';
  }

  function esc(s) {
    return String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---- Hero mala: a finished 108-bead circle, not four beads ------------ */
  function buildHeroMala() {
    var svg = doc.querySelector('.hero__mala .mala__svg g');
    if (!svg) return;
    var NS = 'http://www.w3.org/2000/svg';
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var thread = doc.createElementNS(NS, 'circle');
    thread.setAttribute('cx', '100'); thread.setAttribute('cy', '100'); thread.setAttribute('r', '80');
    svg.appendChild(thread);
    for (var i = 0; i < 108; i++) {
      var a = (i / 108) * Math.PI * 2 - Math.PI / 2;
      var b = doc.createElementNS(NS, 'circle');
      b.setAttribute('cx', (100 + 80 * Math.cos(a)).toFixed(2));
      b.setAttribute('cy', (100 + 80 * Math.sin(a)).toFixed(2));
      b.setAttribute('r', '3.4');
      b.setAttribute('fill', 'var(--accent)');
      b.setAttribute('stroke', 'none');
      svg.appendChild(b);
    }
    var meru = doc.createElementNS(NS, 'circle');
    meru.setAttribute('cx', '100'); meru.setAttribute('cy', '20'); meru.setAttribute('r', '10');
    meru.setAttribute('fill', 'var(--accent-strong)');
    meru.setAttribute('stroke', 'none');
    svg.appendChild(meru);
  }

  /* ---- Homepage previews: real mantra and stotra cards, not teasers ----- */
  function renderHomeMantras() {
    var grid = doc.getElementById('home-mantra-grid');
    if (!grid || !global.NAAM_JAP_CONFIG || !global.NAAM_JAP_CONFIG.mantras) return;
    var mantras = global.NAAM_JAP_CONFIG.mantras;
    var pick = ['ram', 'radha', 'krishna', 'om-namah-shivay'];
    var list = pick.map(function (id) {
      for (var i = 0; i < mantras.length; i++) if (mantras[i].id === id) return mantras[i];
      return null;
    }).filter(function (m) { return m; });
    grid.innerHTML = list.map(function (m) {
      return '<a class="mantra-card" href="/mantra/' + esc(m.id) + '/">' +
        '<span class="mantra-card__top"><span class="mantra-card__glyph" aria-hidden="true">' + esc(m.dev) + '</span>' +
        '<span class="mantra-card__cat">' + esc(m.category) + '</span></span>' +
        '<h3>' + esc(m.name) + '</h3>' +
        '<span class="mantra-card__text" aria-hidden="true">' + esc(m.text) + '</span>' +
        '<span class="mantra-card__tr">' + esc(m.transliteration) + '</span>' +
        '<span class="mantra-card__mean">' + esc(m.meaning) + '</span>' +
        '<span class="mantra-card__view">Read &amp; jap →</span>' +
        '<span class="mantra-card__brand">By CA Anshul Karwa</span>' +
        '</a>';
    }).join('');
  }

  function renderHomeStotras() {
    var grid = doc.getElementById('home-stotra-grid');
    if (!grid || !global.NAAM_JAP_STOTRAS) return;
    var all = global.NAAM_JAP_STOTRAS;
    var pick = ['hanuman-chalisa', 'shiv-tandav', 'durga-chalisa', 'vishnu-chalisa'];
    var list = pick.map(function (id) {
      for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
      return null;
    }).filter(function (s) { return s; });
    grid.innerHTML = list.map(function (s) {
      return '<a class="stotra-card" href="/stotra/' + esc(s.id) + '/">' +
        '<div class="stotra-card__top"><span class="stotra-card__type">' + esc(s.type) + '</span></div>' +
        '<span class="stotra-card__name-dev">' + esc(s.nameDev) + '</span>' +
        '<h3>' + esc(s.name) + '</h3>' +
        '<span class="stotra-card__deity">' + esc(s.deityName) + ' · ' + esc(s.deityDev) + '</span>' +
        '<span class="stotra-card__cta">Read &amp; recite →</span>' +
        '<span class="stotra-card__brand">By CA Anshul Karwa</span>' +
        '</a>';
    }).join('');
  }

  function init() {
    render();
    buildHeroMala();
    renderHomeMantras();
    renderHomeStotras();
  }

  /* ---- PWA install prompt --------------------------------------------------- */
  var deferredPrompt = null;
  global.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    var btn = doc.getElementById('pwa-install-btn');
    if (btn) {
      btn.style.display = '';
      btn.addEventListener('click', function () {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function () { deferredPrompt = null; btn.style.display = 'none'; });
      });
    }
  });

  if (global.matchMedia && global.matchMedia('(display-mode: standalone)').matches) {
    var sec = doc.getElementById('install-section');
    if (sec) sec.style.display = 'none';
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);