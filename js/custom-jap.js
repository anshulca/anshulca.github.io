/* =========================================================================
   NAAM JAP · CUSTOM NAAM JAP  (/jap/custom-naam-jap/)
   Enter any naam/mantra, choose a target, and count on a large tap area.
   Local-only: the custom naam and counts never leave the device.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var F = NJ.feature;
  if (!NJ.store || !F) { if (console) console.error('custom-jap: store/shared missing.'); return; }

  var $ = function (id) { return doc.getElementById(id); };

  var data = NJ.store.load();
  var cj = data.modules.custom;   // { naam, target, count, paused, completed, startTs }

  var el = {
    naam: $('cj-naam'), targets: $('cj-targets'), customTarget: $('cj-target-custom'), applyTarget: $('cj-target-apply'),
    btn: $('cj-tap'), dev: $('cj-naam-dev'), en: $('cj-naam-en'), count: $('cj-count'), targetLabel: $('cj-target-label'),
    progress: $('cj-progress'), doneMount: $('cj-done'),
    btnPause: $('cj-pause'), btnReset: $('cj-reset'),
    btnVoice: $('btn-voice'), btnHaptic: $('btn-haptic')
  };

  var TARGETS = [108, 1008, 10008];

  /* ---- Voice / haptic / speed -------------------------------------------- */
  var VOICE_KEY = 'nj:jap:voice';
  var SPEED_KEY = 'nj:jap:speed';
  var HAPTIC_KEY = 'nj:jap:haptic';
  var voiceEnabled = true;
  var hapticEnabled = true;
  var speedRate = 1.0;
  var synth = global.speechSynthesis || null;

  function speakNaam() {
    if (!voiceEnabled || !synth) return;
    var text = cj.naam;
    if (!text) return;
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

  function persist() { NJ.store.save(data); }
  function target() { return cj.target || 108; }

  function setCount(a, b) { el.count.innerHTML = a + ' <small>/ ' + b + '</small>'; }

  function render() {
    var name = cj.naam || 'Enter a naam to begin';
    el.dev.textContent = name;
    el.en.textContent = target() + ' target' + (cj.paused ? ' · paused' : '');
    if (cj.completed) {
      el.btn.classList.add('is-complete');
      setCount(String(cj.count), String(target()));
    } else {
      el.btn.classList.remove('is-complete');
      setCount(String(cj.count), String(target()));
    }
    el.targetLabel.textContent = 'Target: ' + target();
    F.progress(el.progress, target() > 0 ? cj.count / target() : 0);
    el.btnPause.textContent = cj.paused ? 'Resume' : 'Pause';
    el.btn.classList.toggle('is-paused', cj.paused);
    if (cj.completed) renderDone();
    else el.doneMount.innerHTML = '';
  }
  function renderDone() {
    el.doneMount.innerHTML =
      '<div class="done-state">' +
      '<span class="done-state__glyph" aria-hidden="true">॥</span>' +
      '<h2>Sadhana Complete</h2>' +
      '<p class="done-total">' + cj.count + ' jap</p>' +
      '<div class="btn-group" style="margin-top:var(--space-5);justify-content:center">' +
      '<button type="button" class="btn btn--primary" data-again>Begin again</button>' +
      '</div></div>';
    var b = el.doneMount.querySelector('[data-again]');
    if (b) b.addEventListener('click', function () {
      cj.completed = false; cj.count = 0; persist(); render();
      F.toast('A fresh count begins');
    });
  }

  function countOne() {
    if (cj.paused) { F.toast('Press Resume to continue.'); return; }
    var t = target();
    cj.count++;
    cj.total = (cj.total || 0) + 1;
    persist();
    NJ.store.addToday(1, 0);
    render();
    F.bump(el.count);
    haptic(10);
    speakNaam();
    if (cj.count >= t) { cj.completed = true; haptic([100, 50, 100, 50, 200]); F.sound('complete'); persist(); render(); }
  }

  function pauseToggle() { cj.paused = !cj.paused; persist(); render(); }

  function reset() {
    F.confirm({
      title: 'Reset this count?',
      message: 'Clears the current count for this naam and target. Your lifetime and today\u2019s totals are kept.',
      confirmText: 'Reset count', cancelText: 'Keep counting',
      onConfirm: function () {
        cj.count = 0; cj.completed = false; cj.paused = false; persist(); render();
        F.toast('Count reset - lifetime kept', 'success');
      }
    });
  }

  function setTarget(t) {
    cj.target = t; cj.count = 0; cj.completed = false; persist(); render();
    var chips = el.targets.querySelectorAll('.chip');
    chips.forEach(function (x) { x.classList.toggle('is-active', parseInt(x.getAttribute('data-target'), 10) === t); });
  }
  function applyCustomTarget() {
    var v = parseInt(el.customTarget.value, 10);
    if (!v || v <= 0) { F.toast('Enter a valid target'); return; }
    setTarget(v); F.toast('Target set to ' + v);
  }

  function wire() {
    el.btn.addEventListener('click', countOne);
    el.btn.addEventListener('pointerdown', function (e) { if (e.isPrimary) F.ripple(el.btn, e.clientX, e.clientY); });
    el.btnPause.addEventListener('click', pauseToggle);
    el.btnReset.addEventListener('click', reset);
    if (el.btnVoice) el.btnVoice.addEventListener('click', toggleVoice);
    if (el.btnHaptic) el.btnHaptic.addEventListener('click', toggleHaptic);
    el.applyTarget.addEventListener('click', applyCustomTarget);
    el.customTarget.addEventListener('keydown', function (e) { if (e.key === 'Enter') applyCustomTarget(); });
    TARGETS.forEach(function (t) {
      var c = doc.createElement('button');
      c.type = 'button'; c.className = 'chip'; c.textContent = t.toLocaleString(); c.setAttribute('data-target', t);
      c.addEventListener('click', function () { setTarget(t); });
      el.targets.appendChild(c);
    });
    el.naam.addEventListener('input', function () {
      cj.naam = el.naam.value.trim(); if (cj.naam) persist(); render();
    });

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
  }

  function init() {
    var d = NJ.store.load(); data = d; cj = d.modules.custom;
    if (!cj.target) cj.target = 108;
    el.naam.value = cj.naam || '';
    wire();
    loadVoice(); loadSpeed(); loadHaptic();
    var chips = el.targets.querySelectorAll('.chip');
    chips.forEach(function (x) { x.classList.toggle('is-active', parseInt(x.getAttribute('data-target'), 10) === cj.target); });
    render();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);