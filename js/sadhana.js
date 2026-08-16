/* =========================================================================
   NAAM JAP · SADHANA  (/sadhana/)
   The daily flow: targets for jap / malas / lekhan, a personal sankalp,
   and a quiet streak that counts real practice - with the option to mark
   a day manually. Persists via NJ.store (modules.sadhana).
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var C = global.NAAM_JAP_CONFIG;
  var NJ = global.NJ;
  var F = NJ.feature;
  if (!NJ.store || !F) { if (console) console.error('sadhana: store/shared missing.'); return; }

  var $ = function (id) { return doc.getElementById(id); };

  var el = {
    status: $('sad-status'),
    japVal: $('sad-target-jap'), japMinus: $('sad-target-jap-minus'), japPlus: $('sad-target-jap-plus'),
    malasVal: $('sad-target-malas'), malasMinus: $('sad-target-malas-minus'), malasPlus: $('sad-target-malas-plus'),
    naamVal: $('sad-target-naam'), naamMinus: $('sad-target-naam-minus'), naamPlus: $('sad-target-naam-plus'),
    barJap: $('sad-bar-jap'), barMalas: $('sad-bar-malas'), barNaam: $('sad-bar-naam'),
    manualBtn: $('sad-manual'),
    sankalp: $('sad-sankalp'), sankalpEdit: $('sad-sankalp-edit'), sankalpInput: $('sad-sankalp-input'),
    sankalpSave: $('sad-sankalp-save'), sankalpCancel: $('sad-sankalp-cancel'), sankalpPresets: $('sad-sankalp-presets'),
    sankalpEditor: $('sad-sankalp-editor'),
    streakNum: $('sad-streak-num'), streakBest: $('sad-streak-best'), streakStrip: $('sad-streak-strip'), streakToday: $('sad-streak-today'),
    linkJap: $('sad-link-jap-num'), linkLekhan: $('sad-link-lekhan-num')
  };

  var conf = (C.sadhana && C.sadhana.targets) || {};
  var defT = (C.sadhana && C.sadhana.defaultTargets) || { jap: 108, malas: 1, naam: 0 };

  var esc = function (s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  function data() { return NJ.store.load(); }
  function sad() { return data().modules.sadhana; }
  function persist() { NJ.store.save(data()); }

  function today() { return NJ.store.getToday(); }

  /* ---- Targets -------------------------------------------------------------- */
  function clamp(v, max) { v = parseInt(v, 10) || 0; return Math.max(0, Math.min(max || 100000, v)); }
  function setTarget(key, v) {
    var s = sad();
    var max = (conf[key] && conf[key].max) || 100000;
    s.target[key] = clamp(v, max);
    persist(); render();
  }
  function stepTarget(key, delta) {
    var s = sad();
    var step = (conf[key] && conf[key].step) || 1;
    setTarget(key, (s.target[key] || 0) + delta * step);
  }

  /* ---- Sankalp --------------------------------------------------------------- */
  function sankalpText() { return sad().sankalp || ''; }
  function setSankalp(t) {
    var s = sad();
    s.sankalp = String(t || '').trim();
    persist(); renderSankalp();
    F.toast('Sankalp set - hold it gently', 'success');
  }

  /* ---- Manual day marking ------------------------------------------------------ */
  function manualMark() {
    var tk = NJ.store.todayKey();
    var s = sad();
    var man = s.manual || (s.manual = {});
    var on = !man[tk];
    if (on) {
      if (today().jap === 0 && today().malas === 0 && today().naam === 0) {
        F.toast('That would be a vow without practice - do a little first.'); return;
      }
      man[tk] = true;
      F.toast('Today marked - with intention');
    } else {
      delete man[tk];
      F.toast('Today\u2019s mark removed');
    }
    persist(); render();
  }

  /* ---- Qualification / status --------------------------------------------------- */
  function targetMet() {
    var s = sad(); var t = today();
    return {
      jap: (s.target.jap || 0) <= 0 || t.jap >= (s.target.jap || 0),
      malas: (s.target.malas || 0) <= 0 || t.malas >= (s.target.malas || 0),
      naam: (s.target.naam || 0) <= 0 || t.naam >= (s.target.naam || 0)
    };
  }
  function dayComplete() {
    var m = targetMet();
    var man = sad().manual;
    if (man && man[NJ.store.todayKey()]) return true;
    return m.jap && m.malas && m.naam;
  }

  /* ---- Rendering ---------------------------------------------------------------- */
  function rowVal(key, met) {
    var s = sad();
    var v = s.target[key] || 0;
    var t = today();
    var got = t[key] || 0;
    var label = (conf[key] && conf[key].label) || key;
    var unit = (conf[key] && conf[key].unit) || '';
    var valEl = key === 'jap' ? el.japVal : key === 'malas' ? el.malasVal : el.naamVal;
    var barEl = key === 'jap' ? el.barJap : key === 'malas' ? el.barMalas : el.barNaam;
    if (valEl) {
      valEl.innerHTML = (v > 0 ? fmt(v) : '<span class="target-zero">not set</span>') + ' <small>' + label + (v > 0 ? ' · ' + fmt(got) + ' ' + unit + ' today' : '') + '</small>';
    }
    if (barEl) {
      var ratio = v > 0 ? Math.min(1, got / v) : 0;
      barEl.style.width = (ratio * 100).toFixed(1) + '%';
      barEl.classList.toggle('is-done', met);
    }
  }
  function fmt(n) { return Number(n || 0).toLocaleString(); }

  function render() {
    if (!el.status) return;
    var m = targetMet();
    var done = dayComplete();
    var t = today();
    var d = data();
    var man = d.modules.sadhana.manual || {};

    el.status.className = 'pill' + (done ? ' pill--good' : '');
    el.status.textContent = man[NJ.store.todayKey()]
      ? 'Marked with intention'
      : (done ? 'Complete · ॥' : 'In progress');

    rowVal('jap', m.jap);
    rowVal('malas', m.malas);
    rowVal('naam', m.naam);

    if (el.manualBtn) {
      el.manualBtn.textContent = man[NJ.store.todayKey()] ? 'Remove today\u2019s mark' : 'Mark today complete';
    }

    if (el.linkJap) el.linkJap.textContent = fmt(t.jap) + ' jap today';
    if (el.linkLekhan) el.linkLekhan.textContent = fmt(t.naam) + ' written today';
  }

  function renderSankalp() {
    if (!el.sankalp) return;
    var t = sankalpText();
    if (t) {
      el.sankalp.classList.remove('is-empty');
      el.sankalp.textContent = '“' + t + '”';
    } else {
      el.sankalp.classList.add('is-empty');
      el.sankalp.textContent = 'No sankalp set yet - a small vow to guide the practice.';
    }
    if (el.sankalpInput) el.sankalpInput.value = t;
  }

  function renderStreak() {
    if (!el.streakNum) return;
    var s = F.streak();
    el.streakNum.textContent = s.current;
    el.streakBest.textContent = 'Best: ' + s.best + ' days';
    el.streakToday.textContent = s.today
      ? 'Today counts - the streak is alive.'
      : 'No practice recorded today yet - the streak breathes through the day.';
    var strip = el.streakStrip;
    strip.innerHTML = '';
    var days = F.lastNDays(14);
    for (var i = 0; i < days.length; i++) {
      var c = doc.createElement('span');
      c.className = 'streak-cell';
      c.textContent = F.parseKey(days[i]).getDate();
      if (F.isToday(days[i])) c.classList.add('is-today');
      if (F.qualified(days[i])) c.classList.add('is-on');
      c.title = F.humanDate(days[i]);
      strip.appendChild(c);
    }
  }

  /* ---- Sankalp editor ------------------------------------------------------------ */
  function openEditor() {
    if (!el.sankalpInput) return;
    renderSankalp();
    if (el.sankalpEditor) el.sankalpEditor.hidden = false;
    if (el.sankalp) el.sankalp.hidden = true;
    if (el.sankalpEdit) el.sankalpEdit.hidden = true;
    if (el.sankalpPresets) el.sankalpPresets.hidden = false;
    el.sankalpInput.focus();
  }
  function closeEditor() {
    if (el.sankalpEditor) el.sankalpEditor.hidden = true;
    if (el.sankalp) el.sankalp.hidden = false;
    if (el.sankalpEdit) el.sankalpEdit.hidden = false;
    if (el.sankalpPresets) el.sankalpPresets.hidden = true;
  }

  /* ---- Wire up -------------------------------------------------------------------- */
  function wire() {
    if (el.japMinus) el.japMinus.addEventListener('click', function () { stepTarget('jap', -1); });
    if (el.japPlus) el.japPlus.addEventListener('click', function () { stepTarget('jap', 1); });
    if (el.malasMinus) el.malasMinus.addEventListener('click', function () { stepTarget('malas', -1); });
    if (el.malasPlus) el.malasPlus.addEventListener('click', function () { stepTarget('malas', 1); });
    if (el.naamMinus) el.naamMinus.addEventListener('click', function () { stepTarget('naam', -1); });
    if (el.naamPlus) el.naamPlus.addEventListener('click', function () { stepTarget('naam', 1); });
    if (el.manualBtn) el.manualBtn.addEventListener('click', manualMark);
    if (el.sankalpEdit) el.sankalpEdit.addEventListener('click', openEditor);
    if (el.sankalpSave) el.sankalpSave.addEventListener('click', function () { setSankalp(el.sankalpInput.value); closeEditor(); });
    if (el.sankalpCancel) el.sankalpCancel.addEventListener('click', closeEditor);
    if (el.sankalpPresets) {
      var presets = (C.sadhana && C.sadhana.sankalpPresets) || [];
      presets.forEach(function (p) {
        var b = doc.createElement('button');
        b.type = 'button'; b.className = 'chip';
        b.textContent = p;
        b.addEventListener('click', function () { el.sankalpInput.value = p; });
        el.sankalpPresets.appendChild(b);
      });
    }
  }

  function init() {
    var s = sad();
    if (s.target === undefined) { s.target = {}; }
    var needs = { jap: defT.jap, malas: defT.malas, naam: defT.naam };
    for (var k in needs) {
      if (s.target[k] === undefined) s.target[k] = needs[k];
    }
    persist();
    wire();
    renderSankalp();
    closeEditor();
    renderStreak();
    render();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);