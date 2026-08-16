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
    btnPause: $('cj-pause'), btnReset: $('cj-reset')
  };

  var TARGETS = [108, 1008, 10008];

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
    F.bump(el.count); F.haptic(10);
    if (cj.count >= t) { cj.completed = true; F.haptic([12, 40, 12]); F.sound('complete'); persist(); render(); }
  }

  function pauseToggle() { cj.paused = !cj.paused; persist(); render(); }

  function reset() {
    F.confirm({
      title: 'Reset this count?',
      message: 'Clears the current count for this naam and target. Your lifetime and today\u2019s totals are kept.',
      confirmText: 'Reset count', cancelText: 'Keep counting',
      onConfirm: function () {
        cj.count = 0; cj.completed = false; cj.paused = false; persist(); render();
        F.toast('Count reset — lifetime kept', 'success');
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
  }

  function init() {
    var d = NJ.store.load(); data = d; cj = d.modules.custom;
    if (!cj.target) cj.target = 108;
    el.naam.value = cj.naam || '';
    wire();
    var chips = el.targets.querySelectorAll('.chip');
    chips.forEach(function (x) { x.classList.toggle('is-active', parseInt(x.getAttribute('data-target'), 10) === cj.target); });
    render();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);