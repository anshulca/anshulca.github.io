/* =========================================================================
   NAAM JAP · MANTRA LIBRARY  (/mantra/)
   Renders the mantra cards and filters from site.config.js (`mantras`).
   Each card links to its own page (/mantra/<id>/) with the full text,
   transliteration, meaning and a Begin-jap button. The detail page is
   implemented in js/mantra-detail.js.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var C = global.NAAM_JAP_CONFIG;
  var NJ = global.NJ;
  var F = NJ.feature;
  if (!C || !NJ.store || !F) { if (console) console.error('mantra: config/store/shared missing.'); return; }

  var $ = function (id) { return doc.getElementById(id); };
  var el = { filters: $('mnt-filters'), grid: $('mnt-grid') };

  var mantras = (C.mantras && C.mantras.length) ? C.mantras : [];
  var activeCat = 'all';
  var searchQuery = '';

  function esc(s) {
    return String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---- Filters ------------------------------------------------------------------ */
  function categories() {
    var out = [];
    for (var i = 0; i < mantras.length; i++) {
      var c = mantras[i].category || 'Other';
      if (out.indexOf(c) < 0) out.push(c);
    }
    return out;
  }

  function renderFilters() {
    if (!el.filters) return;
    var cats = ['all'].concat(categories());
    el.filters.innerHTML = '';
    cats.forEach(function (c) {
      var b = doc.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (c === activeCat ? ' is-selected' : '');
      b.setAttribute('aria-pressed', c === activeCat ? 'true' : 'false');
      b.textContent = c === 'all' ? 'All' : c;
      b.addEventListener('click', function () { activeCat = c; renderFilters(); renderGrid(); });
      el.filters.appendChild(b);
    });
  }

  /* ---- Cards --------------------------------------------------------------------- */
  function matchesSearch(m, q) {
    if (!q) return true;
    var lq = q.toLowerCase();
    return (m.name && m.name.toLowerCase().indexOf(lq) >= 0) ||
      (m.text && m.text.indexOf(q) >= 0) ||
      (m.dev && m.dev.indexOf(q) >= 0) ||
      (m.transliteration && m.transliteration.toLowerCase().indexOf(lq) >= 0) ||
      (m.category && m.category.toLowerCase().indexOf(lq) >= 0) ||
      (m.meaning && m.meaning.toLowerCase().indexOf(lq) >= 0);
  }

  function renderGrid() {
    if (!el.grid) return;
    var list = mantras.filter(function (m) { return (activeCat === 'all' || m.category === activeCat) && matchesSearch(m, searchQuery); });
    if (!list.length) { el.grid.innerHTML = '<p class="muted" style="text-align:center;padding:var(--space-7)">No mantras match that search.</p>'; return; }
    /* Cards are plain links to each mantra's own page, so a mantra can be
       shared, bookmarked and indexed. The one-line meaning is shown on
       the card itself. */
    el.grid.innerHTML = list.map(function (m) {
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

  /* ---- Init --------------------------------------------------------------------------- */
  function init() {
    var searchInput = $('mnt-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = this.value.trim();
        renderGrid();
      });
    }
    renderFilters();
    renderGrid();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);