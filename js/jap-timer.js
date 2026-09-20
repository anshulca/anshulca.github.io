/* =========================================================================
   NAAM JAP · JAP TIMER  (/jap/jap-timer/)
   Countdown (presets + custom) and count-up. Tap to count jap alongside the
   timer. Voice (pre-recorded + TTS), haptic, speed control.
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
  var t = data.modules.timer;
  var _timer = null;
  var _last = Date.now();

  var el = {
    mode: $('timer-mode'), presets: $('timer-presets'), customMin: $('timer-custom-min'), applyCustom: $('timer-apply-custom'),
    face: $('timer-face'), meta: $('timer-meta'), round: $('timer-round'), progress: $('timer-progress'),
    naamDev: $('timer-naam-dev'), naamEn: $('timer-naam-en'),
    tapBtn: $('timer-tap'), japCount: $('timer-jap-count'),
    btnStart: $('timer-start'), btnPause: $('timer-pause'), btnReset: $('timer-reset'), btnSound: $('timer-sound'),
    btnVoice: $('btn-voice'), btnHaptic: $('btn-haptic'),
    doneMount: $('timer-done'), naams: $('timer-naams'), custom: $('timer-custom'), customInput: $('timer-custom-input')
  };

  /* ---- Voice system -------------------------------------------------------- */
  var VOICE_KEY = 'nj:jap:voice';
  var SPEED_KEY = 'nj:jap:speed';
  var HAPTIC_KEY = 'nj:jap:haptic';
  var voiceEnabled = true;
  var hapticEnabled = true;
  var speedRate = 1.0;
  var naamAudioCache = {};
  var synth = global.speechSynthesis || null;

  function preloadAudio(id) {
    if (naamAudioCache[id]) return;
    var a = new Audio('/assets/audio/' + id + '.mp3');
    a.preload = 'auto';
    naamAudioCache[id] = a;
  }

  function speakNaam() {
    if (!voiceEnabled) return;
    var id = t.naamId;
    if (id === 'custom') { speakCustom(t.custom || ''); return; }
    var cached = naamAudioCache[id];
    if (cached) {
      cached.playbackRate = speedRate;
      cached.currentTime = 0;
      cached.play().catch(function () {});
    } else {
      var a = new Audio('/assets/audio/' + id + '.mp3');
      a.playbackRate = speedRate;
      a.play().catch(function () {});
      naamAudioCache[id] = a;
    }
  }

  function speakCustom(text) {
    if (!synth || !text) return;
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = /[ऀ-ॿ]/.test(text) ? 'hi-IN' : 'en-IN';
    u.rate = speedRate; u.pitch = 1; u.volume = 1;
    var voices = synth.getVoices();
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].lang === 'hi-IN' || voices[i].lang.indexOf('hi') === 0) { u.voice = voices[i]; break; }
    }
    synth.speak(u);
  }

  function loadVoice() {
    try { var v = localStorage.getItem(VOICE_KEY); voiceEnabled = v === null ? true : v === '1'; } catch (e) {}
    updateVoiceBtn();
    var naams = (global.NAAM_JAP_CONFIG.jap && global.NAAM_JAP_CONFIG.jap.naams) || [];
    for (var i = 0; i < naams.length; i++) preloadAudio(naams[i].id);
  }
  function toggleVoice() {
    voiceEnabled = !voiceEnabled;
    try { localStorage.setItem(VOICE_KEY, voiceEnabled ? '1' : '0'); } catch (e) {}
    updateVoiceBtn();
    F.toast(voiceEnabled ? 'Voice on' : 'Voice off');
  }
  function updateVoiceBtn() {
    if (!el.btnVoice) return;
    el.btnVoice.textContent = voiceEnabled ? 'Voice On' : 'Voice Off';
    el.btnVoice.classList.toggle('is-active', voiceEnabled);
  }

  function loadHaptic() {
    try { var v = localStorage.getItem(HAPTIC_KEY); hapticEnabled = v === null ? true : v === '1'; } catch (e) {}
    updateHapticBtn();
  }
  function toggleHaptic() {
    hapticEnabled = !hapticEnabled;
    try { localStorage.setItem(HAPTIC_KEY, hapticEnabled ? '1' : '0'); } catch (e) {}
    updateHapticBtn();
    F.toast(hapticEnabled ? 'Vibration on' : 'Vibration off');
  }
  function updateHapticBtn() {
    if (!el.btnHaptic) return;
    el.btnHaptic.textContent = hapticEnabled ? 'Vibration On' : 'Vibration Off';
    el.btnHaptic.classList.toggle('is-active', hapticEnabled);
  }
  function haptic(pattern) {
    if (!hapticEnabled) return;
    try { if (global.navigator && navigator.vibrate) navigator.vibrate(pattern); } catch (e) {}
  }

  function loadSpeed() {
    try { var s = parseFloat(localStorage.getItem(SPEED_KEY)); if (s >= 0.5 && s <= 2.5) speedRate = s; } catch (e) {}
    syncSlider();
  }
  function syncSlider() {
    var slider = $('speed-slider'), label = $('speed-value');
    if (slider) { slider.value = speedRate; updateSliderFill(slider); }
    if (label) label.textContent = speedRate.toFixed(1) + 'x';
  }
  function updateSliderFill(slider) {
    var pct = ((slider.value - 0.5) / 2.0) * 100;
    slider.style.setProperty('--fill', pct + '%');
  }

  /* ---- Jap count ----------------------------------------------------------- */
  var japCount = 0;

  function tapJap() {
    japCount++;
    NJ.store.addToday(1, 0);
    renderJapCount();
    haptic(10);
    speakNaam();
    F.bump(el.japCount);
  }

  function renderJapCount() {
    if (el.japCount) el.japCount.innerHTML = japCount + ' <small>jap</small>';
  }

  /* ---- Naam display -------------------------------------------------------- */
  function naamObj() {
    if (t.naamId === 'custom') return { english: t.custom || 'Your naam', dev: '' };
    var naams = (global.NAAM_JAP_CONFIG.jap && global.NAAM_JAP_CONFIG.jap.naams) || [];
    for (var i = 0; i < naams.length; i++) if (naams[i].id === t.naamId) return naams[i];
    return naams[0] || { english: 'Ram', dev: 'राम' };
  }

  function naam() {
    var n = naamObj();
    return n.english + (n.dev ? ' ' + n.dev : '');
  }

  function renderNaamDisplay() {
    var n = naamObj();
    if (el.naamDev) el.naamDev.textContent = n.dev || '';
    if (el.naamEn) el.naamEn.textContent = n.english;
  }

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
      '<p class="done-meta">' + F.fmtDur(t.durSec) + ' · Round ' + (t.round - 1) + (japCount ? ' · ' + japCount + ' jap' : '') + '</p>' +
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
    el.btnStart.textContent = t.running ? 'Restart' : 'Start';
    if (t.finished && t.mode === 'down') renderDone(); else el.doneMount.innerHTML = '';
    renderNaamDisplay();
    renderJapCount();
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
    japCount = 0;
    save(); ensureTick(); render();
    if (t.mode === 'down' && t.durSec <= 0) { F.toast('Choose a duration first.'); }
  }

  function roundComplete() {
    t.done++;
    t.running = false; t.finished = true;
    t.round++;
    save();
    haptic([100, 50, 100, 50, 200]); F.sound('complete');
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
      message: 'Stops the timer and clears the current round and this session’s completed rounds.',
      confirmText: 'Reset timer', cancelText: 'Keep going',
      onConfirm: function () {
        t.running = false; t.paused = false; t.finished = false;
        t.round = 1; t.done = 0;
        t.remainAccum = t.mode === 'down' ? (t.durSec || 0) : 0;
        japCount = 0;
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
    if (el.btnVoice) el.btnVoice.addEventListener('click', toggleVoice);
    if (el.btnHaptic) el.btnHaptic.addEventListener('click', toggleHaptic);

    if (el.tapBtn) {
      el.tapBtn.addEventListener('click', tapJap);
      el.tapBtn.addEventListener('pointerdown', function (e) { if (e.isPrimary) F.ripple(el.tapBtn, e.clientX, e.clientY); });
    }

    var speedSlider = $('speed-slider');
    if (speedSlider) {
      speedSlider.addEventListener('input', function () {
        speedRate = parseFloat(this.value);
        updateSliderFill(this);
        var label = $('speed-value');
        if (label) label.textContent = speedRate.toFixed(1) + 'x';
        try { localStorage.setItem(SPEED_KEY, speedRate); } catch (e) {}
      });
    }

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
    var modeBtns = el.mode.querySelectorAll('button');
    modeBtns.forEach(function (x) { x.classList.toggle('is-active', x.getAttribute('data-mode') === t.mode); });
    wire();
    loadVoice(); loadSpeed(); loadHaptic();
    ensureTick();
    renderSound(); render();
  }

  global.addEventListener('beforeunload', function () { if (t.running && !t.paused) persistRunning(); });
  doc.addEventListener('visibilitychange', function () { if (doc.visibilityState === 'hidden' && t.running && !t.paused) persistRunning(); });

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);
