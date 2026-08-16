/* =========================================================================
   NAAM JAP · JOURNEY DASHBOARD  (/journey/)
   A single quiet view of the whole practice: today's sadhana, lifetime
   totals, streak, a day heatmap, a 14-day rhythm chart and milestones.
   Everything reads from the local store — nothing leaves the device.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var F = NJ.feature;
  if (!NJ.store || !F) { if (console) console.error('journey: store/shared missing.'); return; }

  var $ = function (id) { return doc.getElementById(id); };

  var el = {
    root: $('jrn-dash'), empty: $('jrn-empty'),
    todayJap: $('jrn-today-jap'), todayMalas: $('jrn-today-malas'), todayNaam: $('jrn-today-naam'),
    todayStatus: $('jrn-today-status'),
    totalJap: $('jrn-total-jap'), totalMalas: $('jrn-total-malas'), totalNaam: $('jrn-total-naam'), totalPages: $('jrn-total-pages'),
    streak: $('jrn-streak'), streakBest: $('jrn-streak-best'), streakToday: $('jrn-streak-today'),
    heatmap: $('jrn-heatmap'), heatmapMeta: $('jrn-heatmap-meta'),
    bars: $('jrn-bars'), barsMeta: $('jrn-bars-meta'),
    milestones: $('jrn-milestones'), milestonesMeta: $('jrn-milestones-meta')
  };

  function fmt(n) { return Number(n || 0).toLocaleString(); }

  /* ---- Heatmap: last 8 weeks, one cell a day ---------------------------------- */
  function renderHeatmap() {
    if (!el.heatmap) return;
    var hist = F.history();
    var days = F.lastNDays(56);
    var active = 0;
    var mins = {}, maxs = 0;
    for (var i = 0; i < days.length; i++) {
      var d = hist[days[i]];
      var n = (d && (d.jap + d.malas * 108)) || 0;
      if (n > 0) { active++; if (n > maxs) maxs = n; }
    }
    var out = '';
    for (var j = 0; j < days.length; j++) {
      var day = days[j];
      var rec = hist[day];
      var v = (rec && (rec.jap + rec.malas * 108)) || 0;
      var cls = 'heatmap__cell';
      if (v > 0) {
        var r = maxs > 0 ? v / maxs : 0;
        var lvl = r > 0.66 ? ' l4' : r > 0.33 ? ' l3' : r > 0.15 ? ' l2' : ' l1';
        cls += lvl;
      }
      if (F.isToday(day)) cls += ' is-today';
      var title = F.humanDate(day) + (v > 0 ? ' · ' + fmt(v) + ' jap' : (F.qualified(day) ? ' · marked' : ' · rest'));
      out += '<span class="' + cls + '" title="' + title + '"></span>';
    }
    el.heatmap.innerHTML = out;
    if (el.heatmapMeta) el.heatmapMeta.innerHTML =
      '<span>' + F.humanDate(days[0]) + ' → ' + F.humanDate(days[days.length - 1]) + '</span>' +
      '<span>' + active + ' active day' + (active === 1 ? '' : 's') + '</span>';
  }

  /* ---- 14-day rhythm bars ------------------------------------------------------- */
  function renderBars() {
    if (!el.bars) return;
    var hist = F.history();
    var days = F.lastNDays(14);
    var vals = days.map(function (k) {
      var d = hist[k] || {};
      return (d.jap || 0) + (d.malas || 0) * 108 + (d.naam || 0);
    });
    var max = Math.max.apply(null, vals.concat([108]));
    var out = '';
    for (var i = 0; i < days.length; i++) {
      var h = vals[i] > 0 ? Math.max(4, Math.round((vals[i] / max) * 100)) : 2;
      var todayCls = F.isToday(days[i]) ? ' is-today' : '';
      out += '<div class="bars__col' + todayCls + '" title="' + F.humanDate(days[i]) + ' · ' + fmt(vals[i]) + '">' +
        '<span class="bars__val">' + (vals[i] > 0 ? compact(vals[i]) : '') + '</span>' +
        '<span class="bars__bar" style="height:' + h + '%"></span>' +
        '<span class="bars__day">' + shortDay(days[i]) + '</span>' +
        '</div>';
    }
    el.bars.innerHTML = out;
    if (el.barsMeta) el.barsMeta.textContent = 'jap + malas + naam written, per day';
  }
  function compact(n) {
    if (n >= 100000) return (n / 100000).toFixed(1) + 'L';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return String(n);
  }
  function shortDay(key) {
    var d = F.parseKey(key);
    var names = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return names[d.getDay()];
  }

  /* ---- Milestones ---------------------------------------------------------------- */
  function renderMilestones() {
    if (!el.milestones) return;
    var list = F.milestones();
    el.milestones.innerHTML = list.map(function (m) {
      var done = m.done;
      return '<div class="milestone' + (done ? ' is-done' : '') + '">' +
        '<span class="milestone__glyph' + (done ? '' : ' is-locked') + '" aria-hidden="true">' + esc(m.dev) + '</span>' +
        '<span class="milestone__mid"><b>' + esc(m.label) + '</b><span>' + esc(m.desc) + '</span></span>' +
        '<span class="milestone__state">' + (done ? 'Reached · ॥' : 'Next at ' + fmt(m.at)) + '</span>' +
        '</div>';
    }).join('');
    if (el.milestonesMeta) {
      var reached = list.filter(function (m) { return m.done; }).length;
      el.milestonesMeta.textContent = reached + ' of ' + list.length + ' milestones reached';
    }
  }
  function esc(s) {
    return String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---- Main render ---------------------------------------------------------------- */
  function hasPractice() {
    var t = F.totals();
    if (t.jap > 0 || t.malas > 0 || t.naam > 0 || t.pages > 0) return true;
    var d = NJ.store.load();
    return !!(d.modules.sadhana.manual && Object.keys(d.modules.sadhana.manual).length);
  }

  function render() {
    if (!hasPractice()) {
      if (el.empty) el.empty.hidden = false;
      if (el.root) el.root.hidden = true;
      return;
    }
    if (el.empty) el.empty.hidden = true;
    if (el.root) el.root.hidden = false;

    var t = NJ.store.getToday();
    var totals = F.totals();
    var s = F.streak();

    if (el.todayJap) el.todayJap.textContent = fmt(t.jap);
    if (el.todayMalas) el.todayMalas.textContent = fmt(t.malas);
    if (el.todayNaam) el.todayNaam.textContent = fmt(t.naam);
    if (el.todayStatus) {
      el.todayStatus.className = 'pill' + ((t.jap || t.malas || t.naam) ? ' pill--good' : '');
      el.todayStatus.textContent = (t.jap || t.malas || t.naam) ? 'Practice recorded today' : 'Rest day — return when ready';
    }
    if (el.totalJap) el.totalJap.textContent = fmt(totals.jap);
    if (el.totalMalas) el.totalMalas.textContent = fmt(totals.malas);
    if (el.totalNaam) el.totalNaam.textContent = fmt(totals.naam);
    if (el.totalPages) el.totalPages.textContent = fmt(totals.pages);

    if (el.streak) el.streak.textContent = s.current;
    if (el.streakBest) el.streakBest.textContent = 'Best ' + s.best + ' days';
    if (el.streakToday) el.streakToday.textContent = s.today
      ? 'Today counts — keep the thread.'
      : 'Nothing recorded today yet.';

    renderHeatmap();
    renderBars();
    renderMilestones();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', render);
  else render();

})(typeof window !== 'undefined' ? window : this);