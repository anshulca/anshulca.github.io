/* =========================================================================
   NAAM JAP · WRITING CHALLENGES  (/lekhan/writing-challenges/)
   Days and pages challenges, persisted locally. Days challenges auto-complete
   a day when the user's Naam Lekhan reaches the daily target (today.naam).
   Pages challenges are fuelled by completed pages in the notebook.
   Exposes NJ.challenges.{checkDaily, onPageComplete} so lekhan can feed them.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var F = NJ.feature;
  if (!NJ.store || !F) { if (console) console.error('challenges: store/shared missing.'); return; }

  var $ = function (id) { return doc.getElementById(id); };
  var el = {
    predefined: $('chall-predefined'), list: $('chall-list'),
    cName: $('chall-name'), cType: $('chall-type'), cTotal: $('chall-total'), cDaily: $('chall-daily'), cCreate: $('chall-create'),
    createWrap: $('chall-create-zone'), customToggle: $('chall-custom-toggle')
  };

    F.pad2 = F.pad2 || function (n) { return n < 10 ? '0' + n : '' + n; };
  var esc = (F.nb && F.nb.escSafe) || function (s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  function challenges() { return NJ.store.load().modules.challenges; }
  function saveCh(arr) { var d = NJ.store.load(); d.modules.challenges = arr; NJ.store.save(d); }
  function today() { return NJ.store.todayKey(); }

  function startOfDay(key) { var p = key.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]).getTime(); }
  function dayIndex(key) {
    return Math.floor((startOfDay(today()) - startOfDay(key)) / 86400000) + 1; // 1-based current day
  }
  function keyFromIndex(key, zeroIdx) {
    var d = new Date(startOfDay(key) + zeroIdx * 86400000);
    return d.getFullYear() + '-' + F.pad2(d.getMonth() + 1) + '-' + F.pad2(d.getDate());
  }
  function streakOf(doneMap, key) {
    var streak = 0, i = dayIndex(key);
    for (;;) {
      if (!doneMap || !doneMap[keyFromIndex(key, i - 1)]) break;
      streak++; i--;
      if (i <= 0 || streak > 10000) break;
    }
    return streak;
  }
  function pagesDone() {
    return (F.nb && F.nb.idx ? F.nb.idx().filter(function (p) { return p.status === 'complete'; }).length : 0);
  }

  /* ---- Auto-connection from Naam Lekhan ------------------------------------- */
  function checkDaily() {
    var tk = today();
    var t = NJ.store.getToday();
    var changed = false;
    var arr = challenges();
    arr.forEach(function (c) {
      if (c.kind === 'days' && !c.completed && c.done) {
        if (t.naam >= (c.dailyTarget || 108)) c.done[tk] = true;
        var total = c.total || 1;
        if (Object.keys(c.done).length >= total) { c.completed = true; c.completedAt = NJ.store.nowISO(); }
        changed = true;
      }
    });
    if (changed) saveCh(arr);
  }
  function onPageComplete() {
    var changed = false;
    var arr = challenges();
    arr.forEach(function (c) {
      if (c.kind === 'pages' && !c.completed && pagesDone() >= (c.total || 1)) {
        c.completed = true; c.completedAt = NJ.store.nowISO(); changed = true;
      }
    });
    if (changed) saveCh(arr);
    checkDaily();
  }

  /* ---- Challenge creation --------------------------------------------------- */
  function createDays(name, total, dailyTarget) {
    var arr = challenges();
    arr.push({ id: F.uid(), kind: 'days', name: name || 'Naam Lekhan Challenge',
      total: total, dailyTarget: dailyTarget || 108, start: today(), done: {}, completed: false });
    saveCh(arr); render(); F.toast('Challenge started - ' + name, 'success');
  }
  function createPages(name, total) {
    var arr = challenges();
    arr.push({ id: F.uid(), kind: 'pages', name: name || 'Pages Challenge',
        total: total, start: today(), completed: pagesDone() >= total });
    saveCh(arr); render(); F.toast('Challenge started - ' + name, 'success');
  }

  /* ---- Interactions --------------------------------------------------------- */
  function markToday(id) {
    var tk = today(); var t = NJ.store.getToday();
    var arr = challenges();
    var c = null;
    for (var i = 0; i < arr.length; i++) if (arr[i].id === id) { c = arr[i]; break; }
    if (!c || c.kind !== 'days' || c.completed) return;
    if (t.naam < (c.dailyTarget || 108)) { F.toast('Reach the daily target of ' + (c.dailyTarget || 108) + ' Naam first.'); return; }
    c.done[tk] = true;
    if (Object.keys(c.done).length >= c.total) { c.completed = true; c.completedAt = NJ.store.nowISO(); }
    saveCh(arr); render(); F.toast('Day marked complete', 'success');
  }

  function deleteChallenge(id) {
    F.confirm({
      title: 'End this challenge?',
      message: 'This removes the challenge and its local history.',
      confirmText: 'End challenge', cancelText: 'Keep it',
      onConfirm: function () { saveCh(challenges().filter(function (c) { return c.id !== id; })); render(); F.toast('Challenge ended'); }
    });
  }

  /* ---- Rendering ------------------------------------------------------------ */
  function dayCells(c) {
    var out = '';
    for (var i = 0; i < c.total; i++) {
      var k = keyFromIndex(c.start, i);
      var cls = 'day-cell';
      if (c.done && c.done[k]) cls += ' is-done';
      if (k === today()) cls += ' is-today';
      out += '<span class="' + cls + '" title="Day ' + (i + 1) + '"></span>';
    }
    return out;
  }

  function card(c) {
    var pct, daysLabel, doneCount, streak;
    if (c.kind === 'days') {
      doneCount = Object.keys(c.done || {}).length;
      var di = dayIndex(c.start);
      var cur = Math.min(di, c.total);
      pct = Math.round((doneCount / c.total) * 100);
      daysLabel = 'Day ' + cur + ' / ' + c.total;
      streak = streakOf(c.done || {}, c.start);
    } else {
      var pd = pagesDone();
      pct = Math.round(Math.min(1, pd / (c.total || 1)) * 100);
      daysLabel = pd + ' / ' + c.total + ' pages';
      doneCount = pd; streak = 0;
    }
    var status = c.completed ? '<span class="pill pill--good">Completed</span>' : '<span class="pill">' + pct + '%</span>';
    return '<div class="chall-card">' +
      '<div class="nb-card__row"><h3>' + esc(c.name) + '</h3>' + status + '</div>' +
      '<p class="muted" style="margin-top:var(--space-1)">' + daysLabel + '</p>' +
      '<div class="pct"><span>Daily target: ' + (c.kind === 'days' ? (c.dailyTarget || 108) + ' Naam' : '&mdash;') + '</span><span>Streak: ' + streak + '</span></div>' +
      '<div class="progress" style="margin-top:var(--space-3)"><div class="progress__bar" style="width:' + pct + '%"></div></div>' +
      (c.kind === 'days' ? '<div class="day-strip">' + dayCells(c) + '</div>' : '') +
      '<div class="chall-actions">' +
      (c.kind === 'days' && !c.completed ? '<button type="button" class="btn btn--soft btn--sm" data-mark data-id="' + c.id + '">Mark today</button>' : '') +
      '<button type="button" class="btn btn--ink btn--sm" data-del data-id="' + c.id + '">End</button>' +
      '</div>' +
      (c.completed ? '<div class="done-state"><span class="done-state__glyph" aria-hidden="true">॥</span><h2>' + c.name + ' Complete</h2></div>' : '') +
      '</div>';
  }

  function render() {
    var arr = challenges();
    if (!el.list) return;
    el.list.innerHTML = arr.length ? arr.map(card).join('') : '<div class="nb-empty">No challenges yet - choose one above.</div>';
    el.list.querySelectorAll('[data-mark]').forEach(function (b) { b.addEventListener('click', function () { markToday(b.getAttribute('data-id')); }); });
    el.list.querySelectorAll('[data-del]').forEach(function (b) { b.addEventListener('click', function () { deleteChallenge(b.getAttribute('data-id')); }); });
  }

  function renderPredefined() {
    if (!el.predefined) return;
    el.predefined.innerHTML =
      '<button type="button" class="chip" data-new=\'{"kind":"days","name":"40 Days of Naam Lekhan","total":40,"daily":108}\'>40 Days</button>' +
      '<button type="button" class="chip" data-new=\'{"kind":"days","name":"21 Days of Naam Lekhan","total":21,"daily":108}\'>21 Days</button>' +
      '<button type="button" class="chip" data-new=\'{"kind":"pages","name":"108 Pages Challenge","total":108}\'>108 Pages</button>';
    el.predefined.querySelectorAll('[data-new]').forEach(function (b) {
      b.addEventListener('click', function () {
        var o = JSON.parse(b.getAttribute('data-new'));
        if (o.kind === 'days') createDays(o.name, o.total, o.daily); else createPages(o.name, o.total);
      });
    });
  }

  function wire() {
    renderPredefined();
    if (el.customToggle) el.customToggle.addEventListener('click', function () { if (el.createWrap) el.createWrap.hidden = !el.createWrap.hidden; });
    if (el.cCreate) el.cCreate.addEventListener('click', function () {
      var name = (el.cName && el.cName.value.trim()) || '';
      var kind = (el.cType && el.cType.value) || 'days';
      var total = parseInt(el.cTotal && el.cTotal.value, 10) || 0;
      if (total <= 0) { F.toast('Enter a duration/target'); return; }
      if (kind === 'days') { var daily = parseInt(el.cDaily && el.cDaily.value, 10) || 108; createDays(name, total, daily); }
      else { createPages(name, total); }
    });
  }

  var api = { checkDaily: checkDaily, onPageComplete: onPageComplete, render: render };
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { wire(); render(); });
  else { wire(); render(); }
  global.NJ = global.NJ || {};
  global.NJ.challenges = api;

})(typeof window !== 'undefined' ? window : this);