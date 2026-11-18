/* =========================================================================
   NAAM JAP · MANTRA DETAIL  (/mantra/<id>/)
   Renders one mantra's own page: Devanagari text, transliteration,
   meaning and note, with a button that hands the mantra straight to the
   jap counter. The mantra id comes from the URL path.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var C = global.NAAM_JAP_CONFIG;
  var NJ = global.NJ;
  if (!C || !NJ || !NJ.store) return;

  var mantras = (C.mantras && C.mantras.length) ? C.mantras : [];

  function esc(s) {
    return String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function find(id) {
    for (var i = 0; i < mantras.length; i++) if (mantras[i].id === id) return mantras[i];
    return null;
  }

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

  function render() {
    var mount = doc.getElementById('mnt-detail');
    if (!mount) return;
    var parts = global.location.pathname.split('/').filter(function (p) { return p; });
    var id = parts.length ? parts[parts.length - 1] : '';
    var m = find(id);
    if (!m) {
      mount.innerHTML =
        '<div class="card" style="text-align:center;padding:var(--space-8)">' +
        '<p class="muted">This mantra could not be found.</p>' +
        '<div class="btn-group" style="justify-content:center;margin-top:var(--space-5)">' +
        '<a class="btn btn--primary" href="/mantra/">Browse the mantra library</a>' +
        '</div></div>';
      return;
    }
    doc.title = m.name + ' - Japna: Naam Jap by CA Anshul Karwa - Pause. Remember. Repeat';
    mount.innerHTML =
      '<div class="card mantra-detail-page">' +
      '<p class="eyebrow" style="text-align:center">' + esc(m.category || 'Mantra') + ' · मंत्र</p>' +
      '<h1 style="text-align:center;font-family:var(--font-display)">' + esc(m.name) + '</h1>' +
      '<div class="mantra-detail">' +
      '<p class="mantra-detail__glyph" aria-hidden="true">' + esc(m.text) + '</p>' +
      '<p class="mantra-detail__tr">' + esc(m.transliteration) + '</p>' +
      '<div class="mantra-detail__mean"><b>Meaning</b><p>' + esc(m.meaning) + '</p></div>' +
      (m.note ? '<div class="mantra-detail__note">' + esc(m.note) + '</div>' : '') +
      '</div>' +
      '<div class="btn-group" style="justify-content:center;margin-top:var(--space-6)">' +
      '<button type="button" class="btn btn--primary" data-jap>Begin jap with this mantra</button>' +
      '<a class="btn btn--ghost" href="/mantra/">All mantras</a>' +
      '</div>' +
      '<p style="text-align:center;margin-top:var(--space-4);font-size:0.65rem;color:var(--ink-faint)">By CA Anshul Karwa</p>' +
      '</div>';
    mount.querySelector('[data-jap]').addEventListener('click', function () { beginJap(m); });
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', render);
  else render();

})(typeof window !== 'undefined' ? window : this);
