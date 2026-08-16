/* =========================================================================
   NAAM JAP · JAP TIMER  (/jap/jap-timer/)
   Countdown (presets + custom) and count-up. Timestamp-accurate (elapsed is
   computed from Date.now() deltas, so rendering delays don't cause drift).
   Persists the active session so a refresh doesn't lose it.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var F = NJ.feature;
  if (!NJ.store || !F) { if (console) console.error('jap-timer: store/shared missing.'); return; }

  var $ = function (id) { return doc.getElementById(id); };

  var PRESETS = [5, 11, 21, 40, 108];
  var MIN = 60;

  var data = NJ.store.load();
  var t = data.modules.timer;   // { mode, durSec, naamId, custom, round, done, running, startTs, remainAccum, finished }
  var _timer = null;            // interval handle
  var _last = Date.now();

  var el = {
    mode: $('timer-mode'), presets: $('timer-presets'), customMin: $('timer-custom-min'), applyCustom: $('timer-apply-custom'),
    face: $('timer-face'), meta: $('timer-meta'), round: $('timer-round'), progress: $('timer-progress'),
    btnStart: $('timer-start'), btnPause: $('timer-pause'), btnReset: $('timer-reset'), btnSound: $('timer-sound'),
    doneMount: $('timer-done'), naams: $('timer-naams'), custom: $('timer-custom'), customInput: $('timer-custom-input')
  };

  function naam() {
    if (t.naamId === 'custom') return t.custom || 'Your naam';
    var naams = (global.NAAM_JAP_CONFIG.jap && global.NAAM_JAP_CONFIG.jap.naams) || [];
    for (var i = 0; i < naams.length; i++) if (naams[i].id === t.naamId) return naams[i].english + ' ' + (naams[i].dev || '');
    return 'Ram राम';
  }

  // Fresh-load merge: never clobber other modules written by other pages.
  function save() {
    var d = NJ.store.load();
    d.modules.timer = t;
    NJ.store.save(d);
  }
  function persistRunning() {
    t.startTs = Date.now(); _last = Date.now();
    save();
  }

  function faceText() {
    if (t.mode === 'up') return F.fmtClock(Math.floor(t.remainAccum));
    return F.fmtClock(Math.ceil(t.remainAccum));
  }

  function renderDone() {
    el.doneMount.innerHTML =
      '<div class="done-state">' +
      '<span class="done-state__glyph" aria-hidden="true">॥</span>' +
      '<h2>Sadhana Complete</h2>' +
      '<p class="done-meta">' + F.fmtDur(t.durSec) + ' · Round ' + (t.round - 1) + '</p>' +
      '<div class="btn-group" style="margin-top:var(--space-5);justify-content:center">' +
      '<button type="button" class="btn btn--primary" data-next-round>Start Round ' + t.round + '</button>' +
      '</div></div>';
    var b = el.doneMount.querySelector('[data-next-round]');
    if (b) b.addEventListener('click', function () { startRound(t.round); });
  }

  function render() {
    el.face.textContent = faceText();
    el.meta.textContent = naam();
    el.round.textContent = 'Round ' + t.round + (t.done > 0 ? ' · ' + t.done + ' completed' : '');
    if (el.progress) {
      var ratio = (t.mode === 'down' && t.durSec > 0) ? (t.remainAccum / t.durSec) : 0;
      F.progress(el.progress, ratio);
    }
    el.btnPause.textContent = t.paused ? 'Resume' : 'Pause';
    el.btnStart.textContent = t.running ? 'Restart' : (t.finished ? 'Start' : 'Start');
    if (t.finished && t.mode === 'down') renderDone(); else el.doneMount.innerHTML = '';
  }

  function ensureTick() {
    if (_timer) clearInterval(_timer);
    _timer = setInterval(tick, 250);
  }

  function tick() {
    if (!t.running || t.paused) return;
    var now = Date.now();
    var dt = (now - _last) / 1000;
    _last = now;
    if (t.mode === 'down') {
      t.remainAccum = Math.max(0, t.remainAccum - dt);
      render();
      if (t.remainAccum <= 0) roundComplete();
    } else {
      t.remainAccum += dt;
      render();
    }
    if (Math.floor(now / 5000) !== Math.floor((now - dt * 1000) / 5000)) persistRunning();
  }

  function startRound(round) {
    t.round = round || t.round;
    t.finished = false;
    if (t.mode === 'down') t.remainAccum = t.durSec || 0;
    else t.remainAccum = 0;
    t.running = true; t.paused = false;
    t.startTs = Date.now(); _last = Date.now();
    save(); ensureTick(); render();
    if (t.mode === 'down' && t.durSec <= 0) { F.toast('Choose a duration first.'); }
  }

  function roundComplete() {
    t.done++;
    t.running = false; t.finished = true;
    t.round++;
    save();
    F.haptic([12, 40, 12]); F.sound('complete');
    render();
  }

  function pauseToggle() {
    if (!t.running) return;
    if (t.paused) { t.paused = false; _last = Date.now(); }
    else {
      var dt = (Date.now() - _last) / 1000;
      if (t.mode === 'down') t.remainAccum = Math.max(0, t.remainAccum - dt);
      else t.remainAccum += dt;
      t.paused = true;
    }
    save(); render();
  }

  function reset() {
    F.confirm({
      title: 'Reset this timer session?',
      message: 'Stops the timer and clears the current round and this session\u2019s completed rounds.',
      confirmText: 'Reset timer', cancelText: 'Keep going',
      onConfirm: function () {
        t.running = false; t.paused = false; t.finished = false;
        t.round = 1; t.done = 0;
        t.remainAccum = t.mode === 'down' ? (t.durSec || 0) : 0;
        save(); render();
        F.toast('Timer reset');
      }
    });
  }

  function setPreset(min) { t.durSec = min * MIN; save(); render(); F.toast('Duration set to ' + F.fmtDur(t.durSec)); }
  function applyCustomMin() {
    var v = parseFloat(el.customMin.value);
    if (!v || v <= 0) { F.toast('Enter minutes'); return; }
    t.durSec = Math.round(v * MIN); save(); render();
    F.toast('Duration set to ' + F.fmtDur(t.durSec));
  }

  function toggleSound() { data.prefs.sound = !data.prefs.sound; save(); renderSound(); }
  function renderSound() { el.btnSound.textContent = data.prefs.sound ? 'Sound: on' : 'Sound: muted'; }

  function wire() {
    var modeBtns = el.mode.querySelectorAll('button');
    modeBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        modeBtns.forEach(function (x) { x.classList.toggle('is-active', x === b); });
        if (t.mode !== b.getAttribute('data-mode')) {
          t.mode = b.getAttribute('data-mode');
          t.running = false; t.finished = false;
          t.remainAccum = t.mode === 'down' ? (t.durSec || 0) : 0;
          save(); render();
        }
      });
    });
    PRESETS.forEach(function (min) {
      var c = doc.createElement('button');
      c.type = 'button'; c.className = 'chip'; c.textContent = min + ' min';
      c.addEventListener('click', function () { setPreset(min); });
      el.presets.appendChild(c);
    });
    el.applyCustom.addEventListener('click', applyCustomMin);
    el.customMin.addEventListener('keydown', function (e) { if (e.key === 'Enter') applyCustomMin(); });
    el.btnStart.addEventListener('click', function () {
      if (t.mode === 'down' && t.durSec <= 0) { F.toast('Choose a duration first.'); return; }
      startRound(t.round);
    });
    el.btnPause.addEventListener('click', pauseToggle);
    el.btnReset.addEventListener('click', reset);
    el.btnSound.addEventListener('click', toggleSound);
    el.customInput.addEventListener('input', function () {
      t.custom = el.customInput.value.trim(); if (t.custom) save();
    });
  }

  function init() {
    var d = NJ.store.load(); data = d; t = d.modules.timer;
    if (!t.durSec) t.durSec = 21 * MIN;
    F.naamPicker(el.naams, {
      naams: F.naams(), selected: t.naamId, includeCustom: true, customWrap: el.custom, customLabel: 'Custom Naam',
      onSelect: function (id) { t.naamId = id; if (id !== 'custom') t.custom = ''; save(); render(); }
    });
    // set active mode button state
    var modeBtns = el.mode.querySelectorAll('button');
    modeBtns.forEach(function (x) { x.classList.toggle('is-active', x.getAttribute('data-mode') === t.mode); });
    wire();
    ensureTick();
    renderSound(); render();
  }

  global.addEventListener('beforeunload', function () { if (t.running && !t.paused) persistRunning(); });
  doc.addEventListener('visibilitychange', function () { if (doc.visibilityState === 'hidden' && t.running && !t.paused) persistRunning(); });

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);