/* =========================================================================
   NAAM JAP · DB  (IndexedDB for larger notebook page data)
   -------------------------------------------------------------------------
   Stores full written-page records (strokes + thumbnail) keyed by page id,
   with a localStorage fallback when IndexedDB is unavailable (e.g. some
   private/embedded browsers). Exposed as NJ.db (promise-based API).
   Newer pages are returned first (most recent first).
   ========================================================================= */
(function (global) {
  'use strict';

  var DB_NAME = 'naamjapDB';
  var DB_VER = 1;
  var STORE = 'pages';
  var FB_KEY = 'naamjap:pagesfb';

  var indexedDB = global.indexedDB || global.mozIndexedDB || global.webkitIndexedDB || global.msIndexedDB;
  var dbInstance = null;

  function open() {
    if (dbInstance) return Promise.resolve(dbInstance);
    if (!indexedDB) return Promise.reject(new Error('IndexedDB unsupported'));
    return new Promise(function (resolve, reject) {
      var req = indexedDB.open(DB_NAME, DB_VER);
      req.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains(STORE)) {
          var st = db.createObjectStore(STORE, { keyPath: 'id' });
          st.createIndex('created', 'created', { unique: false });
        }
      };
      req.onsuccess = function (e) { dbInstance = e.target.result; resolve(dbInstance); };
      req.onerror = function (e) { reject(e.target.error); };
    });
  }

  // ---- localStorage fallback -------------------------------------------------
  function fbAll() { try { return JSON.parse(global.localStorage.getItem(FB_KEY)) || []; } catch (e) { return []; } }
  function fbSave(list) { try { global.localStorage.setItem(FB_KEY, JSON.stringify(list)); } catch (e) {} }
  function fbPut(rec) { var l = fbAll(); l = l.filter(function (r) { return r.id !== rec.id; }); l.push(rec); fbSave(l); return Promise.resolve(rec); }
  function fbGet(id) { var l = fbAll(); for (var i = 0; i < l.length; i++) if (l[i].id === id) return Promise.resolve(l[i]); return Promise.resolve(null); }
  function fbDel(id) { var l = fbAll().filter(function (r) { return r.id !== id; }); fbSave(l); return Promise.resolve(); }
  function fbAllPages() { return Promise.resolve(fbAll().sort(function (a, b) { return (b.created || 0) - (a.created || 0); })); }

  function tx(db, mode) {
    var t = db.transaction(STORE, mode);
    return t.objectStore(STORE);
  }

  var api = {
    put: function (rec) {
      if (!indexedDB) return fbPut(rec);
      return open().then(function (db) {
        return new Promise(function (resolve, reject) {
          var req = tx(db, 'readwrite').put(rec);
          req.onsuccess = function () { resolve(rec); };
          req.onerror = function (e) { reject(e.target.error); };
        });
      });
    },
    get: function (id) {
      if (!indexedDB) return fbGet(id);
      return open().then(function (db) {
        return new Promise(function (resolve, reject) {
          var req = tx(db, 'readonly').get(id);
          req.onsuccess = function () { resolve(req.result || null); };
          req.onerror = function (e) { reject(e.target.error); };
        });
      });
    },
    del: function (id) {
      if (!indexedDB) return fbDel(id);
      return open().then(function (db) {
        return new Promise(function (resolve, reject) {
          var req = tx(db, 'readwrite').delete(id);
          req.onsuccess = function () { resolve(); };
          req.onerror = function (e) { reject(e.target.error); };
        });
      });
    },
    all: function () {
      if (!indexedDB) return fbAllPages();
      return open().then(function (db) {
        return new Promise(function (resolve, reject) {
          var out = [];
          var req = tx(db, 'readonly').getAll();
          req.onsuccess = function () { out = req.result || []; resolve(out.sort(function (a, b) { return (b.created || 0) - (a.created || 0); })); };
          req.onerror = function (e) { reject(e.target.error); };
        });
      });
    },
    supported: !!indexedDB
  };

  global.NJ = global.NJ || {};
  global.NJ.db = api;
})(typeof window !== 'undefined' ? window : this);