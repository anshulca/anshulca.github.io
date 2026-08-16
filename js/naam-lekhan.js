/* =========================================================================
   NAAM JAP · NAAM LEKHAN  (/lekhan/naam-lekhan/)
   Three writing styles over one shared ink engine:
     guided   - 108 faint pre-written positions; write over each spot then
                complete it (tap, or Done). No OCR - completion is explicit.
     free     - blank canvas; write the naam freely, Done per naam.
     notebook - classic ruled manuscript page; write, Done per naam.
   A page finishes at 108; the completed page is saved to the Digital Jap
   Notebook (NJ.feature.nb) plus its written data (NJ.db), then a page-turn
   creates the next page with fresh positions.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var F = NJ.feature;
  if (!NJ.store || !NJ.writing || !F) { if (console) console.error('naam-lekhan: store/writing/shared missing.'); return; }

  var PAGE = 108;
  var ROWS = 6;
  var $ = function (id) { return doc.getElementById(id); };

  var data = NJ.store.load();
  var lk = data.modules.lekhan;   // { page, naamId, custom, pageSize, written, guide, mode, done, strokes, section, totalPages }
  var engine = null;
  var guideOn = lk.guide !== false;
  var mode = lk.mode || 'guided';            // 'guided' | 'free' | 'notebook'
  var doneCells = Array.isArray(lk.done) ? lk.done.slice() : [];
  var section = lk.section || 0;
  var lastCell = null;                       // cell of the most recent stroke

  var el = {
    modes: $('lek-modes'),
    naams: $('lek-naams'), custom: $('lek-custom'), customInput: $('lek-custom-input'),
    count: $('lek-count'), page: $('lek-page'), dev: $('lek-naam'),
    instruct: $('lek-instruct'), guide: $('lek-guide'), guideBtn: $('lek-guide-btn'),
    sheet: $('lek-sheet'), canvas: $('lek-canvas'),
    undo: $('lek-undo'), clear: $('lek-clear'), done: $('lek-done-btn'),
    doneMount: $('lek-done-area'),
    secNav: $('lek-sec-nav'), secPrev: $('lek-sec-prev'), secNext: $('lek-sec-next'), secLabel: $('lek-sec-label')
  };

  function size() { return lk.pageSize || PAGE; }
  function naam() {
    if (lk.naamId === 'custom') return { english: lk.custom || 'Your naam', dev: lk.custom || 'नाम' };
    var naams = F.lekhanNaams();
    for (var i = 0; i < naams.length; i++) if (naams[i].id === lk.naamId) return naams[i];
    return naams[0];
  }

  // Primary naam shown to the writer: Devanagari when available, otherwise the
  // exact custom text (never both forms side by side).
  function titleName() {
    var n = naam();
    return n.dev || n.english || '';
  }

  function isGuided() { return mode === 'guided'; }

  /* ---- Guided layout -------------------------------------------------------- */
  function colCount() {
    var w = el.sheet.getBoundingClientRect().width;
    if (w >= 1080) return 6;
    if (w >= 860) return 5;
    if (w >= 620) return 4;
    if (w >= 460) return 3;
    return 2;
  }
  function layout() {
    var w = el.sheet.getBoundingClientRect().width;
    var cols = colCount();
    var colW = w / cols;
    var rowH = colW * 0.62;
    return { w: w, cols: cols, colW: colW, rowH: rowH, per: cols * ROWS, sections: Math.ceil(PAGE / (cols * ROWS)) };
  }
  function cellAt(x, y) {
    if (!isGuided()) return null;
    var L = layout();
    var col = Math.floor(x / L.colW);
    var row = Math.floor(y / L.rowH);
    if (col < 0 || col >= L.cols || row < 0 || row >= ROWS) return null;
    return section * L.per + row * L.cols + col < PAGE ? section * L.per + row * L.cols + col : null;
  }
  function cellLocal(cell, L) {
    var local = cell - section * L.per;
    return { col: local % L.cols, row: Math.floor(local / L.cols) };
  }

  /* ---- Stroke mirroring (engine canvas <-> persisted relative coords) ------- */
  function toRel(pt, cell) {
    var L = layout(), loc = cellLocal(cell, L);
    var lx = pt.x - loc.col * L.colW, ly = pt.y - loc.row * L.rowH;
    return [Math.max(0, Math.min(1, lx / L.colW)), Math.max(0, Math.min(1, ly / L.rowH))];
  }
  function fromRel(rel, cell) {
    var L = layout(), loc = cellLocal(cell, L);
    return { x: loc.col * L.colW + rel[0] * L.colW, y: loc.row * L.rowH + rel[1] * L.rowH };
  }
  function syncStrokes() {
    var L = layout(), start = section * L.per, end = start + L.per;
    // merge: keep stored strokes from other sections, replace the visible ones
    var out = (lk.strokes || []).filter(function (st) { return st.cell == null || st.cell < start || st.cell >= end; });
    engine.getStrokes().forEach(function (st) {
      if (st.tag == null) return;
      out.push({ cell: st.tag, pts: st.map(function (pt) { return toRel(pt, st.tag); }) });
    });
    lk.strokes = out;
  }
  function loadSectionStrokes() {
    var L = layout();
    var start = section * L.per;
    var local = [];
    (lk.strokes || []).forEach(function (st) {
      if (st.cell == null || st.cell < start || st.cell >= start + L.per) return;
      // engine strokes are point arrays with a tag property
      var arr = st.pts.map(function (rel) { var p = fromRel(rel, st.cell); return { x: p.x, y: p.y, p: 0.5 }; });
      arr.tag = st.cell;
      local.push(arr);
    });
    engine.setStrokes(local);
  }
  function hasInk(cell) {
    return (lk.strokes || []).some(function (st) { return st.cell === cell && st.pts.length > 1; });
  }

  /* ---- Completion (explicit only - a stroke alone never completes) ---------- */
  function completeCell(cell) {
    if (cell == null || doneCells.indexOf(cell) >= 0) return;
    if (!hasInk(cell)) {
      F.toast('Write the naam over this spot first, then tap it to complete.', '');
      return;
    }
    doneCells.push(cell);
    lk.done = doneCells;
    lk.written = doneCells.length;
    persist();
    NJ.store.addToday(0, 0, 1);
    render();
    renderGuide();
    F.bump(el.count); F.haptic(10);
    if (global.NJ.challenges && global.NJ.challenges.checkDaily) global.NJ.challenges.checkDaily();
    if (doneCells.length >= size()) completePage();
  }

  /* ---- Guide layer ----------------------------------------------------------- */
  function guideCtx() {
    return el.guide ? el.guide.getContext('2d') : null;
  }
  function sizeGuideCanvas() {
    var gc = guideCtx();
    if (!gc) return;
    var rect = el.sheet.getBoundingClientRect();
    var dpr = Math.max(1, global.devicePixelRatio || 1);
    el.guide.width = Math.round(rect.width * dpr);
    el.guide.height = Math.round(rect.height * dpr);
    gc.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function accent() {
    return (getComputedStyle(doc.documentElement).getPropertyValue('--accent') || '#b98a3a').trim();
  }
  function renderGuide() {
    var gc = guideCtx();
    if (!gc) return;
    var rect = el.sheet.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    sizeGuideCanvas();
    gc.clearRect(0, 0, rect.width, rect.height);
    if (!isGuided()) return;
    var L = layout(), txt = titleName();
    var ink = getComputedStyle(el.canvas).color || '#2b2620';
    var acc = accent();
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < L.cols; c++) {
        var g = section * L.per + r * L.cols + c;
        if (g >= PAGE) continue;
        var x = c * L.colW, y = r * L.rowH;
        var isDone = doneCells.indexOf(g) >= 0;
        // soft manuscript cell frame - present in every section, even with guide off
        gc.globalAlpha = 0.09;
        gc.strokeStyle = ink;
        gc.lineWidth = 1;
        gc.strokeRect(x + 1, y + 1, L.colW - 2, L.rowH - 2);
        if (isDone) {
          // warm completion mark
          gc.globalAlpha = 0.07;
          gc.fillStyle = acc;
          gc.fillRect(x + 1, y + 1, L.colW - 2, L.rowH - 2);
          gc.globalAlpha = 0.55;
          gc.fillStyle = acc;
          gc.font = Math.round(Math.min(L.colW, L.rowH) * 0.24) + 'px Fraunces, Georgia, serif';
          gc.textAlign = 'right'; gc.textBaseline = 'top';
          gc.fillText('✓', x + L.colW - 8, y + 6);
        } else if (guideOn) {
          var pxs = Math.round(Math.min(L.colW * 0.42, L.rowH * 0.58));
          var isDevTxt = /[\u0900-\u097f]/.test(txt);
          gc.font = (isDevTxt ? pxs + 'px "Tiro Devanagari Hindi", "Nirmala UI", serif' : 'italic ' + pxs + 'px Fraunces, Georgia, serif');
          gc.textAlign = 'center'; gc.textBaseline = 'middle';
          gc.globalAlpha = 0.13;
          gc.fillStyle = ink;
          gc.fillText(txt, x + L.colW / 2, y + L.rowH / 2);
        }
      }
    }
    gc.globalAlpha = 1;
  }

  /* ---- Mode + section ------------------------------------------------------- */
  function setSection(delta) {
    section = Math.max(0, Math.min(layout().sections - 1, section + delta));
    lk.section = section;
    persist();
    loadSectionStrokes();
    renderGuide();
    render();
  }
  function setMode(m) {
    if (m === mode || ['guided', 'free', 'notebook'].indexOf(m) < 0) return;
    mode = m;
    lk.mode = m;
    persist();
    render();
    rebuildSheet();
  }

  /* ---- Sheet visuals ---------------------------------------------------------- */
  function rebuildSheet() {
    setSheetSize();
    updateSheetClass();
    if (isGuided()) {
      renderGuide();
      loadSectionStrokes();
    } else {
      engine.clear();
      renderGuide();
    }
  }
  function setSheetSize() {
    if (isGuided()) {
      var L = layout();
      el.sheet.style.height = Math.round(ROWS * L.rowH) + 'px';
    } else {
      el.sheet.style.height = '';
    }
  }
  function updateSheetClass() {
    el.sheet.classList.toggle('lek-sheet--guided', isGuided());
    el.sheet.classList.toggle('lek-sheet--free', mode === 'free');
    el.sheet.classList.toggle('lek-sheet--notebook', mode === 'notebook');
    el.canvas.classList.toggle('page-sheet__ruled', mode === 'notebook');
  }

  /* ---- Rendering -------------------------------------------------------------- */
  function renderGuideBtn() {
    if (!el.guideBtn) return;
    el.guideBtn.hidden = !isGuided();
    el.guideBtn.textContent = 'Guide: ' + (guideOn ? 'ON' : 'OFF');
    el.guideBtn.setAttribute('aria-pressed', String(guideOn));
  }
  function renderModes() {
    if (!el.modes) return;
    var btns = el.modes.querySelectorAll('[data-mode]');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-mode') === mode;
      btns[i].classList.toggle('is-selected', on);
      btns[i].setAttribute('aria-pressed', String(on));
    }
  }
  function renderSectionNav() {
    if (!el.secNav) return;
    var show = isGuided() && layout().sections > 1;
    el.secNav.hidden = !show;
    if (!show) return;
    el.secLabel.textContent = 'Section ' + (section + 1) + ' of ' + layout().sections;
    el.secPrev.disabled = section === 0;
    el.secNext.disabled = section >= layout().sections - 1;
  }
  function render() {
    el.count.innerHTML = (isGuided() ? doneCells.length : lk.written) + ' <small>/ ' + size() + '</small>';
    el.page.textContent = 'Page ' + lk.page;
    el.dev.textContent = titleName();
    if (el.instruct) {
      if (isGuided()) el.instruct.innerHTML = 'Write this Naam over its <b>' + size() + '</b> faint spots - then tap a spot (or press Done) to complete it.';
      else if (mode === 'free') el.instruct.innerHTML = 'Write this Naam freely on the blank page - press <b>Done</b> after each one. <b>' + size() + '</b> complete the page.';
      else el.instruct.innerHTML = 'Write this Naam on the ruled page - press <b>Done</b> after each one. <b>' + size() + '</b> complete the page.';
    }
    renderGuideBtn();
    renderModes();
    renderSectionNav();
  }

  /* ---- Completed page ------------------------------------------------------------ */
  function renderPageComplete() {
    var n = naam();
    var pageNo = lk.page;
    el.doneMount.innerHTML =
      '<div class="lekhan-done" role="status" aria-live="polite">' +
      '<span class="lekhan-done__glyph" aria-hidden="true">॥</span>' +
      '<h2>Naam Lekhan Complete</h2>' +
      '<p class="done-sub"><b>' + size() + ' Naam Written</b></p>' +
      '<p class="done-sub faint">Page ' + pageNo + ' Complete</p>' +
      '<div class="btn-group" style="margin-top:var(--space-5);justify-content:center">' +
      '<button type="button" class="btn btn--primary" data-next-page>Continue - Page ' + (lk.page + 1) + '</button>' +
      '</div></div>';
    var t = el.doneMount.querySelector('[data-next-page]');
    if (t) t.addEventListener('click', function () {
      lk.page++;
      lk.written = 0;
      doneCells = []; lk.done = [];
      lk.strokes = [];
      lk.section = 0; section = 0;
      lk.totalPages = (lk.totalPages || 0) + 1;
      persist();
      el.doneMount.innerHTML = '';
      el.sheet.classList.remove('page-turn'); void el.sheet.offsetWidth;
      engine.clear();
      render();
      if (isGuided()) renderGuide();
    });
  }

  function completePage() {
    var n = naam();
    F.haptic([12, 40, 12]); F.sound('complete');
    var meta = {
      id: F.uid(), pageNo: lk.page, naamId: lk.naamId, custom: lk.custom,
      naam: n.english, naamDev: n.dev || '', count: size(), pageSize: size(),
      created: NJ.store.nowISO(), updated: NJ.store.nowISO(), status: 'complete',
      mode: mode
    };
    F.nb.add(meta);
    // keep the written page data for the notebook
    try {
      NJ.db.put({
        id: meta.id, pageNo: lk.page, naamId: lk.naamId, custom: lk.custom,
        naam: n.english, naamDev: n.dev || '', count: size(), created: meta.created,
        mode: mode, cells: lk.strokes || []
      }).catch(function () {});
    } catch (e) {}
    renderPageComplete();
    // a gentle page-turn already-sign animation on the sheet
    var w = el.sheet;
    w.classList.remove('page-turn'); void w.offsetWidth; w.classList.add('page-turn');
  }

  /* ---- Actions ------------------------------------------------------------------ */
  function done() {
    if (!engine) return;
    if (isGuided()) {
      var cell = lastCell != null && hasInk(lastCell) ? lastCell : null;
      if (cell == null) { F.toast('Write the naam over a spot first, then press Done.', ''); return; }
      completeCell(cell);
      return;
    }
    if (engine.isEmpty()) { F.toast('Write the naam first, then press Done.'); return; }
    lk.written++;
    engine.clear();
    persist();
    NJ.store.addToday(0, 0, 1);
    render();
    F.bump(el.count); F.haptic(10);
    if (global.NJ.challenges && global.NJ.challenges.checkDaily) global.NJ.challenges.checkDaily();
    if (lk.written >= size()) { completePage(); }
  }

  function clearInk() {
    if (!engine) return;
    engine.clear();
    if (isGuided()) { syncStrokes(); persist(); }
  }
  function undoInk() {
    if (!engine) return;
    engine.undo();
    if (isGuided()) { syncStrokes(); persist(); }
  }

  function toggleGuide() {
    guideOn = !guideOn;
    lk.guide = guideOn;
    persist();
    renderGuideBtn();
    renderGuide();
    F.toast(guideOn ? 'Writing guide on' : 'Writing guide off', 'success');
  }

  /* ---- Fresh-load merge persist ------------------------------------------------ */
  function persist() {
    var d = NJ.store.load();
    d.modules.lekhan = lk;
    NJ.store.save(d);
  }

  function resizeCanvas() {
    if (engine) engine.resize();
    if (isGuided()) {
      var L = layout();
      if (section > L.sections - 1) section = L.sections - 1;
      setSheetSize();
      loadSectionStrokes();
    }
    sizeGuideCanvas();
    renderGuide();
  }

  function wire() {
    if (el.modes) el.modes.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-mode]') : null;
      if (b) setMode(b.getAttribute('data-mode'));
    });
    el.done.addEventListener('click', done);
    el.undo.addEventListener('click', undoInk);
    el.clear.addEventListener('click', clearInk);
    if (el.guideBtn) el.guideBtn.addEventListener('click', toggleGuide);
    if (el.secPrev) el.secPrev.addEventListener('click', function () { setSection(-1); });
    if (el.secNext) el.secNext.addEventListener('click', function () { setSection(1); });
    el.customInput.addEventListener('input', function () {
      lk.custom = el.customInput.value.trim();
      if (isGuided()) renderGuide();
      if (lk.custom) { persist(); render(); }
    });
    global.addEventListener('resize', resizeCanvas);
  }

  function init() {
    var d = NJ.store.load(); data = d; lk = d.modules.lekhan;
    if (!lk.pageSize) lk.pageSize = PAGE;
    mode = lk.mode || 'guided';
    guideOn = lk.guide !== false;
    doneCells = Array.isArray(lk.done) ? lk.done.slice() : [];
    section = Math.min(lk.section || 0, Math.max(0, Math.ceil(PAGE / (colCount() * ROWS)) - 1));
    if (isGuided() && lk.written != null && lk.written !== doneCells.length) { lk.written = doneCells.length; }
    engine = NJ.writing.create(el.canvas, {
      lineWidth: 3,
      onStrokeStart: function (pt) { return cellAt(pt.x, pt.y); },
      onStroke: function () { if (isGuided()) { lastCell = engine.getLastTag(); syncStrokes(); persist(); } },
      onTap: function (pt) { if (isGuided()) completeCell(cellAt(pt.x, pt.y)); }
    });
    engine.bind();
    rebuildSheet();
    requestAnimationFrame(function () {
      resizeCanvas();
      if (isGuided()) { loadSectionStrokes(); renderGuide(); }
      render();   // re-sync count + section label once layout settles
    });
    F.naamPicker(el.naams, {
      naams: F.lekhanNaams(), selected: lk.naamId, includeCustom: true,
      customWrap: el.custom, customLabel: 'Custom Naam',
      onSelect: function (id) {
        lk.naamId = id;
        if (id !== 'custom') { lk.custom = ''; }
        persist(); render();
        if (isGuided()) renderGuide();
        if (id === 'custom') setTimeout(function () { el.customInput.focus(); }, 40);
      }
    });
    wire();
    render();
    // the section count depends on the settled layout - re-render once the
    // page finishes loading fonts and layout so the label can never be stale
    var settle = function () { render(); };
    if (doc.fonts && doc.fonts.ready) { try { doc.fonts.ready.then(settle); } catch (e) {} }
    global.addEventListener('load', settle);
    setTimeout(settle, 600);
  }

  global.addEventListener('beforeunload', persist);
  doc.addEventListener('visibilitychange', function () { if (doc.visibilityState === 'hidden') persist(); });

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);