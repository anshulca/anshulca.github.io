/* =========================================================================
   NAAM JAP · TOOLS HUB  (/tools/)
   Five quiet helpers, one page:
     1. Mala Calculator     — beads ↔ malas ↔ total jap
     2. Jap Goal Calculator — target ↔ days ↔ malas per day
     3. 1 Lakh Challenge    — a persisted 100,000-naam sankalp counter
     4. 108 Calculator      — rounds × 108 + extra beads
     5. Jap Timer           — links to the full timer module
   The Lakh Challenge persists via NJ.store (modules.lakh) and feeds today.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var F = NJ.feature;
  if (!NJ.store || !F) { if (console) console.error('tools: store/shared missing.'); return; }

  var $ = function (id) { return doc.getElementById(id); };
  var MALA = 108;

  var el = {
    /* Mala calc */
    malaBeads: $('calc-mala-beads'), malaMalas: $('calc-mala-malas'), malaBtn: $('calc-mala-run'), malaOut: $('calc-mala-out'),
    /* Goal calc */
    goalTotal: $('calc-goal-total'), goalDays: $('calc-goal-days'), goalRate: $('calc-goal-rate'), goalBtn: $('calc-goal-run'), goalOut: $('calc-goal-out'),
    /* 108 calc */
    c108Rounds: $('calc-108-rounds'), c108Beads: $('calc-108-beads'), c108Btn: $('calc-108-run'), c108Out: $('calc-108-out'),
    /* Lakh */
    lakhNum: $('lakh-num'), lakhLabel: $('lakh-label'), lakhRemain: $('lakh-remain'), lakhBar: $('lakh-bar'),
    lakhAdd: $('lakh-add'), lakhUndo: $('lakh-undo'), lakhAddNum: $('lakh-add-num'), lakhAddCustom: $('lakh-add-custom'),
    lakhTarget: $('lakh-target'), lakhSetTarget: $('lakh-set-target'), lakhReset: $('lakh-reset'),
    lakhState: $('lakh-state'), lakhFace: $('lakh-face'), lakhPace: $('lakh-pace')
  };

  function num(v, d) { v = parseInt(v, 10); return (isNaN(v) || v < 0) ? d : v; }
  function show(out, html) { if (!out) return; out.innerHTML = html; out.classList.add('is-show'); }
  function fmt(n) { return n.toLocaleString(); }
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  };

  /* ---- 1. Mala Calculator ------------------------------------------------ */
  function calcMala() {
    var beads = num(el.malaBeads.value, 0);
    var malas = num(el.malaMalas.value, 0);
    if (beads === 0 && malas === 0) { F.toast('Enter beads or malas first.'); return; }
    var total = beads + malas * MALA;
    var m = Math.floor(total / MALA);
    var b = total % MALA;
    show(el.malaOut,
      '<b>' + fmt(total) + '</b><span>total jap</span>' +
      '<small>' + fmt(m) + ' full malas · ' + fmt(b) + ' beads · ' + (total / MALA).toFixed(2) + ' malas</small>');
  }

  /* ---- 2. Jap Goal Calculator -------------------------------------------- */
  function calcGoal() {
    var total = num(el.goalTotal.value, 0);
    var days = num(el.goalDays.value, 0);
    var rate = num(el.goalRate.value, 0);
    if (total <= 0) { F.toast('Enter a target number of jap.'); return; }
    var out = '';
    if (days > 0) {
      var perDay = Math.ceil(total / days);
      out += '<b>' + fmt(perDay) + '</b><span>jap per day</span>';
      out += '<small>' + fmt(total) + ' jap over ' + fmt(days) + ' days · ' + (perDay / MALA).toFixed(2) + ' malas / day</small>';
    } else if (rate > 0) {
      var needDays = Math.ceil(total / rate);
      out += '<b>' + fmt(needDays) + '</b><span>days needed</span>';
      out += '<small>at ' + fmt(rate) + ' jap/day (' + (rate / MALA).toFixed(2) + ' malas/day) · ' + fmt(total) + ' jap total</small>';
    } else {
      F.toast('Enter days or jap-per-day.'); return;
    }
    show(el.goalOut, out);
  }

  /* ---- 3. 108 Calculator ------------------------------------------------- */
  function calc108() {
    var rounds = num(el.c108Rounds.value, 0);
    var beads = num(el.c108Beads.value, 0);
    var total = rounds * MALA + beads;
    show(el.c108Out,
      '<b>' + fmt(total) + '</b><span>' + fmt(rounds) + ' malas × 108' + (beads ? ' + ' + fmt(beads) + ' beads' : '') + '</span>' +
      '<small>= ' + (total / MALA).toFixed(2) + ' malas</small>');
  }

  /* ---- 4. 1 Lakh Challenge ------------------------------------------------ */
  function lakhData() {
    var d = NJ.store.load();
    return { data: d, lakh: d.modules.lakh };
  }
  function lakhSave(data) { NJ.store.save(data); }
  function lakhTarget() { return lakhData().lakh.target || 100000; }
  function lakhSince() {
    var started = lakhData().lakh.started;
    if (!started) return 0;
    try {
      var s = new Date(started), n = new Date();
      return Math.max(0, Math.round((n - s) / 86400000)) + 1;
    } catch (e) { return 0; }
  }
  function lakhRender() {
    if (!el.lakhNum) return;
    var o = lakhData();
    var l = o.lakh;
    var t = l.target || 100000;
    var remaining = Math.max(0, t - l.count);
    el.lakhNum.innerHTML = fmt(l.count) + ' <small>/ ' + fmt(t) + '</small>';
    el.lakhLabel.textContent = 'naam of jap counted';
    el.lakhRemain.textContent = fmt(remaining) + ' remaining · ' + fmt(Math.round(l.count / t * 100)) + '%';
    F.progress(el.lakhBar, t > 0 ? l.count / t : 0);
    var done = l.count >= t && t > 0;
    el.lakhFace.style.display = done ? 'none' : '';
    if (el.lakhState) el.lakhState.style.display = done ? '' : 'none';
    if (el.lakhPace) {
      var days = lakhSince();
      var pace = days > 0 ? (l.count / days) : 0;
      el.lakhPace.innerHTML = 'begun ' + (days > 0 ? days + ' day' + (days === 1 ? '' : 's') + ' ago' : 'today') + ' · avg ' + fmt(Math.round(pace)) + ' / day';
    }
  }
  function lakhAdd(n) {
    n = num(n, 0);
    if (n <= 0) { F.toast('Enter a number first.'); return; }
    var o = lakhData();
    var t = o.lakh.target || 100000;
    if (o.lakh.count >= t) { F.toast('Sankalp already complete — reset to begin again.'); return; }
    if (o.lakh.count + n > t) { n = t - o.lakh.count; F.toast('Added the remaining ' + n + ' to complete the sankalp'); }
    o.lakh.count += n;
    if (!o.lakh.started) o.lakh.started = NJ.store.nowISO();
    lakhSave(o.data);
    NJ.store.addToday(n, 0);
    F.bump(el.lakhNum); F.haptic(10); F.sound(o.lakh.count >= t ? 'complete' : 'short');
    lakhRender();
    if (o.lakh.count >= t) { F.haptic([12, 40, 12]); F.sound('complete'); F.toast('One lakh of the Name — sankalp complete · ॥', 'success'); }
  }
  function lakhUndo() {
    var o = lakhData();
    var n = Math.min(o.lakh.count, MALA);
    if (n <= 0) { F.toast('Nothing to undo.'); return; }
    o.lakh.count -= n;
    lakhSave(o.data);
    var todayJap = NJ.store.getToday().jap;
    NJ.store.addToday(-Math.min(n, Math.max(0, todayJap)), 0);
    lakhRender(); F.toast('Undid ' + n + ' jap');
  }
  function lakhSetTarget() {
    var t = num(el.lakhTarget.value, 0);
    if (t <= 0) { F.toast('Enter a valid target'); return; }
    var o = lakhData();
    o.lakh.target = t;
    if (o.lakh.count > t) o.lakh.count = t;
    lakhSave(o.data); lakhRender(); F.toast('Target set to ' + fmt(t));
  }
  function lakhReset() {
    F.confirm({
      title: 'Reset the lakh challenge?',
      message: 'This clears the current lakh count and starts a fresh sankalp. Your lifetime and today\u2019s totals are kept.',
      confirmText: 'Start fresh', cancelText: 'Keep counting',
      onConfirm: function () {
        var o = lakhData();
        o.lakh.count = 0; o.lakh.started = NJ.store.nowISO();
        lakhSave(o.data); lakhRender(); F.toast('A fresh lakh begins', 'success');
      }
    });
  }

  /* ---- 5. Quick timer teaser ----------------------------------------------- */
  function renderTimerTeaser() {
    var mount = $('tools-timer-quick');
    if (!mount) return;
    mount.innerHTML =
      '<div class="timer-quick">' +
      '<div style="flex:1;min-width:200px"><h3 style="font-family:var(--font-display);font-size:var(--text-lg)">Jap Timer</h3>' +
      '<p class="muted" style="font-size:var(--text-sm);margin-top:var(--space-1)">Countdown and count-up, presets up to 108 minutes, rounds and a gentle completion cue.</p></div>' +
      '<a class="btn btn--primary" href="/jap/jap-timer/">Open the timer →</a>' +
      '</div>';
  }

  /* ---- Wire up --------------------------------------------------------------- */
  function wire() {
    if (el.malaBtn) el.malaBtn.addEventListener('click', calcMala);
    if (el.malaBeads) el.malaBeads.addEventListener('keydown', function (e) { if (e.key === 'Enter') calcMala(); });
    if (el.goalBtn) el.goalBtn.addEventListener('click', calcGoal);
    if (el.goalDays) el.goalDays.addEventListener('keydown', function (e) { if (e.key === 'Enter') calcGoal(); });
    if (el.c108Btn) el.c108Btn.addEventListener('click', calc108);
    if (el.c108Rounds) el.c108Rounds.addEventListener('keydown', function (e) { if (e.key === 'Enter') calc108(); });
    if (el.lakhAdd) el.lakhAdd.addEventListener('click', function () { lakhAdd(MALA); });
    if (el.lakhUndo) el.lakhUndo.addEventListener('click', lakhUndo);
    if (el.lakhAddCustom) el.lakhAddCustom.addEventListener('click', function () { lakhAdd(num(el.lakhAddNum.value, 0)); });
    if (el.lakhAddNum) el.lakhAddNum.addEventListener('keydown', function (e) { if (e.key === 'Enter') lakhAdd(num(el.lakhAddNum.value, 0)); });
    if (el.lakhSetTarget) el.lakhSetTarget.addEventListener('click', lakhSetTarget);
    if (el.lakhTarget) el.lakhTarget.addEventListener('keydown', function (e) { if (e.key === 'Enter') lakhSetTarget(); });
    if (el.lakhReset) el.lakhReset.addEventListener('click', lakhReset);
  }

  function init() {
    wire();
    lakhRender();
    renderTimerTeaser();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);