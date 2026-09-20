/* =========================================================================
   NAAM JAP · DIGITAL MALA  (/jap/digital-mala/)
   Premium 108-bead circular mala. One tap = one jap = one bead moves.
   Voice (pre-recorded + TTS fallback), haptic, speed control.
   No auto-reset after 108 — user explicitly starts the next mala.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var F = NJ.feature;
  if (!NJ.store || !F) { if (console) console.error('digital-mala: store/shared missing.'); return; }

  var MALA = 108;
  var $ = function (id) { return doc.getElementById(id); };

  var data = NJ.store.load();
  var m = data.modules.mala;
  var completed = false;

  var el = {
    naams: $('mala-naams'), custom: $('mala-custom'), customInput: $('mala-custom-input'),
    ring: $('mala-ring'), btn: $('mala-tap'),
    dev: $('mala-dev'), en: $('mala-en'), count: $('mala-count'),
    label: $('mala-label'), hint: $('mala-hint'), center: $('mala-center'),
    nextWrap: $('mala-next-wrap'), nextBtn: $('mala-next'),
    sumToday: $('sum-today'), sumTotal: $('sum-total'), sumMalas: $('sum-malas'), sumMala: $('sum-mala'),
    progress: $('mala-progress'), btnVoice: $('btn-voice'), btnHaptic: $('btn-haptic'), btnReset: $('btn-reset')
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
    var id = m.naamId;
    if (id === 'custom') { speakCustom(m.cust || ''); return; }
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

  /* ---- Premium mala ring --------------------------------------------------- */
  var beads = [];
  var NS = 'http://www.w3.org/2000/svg';

  function buildMala() {
    var svg = doc.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.setAttribute('class', 'dm-svg');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Mala progress');

    var cx = 200, cy = 190, R = 168, BR = 3.2;
    var gapDeg = 20, spanDeg = 360 - gapDeg;
    var startAngle = 90 - gapDeg / 2;

    var stringEl = doc.createElementNS(NS, 'circle');
    stringEl.setAttribute('cx', cx); stringEl.setAttribute('cy', cy); stringEl.setAttribute('r', R);
    stringEl.setAttribute('class', 'dm-string');
    svg.appendChild(stringEl);

    for (var i = 0; i < MALA; i++) {
      var angle = startAngle - (spanDeg * i / (MALA - 1));
      var rad = angle * Math.PI / 180;
      var c = doc.createElementNS(NS, 'circle');
      c.setAttribute('cx', (cx + R * Math.cos(rad)).toFixed(2));
      c.setAttribute('cy', (cy + R * Math.sin(rad)).toFixed(2));
      c.setAttribute('r', BR);
      c.setAttribute('class', 'dm-bead');
      svg.appendChild(c);
      beads.push(c);
    }

    var meruY = cy + R;
    var meru = doc.createElementNS(NS, 'circle');
    meru.setAttribute('cx', cx); meru.setAttribute('cy', meruY.toFixed(2));
    meru.setAttribute('r', 6); meru.setAttribute('class', 'dm-meru');
    svg.appendChild(meru);

    var tassel = doc.createElementNS(NS, 'g');
    tassel.setAttribute('class', 'dm-tassel');
    var tY = meruY + 6;
    addLine(tassel, cx, tY, cx, tY + 12, 2);
    var knot = doc.createElementNS(NS, 'circle');
    knot.setAttribute('cx', cx); knot.setAttribute('cy', (tY + 14).toFixed(2)); knot.setAttribute('r', 2.5);
    tassel.appendChild(knot);
    addLine(tassel, cx - 3, tY + 16, cx - 5, tY + 26, 1.2);
    addLine(tassel, cx, tY + 16, cx, tY + 28, 1.2);
    addLine(tassel, cx + 3, tY + 16, cx + 5, tY + 26, 1.2);
    svg.appendChild(tassel);

    el.ring.appendChild(svg);
  }

  function addLine(parent, x1, y1, x2, y2, w) {
    var l = doc.createElementNS(NS, 'line');
    l.setAttribute('x1', x1); l.setAttribute('y1', y1.toFixed(2));
    l.setAttribute('x2', x2); l.setAttribute('y2', y2.toFixed(2));
    l.setAttribute('stroke-width', w);
    parent.appendChild(l);
  }

  function updateBeads() {
    var count = m.ses.in;
    for (var i = 0; i < MALA; i++) {
      beads[i].classList.toggle('is-counted', i < count);
      beads[i].classList.toggle('is-active', i === count && count < MALA);
    }
  }

  /* ---- Naam lookup --------------------------------------------------------- */
  function naam() {
    if (m.naamId === 'custom') return { english: m.cust || 'Your naam', dev: '' };
    var naams = (global.NAAM_JAP_CONFIG.jap && global.NAAM_JAP_CONFIG.jap.naams) || [];
    for (var i = 0; i < naams.length; i++) if (naams[i].id === m.naamId) return naams[i];
    return naams[0] || { english: 'Ram', dev: 'राम' };
  }

  /* ---- Rendering ----------------------------------------------------------- */
  function setCount(a, b) { el.count.innerHTML = a + ' <small>/ ' + b + '</small>'; }

  function render() {
    var n = naam(), s = m.ses;
    el.sumMala.textContent = s.mala;
    el.sumTotal.textContent = m.stat.total;
    el.sumMalas.textContent = m.stat.malas;
    var t = NJ.store.getToday();
    el.sumToday.textContent = t.jap;
    F.progress(el.progress, s.in / MALA);
    updateBeads();

    if (completed) {
      el.dev.textContent = '॥';
      el.en.textContent = '';
      el.count.innerHTML = '';
      el.label.textContent = '108 Jap Complete';
      el.hint.textContent = 'Mala ' + s.mala + ' · ' + n.english;
      el.btn.classList.add('is-done');
      el.nextWrap.hidden = false;
    } else {
      el.dev.textContent = n.dev || '';
      el.en.textContent = n.english;
      setCount(String(s.in), String(MALA));
      el.label.textContent = 'Mala ' + s.mala;
      el.hint.textContent = 'Tap to jap';
      el.btn.classList.remove('is-done');
      el.nextWrap.hidden = true;
    }
  }

  /* ---- Persistence --------------------------------------------------------- */
  function persist() { var d = NJ.store.load(); d.modules.mala = m; NJ.store.save(d); data = d; }

  /* ---- Counting ------------------------------------------------------------ */
  function countOne() {
    if (completed) return;
    if (m.ses.in >= MALA) return;
    m.ses.in++;
    m.stat.total++;
    persist();
    NJ.store.addToday(1, 0);
    render();
    bumpCount();
    haptic(10);
    speakNaam();
    if (m.ses.in === MALA) completeMala();
  }

  function completeMala() {
    m.ses.malas++; m.stat.malas++;
    persist();
    NJ.store.addToday(0, 1);
    haptic([100, 50, 100, 50, 200]);
    F.sound('complete');
    completed = true;
    render();
    F.toast('Mala ' + m.ses.mala + ' complete · 108', 'success');
  }

  function nextMala() {
    m.ses.in = 0;
    m.ses.mala++;
    completed = false;
    persist();
    render();
    F.toast('Mala ' + m.ses.mala + ' begins');
  }

  function bumpCount() {
    el.count.classList.remove('is-bump');
    void el.count.offsetWidth;
    el.count.classList.add('is-bump');
  }

  /* ---- Reset --------------------------------------------------------------- */
  function reset() {
    F.confirm({
      title: 'Reset this mala session?',
      message: 'Clears the current count and session malas. Your lifetime and today’s totals are kept.',
      confirmText: 'Reset session', cancelText: 'Keep counting',
      onConfirm: function () {
        m.ses = { mala: 1, in: 0, malas: 0, paused: false };
        completed = false;
        persist(); render();
        F.toast('Session reset - lifetime kept', 'success');
      }
    });
  }

  /* ---- Wiring -------------------------------------------------------------- */
  function wire() {
    el.btn.addEventListener('click', countOne);
    el.nextBtn.addEventListener('click', nextMala);
    if (el.btnVoice) el.btnVoice.addEventListener('click', toggleVoice);
    if (el.btnHaptic) el.btnHaptic.addEventListener('click', toggleHaptic);
    el.btnReset.addEventListener('click', reset);

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
      var v = el.customInput.value.trim(); m.cust = v;
      if (v) { persist(); render(); }
    });
  }

  /* ---- Init ---------------------------------------------------------------- */
  function init() {
    var d = NJ.store.load(); m = d.modules.mala; data = d;
    if (m.ses.in >= MALA) completed = true;
    buildMala(); wire();
    loadVoice(); loadSpeed(); loadHaptic();

    F.naamPicker(el.naams, {
      naams: F.naams(), selected: m.naamId, includeCustom: true,
      customWrap: el.custom, customLabel: 'Custom Naam',
      onSelect: function (id) {
        m.naamId = id; if (id !== 'custom') m.cust = '';
        persist(); render();
        if (id === 'custom' && !m.cust) setTimeout(function () { el.customInput.focus(); }, 40);
      }
    });
    render();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);
