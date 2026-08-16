/* =========================================================================
   NAAM JAP · Service Worker (PWA-ready, offline app-shell)
   Caches the static shell so the app opens offline. Feature data stays in
   localStorage (client-side), so offline is a natural fit.
   ========================================================================= */
'use strict';

var CACHE = 'naamjap-shell-v3';

var SHELL = [
  '/',
  '/jap/',
  '/jap/naam-jap/',
  '/jap/digital-mala/',
  '/jap/jap-timer/',
  '/jap/custom-naam-jap/',
  '/lekh/',
  '/lekhan/naam-lekhan/',
  '/lekhan/custom-naam-lekhan/',
  '/lekhan/digital-jap-notebook/',
  '/lekhan/writing-challenges/',
  '/mantra/',
  '/sadhana/',
  '/journey/',
  '/tools/',
  '/about/',
  '/platform/',
  '/privacy/',
  '/terms/',
  '/disclaimer/',
  '/404.html',
  '/manifest.webmanifest',
  '/css/tokens.css',
  '/css/base.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/pages.css',
  '/css/jap.css',
  '/css/naam-jap.css',
  '/css/tools.css',
  '/css/sadhana.css',
  '/css/mantra.css',
  '/css/lekhan.css',
  '/css/journey.css',
  '/js/site.config.js',
  '/js/ui.js',
  '/js/store.js',
  '/js/db.js',
  '/js/shared.js',
  '/js/core.js',
  '/js/naam-jap.js',
  '/js/digital-mala.js',
  '/js/jap-timer.js',
  '/js/custom-jap.js',
  '/js/naam-lekhan.js',
  '/js/writing-engine.js',
  '/js/custom-lekhan.js',
  '/js/notebook.js',
  '/js/challenges.js',
  '/js/mantra.js',
  '/js/sadhana.js',
  '/js/journey.js',
  '/js/tools.js',
  '/js/home.js',
  '/assets/logo.svg',
  '/assets/favicon.svg',
  '/assets/og-image.svg',
  '/assets/apple-touch-icon.png',
  '/assets/icon-192.png',
  '/assets/icon-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(SHELL);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Stale-while-revalidate: serve cache instantly, refresh in background.
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var fresh = fetch(event.request).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(event.request, copy); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || fresh;
    })
  );
});