/* =========================================================================
   NAAM JAP · STORE  (local persistence layer)
   -------------------------------------------------------------------------
   Lightweight client-side persistence. All lightweight practice state lives
   in a single namespaced localStorage key (`naamjap:data:v2`). Larger data
   (notebook page content) lives in IndexedDB via js/db.js.

   Structure is logically separated:
     v        – schema version
     naamId / customNaam / session / stats / today  – core Naam Jap counter
     prefs    – user preferences (sound, etc.)
     modules  – per-module state: mala, timer, custom, lekhan, challenges
     notebook – notebook index (page metadata); strokes live in IndexedDB
   today     – global daily progress {jap, malas, naam} rolled by local date

   This is the ONLY place that touches localStorage, so it can later be swapped
   for account/cloud sync without touching feature code. Exposed as NJ.store.
   ========================================================================= */
(function (global) {
  'use strict';

  var KEY = 'naamjap:data:v2';

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function defaults() {
    return {
      v: 2,
      naamId: 'ram',             // counter selected naam id, or 'custom'
      customNaam: '',
      session: {                 // counter current-session state
        mala: 1, inMala: 0, completed: 0, sessionJap: 0,
        sessionStart: Date.now(), accumulated: 0, paused: false
      },
      stats: { totalJap: 0, malas: 0 },   // counter LIFETIME totals
      today: { key: '', jap: 0, malas: 0, naam: 0 },  // global daily progress
      history: {},              // per-day records { 'YYYY-MM-DD': {jap, malas, naam} }
      prefs: { sound: true },
      modules: {
        mala: { naamId: 'ram', cust: '', ses: { mala: 1, in: 0, malas: 0, paused: false }, stat: { total: 0, malas: 0 } },
        timer: { mode: 'down', durSec: 0, naamId: 'ram', custom: '', round: 1, done: 0, running: false, startTs: 0, remainAccum: 0, finished: false },
        custom: { naam: '', target: 108, count: 0, paused: false, completed: false, startTs: 0, total: 0 },
        lekhan: { page: 1, naamId: 'ram', custom: '', pageSize: 108, written: 0, strokes: [] },
        custLekhan: { page: 1, naam: '', naamId: 'custom', naamDev: '', pageSize: 108, written: 0 },
        sadhana: { target: { jap: 108, malas: 1, naam: 0 }, sankalp: '', manual: {} },
        lakh: { count: 0, target: 100000, started: '' },
        challenges: [],
        notebook: []
      }
    };
  }

  function mergeModules(base, m) {
    if (!m || typeof m !== 'object') return;
    var mod = base.modules;
    var merge = function (target, src) {
      if (src && typeof src === 'object') {
        for (var k in src) if (Object.prototype.hasOwnProperty.call(src, k)) target[k] = src[k];
      }
    };
    if (m.mala) {
      merge(mod.mala.ses, m.mala.ses); merge(mod.mala.stat, m.mala.stat);
      mod.mala.naamId = m.mala.naamId || mod.mala.naamId;
      mod.mala.cust = m.mala.cust || mod.mala.cust;
    }
    if (m.timer) merge(mod.timer, m.timer);
    if (m.custom) merge(mod.custom, m.custom);
    if (m.lekhan) merge(mod.lekhan, m.lekhan);
    if (m.custLekhan) merge(mod.custLekhan, m.custLekhan);
    if (m.sadhana) {
      if (m.sadhana.target) merge(mod.sadhana.target, m.sadhana.target);
      mod.sadhana.sankalp = m.sadhana.sankalp || '';
      if (m.sadhana.manual && typeof m.sadhana.manual === 'object') mod.sadhana.manual = m.sadhana.manual;
    }
    if (m.lakh) merge(mod.lakh, m.lakh);
    if (Array.isArray(m.challenges)) mod.challenges = m.challenges;
    if (Array.isArray(m.notebook)) mod.notebook = m.notebook;
  }

  function load() {
    var stored = null;
    try { stored = JSON.parse(global.localStorage.getItem(KEY)); } catch (e) { stored = null; }
    var base = defaults();
    if (stored && typeof stored === 'object') {
      base.naamId = stored.naamId || base.naamId;
      base.customNaam = stored.customNaam || '';
      if (stored.session) {
        var s = stored.session;
        base.session.mala = s.mala || 1;
        base.session.inMala = s.inMala || 0;
        base.session.completed = s.completed || 0;
        base.session.sessionJap = s.sessionJap || 0;
        base.session.accumulated = s.accumulated || 0;
        base.session.paused = !!s.paused;
        base.session.sessionStart = Date.now();
      }
      if (stored.stats) {
        base.stats.totalJap = stored.stats.totalJap || 0;
        base.stats.malas = stored.stats.malas || 0;
      }
      if (stored.today) {
        base.today.key = stored.today.key || '';
        base.today.jap = stored.today.jap || 0;
        base.today.malas = stored.today.malas || 0;
        base.today.naam = stored.today.naam || 0;
      }
      if (stored.history && typeof stored.history === 'object') {
        base.history = stored.history;
      }
      if (stored.prefs) {
        base.prefs.sound = stored.prefs.sound !== false;
      }
      mergeModules(base, stored.modules);
    }
    // roll today's counters if the day changed — the old day is archived
    var tk = todayKey();
    if (base.today.key !== tk) {
      if (base.today.key && (base.today.jap || base.today.malas || base.today.naam)) {
        archiveDay(base, base.today.key, base.today);
      }
      base.today.key = tk;
      base.today.jap = 0; base.today.malas = 0; base.today.naam = 0;
    }
    return base;
  }

  // Archive a finished day into the history map (kept bounded).
  function archiveDay(data, key, day) {
    if (!key || !day) return;
    var h = data.history || (data.history = {});
    h[key] = { jap: day.jap || 0, malas: day.malas || 0, naam: day.naam || 0 };
    capHistory(h);
  }

  function capHistory(h) {
    var keys = Object.keys(h).sort();
    if (keys.length > 800) {           // ~2.2 years of daily records
      var remove = keys.length - 800;
      for (var i = 0; i < remove; i++) delete h[keys[i]];
    }
  }

  function save(data) {
    var out = defaults();
    out.v = 2;
    out.naamId = data.naamId; out.customNaam = data.customNaam || '';
    out.session = data.session; out.stats = data.stats; out.today = data.today;
    out.history = data.history || {};
    out.prefs = data.prefs || out.prefs;
    out.modules = data.modules;
    delete out._load;
    try { global.localStorage.setItem(KEY, JSON.stringify(out)); } catch (e) {}
    global.NAAM_JAP_CACHE = out;
  }

  function clear() {
    try { global.localStorage.removeItem(KEY); } catch (e) {}
  }

  // Add to today's counters, rolling over by date first. Always mirrors the
  // live day into history so streak/journey can read it without waiting for
  // day rollover.
  function addToday(jap, malas, naam) {
    var data = load();
    var tk = todayKey();
    if (data.today.key !== tk) {
      if (data.today.key && (data.today.jap || data.today.malas || data.today.naam)) {
        archiveDay(data, data.today.key, data.today);
      }
      data.today.key = tk; data.today.jap = 0; data.today.malas = 0; data.today.naam = 0;
    }
    data.today.jap += (jap || 0);
    data.today.malas += (malas || 0);
    data.today.naam += (naam || 0);
    archiveDay(data, tk, data.today);
    save(data);
    return data.today;
  }

  function getToday() {
    var data = load();
    if (data.today.key !== todayKey()) return { key: todayKey(), jap: 0, malas: 0, naam: 0 };
    return data.today;
  }

  // Full history map { 'YYYY-MM-DD': {jap, malas, naam} } including today.
  function history() {
    var data = load();
    var h = {};
    var k = Object.keys(data.history || {});
    for (var i = 0; i < k.length; i++) h[k[i]] = data.history[k[i]];
    h[data.today.key] = { jap: data.today.jap || 0, malas: data.today.malas || 0, naam: data.today.naam || 0 };
    return h;
  }

  function nowISO() { return new Date().toISOString(); }
  function stamp() { return Date.now(); }

  var api = {
    KEY: KEY,
    load: load,
    save: save,
    clear: clear,
    todayKey: todayKey,
    addToday: addToday,
    getToday: getToday,
    history: history,
    archiveDay: archiveDay,
    nowISO: nowISO,
    stamp: stamp
  };

  global.NJ = global.NJ || {};
  global.NJ.store = api;
})(typeof window !== 'undefined' ? window : this);
