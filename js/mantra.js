/* =========================================================================
   NAAM JAP · MANTRA LIBRARY  (/mantra/)
   Renders the mantra cards and filters from site.config.js (`mantras`),
   opens a detail view with text, transliteration and meaning, and can
   hand the selected mantra straight to the jap counter.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var C = global.NAAM_JAP_CONFIG;
  var NJ = global.NJ;
  var F = NJ.feature;
  if (!C || !NJ.store || !F) { if (console) console.error('mantra: config/store/shared missing.'); return; }

  var $ = function (id) { return doc.getElementById(id); };
  var el = { filters: $('mnt-filters'), grid: $('mnt-grid'), modal: $('mnt-modal') };

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
    if (!list.length) { el.grid.innerHTML = '<p class="muted" style="text-align:center;padding:var(--space-7)">Nothing here yet.</p>'; return; }
    el.grid.innerHTML = list.map(function (m) {
      return '<button type="button" class="mantra-card" data-id="' + esc(m.id) + '">' +
        '<span class="mantra-card__top"><span class="mantra-card__glyph" aria-hidden="true">' + esc(m.dev) + '</span>' +
        '<span class="mantra-card__cat">' + esc(m.category) + '</span></span>' +
        '<h3>' + esc(m.name) + '</h3>' +
        '<span class="mantra-card__text" aria-hidden="true">' + esc(m.text) + '</span>' +
        '<span class="mantra-card__tr">' + esc(m.transliteration) + '</span>' +
        '<span class="mantra-card__view">Read &amp; jap →</span>' +
        '<span class="mantra-card__brand">By CA Anshul Karwa</span>' +
        '</button>';
    }).join('');
    el.grid.querySelectorAll('[data-id]').forEach(function (b) {
      b.addEventListener('click', function () { openDetail(b.getAttribute('data-id')); });
    });
  }

  /* ---- Detail modal ----------------------------------------------------------------- */
  var modal = null;
  function getModal() {
    if (!modal && NJ.Modal) modal = NJ.Modal('mnt-modal');
    return modal;
  }

  function openDetail(id) {
    var m = null;
    for (var i = 0; i < mantras.length; i++) if (mantras[i].id === id) { m = mantras[i]; break; }
    if (!m) { F.toast('Mantra not found'); return; }
    var md = getModal();
    if (!md) { F.toast('Detail view unavailable'); return; }
    md.panel.innerHTML =
      '<div class="modal__head"><h3>' + esc(m.name) + '</h3>' +
      '<button type="button" class="icon-btn" data-close aria-label="Close">✕</button></div>' +
      '<div class="mantra-detail">' +
      '<p class="mantra-detail__glyph" aria-hidden="true">' + esc(m.text) + '</p>' +
      '<p class="mantra-detail__tr">' + esc(m.transliteration) + '</p>' +
      '<div class="mantra-detail__mean"><b>Meaning</b><p>' + esc(m.meaning) + '</p></div>' +
      (m.note ? '<div class="mantra-detail__note">' + esc(m.note) + '</div>' : '') +
      '</div>' +
      '<div class="btn-group" style="margin-top:var(--space-5)">' +
      '<button type="button" class="btn btn--primary" data-jap>Begin jap with this mantra</button>' +
      '<button type="button" class="btn btn--ghost" data-close>Close</button>' +
      '</div>' +
      '<p style="text-align:center;margin-top:var(--space-4);font-size:0.65rem;color:var(--ink-faint)">By CA Anshul Karwa</p>';
    md.panel.querySelector('[data-jap]').addEventListener('click', function () { beginJap(m); md.close(); });
    md.panel.querySelectorAll('[data-close]').forEach(function (c) { c.addEventListener('click', function () { md.close(); }); });
    md.open();
  }

  /* ---- Hand the mantra to the jap counter -------------------------------------------- */
  function beginJap(m) {
    var d = NJ.store.load();
    d.naamId = 'custom';
    d.customNaam = '';
    if (!d.modules) d.modules = {};
    if (!d.modules.custom) d.modules.custom = {};
    d.modules.custom.naam = m.text || m.name;
    NJ.store.save(d);
    global.location.href = '/jap/custom-naam-jap/';
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