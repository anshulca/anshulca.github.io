/* =========================================================================
   NAAM JAP · WRITING ENGINE  (reusable DPI-aware ink canvas)
   -------------------------------------------------------------------------
   A small, dependency-free stroke engine reused by Naam Lekhan and Custom
   Naam Lekhan. Handles mouse / touch / pen (stylus) via Pointer Events with
   correct devicePixelRatio scaling and pointer capture so the page never
   scrolls while writing. Exposed as NJ.writing.create(canvas, opts).
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;

  function create(canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext('2d');
    var dpr = Math.max(1, global.devicePixelRatio || 1);
    var strokes = [];   // array of strokes; each stroke is an array of {x,y,p}
    var drawing = false;
    var moved = false;
    var downAt = 0;
    var color = '#2b2620';

    function readColor() {
      try { color = getComputedStyle(canvas).color || '#2b2620'; } catch (e) {}
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineWidth = opts.lineWidth || 2.4;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      readColor();
      ctx.strokeStyle = color;
      redraw();
    }

    function pos(e) {
      var rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top, p: e.pressure };
    }

    function drawStroke(st) {
      if (!st.length) return;
      ctx.beginPath();
      ctx.moveTo(st[0].x, st[0].y);
      for (var i = 1; i < st.length; i++) ctx.lineTo(st[i].x, st[i].y);
      ctx.stroke();
    }
    function redraw() {
      var w = canvas.width / dpr, h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = color;
      for (var i = 0; i < strokes.length; i++) drawStroke(strokes[i]);
    }

    function onDown(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
      drawing = true;
      moved = false;
      downAt = e.timeStamp;
      var p = pos(e);
      strokes.push([p]);
      var tag = opts.onStrokeStart ? opts.onStrokeStart(p) : null;
      strokes[strokes.length - 1].tag = tag;
      if (opts.onDown) opts.onDown(p);
      drawStroke(strokes[strokes.length - 1]);
    }
    function onMove(e) {
      if (!drawing) return;
      e.preventDefault();
      moved = true;
      var p = pos(e);
      var st = strokes[strokes.length - 1];
      var last = st[st.length - 1];
      ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      st.push(p);
    }
    function onUp(e) {
      if (!drawing) return;
      drawing = false;
      try { canvas.releasePointerCapture && canvas.releasePointerCapture(e.pointerId); } catch (err) {}
      // A press with no movement and a quick release is a tap, not ink.
      if (!moved && e.timeStamp - downAt < 350) {
        var tapPt = strokes[strokes.length - 1][0];
        strokes.pop();
        if (opts.onTap) opts.onTap(tapPt);
        return;
      }
      if (opts.onStroke) opts.onStroke();
    }

    function bind() {
      canvas.addEventListener('pointerdown', onDown);
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerup', onUp);
      canvas.addEventListener('pointercancel', onUp);
      canvas.addEventListener('pointerleave', function (e) { if (drawing) onUp(e); });
      // keep the page from scrolling / zooming while drawing
      canvas.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });
      canvas.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
    }

    return {
      resize: resize,
      bind: bind,
      undo: function () { strokes.pop(); redraw(); },
      clear: function () { strokes = []; redraw(); },
      isEmpty: function () { return strokes.length === 0; },
      getStrokes: function () { return strokes.slice(); },
      setStrokes: function (arr) {
        strokes = (arr || []).map(function (s) {
          var c = s.slice();
          if (s.tag !== undefined) c.tag = s.tag;
          return c;
        });
        redraw();
      },
      getLastTag: function () {
        if (!strokes.length) return null;
        return (strokes[strokes.length - 1].tag !== undefined) ? strokes[strokes.length - 1].tag : null;
      },
      getThumb: function (width) {
        width = width || 220;
        var w = canvas.width, h = canvas.height;
        if (!w || !h) return '';
        var sc = width / w;
        var t = doc.createElement('canvas');
        t.width = Math.round(w * sc); t.height = Math.round(h * sc);
        var tc = t.getContext('2d');
        tc.scale(sc, sc);
        tc.drawImage(canvas, 0, 0);
        try { return t.toDataURL('image/png'); } catch (e) { return ''; }
      }
    };
  }

  global.NJ = global.NJ || {};
  global.NJ.writing = { create: create };
})(typeof window !== 'undefined' ? window : this);