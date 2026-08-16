/* =========================================================================
   NAAM JAP · CUSTOM NAAM LEKHAN  (/lekhan/custom-naam-lekhan/)
   Write any naam or mantra by hand, with a target per page (108, 1008,
   10008 or custom). Completed pages are saved to the Digital Jap
   Notebook. Persists in modules.custLekhan (separate from the standard
   lekhan counter so the two never collide).
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var F = NJ.feature;
  if (!NJ.store || !NJ.writing || !F) { if (console) console.error('custom-lekhan: store/writing/shared missing.'); return; }

  var $ = function (id) { return doc.getElementById(id); };

  var data = NJ.store.load();
  var clk = data.modules.custLekhan;   // { page, naam, naamId, naamDev, pageSize, written }
  var engine = null;
  var activeId = clk.naamId || 'custom'; // which chip is selected ('custom' or preset id)

  var el = {
    naams: $('clk-naams'), custom: $('clk-custom'), customInput: $('clk-custom-input'),
    targets: $('clk-targets'), targetCustom: $('clk-target-custom-input'),
    count: $('clk-count'), page: $('clk-page'), naam: $('clk-naam'),
    sheet: $('clk-sheet'), canvas: $('clk-canvas'),
    undo: $('clk-und'), clear: $('clk-clr'), done: $('clk-done'),
    doneMount: $('clk-done-area')
  };

  var PRESETS = [
    { id: 'ram', english: 'Ram', dev: 'राम' },
    { id: 'radha', english: 'Radha', dev: 'राधा' },
    { id: 'shree-ram', english: 'Shree Ram', dev: 'श्री राम' },
    { id: 'shamb-sadashiv', english: 'Shamb Sadashiv', dev: 'शम्भ सदाशिव' },
    { id: 'om-namah-shivay', english: 'Om Namah Shivay', dev: 'ॐ नमः शिवाय' },
    { id: 'krishna', english: 'Krishna', dev: 'कृष्ण' }
  ];
  var TARGETS = [108, 1008, 10008];

  function size() { return clk.pageSize || 108; }
  function naam() {
    if (activeId === 'custom') return { english: clk.naam || 'Your naam', dev: clk.naamDev || clk.naam || 'नाम' };
    for (var i = 0; i < PRESETS.length; i++) if (PRESETS[i].id === activeId) return PRESETS[i];
    return PRESETS[0];
  }

  // Fresh-load merge: never clobber other modules written by other pages.
  function persist() {
    var d = NJ.store.load();
    d.modules.custLekhan = clk;
    NJ.store.save(d);
  }

  function render() {
    var n = naam();
    el.count.innerHTML = clk.written + ' <small>/ ' + size() + '</small>';
    el.page.textContent = 'Page ' + clk.page;
    el.naam.textContent = n.dev || n.english;
  }

  function resizeCanvas() { if (engine) engine.resize(); }

  function renderPageComplete() {
    var n = naam();
    el.doneMount.innerHTML =
      '<div class="lekhan-done" role="status" aria-live="polite">' +
      '<span class="lekhan-done__glyph" aria-hidden="true">॥</span>' +
      '<h2>PAGE COMPLETE</h2>' +
      '<p class="done-sub">' + size() + ' Naam Written · ' + (n.english || '') + '</p>' +
      '<div class="btn-group" style="margin-top:var(--space-5);justify-content:center">' +
      '<button type="button" class="btn btn--primary" data-next-page>Continue - Page ' + (clk.page + 1) + '</button>' +
      '</div></div>';
    var b = el.doneMount.querySelector('[data-next-page]');
    if (b) b.addEventListener('click', function () {
      clk.page++; clk.written = 0; persist();
      el.doneMount.innerHTML = ''; render();
    });
  }

  function completePage() {
    var n = naam();
    F.haptic([12, 40, 12]); F.sound('complete');
    F.nb.add({
      id: F.uid(), pageNo: clk.page, naamId: activeId, custom: n.english,
      naam: n.english, naamDev: n.dev || '', count: size(), pageSize: size(),
      created: NJ.store.nowISO(), updated: NJ.store.nowISO(), status: 'complete'
    });
    if (global.NJ.challenges && global.NJ.challenges.onPageComplete) global.NJ.challenges.onPageComplete();
    renderPageComplete();
    var w = el.sheet;
    w.classList.remove('page-turn'); void w.offsetWidth; w.classList.add('page-turn');
  }

  function done() {
    if (!engine || engine.isEmpty()) { F.toast('Write the naam first, then press Done.'); return; }
    if (activeId === 'custom' && !clk.naam) { F.toast('Enter your naam above first.'); return; }
    clk.written++;
    engine.clear();
    persist();
    NJ.store.addToday(0, 0, 1);
    render();
    F.bump(el.count); F.haptic(10);
    if (global.NJ.challenges && global.NJ.challenges.checkDaily) global.NJ.challenges.checkDaily();
    if (clk.written >= size()) completePage();
  }

  /* ---- Naam picker -------------------------------------------------------------- */
  function buildNaams() {
    el.naams.innerHTML = '';
    PRESETS.forEach(function (p) {
      var b = doc.createElement('button');
      b.type = 'button'; b.className = 'chip' + (activeId === p.id ? ' is-selected' : '');
      b.setAttribute('data-id', p.id);
      b.setAttribute('aria-pressed', activeId === p.id ? 'true' : 'false');
      b.innerHTML = '<span class="dev-caret">' + p.dev + '</span> ' + p.english;
      b.addEventListener('click', function () { selectNaam(p.id); });
      el.naams.appendChild(b);
    });
    var c = doc.createElement('button');
    c.type = 'button'; c.className = 'chip' + (activeId === 'custom' ? ' is-selected' : '');
    c.setAttribute('data-id', 'custom');
    c.setAttribute('aria-pressed', activeId === 'custom' ? 'true' : 'false');
    c.innerHTML = '<span class="dev-caret">अपना</span> Custom Naam';
    c.addEventListener('click', function () { selectNaam('custom'); });
    el.naams.appendChild(c);
  }
  function selectNaam(id) {
    activeId = id;
    clk.naamId = id;
    el.custom.hidden = id !== 'custom';
    buildNaams();
    if (id === 'custom' && !clk.naam) setTimeout(function () { el.customInput.focus(); }, 40);
    persist();
    render();
  }

  /* ---- Target selector ------------------------------------------------------------ */
  function buildTargets() {
    el.targets.innerHTML = '';
    TARGETS.forEach(function (t) {
      var b = doc.createElement('button');
      b.type = 'button'; b.className = 'chip' + (clk.pageSize === t ? ' is-selected' : '');
      b.textContent = t.toLocaleString();
      b.addEventListener('click', function () { setTarget(t); });
      el.targets.appendChild(b);
    });
    var c = doc.createElement('button');
    c.type = 'button'; c.className = 'chip' + (TARGETS.indexOf(clk.pageSize) < 0 ? ' is-selected' : '');
    c.textContent = 'Custom';
    c.addEventListener('click', function () {
      var v = parseInt(el.targetCustom.value, 10);
      if (v > 0) setTarget(v); else { el.targetCustom.focus(); F.toast('Enter a custom target first.'); }
    });
    el.targets.appendChild(c);
  }
  function setTarget(t) {
    clk.pageSize = t;
    if (clk.written >= t) { clk.written = 0; }
    persist();
    buildTargets();
    render();
    F.toast('Per page: ' + t.toLocaleString());
  }

  /* ---- Wire ------------------------------------------------------------------------- */
  function wire() {
    el.done.addEventListener('click', done);
    el.undo.addEventListener('click', function () { if (engine) engine.undo(); });
    el.clear.addEventListener('click', function () { if (engine) engine.clear(); });
    el.customInput.addEventListener('input', function () {
      clk.naam = el.customInput.value.trim();
      clk.naamDev = clk.naam;
      if (clk.naam) { persist(); render(); }
    });
    el.targetCustom.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { var v = parseInt(el.targetCustom.value, 10); if (v > 0) setTarget(v); }
    });
    global.addEventListener('resize', resizeCanvas);
  }

  function init() {
    var d = NJ.store.load(); data = d;
    clk = d.modules.custLekhan || (d.modules.custLekhan = { page: 1, naam: '', naamId: 'custom', naamDev: '', pageSize: 108, written: 0 });
    if (!clk.pageSize) clk.pageSize = 108;
    if (!clk.page) clk.page = 1;
    if (!clk.written) clk.written = 0;
    if (!clk.naamId) clk.naamId = 'custom';
    activeId = clk.naamId;
    el.customInput.value = clk.naam || '';
    engine = NJ.writing.create(el.canvas, { lineWidth: 3 });
    engine.bind();
    requestAnimationFrame(function () { resizeCanvas(); });
    buildNaams();
    buildTargets();
    wire();
    render();
  }

  global.addEventListener('beforeunload', persist);
  doc.addEventListener('visibilitychange', function () { if (doc.visibilityState === 'hidden') persist(); });

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);