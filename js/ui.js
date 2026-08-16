/* =========================================================================
   NAAM JAP · UI PRIMITIVES
   Modal, BottomSheet, Confirm, Toast, Tabs, Segmented, Tooltip, Reveal.
   Exposed on the global `NJ` namespace. No dependencies.
   ========================================================================= */
(function (global) {
  'use strict';

  var body = document.body;
  var NJ = {};

  /* ---- Helpers ---------------------------------------------------------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function trapFocus(panel) {
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = panel.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  function buildOverlay(slot, className) {
    var overlay = slot.querySelector('.overlay') || document.createElement('div');
    overlay.className = 'overlay';
    if (overlay.parentNode !== slot) slot.appendChild(overlay);
    var scrim = document.createElement('div');
    scrim.className = 'overlay__scrim';
    scrim.setAttribute('aria-hidden', 'true');
    var panel = document.createElement('div');
    panel.className = className;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    overlay.appendChild(scrim);
    overlay.appendChild(panel);

    var onKey = function (e) { if (e.key === 'Escape') close(); };
    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('inert', '');
      document.removeEventListener('keydown', onKey);
      document.body.style.removeProperty('overflow');
    }
    function open() {
      document.body.style.setProperty('overflow', 'hidden');
      overlay.classList.add('is-open');
      overlay.removeAttribute('inert');
      document.addEventListener('keydown', onKey);
      setTimeout(function () { var x = panel.querySelector('[autofocus], button, [href], input'); if (x) x.focus(); }, 60);
    }
    scrim.addEventListener('click', close);
    return { overlay: overlay, panel: panel, open: open, close: close };
  }

  NJ.Modal = function (id) {
    var slot = document.getElementById(id) || body.appendChild(document.createElement('div'));
    slot.id = slot.id || id;
    var api = buildOverlay(slot, 'modal');
    api.body = api.panel;
    trapFocus(api.panel);
    return api;
  };

  NJ.BottomSheet = function (id) {
    var slot = document.getElementById(id) || body.appendChild(document.createElement('div'));
    slot.id = slot.id || id;
    var api = buildOverlay(slot, 'sheet');
    trapFocus(api.panel);
    return api;
  };

  NJ.Confirm = function (opts) {
    opts = opts || {};
    var slot = body.appendChild(document.createElement('div'));
    var api = buildOverlay(slot, 'modal confirm');
    api.panel.innerHTML =
      '<div class="modal__head"><h3>' + esc(opts.title || 'Are you sure?') + '</h3></div>' +
      '<div class="confirm__body">' + esc(opts.message || '') + '</div>' +
      '<div class="btn-group"><button class="btn btn--ghost" data-confirm="no">' + esc(opts.cancelText || 'Cancel') + '</button>' +
      '<button class="btn btn--ink" data-confirm="yes">' + esc(opts.confirmText || 'Confirm') + '</button></div>';
    api.panel.querySelector('[data-confirm="no"]').addEventListener('click', function () { api.close(); opts.onCancel && opts.onCancel(); });
    api.panel.querySelector('[data-confirm="yes"]').addEventListener('click', function () { api.close(); opts.onConfirm && opts.onConfirm(); });
    api.open();
  };

  NJ.Toast = function (message, kind) {
    var root = document.getElementById('toast-root');
    if (!root) { root = document.createElement('div'); root.id = 'toast-root'; root.className = 'toast-root'; document.body.appendChild(root); }
    var t = document.createElement('div');
    t.className = 'toast' + (kind ? ' toast--' + kind : '');
    t.setAttribute('role', 'status');
    t.innerHTML = message;
    root.appendChild(t);
    requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('is-in'); }); });
    setTimeout(function () {
      t.classList.remove('is-in');
      setTimeout(function () { t.remove(); }, 320);
    }, 2600);
  };

  NJ.Tabs = function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(group.querySelectorAll('[role="tabpanel"]'));
    function activate(idx) {
      tabs.forEach(function (t, i) {
        var on = i === idx;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        t.classList.toggle('is-active', on);
      });
      panels.forEach(function (p, i) { p.hidden = i !== idx; });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { activate(i); });
      t.addEventListener('keydown', function (e) {
        var next = null, len = tabs.length;
        if (e.key === 'ArrowRight') next = (i + 1) % len;
        else if (e.key === 'ArrowLeft') next = (i - 1 + len) % len;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = len - 1;
        if (next !== null) { e.preventDefault(); activate(next); tabs[next].focus(); }
      });
    });
    activate(0);
    return { activate: activate };
  };

  NJ.Reveal = function () {
    if (!('IntersectionObserver' in global)) return;
    var el = document.querySelectorAll('[data-reveal]');
    if (!el.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    el.forEach(function (n) { io.observe(n); });
  };

  function init() {
    document.querySelectorAll('[role="tablist"]').forEach(function (g) { NJ.Tabs(g); });
    NJ.Reveal();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  global.NJ = NJ;
})(typeof window !== 'undefined' ? window : this);