/* =========================================================================
   NAAM JAP · JOURNEY DASHBOARD  (/journey/)
   A single quiet view of the whole practice: today's sadhana, lifetime
   totals, streak, a 365-day GitHub-style heatmap, 14-day rhythm chart,
   milestones with downloadable/shareable badges, and share cards.
   Everything reads from the local store - nothing leaves the device.
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
    heatmapYear: $('jrn-heatmap-year'), heatmapMeta: $('jrn-heatmap-meta'),
    bars: $('jrn-bars'), barsMeta: $('jrn-bars-meta'),
    milestones: $('jrn-milestones'), milestonesMeta: $('jrn-milestones-meta'),
    share: $('jrn-share')
  };

  function fmt(n) { return Number(n || 0).toLocaleString(); }

  /* ---- 365-day GitHub-style heatmap ----------------------------------------- */
  function renderHeatmapYear() {
    if (!el.heatmapYear) return;
    var hist = F.history();
    var days = F.lastNDays(365);
    var active = 0, maxs = 0;

    for (var i = 0; i < days.length; i++) {
      var d = hist[days[i]];
      var n = (d && (d.jap + d.malas * 108)) || 0;
      if (n > 0) { active++; if (n > maxs) maxs = n; }
    }

    var today = new Date();
    var dayOfWeek = today.getDay();
    var startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);

    var dayLabels = ['', 'Mo', '', 'We', '', 'Fr', ''];
    var dayLabelsHTML = '<div class="heatmap-year__day-labels">';
    for (var dl = 0; dl < 7; dl++) {
      dayLabelsHTML += '<span class="heatmap-year__day-label">' + dayLabels[dl] + '</span>';
    }
    dayLabelsHTML += '</div>';

    var gridHTML = '';
    var prevMonth = -1;
    var colIdx = 0;
    var startDow = startDate.getDay();

    for (var p = 0; p < startDow; p++) {
      gridHTML += '<span style="visibility:hidden"></span>';
    }

    for (var j = 0; j < days.length; j++) {
      var day = days[j];
      var dateObj = F.parseKey(day);
      var month = dateObj.getMonth();
      var rec = hist[day];
      var v = (rec && (rec.jap + rec.malas * 108)) || 0;
      var cls = 'hm-cell';
      if (v > 0) {
        var r = maxs > 0 ? v / maxs : 0;
        cls += r > 0.66 ? ' l4' : r > 0.33 ? ' l3' : r > 0.15 ? ' l2' : ' l1';
      }
      if (F.isToday(day)) cls += ' is-today';
      var title = F.humanDate(day) + (v > 0 ? ' · ' + fmt(v) + ' jap' : (F.qualified(day) ? ' · marked' : ''));
      gridHTML += '<span class="' + cls + '" title="' + title + '"></span>';
    }

    var monthsHTML = '';
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var cur = new Date(startDate);
    var seenMonths = {};
    for (var w = 0; w < 53; w++) {
      var testDate = new Date(startDate);
      testDate.setDate(testDate.getDate() + w * 7);
      if (testDate > today) break;
      var mo = testDate.getMonth();
      if (!seenMonths[mo]) {
        seenMonths[mo] = true;
      }
    }

    el.heatmapYear.innerHTML =
      '<div class="heatmap-year__wrap">' + dayLabelsHTML +
      '<div class="heatmap-year__grid" style="grid-template-rows:repeat(7,12px)">' + gridHTML + '</div></div>' +
      '<div class="heatmap-year__legend">' +
      '<span>Less</span>' +
      '<span class="hm-cell"></span><span class="hm-cell l1"></span><span class="hm-cell l2"></span><span class="hm-cell l3"></span><span class="hm-cell l4"></span>' +
      '<span>More</span></div>';

    if (el.heatmapMeta) el.heatmapMeta.innerHTML =
      '<span>' + F.humanDate(days[0]) + ' → ' + F.humanDate(days[days.length - 1]) + '</span>' +
      '<span>' + active + ' active day' + (active === 1 ? '' : 's') + ' of 365</span>';
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

  /* ---- Milestones with badges --------------------------------------------------- */
  function renderMilestones() {
    if (!el.milestones) return;
    var list = F.milestones();
    el.milestones.innerHTML = list.map(function (m) {
      var done = m.done;
      return '<div class="milestone' + (done ? ' is-done' : '') + '" data-ms-id="' + esc(m.id) + '">' +
        '<span class="milestone__glyph' + (done ? '' : ' is-locked') + '" aria-hidden="true">' + esc(m.dev) + '</span>' +
        '<span class="milestone__mid"><b>' + esc(m.label) + '</b><span>' + esc(m.desc) + '</span></span>' +
        (done
          ? '<span class="milestone__actions">' +
            '<button class="milestone__act" data-act="download" title="Download badge" aria-label="Download badge">⬇</button>' +
            '<button class="milestone__act" data-act="share" title="Share badge" aria-label="Share badge">↗</button>' +
            '</span>'
          : '<span class="milestone__state">Next at ' + fmt(m.at) + '</span>') +
        '</div>';
    }).join('');

    el.milestones.querySelectorAll('[data-act]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var row = btn.closest('.milestone');
        var msId = row.getAttribute('data-ms-id');
        var ms = list.filter(function (m) { return m.id === msId; })[0];
        if (!ms) return;
        if (btn.getAttribute('data-act') === 'download') downloadBadge(ms);
        else shareBadge(ms);
      });
    });

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

  /* ---- Badge generation (Canvas) ----------------------------------------------- */
  function createBadgeCanvas(ms) {
    var c = doc.createElement('canvas');
    c.width = 800; c.height = 800;
    var ctx = c.getContext('2d');

    ctx.fillStyle = '#f6f3ec';
    ctx.fillRect(0, 0, 800, 800);

    ctx.strokeStyle = '#b98a3a';
    ctx.lineWidth = 4;
    roundRect(ctx, 40, 40, 720, 720, 32);
    ctx.stroke();

    ctx.strokeStyle = '#e8dfc9';
    ctx.lineWidth = 1;
    roundRect(ctx, 52, 52, 696, 696, 24);
    ctx.stroke();

    ctx.fillStyle = '#b98a3a';
    ctx.beginPath();
    ctx.arc(400, 260, 90, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f6f3ec';
    ctx.font = 'bold 60px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ms.dev || '॥', 400, 260);

    ctx.fillStyle = '#31405f';
    ctx.font = '600 36px Georgia, serif';
    ctx.fillText(ms.label, 400, 410);

    ctx.fillStyle = '#888';
    ctx.font = '20px Inter, sans-serif';
    wrapText(ctx, ms.desc, 400, 470, 560, 28);

    ctx.beginPath();
    ctx.moveTo(250, 530);
    ctx.lineTo(550, 530);
    ctx.strokeStyle = '#e8dfc9';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#b98a3a';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText('MILESTONE ACHIEVED', 400, 570);

    ctx.fillStyle = '#31405f';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.fillText('Dhun', 400, 640);

    ctx.fillStyle = '#888';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText('Naam Jap Mala & Sadhana', 400, 672);

    ctx.fillStyle = '#b98a3a';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('by CA Anshul Karwa', 400, 710);

    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = '#aaa';
    ctx.fillText('jap.studyfromnotes.com', 400, 750);

    return c;
  }

  function wrapText(ctx, text, x, y, maxW, lineH) {
    var words = text.split(' ');
    var line = '';
    for (var i = 0; i < words.length; i++) {
      var test = line + words[i] + ' ';
      if (ctx.measureText(test).width > maxW && i > 0) {
        ctx.fillText(line.trim(), x, y);
        line = words[i] + ' ';
        y += lineH;
      } else {
        line = test;
      }
    }
    ctx.fillText(line.trim(), x, y);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function downloadBadge(ms) {
    var c = createBadgeCanvas(ms);
    var link = doc.createElement('a');
    link.download = 'dhun-badge-' + ms.id + '.png';
    link.href = c.toDataURL('image/png');
    link.click();
    F.toast('Badge downloaded', 'success');
  }

  function shareBadge(ms) {
    var c = createBadgeCanvas(ms);
    c.toBlob(function (blob) {
      if (!blob) { F.toast('Could not generate badge'); return; }
      var file = new File([blob], 'dhun-badge-' + ms.id + '.png', { type: 'image/png' });
      var shareData = {
        title: ms.label + ' — Dhun',
        text: 'I reached the "' + ms.label + '" milestone on Dhun: Naam Jap Mala & Sadhana! 🙏\n' + ms.desc + '\n\nby CA Anshul Karwa',
        files: [file]
      };
      if (navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData).catch(function () {});
      } else if (navigator.share) {
        delete shareData.files;
        navigator.share(shareData).catch(function () {});
      } else {
        downloadBadge(ms);
      }
    }, 'image/png');
  }

  /* ---- Share cards --------------------------------------------------------------- */
  function renderShareCards() {
    if (!el.share) return;
    var t = F.totals();
    var s = F.streak();
    var cards = [
      { num: fmt(t.jap), label: 'Total Jap', msg: 'I completed ' + fmt(t.jap) + ' naam jap' },
      { num: fmt(t.malas), label: 'Malas Complete', msg: 'I completed ' + fmt(t.malas) + ' malas of 108' },
      { num: s.current + ' days', label: 'Current Streak', msg: 'I have a ' + s.current + '-day jap streak' },
      { num: s.best + ' days', label: 'Best Streak', msg: 'My best jap streak is ' + s.best + ' days' }
    ];
    el.share.innerHTML = cards.map(function (c) {
      return '<div class="share-card" data-share-msg="' + esc(c.msg) + '">' +
        '<div class="share-card__num">' + c.num + '</div>' +
        '<div class="share-card__label">' + c.label + '</div>' +
        '<div class="share-card__btn">Share ↗</div></div>';
    }).join('');
    el.share.querySelectorAll('.share-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var msg = card.getAttribute('data-share-msg');
        shareText(msg);
      });
    });
  }

  function shareText(msg) {
    var full = msg + ' on Dhun: Naam Jap Mala & Sadhana by CA Anshul Karwa 🙏\n\njap.studyfromnotes.com';
    if (navigator.share) {
      navigator.share({ title: 'Dhun — Naam Jap', text: full }).catch(function () {});
    } else {
      try {
        navigator.clipboard.writeText(full);
        F.toast('Copied to clipboard', 'success');
      } catch (e) {
        F.toast('Share not supported on this device');
      }
    }
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
      el.todayStatus.textContent = (t.jap || t.malas || t.naam) ? 'Practice recorded today' : 'Rest day - return when ready';
    }
    if (el.totalJap) el.totalJap.textContent = fmt(totals.jap);
    if (el.totalMalas) el.totalMalas.textContent = fmt(totals.malas);
    if (el.totalNaam) el.totalNaam.textContent = fmt(totals.naam);
    if (el.totalPages) el.totalPages.textContent = fmt(totals.pages);

    if (el.streak) el.streak.textContent = s.current;
    if (el.streakBest) el.streakBest.textContent = 'Best ' + s.best + ' days';
    if (el.streakToday) el.streakToday.textContent = s.today
      ? 'Today counts - keep the thread.'
      : 'Nothing recorded today yet.';

    renderHeatmapYear();
    renderBars();
    renderMilestones();
    renderShareCards();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', render);
  else render();

})(typeof window !== 'undefined' ? window : this);
