/* =========================================================================
   NAAM JAP · HOME  (live today strip)
   Fills the "Today" card on / with real numbers from the store - today's
   jap / malas / naam and the current streak - then fades the "Coming"
   placeholder out. Requires: store.js, shared.js (via feature).
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var F = NJ && NJ.feature;
  if (!NJ || !NJ.store || !F) return;

  function fmt(n) { return Number(n || 0).toLocaleString(); }

  function render() {
    var card = doc.getElementById('today-card');
    if (!card) return;
    var t = NJ.store.getToday();
    var s = F.streak();
    var d = NJ.store.load();
    var man = d.modules.sadhana.manual || {};
    var done = man[NJ.store.todayKey()] || (t.jap + t.malas + t.naam) > 0;

    card.innerHTML =
      '<span class="today__day" aria-hidden="true">॥</span>' +
      '<span class="today__mid">' +
      '<strong>' + (done ? 'Today\u2019s sadhana is underway' : 'A moment for today') + '</strong>' +
      '<span>' + fmt(t.jap) + ' jap · ' + fmt(t.malas) + ' malas · ' + fmt(t.naam) + ' written' +
      (s.current > 0 ? ' · ' + s.current + '-day streak' : '') + '</span>' +
      '</span>' +
      '<span class="pill pill--good">See sadhana</span>';
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', render);
  else render();

})(typeof window !== 'undefined' ? window : this);