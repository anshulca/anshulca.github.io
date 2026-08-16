/* =========================================================================
   NAAM JAP · DIGITAL MALA  (/jap/digital-mala/)
   108 beads + meru. One tap = one jap. Auto-advances to the next mala,
   tracks completed malas + lifetime total. Persists via NJ.store.
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
  var completing = false, completionTimer = null, completedAtMala = -1, activeIdx = -1;

  var el = {
    naams: $('mala-naams'), custom: $('mala-custom'), customInput: $('mala-custom-input'),
    ring: $('mala-ring'), btn: $('mala-tap'),
    dev: $('tap-naam-dev'), en: $('tap-naam-en'), count: $('mala-count'), mala: $('mala-label'),
    sumToday: $('sum-today'), sumTotal: $('sum-total'), sumMalas: $('sum-malas'), sumMala: $('sum-mala'),
    progress: $('mala-progress'), btnPause: $('btn-pause'), btnReset: $('btn-reset')
  };

  function naam() {
    if (m.naamId === 'custom') return { english: m.cust || 'Your naam', dev: '' };
    var naams = (global.NAAM_JAP_CONFIG.jap && global.NAAM_JAP_CONFIG.jap.naams) || [];
    for (var i = 0; i < naams.length; i++) if (naams[i].id === m.naamId) return naams[i];
    return naams[0] || { english: 'Ram', dev: 'राम' };
  }

  function setCount(a, b) { el.count.innerHTML = a + ' <small>/ ' + b + '</small>'; }

  function render() {
    var n = naam(), s = m.ses;
    el.dev.textContent = n.dev || ''; el.en.textContent = n.english;
    if (completing) {
      el.btn.classList.add('is-complete');
      setCount('108', '108');
      el.dev.textContent = 'Mala Complete'; el.en.textContent = '108 Naam Jap';
    } else {
      el.btn.classList.remove('is-complete');
      setCount(String(s.in), String(MALA));
    }
    el.mala.textContent = (data.today && data.today.malas ? '' : '') + 'Mala ' + s.mala;
    el.sumMala.textContent = s.mala;
    el.sumTotal.textContent = m.stat.total;
    el.sumMalas.textContent = m.stat.malas;
    var t = NJ.store.getToday();
    el.sumToday.textContent = t.jap;
    F.progress(el.progress, s.in / MALA);
    if (ring) ring.update(s.in);
    el.btnPause.textContent = s.paused ? 'Resume' : 'Pause';
    el.btn.classList.toggle('is-paused', s.paused);
  }

  var ring = null;
  function initRing() {
    ring = F.buildMalaRing(el.ring, MALA);
  }

  function persist() { NJ.store.save(data); }

  function rollover() { m.ses.in = 0; m.ses.mala++; }

  function countOne() {
    if (m.ses.paused) { F.toast('Press Resume to continue counting.'); return; }
    if (m.ses.in >= MALA) rollover();
    m.ses.in++;
    m.stat.total++;
    persist();
    NJ.store.addToday(1, 0);
    render();
    F.bump(el.count); F.haptic(10);
    if (m.ses.in === MALA) completeMala();
  }

  function completeMala() {
    m.ses.malas++; m.stat.malas++;
    persist();
    NJ.store.addToday(0, 1);
    F.haptic([12, 40, 12]); F.sound('complete');
    completedAtMala = m.ses.mala; completing = true;
    render();
    F.toast('Mala ' + m.ses.mala + ' complete · 108', 'success');
    clearTimeout(completionTimer);
    completionTimer = setTimeout(function () {
      if (m.ses.mala === completedAtMala) { m.ses.in = 0; m.ses.mala = completedAtMala + 1; }
      completing = false; persist(); render();
    }, 1400);
  }

  function pauseToggle() {
    m.ses.paused = !m.ses.paused;
    F.toast(m.ses.paused ? 'Paused' : 'Resumed');
    persist(); render();
  }

  function reset() {
    F.confirm({
      title: 'Reset this mala session?',
      message: 'Clears the current count and session malas. Your lifetime and today\u2019s totals are kept.',
      confirmText: 'Reset session', cancelText: 'Keep counting',
      onConfirm: function () {
        m.ses = { mala: 1, in: 0, malas: 0, paused: false };
        completing = false; clearTimeout(completionTimer); completedAtMala = -1;
        persist(); render();
        F.toast('Session reset - lifetime kept', 'success');
      }
    });
  }

  function wire() {
    el.btn.addEventListener('click', countOne);
    el.btn.addEventListener('pointerdown', function (e) { if (e.isPrimary) F.ripple(el.btn, e.clientX, e.clientY); });
    el.btnReset.addEventListener('click', reset);
    el.btnPause.addEventListener('click', pauseToggle);
    el.customInput.addEventListener('input', function () {
      var v = el.customInput.value.trim(); m.cust = v;
      if (v) { persist(); render(); }
    });
  }

  function init() {
    var data0 = NJ.store.load(); m = data0.modules.mala; data = data0;
    initRing(); wire();
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