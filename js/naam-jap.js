/* =========================================================================
   NAAM JAP · Naam Jap Counter  (/jap/naam-jap/)
   Select a naam, tap to count. 108 jap = 1 mala. Pause/resume, session
   reset (keeps lifetime/today totals), custom naam, haptics + ripple.
   Persists via NJ.store (single localStorage key).
   Requires: site.config.js, ui.js, store.js, core.js (in that order).
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var C = global.NAAM_JAP_CONFIG;
  var NJ = global.NJ;
  if (!C || !NJ || !NJ.store) { if (console) console.error('naam-jap: config/store missing.'); return; }

  var JAP = C.jap;
  var MALA = JAP.malaSize;      // 108
  var $ = function (id) { return doc.getElementById(id); };

  var data = NJ.store.load();
  var completing = false;
  var completionTimer = null;
  var completedAtMala = -1;
  var activeIdx = -1;

  var el = {
    select: $('naam-select'),
    custom: $('naam-custom'),
    customInput: $('naam-custom-input'),
    ring: $('mala-ring'),
    btn: $('tap-btn'),
    dev: $('tap-naam-dev'),
    en: $('tap-naam-en'),
    count: $('tap-count'),
    mala: $('tap-mala'),
    hint: $('tap-hint'),
    sumMala: $('sum-mala'),
    sumToday: $('sum-today'),
    sumTotal: $('sum-total'),
    sumMalas: $('sum-malas'),
    sumDuration: $('sum-duration'),
    progress: $('jap-progress-bar'),
    btnPause: $('btn-pause'),
    btnReset: $('btn-reset'),
    btnVoice: $('btn-voice')
  };

  /* ---- Voice (Web Speech API) ---------------------------------------------- */
  var VOICE_KEY = 'nj:jap:voice';
  var voiceEnabled = false;
  var synth = global.speechSynthesis || null;
  var voicesLoaded = false;

  function loadVoices() {
    if (!synth) return;
    var voices = synth.getVoices();
    if (voices.length > 0) { voicesLoaded = true; return; }
    synth.onvoiceschanged = function () { voicesLoaded = true; };
  }

  function loadVoice() {
    try { voiceEnabled = localStorage.getItem(VOICE_KEY) === '1'; } catch (e) {}
    updateVoiceBtn();
  }
  function toggleVoice() {
    voiceEnabled = !voiceEnabled;
    try { localStorage.setItem(VOICE_KEY, voiceEnabled ? '1' : '0'); } catch (e) {}
    updateVoiceBtn();
    NJ.Toast(voiceEnabled ? 'Voice on - naam speaks on each tap.' : 'Voice off.');
  }
  function updateVoiceBtn() {
    if (!el.btnVoice) return;
    el.btnVoice.textContent = voiceEnabled ? 'Voice On' : 'Voice Off';
    el.btnVoice.classList.toggle('is-active', voiceEnabled);
  }
  function speakNaam() {
    if (!voiceEnabled || !synth) return;
    var naam = currentNaam();
    var text = naam.english || naam.dev || '';
    if (!text) return;
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    var isHindi = /[\u0900-\u097f]/.test(naam.dev);
    u.lang = isHindi ? 'hi-IN' : 'en-IN';
    u.rate = 1.1;
    u.pitch = isHindi ? 1.05 : 1;
    u.volume = 1;
    // Prefer Indian voices
    var voices = synth.getVoices();
    var preferred = null;
    for (var i = 0; i < voices.length; i++) {
      var v = voices[i];
      if (isHindi && v.lang === 'hi-IN') { preferred = v; break; }
      if (!isHindi && v.lang === 'en-IN') { preferred = v; break; }
    }
    if (!preferred) {
      for (var j = 0; j < voices.length; j++) {
        var v2 = voices[j];
        if (v2.lang.indexOf('hi') === 0 || v2.lang.indexOf('en-IN') === 0) { preferred = v2; break; }
      }
    }
    if (preferred) u.voice = preferred;
    synth.speak(u);
  }

  /* ---- Naam lookup ------------------------------------------------------- */
  function currentNaam() {
    if (data.naamId === 'custom') {
      return { english: data.customNaam || 'Your naam', dev: '' };
    }
    for (var i = 0; i < JAP.naams.length; i++) {
      if (JAP.naams[i].id === data.naamId) return JAP.naams[i];
    }
    return JAP.naams[0];
  }

  /* ---- Bead geometry ------------------------------------------------------ */
  var NS = 'http://www.w3.org/2000/svg';
  var beads = [];

  function buildBeads() {
    var svg = doc.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 320 320');
    svg.setAttribute('class', 'mala__svg');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Mala progress visual');
    var cx = 160, cy = 160, R = 146, BR = 4;
    var gapDeg = 30, spanDeg = 360 - gapDeg;
    for (var i = 0; i < MALA; i++) {
      var angDeg = gapDeg / 2 + spanDeg * (i / (MALA - 1));
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
    meru.setAttribute('cx', cx);
    meru.setAttribute('cy', (cy - R).toFixed(2));
    meru.setAttribute('r', 8);
    meru.setAttribute('class', 'mala__bead is-meru');
    svg.appendChild(meru);
    el.ring.appendChild(svg);
  }

  /* ---- Rendering ---------------------------------------------------------- */
  function setCount(a, b) {
    el.count.innerHTML = a + ' <small>/ ' + b + '</small>';
  }

  function render() {
    var s = data.session;
    var n = currentNaam();
    el.dev.textContent = n.dev || '';
    el.en.textContent = n.english;

    if (completing) {
      el.btn.classList.add('is-complete');
      setCount('108', '108');
      el.dev.textContent = 'Mala Complete';
      el.en.textContent = '108 Naam Jap';
    } else {
      el.btn.classList.remove('is-complete');
      setCount(String(s.inMala), String(MALA));
    }
    el.mala.textContent = 'Mala ' + s.mala;
    el.sumMala.textContent = s.mala;
    el.sumToday.textContent = data.today.jap;
    el.sumTotal.textContent = data.stats.totalJap;
    el.sumMalas.textContent = data.stats.malas;
    if (el.progress) {
      var pct = Math.min(100, (s.inMala / MALA) * 100);
      el.progress.style.width = pct + '%';
      el.progress.setAttribute('aria-valuenow', String(Math.round(pct)));
    }
    el.ring.querySelector('svg').setAttribute('aria-label', 'Mala - ' + s.inMala + ' of ' + MALA + ' beads');
  }

  function updateBeads() {
    for (var i = 0; i < MALA; i++) beads[i].classList.toggle('is-counted', i < data.session.inMala);
    if (activeIdx >= 0 && activeIdx < MALA) beads[activeIdx].classList.remove('is-active');
    activeIdx = (data.session.inMala < MALA) ? data.session.inMala : -1;
    if (activeIdx >= 0) beads[activeIdx].classList.add('is-active');
  }

  function updatePauseBtn() {
    el.btnPause.textContent = data.session.paused ? 'Resume' : 'Pause';
    el.btn.classList.toggle('is-paused', data.session.paused);
  }

  function updateChips() {
    var chips = el.select.querySelectorAll('.chip');
    for (var i = 0; i < chips.length; i++) {
      var on = chips[i].getAttribute('data-id') === data.naamId;
      chips[i].classList.toggle('is-selected', on);
      chips[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    el.custom.hidden = data.naamId !== 'custom';
  }

  function buildChips() {
    el.select.innerHTML = '';
    for (var i = 0; i < JAP.naams.length; i++) {
      el.select.appendChild(chipEl(JAP.naams[i].id, JAP.naams[i].english, JAP.naams[i].dev));
    }
    el.select.appendChild(chipEl('custom', JAP.custom.label, 'अपना'));
  }
  function chipEl(id, label, dev) {
    var b = doc.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.setAttribute('data-id', id);
    b.setAttribute('aria-pressed', 'false');
    if (dev) b.innerHTML = '<span class="dev-caret">' + dev + '</span> ' + esc(label);
    else b.textContent = label;
    b.addEventListener('click', function () { selectNaam(id); });
    return b;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---- Naam selection ------------------------------------------------------ */
  function selectNaam(id) {
    data.naamId = id;
    if (id !== 'custom') { data.customNaam = ''; }
    persistMerge();
    updateChips();
    updatePauseBtn();
    render();
    if (id === 'custom') {
      el.custom.hidden = false;
      if (!data.customNaam) setTimeout(function () { el.customInput.focus(); }, 40);
    } else {
      el.custom.hidden = true;
    }
  }

  /* ---- Persistence helpers ------------------------------------------------- */
  // Core-key merge into a fresh load: this page may be long-lived while other
  // pages (notebook, challenges, ...) write their modules; never save the whole
  // stale in-memory copy wholesale or those writes get clobbered.
  function persistMerge() {
    var d = NJ.store.load();
    d.naamId = data.naamId;
    d.customNaam = data.customNaam;
    d.session = data.session;
    d.stats = data.stats;
    d.today = data.today;
    NJ.store.save(d);
  }
  function persist() {
    var tk = NJ.store.todayKey();
    if (data.today.key !== tk) { data.today.key = tk; data.today.jap = 0; data.today.malas = 0; }
    persistMerge();
  }
  function addToday(jap, malas) {
    var tk = NJ.store.todayKey();
    if (data.today.key !== tk) { data.today.key = tk; data.today.jap = 0; data.today.malas = 0; }
    data.today.jap += jap;
    data.today.malas += malas;
  }

  /* ---- Counting ------------------------------------------------------------- */
  function countOne() {
    if (data.session.paused) { NJ.Toast('Press Resume to continue counting.'); return; }
    if (data.session.inMala >= MALA) rollover();
    data.session.inMala++;
    data.session.sessionJap++;
    data.stats.totalJap++;
    addToday(1, 0);
    persist();
    updateBeads();
    render();
    flashCount();
    haptic(10);
    speakNaam();
    if (data.session.inMala === MALA) completeMala();
  }

  function rollover() {
    data.session.inMala = 0;
    data.session.mala++;
  }

  function completeMala() {
    data.session.completed++;
    data.stats.malas++;
    addToday(0, 1);
    persist();
    haptic([12, 40, 12]);
    completedAtMala = data.session.mala;
    completing = true;
    render();
    NJ.Toast('Mala ' + data.session.mala + ' complete · 108', 'success');
    clearTimeout(completionTimer);
    completionTimer = setTimeout(function () {
      // Only prepare the next mala if the user hasn't already tapped through the
      // completion window (a tap calls rollover() itself), else keep that count.
      if (data.session.mala === completedAtMala) {
        data.session.inMala = 0;
        data.session.mala = completedAtMala + 1;
      }
      completing = false;
      persist();
      updateBeads();
      render();
    }, 1400);
  }

  /* ---- Feedback ------------------------------------------------------------ */
  function flashCount() {
    el.count.classList.remove('is-bump');
    void el.count.offsetWidth; // reflow to restart animation
    el.count.classList.add('is-bump');
  }
  function haptic(pattern) {
    try { if (global.navigator && navigator.vibrate) navigator.vibrate(pattern); } catch (e) {}
  }
  function ripple(x, y) {
    var r = doc.createElement('span');
    r.className = 'ripple';
    var rect = el.btn.getBoundingClientRect();
    var d = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = d + 'px';
    r.style.left = (x - rect.left - d / 2) + 'px';
    r.style.top = (y - rect.top - d / 2) + 'px';
    el.btn.appendChild(r);
    setTimeout(function () { r.remove(); }, 540);
  }

  /* ---- Pause / resume ------------------------------------------------------- */
  function accumulate() {
    if (!data.session.paused && data.session.sessionStart) {
      data.session.accumulated += (Date.now() - data.session.sessionStart) / 1000;
    }
    data.session.sessionStart = Date.now();
  }
  function durationSec() {
    if (data.session.paused || !data.session.sessionStart) return Math.round(data.session.accumulated);
    return Math.round(data.session.accumulated + (Date.now() - data.session.sessionStart) / 1000);
  }
  function fmtDuration(sec) {
    sec = sec || 0;
    var m = Math.floor(sec / 60), s = sec % 60;
    if (m <= 0) return s + ' sec';
    if (m < 60) return m + 'm ' + s + 's';
    return Math.floor(m / 60) + 'h ' + (m % 60) + 'm';
  }
  function pauseToggle() {
    if (data.session.paused) {
      data.session.paused = false;
      data.session.sessionStart = Date.now();
      NJ.Toast('Resumed - tap to continue.');
    } else {
      accumulate();
      data.session.paused = true;
      NJ.Toast('Paused - tap to resume.');
    }
    persistMerge();
    updatePauseBtn();
    render();
  }

  /* ---- Reset (confirmation; lifetime/today kept) ------------------------------ */
  function resetSession() {
    NJ.Confirm({
      title: 'Reset this session?',
      message: 'This clears the current count, malas and session time. Your lifetime and today\u2019s totals are kept - only the current session starts fresh.',
      confirmText: 'Reset session',
      cancelText: 'Keep counting',
      onConfirm: function () {
        var today = data.today, stats = data.stats;
        data.session = { mala: 1, inMala: 0, completed: 0, sessionJap: 0, sessionStart: Date.now(), accumulated: 0, paused: false };
        data.today = today; data.stats = stats;
        completing = false; clearTimeout(completionTimer);
        completedAtMala = -1;
        activeIdx = -1;
        persistMerge();
        updateBeads();
        updatePauseBtn();
        render();
        NJ.Toast('Session reset - lifetime kept', 'success');
      }
    });
  }

  /* ---- Duration ticker ------------------------------------------------------- */
  function startTicker() {
    setInterval(function () { el.sumDuration.textContent = fmtDuration(durationSec()); }, 1000);
  }

  /* ---- Wire up --------------------------------------------------------------- */
  function wire() {
    el.btn.addEventListener('click', countOne);
    el.btn.addEventListener('pointerdown', function (e) {
      if (!e.isPrimary) return;
      ripple(e.clientX, e.clientY);
    });
    el.btnReset.addEventListener('click', resetSession);
    el.btnPause.addEventListener('click', pauseToggle);
    if (el.btnVoice) el.btnVoice.addEventListener('click', toggleVoice);
    el.customInput.addEventListener('input', function () {
      var v = el.customInput.value.trim();
      data.customNaam = v;
      if (v) { persistMerge(); render(); }
    });
    global.addEventListener('beforeunload', function () { accumulate(); persistMerge(); });
    doc.addEventListener('visibilitychange', function () {
      if (doc.visibilityState === 'hidden') { accumulate(); persistMerge(); }
    });
  }

  /* ---- Init ------------------------------------------------------------------ */
  function init() {
    buildBeads();
    buildChips();
    wire();
    loadVoice();
    loadVoices();
    updateChips();
    updatePauseBtn();
    render();
    updateBeads();
    el.sumDuration.textContent = fmtDuration(durationSec());
    startTicker();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);