/* =========================================================================
   NAAM JAP · SHARED FEATURE SERVICES
   -------------------------------------------------------------------------
   Reusable building blocks for every Jap/Lekhan module: creator credit,
   haptics, ripple, number bump, toasts/confirm, naam picker, mala ring,
   sound controls, time helpers. Auto-renders any [data-credit] credit mounts.
   Requires: site.config.js, ui.js, store.js (in that order).
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var C = global.NAAM_JAP_CONFIG || { brand: {} };
  var NJ = global.NJ || {};

  var F = {};

  F.creator = C.brand.creator || { name: 'CA Anshul Karwa', url: '#' };
  var esc = function (s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  F.creatorLink = function () {
    return '<a href="' + esc(F.creator.url) + '" target="_blank" rel="noopener noreferrer">' + esc(F.creator.name) + '</a>';
  };

  /* ---- Credit component ---------------------------------------------------- */
  // Fills every [data-credit] mount. data-credit-mode="built" -> "Built by ...",
  // otherwise "By ...". data-label overrides.
  F.creditHTML = function (mode) {
    if (mode === 'built') return 'Built by ' + F.creatorLink();
    return 'By ' + F.creatorLink();
  };
  F.renderCredits = function (root) {
    root = root || doc;
    var nodes = root.querySelectorAll('[data-credit]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var mode = el.getAttribute('data-credit-mode') || 'by';
      var label = el.getAttribute('data-label');
      el.innerHTML = label ? label + ' ' + F.creatorLink() : F.creditHTML(mode);
      el.classList.add('creator-credit');
    }
  };

  /* ---- Feedback ------------------------------------------------------------ */
  F.haptic = function (pattern) {
    try { if (global.navigator && navigator.vibrate) navigator.vibrate(pattern); } catch (e) {}
  };
  F.ripple = function (btn, x, y) {
    if (!btn) return;
    var reduce = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    var r = doc.createElement('span');
    r.className = 'ripple';
    var rect = btn.getBoundingClientRect();
    var d = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = d + 'px';
    r.style.left = (x - rect.left - d / 2) + 'px';
    r.style.top = (y - rect.top - d / 2) + 'px';
    btn.appendChild(r);
    setTimeout(function () { r.remove(); }, 540);
  };
  F.bump = function (el) {
    if (!el) return;
    el.classList.remove('is-bump');
    void el.offsetWidth;
    el.classList.add('is-bump');
  };
  F.toast = function (msg, kind) { if (NJ.Toast) NJ.Toast(msg, kind); };
  F.confirm = function (opts) { if (NJ.Confirm) NJ.Confirm(opts); };

  /* ---- Naams --------------------------------------------------------------- */
  F.naams = function () {
    return (C.jap && C.jap.naams) || [];
  };
  F.lekhanNaams = function () {
    return [
      { id: 'ram', english: 'Ram', dev: 'राम' },
      { id: 'radha', english: 'Radha', dev: 'राधा' },
      { id: 'shree-ram', english: 'Shree Ram', dev: 'श्री राम' },
      { id: 'shamb-sadashiv', english: 'Shamb Sadashiv', dev: 'शम्भ सदाशिव' },
      { id: 'om-namah-shivay', english: 'Om Namah Shivay', dev: 'ॐ नमः शिवाय' },
      { id: 'krishna', english: 'Krishna', dev: 'कृष्ण' }
    ];
  };

  /* ---- Sound (subtle completion tone; mute via prefs.sound) ------------------ */
  var audioCtx = null;
  function ctx() {
    try {
      if (!audioCtx && global.AudioContext) audioCtx = new global.AudioContext();
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    } catch (e) { return null; }
  }
  F.soundEnabled = function () {
    var data = NJ.store && NJ.store.load();
    return !!(data && data.prefs && data.prefs.sound);
  };
  F.tone = function (durMs) {
    var c = ctx(); if (!c) return;
    var osc = c.createOscillator(), g = c.createGain();
    osc.type = 'sine'; osc.frequency.value = 523;
    g.gain.setValueAtTime(0, c.currentTime);
    g.gain.linearRampToValueAtTime(0.12, c.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + (durMs || 500) / 1000);
    osc.connect(g); g.connect(c.destination);
    osc.start(); osc.stop(c.currentTime + (durMs || 500) / 1000);
  };
  F.sound = function (kind) {
    if (!F.soundEnabled()) return;
    if (kind === 'complete') F.tone(900);
    else if (kind === 'short') F.tone(260);
  };

  /* ---- Time ----------------------------------------------------------------- */
  F.fmtClock = function (sec) {
    sec = Math.max(0, Math.floor(sec));
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    function p(x) { return x < 10 ? '0' + x : '' + x; }
    return (h > 0 ? p(h) + ':' : '') + p(m) + ':' + p(s);
  };
  F.fmtDur = function (sec) {
    sec = Math.max(0, Math.floor(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    if (m <= 0) return s + ' sec';
    if (m < 60) return m + 'm ' + s + 's';
    return Math.floor(m / 60) + 'h ' + (m % 60) + 'm';
  };

  /* ---- Naam picker ---------------------------------------------------------- */
  // Builds selectable chips into `container`; optional custom chip + input.
  // opts: { naams, selected, includeCustom, customWrap, onSelect(id, customValue) }
  F.naamPicker = function (container, opts) {
    opts = opts || {};
    var naams = opts.naams || F.naams();
    var selected = opts.selected || (opts.includeCustom ? null : (naams[0] && naams[0].id) || null);
    var customWrap = opts.customWrap || null;
    var currentCustom = '';
    function esc(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    }
    function chip(id, label, dev) {
      var b = doc.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.setAttribute('data-id', id);
      b.setAttribute('aria-pressed', 'false');
      if (dev) b.innerHTML = '<span class="dev-caret">' + dev + '</span> ' + esc(label);
      else b.textContent = label;
      b.addEventListener('click', function () { set(id); });
      return b;
    }
    function chipEl(id, label, dev) { return chip(id, label, dev); }
    function set(id) {
      selected = id;
      render();
      if (opts.onSelect) opts.onSelect(id, currentCustom);
      if (customWrap) customWrap.hidden = (id !== 'custom');
    }
    function render() {
      container.innerHTML = '';
      for (var i = 0; i < naams.length; i++) {
        var c = chip(naams[i].id, naams[i].english, naams[i].dev);
        c.classList.toggle('is-selected', selected === naams[i].id);
        c.setAttribute('aria-pressed', selected === naams[i].id ? 'true' : 'false');
        container.appendChild(c);
      }
      if (opts.includeCustom) {
        var cc = chip('custom', (opts.customLabel || 'Custom Naam'), 'अपना');
        cc.classList.toggle('is-selected', selected === 'custom');
        cc.setAttribute('aria-pressed', selected === 'custom' ? 'true' : 'false');
        container.appendChild(cc);
      }
      if (customWrap) customWrap.hidden = (selected !== 'custom');
    }
    render();
    return {
      get: function () { return selected; },
      set: set,
      setCustom: function (v) { currentCustom = v; },
      getCustom: function () { return currentCustom; }
    };
  };

  /* ---- Mala ring (circular beads visual) ----------------------------------- */
  // Renders `size` beads around a circle + a meru bead. Returns { update(n) }.
  F.buildMalaRing = function (container, size) {
    var NS = 'http://www.w3.org/2000/svg';
    var beads = [];
    var svg = doc.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 320 320');
    svg.setAttribute('class', 'mala__svg');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Mala progress');
    var cx = 160, cy = 160, R = 146, BR = 4;
    var gapDeg = 30, spanDeg = 360 - gapDeg;
    for (var i = 0; i < size; i++) {
      var angDeg = gapDeg / 2 + spanDeg * (i / (size - 1));
      var rad = (angDeg - 90) * Math.PI / 180;
      var c = doc.createElementNS(NS, 'circle');
      c.setAttribute('cx', (cx + R * Math.cos(rad)).toFixed(2));
      c.setAttribute('cy', (cy + R * Math.sin(rad)).toFixed(2));
      c.setAttribute('r', BR);
      c.setAttribute('class', 'mala__bead');
      svg.appendChild(c);
      beads.push(c);
    }
    var meru = doc.createElementNS(NS, 'circle');
    meru.setAttribute('cx', cx); meru.setAttribute('cy', (cy - R).toFixed(2));
    meru.setAttribute('r', 8); meru.setAttribute('class', 'mala__bead is-meru');
    svg.appendChild(meru);
    container.appendChild(svg);
    return {
      update: function (n) {
        for (var i = 0; i < size; i++) beads[i].classList.toggle('is-counted', i < n);
        svg.setAttribute('aria-label', 'Mala — ' + n + ' of ' + size + ' beads');
      },
      svg: svg
    };
  };

  /* ---- Progress bar --------------------------------------------------------- */
  F.progress = function (barEl, ratio) {
    if (!barEl) return;
    var pct = Math.max(0, Math.min(100, (ratio || 0) * 100));
    barEl.style.width = pct + '%';
    barEl.setAttribute('aria-valuenow', String(Math.round(pct)));
  };

  F.uid = function () {
    return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  };

  /* ---- Dates ---------------------------------------------------------------- */
  F.pad2 = F.pad2 || function (n) { return n < 10 ? '0' + n : '' + n; };
  F.dateKey = function (d) {
    d = d || new Date();
    return d.getFullYear() + '-' + F.pad2(d.getMonth() + 1) + '-' + F.pad2(d.getDate());
  };
  F.parseKey = function (key) { var p = String(key).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); };
  F.addDaysKey = function (key, n) {
    var d = F.parseKey(key);
    d.setDate(d.getDate() + n);
    return F.dateKey(d);
  };
  F.isToday = function (key) { return key === NJ.store.todayKey(); };
  F.humanDate = function (key) {
    try { return F.parseKey(key).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }); }
    catch (e) { return key; }
  };
  F.lastNDays = function (n) {
    var out = [], tk = NJ.store.todayKey();
    for (var i = n - 1; i >= 0; i--) out.push(F.addDaysKey(tk, -i));
    return out;
  };

  /* ---- Totals (aggregated across all modules) ------------------------------- */
  // Returns lifetime numbers: { jap, malas, naam, pages, sessions }
  F.totals = function () {
    var d = NJ.store.load();
    var m = d.modules;
    var jap = (d.stats.totalJap || 0) + (m.mala.stat.total || 0) + (m.custom.total || 0);
    var malas = (d.stats.malas || 0) + (m.mala.stat.malas || 0);
    var pages = 0, naam = m.lekhan.written || 0;
    var idx = F.nb.idx();
    for (var i = 0; i < idx.length; i++) {
      if (idx[i].status === 'complete') { pages++; naam += idx[i].count || 0; }
    }
    return { jap: jap, malas: malas, naam: naam, pages: pages };
  };

  /* ---- Days / qualification / streak ---------------------------------------- */
  // A day qualifies for the streak when there is real recorded practice
  // (jap, malas or naam) OR the user marked it done manually in sadhana.
  F.history = function () {
    var h = NJ.store.history();
    var d = NJ.store.load();
    var manual = d.modules.sadhana.manual || {};
    for (var mk in manual) {
      if (Object.prototype.hasOwnProperty.call(manual, mk) && !h[mk]) h[mk] = { jap: 0, malas: 0, naam: 0 };
    }
    return h;
  };
  F.qualified = function (key) {
    var d = NJ.store.load();
    var manual = d.modules.sadhana.manual || {};
    if (manual[key]) return true;
    var day = F.history()[key];
    return !!(day && (day.jap || day.malas || day.naam));
  };
  F.markDay = function (key, on) {
    var d = NJ.store.load();
    var man = d.modules.sadhana.manual || (d.modules.sadhana.manual = {});
    if (on) man[key] = true; else delete man[key];
    NJ.store.save(d);
  };
  function streakFrom(key, hist, step) {
    var n = 0, k = key;
    while (F.qualifiedAt(k, hist)) { n++; k = F.addDaysKey(k, step); }
    return n;
  }
  F.qualifiedAt = function (key, hist) {
    if (!hist) return F.qualified(key);
    var day = hist[key];
    return !!(day && (day.jap || day.malas || day.naam));
  };
  F.streak = function () {
    var hist = F.history();
    var tk = NJ.store.todayKey();
    var keys = Object.keys(hist).filter(function (k) { return F.qualifiedAt(k, hist); }).sort();
    // current: through today if it qualifies, else through yesterday
    var end = F.qualifiedAt(tk, hist) ? tk : F.addDaysKey(tk, -1);
    var current = 0, best = 0;
    var k = end, kMin = keys.length ? keys[0] : end;
    while (k >= kMin) {
      if (!F.qualifiedAt(k, hist)) break;
      current++; k = F.addDaysKey(k, -1);
      if (k < kMin) break;
    }
    var run = 0;
    for (var i = 0; i < keys.length; i++) {
      if (i === 0) { run = 1; }
      else if (F.addDaysKey(keys[i - 1], 1) === keys[i]) { run++; }
      else { if (run > best) best = run; run = 1; }
    }
    if (run > best) best = run;
    return { current: current, best: best, today: F.qualifiedAt(tk, hist) };
  };

  /* ---- Milestones ------------------------------------------------------------ */
  // Conf entries carry an explicit `kind` (jap / mala / page / streak) and `at`.
  F.milestones = function () {
    var conf = (global.NAAM_JAP_CONFIG.journey && global.NAAM_JAP_CONFIG.journey.milestones) || [];
    var t = F.totals();
    var s = F.streak();
    var vals = { jap: t.jap, mala: t.malas, page: t.pages, streak: s.best };
    return conf.map(function (ml) {
      var value = vals[ml.kind] !== undefined ? vals[ml.kind] : 0;
      return { id: ml.id, label: ml.label, dev: ml.dev, desc: ml.desc, at: ml.at, value: value, done: value >= (ml.at || 1) };
    });
  };

  /* ---- Notebook index helpers (localStorage index + IndexedDB pages) ---------- */
  F.nb = {
    idx: function () {
      var d = NJ.store.load();
      return d.modules.notebook || [];
    },
    saveIdx: function (arr) {
      var d = NJ.store.load();
      d.modules.notebook = arr;
      NJ.store.save(d);
    },
    add: function (meta) {
      var arr = F.nb.idx();
      arr.push(meta);
      F.nb.saveIdx(arr);
      return meta.id;
    },
    remove: function (id) {
      F.nb.saveIdx(F.nb.idx().filter(function (p) { return p.id !== id; }));
      if (NJ.db && NJ.db.del) NJ.db.del(id).catch(function () {});
    },
    byId: function (id) {
      var arr = F.nb.idx();
      for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i];
      return null;
    }
  };

  /* ---- Auto-render credits + init ------------------------------------------- */
  function init() {
    F.renderCredits();
    if (NJ.Reveal) NJ.Reveal();
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

  NJ.feature = F;
})(typeof window !== 'undefined' ? window : this);