/* =========================================================================
   NAAM JAP · DIGITAL JAP NOTEBOOK  (/lekhan/digital-jap-notebook/)
   Lists every completed (and in-progress) Naam Lekhan page locally, lets you
   view, continue and delete pages, and provides export/import JSON backup.
   Nothing is uploaded anywhere.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var F = NJ.feature;
  if (!NJ.store || !F) { if (console) console.error('notebook: store/shared missing.'); return; }

  var $ = function (id) { return doc.getElementById(id); };
  var el = {
    list: $('nb-list'), empty: $('nb-empty'), current: $('nb-current'),
    exportBtn: $('nb-export'), importBtn: $('nb-import'), importFile: $('nb-import-file')
  };

  F.nb.escSafe = F.nb.escSafe || function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  };

  function fmtWhen(iso) {
    try { return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }); }
    catch (e) { return ''; }
  }

  function card(rec) {
    var status = rec.status === 'unfinished' ? '<span class="pill pill--soon">Unfinished</span>' : '<span class="pill pill--good">Complete</span>';
    return '<div class="nb-card">' +
      '<div class="nb-card__thumb" aria-hidden="true"><span style="font-family:var(--font-dev)">' + F.nb.escSafe(rec.naamDev || rec.naam || 'नाम') + '</span></div>' +
      '<div class="nb-card__body">' +
      '<div class="nb-card__row"><h3>Page ' + rec.pageNo + '</h3>' + status + '</div>' +
      '<p>' + F.nb.escSafe(rec.naam) + ' · ' + rec.count + ' naam · ' + fmtWhen(rec.created) + '</p>' +
      '<div class="nb-card__actions">' +
      '<button type="button" class="btn btn--soft btn--sm" data-view data-id="' + rec.id + '">View</button>' +
      (rec.status === 'unfinished' ? '<button type="button" class="btn btn--ghost btn--sm" data-continue data-id="' + rec.id + '">Continue</button>' : '') +
      '<button type="button" class="btn btn--ink btn--sm" data-del data-id="' + rec.id + '">Delete</button>' +
      '</div></div></div>';
  }

  var modal = null;
  function getModal() {
    if (!modal && NJ.Modal) modal = NJ.Modal('nb-modal');
    return modal;
  }

  function viewPage(rec) {
    var m = getModal();
    if (!m) { F.toast('View unavailable'); return; }
    m.panel.innerHTML =
      '<div class="modal__head"><h3>Page ' + rec.pageNo + '</h3></div>' +
      '<div class="page-sheet page-sheet__ruled" style="min-height:200px;position:relative;text-align:center;padding-top:56px">' +
      '<span class="page-sheet__yat">॥ ' + rec.count + '</span>' +
      '<p style="font-family:var(--font-dev);font-size:1.7rem">' + F.nb.escSafe(rec.naamDev || rec.naam) + '</p>' +
      '</div>' +
      '<p class="faint" style="margin-top:var(--space-4)">' + F.nb.escSafe(rec.naam) + ' · ' + rec.count + ' naam · ' + fmtWhen(rec.created) + '</p>' +
      '<div class="btn-group" style="margin-top:var(--space-4)"><button type="button" class="btn btn--ghost" data-close>Close</button></div>';
    var c = m.panel.querySelector('[data-close]');
    if (c) c.addEventListener('click', function () { m.close(); });
    m.open();
  }

  function continuePage(rec) {
    var d = NJ.store.load();
    d.modules.lekhan.naamId = rec.naamId || 'ram';
    d.modules.lekhan.custom = rec.custom || '';
    d.modules.lekhan.page = rec.pageNo || 1;
    d.modules.lekhan.written = rec.count || 0;
    d.modules.lekhan.done = [];
    d.modules.lekhan.strokes = [];
    d.modules.lekhan.section = 0;
    NJ.store.save(d);
    global.location.href = '/lekhan/naam-lekhan/';
  }

  function deletePage(id) {
    F.confirm({
      title: 'Delete this page?',
      message: 'This removes the page from your notebook. This cannot be undone.',
      confirmText: 'Delete page', cancelText: 'Keep it',
      onConfirm: function () { F.nb.remove(id); renderList(); F.toast('Page deleted', 'success'); }
    });
  }

  function renderCurrent() {
    var d = NJ.store.load();
    var lk = d.modules.lekhan;
    var size = lk.pageSize || 108;
    if (lk.written > 0 && lk.written < size) {
      el.current.innerHTML =
        '<div class="card" style="margin-bottom:var(--space-4)">' +
        '<div class="nb-card__row"><h3 style="font-family:var(--font-display);font-size:var(--text-lg)">Page ' + lk.page + ' — in progress</h3>' +
        '<span class="pill pill--soon">' + lk.written + '/' + size + '</span></div>' +
        '<div class="progress" style="margin-top:var(--space-3)"><div class="progress__bar" style="width:' + Math.round(lk.written / size * 100) + '%"></div></div>' +
        '<button type="button" class="btn btn--primary btn--sm" data-go-continue style="margin-top:var(--space-3)">Continue writing — Page ' + lk.page + '</button>' +
        '</div>';
      var b = el.current.querySelector('[data-go-continue]');
      if (b) b.addEventListener('click', function () { global.location.href = '/lekhan/naam-lekhan/'; });
    } else el.current.innerHTML = '';
  }

  function renderList() {
    var idx = F.nb.idx().slice().sort(function (a, b) { return (a.pageNo || 0) - (b.pageNo || 0); });
    renderCurrent();
    if (!idx.length) { el.list.innerHTML = ''; el.empty.hidden = false; return; }
    el.empty.hidden = true;
    el.list.innerHTML = idx.map(card).join('');
    el.list.querySelectorAll('[data-view]').forEach(function (b) { b.addEventListener('click', function () { var r = F.nb.byId(b.getAttribute('data-id')); if (r) viewPage(r); }); });
    el.list.querySelectorAll('[data-continue]').forEach(function (b) { b.addEventListener('click', function () { var r = F.nb.byId(b.getAttribute('data-id')); if (r) continuePage(r); }); });
    el.list.querySelectorAll('[data-del]').forEach(function (b) { b.addEventListener('click', function () { deletePage(b.getAttribute('data-id')); }); });
  }

  /* ---- Export / Import ------------------------------------------------------ */
  function exportAll() {
    NJ.db.all().then(function (pages) {
      var d = NJ.store.load();
      var payload = {
        app: 'NaamJap Notebook', version: 2, exportedAt: NJ.store.nowISO(),
        notebook: F.nb.idx(), pages: pages,
        lekhan: d.modules.lekhan, challenges: d.modules.challenges, stats: d.stats
      };
      var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      var a = doc.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'naam-jap-notebook-backup.json';
      doc.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
      F.toast('Backup downloaded — it stays yours', 'success');
    }).catch(function () { F.toast('Could not prepare backup'); });
  }

  function importAll() {
    var file = el.importFile.files && el.importFile.files[0];
    if (!file) { F.toast('Choose a backup file first'); return; }
    var reader = new FileReader();
    reader.onload = function () {
      var data;
      try { data = JSON.parse(reader.result); } catch (e) { F.toast('That file is not a valid backup'); return; }
      if (!data || !Array.isArray(data.notebook)) { F.toast('That file is not a valid backup'); return; }
      F.confirm({
        title: 'Restore this backup?',
        message: 'This replaces your current notebook (and lekhan/challenge data) with the backup.',
        confirmText: 'Restore', cancelText: 'Cancel',
        onConfirm: function () {
          F.nb.saveIdx(data.notebook);
          (data.pages || []).reduce(function (p, r) { return p.then(function () { return NJ.db.put(r); }); }, Promise.resolve()).then(function () {
            var d = NJ.store.load();
            if (data.lekhan) d.modules.lekhan = data.lekhan;
            if (Array.isArray(data.challenges)) d.modules.challenges = data.challenges;
            NJ.store.save(d);
            renderList();
            F.toast('Notebook restored', 'success');
          }).catch(function () { F.toast('Restore partially complete'); renderList(); });
        }
      });
    };
    reader.readAsText(file);
    el.importFile.value = '';
  }

  function wire() {
    el.exportBtn.addEventListener('click', exportAll);
    el.importBtn.addEventListener('click', function () { el.importFile.click(); });
    el.importFile.addEventListener('change', importAll);
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { wire(); renderList(); });
  else { wire(); renderList(); }

})(typeof window !== 'undefined' ? window : this);